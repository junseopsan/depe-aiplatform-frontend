# UiPdfViewer

PDF 파일을 브라우저에서 렌더링하는 뷰어 컴포넌트.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | PDF 파일 경로 또는 URL |
| `searchText` | `string` | — | 초기 검색어 (로드 시 자동 검색 + 하이라이트) |
| `className` | `string` | — | 루트 요소 추가 클래스 |

## 사용 예시

```tsx
import { UiPdfViewer } from '@/components/ui/UiPdfViewer'

// 기본 사용
<UiPdfViewer src="/pdf/test_file.pdf" className="h-[600px]" />

// 특정 텍스트 검색 상태로 열기
<UiPdfViewer src="/pdf/test_file.pdf" searchText="Lorem" className="h-[600px]" />
```

## 기능

- **페이지 이동**: 이전/다음 버튼, 페이지 번호 직접 입력.
- **썸네일 패널**: 좌측에 전체 페이지 썸네일 표시. 클릭 시 해당 페이지로 이동. 토글로 열기/닫기.
- **줌**: 확대/축소 (0.4x ~ 2.0x). 퍼센트 클릭 시 100%로 리셋.
- **텍스트 검색**: 돋보기 아이콘 클릭 시 검색바 표시. Enter로 검색 실행. 매칭 페이지 간 이전/다음 이동. 검색어가 포함된 텍스트 노란색 하이라이트.
- **인쇄**: 프린터 아이콘 클릭 시 브라우저 인쇄 다이얼로그 표시. PDF 다운로드 없이 웹에서 바로 인쇄.
- **외부 검색어**: `searchText` prop으로 초기 검색어를 전달하면 PDF 로드 후 자동 검색 + 첫 번째 결과 페이지로 이동.
- **로딩/에러 상태**: 로딩 중 메시지, 실패 시 에러 메시지 표시.

## 의존성

- `react-pdf` — PDF 렌더링 라이브러리
- `pdfjs-dist` — PDF.js 워커 (react-pdf 의존)
