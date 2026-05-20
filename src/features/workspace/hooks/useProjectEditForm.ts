/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import type {
  Project,
  ProjectStatus,
  ProjectType,
} from '@/features/workspace/types/workspace.types'
import {
  validateContractNo,
  validateProjectDescription,
  validateProjectName,
} from '@/features/workspace/utils/project-validation'

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

  const contractNoError = validateContractNo(contractNo)
  const nameError = validateProjectName(name)
  const descriptionError = validateProjectDescription(description)

  const isInvalid =
    Boolean(contractNoError || nameError || descriptionError) ||
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
    descriptionError,
    // flags
    isInvalid,
    isDirty,
  }
}
