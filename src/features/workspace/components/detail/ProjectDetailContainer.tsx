/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useQuery } from '@tanstack/react-query'
import { getProject, listProjects } from '@/lib/api/projects'
import { ApiError } from '@/lib/api/client'
import { useUserRole } from '@/lib/use-user-role'
import type { Project } from '@/features/workspace/types/workspace.types'
import { ProjectDetailBar } from '@/features/workspace/components/detail/ProjectDetailBar'
import { ProjectDetailView } from '@/features/workspace/components/detail/ProjectDetailView'
import { ProjectDetailSkeleton } from '@/features/workspace/components/detail/ProjectDetailSkeleton'
import { ProjectDetailError } from '@/features/workspace/components/detail/ProjectDetailError'
import { ProjectDetailNotFound } from '@/features/workspace/components/detail/ProjectDetailNotFound'

type ProjectDetailContainerProps = {
  contractNo: string
}

/**
 * 도메인 정본 가시성 규칙:
 * - archived 는 모두 숨김
 * - member: IN_PROGRESS 만
 * - admin: terminal(CLOSED/CANCELLED) 포함
 */
const isVisible = (project: Project, role: 'admin' | 'member') => {
  if (project.archivedAt) return false
  if (role === 'admin') return true
  return project.status === 'IN_PROGRESS'
}

export const ProjectDetailContainer = ({ contractNo }: ProjectDetailContainerProps) => {
  const { role } = useUserRole()

  // 1단계: 목록에서 contractNo → projectId 매칭 (캐시 우선)
  const listQuery = useQuery({
    queryKey: ['projects'],
    queryFn: listProjects,
  })

  const matched = listQuery.data?.find((p) => p.contractNo === contractNo)
  const projectId = matched?.id

  // 2단계: projectId 로 단건 조회
  const detailQuery = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId as string),
    enabled: !!projectId,
  })

  // 로딩
  if (listQuery.isLoading || (projectId && detailQuery.isLoading)) {
    return (
      <div className="contents">
        <ProjectDetailBar />
        <ProjectDetailSkeleton />
      </div>
    )
  }

  // 목록 호출 실패
  if (listQuery.isError) {
    return (
      <div className="contents">
        <ProjectDetailBar />
        <ProjectDetailError
          message={listQuery.error instanceof Error ? listQuery.error.message : undefined}
          onRetry={() => listQuery.refetch()}
        />
      </div>
    )
  }

  // 목록에 contractNo 없음
  if (!matched) return <ProjectDetailNotFound />

  // 상세 호출 실패
  if (detailQuery.isError) {
    const isNotFound =
      detailQuery.error instanceof ApiError && detailQuery.error.status === 404
    if (isNotFound) return <ProjectDetailNotFound />
    return (
      <div className="contents">
        <ProjectDetailBar />
        <ProjectDetailError
          message={detailQuery.error instanceof Error ? detailQuery.error.message : undefined}
          onRetry={() => detailQuery.refetch()}
        />
      </div>
    )
  }

  const project = detailQuery.data
  if (!project) return <ProjectDetailNotFound />
  if (!isVisible(project, role)) return <ProjectDetailNotFound />

  return (
    <div className="contents">
      <ProjectDetailBar project={project} />
      <ProjectDetailView project={project} />
    </div>
  )
}
