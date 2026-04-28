import type { DeliverableCell } from '../types/project-detail.types'
import { Button } from '@/components/ui/UiButton'

type DeliverableLegendProps = {
  deliverables: DeliverableCell[]
}

const STATUS_MAP: {
  key: string
  label: string
  dotClass: string
  chipBg: string
  chipText: string
  chipBorder: string
}[] = [
  {
    key: 'ready',
    label: '완료',
    dotClass: 'bg-[var(--success)]',
    chipBg: 'bg-[var(--success-bg)]',
    chipText: 'text-[var(--success)]',
    chipBorder: 'border-[var(--success-border)]',
  },
  {
    key: 'review',
    label: '리드 검토 대기',
    dotClass: 'bg-[var(--warning)]',
    chipBg: 'bg-[var(--warning-bg)]',
    chipText: 'text-[var(--warning)]',
    chipBorder: 'border-[var(--warning-border)]',
  },
  {
    key: 'generating',
    label: 'AI 처리 중',
    dotClass: 'bg-[var(--info)]',
    chipBg: 'bg-[var(--info-bg)]',
    chipText: 'text-[var(--info)]',
    chipBorder: 'border-[var(--info-border)]',
  },
  {
    key: 'aiFailed',
    label: 'AI 생성 실패',
    dotClass: 'bg-[var(--error)]',
    chipBg: 'bg-[var(--error-bg)]',
    chipText: 'text-[var(--error)]',
    chipBorder: 'border-[var(--error-border)]',
  },
  {
    key: 'missing',
    label: '미완료',
    dotClass: 'bg-[var(--gray-300)]',
    chipBg: 'bg-[var(--gray-100)]',
    chipText: 'text-[var(--gray-500)]',
    chipBorder: 'border-[var(--gray-200)]',
  },
]

export function DeliverableLegend({ deliverables }: DeliverableLegendProps) {
  const counts = deliverables.reduce<Record<string, number>>((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex items-center justify-between border-b border-border/50 bg-card/70 px-8 py-2.5 backdrop-blur-md">
      {/* Tabs */}
      <div className="flex items-center gap-1">
        <Button variant="dark" size="sm" className="text-xs">
          산출물
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-not-allowed text-xs opacity-40"
          disabled
        >
          AI Chat
        </Button>
      </div>

      {/* Legend chips */}
      <div className="flex items-center gap-2">
        {STATUS_MAP.map((s) => (
          <div
            key={s.key}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${s.chipBg} ${s.chipBorder}`}
          >
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dotClass}`} />
            <span className={`text-[11px] font-medium ${s.chipText}`}>
              {s.label}
            </span>
            <span className={`text-[11px] font-bold ${s.chipText}`}>
              {counts[s.key] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
