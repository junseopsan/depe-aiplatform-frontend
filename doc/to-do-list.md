# EPC PE AI-Platform Frontend - To-Do List

PRD v0.2 기준 구현 작업 목록

---

## Phase 1. 프로젝트 세팅

- [x] Next.js + TypeScript 프로젝트 생성 (`--app --src-dir --tailwind --eslint`)
- [x] Tailwind CSS 설정 확인 및 커스텀 설정
- [x] shadcn/ui 초기화 (`npx shadcn@latest init`)
- [x] 필수 패키지 설치 (`lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`)
- [x] `src/styles/tokens.css` 생성 — CSS Variables 컬러 토큰 정의
- [x] `src/styles/typography.css` 생성 — IBM Plex Sans KR / IBM Plex Mono 폰트 설정
- [x] `globals.css`에서 tokens.css, typography.css import
- [x] `src/lib/utils.ts` 유틸 함수 설정 (cn 함수 등)

---

## Phase 2. 타입 및 상수 정의

- [x] `src/features/project-detail/types/project-detail.types.ts` 생성
  - [x] `Project` 타입
  - [x] `DeliverableStatus` 타입 (ready, review, generating, aiFailed, missing, blocked, na)
  - [x] `DeliverableOrigin` 타입 (manualUploaded, manualRequired, aiGenerated, aiAvailable, aiFailed, null)
  - [x] `DeliverableAction` 타입 (aiGenerate, upload, publish)
  - [x] `DeliverableCell` 타입
- [x] `STAGES` 상수 정의 (6종: BID, EST, FEED, DSGN, VEND, REVW)
- [x] `WORKSTREAMS` 상수 정의 (12종: CMN, PRC, MEQ, ELE, INS, MEC, WTR, CIV, ARC, PIP, LAY, UTL)

---

## Phase 3. Mock 데이터 작성

- [x] `src/features/project-detail/data/mock-project.ts` — 프로젝트 mock 데이터
- [x] `src/features/project-detail/data/mock-deliverables.ts` — 산출물 Cell mock 데이터 (카운트 검증 완료)

---

## Phase 4. shadcn/ui 컴포넌트 추가 + 커스텀

- [x] `src/components/ui/UiButton.tsx` — PRD CTA 규칙 적용 (Primary=gray-600, Secondary=white/gray)
- [x] `src/components/ui/UiSheet.tsx` (Drawer용)
- [x] `src/components/ui/UiInput.tsx` — focus 시 border-color만 primary-500, ring 제거
- [x] `src/components/ui/UiTextarea.tsx`
- [x] `globals.css` shadcn 테마 → PRD 디자인 토큰 매핑

---

## Phase 5. 레이아웃 컴포넌트 구현

- [x] `TopBand.tsx` — 5px 높이 gradient band, sticky
- [x] `AppHeader.tsx` — 52px 높이, 로고 + shadcn Input 검색, POC 태그 + 아바타
- [x] `ProjectBar.tsx` — 프로젝트명, 계약번호, 계약기간 표시
- [x] `DeliverableLegend.tsx` — 상태별 카운트 칩(badge) 스타일, 산출물 탭/AI Chat 비활성
- [x] `app/layout.tsx` — 전체 레이아웃 구성
- [x] `app/projects/[projectId]/page.tsx` — 페이지 라우트 설정
- [x] `ProjectDetailPage.tsx` — 위 컴포넌트 조합

---

## Phase 6. Matrix 구현

- [x] `DeliverableMatrix.tsx` — grid 레이아웃 (176px + 6 균등 컬럼), Stage 헤더 행, rounded-xl + shadow
- [x] `DeliverableRow.tsx` — Workstream 라벨 + 6개 Cell 렌더링
- [x] `DeliverableCell.tsx` — Cell 내부 구조 구현
  - [x] 문서명 + REV (pill badge)
  - [x] origin-hint 표시 (회색 텍스트)
  - [x] status-line 표시 (상태별 색상)
  - [x] CTA row (margin-top: auto 하단 고정) + 아이콘 (Sparkles/Upload/CheckCircle2)

---

