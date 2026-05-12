# EPC PE AI-Platform Frontend

Next.js 16 + React 19 기반의 EPC(Engineering, Procurement, Construction) PE AI-Platform 프론트엔드.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **React 19.2.4**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** + shadcn (`base-nova`) + `@base-ui/react` 프리미티브
- **lucide-react** 아이콘 / IBM Plex Sans KR · Mono 폰트

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 (기본 포트 3000)
npm run dev
```

http://localhost:3000 접속.

## Scripts

| 명령 | 동작 |
|---|---|
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint (`eslint-config-next`) |

테스트 러너는 아직 설정되어 있지 않습니다.

## 디렉토리 구조

```
src/
├─ app/                    # Next.js App Router 라우트
│  ├─ layout.tsx          # 루트 레이아웃 (AppHeader 마운트)
│  ├─ page.tsx            # / → /projects 리다이렉트
│  ├─ error.tsx, global-error.tsx, not-found.tsx
│  ├─ projects/[projectId]/  # 프로젝트 상세 (layout + page)
│  └─ components/         # 디자인 시스템 docs 라우트
├─ components/
│  ├─ ui/                 # 디자인 시스템 프리미티브 (Ui 접두어)
│  └─ common/             # 앱 레벨 공통 (AppHeader, TopLoadingBar)
├─ features/<feature>/    # 기능 모듈 (components / data / types / utils)
├─ lib/utils.ts           # cn() 헬퍼
└─ styles/                # 디자인 토큰 / 타이포그래피 CSS
doc/                      # HTML 프로토타입 + common.css (디자인 레퍼런스)
scripts/ai-review.py      # GitLab MR AI 리뷰 봇 (CI에서 실행)
tasks/                    # 작업별 메모 (브랜치명과 동일)
```

경로 alias: `@/*` → `./src/*`.

## 주요 라우트

| 경로 | 설명 |
|---|---|
| `/` | `/projects`로 리다이렉트 |
| `/projects` | 프로젝트 리스트 |
| `/projects/[projectId]` | 프로젝트 상세 (ProjectInfoBar + 콘텐츠) |
| `/components` | 디자인 시스템 컴포넌트 docs (내부용) |

## 컨벤션

- 컴포넌트 네이밍 3계층 규칙 (자세한 내용은 `AGENTS.md`)
  - `components/ui/`: `Ui` 접두어
  - `components/common/`: 역할 이름 (`AppHeader`)
  - `features/<feature>/components/`: 도메인 이름 (`ProjectInfoBar`)
- `function` 선언 대신 arrow function (`export const X = () => {}`) 사용
- 브랜치: `<type>/DAP-<이슈번호>-설명` (예: `feat/DAP-579-common-header-component`)
- 새 컴포넌트 작업은 `tasks/<브랜치명>.md`에 메모

## 디자인 레퍼런스

`doc/` 폴더의 HTML 프로토타입과 `common.css`가 시각 스펙(높이·패딩·색상)의 정본입니다. 스크린샷만으로 구현하기 전에 매칭되는 `doc/*.html`을 먼저 확인하세요.

## CI / AI 리뷰

`.gitlab-ci.yml`이 머지 리퀘스트마다 `scripts/ai-review.py`를 실행합니다. MR diff를 Gemini로 리뷰해 자동 코멘트를 답니다. 필요 환경 변수: `GITLAB_TOKEN`, `GEMINI_API_KEY` (옵션: `GEMINI_MODEL`, `AI_REVIEW_MAX_RETRIES`, `AI_REVIEW_RETRY_DELAY`, `AI_REVIEW_MAX_DIFF_CHARS`).

## 추가 문서

- `CLAUDE.md` / `AGENTS.md` — AI 에이전트(Claude Code 등) 작업 가이드
- `doc/about-depe.md` — EPC 도메인 용어/단계 정리
- `doc/design-system.md` — 디자인 시스템 가이드
