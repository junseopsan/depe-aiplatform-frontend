import type { DeliverableCell, DeliverableAction } from '../types/project-detail.types'
import { STAGES, WORKSTREAMS } from '../data/constants'
import { DeliverableRow } from './DeliverableRow'

type DeliverableMatrixProps = {
  deliverables: DeliverableCell[]
  onAction: (cellId: string, action: DeliverableAction) => void
}

export function DeliverableMatrix({ deliverables, onAction }: DeliverableMatrixProps) {
  return (
    <div className="overflow-x-auto px-8 py-6">
      <div className="min-w-[1100px] overflow-hidden rounded-xl border border-[var(--gray-200)] bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.04)]">
        {/* Stage header row */}
        <div className="grid grid-cols-[176px_repeat(6,1fr)]">
          {/* Corner */}
          <div className="flex items-end border-b border-r border-[var(--gray-200)] bg-[var(--gray-50)] px-4 py-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--gray-400)]">
              Workstream
            </span>
          </div>

          {/* Stage headers */}
          {STAGES.map((stage, i) => (
            <div
              key={stage.code}
              className={`border-b border-[var(--gray-200)] bg-[var(--gray-50)] px-3.5 py-3 ${
                i < STAGES.length - 1 ? 'border-r border-r-[var(--gray-200)]' : ''
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--gray-400)]">
                {stage.index} / {stage.code}
              </span>
              <p className="mt-0.5 text-[13px] font-semibold text-foreground">
                {stage.name}
              </p>
            </div>
          ))}
        </div>

        {/* Workstream rows */}
        {WORKSTREAMS.map((ws) => {
          const cells = deliverables.filter((d) => d.workstreamCode === ws.code)
          return (
            <DeliverableRow
              key={ws.code}
              workstream={ws}
              cells={cells}
              onAction={onAction}
            />
          )
        })}
      </div>
    </div>
  )
}
