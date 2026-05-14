/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { ProjectTab } from '../types/workspace.types'

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
