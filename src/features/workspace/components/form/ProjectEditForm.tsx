/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UiButton } from '@/components/ui/UiButton'
import { useUserRole } from '@/lib/use-user-role'
import type { Project, ProjectStatus, ProjectType } from '@/features/workspace/components/../types/workspace.types'
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
  const [type, setType] = useState<ProjectType>(project.type)
  const [status, setStatus] = useState<ProjectStatus>(project.status)
  const [contractNo, setContractNo] = useState(project.contractNo)
  const [budgetCode, setBudgetCode] = useState(project.budgetCode ?? '')
  const [name, setName] = useState(project.name)
  const [client, setClient] = useState(project.client)
  const [description, setDescription] = useState(project.description ?? '')
  const [startDate, setStartDate] = useState(project.startDate)
  const [endDate, setEndDate] = useState(project.endDate)
  const [projectForm, setProjectForm] = useState(project.projectForm ?? '')
  const [region, setRegion] = useState(project.region ?? '')
  const [location, setLocation] = useState(project.location ?? '')

  const handleCancel = () => {
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
          <UiButton type="button" size="lg">
            변경사항 저장
          </UiButton>
        }
      />
      <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 py-8">
        <form autoComplete="off">
          {/* 1. 식별 및 분류 — 유형·계약번호·예산코드·상태 */}
          <ProjectFormIdentitySection
            type={type}
            status={status}
            contractNo={contractNo}
            budgetCode={budgetCode}
            onTypeChange={setType}
            onStatusChange={setStatus}
            onContractNoChange={setContractNo}
            onBudgetCodeChange={setBudgetCode}
          />
          {/* 2. 프로젝트 개요 — 이름·발주처·설명 */}
          <ProjectFormOverviewSection
            name={name}
            client={client}
            description={description}
            onNameChange={setName}
            onClientChange={setClient}
            onDescriptionChange={setDescription}
          />
          {/* 3. 기간 — 착수일·완공일 */}
          <ProjectFormPeriodSection
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          {/* 4. 형태 · 위치 — 프로젝트 형태·지역·위치 */}
          <ProjectFormShapeLocationSection
            projectForm={projectForm}
            region={region}
            location={location}
            onProjectFormChange={setProjectForm}
            onRegionChange={setRegion}
            onLocationChange={setLocation}
          />
        </form>
      </main>
    </div>
  )
}
