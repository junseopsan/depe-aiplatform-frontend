/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export type ProjectType = '견적' | '수행'
export type ProjectStatus = 'running' | 'ended' | 'canceled'

export type Project = {
  id: string
  name: string
  contractNo: string
  type: ProjectType
  status: ProjectStatus
  startDate: string
  endDate: string
  client: string
  itbCount: number
  budgetCode?: string
  description?: string
  projectForm?: string
  region?: string
  location?: string
}

export type ProjectTab = {
  id: string
  label: string
  segment: string | null
}
