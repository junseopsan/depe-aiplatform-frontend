import os
import json
import urllib.request
import urllib.error

GITLAB_URL = os.environ["CI_SERVER_URL"]
PROJECT_ID = os.environ["CI_PROJECT_ID"]
MR_IID = os.environ["CI_MERGE_REQUEST_IID"]
GITLAB_TOKEN = os.environ["GITLAB_TOKEN"]
GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]

GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"


def gitlab_api(method, endpoint, body=None):
    url = f"{GITLAB_URL}/api/v4{endpoint}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("PRIVATE-TOKEN", GITLAB_TOKEN)
    if data:
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())


def get_mr_diff():
    mr = gitlab_api("GET", f"/projects/{PROJECT_ID}/merge_requests/{MR_IID}/changes")
    changes = mr.get("changes", [])
    diff_parts = []
    for c in changes:
        diff_parts.append(f"--- {c['old_path']}\n+++ {c['new_path']}\n{c['diff']}")
    return "\n".join(diff_parts)


def review_with_gemini(diff_text):
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
    req = urllib.request.Request(GEMINI_URL, data=data, method="POST")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as res:
        result = json.loads(res.read())

    return result["candidates"][0]["content"]["parts"][0]["text"]


def post_comment(review_text):
    body = {"body": f"## AI Code Review\n\n{review_text}"}
    gitlab_api("POST", f"/projects/{PROJECT_ID}/merge_requests/{MR_IID}/notes", body)


if __name__ == "__main__":
    print("MR diff 가져오는 중...")
    diff = get_mr_diff()

    if not diff.strip():
        print("변경 사항이 없습니다.")
        exit(0)

    print(f"diff 크기: {len(diff)} chars")
    print("Gemini API로 리뷰 요청 중...")
    review = review_with_gemini(diff)

    print("MR에 코멘트 작성 중...")
    post_comment(review)
    print("AI 리뷰 완료!")
