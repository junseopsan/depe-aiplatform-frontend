/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { ProjectStatus, ProjectType } from '@/features/workspace/types/workspace.types'
import {
  PROJECT_STATUS_BADGE,
  PROJECT_TYPE_BADGE,
  type BadgeDisplay,
} from '@/features/workspace/data/project-badges'

export type ProjectStatusOption = { value: ProjectStatus; label: string }
export type ProjectTypeOption = { value: ProjectType; label: string }

export const PROJECT_STATUS_OPTIONS: ProjectStatusOption[] = (
  Object.entries(PROJECT_STATUS_BADGE) as [ProjectStatus, BadgeDisplay][]
).map(([value, { label }]) => ({ value, label }))

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = (
  Object.entries(PROJECT_TYPE_BADGE) as [ProjectType, BadgeDisplay][]
).map(([value, { label }]) => ({ value, label }))
