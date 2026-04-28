# EPC PE AI-Platform Frontend PRD

## 0. 문서 정보

- 문서명: EPC PE AI-Platform Frontend PRD
- 버전: v0.2
- 작성 목적: `hifi-project.html` 화면을 React + Next.js + TypeScript 기반으로 구현하기 위한 프론트엔드 개발 기준 정의
- 프로젝트명: `depe-aiplatform-frontend`
- 구현 범위: 프로젝트 상세 화면의 **산출물 워크스페이스 Matrix**
- 제외 범위: AI Chat, 프로젝트 목록, Activity Feed Drawer, 실제 문서 뷰어, 실제 인증/권한
- 기준 산출물:
  - `design-system.md`
  - `color-system.html`
  - `hifi-project.html`

---

## 1. 프로젝트 개요

EPC PE AI-Platform의 초기 POC는 프로젝트 단위 산출물 현황을 Workstream × Stage Matrix로 보여주는 웹 화면이다.

사용자는 하나의 프로젝트 상세 화면에서 산출물별 상태를 확인하고, AI 생성 가능 여부, 수기 업로드 필요 여부, 리드 검토 대기, AI 처리 중, AI 생성 실패, 발행됨 상태를 한눈에 파악할 수 있어야 한다.

초기 구현은 `hifi-project.html`의 **산출물 탭 화면만** 대상으로 한다. AI Chat 탭은 화면에 노출하지 않거나 비활성 처리한다.

---

## 2. 제품 목표

### 2.1 핵심 목표

1. `hifi-project.html`에 정의된 프로젝트 상세 화면을 Next.js 기반으로 재구현한다.
2. Workstream × Stage 구조의 산출물 Matrix를 구현한다.
3. Cell 상태별 시각 표현을 디자인 시스템 규칙에 맞게 구현한다.
4. Cell별 CTA 버튼 노출 규칙을 구현한다.
5. AI 생성 버튼 클릭 시 모달을 열고, 제출 후 해당 Cell을 `AI 처리 중` 상태로 변경한다.
6. 발행 버튼 클릭 시 해당 Cell을 `발행됨` 상태로 변경하고 REV를 부여한다.
7. 모든 컬러와 타이포그래피는 제공된 디자인 시스템 토큰을 따른다.

### 2.2 비목표

초기 POC에서는 다음을 구현하지 않는다.

- AI Chat 화면
- 프로젝트 목록 화면
- Activity Feed Drawer
- 실제 AI 생성 API 연동
- 실제 파일 업로드 서버 연동
- 실제 로그인/권한 관리
- 실제 문서 다운로드/미리보기
- DWG/PDF Viewer
- 복잡한 라우팅/전역 상태 관리

---

## 3. 기술 스택

### 3.1 기본 스택

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
shadcn/ui
CSS Variables 기반 Design Token
```

### 3.2 상태 관리

초기 POC에서는 복잡한 상태관리 라이브러리를 사용하지 않고 React state 중심으로 구현한다.

```txt
Cell 상태: useState
Modal 상태: useState
Project mock data: local constant
```

단, 추후 확장을 고려해 타입과 데이터 구조는 API 연동 가능한 형태로 설계한다.

### 3.3 추천 패키지

```txt
lucide-react
clsx
tailwind-merge
class-variance-authority
```

선택 사항:

```txt
@tanstack/react-query — 실제 API 연동 시 도입
zustand — 전역 UI 상태가 필요해질 때 도입
react-hook-form + zod — 모달 폼 검증이 복잡해질 때 도입
```

---

## 4. 디자인 시스템 요구사항

## 4.1 단일 출처 원칙

`design-system.md`와 `color-system.html`을 디자인 시스템의 기준으로 사용한다.

구현 중 다음을 금지한다.

- 임의 HEX 색상 직접 사용
- 임의 폰트 크기 추가
- 상태별 색상 규칙 변경
- CTA 버튼에 브랜드 파랑을 남용
- 한글 라벨에 Mono 폰트 사용

---

## 4.2 컬러 토큰

`src/styles/tokens.css`에 다음 토큰을 정의한다.

```css
:root {
  --primary-900: #001E3C;
  --primary-800: #002E5D;
  --primary-700: #003F7F;
  --primary-600: #004E9A;
  --primary-500: #0059A8;
  --primary-400: #1A70BB;
  --primary-300: #4A95D0;
  --primary-200: #8DC0E8;
  --primary-100: #C6E0F4;
  --primary-50: #EAF4FB;

  --gray-900: #0D1117;
  --gray-800: #1C2230;
  --gray-700: #2E3A4E;
  --gray-600: #4A5568;
  --gray-500: #6B7A8F;
  --gray-400: #94A3B8;
  --gray-300: #CBD5E1;
  --gray-200: #E2E8F0;
  --gray-100: #F1F5F9;
  --gray-50: #F8FAFC;

  --success: #3A8C6E;
  --success-bg: #EAF5EF;
  --warning: #B07D3A;
  --warning-bg: #FBF2E4;
  --error: #A04545;
  --error-bg: #F9ECEC;
  --info: #3A6A96;
  --info-bg: #ECF2F8;

  --matrix-bg: var(--gray-100);
  --matrix-border: var(--gray-200);
  --matrix-cell-bg: #fff;
  --matrix-header-bg: var(--gray-50);
}
```

---

## 4.3 컬러 사용 원칙

### Primary Blue 사용처

`--primary-500`은 다음 용도로 제한한다.

- top-band gradient
- AI 처리 중 Cell border
- AI 처리 중 progress bar
- 프로젝트 검색 focus border
- AI 생성 관련 시각 시그널

### CTA 버튼 컬러

CTA 버튼은 브랜드 파랑이 아니라 neutral gray 계열을 사용한다.

```txt
Primary CTA
- background: --gray-600
- color: white
- hover: --gray-700

