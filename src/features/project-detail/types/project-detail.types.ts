// --- Project ---
export type Project = {
  id: string
  name: string
  contractNo: string
  startDate: string
  endDate: string
}

// --- Deliverable Status ---
export type DeliverableStatus =
  | 'ready'
  | 'review'
  | 'generating'
  | 'aiFailed'
  | 'missing'
  | 'blocked'
  | 'na'

// --- Deliverable Origin ---
export type DeliverableOrigin =
  | 'manualUploaded'
  | 'manualRequired'
  | 'aiGenerated'
  | 'aiAvailable'
  | 'aiFailed'
  | null

// --- Deliverable Action ---
export type DeliverableAction = {
  type: 'aiGenerate' | 'upload' | 'publish'
  variant: 'primary' | 'secondary'
  label: 'AI 생성' | '업로드' | '발행'
}

// --- Deliverable Cell ---
export type DeliverableCell = {
  id: string
  workstreamCode: string
  workstreamName: string
  stageCode: string
  stageName: string
  documentTitle?: string
  revision?: string
  status: DeliverableStatus
  origin: DeliverableOrigin
  statusText?: string
  progress?: number
  actions: DeliverableAction[]
}

// --- Stage ---
export type Stage = {
  code: string
  index: string
  name: string
}

// --- Workstream ---
export type Workstream = {
  code: string
  name: string
}
