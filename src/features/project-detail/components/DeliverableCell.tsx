'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/UiButton'
import { Sparkles, Upload, CheckCircle2, Lock } from 'lucide-react'
import type { DeliverableCell as CellType, DeliverableAction } from '../types/project-detail.types'
import { getStatusStyle, getOriginLabel } from '../utils/deliverable-status'

type DeliverableCellProps = {
  cell: CellType
  onAction: (cellId: string, action: DeliverableAction) => void
  isLast?: boolean
}

const STRIPE_BG = 'repeating-linear-gradient(135deg, transparent, transparent 8px, var(--gray-50) 8px, var(--gray-50) 9px)'

const ACTION_ICONS: Record<string, React.ReactNode> = {
  aiGenerate: <Sparkles size={12} />,
  upload: <Upload size={12} />,
  publish: <CheckCircle2 size={12} />,
}

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
        <span className="rounded-md bg-white/70 px-3 py-1 font-mono text-xs tracking-widest text-[var(--gray-400)]">
          N/A
        </span>
      </div>
    )
  }

  // Blocked
  if (cell.status === 'blocked') {
    return (
      <div
        className={cn('flex flex-col items-center justify-center gap-1.5 p-4', borderRight)}
        style={{ background: STRIPE_BG }}
      >
        <Lock size={16} className="text-[var(--gray-300)]" />
        {cell.documentTitle && (
          <span className="text-center text-xs font-medium text-[var(--gray-400)]">
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
        'group flex min-h-[110px] flex-col border-l-[3px] p-3.5 transition-all duration-150',
        borderRight,
        style.borderClass,
        style.bgClass,
        style.interactive && style.hoverClass,
      )}
    >
      {/* 문서명 + REV */}
      {cell.documentTitle && (
        <div className="flex items-start justify-between gap-1.5">
          <span className="text-[13px] font-semibold leading-snug text-foreground">
            {cell.documentTitle}
          </span>
          {cell.revision && (
            <span className="mt-px shrink-0 rounded-md bg-[var(--gray-100)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--gray-500)]">
              {cell.revision}
            </span>
          )}
        </div>
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
                  : 'bg-white/80 backdrop-blur-sm',
              )}
              onClick={() => onAction(cell.id, action)}
            >
              {ACTION_ICONS[action.type]}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
