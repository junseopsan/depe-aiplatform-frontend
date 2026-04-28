# EPC PE AI-Platform — 디자인 시스템

본 문서는 EPC PE AI-Platform의 **디자인 시스템 단일 출처(Single Source of Truth)** 이다. 플랫폼 철학 · 디자인 토큰 · 공통 규칙 · 화면 스펙을 통합 정의하며, 모든 구현(Hi-Fi 프로토타입, 향후 프론트엔드 앱, Figma 라이브러리)은 이 문서에 정의된 값을 **그대로** 재현해야 한다.

> **문서 성격:**  
> "스타일 가이드"가 아닌 **디자인 시스템**. 권장이 아니라 **구현이 지켜야 할 계약(contract)**.  
> Material Design · Carbon · Fluent 등 대형 디자인 시스템과 동일한 위상.

## 용어 정의

- **정식 명칭:** 산출물 워크스페이스 (Deliverable Workspace)
- **UI 탭 라벨:** `산출물` (AI Chat 탭과 대구를 이루는 축약형)
- **내부 코드·CSS 식별자:** `matrix`, `m-cell`, `matrix-wrap`, `--matrix-bg` 등은 그대로 유지 (레거시 식별자 — 리팩터링 대상 아님)

## 참조 구현체

- [`hifi-project.html`](./hifi-project.html) — 프로젝트 단위 화면 (산출물 워크스페이스 + AI Chat)
- [`hifi-project-list.html`](./hifi-project-list.html) — 로그인 후 진입하는 프로젝트 목록
- [`color-system.html`](./color-system.html) — 컬러 토큰 시각 샘플 + 단일 출처

---

## 목차

