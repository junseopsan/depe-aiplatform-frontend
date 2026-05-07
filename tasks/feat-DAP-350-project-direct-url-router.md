# feat/DAP-350-project-direct-url-router

## 개요

프로젝트 직접 URL 접근 지원 라우터 설정

## 유저 스토리

**As** 개발팀으로서
**In order to** 사용자가 브라우저 북마크를 통해 특정 프로젝트에 바로 접근하거나 URL을 공유할 수 있도록 하기 위해서
**I want** 프로젝트별 고유 URL 라우팅을 구현하고 직접 접근을 지원하고 싶다

## Acceptance Criteria

| # | Given | When | Then |
|---|---|---|---|
| 1 | 사용자가 특정 프로젝트 상세 페이지에 있고 | 브라우저 주소창의 URL을 확인하면 | 프로젝트를 식별할 수 있는 고유한 URL(예: `/projects/{projectId}`)이 표시된다 |
| 2 | 사용자가 프로젝트 상세 페이지 URL을 북마크에 저장하고 | 나중에 해당 북마크를 통해 접근하면 | 해당 프로젝트 상세 페이지로 직접 이동된다 |
| 3 | 사용자가 프로젝트 URL을 주소창에 직접 입력하거나 복사-붙여넣기 하고 | 엔터를 누르면 | 해당 프로젝트 페이지로 정상적으로 이동되고 콘텐츠가 로드된다 |
| 4 | 사용자가 프로젝트 상세 페이지에서 | 브라우저 새로고침(F5)을 하면 | 페이지가 정상적으로 다시 로드되고 동일한 프로젝트 정보가 표시된다 |

## Tech Spec

- 프론트엔드 프로젝트 구조 초기 설계 시 라우팅 구조 고려
- 메뉴 네비게이션과 URL 라우트 매핑 구조 설계
- 환경 설정(개발/배포) 시 라우팅 설정 포함

## 구현 내용

### 라우팅 구조

```
app/
└── projects/[projectId]/
    ├── layout.tsx   ← 서버 컴포넌트. projectId로 프로젝트 데이터 로딩, 쉘 렌더링
    └── page.tsx     ← 서버 컴포넌트. DeliverableMatrixPage 렌더링
```

- `[projectId]` 동적 라우트 세그먼트로 `/projects/{id}` URL 자동 지원
- `layout.tsx`가 프로젝트 데이터를 로드하므로 북마크·직접 입력·새로고침 모두 정상 동작
- 존재하지 않는 projectId 접근 시 `notFound()` 처리

### 프로젝트 전환

- `ProjectSwitcher`, `ProjectSearchInput`에서 `router.push('/projects/${id}')` 사용
- URL이 진실의 원천(source of truth)으로 동작 — 상태가 아닌 URL로 현재 프로젝트 결정

### API 연동 준비

`layout.tsx` 내 주석으로 향후 교체 지점 명시:

```ts
// TODO: API 연동 시 아래 함수로 교체
// const project = await fetch(`${process.env.API_BASE_URL}/projects/${projectId}`)
const project = MOCK_PROJECTS.find((p) => p.id === projectId)
```

## TODO

- [x] `app/projects/[projectId]/layout.tsx` 생성
- [x] `ProjectShell` 컴포넌트 분리 (사이드바 상태 등 클라이언트 상태 담당)
- [x] `DeliverableMatrixPage` 분리 (산출물 콘텐츠 전담)
- [x] `ProjectSwitcher` / `ProjectSearchInput` → `router.push` 전환
- [ ] API 연동 시 `layout.tsx` fetch 교체
