# EPC PE AI-Platform Frontend PRD

- 버전: v0.4
- 최종 수정: 2026-05-08

---

## 1. 프로젝트 소개

EPC PE AI-Platform은 EPC 프로젝트의 산출물을 **Workstream × Stage Matrix**로 한눈에 보여주고, 산출물별 AI 생성 / 수기 업로드 / 검토 / 발행 흐름을 관리하는 웹 애플리케이션이다.

`depe-aiplatform-frontend`는 그 프론트엔드 구현체이며, 초기 POC는 다음 두 가지에 집중한다.

1. 프로젝트 상세 화면의 산출물 워크스페이스 Matrix
2. 프로젝트 상세 탭 라우트 (Dashboard / ITB / IRS / Design Criteria / MPS / P&ID / 문서비교 / ITB 이력)

다음은 다루지 않는다.

- AI Chat 화면, Activity Feed Drawer
- 실제 인증/권한, 실제 AI 생성 API, 실제 파일 업로드/다운로드 서버
- DWG Viewer (PDF는 `UiPdfViewer` 프리미티브로 일부만 지원)

---

## 2. 구현된 기능

### 2.1 전역 레이아웃

- `AppHeader` — 52px sticky 헤더. 로고, 글로벌 nav(`Projects` / `AI Q&A`), 알림 배지. 내부에 `TopLoadingBar` 포함.
- 루트(`/`)는 `/projects`로 redirect.
- 전역 에러 바운더리: `error.tsx`, `global-error.tsx`, `not-found.tsx`.

### 2.2 프로젝트 상세 레이아웃

- `ProjectInfoBar` — 72px 정보바. 프로젝트명, 계약번호, 계약기간, 발주처를 표시.
- `ProjectTabBar` — 44px 탭바. 8개 탭(Dashboard / ITB / IRS / Design Criteria / MPS / P&ID / 문서비교 / ITB 이력) 간 라우팅.
- 존재하지 않는 `projectId`는 `notFound()`로 처리.

### 2.3 UI 프리미티브 (`src/components/ui/`)

- `UiButton`, `UiInput`, `UiTextarea`, `UiSheet`, `UiTable`, `UiPdfViewer`
- 각 프리미티브는 같은 폴더의 `*-docs.md`로 사용 예시를 관리한다.

### 2.4 내부 도구

- `/components` — 디자인 시스템 컴포넌트 카탈로그 페이지 (제품 범위 외, 내부 참고용).

---

## 3. 라우트 구조

```txt
/                                       → /projects 로 redirect
/projects                               프로젝트 목록
/projects/[projectId]                   Dashboard (산출물 워크스페이스)
/projects/[projectId]/itb               ITB
/projects/[projectId]/irs               IRS
/projects/[projectId]/dc                Design Criteria
/projects/[projectId]/mps               MPS
/projects/[projectId]/pnid              P&ID
/projects/[projectId]/compare           문서비교
/projects/[projectId]/itb-history       ITB 이력
/components                             컴포넌트 카탈로그 (내부용)
/components/[slug]                      개별 컴포넌트 문서
```

레이아웃 계층:

```txt
src/app/layout.tsx               root layout
  └─ <AppHeader/>                전역 헤더
  └─ {children}
      ├─ /projects/page.tsx                              프로젝트 목록
      ├─ /projects/[projectId]/layout.tsx                ProjectInfoBar + ProjectTabBar
      │   └─ {children}                                  각 탭 page
      └─ /components/layout.tsx                          ComponentDocsSidebar
          └─ {children}
```

---

## 4. 규칙

### 4.1 컴포넌트 명명 (3-tier)

| 위치 | 접두어 / 이름 | 성격 |
|---|---|---|
| `src/components/ui/` | `Ui` 접두어 | 디자인 시스템 프리미티브, 비즈니스 무관 |
| `src/components/common/` | 없음 (역할 이름) | 앱 전역 크롬 (`AppHeader`, `TopLoadingBar`) |
| `src/features/<feature>/components/` | 없음 (도메인 이름) | 특정 기능 전용 (`ProjectInfoBar` 등) |

`Ui` 접두어는 디자인 시스템 프리미티브에만 사용한다. 폴더 위치가 이미 스코프를 표현하므로 모든 공통 컴포넌트에 접두어를 붙이지 않는다.

### 4.2 디자인 시스템

- 정본: `doc/md/design-system.md`, `doc/color-system.html`, `doc/common.css`.
- 모든 색상은 `src/styles/tokens.css`의 CSS Variables를 통해 사용한다. **임의 HEX 직접 사용 금지.**
- CTA 버튼은 브랜드 파랑이 아닌 neutral gray 계열을 사용한다.
- Focus 상태는 border-color 변경만 사용 (box-shadow ring 금지).
- 화면 퍼블리싱 시 매칭되는 `doc/*.html`을 정본으로 삼아 마크업 구조와 토큰 값을 그대로 옮긴다.

### 4.3 타이포그래피

- 기본 폰트: IBM Plex Sans KR.
- IBM Plex Mono는 영숫자 식별자(Stage/Workstream 약어, 계약번호, REV 등)에만 사용한다. 한글 라벨에는 사용하지 않는다.

### 4.4 데이터 패턴

- 각 feature는 `src/features/<feature>/data/` 하위에 자체 mock data를 가진다.
- 서버 컴포넌트에서 id로 조회하고 누락 시 `notFound()`를 호출한다.
- 추후 실제 fetch로 교체 가능한 형태로 설계한다.

### 4.5 코드 스타일

- 화살표 함수 export 선호: `export const X = () => {}`.
- 브랜치명: `<type>/DAP-<issue#>-description` (예: `feat/DAP-579-common-header-component`).
- `Ui*` 컴포넌트 수정 시 같은 폴더의 `*-docs.md`도 함께 갱신.

> 기술 스택, 개발 명령, 빌드 설정은 `CLAUDE.md` 참고.

---

## 5. 향후 계획

Dashboard 화면의 산출물 워크스페이스를 구성하기 위해 다음을 추가 구현한다.

- `DeliverableLegend` — 상태별 카운트(완료 / 리드 검토 대기 / AI 처리 중 / AI 생성 실패 / 미완료) 표시.
- `DeliverableMatrix` — Workstream 12개 × Stage 6개 그리드.
- `DeliverableCell` — 7가지 상태(`ready` / `review` / `generating` / `aiFailed` / `missing` / `blocked` / `na`)와 origin 표시.
- CTA — `AI 생성` / `업로드` / `발행` 3종 액션 (상태별 노출 규칙 적용).
- `AiGenerationModal` — AI 생성 요청 모달. 제출 시 대상 Cell을 `generating`으로 전환.
- 발행 동작 — 대상 Cell에 `REV-01` 부여 또는 기존 REV 증가, status-line을 `발행됨`으로 변경.

상세 사양(상태별 색상 매트릭스, CTA 노출 규칙, Cell 내부 구조, 데이터 모델 등)은 구현 시점에 별도 spec 문서 또는 컴포넌트 docs로 분리한다.
