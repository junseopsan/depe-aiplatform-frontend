import type { DeliverableStatus, DeliverableOrigin } from '../types/project-detail.types'

export type StatusStyle = {
  borderClass: string
  bgClass: string
  hoverClass: string
  statusColor: string
  interactive: boolean
}

const STATUS_STYLES: Record<DeliverableStatus, StatusStyle> = {
  ready: {
    borderClass: 'border-l-[var(--success)]',
    bgClass: 'bg-white',
    hoverClass: 'hover:bg-[var(--success-bg)]',
    statusColor: 'text-[var(--success)]',
    interactive: true,
  },
  review: {
    borderClass: 'border-l-[var(--warning)]',
    bgClass: 'bg-[var(--warning-bg)]',
    hoverClass: 'hover:bg-[var(--warning-bg-hover)]',
    statusColor: 'text-[var(--warning)]',
    interactive: true,
  },
  generating: {
    borderClass: 'border-l-[var(--primary-500)]',
    bgClass: 'bg-[var(--primary-50)]',
    hoverClass: 'hover:bg-[var(--primary-100)]',
    statusColor: 'text-[var(--primary-500)]',
    interactive: true,
  },
  aiFailed: {
    borderClass: 'border-l-[var(--error)]',
    bgClass: 'bg-[var(--error-bg)]',
    hoverClass: 'hover:bg-[var(--error-bg-hover)]',
    statusColor: 'text-[var(--error)]',
    interactive: true,
  },
  missing: {
    borderClass: 'border-l-[var(--gray-300)]',
    bgClass: 'bg-white',
    hoverClass: 'hover:bg-[var(--gray-50)]',
    statusColor: 'text-[var(--gray-400)]',
    interactive: true,
  },
  blocked: {
    borderClass: 'border-l-transparent',
    bgClass: '',
    hoverClass: '',
    statusColor: 'text-[var(--gray-400)]',
    interactive: false,
  },
  na: {
    borderClass: 'border-l-transparent',
    bgClass: '',
    hoverClass: '',
    statusColor: 'text-[var(--gray-300)]',
    interactive: false,
  },
}

export function getStatusStyle(status: DeliverableStatus): StatusStyle {
  return STATUS_STYLES[status]
}

const ORIGIN_LABELS: Record<string, string> = {
  manualUploaded: '수기 업로드 완료',
  manualRequired: '수기 업로드 필요',
  aiGenerated: 'AI 생성 완료',
  aiAvailable: 'AI 생성 가능',
  aiFailed: 'AI 생성 실패',
}

export function getOriginLabel(origin: DeliverableOrigin): string | null {
  if (!origin) return null
  return ORIGIN_LABELS[origin] ?? null
}