Secondary CTA
- background: white
- color: --gray-700
- border: --gray-300
- hover background: --gray-50
```

---

## 4.4 Typography

기본 폰트는 IBM Plex Sans KR이다.

```css
body {
  font-family: 'IBM Plex Sans KR', sans-serif;
}
```

IBM Plex Mono는 다음에만 사용한다.

- Stage 약어: `01 / BID`
- Workstream 약어: `PRC`, `MEQ`
- 계약번호
- 검색 dropdown의 하위 메타

한글 라벨에는 Mono를 사용하지 않는다.

---

## 5. 구현 화면 범위

## 5.1 프로젝트 상세 — 산출물 워크스페이스

### 라우트

```txt
/projects/[projectId]
```

초기 POC에서는 단일 프로젝트 mock data로 구현해도 된다.

### 화면 구성

위에서 아래로 다음 영역을 구성한다.

```txt
1. Top band
2. Header
3. Project bar
4. Legend
5. Matrix wrap
6. AI Generation Modal
```

AI Chat 탭, Activity Drawer는 구현하지 않는다.

---

## 5.2 Top band

### 요구사항

- 화면 최상단에 5px 높이의 브랜드 gradient band를 표시한다.
- sticky 처리한다.

### 스타일

```css
height: 5px;
background: linear-gradient(90deg, var(--primary-900), var(--primary-500), var(--primary-300));
```

---

## 5.3 Header

### 요구사항

Header는 52px 높이로 구성한다.

구성 요소:

- 좌측 로고
- 중앙 프로젝트 검색 input
- 우측 영역은 초기 POC에서 비워두거나 간단한 placeholder만 둔다.

### 프로젝트 검색

- height: 36px
- width: 380px 내외
- placeholder: `프로젝트 검색...`
- focus 시 border-color만 `--primary-500`으로 변경한다.
- box-shadow ring은 사용하지 않는다.

검색 dropdown은 선택 구현이다. 초기 POC에서는 input만 구현해도 된다.

---

## 5.4 Project bar

### 요구사항

현재 프로젝트명을 표시한다.

표시 정보:

```txt
프로젝트명
계약번호
계약기간
```

예시:

```txt
사우디 주바일 복합화력 플랜트 건설
계약번호 KSA-JIC-2026-0312 · 계약기간 2026.04 – 2028.12
```

### 스타일

- height: 약 85px
- background: `--matrix-cell-bg`
- border-bottom: `1px solid --matrix-border`
- padding: `16px 32px`
- sticky 가능

---

## 5.5 Legend

### 요구사항

산출물 상태별 카운트를 한 줄로 표시한다.

View tab은 초기 POC에서는 `산출물`만 표시한다. `AI Chat` 탭은 제거하거나 disabled 처리한다.

표시 상태:

```txt
완료 18
리드 검토 대기 9
AI 처리 중 3
AI 생성 실패 1
미완료 12
```

### 상태 색상

| 상태 | 색상 |
|---|---|
| 완료 | `--success` |
| 리드 검토 대기 | `--warning` |
| AI 처리 중 | `--primary-500` |
| AI 생성 실패 | `--error` |
| 미완료 | `--gray-300` |

---

## 5.6 Matrix

### 목적

Workstream × Stage 구조의 산출물 상태를 표시한다.

### 컬럼 구조

```css
grid-template-columns: 160px repeat(6, 1fr);
```

### Stage 6종

```ts
const STAGES = [
  { code: 'BID', index: '01', name: '입찰' },
  { code: 'EST', index: '02', name: '견적' },
  { code: 'FEED', index: '03', name: '기본설계' },
  { code: 'DSGN', index: '04', name: '상세설계' },
  { code: 'VEND', index: '05', name: 'Vendor 선정' },
  { code: 'REVW', index: '06', name: '대조·평가' },
]
```

### Workstream

```ts
const WORKSTREAMS = [
  { code: 'CMN', name: '공통' },
  { code: 'PRC', name: '프로세스' },
  { code: 'MEQ', name: '주기기' },
  { code: 'ELE', name: '전기' },
  { code: 'INS', name: '계장' },
  { code: 'MEC', name: '기계' },
  { code: 'WTR', name: '수처리' },
  { code: 'CIV', name: '토목' },
  { code: 'ARC', name: '건축' },
  { code: 'PIP', name: '배관' },
  { code: 'LAY', name: '공간' },
  { code: 'UTL', name: '설비' },
]
```

---

## 6. Cell 요구사항

## 6.1 Cell 상태 타입

```ts
type DeliverableStatus =
  | 'ready'
  | 'review'
  | 'generating'
  | 'aiFailed'
  | 'missing'
  | 'blocked'
  | 'na'
