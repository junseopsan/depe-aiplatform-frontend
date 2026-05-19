/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export type ComponentEntry = {
  slug: string
  name: string
  description: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  { slug: 'button', name: 'Button', description: 'variant·size·disabled를 지원하는 기본 버튼' },
  { slug: 'input', name: 'Input', description: '단일 행 텍스트 입력' },
  { slug: 'textarea', name: 'Textarea', description: '여러 행 텍스트 입력' },
  { slug: 'select', name: 'Select', description: '드롭다운 단일 선택' },
  { slug: 'segmented', name: 'Segmented', description: '세그먼트 형태의 라디오 그룹 (enum 선택)' },
  { slug: 'table', name: 'Table', description: '데이터 테이블' },
  { slug: 'pdf-viewer', name: 'PDF Viewer', description: 'PDF 파일 뷰어' },
  { slug: 'file-upload', name: 'File Upload', description: '파일 또는 폴더 업로드 (트리 구조 보존)' },
]
