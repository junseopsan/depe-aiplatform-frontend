export type ComponentEntry = {
  slug: string
  name: string
  description: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  { slug: 'table', name: 'Table', description: '데이터 테이블' },
  { slug: 'pdf-viewer', name: 'PDF Viewer', description: 'PDF 파일 뷰어' },
]
