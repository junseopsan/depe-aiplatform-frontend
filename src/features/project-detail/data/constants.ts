import type { Stage, Workstream } from '../types/project-detail.types'

export const STAGES: Stage[] = [
  { code: 'EST', index: '01', name: '견적' },
  { code: 'FEED', index: '02', name: '기본설계' },
  { code: 'DSGN', index: '03', name: '상세설계' },
  { code: 'VEND', index: '04', name: 'Vendor 선정' },
]

export const WORKSTREAMS: Workstream[] = [
  { code: 'PRC', name: '프로세스' },
  { code: 'MEQ', name: '주기기' },
  { code: 'ELE', name: '전기' },
  { code: 'INS', name: '계장' },
  { code: 'MEC', name: '기계' },
  { code: 'WTR', name: '수처리' },
  { code: 'CIV', name: '토목' },
  { code: 'ARC', name: '건축' },
  { code: 'PIP', name: '배관' },
  { code: 'LAY', name: '공간' },
  { code: 'UTL', name: '설비' },
]
