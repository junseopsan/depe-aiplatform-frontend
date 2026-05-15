/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { UiBadgeTone } from '@/components/ui/UiBadge'
import type { ProjectStatus, ProjectType } from '../types/workspace.types'

export type BadgeDisplay = {
  label: string
  tone: UiBadgeTone
}

export const PROJECT_STATUS_BADGE: Record<ProjectStatus, BadgeDisplay> = {
  running: { label: '진행중', tone: 'primary' },
  ended: { label: '완료', tone: 'gray' },
  canceled: { label: '취소', tone: 'gray' },
}

export const PROJECT_TYPE_BADGE: Record<ProjectType, BadgeDisplay> = {
  견적: { label: '견적', tone: 'warning' },
  수행: { label: '수행', tone: 'success' },
}
