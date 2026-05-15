/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UiButton } from '@/components/ui/UiButton'
import type { Project, ProjectStatus, ProjectType } from '../types/workspace.types'
import { ProjectFormBar } from './ProjectFormBar'
import { ProjectFormIdentitySection } from './ProjectFormIdentitySection'
import { ProjectFormOverviewSection } from './ProjectFormOverviewSection'
import { ProjectFormPeriodSection } from './ProjectFormPeriodSection'
import { ProjectFormShapeLocationSection } from './ProjectFormShapeLocationSection'
import { ProjectFormItbSection } from './ProjectFormItbSection'

type ProjectEditFormProps = {
  project: Project
}

export const ProjectEditForm = ({ project }: ProjectEditFormProps) => {
  const router = useRouter()
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
    router.push('/projects')
  }

  return (
    <>
      <ProjectFormBar
        breadcrumb={project.name}
        title="프로젝트 정보 수정"
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
          {/* 5. ITB 업로드 */}
          <ProjectFormItbSection />
        </form>
      </main>
    </>
  )
}
