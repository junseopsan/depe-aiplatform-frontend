import type { DeliverableCell as CellType, DeliverableAction, Workstream } from '../types/project-detail.types'
import { DeliverableCell } from './DeliverableCell'
import { STAGES } from '../data/constants'

type DeliverableRowProps = {
  workstream: Workstream
  cells: CellType[]
  onAction: (cellId: string, action: DeliverableAction) => void
}

export function DeliverableRow({ workstream, cells, onAction }: DeliverableRowProps) {
  return (
    <div className="grid grid-cols-[176px_repeat(6,1fr)] border-b border-[var(--gray-100)] last:border-b-0">
      {/* Workstream label */}
      <div className="flex flex-col justify-center border-r border-[var(--gray-200)] bg-[var(--gray-50)]/60 px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--gray-400)]">
          {workstream.code}
        </span>
        <span className="text-[13px] font-semibold text-foreground">
          {workstream.name}
        </span>
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
