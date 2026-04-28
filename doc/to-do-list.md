# EPC PE AI-Platform Frontend - To-Do List

PRD v0.2 기준 구현 작업 목록

---

## Phase 1. 프로젝트 세팅

- [ ] Next.js + TypeScript 프로젝트 생성 (`--app --src-dir --tailwind --eslint`)
- [ ] Tailwind CSS 설정 확인 및 커스텀 설정
- [ ] shadcn/ui 초기화 (`npx shadcn@latest init`)
- [ ] 필수 패키지 설치 (`lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`)
- [ ] `src/styles/tokens.css` 생성 — CSS Variables 컬러 토큰 정의
- [ ] `src/styles/typography.css` 생성 — IBM Plex Sans KR / IBM Plex Mono 폰트 설정
- [ ] `globals.css`에서 tokens.css, typography.css import
- [ ] `src/lib/utils.ts` 유틸 함수 설정 (cn 함수 등)

---

## Phase 2. 타입 및 상수 정의

- [ ] `src/features/project-detail/types/project-detail.types.ts` 생성
  - [ ] `Project` 타입
  - [ ] `DeliverableStatus` 타입 (ready, review, generating, aiFailed, missing, blocked, na)
  - [ ] `DeliverableOrigin` 타입 (manualUploaded, manualRequired, aiGenerated, aiAvailable, aiFailed, null)
  - [ ] `DeliverableAction` 타입 (aiGenerate, upload, publish)
  - [ ] `DeliverableCell` 타입
- [ ] `STAGES` 상수 정의 (6종: BID, EST, FEED, DSGN, VEND, REVW)
- [ ] `WORKSTREAMS` 상수 정의 (12종: CMN, PRC, MEQ, ELE, INS, MEC, WTR, CIV, ARC, PIP, LAY, UTL)

---

## Phase 3. Mock 데이터 작성

- [ ] `src/features/project-detail/data/mock-project.ts` — 프로젝트 mock 데이터
  - 프로젝트명, 계약번호, 계약기간 포함
- [ ] `src/features/project-detail/data/mock-deliverables.ts` — 산출물 Cell mock 데이터
  - 모든 상태(ready, review, generating, aiFailed, missing, blocked, na)를 포함하도록 구성
  - Legend 카운트와 일치: 완료 18, 리드 검토 대기 9, AI 처리 중 3, AI 생성 실패 1, 미완료 12

---

## Phase 4. shadcn/ui 컴포넌트 추가

- [ ] `src/components/ui/UiButton.tsx`
- [ ] `src/components/ui/UiSheet.tsx` (Drawer용)
- [ ] `src/components/ui/UiInput.tsx`
- [ ] `src/components/ui/UiTextarea.tsx`

---

## Phase 5. 레이아웃 컴포넌트 구현

- [ ] `TopBand.tsx` — 5px 높이 gradient band, sticky
- [ ] `AppHeader.tsx` — 52px 높이, 로고 + 프로젝트 검색 input (380px, focus 시 border-color만 변경)
- [ ] `ProjectBar.tsx` — 프로젝트명, 계약번호, 계약기간 표시 (85px 높이)
- [ ] `DeliverableLegend.tsx` — 상태별 카운트 한 줄 표시, 산출물 탭 활성/AI Chat 탭 비활성
- [ ] `app/layout.tsx` — 전체 레이아웃 구성
- [ ] `app/projects/[projectId]/page.tsx` — 페이지 라우트 설정
- [ ] `ProjectDetailPage.tsx` — 위 컴포넌트 조합

---

## Phase 6. Matrix 구현

- [ ] `DeliverableMatrix.tsx` — grid 레이아웃 (160px + 6 균등 컬럼), Stage 헤더 행 포함
- [ ] `DeliverableRow.tsx` — Workstream 라벨 + 6개 Cell 렌더링
- [ ] `DeliverableCell.tsx` — Cell 내부 구조 구현
  - [ ] 문서명 + REV 표시
  - [ ] origin-hint 표시 (회색 텍스트)
  - [ ] status-line 표시 (상태별 색상)
  - [ ] CTA row (margin-top: auto 하단 고정)

