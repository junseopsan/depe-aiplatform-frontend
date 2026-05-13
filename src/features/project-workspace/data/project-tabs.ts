import type { ProjectTab } from '../types/project-workspace.types'

export const PROJECT_TABS: ProjectTab[] = [
  { id: 'dashboard', label: 'Dashboard', segment: null },
  { id: 'itb', label: 'ITB', segment: 'itb' },
  { id: 'irs', label: 'IRS', segment: 'irs' },
  { id: 'dc', label: 'Design Criteria', segment: 'dc' },
  { id: 'mps', label: 'MPS', segment: 'mps' },
  { id: 'pnid', label: 'P&ID', segment: 'pnid' },
  { id: 'compare', label: '문서비교', segment: 'compare' },
  { id: 'itb-history', label: 'ITB 이력', segment: 'itb-history' },
]
