/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { UiFormField } from '@/components/ui/UiFormField'
import { UiInput } from '@/components/ui/UiInput'
import { UiSegmented } from '@/components/ui/UiSegmented'
import type { ProjectStatus, ProjectType } from '@/features/workspace/components/../types/workspace.types'
import { PROJECT_STATUS_OPTIONS, PROJECT_TYPE_OPTIONS } from '@/features/workspace/components/../utils/project-options'
import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'

type ProjectFormIdentitySectionProps = {
  type: ProjectType
  status: ProjectStatus
  contractNo: string
  budgetCode: string
  onTypeChange: (value: ProjectType) => void
  onStatusChange: (value: ProjectStatus) => void
  onContractNoChange: (value: string) => void
  onBudgetCodeChange: (value: string) => void
}

export const ProjectFormIdentitySection = ({
  type,
  status,
  contractNo,
  budgetCode,
  onTypeChange,
  onStatusChange,
  onContractNoChange,
  onBudgetCodeChange,
}: ProjectFormIdentitySectionProps) => (
  <ProjectFormSection index={1} title="식별 및 분류">
    <div className="mb-4 grid gap-4">
      <UiFormField label="프로젝트 유형" required>
        <UiSegmented
          name="type"
          options={PROJECT_TYPE_OPTIONS}
          value={type}
          onChange={onTypeChange}
        />
      </UiFormField>
    </div>
    <div className="mb-4 grid grid-cols-2 gap-4">
      <UiFormField label="계약번호" required htmlFor="contractNo">
        <UiInput
          id="contractNo"
          mono
          value={contractNo}
          onChange={(e) => onContractNoChange(e.target.value)}
        />
      </UiFormField>
      <UiFormField label="예산코드" htmlFor="budgetCode">
        <UiInput
          id="budgetCode"
          mono
          value={budgetCode}
          onChange={(e) => onBudgetCodeChange(e.target.value)}
        />
      </UiFormField>
    </div>
    <div className="grid gap-4">
      <UiFormField label="프로젝트 상태" required>
        <UiSegmented
          name="status"
          options={PROJECT_STATUS_OPTIONS}
          value={status}
          onChange={onStatusChange}
        />
      </UiFormField>
    </div>
  </ProjectFormSection>
)
