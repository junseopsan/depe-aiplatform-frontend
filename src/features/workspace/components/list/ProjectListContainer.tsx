/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listProjects } from '@/lib/api/projects'
import { useUserRole } from '@/lib/use-user-role'
import type { Project } from '@/features/workspace/types/workspace.types'
import { ProjectTable } from '@/features/workspace/components/list/ProjectTable'
import { ProjectListEmpty } from '@/features/workspace/components/list/ProjectListEmpty'
import { ProjectListSkeleton } from '@/features/workspace/components/list/ProjectListSkeleton'
import { ProjectListError } from '@/features/workspace/components/list/ProjectListError'

/**
 * 도메인 정본 가시성 규칙:
 * - archived 행은 모두 숨김
 * - member: IN_PROGRESS 만
 * - admin: terminal(CLOSED/CANCELLED) 포함 (archived 제외)
 */
const applyVisibility = (projects: Project[], role: 'admin' | 'member') => {
  const active = projects.filter((p) => !p.archivedAt)
  return role === 'admin' ? active : active.filter((p) => p.status === 'IN_PROGRESS')
}

export const ProjectListContainer = () => {
  const { role } = useUserRole()
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['projects'],
    queryFn: listProjects,
  })

  const visible = useMemo(() => (data ? applyVisibility(data, role) : []), [data, role])

  if (isLoading) return <ProjectListSkeleton />

  if (isError) {
    return (
      <ProjectListError
        message={error instanceof Error ? error.message : '알 수 없는 오류'}
        onRetry={() => refetch()}
      />
    )
  }

  if (visible.length === 0) return <ProjectListEmpty />

  return (
    <div className={isRefetching ? 'opacity-60 transition-opacity' : undefined}>
      <ProjectTable projects={visible} />
    </div>
  )
}
