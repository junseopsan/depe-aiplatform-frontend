/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useEffect, useState } from 'react'
import { formatYmd } from '@/lib/date'
import type { ProjectType } from '@/features/workspace/types/workspace.types'
import {
  validateContractNo,
  validateProjectDescription,
  validateProjectName,
  validateProjectPeriod,
} from '@/features/workspace/utils/project-validation'

export const useProjectCreateForm = () => {
  const [type, setType] = useState<ProjectType>('BIDDING')
  const [contractNo, setContractNo] = useState('')
  const [budgetCode, setBudgetCode] = useState('')
  const [name, setName] = useState('')
  const [customer, setClient] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    // effect 본문에서 동기 setState를 피하기 위해 다음 태스크로 미룸 (eslint 규칙)
    const id = setTimeout(() => {
      const today = new Date()
      const monthLater = new Date()
      monthLater.setMonth(monthLater.getMonth() + 1)
      setStartDate(formatYmd(today))
      setEndDate(formatYmd(monthLater))
    }, 0)
    return () => clearTimeout(id)
  }, [])
  const [projectForm, setProjectForm] = useState('')
  const [region, setRegion] = useState('')
  const [location, setLocation] = useState('')

  const contractNoLenError = validateContractNo(contractNo)
  const nameError = validateProjectName(name)
  const descriptionError = validateProjectDescription(description)
  const periodError = validateProjectPeriod(startDate, endDate)

  const isInvalid =
    Boolean(contractNoLenError || nameError || descriptionError || periodError) ||
    !startDate ||
    !endDate

  return {
    // values
    type,
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
    // errors
    contractNoLenError,
    nameError,
    descriptionError,
    periodError,
    // flags
    isInvalid,
  }
}