## Phase 7. Cell 상태별 UI 구현

- [x] `src/features/project-detail/utils/deliverable-status.ts` — 상태별 스타일 매핑
  - [x] `ready` — 좌측 border: success, bg: white, hover: success-bg
  - [x] `review` — 좌측 border: warning, bg: warning-bg, hover: warning-bg-hover
  - [x] `generating` — 좌측 border: primary-500, bg: primary-50, hover: primary-100
  - [x] `aiFailed` — 좌측 border: error, bg: error-bg, hover: error-bg-hover
  - [x] `missing` — 좌측 border: gray-300, bg: white, hover: gray-50
  - [x] `blocked` — disabled stripe 패턴, hover 없음
  - [x] `na` — stripe 패턴, hover 없음
- [x] generating 상태 — status-line 텍스트("AI 처리 중...")만 표시, progress bar 없음

---

## Phase 8. CTA 버튼 규칙 구현

- [x] `src/features/project-detail/utils/deliverable-actions.ts` — 상태/조건별 CTA 결정 로직
- [x] CTA 버튼 스타일 구현 (shadcn UiButton variant 커스텀)
- [x] 상태별 CTA 매핑 구현
  - [x] missing + AI 생성 가능 → [AI 생성] Primary
  - [x] missing + 수기 업로드 필요 → [업로드] Primary
  - [x] review → [발행] Primary + [AI 생성] Secondary
  - [x] ready + 업로드 완료 + 미발행 → [발행] Primary + [업로드] Secondary
  - [x] ready + 수기 발행됨 → [업로드] Secondary
  - [x] ready + AI 발행됨 → [AI 생성] Secondary
  - [x] generating → CTA 없음
  - [x] aiFailed → [AI 생성] Primary + [업로드] Secondary
  - [x] blocked / na → CTA 없음

---

## Phase 9. AI 생성 Drawer + 업로드 Drawer 구현

- [x] `AiGenerationDrawer.tsx` 구현 (우측 Drawer, shadcn Sheet)
  - [x] Drawer 제목: "AI 생성" + Sparkles 아이콘
  - [x] Context 영역: 문서명, Workstream, Stage (blue tint)
  - [x] 추가 지시사항 textarea
  - [x] 참고 자료 첨부 dropzone (PDF, DWG, XLSX, DOCX)
  - [x] 취소 / AI 생성 버튼 (brand blue)
- [x] `UploadDrawer.tsx` 구현 (우측 Drawer, shadcn Sheet)
  - [x] 파일 드래그 & 드롭 dropzone
  - [x] 첨부 파일 목록 + 삭제
  - [x] 업로드 후 Cell → ready (업로드 완료)
- [x] 제출 후 동작 구현
  - [x] Drawer 닫기
  - [x] AI 생성: 대상 Cell → generating, status-line "AI 처리 중..."
  - [x] 업로드: 대상 Cell → ready, status-line "업로드 완료"

---

## Phase 10. 발행 동작 구현

- [x] 발행 버튼 클릭 핸들러 구현
  - [x] Cell 상태 `ready` 유지
  - [x] status-line을 "발행됨"으로 변경
  - [x] REV 없으면 `REV-01` 부여
  - [x] REV 있으면 숫자 +1 증가
  - [x] Primary 발행 버튼 제거
  - [x] origin에 따라 Secondary CTA 유지 (수기→업로드, AI→AI 생성)

---

## Phase 11. 마감 정리

- [x] 디자인 시스템 컬러 비교 검증 — 임의 HEX를 CSS Variable로 치환 완료
- [x] Typography 점검 — 한글 라벨에 Mono 폰트 미사용 확인, Drawer 코드/한글 분리
- [x] 폰트 크기/간격 조정 완료
- [x] hover / focus 상태 점검 (검색 input focus border-color만 변경, box-shadow 없음)
- [x] sticky 구조 점검 (Top band, Header)
- [x] 반응형 최소 대응 (overflow-x-auto + min-width)
- [x] mock data 정리 — Legend 카운트와 Matrix Cell 수 일치 확인
- [x] 업로드 버튼 → UploadDrawer로 구현 완료
