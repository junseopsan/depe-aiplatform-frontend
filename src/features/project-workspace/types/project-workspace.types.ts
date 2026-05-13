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