```

### 상태 의미

| 상태 | 의미 |
|---|---|
| ready | 업로드 완료 또는 발행됨 |
| review | AI 생성 완료 후 리드 검토 대기 |
| generating | AI 처리 중 |
| aiFailed | AI 생성 실패 |
| missing | 아직 문서 없음 |
| blocked | 선행 단계 미완료 |
| na | 해당 없음 |

---

## 6.2 Cell Origin 타입

```ts
type DeliverableOrigin =
  | 'manualUploaded'
  | 'manualRequired'
  | 'aiGenerated'
  | 'aiAvailable'
  | 'aiFailed'
  | null
```

### Origin 표시 라벨

| origin | 표시 |
|---|---|
| manualUploaded | 수기 업로드 완료 |
| manualRequired | 수기 업로드 필요 |
| aiGenerated | AI 생성 완료 |
| aiAvailable | AI 생성 가능 |
| aiFailed | AI 생성 실패 |
| null | 표시 없음 |

Origin 라벨은 색상으로 강조하지 않고 `--gray-600` 계열 텍스트로 표시한다.

---

## 6.3 Cell 시각 표현

| 상태 | 좌측 border | 배경 | Hover |
|---|---|---|---|
| ready | `--success` | white | `--success-bg` |
| review | `--warning` | `--warning-bg` | `#f6e8cd` |
| generating | `--primary-500` | `--primary-50` | `--primary-100` |
| aiFailed | `--error` | `--error-bg` | `#f4dcdc` |
| missing | `--gray-300` | white | `--gray-50` |
| blocked | disabled stripe | stripe | none |
| na | stripe | stripe | none |

---

## 6.4 Cell 내부 구조

Cell 내부는 다음 순서를 따른다.

```txt
1. 문서명 + REV
2. origin-hint
3. status-line
4. progress bar 또는 CTA row
```

### 문서명

- font-size: 12px
- font-weight: 600
- color: `--gray-900`

### REV

- font-size: 11px
- font-weight: 500
- color: `--gray-500`
- 문서명 우측 정렬

### origin-hint

- font-size: 11px
- color: `--gray-600`

### status-line

- font-size: 11px
- font-weight: 600
- 상태별 색상 사용

### CTA row

- Cell 하단에 고정한다.
- `margin-top: auto`를 사용한다.

---

## 7. CTA 규칙

## 7.1 Action 타입

