/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export type ComponentEntry = {
  slug: string
  name: string
  description: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  { slug: 'tokens', name: 'Design Tokens', description: 'Color / Typography / Spacing / Radius / Shadow 토큰' },
  { slug: 'button', name: 'Button', description: 'variant·size·disabled를 지원하는 기본 버튼' },
  { slug: 'input', name: 'Input', description: '단일 행 텍스트 입력' },
  { slug: 'textarea', name: 'Textarea', description: '여러 행 텍스트 입력' },
  { slug: 'select', name: 'Select', description: '드롭다운 단일 선택' },
  { slug: 'segmented', name: 'Segmented', description: '세그먼트 형태의 라디오 그룹 (enum 선택)' },
  { slug: 'pill', name: 'Pill', description: '상태/카테고리 라벨 (28px 알약, tone·status 색)' },
  { slug: 'badge', name: 'Badge', description: '알림 카운트 (18px 원형)' },
  { slug: 'chip', name: 'Chip', description: '클릭 가능한 필터 chip (28px)' },
  { slug: 'table', name: 'Table', description: '데이터 테이블' },
  { slug: 'pdf-viewer', name: 'PDF Viewer', description: 'PDF 파일 뷰어' },
  { slug: 'file-upload', name: 'File Upload', description: '파일 또는 폴더 업로드 (트리 구조 보존)' },
]
