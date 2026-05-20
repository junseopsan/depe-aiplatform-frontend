/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UiButton } from '@/components/ui/UiButton'
import { ApiError } from '@/lib/api/client'
import { createProject } from '@/lib/api/projects'
import { useProjectCreateForm } from '@/features/workspace/hooks/useProjectCreateForm'
import { ProjectFormBar } from '@/features/workspace/components/form/ProjectFormBar'
import { ProjectFormIdentitySection } from '@/features/workspace/components/form/ProjectFormIdentitySection'
import { ProjectFormOverviewSection } from '@/features/workspace/components/form/ProjectFormOverviewSection'
import { ProjectFormPeriodSection } from '@/features/workspace/components/form/ProjectFormPeriodSection'
import { ProjectFormShapeLocationSection } from '@/features/workspace/components/form/ProjectFormShapeLocationSection'

const DUPLICATE_CONTRACT_MESSAGE = '이미 등록된 계약번호입니다'

export const ProjectCreateForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const form = useProjectCreateForm()
  const [serverContractNoError, setServerContractNoError] = useState<string | undefined>()
  const [submitError, setSubmitError] = useState<string | undefined>()

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      router.push(`/projects/${data.contractNumber}`)
    },
    onError: (err) => {
      if (err instanceof ApiError && err.status === 409) {
        setServerContractNoError(DUPLICATE_CONTRACT_MESSAGE)
        return
      }
      const detail =
        err instanceof ApiError && typeof (err.body as { detail?: unknown })?.detail === 'string'
          ? (err.body as { detail: string }).detail
          : err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다'
      setSubmitError(detail)
    },
  })

  const handleCancel = () => {
    router.push('/projects')
  }

  const handleSubmit = () => {
    if (form.isInvalid || serverContractNoError) return
    setSubmitError(undefined)
    mutation.mutate({
      type: form.type,
      contractNo: form.contractNo,
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      budgetCode: form.budgetCode,
      customer: form.customer,
      projectForm: form.projectForm,
      region: form.region,
      location: form.location,
    })
  }

  const handleContractNoChange = (value: string) => {
    if (serverContractNoError) setServerContractNoError(undefined)
    form.setContractNo(value)
  }

  const contractNoError = serverContractNoError ?? form.contractNoLenError
  const isSubmitDisabled = form.isInvalid || Boolean(serverContractNoError) || mutation.isPending

  return (
    <div className="contents">
      <ProjectFormBar
        breadcrumb="새 프로젝트"
        title="새 프로젝트 추가"
        onCancel={
          <UiButton type="button" variant="secondary" onClick={handleCancel} disabled={mutation.isPending}>
            취소
          </UiButton>
        }
        onSubmit={
          <UiButton type="button" onClick={handleSubmit} disabled={isSubmitDisabled}>
            {mutation.isPending ? '생성 중...' : '프로젝트 생성'}
          </UiButton>
        }
      />
      <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 py-8">
        {submitError && (
          <div
            role="alert"
            className="mb-6 rounded-md border border-[var(--error)] bg-[var(--error-bg)] px-4 py-3 text-sm text-[var(--error)]"
          >
            {submitError}
          </div>
        )}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <ProjectFormIdentitySection
            type={form.type}
            status="PREPARING"
            contractNo={form.contractNo}
            budgetCode={form.budgetCode}
            onTypeChange={form.setType}
            onStatusChange={() => {}}
            onContractNoChange={handleContractNoChange}
            onBudgetCodeChange={form.setBudgetCode}
            contractNoError={contractNoError}
            showStatus={false}
          />
          <ProjectFormOverviewSection
            name={form.name}
            customer={form.customer}
            description={form.description}
            onNameChange={form.setName}
            onClientChange={form.setClient}
            onDescriptionChange={form.setDescription}
            nameError={form.nameError}
            descriptionError={form.descriptionError}
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