```ts
type DeliverableAction = {
  type: 'aiGenerate' | 'upload' | 'publish'
  variant: 'primary' | 'secondary'
  label: 'AI 생성' | '업로드' | '발행'
}
```

## 7.2 상태별 CTA

| 상태/조건 | CTA |
|---|---|
| missing + AI 생성 가능 | `[AI 생성]` Primary |
| missing + 수기 업로드 필요 | `[업로드]` Primary |
| review | `[발행]` Primary + `[AI 생성]` Secondary |
| ready + 업로드 완료 + 미발행 | `[발행]` Primary + `[업로드]` Secondary |
| ready + 수기 발행됨 | `[업로드]` Secondary |
| ready + AI 발행됨 | `[AI 생성]` Secondary |
| generating | CTA 없음, progress 표시 |
| aiFailed | `[AI 생성]` Primary + `[업로드]` Secondary |
| blocked | CTA 없음 |
| na | CTA 없음 |

---

## 8. AI 생성 모달

## 8.1 목적

`AI 생성` 버튼 클릭 시 산출물 생성 요청을 위한 모달을 표시한다.

## 8.2 구성

- 모달 제목: `AI 생성`
- Context 영역
  - 문서명
  - Workstream
  - Stage
- 추가 지시사항 textarea
- 참고 자료 첨부 dropzone
- 취소 버튼
- AI 생성 버튼

## 8.3 첨부 가능 형식

```txt
PDF
DWG
XLSX
DOCX
```

## 8.4 제출 후 동작

초기 POC에서는 실제 API를 호출하지 않는다.

제출 시 다음을 수행한다.

1. 모달 닫기
2. 대상 Cell 상태를 `generating`으로 변경
3. origin을 `aiAvailable`로 유지하거나 null 처리
4. status-line을 `AI 처리 중...`으로 표시
5. progress bar를 0~60% 정도로 표시
6. CTA 버튼 제거

---

## 9. 발행 동작

## 9.1 목적

`발행` 버튼 클릭 시 검토 또는 업로드 완료 상태의 문서를 공식 발행 상태로 변경한다.

## 9.2 동작

1. 대상 Cell 상태를 `ready`로 유지한다.
2. status-line을 `발행됨`으로 변경한다.
3. REV가 없으면 `REV-01`을 부여한다.
4. REV가 있으면 숫자를 1 증가시킨다.
5. Primary `발행` 버튼을 제거한다.
6. origin에 따라 Secondary CTA를 유지한다.
   - 수기 문서: `업로드`
   - AI 문서: `AI 생성`

---

## 10. 데이터 모델 초안

## 10.1 Project

```ts
type Project = {
  id: string
  name: string
  contractNo: string
  startDate: string
  endDate: string
}
```

## 10.2 DeliverableCell

```ts
type DeliverableCell = {
  id: string
  workstreamCode: string
  workstreamName: string
  stageCode: string
  stageName: string
  documentTitle?: string
  revision?: string
  status: DeliverableStatus
  origin: DeliverableOrigin
  statusText?: string
  progress?: number
  actions: DeliverableAction[]
}
```

---

## 11. 컴포넌트 구조

```txt
src/
  app/
    layout.tsx
    globals.css
    projects/
      [projectId]/
        page.tsx

  components/
    ui/
      button.tsx
      dialog.tsx
      input.tsx
      textarea.tsx

  features/
    project-detail/
      components/
        ProjectDetailPage.tsx
        TopBand.tsx
        AppHeader.tsx
        ProjectBar.tsx
        DeliverableLegend.tsx
        DeliverableMatrix.tsx
        DeliverableRow.tsx
        DeliverableCell.tsx
        AiGenerationModal.tsx
      data/
        mock-project.ts
        mock-deliverables.ts
      types/
        project-detail.types.ts
      utils/
        deliverable-actions.ts
        deliverable-status.ts

  styles/
    tokens.css
    typography.css

  lib/
    utils.ts
```

---

## 12. 초기 개발 순서

### Phase 1. 프로젝트 세팅

1. Next.js + TypeScript 프로젝트 생성
2. Tailwind CSS 설정
3. shadcn/ui 초기화
4. tokens.css 추가
5. typography.css 추가
6. globals.css에서 tokens/typography import

### Phase 2. 레이아웃 구현

1. TopBand 구현
2. AppHeader 구현
3. ProjectBar 구현
4. DeliverableLegend 구현
5. 페이지 전체 sticky 구조 정리

