/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { UiPillTone } from '@/components/ui/UiPill'
import type { ProjectStatus, ProjectType } from '@/features/workspace/types/workspace.types'

export type BadgeDisplay = {
  label: string
  tone: UiPillTone
}

export const PROJECT_STATUS_BADGE: Record<ProjectStatus, BadgeDisplay> = {
  PREPARING: { label: '준비중', tone: 'gray' },
  IN_PROGRESS: { label: '진행중', tone: 'primary' },
  CLOSED: { label: '완료', tone: 'gray' },
  CANCELLED: { label: '취소', tone: 'gray' },
}

export const PROJECT_TYPE_BADGE: Record<ProjectType, BadgeDisplay> = {
  BIDDING: { label: '견적', tone: 'warning' },
  EXECUTION: { label: '수행', tone: 'success' },
}
