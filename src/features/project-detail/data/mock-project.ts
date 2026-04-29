import type { Project } from '../types/project-detail.types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: '사우디 주바일 복합화력 플랜트 건설',
    contractNo: 'KSA-JIC-2026-0312',
    startDate: '2026.04',
    endDate: '2028.12',
  },
  {
    id: 'proj-002',
    name: '말레이시아 코타키나발루 정유 플랜트',
    contractNo: 'MYS-KKB-2025-0087',
    startDate: '2025.09',
    endDate: '2027.12',
  },
  {
    id: 'proj-003',
    name: '베트남 하이퐁 LNG 발전 프로젝트',
    contractNo: 'VNM-HPG-2026-0041',
    startDate: '2026.02',
    endDate: '2028.06',
  },
  {
    id: 'proj-004',
    name: '이라크 바스라 담수화 플랜트',
    contractNo: 'IRQ-BSR-2025-0156',
    startDate: '2025.11',
    endDate: '2028.03',
  },
  {
    id: 'proj-005',
    name: '인도네시아 자카르타 석유화학 플랜트',
    contractNo: 'IDN-JKT-2026-0098',
    startDate: '2026.06',
    endDate: '2029.01',
  },
]

export const MOCK_PROJECT: Project = MOCK_PROJECTS[0]
