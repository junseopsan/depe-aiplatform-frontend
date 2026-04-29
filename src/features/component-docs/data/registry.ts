export type ComponentEntry = {
  slug: string
  name: string
  description: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
  { slug: 'button', name: 'Button', description: '다양한 variant와 size를 지원하는 버튼' },
  { slug: 'input', name: 'Input', description: '텍스트 입력 필드' },
  { slug: 'textarea', name: 'Textarea', description: '여러 줄 텍스트 입력 필드' },
  { slug: 'table', name: 'Table', description: '데이터 테이블' },
  { slug: 'sheet', name: 'Sheet', description: '사이드 패널 오버레이 (Drawer)' },
]
