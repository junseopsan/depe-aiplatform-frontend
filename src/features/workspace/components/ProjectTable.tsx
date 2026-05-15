/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { UiBadge } from '@/components/ui/UiBadge'
import { UiTable, type UiTableColumn } from '@/components/ui/UiTable'
import type { Project } from '../types/workspace.types'
import { PROJECT_STATUS_BADGE, PROJECT_TYPE_BADGE } from '../data/project-badges'

type ProjectTableProps = {
  projects: Project[]
}

const columns: UiTableColumn<Project>[] = [
  { key: 'name', header: '프로젝트 이름', sortable: true, truncate: '360px' },
  { key: 'contractNo', header: '계약번호', width: '150px', mono: true },
  {
    key: 'type',
    header: '유형',
    width: '80px',
    render: (p) => {
      const badge = PROJECT_TYPE_BADGE[p.type]
      return <UiBadge tone={badge.tone}>{badge.label}</UiBadge>
    },
  },
  {
    key: 'status',
    header: '상태',
    width: '100px',
    render: (p) => {
      const badge = PROJECT_STATUS_BADGE[p.status]
      return <UiBadge tone={badge.tone}>{badge.label}</UiBadge>
    },
  },
  { key: 'client', header: '발주처', width: '180px' },
  {
    key: 'period',
    header: '계약기간',
    width: '200px',
    mono: true,
    format: (p) => `${p.startDate} — ${p.endDate}`,
  },
  {
    key: 'action',
    header: '',
    width: '60px',
    align: 'center',
    render: (p) => (
      <Link
        href={`/projects/${p.id}/edit`}
        aria-label="프로젝트 수정"
        className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[var(--gray-500)] transition-colors hover:bg-[var(--gray-100)] hover:text-[var(--gray-800)]"
      >
        <ArrowRight className="size-4" />
      </Link>
    ),
  },
]

export const ProjectTable = ({ projects }: ProjectTableProps) => {
  const router = useRouter()
  const running = projects.filter((p) => p.status === 'running').length
  const ended = projects.filter((p) => p.status === 'ended').length

  return (
    <UiTable
      columns={columns}
      data={projects}
      rowKey={(p) => p.id}
      onRowClick={(p) => router.push(`/projects/${p.id}/edit`)}
      summary={{
        breakdown: [
          { label: '진행중', value: running },
          { label: '완료', value: ended },
        ],
      }}
    />
  )
}
