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
