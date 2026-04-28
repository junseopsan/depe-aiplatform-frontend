import type { DeliverableCell as CellType, DeliverableAction, Workstream } from '../types/project-detail.types'
import { DeliverableCell } from './DeliverableCell'
import { STAGES } from '../data/constants'

type DeliverableRowProps = {
  workstream: Workstream
  cells: CellType[]
  onAction: (cellId: string, action: DeliverableAction) => void
}

function getWorkstreamProgress(cells: CellType[]) {
  const total = STAGES.length
  const done = cells.filter((c) => c.status === 'ready').length
  return { done, total, ratio: total > 0 ? Math.round((done / total) * 100) : 0 }
}

export function DeliverableRow({ workstream, cells, onAction }: DeliverableRowProps) {
  const progress = getWorkstreamProgress(cells)

  return (
    <div className="grid grid-cols-[176px_repeat(4,1fr)] border-b border-[var(--gray-100)] last:border-b-0">
      {/* Workstream label */}
      <div className="flex flex-col justify-center border-r border-[var(--gray-200)] bg-[var(--gray-50)]/60 px-4 py-3">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--gray-400)]">
            {workstream.code}
          </span>
          <span className="font-mono text-[11px] text-[var(--gray-400)]">
            {progress.done}/{progress.total}
          </span>
        </div>
        <span className="text-[15px] font-bold text-foreground">
          {workstream.name}
        </span>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden bg-[var(--gray-100)]">
          <div
            className="h-full"
            style={{
              width: `${progress.ratio}%`,
              background: progress.ratio === 100
                ? 'var(--success)'
                : progress.ratio >= 50
                  ? 'var(--primary-500)'
                  : progress.ratio > 0
                    ? 'var(--primary-300)'
                    : 'var(--gray-300)',
            }}
          />
        </div>
      </div>

      {/* Cells */}
      {STAGES.map((stage, i) => {
        const cell = cells.find((c) => c.stageCode === stage.code)
        if (!cell) {
          return (
            <div
              key={stage.code}
              className={`p-2 ${i < STAGES.length - 1 ? 'border-r border-r-[var(--gray-100)]' : ''}`}
            />
          )
        }
        return (
          <DeliverableCell
            key={cell.id}
            cell={cell}
            onAction={onAction}
            isLast={i === STAGES.length - 1}
          />
        )
      })}
    </div>
  )
}
