# Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20.
import os
import json
import logging
import ssl
import time
import urllib.request
import urllib.error
from typing import Any

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

# 자체 호스팅 GitLab의 자체 서명 인증서 허용
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

# 환경 변수
GITLAB_URL = os.environ["CI_SERVER_URL"]
PROJECT_ID = os.environ["CI_PROJECT_ID"]
MR_IID = os.environ["CI_MERGE_REQUEST_IID"]
GITLAB_TOKEN = os.environ["GITLAB_TOKEN"]
GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]

# 설정 (환경 변수로 오버라이드 가능)
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
MAX_RETRIES = int(os.environ.get("AI_REVIEW_MAX_RETRIES", "5"))
RETRY_DELAY = int(os.environ.get("AI_REVIEW_RETRY_DELAY", "30"))
MAX_DIFF_CHARS = int(os.environ.get("AI_REVIEW_MAX_DIFF_CHARS", "30000"))

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"


def gitlab_api(method: str, endpoint: str, body: dict | None = None) -> Any:
    """GitLab API를 호출하고 JSON 응답을 반환한다. 실패 시 재시도(최대 3회)."""
    url = f"{GITLAB_URL}/api/v4{endpoint}"
    data = json.dumps(body).encode() if body else None

    for attempt in range(3):
        try:
            req = urllib.request.Request(url, data=data, method=method)
            req.add_header("PRIVATE-TOKEN", GITLAB_TOKEN)
            if data:
                req.add_header("Content-Type", "application/json")
            with urllib.request.urlopen(req, context=SSL_CTX) as res:
                return json.loads(res.read())
        except urllib.error.HTTPError as e:
            error_body = e.read().decode()
            logger.error("GitLab API %s %s → HTTP %d: %s", method, endpoint, e.code, error_body)
            if e.code >= 500 and attempt < 2:
                wait = 5 * (attempt + 1)
                logger.warning("GitLab 서버 오류, %d초 후 재시도... (%d/3)", wait, attempt + 1)
                time.sleep(wait)
            else:
                raise
        except urllib.error.URLError as e:
            logger.error("GitLab API 연결 실패: %s", e.reason)
            if attempt < 2:
                wait = 5 * (attempt + 1)
                logger.warning("네트워크 오류, %d초 후 재시도... (%d/3)", wait, attempt + 1)
                time.sleep(wait)
            else:
                raise


def get_mr_diff() -> str:
    """MR의 변경 사항을 diff 텍스트로 반환한다."""
    mr = gitlab_api("GET", f"/projects/{PROJECT_ID}/merge_requests/{MR_IID}/changes")
    changes = mr.get("changes", [])
    diff_parts = []
    for c in changes:
        diff_parts.append(f"--- {c['old_path']}\n+++ {c['new_path']}\n{c['diff']}")
    return "\n".join(diff_parts)


def review_with_gemini(diff_text: str) -> str:
    """Gemini API로 코드 리뷰를 요청하고 결과를 반환한다. 대용량 diff는 잘라서 전송."""
    if len(diff_text) > MAX_DIFF_CHARS:
        logger.warning(
            "diff가 %d자로 제한(%d자)을 초과하여 잘라서 전송합니다.",
            len(diff_text), MAX_DIFF_CHARS,
        )
        diff_text = diff_text[:MAX_DIFF_CHARS] + "\n\n... (diff가 너무 길어 잘렸습니다)"

    prompt = f"""다음 GitLab Merge Request의 코드 diff를 리뷰해주세요.
한국어로 작성하고, 아래 항목을 포함해주세요:

1. **요약**: 변경 사항 요약
2. **잠재적 버그**: 버그가 될 수 있는 부분
3. **보안 이슈**: 보안 취약점 여부
4. **개선 제안**: 코드 품질 개선 사항

문제가 없으면 "문제 없음"으로 간단히 작성해주세요.

```diff
{diff_text}
```"""

    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": 4096},
    }

    data = json.dumps(body).encode()

    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(GEMINI_URL, data=data, method="POST")
            req.add_header("Content-Type", "application/json")
            with urllib.request.urlopen(req) as res:
                result = json.loads(res.read())
            return result["candidates"][0]["content"]["parts"][0]["text"]
        except urllib.error.HTTPError as e:
            error_body = e.read().decode()
            logger.error("Gemini API HTTP %d: %s", e.code, error_body)
            if e.code in (429, 503) and attempt < MAX_RETRIES - 1:
                wait = RETRY_DELAY * (attempt + 1)
                reason = "Rate limit 초과" if e.code == 429 else "서버 과부하"
                logger.warning("%s, %d초 후 재시도... (%d/%d)", reason, wait, attempt + 1, MAX_RETRIES)
                time.sleep(wait)
            else:
                raise


def post_comment(review_text: str) -> None:
    """MR에 AI 리뷰 코멘트를 작성한다."""
    body = {"body": f"## AI Code Review\n\n{review_text}"}
    gitlab_api("POST", f"/projects/{PROJECT_ID}/merge_requests/{MR_IID}/notes", body)


if __name__ == "__main__":
    logger.info("MR diff 가져오는 중...")
    diff = get_mr_diff()

    if not diff.strip():
        logger.info("변경 사항이 없습니다.")
        exit(0)

    logger.info("diff 크기: %d chars", len(diff))
    logger.info("Gemini API로 리뷰 요청 중... (model: %s)", GEMINI_MODEL)
    review = review_with_gemini(diff)

    logger.info("MR에 코멘트 작성 중...")
    post_comment(review)
    logger.info("AI 리뷰 완료!")
