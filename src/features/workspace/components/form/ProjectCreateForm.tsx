/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UiButton } from '@/components/ui/UiButton'
import type { ProjectStatus, ProjectType } from '@/features/workspace/types/workspace.types'
import { ProjectFormBar } from '@/features/workspace/components/form/ProjectFormBar'
import { ProjectFormIdentitySection } from '@/features/workspace/components/form/ProjectFormIdentitySection'
import { ProjectFormOverviewSection } from '@/features/workspace/components/form/ProjectFormOverviewSection'
import { ProjectFormPeriodSection } from '@/features/workspace/components/form/ProjectFormPeriodSection'
import { ProjectFormShapeLocationSection } from '@/features/workspace/components/form/ProjectFormShapeLocationSection'

export const ProjectCreateForm = () => {
  const router = useRouter()
  const [type, setType] = useState<ProjectType>('EXECUTION')
  const [status, setStatus] = useState<ProjectStatus>('IN_PROGRESS')
  const [contractNo, setContractNo] = useState('')
  const [budgetCode, setBudgetCode] = useState('')
  const [name, setName] = useState('')
  const [customer, setClient] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectForm, setProjectForm] = useState('')
  const [region, setRegion] = useState('')
  const [location, setLocation] = useState('')

  const handleCancel = () => {
    router.push('/projects')
  }

  return (
    <div className="contents">
      <ProjectFormBar
        breadcrumb="새 프로젝트"
        title="새 프로젝트 추가"
        onCancel={
          <UiButton type="button" variant="secondary" onClick={handleCancel}>
            취소
          </UiButton>
        }
        onSubmit={
          <UiButton type="button">
            프로젝트 생성
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
            showStatus={false}
          />
          {/* 2. 프로젝트 개요 — 이름·발주처·설명 */}
          <ProjectFormOverviewSection
            name={name}
            customer={customer}
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
