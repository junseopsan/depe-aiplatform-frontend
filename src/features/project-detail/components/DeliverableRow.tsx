import type { DeliverableCell as CellType, DeliverableAction, Workstream } from '../types/project-detail.types'
import { DeliverableCell } from './DeliverableCell'
import { STAGES } from '../data/constants'

type DeliverableRowProps = {
  workstream: Workstream
  cells: CellType[]
  onAction: (cellId: string, action: DeliverableAction) => void
}

function getWorkstreamProgress(cells: CellType[]) {
  const total = 6 // 항상 6단계 기준
  const done = cells.filter((c) => c.status === 'ready').length
  return { done, total, ratio: Math.round((done / total) * 100) }
}

function getProgressStyle(ratio: number) {
  if (ratio === 100) {
    return {
      track: 'bg-[var(--success-bg)]',
      gradient: 'linear-gradient(90deg, #2d8a6e, #34d399)',
    }
  }
  if (ratio >= 50) {
    return {
      track: 'bg-[var(--primary-50)]',
      gradient: 'linear-gradient(90deg, var(--primary-700), var(--primary-400))',
    }
  }
  if (ratio > 0) {
    return {
      track: 'bg-[var(--primary-50)]',
      gradient: 'linear-gradient(90deg, var(--primary-300), var(--primary-200))',
    }
  }
  return {
    track: 'bg-[var(--gray-100)]',
    gradient: 'var(--gray-300)',
  }
}

export function DeliverableRow({ workstream, cells, onAction }: DeliverableRowProps) {
  const progress = getWorkstreamProgress(cells)
  const progressStyle = getProgressStyle(progress.ratio)

  return (
    <div className="grid grid-cols-[176px_repeat(6,1fr)] border-b border-[var(--gray-100)] last:border-b-0">
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
        <div className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${progressStyle.track}`}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress.ratio}%`,
              background: progressStyle.gradient,
            }}
          />
        </div>
      </div>

      {/* 6 Cells */}
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
