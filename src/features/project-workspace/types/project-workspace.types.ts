/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
export type Project = {
  id: string
  name: string
  contractNo: string
  startDate: string
  endDate: string
  client: string
}

export type ProjectTab = {
  id: string
  label: string
  segment: string | null
}
