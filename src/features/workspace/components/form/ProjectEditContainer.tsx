/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useProjectByContractNo } from '@/features/workspace/hooks/useProjectByContractNo'
import { ProjectEditForm } from '@/features/workspace/components/form/ProjectEditForm'
import { ProjectDetailBar } from '@/features/workspace/components/detail/ProjectDetailBar'
import { ProjectDetailError } from '@/features/workspace/components/detail/ProjectDetailError'
import { ProjectDetailNotFound } from '@/features/workspace/components/detail/ProjectDetailNotFound'
import { ProjectDetailSkeleton } from '@/features/workspace/components/detail/ProjectDetailSkeleton'

type ProjectEditContainerProps = {
  contractNo: string
}

export const ProjectEditContainer = ({ contractNo }: ProjectEditContainerProps) => {
  const result = useProjectByContractNo(contractNo)

  if (result.status === 'loading') {
    return (
      <div className="contents">
        <ProjectDetailBar />
        <ProjectDetailSkeleton />
      </div>
    )
  }

  if (result.status === 'error') {
    return (
      <div className="contents">
        <ProjectDetailBar />
        <ProjectDetailError
          message={result.error instanceof Error ? result.error.message : undefined}
          onRetry={result.retry}
        />
      </div>
    )
  }

  if (result.status === 'notfound') return <ProjectDetailNotFound />

  return <ProjectEditForm project={result.project} />
}
