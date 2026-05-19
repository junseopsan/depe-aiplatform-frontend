/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { UiPill } from '@/components/ui/UiPill'
import type { Project } from '@/features/workspace/types/workspace.types'
import { PROJECT_STATUS_BADGE, PROJECT_TYPE_BADGE } from '@/features/workspace/data/project-badges'
import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'
import { ProjectDetailField, valueOrDash } from '@/features/workspace/components/detail/ProjectDetailField'

type ProjectDetailIdentitySectionProps = {
  type: Project['type']
  status: Project['status']
  contractNo: string
  budgetCode?: string
}

export const ProjectDetailIdentitySection = ({
  type,
  status,
  contractNo,
  budgetCode,
}: ProjectDetailIdentitySectionProps) => {
  const typeBadge = PROJECT_TYPE_BADGE[type]
  const statusBadge = PROJECT_STATUS_BADGE[status]

  return (
    <ProjectFormSection index={1} title="식별 및 분류">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <ProjectDetailField label="프로젝트 유형">
          <UiPill tone={typeBadge.tone}>{typeBadge.label}</UiPill>
        </ProjectDetailField>
        <ProjectDetailField label="프로젝트 상태">
          <UiPill tone={statusBadge.tone}>{statusBadge.label}</UiPill>
        </ProjectDetailField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ProjectDetailField label="계약번호" mono>
          {contractNo}
        </ProjectDetailField>
        <ProjectDetailField label="예산코드" mono>
          {valueOrDash(budgetCode)}
        </ProjectDetailField>
      </div>
    </ProjectFormSection>
  )
}