### Part I · Foundation — 플랫폼 철학
- [1. Single Source of Truth](#1-single-source-of-truth--단일-표준-정의)
- [2. Standardized Output](#2-standardized-output--표준-템플릿-기반-자동-생성)
- [3. 조직 지식 자산화](#3-조직-지식-자산화--사일로-해체-)

### Part II · Design System — 공통 기반
- [1. Color System](#1-color-system)
- [2. Typography](#2-typography)

### Part III · Screen Specs — 화면 스펙
- [1. Cell 상태 체계](#1-cell-상태-체계-status)
- [2. CTA 규칙](#2-cta-규칙-최종)
- [3. Layout & Spacing](#3-layout--spacing)
- [4. AI Chat 뷰](#4-ai-chat-뷰)
- [5. Project List](#5-project-list)
- [6. Activity Feed Drawer](#6-activity-feed-drawer)

### Part IV · Appendix
- [A. Stage 약어](#appendix-a-stage-약어)
- [B. Workstream 약어](#appendix-b-workstream-약어)

---

## Part I · Foundation — 플랫폼 철학

본 워크스페이스는 단순한 **문서 진행률 대시보드**가 아닌, 사용자가 셀 안에서 검토·발행·개정을 직접 실행하는 **활성 작업 공간**이며, 플랫폼이 추구하는 3가지 핵심 가치를 UI 차원에서 구현한 결과물이다.

## 1. Single Source of Truth — 단일 표준 정의

- 모든 문서 상태는 **표준화된 타입**으로만 표현된다.
- 프로젝트별 Rev 표기 편차(`Rev.0` / `Rev_0` / `REV.0` / `R0`)를 플랫폼이 **`REV-01` 단일 포맷**으로 흡수한다.

## 2. Standardized Output — 표준 템플릿 기반 자동 생성

- 미작성 산출물에는 **`[AI 생성]`** primary CTA가 자리함.
- AI 생성 요청 시 **참고 자료 첨부**를 모달에서 지원 — 표준 템플릿 + 컨텍스트 조합으로 일관된 산출물 생성.
- 수기 경로(`[업로드]`)는 AI로 커버되지 않는 조직 고유 양식에만 사용.

## 3. 조직 지식 자산화 — 사일로 해체 🌟

- **워크스페이스 자체가 공유 뷰.** 개인 폴더/채팅에 파묻히던 문서가 프로젝트 전체가 보는 통합뷰 형태로 올라옴.
- **발행된 문서도 재개정 가능.** EPC 실무에서 REV-01 이후 REV-02, REV-03이 반복 발생. 플랫폼은 이를 1급 워크플로우로 지원 — **발행됨 셀에도 재개정 Secondary CTA를 노출**.
- **검토-발행-개정 사이클이 셀 안에서 완결.** 다른 사람이 올린 문서를 바로 참조·재사용 가능.

---

## Part II · Design System — 공통 기반

## 1. Color System

공식 브랜드 컬러 시스템은 [**color-system.html**](./color-system.html)에 정의되어 있다. 모든 컬러 토큰은 그 문서를 단일 출처로 사용한다.

### 1.1 워크스페이스 전용 토큰 — 공식 토큰 참조

워크스페이스 레이아웃이 사용하는 별칭 토큰은 모두 color-system의 공식 토큰을 참조한다 (임의값 없음). 토큰 이름의 `matrix` 접두사는 CSS 식별자로 유지한다:

```css
--matrix-bg:        var(--gray-100);   /* #F1F5F9 — 페이지 배경 */
--matrix-border:    var(--gray-200);   /* #E2E8F0 — 셀/패널 경계 */
--matrix-cell-bg:   #fff;              /* 카드/셀 내부 */
--matrix-header-bg: var(--gray-50);    /* #F8FAFC — 테이블 헤더 톤 */
```

### 1.2 역할별 컬러 매핑

| 역할 | 토큰 | HEX | 사용처 |
|------|------|-----|--------|
| Brand Primary | `--primary-500` | `#0059A8` | top-band, 워크스페이스 헤더 border, AI 관련 시각 |
| Success | `--success` | `#3A8C6E` | 완료 상태 (업로드 완료 / 발행됨) |
| Warning | `--warning` | `#B07D3A` | 리드 검토 대기 |
| Error | `--error` | `#A04545` | AI 생성 실패 |
| Info | `--info` | `#3A6A96` | 진행 정보 (activity feed progress) |
| Neutral | `--gray-300~900` | — | 미완료, Blocked, CTA 버튼, 배경 |

### 1.3 컬러 역할 분리 원칙

1. **상태 시그널 = 좌측 border + 배경 틴트** (셀 border-left 3px + 옅은 background)
2. **텍스트 정보 = 중립 회색** (origin-hint 등은 색이 아닌 텍스트로 의미 전달)
3. **CTA = 뉘앙스 색이 아닌 위계** (Primary = gray-600 solid / Secondary = 흰 배경 + gray-300 border)

→ 같은 레이어에 여러 컬러가 중첩되지 않도록 **축(axis)을 분리**한다.

### 1.4 Hover 규칙

셀 hover 시 배경이 **현재 상태 컬러의 한 단계 진한 톤**으로 변한다 (모든 상태 셀 일관 적용):

| 상태 | 기본 배경 | Hover 배경 |
|------|---------|----------|
| 완료 | 흰색 | `--success-bg` |
| 리드 검토 대기 | `--warning-bg` | 한 단계 진한 앰버 (#f6e8cd) |
| AI 처리 중 | `--primary-50` | `--primary-100` |
| AI 생성 실패 | `--error-bg` | 한 단계 진한 빨강 (#f4dcdc) |
| 미완료 | 흰색 | `--gray-50` |

---

## 2. Typography

```
/* 본문 (한국어 중심) — 기본 폰트 */
font-family: 'IBM Plex Sans KR', sans-serif;

/* Mono — 제한된 용도에만 사용 */
font-family: 'IBM Plex Mono', monospace;
```

### 2.1 Sans / Mono 사용 기준

폰트 가독성과 한글 친화성을 우선해 **Sans를 기본**으로 사용한다. Mono는 **영숫자 식별자나 코드 느낌이 필요한 소수 요소**에만 남긴다.

**Mono가 쓰이는 곳 (제한적):**
- Stage 약어 (`01 / BID`, `03 / FEED`)
- Workstream 약어 (`PRC`, `MEQ`)
- Activity Feed 시간 표시 (`방금 전`, `2분 전`)
- AI Chat 참조 칩 (`[REV-02]`)
- 검색 dropdown의 하위 메타

**그 외 모든 텍스트는 Sans (`IBM Plex Sans KR`)로 통일.**

### 2.2 폰트 크기 체계

**워크스페이스 셀 내부:**

| 요소 | 크기 | Weight | 서체 |
|------|------|--------|-----|
| 셀 문서 타이틀 | 12px | 600 | Sans |
| 셀 REV 태그 (`REV-01`) | 11px | 500 | Sans |
| 셀 meta (WS · Stage · origin-hint) | 11px | 400 | Sans |
| 셀 status-line | 11px | **600** | Sans |
| CTA 버튼 | 11px | 500 | Sans |

**워크스페이스 헤더/라벨:**

| 요소 | 크기 | Weight | 서체 |
|------|------|--------|-----|
| 단계 이름 (예: "기본설계") | 14px | 600 | Sans |
| 단계 약어 (예: "03 / FEED") | 10px | 400 | Mono |
| 전공 이름 (예: "프로세스") | 14px | 600 | Sans |
| 전공 약어 (예: "PRC") | 10px | 400 | Mono |

**프로젝트 바:**

| 요소 | 크기 | Weight | 서체 |
|------|------|--------|-----|
| proj-name | 22px | 600 | Sans |
| proj-meta (계약번호 · 계약기간, 한 줄) | 13px | 400 | Sans |

**Legend:**

| 요소 | 크기 | Weight | 서체 |
|------|------|--------|-----|
| view-tab (산출물/AI Chat) | 14px | 500 / active 600 | Sans |
| cell-tag (상태 라벨) | 12px | 500 | Sans |
| cell-tag-count (상태별 카운트) | 12px | 600 | Sans |

**AI Chat:**

| 요소 | 크기 | Weight | 서체 |
|------|------|--------|-----|
| 메시지 본문 (AI/User bubble) | 14px | 400 | Sans |
| 입력창 (`ai-chat-input`) | 14px | 400 | Sans — 메시지 본문과 1:1 일치 |
| context 라벨 (`참조 중`) | 13px | 500 | Sans — 한글 라벨은 Mono 금지 |
| context chip | 12px | 400 | Sans |
| suggestion chip | 11px | 400 | Sans |
| source-link 칩 (`[REV-02]`) | 11px | 400 | **Mono** — 영숫자 식별자 |
| day-divider (`오늘 · YYYY년 M월 D일`) | 11px | 500 | Sans |

**규칙:** 모든 `status-line`은 상태 구분을 위해 **weight 600**으로 통일.

**입력창 폰트 = 메시지 본문 폰트:** 사용자가 타이핑한 글자와 전송 후 말풍선에 찍히는 글자가 시각적으로 같아야 한다 (14px 일치). 1px 차이도 "내가 친 게 그대로 올라간다"는 일치감을 깨뜨린다.

**한글 라벨에 Mono 금지:** `참조 중`, `오늘` 같은 한글 라벨은 Sans를 쓴다. Mono는 **Typography §2.1**에 명시된 영숫자 식별자/코드 유형에만 한정한다.

**한글 문장 간격:** `proj-meta`처럼 한글이 중심인 본문 요소는 `word-spacing: 0.2em; letter-spacing: .02em; line-height: 1.2`을 적용해 단어 사이 숨 쉴 공간을 확보하면서 위아래 여백을 조여준다.

---

## Part III · Screen Specs — 화면 스펙

> 이하 섹션은 플랫폼의 주요 화면별 구체 스펙이다. Part II의 공통 디자인 시스템 토큰·규칙(Color, Typography)을 화면 맥락에 적용한 결과물.

## 1. Cell 상태 체계 (STATUS)

> **화면:** 산출물 워크스페이스 (Layout & Spacing §3과 함께 읽을 것)

워크스페이스의 각 셀은 **하나의 상태**를 가지며, 상태는 좌측 border 색 + 배경 틴트로 시각화된다.

### 1.1 Status 5종

| Status | 좌측 border | 배경 | 의미 | status-line 예시 |
|--------|------------|------|-----|-----------------|
| **완료** | `--success` 녹색 | 흰색 | 업로드 or 발행된 공식 문서 | `업로드 완료` / `발행됨` |
| **리드 검토 대기** | `--warning` 앰버 | `--warning-bg` | AI 생성 완료 → 리드 검토 필요 | `리드 검토 대기 중` |
| **AI 처리 중** | `--primary-500` 파랑 | `--primary-50` | AI가 문서 생성 중 | `AI 처리 중...` + progress bar |
| **AI 생성 실패** | `--error` 빨강 | `--error-bg` | AI 작업 중단/에러 | `AI 처리 중단 · N분 전` |
| **미완료** | `--gray-300` 회색 | 흰색 or 대각 줄무늬 | 문서 없음 (조치 가능 or 선행 단계 대기) | (없음) |

> **Legend 표시 방식**: 도트(8-9px 원형) + 한국어 라벨. 도트 색과 텍스트 색이 동일(`currentColor`).

### 1.2 Status × Origin-hint 조합

셀은 **상태(Status)** 와 **출처(Origin)** 두 축으로 표현된다. Origin-hint는 meta 라인에 중립 회색 텍스트로 표시.

| 상태 | Origin-hint | 의미 |
|------|------------|------|
| 완료 (업로드 완료, 미발행) | `수기 업로드 완료` | 파일은 올라갔으나 아직 발행 전 |
| 완료 (발행됨) | `수기 업로드 완료` | 공식 발행된 수기 산출물 |
| 완료 (발행됨) | `AI 생성 완료` | AI 생성 → 리드 승인 → 발행된 산출물 |
| 리드 검토 대기 | `AI 생성 완료` | AI 초안이 검토를 기다림 |
| AI 처리 중 | (없음) | 생성 중 — origin 확정 전 |
| AI 생성 실패 | `AI 생성 실패` | 재시도 or 수기 대안 필요 |
| 미완료 | `AI 생성 가능` | AI로 자동 생성 가능한 유형 |
| 미완료 | `수기 업로드 필요` | 조직 고유 양식 — 수기만 가능 |

**Origin-hint 컬러 규칙:** 모든 origin-hint는 **중립 회색(gray-600)**. 색은 셀 border/배경이 담당.

---

## 2. CTA 규칙 (최종)

셀 하단 Action 버튼은 **상태별로 고정된 조합**을 따른다.

### 2.1 버튼 변형 2종 (뉴트럴 전용)

| 변형 | 배경 | 텍스트 | Border | 사용 |
|------|------|--------|--------|-----|
| **Primary** | `--gray-600` | 흰색 | `--gray-600` | 권장 행동 |
| **Secondary** | 흰색 | `--gray-700` | `--gray-300` | 대안 or 개정 |

*Hover 시: Primary → gray-700 (한 단계 진하게) / Secondary → gray-50 background*

> 브랜드 파랑(primary-500)은 **"AI 관련 시각 시그널" 전용** — 셀 상태 border("AI 처리 중"), AI 아바타, user 말풍선(AI 질의), top-band, `chat-msg-source-link` 칩(AI 응답 출처), focus 시 border-color 에만 사용. CTA 버튼·suggestion chip·attach 버튼 등 **조작 가능한 컨트롤에는 뉴트럴 그레이 스케일**만 사용해 "파랑 = AI" 시각 계약을 보호한다.

### 2.2 라벨 체계 (3종)

CTA 라벨은 **3가지**로 고정:

- **`AI 생성`** — AI 생성 요청 (Missing 시작, Review 반려, 발행본 재개정, AI 실패 재시도 모두 동일 라벨)
- **`업로드`** — 파일 업로드 (최초 업로드, 재업로드, 대안 업로드 모두 동일)
- **`발행`** — 발행 액션 (검토 완료 후 공식 문서로 publish)

"재생성", "재업로드" 같은 접두사는 쓰지 않는다 (동일 행위이므로).

### 2.3 상태별 CTA 조합

| 상태 | CTA | Primary 버튼 의미 |
|------|-----|-------------------|
| 미완료 + `AI 생성 가능` | `[AI 생성]`<sup>P</sup> | AI 생성 요청 (모달 오픈) |
| 미완료 + `수기 업로드 필요` | `[업로드]`<sup>P</sup> | 최초 파일 업로드 |
| 리드 검토 대기 | `[발행]`<sup>P</sup> `[AI 생성]`<sup>S</sup> | 검토 통과 발행 / 반려(AI 재생성) |
| 완료 + 수기 업로드 완료 + **미발행** | `[발행]`<sup>P</sup> `[업로드]`<sup>S</sup> | 발행 실행 / 재업로드 |
| 완료 + 수기 업로드 완료 + **발행됨** | `[업로드]`<sup>S</sup> | **REV 개정 — 재업로드** |
| 완료 + AI 생성 완료 + **발행됨** | `[AI 생성]`<sup>S</sup> | **REV 개정 — AI 재생성** |
| AI 처리 중 | (없음) | 진행 중 |
| AI 생성 실패 | `[AI 생성]`<sup>P</sup> `[업로드]`<sup>S</sup> | 재시도 / 수기 대안 |
| 미완료 (선행 단계 대기) | (없음) | 조작 불가 |

<sup>P</sup> = Primary, <sup>S</sup> = Secondary

### 2.4 발행 이후 REV 개정 워크플로우

> **발행됨 상태에서도 `[업로드]`/`[AI 생성]` Secondary CTA를 노출한다.**

**이유:**
- EPC 실무는 REV-01 이후 REV-02, REV-03이 반복 발생.
- 발행본이 잠금 상태라는 안정감은 **Primary 버튼 부재**로 전달.
- 개정은 가능하되, **주요 행동이 아님**을 Secondary 시각 위계로 표현.

**AI/수기 경로 대칭:**
- 수기 발행본 → `[업로드]`로 새 파일 올려 재발행
- AI 발행본 → `[AI 생성]`으로 AI에게 재생성 요청

### 2.5 AI 생성 모달

`[AI 생성]` 버튼 클릭 시 모달이 열린다. 구성:

- **컨텍스트**: 문서명 · WS · Stage
- **프롬프트 입력** (선택): 추가 지시사항
- **참고 자료 첨부** (선택): 파일 드롭존 (PDF · DWG · XLSX · DOCX)
- **[취소] [AI 생성]** 버튼

모달 제출 시 셀이 **AI 처리 중** 상태로 전환되고 progress bar 애니메이션이 시작된다.

---

## 3. Layout & Spacing

### 3.1 페이지 레이아웃 구조

화면은 위에서 아래로 다음 5개 영역이 수직 스택되어 있다:

| 영역 | 높이 | 구성 |
|------|------|------|
| **Top band** | 2px | `--primary-500` 브랜드 띠 (전 화면 공통) |
| **Header** | 52px | 좌: 로고 · 중앙: 🔍 프로젝트 검색 · 우: 🔔 알림 벨 |
| **Project bar** | ~85px | 프로젝트명(22px) + 계약번호 · 계약기간(13px 한 줄) |
| **Legend** | ~45px | 좌: `산출물`/`AI Chat` view-tabs · 우: 상태별 집계 범례 |
| **Matrix-wrap / AI-chat-wrap** | 가변 | 선택된 탭의 뷰 카드 노출 (탭 전환 시 교체) |

**범례 = 집계 표시:** 별도 통계 블록(`proj-stats`) 없이 **Legend의 각 cell-tag 라벨 옆에 숫자를 병기**해 "무엇이 몇 개"를 한 줄에 압축. 도트 색 + 상태 이름 + weight 600 숫자로 구성 — 예: `●완료 18 · ●리드 검토 대기 9 · ●AI 처리 중 3 · ●AI 생성 실패 1 · ●미완료 12`.

### 3.2 워크스페이스 Grid

- **Workstream 라벨 컬럼**: 160px 고정
- **Stage 컬럼**: `1fr` 균등 분배 (6개)
- **Workstream 11종**: PRC · MEQ · ELE · INS · MEC · WTR · CIV · ARC · PIP · LAY · UTL
- **Stage 6종**: BID · EST · FEED · DSGN · VEND · REVW
- **헤더 row**: 1px border-bottom (`--matrix-border`)
- **셀 padding**: 10px

### 3.3 셀 내부 구조 (카드 레이아웃)

셀 좌측에 **3px 상태색 border** + 내부 padding 10px. 내용은 위에서 아래로 다음 순서:

| 순서 | 블록 | 정렬 | 스타일 |
|------|------|------|--------|
| 1 | `.cell-doc-title` + `.rev` | 한 행 · title 좌 / REV 우 | Sans 12px/600 · REV는 11px/500 gray-500 |
| 2 | `.cell-meta` (WS · Stage · origin-hint) | 좌 정렬 | Sans 11px/400 · 세그먼트 간 `·`는 CSS `::before` 자동 (gap 3px) |
| 3 | `.cell-status-line` | 좌 정렬 | Sans 11px/**600** · 상태색 (예: "리드 검토 대기 중") |
| 4 | `.cell-cta-row` | 좌 정렬 · **바닥 고정** | `[발행]` `[AI 생성]` 등 · Part III §2 CTA 규격 |

**핵심 원칙:**
- CTA row는 `margin-top: auto`로 **셀 바닥에 고정** — 셀 높이가 달라도 CTA 위치는 항상 같은 기준선
- status-line과 meta 라인은 **항상 같은 위치**에 유지 → 같은 행 내 셀들이 시각적으로 정렬됨
- AI 처리 중 상태: status-line 아래에 `.cell-progress-mini` (2px) 추가

### 3.4 View 전환 (산출물 / AI Chat)

Legend 좌측의 언더라인 탭으로 두 뷰를 전환. 탭 라벨은 축약형을 쓴다 (`산출물` / `AI Chat`):

- **산출물 탭** (기본): `.matrix-wrap` 노출 — 정식 명칭 "산출물 워크스페이스"
- **AI Chat 탭**: `.ai-chat-wrap` 노출, 범례 자동 숨김

두 래퍼는 동일한 카드 스타일(흰 배경 + 1px border + 8px radius + 얇은 shadow)로 통일되어 탭 전환 시 같은 자리에 같은 모양으로 교체되는 느낌.

---

## 4. AI Chat 뷰

프로젝트 단위 개인 1:1 AI 채팅. 현재 프로젝트의 발행 문서 + 산출물 워크스페이스 상태를 컨텍스트로 활용.

### 4.1 구성

AI Chat view는 흰 카드(`.ai-chat-view`) 하나로, 내부가 위에서 아래로 다음 3개 영역으로 구성된다:

| 영역 | 역할 |
|------|------|
| **Context bar** (`.ai-chat-context`) | 상단 · "참조 중" 라벨 + 프로젝트 문서/산출물 현황 chip — AI가 참조하는 컨텍스트 노출 |
| **Chat body** (`.ai-chat-body`) | 가운데 · 스크롤 영역 · Day divider + AI/User 메시지 흐름 |
| **Input section** | 하단 · suggestions (첫 질문 시 자동 숨김) → 구분선 → pending attachments → `[📎] 입력창 [▸]` (36px) |

**Chat body 내부 요소 순서 (진입 시):**

1. `.chat-day-divider` — "오늘 · 2026년 4월 26일" pill (가운데 정렬)
2. `.chat-msg.ai` — AI 인사말 (좌측, plain text, 28px 파랑 아바타)
3. 사용자 입력 후: `.chat-msg.user` (우측, 파랑 말풍선 + 첨부 칩은 말풍선 내부 하단)
4. AI 응답: `.chat-msg.ai` — 필요 시 `.chat-msg-source-link` 참조 칩 하단 표시

**Input section 내부 (바닥에서 위로):**

1. `.ai-chat-input-wrap` — `[📎] [textarea] [▸]` 3종 컨트롤, 모두 36px 높이
2. `.ai-chat-attachments` (조건부) — pending 첨부 칩 목록, `has-files` 클래스 붙을 때만 노출
3. `.ai-chat-suggestions` (조건부) — 초기 제안 chip, 첫 user 메시지 전송 시 `display: none`

### 4.2 메시지 스타일 (ChatGPT/Claude 레이아웃)

**User 메시지 (우측 정렬, 말풍선 있음):**
- 배경: `--primary-500` 브랜드 파랑
- 텍스트: 흰색
- `border-radius: 2px 14px 14px 14px` (좌상단만 각짐)
- 아바타 없음 (최대 폭 90%)
- 첨부 파일은 말풍선 **하단**에 반투명 흰색 칩(`chat-msg-attachment`)으로 표시

**AI 메시지 (좌측 정렬, plain text, 넓은 폭):**
- 배경 없음 (plain)
- `AI` 파랑 원형 아바타 (28px, primary-500 배경, 흰 텍스트)
- 컨테이너 100% 폭 사용 — 긴 응답도 답답하지 않게 흐름

**공통:**
- font-size 14px / line-height 1.65
- 참조 소스는 응답 하단에 칩(`chat-msg-source-link`, Mono 11px) 형태로 표시

### 4.3 Context 라벨 & Chip — 프로젝트 컨텍스트 표시

AI Chat 상단은 "이 AI가 무엇을 바탕으로 답하는지"를 명시하는 영역. **조직 지식 자산화** 철학상 개인 프롬프트가 아니라 프로젝트 문서·산출물 워크스페이스 상태를 참조하고 있음을 시각화한다.

- **라벨 (`참조 중`)**: Sans 13px / weight 500 / gray-700 — 한글이므로 Mono 사용 금지
- **Chip**: 흰 배경 + gray-200 border + border-radius 12px
- **Chip 도트**: `--success` 녹색 7px — "참조가 **활성** 상태"임을 나타냄 (완료 상태 시그널과 의미 다름: 활성/비활성 축)

### 4.4 Day Divider

대화를 날짜별로 구분하는 가운데 정렬 pill.

- 형식: **`오늘 · 2026년 4월 26일`** — 상대 표현 + 절대 날짜 병기 (애매함 방지)
- 스타일: gray-50 배경 + gray-200 border + border-radius 12px + padding 3px 12px
- `width: auto` + `white-space: nowrap`으로 텍스트 폭만큼만 차지 (부모 컨테이너의 `max-width: 780px`를 덮어써야 함)
- AI Chat 진입 시점 기준으로 **최상단에 고정 노출**

### 4.5 Suggestions & 문서 첨부

**Suggestions (대화 시작 유도):**
- 초기 상태에서 입력창 위에 노출, 첫 user 메시지 전송 시 `display: none`
- hover: `--gray-50` bg + `--gray-500` border (**primary-500 금지** — CTA 규칙 §2.1 "파랑 = AI 시각 시그널" 계약 보호)
- 같은 AI 행위(AI 생성 요청)인 산출물 셀 CTA와 시각 위계 대칭 유지

**문서 첨부 (`ai-chat-attach` + `ai-chat-attachments`):**
- 입력창 좌측 📎 버튼 (36×36, Secondary 뉴트럴 = `--gray-300` border + 흰 배경)
- 파일 선택 시 입력창 **위쪽**에 pending 칩 목록 노출 (`has-files` 클래스)
- 전송 시 user 말풍선 내부로 이동, pending 영역은 비움
- 조직 지식 자산화 관점에서 AI Chat 첨부 파일은 향후 `sourceDocuments`로 추적될 대상

### 4.6 입력 영역 높이 통일 — 36px 그리드

헤더/입력 영역의 **모든 클릭 가능한 컨트롤은 36px 높이로 통일**한다. 이는 시각 안정감 + Fitts's Law 관점에서의 적정 터치 타겟을 동시에 만족한다.

| 컴포넌트 | 크기 |
|---------|------|
| `notif-bell` (알림 벨) | 36×36 |
| `proj-search-input` (프로젝트 검색) | height 36 |
| `ai-chat-attach` (📎) | 36×36 |
| `ai-chat-input` (메시지 입력) | height 36 (min), max 120 — `padding: 7px 12px` + `line-height: 20px`로 중앙 정렬 |
| `ai-chat-send` (▸) | 36×36 |

`ai-chat-input-wrap`은 `align-items: flex-end`로 입력창이 여러 줄로 커져도 attach/send 버튼은 **아래쪽에 고정 정렬**.

### 4.7 Focus 스타일 — 컬러만, 링은 금지

모든 텍스트 입력(`proj-search-input`, `ai-chat-input`, `modal-textarea`)의 focus 상태는 **border-color 변경만**으로 표시한다.

```css
:focus {
  outline: none;
  border-color: var(--primary-500);
}
```

**`box-shadow: 0 0 0 3px rgba(primary, 0.08)` 같은 파란 링은 사용 금지.** 화면 밀도가 높은 플랫폼 UI에서는 링이 "요소가 올라오는" 시각적 잡음을 만든다. border 컬러 변화만으로 focus 위치는 충분히 인지된다.

---

## 5. Project List

로그인 → [`hifi-project-list.html`](./hifi-project-list.html)로 진입 → 카드 클릭 → [`hifi-project.html`](./hifi-project.html) (프로젝트 화면).

### 5.1 페이지 구조

화면은 상단에서 아래로 다음 4개 영역이 수직 스택되어 있다:

1. **Top band** — 2px, `--primary-500` 브랜드 띠 (모든 화면 공통)
2. **Header** — 52px, 좌: 로고 / 우: 🔔 알림 벨 ← `hifi-project.html`과 **동일 컴포넌트 재사용**
3. **Page header** (padding 32px) — 타이틀 + 카운트 서브타이틀 (관리자는 우측 `[+ 새 프로젝트]`)
4. **Filter bar** — 검색 · 연도 드롭다운 · 상태 토글 (모두 36px)
5. **Project grid** — `auto-fill minmax(340px, 1fr)` 반응형 카드 그리드

공통 규칙 재사용:
- `top-band` + `header`(52px) + `notif-bell`(36×36) → `hifi-project.html`과 완전 동일
- 컬러 토큰 → `--matrix-bg`, `--matrix-cell-bg`, `--matrix-border` 재사용 (플랫폼 전역 토큰)

### 5.2 Page Header (페이지 타이틀 영역)

| 요소 | 스펙 |
|------|------|
| `.page-title` | "프로젝트" · Sans 24px / weight 600 / gray-900 |
| `.page-subtitle` | `진행 중 N개 · 완료 N개` · Mono 11px / gray-500 (카운트 숫자는 gray-900 500) |
| `.btn-primary` ← **관리자 전용** | `[+ 새 프로젝트]` · 높이 36px · gray-600 배경 + 흰 텍스트 (Part III §2 CTA Primary 규격 준용) |

**`[+ 새 프로젝트]` 가시성 규칙:** 일반 사용자에게는 **숨김**. 프로젝트 생성은 **관리자 권한**이며, 권한 토큰이 있을 때만 노출된다. HTML에는 `data-role="admin"` 속성으로 표시하고, 권한 체크 레이어가 해당 요소를 제어한다.

### 5.3 Filter Bar — 36px 그리드 3종 컨트롤

검색·드롭다운·토글 모두 **높이 36px 통일** (Part III §4.6 "36px 입력 그리드" 원칙 확장 적용):

| 컨트롤 | 스펙 | 기본값 |
|--------|------|--------|
| `.search-input` | height 36 · 좌측 🔍 아이콘 (padding-left 34px) · Sans 13px | 빈 값 |
| `.filter-select` (연도) | height 36 · 우측 caret 아이콘 · Sans 13px | **올해**가 데이터에 있으면 자동 선택 |
| `.filter-toggle-group` (상태) | height 36 · 흰 배경 + 내부 segmented button · active 탭은 gray-700 배경 + 흰 텍스트 | **진행 중** |

**Focus 규칙:** Part III §4.7 준용 — `border-color: var(--primary-500)` 변경만, 파란 링 `box-shadow` 금지.

### 5.4 Project Card

카드 내부는 위에서 아래로 다음 블록이 순서대로 쌓인다 (flex column, gap 12px):

1. **카드 이름** (`.card-name`) — 프로젝트명, 2줄 ellipsis
2. **Divider** (`.card-divider`) — 1px, `--gray-200`
3. **계약 메타** (`.card-meta`) — 계약번호 / 계약기간 2행
4. **진행률** (`.card-progress`) — progress bar + 퍼센트
5. **상태 & 통계** (`.card-status` + `.card-stats`) — 좌: 상태 pill / 우: 카운트

**그리드:** `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`, gap 16px.

**카드 컨테이너 스펙:**
- 배경: `--matrix-cell-bg` (흰색) · border 1px `--matrix-border` · border-radius 10px · padding 20px
- **Hover:** border `--gray-400` + box-shadow + `translateY(-1px)` — **primary 컬러는 hover에 사용하지 않는다** (§2.1 "파랑=AI" 계약 보호, 카드는 AI 영역이 아니라 네비게이션 영역)

**상태 컬러 매핑:**

| 요소 | 컬러 | 이유 |
|------|------|-----|
| `.card-status.inprogress` | `--info` (파랑톤 그레이) | "진행 중"은 활성 정보 시그널. **`--primary-500` 금지** — AI 시각 시그널과 충돌 |
| `.card-status.done` | `--success` | 완료 상태 통일 토큰 |
| `.progress-fill` (기본) | `--info` | 진행률은 "정보" 축, AI 축과 분리 |
| `.progress-fill.done` | `--success` | 100% 도달 시 |

**타이포그래피:**

| 요소 | 크기 / Weight / 서체 |
|------|----------------------|
| card-name | 16px / 600 / Sans (2줄 ellipsis, `min-height: 2.8em`으로 높이 고정) |
| card-meta | 11px / 400 / Mono (계약번호는 영숫자 식별자) |
| card-meta-label (`계약번호`, `계약기간`) | 11px / 400 / Mono / gray-400 |
| progress-value (`45%`) | 11px / 600 / Mono |
| card-status | 11px / 500 / Sans + 8px currentColor 도트 |
| card-stats | 10px / 400 / Mono (숫자 부분만 gray-900 600) |

---

## 6. Activity Feed Drawer

🔔 알림 벨 클릭 시 우측에서 슬라이드 인되는 패널. 시간순 이벤트 이력.

- 폭 420px · 우측 고정
- 알림 카드는 **산출물 셀과 동일한 좌측 3px border 상태 시그널**
- 탭: 전체 / AI 생성 / 리뷰 / 마감
- 카드 내부 CTA: `[문서 검토하기]` primary + `[나중에]` ghost

---

## Part IV · Appendix

## Appendix A: Stage 약어

| 약어 | 한글명 | 영문 |
|------|-------|------|
| BID | 입찰 | Bidding |
| EST | 견적 | Estimation |
| FEED | 기본설계 | Basic Design |
| DSGN | 상세설계 | Detailed Design |
| VEND | Vendor 선정 | Vendor Selection |
| REVW | 대조·평가 | Review / Evaluation |

## Appendix B: Workstream 약어

| 약어 | 한글명 | 영문 |
|------|-------|------|
| PRC | 프로세스 | Process |
| MEQ | 주기기 | Main Equipment |
| ELE | 전기 | Electrical |
| INS | 계장 | Instrumentation |
| MEC | 기계 | Mechanical |
| WTR | 수처리 | Water Treatment |
| CIV | 토목 | Civil |
| ARC | 건축 | Architectural |
| PIP | 배관 | Piping |
| LAY | 공간 | Plant Layout |
| UTL | 설비 | Utilities |
