# UiFileUpload

파일 또는 폴더 업로드를 위한 컴포넌트. 폴더 업로드 시 디렉토리 구조를 트리 뷰로 보존해 표시한다.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `UploadedFile[]` | — | 현재 업로드된 파일 목록 (controlled) |
| `onChange` | `(files: UploadedFile[]) => void` | — | 파일 변경 콜백 |
| `accept` | `string` | `".pdf,.docx"` | 허용 확장자 (콤마 구분) |
| `mode` | `"any" \| "folder"` | `"any"` | `"folder"`면 폴더만 받음. 파일 버튼·파일 드롭 모두 차단됨 |
| `placeholder` | `string` | mode에 따라 자동 | 빈 상태 안내 문구. 미지정 시 mode에 맞춰 기본값 |
| `acceptHint` | `string` | accept/mode 기반 자동 | 빈 상태 placeholder 아래 줄의 안내 문구 (예: `"PDF · DOCX · XLSX"`). 미지정 시 `"허용: 폴더"` / `"허용 형식: …"` |
| `pickFolderLabel` | `string` | `"폴더 업로드"` | 폴더 선택 버튼 라벨 (예: `"폴더 선택"`) |
| `className` | `string` | — | 루트 요소 추가 클래스 |

## 타입

```ts
type UploadedFile = {
  id: string
  file: File
  relativePath: string
}
```

## 사용 예시

```tsx
"use client"
import { useState } from "react"
import { UiFileUpload, type UploadedFile } from "@/components/ui/UiFileUpload"

// 파일 + 폴더 모두 허용 (기본)
export const Example = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  return (
    <UiFileUpload
      value={files}
      onChange={setFiles}
      accept=".pdf,.docx"
    />
  )
}

// 폴더 전용 모드
export const FolderOnlyExample = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  return (
    <UiFileUpload
      value={files}
      onChange={setFiles}
      accept=".pdf,.docx"
      mode="folder"
    />
  )
}
```

## 기능

- **두 업로드 버튼**: "파일 업로드" / "폴더 업로드"를 별도 버튼으로 분리
- **파일 업로드**: 다중 선택, `accept` 확장자 필터
- **폴더 업로드**: `webkitdirectory`로 디렉토리 통째로 업로드, `webkitRelativePath`를 보존해 트리 구조 유지
- **트리 뷰 (`FileTreeView`)**: 폴더 접기/펼치기, 폴더당 파일 개수, 파일별 크기 표시
- **개별 삭제**: 파일 항목 hover 시 X 버튼
- **전체 삭제**: 헤더의 "전체 삭제" 버튼
- **드래그 앤 드롭**: 빈 상태/채워진 상태 모두에서 파일/폴더 드롭 지원 (`webkitGetAsEntry()` 기반 재귀 순회로 폴더 구조 보존)
- **확장자 필터**: 허용 외 확장자는 자동 무시
- **폴더 전용 모드 (`mode="folder"`)**: 파일 업로드 버튼 숨김, 파일 드롭은 무시 (드롭된 최상위 항목 중 폴더만 처리)
- **드롭 거부 피드백**: 폴더 전용 모드에서 파일을 드롭하면 인라인 에러 메시지 + 빨간색 강조. 3.5초 후 자동 사라짐

## 브라우저 호환성

- `webkitdirectory`는 W3C 표준은 아니지만 Chrome · Edge · Firefox · Safari에서 지원됨
- Windows 환경에서의 동작은 별도 확인 필요

## 의존성

- `lucide-react` — 아이콘
