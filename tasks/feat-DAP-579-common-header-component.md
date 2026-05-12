# feat/DAP-579-common-header-component

## 개요

공통 AppHeader 컴포넌트 도입 및 헤더/라우팅 구조 정리

## 요구사항

- 상단 2px primary 색상 밴드 (로딩바 트랙)
- 헤더 3-column 그리드: 로고 + 시스템명 / 탭 / 알림 영역
- 탭 네비게이션
  - active 시 하단 border 강조
  - hover 효과
- 알림 벨 아이콘 + 카운트 배지 (pulse 애니메이션)
- 라우트 전환 시 차오르는 상단 로딩바

## 참고사항

- 디자인 스펙: `doc/1_Projects_Dashboard.html`, `doc/common.css`
- 색상/높이 토큰: `src/styles/tokens.css` 의 `--primary-500`, `--gray-200` 등 사용

## TODO

- [x] 상단 2px primary 색상 밴드 (로딩바 트랙)
- [x] 헤더 3-column 그리드 (로고 + 시스템명 / 탭 / 알림)
- [x] 로고(원형 D) + 시스템명 텍스트 (`EPC PE AI-Platform`)
- [x] 탭 네비게이션 active 하단 border 강조
- [x] 탭 hover 색상 효과
- [x] 알림 벨 아이콘 (lucide `Bell`)
- [x] 알림 배지 (카운트 표시, primary-500)
- [x] 알림 배지 pulse 애니메이션
- [x] 라우트 전환 시 차오르는 상단 로딩바 (`TopLoadingBar`)

---

# 추가 작업: LegendBar (프로젝트 탭바 하단 공통 영역)

## 개요

ProjectTabBar 바로 아래에 항상 노출되는 공통 LegendBar 영역. 페이지마다 내용은 달라지지만 컨테이너/높이/배경은 공통.

## 요구사항

<!-- 사용자가 직접 작성 -->

## 참고사항

- 디자인 스펙:
  - Dashboard 변형: `doc/2_Projects_ProjectName_Dashboard.html` (legend-anchors + legend-items)
  - ITB 변형: `doc/3_Projects_ProjectName_ITB.html` (anchors + buttons)
  - IRS 변형: `doc/4_Projects_ProjectName_IRS.html` (anchors + buttons + save-status)
- 공통 CSS: `doc/2_Projects_ProjectName_Dashboard.html` 369-477줄 (`.legend-bar`, `.legend-anchor`, `.cell-tag` 등)
- 색상 토큰: `--gray-50` 배경, `--gray-200` border, `--primary-50/700` anchor pill, `--success/warning/primary-500/error/gray-400` 상태 도트

## TODO

- [x] `LegendBar` 컨테이너 (48px, gray-50, gray-200 border, left/right zone slot)
- [x] `LegendAnchor` pill (link-2 icon + 텍스트, primary-50 bg, is-blocked 변형)
- [x] `LegendStatusTag` (도트 + 라벨 + 카운트, 5종 status: pre-start/generating/ai-failed/review/issued)
- [x] Dashboard 페이지(`/projects/[projectId]`)에 LegendBar 적용 — ITB Rev B anchor + 5개 상태 카운트
- [ ] ITB 페이지 LegendBar 적용 (anchors + 버튼들) — 추후
- [ ] IRS/DC/MPS 페이지 LegendBar 적용 (anchors + 버튼 + save-status) — 추후
