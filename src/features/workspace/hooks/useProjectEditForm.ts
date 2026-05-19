/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import type {
  Project,
  ProjectStatus,
  ProjectType,
} from '@/features/workspace/types/workspace.types'

const MIN = {
  contractNo: 10,
  name: 5,
  description: 10,
} as const

const lenError = (value: string, min: number, label: string) =>
  value.length < min ? `${label}은(는) ${min}자 이상이어야 합니다` : undefined

export const useProjectEditForm = (project: Project) => {
  const [type, setType] = useState<ProjectType>(project.type)
  const [status, setStatus] = useState<ProjectStatus>(project.status)
  const [contractNo, setContractNo] = useState(project.contractNo)
  const [budgetCode, setBudgetCode] = useState(project.budgetCode ?? '')
  const [name, setName] = useState(project.name)
  const [customer, setClient] = useState(project.customer)
  const [description, setDescription] = useState(project.description ?? '')
  const [startDate, setStartDate] = useState(project.startDate)
  const [endDate, setEndDate] = useState(project.endDate)
  const [projectForm, setProjectForm] = useState(project.projectForm ?? '')
  const [region, setRegion] = useState(project.region ?? '')
  const [location, setLocation] = useState(project.location ?? '')

  const contractNoError = lenError(contractNo, MIN.contractNo, '계약번호')
  const nameError = lenError(name, MIN.name, '프로젝트 이름')
  const descriptionTooShort = description.length < MIN.description

  const isInvalid =
    Boolean(contractNoError || nameError) ||
    descriptionTooShort ||
    !startDate ||
    !endDate

  const isDirty =
    type !== project.type ||
    status !== project.status ||
    contractNo !== project.contractNo ||
    budgetCode !== (project.budgetCode ?? '') ||
    name !== project.name ||
    customer !== project.customer ||
    description !== (project.description ?? '') ||
    startDate !== project.startDate ||
    endDate !== project.endDate ||
    projectForm !== (project.projectForm ?? '') ||
    region !== (project.region ?? '') ||
    location !== (project.location ?? '')

  return {
    // values
    type,
    status,
    contractNo,
    budgetCode,
    name,
    customer,
    description,
    startDate,
    endDate,
    projectForm,
    region,
    location,
    // setters
    setType,
    setStatus,
    setContractNo,
    setBudgetCode,
    setName,
    setClient,
    setDescription,
    setStartDate,
    setEndDate,
    setProjectForm,
    setRegion,
    setLocation,
    // errors (개별 메시지 — 표시 여부는 컴포넌트 판단)
    contractNoError,
    nameError,
    // flags
    isInvalid,
    isDirty,
  }
}
