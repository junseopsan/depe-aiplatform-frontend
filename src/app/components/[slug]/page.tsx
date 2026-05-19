/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { notFound } from 'next/navigation'
import { COMPONENT_REGISTRY } from '@/features/design/data/registry'
import { TokensPreview } from '@/features/design/previews/TokensPreview'
import { ButtonPreview } from '@/features/design/previews/ButtonPreview'
import { InputPreview } from '@/features/design/previews/InputPreview'
import { TextareaPreview } from '@/features/design/previews/TextareaPreview'
import { SelectPreview } from '@/features/design/previews/SelectPreview'
import { SegmentedPreview } from '@/features/design/previews/SegmentedPreview'
import { PillPreview } from '@/features/design/previews/PillPreview'
import { BadgePreview } from '@/features/design/previews/BadgePreview'
import { ChipPreview } from '@/features/design/previews/ChipPreview'
import { TablePreview } from '@/features/design/previews/TablePreview'
import { PdfViewerPreview } from '@/features/design/previews/PdfViewerPreview'
import { FileUploadPreview } from '@/features/design/previews/FileUploadPreview'

const PREVIEWS: Record<string, React.ComponentType> = {
  tokens: TokensPreview,
  button: ButtonPreview,
  input: InputPreview,
  textarea: TextareaPreview,
  select: SelectPreview,
  segmented: SegmentedPreview,
  pill: PillPreview,
  badge: BadgePreview,
  chip: ChipPreview,
  table: TablePreview,
  'pdf-viewer': PdfViewerPreview,
  'file-upload': FileUploadPreview,
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = COMPONENT_REGISTRY.find((c) => c.slug === slug)
  if (!entry) notFound()

  const Preview = PREVIEWS[slug]

  return (
    <div className="px-12 py-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground">{entry.name}</h1>
      <p className="mt-2 text-sm text-[var(--gray-500)]">{entry.description}</p>

      {/* Preview */}
      {Preview ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xs font-semibold tracking-wider text-[var(--gray-400)]">
            PREVIEW
          </h2>
          <div className="flex items-center justify-center border border-[var(--gray-200)] bg-card p-10">
            <Preview />
          </div>
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[var(--gray-300)] px-6 py-12 text-center text-sm text-[var(--gray-400)]">
          프리뷰가 아직 준비되지 않았습니다.
        </div>
      )}
    </div>
  )
}