### Phase 3. Matrix 구현

1. STAGES 상수 정의
2. WORKSTREAMS 상수 정의
3. mock deliverables 정의
4. DeliverableMatrix 구현
5. DeliverableRow 구현
6. DeliverableCell 구현

### Phase 4. Cell 상태별 UI 구현

1. ready 상태
2. review 상태
3. generating 상태
4. aiFailed 상태
5. missing 상태
6. blocked 상태
7. na 상태

### Phase 5. 액션 구현

1. AI 생성 버튼 클릭
2. AiGenerationModal 열기
3. 모달 제출 시 generating 전환
4. 발행 버튼 클릭 시 REV 부여 및 발행됨 전환
5. 업로드 버튼은 초기 POC에서 alert 또는 no-op 처리

### Phase 6. 마감 정리

1. 디자인 시스템과 색상 비교
2. 폰트 크기/간격 조정
3. hover/focus 상태 점검
4. 반응형 최소 대응
5. mock data 정리

---

## 13. 수용 기준

### 13.1 화면 구성

- `/projects/[projectId]`에서 프로젝트 상세 화면이 표시된다.
- Top band, Header, Project bar, Legend, Matrix가 순서대로 배치된다.
- AI Chat 영역은 표시되지 않는다.

### 13.2 디자인 시스템

- 모든 색상은 CSS Variables를 통해 사용한다.
- Cell 상태별 border/background가 디자인 시스템 규칙과 일치한다.
- CTA 버튼은 neutral gray 규칙을 따른다.
- Focus 상태는 border-color 변경만 사용한다.
- 한글 라벨은 Sans 폰트를 사용한다.

### 13.3 Matrix

- Workstream 12개와 Stage 6개가 표시된다.
- 좌측 Workstream 컬럼은 160px 고정이다.
- Stage 컬럼은 6개 균등 분배된다.
- 각 Cell은 상태별 UI를 정상적으로 표시한다.

### 13.4 Cell 액션

- `AI 생성` 클릭 시 모달이 열린다.
- 모달 제출 후 해당 Cell이 `AI 처리 중` 상태로 변경된다.
- `발행` 클릭 시 해당 Cell에 REV가 부여되고 `발행됨`으로 변경된다.
- `blocked`, `na`, `generating` 상태에서는 CTA가 노출되지 않는다.

---

## 14. Cursor / Claude Code 작업 지시용 요약

```txt
Next.js + React + TypeScript + Tailwind CSS + shadcn/ui 기반으로 `depe-aiplatform-frontend` 프로젝트에서 hifi-project.html 화면만 구현한다.

구현 범위는 프로젝트 상세 화면의 산출물 워크스페이스 Matrix이다.
AI Chat, 프로젝트 목록, Activity Feed Drawer는 구현하지 않는다.

화면은 TopBand, AppHeader, ProjectBar, DeliverableLegend, DeliverableMatrix, AiGenerationModal로 구성한다.

디자인 시스템은 color-system.html과 design-system.md를 기준으로 하며, 모든 색상은 CSS Variables 기반 tokens.css로 관리한다.
임의 HEX 직접 사용은 금지한다.

Matrix는 Workstream 12개 × Stage 6개 구조이다.
각 Cell은 ready, review, generating, aiFailed, missing, blocked, na 상태를 가진다.
상태는 좌측 border와 배경 tint로 표현한다.
origin-hint는 중립 회색 텍스트로만 표시한다.

CTA는 AI 생성, 업로드, 발행 세 가지 라벨만 사용한다.
CTA 버튼은 브랜드 파랑이 아니라 neutral gray 스타일을 사용한다.

AI 생성 버튼 클릭 시 AiGenerationModal을 열고, 제출 후 대상 Cell을 generating 상태로 변경한다.
발행 버튼 클릭 시 대상 Cell에 REV-01을 부여하거나 기존 REV를 증가시키고 status-line을 발행됨으로 변경한다.
```

---

## 15. 초기 설치 명령

```bash
npx create-next-app@latest depe-aiplatform-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd depe-aiplatform-frontend

npx shadcn@latest init

npm install lucide-react clsx tailwind-merge class-variance-authority
```

선택 설치:

```bash
npm install @tanstack/react-query zustand react-hook-form zod @hookform/resolvers
```
