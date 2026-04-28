import { ChevronRight } from 'lucide-react'
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
      <div className="min-w-[1100px]">
        {/* Stage pipeline header — 같은 grid 사용 */}
        <div className="mb-2 grid grid-cols-[176px_repeat(6,1fr)] items-center">
          {/* Corner — 빈 공간 */}
          <div />

          {/* Stage 카드 + 화살표 */}
          {STAGES.map((stage, i) => (
            <div key={stage.code} className="relative px-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--gray-200)] bg-card px-3 py-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gray-100)] font-mono text-[9px] font-semibold text-[var(--gray-500)]">
                  {stage.index}
                </span>
                <div>
                  <p className="text-[12px] font-semibold leading-tight text-foreground">
                    {stage.name}
                  </p>
                  <span className="font-mono text-[9px] text-[var(--gray-400)]">
                    {stage.code}
                  </span>
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <ChevronRight
                  size={14}
                  className="absolute -right-[8px] top-1/2 z-10 -translate-y-1/2 text-[var(--gray-300)]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Matrix table */}
        <div className="overflow-hidden rounded-xl border border-[var(--gray-200)] bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.04)]">
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
    </div>
  )
}
