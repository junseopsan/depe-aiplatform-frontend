import { COMPONENT_REGISTRY } from '@/features/design/data/registry'

export default function ComponentsIndexPage() {
  return (
    <div className="px-12 py-10">
      <h1 className="text-2xl font-bold text-foreground">Components</h1>
      <p className="mt-2 text-sm text-[var(--gray-500)]">
        두산 디자인 시스템에서 사용하는 UI 컴포넌트 목록입니다.
        왼쪽 사이드바에서 컴포넌트를 선택하면 데모와 사용법을 확인할 수 있습니다.
      </p>
      <p className="mt-4 text-sm text-[var(--gray-400)]">
        총 {COMPONENT_REGISTRY.length}개 컴포넌트가 등록되어 있습니다.
      </p>
    </div>
  )
}
