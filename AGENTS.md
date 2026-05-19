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

# Import paths: 절대경로(`@/...`) 강제

`src/` 내부 모든 import는 `tsconfig.json`의 path alias `@/*`(→ `./src/*`)를 사용한 절대경로로 작성한다. `./Foo`, `../Bar`, `../../baz/qux` 같은 상대경로는 금지.

- ✅ `import { UiButton } from '@/components/ui/UiButton'`
- ✅ `import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'`
- ❌ `import { ProjectFormSection } from './ProjectFormSection'`
- ❌ `import type { Project } from '../../types/workspace.types'`

이유: 파일이 폴더 사이를 옮겨다닐 때 import 경로가 깨지지 않으며(이번 워크스페이스 컴포넌트 4그룹 분리 때 실제로 깨졌음), 어디서 어떤 모듈을 가져오는지 한눈에 보인다. `eslint-config-next`의 `no-restricted-imports` 또는 `eslint-plugin-import` 규칙으로 강제하면 좋다.

# ES6 문법 준수 (arrow function 선언)

컴포넌트·유틸·헬퍼는 `function` 선언 대신 `const X = () => {}` arrow function으로 작성한다. 한 줄로 끝나는 경우 명시적 `return` 없이 표현식 본문(`() => (...)`)을 사용한다.

- ✅ `export const UiButton = (props) => <ButtonPrimitive {...props} />`
- ✅ `const lenError = (value: string, min: number) => value.length < min ? ... : undefined`
- ❌ `export function UiButton(props) { return <ButtonPrimitive {...props} /> }`
- ❌ `function lenError(value, min) { return value.length < min ? ... : undefined }`

예외: Next.js의 `page.tsx`, `layout.tsx`, `error.tsx` 등 **default export가 강제되는 라우트 파일**은 `export default function PageName(...) {}` 형태가 일반적이므로 그대로 둔다.

이유: 콜백·메서드·top-level 선언 사이에서 호출 컨벤션이 통일되고, `this` 바인딩 혼란이 없으며, 한 줄 컴포넌트는 표현식 본문으로 보일러플레이트가 줄어든다.

# 도메인 모델 정본은 `doc/md/domain-model-*.md`

프로젝트·문서 도메인 정본은 다음 문서다.

- 프로젝트(Project) — `doc/md/domain-model-project.md`
- 문서(Document) — `doc/md/domain-model-doc.md`

새 화면을 만들거나 기존 폼·목록을 손질하기 전에 **반드시** 해당 문서를 먼저 확인하고, 필드명·enum 값·필수 여부·길이 제약·전이 규칙을 그대로 따른다. 정본과 어긋나는 구현이 필요하면 추정해서 만들지 말고 사용자에게 정본 갱신 후 진행할지 확인한다.

## Enum은 영문 코드, 라벨은 별도 매핑

도메인 정본의 enum (`Project.status`, `Project.projectType`, `DocumentType`, `DocumentStatus`, `FileUploadStatus`, `GenerationMode`, `ContentType` 등) 은 **정본의 영문 코드 그대로** TypeScript type으로 정의한다. 화면 노출용 한국어 라벨은 별도 매핑(예: `PROJECT_STATUS_LABEL`, `DOCUMENT_TYPE_LABEL`) 으로 관리한다.

- ✅ `type ProjectStatus = 'PREPARING' | 'IN_PROGRESS' | 'CLOSED' | 'CANCELLED'`
- ✅ `const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = { PREPARING: '준비중', IN_PROGRESS: '진행중', CLOSED: '완료', CANCELLED: '취소' }`
- ❌ `type ProjectStatus = 'running' | 'ended' | 'canceled'` — 도메인과 다른 enum
- ❌ `type DocumentType = 'itb' | 'irs' | ...` — 한국어 라벨("독소조항")과 무관하게 코드는 정본의 `ITB`/`IRS`/… 사용

데이터·URL·필터링은 영문 코드로, 화면에 보이는 텍스트만 라벨 매핑을 통해 한국어로 노출한다.

## 도메인이 자동 전이·불변으로 명시한 필드는 UI에서 직접 편집 불가

도메인 정본이 "불변" 또는 "자동 전이" 라고 명시한 필드는 사용자 입력 UI에서 차단한다.

- `Project.contractNumber` — 불변. 수정 폼에서 `readonly`/`disabled` 처리, 변경하려면 보관 후 재등록 안내
- `Project.projectType` — 불변. 등록 폼에서만 선택, 수정 폼에서 `readonly`
- `Project.status` — PUT 으로 `PREPARING` / `IN_PROGRESS` 직접 지정 거부. 수정 폼에서는 종결 전이(`CLOSED` / `CANCELLED`) 만 선택 가능하게 노출하고, 활성 상태로의 변경 옵션은 숨긴다. terminal → 재오픈도 거부.
- `Project.archivedAt` — 단방향. 활성 토글 UI 없음, 보관(삭제) 액션으로만 채워짐
- `Document.revision` — 시스템이 계산. 폼에 입력 필드 두지 않음
- `Document.s3Key`, `Document.locationHash` — 시스템 계산. 화면 노출 X (감사용 별도 화면 외)

## 사용자 가시성 규칙

목록·상세 조회에서 도메인 정본의 가시성 규칙을 그대로 적용한다.

- **member**: `Project.status = IN_PROGRESS` 만 노출 (PREPARING / CLOSED / CANCELLED 숨김)
- **admin**: terminal(`CLOSED` / `CANCELLED`) 포함 활성/종결 모두 노출
- **archived (`archivedAt != null`)**: 두 역할 모두에서 숨김. 직접 접근 시 *프로젝트를 찾을 수 없음* 처리

가시성은 도메인 invariant 가 아니라 *조회 표면 정책*이므로 application/route 계층에서 필터링한다. 도메인 데이터는 status 와 archivedAt 만 가진다.
