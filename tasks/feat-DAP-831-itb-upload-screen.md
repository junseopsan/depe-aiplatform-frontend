# DAP-831: 개별 ITB N개 업로드 또는 Zip 파일 업로드 화면 구성

## 요구사항

Acceptance Criteria #1: 파일 업로드

Given 프로젝트 추가 또는 수정 화면에 ITB 업로드 섹션이 보이는 상태에서

When 파일 업로드 버튼을 클릭 했을 때

Then 파일 선택 모달이 보여야 한다

Given 파일 선택 모달이 보이는 상태에서

When 1개 이상 파일을 선택 했을 때

Then 모달이 닫히고 영역에 파일명이 보여야 한다

Acceptance Criteria #2: 폴더 업로드

Given 프로젝트 추가 또는 수정 화면에 ITB 업로드 섹션이 보이는 상태에서

When 폴더 업로드 버튼을 클릭 했을 때

Then 폴더 선택 모달이 보여야 한다

Given 폴더 선택 모달이 보이는 상태에서

When 폴더를 선택 했을 때

Then 모달이 닫히고 폴더에 속한 모든 파일명이 ITB 업로드 영역에 보여야 한다

Notes:

Windows 에서 폴더 단위 업로드가 가능한지 확인 필요

폴더 단위 업로드와 파일 업로드를 하나의 버튼으로 가져갈 수 있을지 확인 필요

1~n 개의 파일을 업로드했을때, 화면에서 폴더구조를 유지해야함.

폴더 구조를 유지하기 위하여 파일업로드했을때 경로를 그대로 가져감

## 결정사항

- 업로드 방식: 파일 / 폴더 둘 다 지원 (Zip은 본 이슈 범위 외 — 폴더 업로드만)
- 버튼 구성: **단일 버튼 + 모드 토글 드롭다운**
- 라우트: `/components/fileupload` 데모 페이지 (폼 페이지 스캐폴딩은 별도 이슈)
- 허용 파일 타입: `.pdf`, `.docx`
- 개수 / 용량 제한: 없음
- 항목 삭제: 지원 (개별)
- 폴더 구조 표시: 트리 뷰 (접기/펼치기)
- Windows 폴더 업로드 동작 확인은 Windows 환경 보유자에게 후속 확인

## TODO

### 컴포넌트 구현 (`src/components/ui/UiFileUpload/`)

- [ ] 디렉토리 구성:
  ```
  src/components/ui/UiFileUpload/
    UiFileUpload.tsx          — 메인 (버튼+드롭다운+드롭존+트리뷰 조합)
    FileTreeView.tsx          — 내부 서브 (트리 렌더링)
    buildFileTree.ts          — 유틸 (webkitRelativePath → 트리)
    types.ts                  — UploadedFile, FileTreeNode
    index.ts
    UiFileUpload-docs.md
  ```
- [ ] `types.ts` 정의
  - `UploadedFile` — `id`, `file: File`, `relativePath` (webkitRelativePath fallback)
  - `FileTreeNode` — folder/file 분기, children 재귀
- [ ] `buildFileTree.ts` — `relativePath` 기반 트리 빌더
- [ ] `FileTreeView.tsx` — 폴더 트리 (접기/펼치기, lucide 아이콘, 개별 삭제)
- [ ] `UiFileUpload.tsx`
  - 단일 버튼 + 드롭다운 ("파일 선택" / "폴더 선택")
  - 드롭다운은 `UiDropdownMenu` 사용
  - hidden `<input type="file" multiple accept=".pdf,.docx">` + `<input type="file" webkitdirectory>` 두 개를 ref로 트리거
  - 빈/채워진 상태 분기, doc `.file-drop` 스타일 이식
  - 외부 제어 가능: `value`, `onChange` props로 controlled 패턴

### shadcn 도입

- [ ] `UiDropdownMenu` 가져오기
  - shadcn dropdown-menu 소스를 base-ui 기반으로 가져와 `src/components/ui/UiDropdownMenu/` 정리
  - doc CSS 스펙(있다면)에 맞춰 클래스 재작성
  - `UiDropdownMenu-docs.md` 작성

### 데모 페이지

- [ ] `src/app/components/fileupload/page.tsx`
- [ ] `ComponentDocsSidebar`에 `fileupload` 항목 추가
- [ ] 데모: 빈 상태 / 파일 다수 / 폴더 트리 케이스 + 업로드된 상태 JSON 시각화

### 검증

- [x] ESLint — 새 파일 0 에러 (기존 코드 3건은 별도)
- [x] SSR 컴파일 — `/components/file-upload` 200 OK, 페이지 렌더 정상
- [x] (사용자 검증 필요) 브라우저에서 업로드 버튼 클릭 → 드롭다운 동작
- [x] (사용자 검증 필요) 파일 선택 → 트리 렌더링 + 크기 표시
- [x] (사용자 검증 필요) 폴더 선택 → 폴더 구조 보존 트리 렌더링
- [x] (사용자 검증 필요) PDF·DOCX 외 파일 선택 시 무시되는지
- [x] (사용자 검증 필요) 개별 삭제 / 전체 삭제
- [ ] (사용자 검증 필요) 드래그 앤 드롭으로 파일 추가
- [ ] (Windows 환경) 폴더 업로드 동작 확인

### 마무리

- [ ] task md에 검증 결과 기록
- [ ] 새 `Ui*` 컴포넌트의 `*-docs.md` 동기화
