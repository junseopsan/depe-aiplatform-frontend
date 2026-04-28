'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/UiButton'
import type { DeliverableCell as CellType, DeliverableAction } from '../types/project-detail.types'
import { getStatusStyle, getOriginLabel } from '../utils/deliverable-status'

type DeliverableCellProps = {
  cell: CellType
  onAction: (cellId: string, action: DeliverableAction) => void
  isLast?: boolean
}

const STRIPE_BG = 'repeating-linear-gradient(135deg, transparent, transparent 8px, var(--gray-50) 8px, var(--gray-50) 9px)'

export function DeliverableCell({ cell, onAction, isLast }: DeliverableCellProps) {
  const style = getStatusStyle(cell.status)
  const originLabel = getOriginLabel(cell.origin)
  const borderRight = isLast ? '' : 'border-r border-r-[var(--gray-100)]'

  // N/A
  if (cell.status === 'na') {
    return (
      <div
        className={cn('flex items-center justify-center p-4', borderRight)}
        style={{ background: STRIPE_BG }}
      >
        <span className="bg-white/70 px-3 py-1 font-mono text-xs tracking-widest text-[var(--gray-400)]">
          N/A
        </span>
      </div>
    )
  }

  // Blocked
  if (cell.status === 'blocked') {
    return (
      <div
        className={cn('flex flex-col justify-center gap-1 p-3.5', borderRight)}
        style={{ background: STRIPE_BG }}
      >
        {cell.documentTitle && (
          <span className="text-[12px] font-medium text-[var(--gray-400)]">
            {cell.documentTitle}
          </span>
        )}
        <span className="text-[11px] text-[var(--gray-400)]">
          선행 단계 미완료
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex min-h-[110px] flex-col border-l-[3px] p-3.5',
        borderRight,
        style.borderClass,
        style.bgClass,
        style.interactive && style.hoverClass,
      )}
    >
      {/* 문서명 */}
      {cell.documentTitle && (
        <span className="text-[13px] font-semibold leading-snug text-foreground">
          {cell.documentTitle}
        </span>
      )}

      {/* origin-hint */}
      {originLabel && (
        <span className="mt-1.5 text-[11px] text-[var(--gray-500)]">
          {originLabel}
        </span>
      )}

      {/* status-line */}
      {cell.statusText && (
        <span className={cn('mt-0.5 text-xs font-semibold', style.statusColor)}>
          {cell.statusText}
        </span>
      )}

      {/* CTA row */}
      {cell.actions.length > 0 && (
        <div className="mt-auto flex gap-1.5 pt-3">
          {cell.actions.map((action) => (
            <Button
              key={action.type}
              variant={action.variant === 'primary' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'flex-1 gap-1 text-[11px] font-medium',
                action.variant === 'primary'
                  ? 'shadow-sm'
                  : 'bg-white/80',
              )}
              onClick={() => onAction(cell.id, action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
