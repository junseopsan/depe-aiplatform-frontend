/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import { UiButton } from '@/components/ui/UiButton'
import { useUserRole } from '@/lib/use-user-role'
import type { Project } from '@/features/workspace/types/workspace.types'
import { useProjectEditForm } from '@/features/workspace/hooks/useProjectEditForm'
import { ProjectFormBar } from '@/features/workspace/components/form/ProjectFormBar'
import { ProjectFormIdentitySection } from '@/features/workspace/components/form/ProjectFormIdentitySection'
import { ProjectFormOverviewSection } from '@/features/workspace/components/form/ProjectFormOverviewSection'
import { ProjectFormPeriodSection } from '@/features/workspace/components/form/ProjectFormPeriodSection'
import { ProjectFormShapeLocationSection } from '@/features/workspace/components/form/ProjectFormShapeLocationSection'

type ProjectEditFormProps = {
  project: Project
}

export const ProjectEditForm = ({ project }: ProjectEditFormProps) => {
  const router = useRouter()
  const { role } = useUserRole()
  const form = useProjectEditForm(project)

  const handleCancel = () => {
    if (form.isDirty && !window.confirm('변경 내용을 저장하지 않고 나가시겠습니까?')) return
    router.push(`/projects/${project.contractNo}`)
  }

  const handleSave = () => {
    if (form.isInvalid) return
    // TODO: 실제 저장 API 연동. 현재는 mock 환경이라 라우팅만.
    router.push(`/projects/${project.contractNo}`)
  }

  const handleDelete = () => {
    const ok = window.confirm(
      `'${project.name}' 프로젝트를 삭제하시겠습니까?\n\n관련된 모든 ITB 문서와 분석 결과가 함께 삭제되며, 되돌릴 수 없습니다.`,
    )
    if (!ok) return
    router.push('/projects')
  }

  return (
    <div className="contents">
      <ProjectFormBar
        breadcrumb={project.name}
        title="프로젝트 정보 수정"
        onDelete={
          role === 'admin' ? (
            <UiButton type="button" variant="ghost-danger" size="lg" onClick={handleDelete}>
              삭제
            </UiButton>
          ) : undefined
        }
        onCancel={
          <UiButton type="button" variant="secondary" size="lg" onClick={handleCancel}>
            취소
          </UiButton>
        }
        onSubmit={
          <UiButton type="button" size="lg" disabled={form.isInvalid} onClick={handleSave}>
            변경사항 저장
          </UiButton>
        }
      />
      <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 py-8">
        <form autoComplete="off">
          <ProjectFormIdentitySection
            type={form.type}
            status={form.status}
            contractNo={form.contractNo}
            budgetCode={form.budgetCode}
            onTypeChange={form.setType}
            onStatusChange={form.setStatus}
            onContractNoChange={form.setContractNo}
            onBudgetCodeChange={form.setBudgetCode}
            contractNoError={form.contractNoError}
          />
          <ProjectFormOverviewSection
            name={form.name}
            client={form.client}
            description={form.description}
            onNameChange={form.setName}
            onClientChange={form.setClient}
            onDescriptionChange={form.setDescription}
            nameError={form.nameError}
          />
          <ProjectFormPeriodSection
            startDate={form.startDate}
            endDate={form.endDate}
            onStartDateChange={form.setStartDate}
            onEndDateChange={form.setEndDate}
          />
          <ProjectFormShapeLocationSection
            projectForm={form.projectForm}
            region={form.region}
            location={form.location}
            onProjectFormChange={form.setProjectForm}
            onRegionChange={form.setRegion}
            onLocationChange={form.setLocation}
          />
        </form>
      </main>
    </div>
  )
}
