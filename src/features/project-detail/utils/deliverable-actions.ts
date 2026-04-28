import type { DeliverableCell } from '../types/project-detail.types'

export function getNextRevision(currentRev?: string): string {
  if (!currentRev) return 'REV-01'
  const num = parseInt(currentRev.replace('REV-', ''), 10)
  return `REV-${String(num + 1).padStart(2, '0')}`
}

export function publishCell(cell: DeliverableCell): DeliverableCell {
  const newRev = getNextRevision(cell.revision)
  const secondaryAction =
    cell.origin === 'manualUploaded'
      ? { type: 'upload' as const, variant: 'secondary' as const, label: '업로드' as const }
      : { type: 'aiGenerate' as const, variant: 'secondary' as const, label: 'AI 생성' as const }

  return {
    ...cell,
    status: 'ready',
    statusText: '발행됨',
    revision: newRev,
    actions: [secondaryAction],
  }
}

export function startGenerating(cell: DeliverableCell): DeliverableCell {
  return {
    ...cell,
    status: 'generating',
    statusText: 'AI 처리 중...',
    actions: [],
  }
}

export function uploadComplete(cell: DeliverableCell): DeliverableCell {
  return {
    ...cell,
    status: 'ready',
    origin: 'manualUploaded',
    statusText: '업로드 완료',
    actions: [
      { type: 'publish', variant: 'primary', label: '발행' },
      { type: 'upload', variant: 'secondary', label: '업로드' },
    ],
  }
}
