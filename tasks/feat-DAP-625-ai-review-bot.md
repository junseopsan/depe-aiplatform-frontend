# feat/DAP-625-ai-review-bot

## 개요

- 소스 MR 발생했을때, 소스 코드 리뷰를 Gemini API 를 통해 자동으로 실행한다.

## 유저 스토리

**As** 프론트엔드 개발자로서
**In order to** 개발자가 작업 MR 요청을 하게되면 정확하고 퀼리티있는 소스 코드 유지를 위하여
**I want** Gemini API 을 통해 MR 요청 내용을 크로스 체크할 수 있도록 한다.

## Acceptance Criteria

| #   | Given                     | When           | Then                                |
| --- | ------------------------- | -------------- | ----------------------------------- |
| 1   | 개발자가 소스 커밋을 하고 | MR 요청을 하면 | 해당 MR 에 대한 자동 리뷰가 달린다. |

## Tech Spec

## 참고사항

## TODO

- [x] `scripts/ai-review.py` 생성 (diff 추출 → Gemini API 리뷰 → MR 코멘트)
- [x] `.gitlab-ci.yml` 생성 (MR 이벤트 시 ai-review job 트리거)
- [ ] MR 생성하여 동작 테스트
