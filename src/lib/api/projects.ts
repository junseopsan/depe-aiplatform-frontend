/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { apiFetch } from '@/lib/api/client'
import type {
  Project,
  ProjectStatus,
  ProjectType,
} from '@/features/workspace/types/workspace.types'

/** 백엔드 응답 스키마 — `doc/md/domain-model-project.md` 정본 따름 */
type ApiProject = {
  projectId: number
  contractNumber: string
  name: string
  status: ProjectStatus
  projectType: ProjectType
  projectPeriod: {
    plannedStartDate: string
    plannedEndDate: string
  }
  description?: string
  projectCode?: string
  customer?: string
  plantType?: string
  siteRegion?: string
  siteLocation?: string
  archivedAt?: string | null
}

const toProject = (raw: ApiProject): Project => ({
  id: String(raw.projectId),
  name: raw.name,
  contractNo: raw.contractNumber,
  status: raw.status,
  type: raw.projectType,
  startDate: raw.projectPeriod.plannedStartDate,
  endDate: raw.projectPeriod.plannedEndDate,
  customer: raw.customer ?? '',
  itbCount: 0,
  budgetCode: raw.projectCode,
  description: raw.description,
  projectForm: raw.plantType,
  region: raw.siteRegion,
  location: raw.siteLocation,
  archivedAt: raw.archivedAt ?? null,
})

export const listProjects = async (): Promise<Project[]> => {
  const raw = await apiFetch<ApiProject[]>('/api/projects')
  return raw.map(toProject)
}

export const getProject = async (projectId: string | number): Promise<Project> => {
  const raw = await apiFetch<ApiProject>(`/api/projects/${projectId}`)
  return toProject(raw)
}