---

## Phase 7. Cell 상태별 UI 구현

- [ ] `src/features/project-detail/utils/deliverable-status.ts` — 상태별 스타일 매핑
  - [ ] `ready` — 좌측 border: success, bg: white, hover: success-bg
  - [ ] `review` — 좌측 border: warning, bg: warning-bg, hover: #f6e8cd
  - [ ] `generating` — 좌측 border: primary-500, bg: primary-50, hover: primary-100
  - [ ] `aiFailed` — 좌측 border: error, bg: error-bg, hover: #f4dcdc
  - [ ] `missing` — 좌측 border: gray-300, bg: white, hover: gray-50
  - [ ] `blocked` — disabled stripe 패턴, hover 없음
  - [ ] `na` — stripe 패턴, hover 없음
- [ ] generating 상태 — status-line 텍스트("AI 처리 중...")만 표시, progress bar 없음

---

## Phase 8. CTA 버튼 규칙 구현

- [ ] `src/features/project-detail/utils/deliverable-actions.ts` — 상태/조건별 CTA 결정 로직
- [ ] CTA 버튼 스타일 구현
  - [ ] Primary CTA: bg gray-600, color white, hover gray-700
  - [ ] Secondary CTA: bg white, color gray-700, border gray-300, hover bg gray-50
- [ ] 상태별 CTA 매핑 구현
  - [ ] missing + AI 생성 가능 → [AI 생성] Primary
  - [ ] missing + 수기 업로드 필요 → [업로드] Primary
  - [ ] review → [발행] Primary + [AI 생성] Secondary
  - [ ] ready + 업로드 완료 + 미발행 → [발행] Primary + [업로드] Secondary
  - [ ] ready + 수기 발행됨 → [업로드] Secondary
  - [ ] ready + AI 발행됨 → [AI 생성] Secondary
  - [ ] generating → CTA 없음
  - [ ] aiFailed → [AI 생성] Primary + [업로드] Secondary
  - [ ] blocked / na → CTA 없음

---

## Phase 9. AI 생성 Drawer 구현

- [ ] `AiGenerationDrawer.tsx` 구현 (우측에서 슬라이드 인하는 Drawer/Sheet 형태)
  - [ ] Drawer 제목: "AI 생성"
  - [ ] Context 영역: 문서명, Workstream, Stage 표시
  - [ ] 추가 지시사항 textarea
  - [ ] 참고 자료 첨부 dropzone (PDF, DWG, XLSX, DOCX)
  - [ ] 취소 / AI 생성 버튼
- [ ] shadcn/ui `sheet` 컴포넌트 추가 (dialog 대신)
- [ ] 제출 후 동작 구현
  - [ ] Drawer 닫기
  - [ ] 대상 Cell 상태를 `generating`으로 변경
  - [ ] status-line을 "AI 처리 중..."으로 표시
  - [ ] CTA 버튼 제거

---

## Phase 10. 발행 동작 구현

- [ ] 발행 버튼 클릭 핸들러 구현
  - [ ] Cell 상태 `ready` 유지
  - [ ] status-line을 "발행됨"으로 변경
  - [ ] REV 없으면 `REV-01` 부여
  - [ ] REV 있으면 숫자 +1 증가
  - [ ] Primary 발행 버튼 제거
  - [ ] origin에 따라 Secondary CTA 유지 (수기→업로드, AI→AI 생성)

---

## Phase 11. 마감 정리

- [ ] 디자인 시스템 컬러 비교 검증 — 임의 HEX 사용 여부 점검
- [ ] Typography 점검 — 한글 라벨에 Mono 폰트 미사용 확인
- [ ] 폰트 크기/간격 조정 (Cell 내부: 문서명 12px/600, REV 11px/500, origin 11px, status 11px/600)
- [ ] hover / focus 상태 점검 (검색 input focus border-color만 변경, box-shadow 없음)
- [ ] sticky 구조 점검 (Top band, Header)
- [ ] 반응형 최소 대응
- [ ] mock data 정리 — Legend 카운트와 Matrix Cell 수 일치 확인
- [ ] 업로드 버튼 alert 또는 no-op 처리 확인
