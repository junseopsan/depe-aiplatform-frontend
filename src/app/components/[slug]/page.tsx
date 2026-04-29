import { notFound } from 'next/navigation'
import { COMPONENT_REGISTRY } from '@/features/component-docs/data/registry'
import { TableDemo } from '@/features/component-docs/demos/TableDemo'

const DEMOS: Record<string, React.ComponentType> = {
  table: TableDemo,
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = COMPONENT_REGISTRY.find((c) => c.slug === slug)
  if (!entry) notFound()

  const Demo = DEMOS[slug]

  return (
    <div className="px-12 py-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground">{entry.name}</h1>
      <p className="mt-2 text-sm text-[var(--gray-500)]">{entry.description}</p>

      {/* Preview */}
      {Demo ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xs font-semibold tracking-wider text-[var(--gray-400)]">
            PREVIEW
          </h2>
          <div className="flex items-center justify-center border border-[var(--gray-200)] bg-card p-10">
            <Demo />
          </div>
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[var(--gray-300)] px-6 py-12 text-center text-sm text-[var(--gray-400)]">
          데모가 아직 준비되지 않았습니다.
        </div>
      )}
    </div>
  )
}
