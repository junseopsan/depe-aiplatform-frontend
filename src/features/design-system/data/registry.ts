/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export type ComponentEntry = {
  slug: string
  name: string
  description: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  { slug: 'table', name: 'Table', description: '데이터 테이블' },
  { slug: 'pdf-viewer', name: 'PDF Viewer', description: 'PDF 파일 뷰어' },
]
