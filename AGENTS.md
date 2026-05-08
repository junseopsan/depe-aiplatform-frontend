<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Component naming convention

3-tier rule based on component location and scope.

| 위치 | 접두어/이름 | 성격 | 예시 |
|---|---|---|---|
| `src/components/ui/` | `Ui` 접두어 | 디자인 시스템 프리미티브, 비즈니스 무관 | `UiButton`, `UiInput`, `UiTable`, `UiSheet` |
| `src/components/common/` | 없음 (역할 이름) | 앱 레벨 공통 (전역 크롬·구조) | `AppHeader`, `TopLoadingBar` |
| `src/features/<feature>/components/` | 없음 (도메인 이름) | 특정 기능 전용 | `ProjectInfoBar`, `DeliverableMatrix` |

**판단 기준:**
- 비즈니스 무관 + 어디든 재사용 → `ui/` + `Ui` 접두어
- 앱 전역 구조/크롬 (헤더, 푸터, 사이드바, 전역 UI) → `common/` + 역할 기반 이름
- 한 기능에만 속함 → `features/<feature>/components/` + 도메인 기반 이름

`Ui` 접두어는 "디자인 시스템 프리미티브 = 비즈니스 로직 없음, 어디든 재사용 가능"의 신호로만 쓴다. 폴더 위치가 이미 스코프를 표현하므로 모든 공통 컴포넌트에 접두어를 붙이지 않는다.

# Visual implementation: defer to `doc/`

화면을 퍼블리싱할 때는 `doc/` 폴더의 HTML 파일을 정본으로 삼아 동일하게 구현한다. 스크린샷이나 구두 설명만으로 추정하지 말고, 매칭되는 `doc/*.html`을 먼저 열어 마크업 구조와 클래스(높이·패딩·색상 등)를 확인한 뒤 Tailwind로 옮긴다.

- 색상/높이/간격: `doc/common.css`와 각 페이지 HTML 내 인라인 `<style>` 블록의 토큰 값을 그대로 사용
- 마크업 계층: `doc` HTML의 컴포넌트 구조(예: `.app-header > .hdr-left/.hdr-tabs/.hdr-right`)와 동일한 의미로 React 컴포넌트를 구성
- 애니메이션·트랜지션: `doc` CSS의 `@keyframes`·`transition` 값을 그대로 옮김

스펙이 모호하거나 누락된 경우 추정해 구현하지 말고 사용자에게 확인을 요청한다.
