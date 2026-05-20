/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */

/**
 * 프로젝트 등록·수정 시 적용되는 도메인 규칙 검증.
 * 정본: `doc/md/domain-model-project.md` — 등록 규칙 섹션.
 */

export const PROJECT_MIN = {
  contractNo: 10,
  name: 5,
  description: 10,
} as const

const lenError = (value: string, min: number, label: string) =>
  value.length < min ? `${label}은(는) ${min}자 이상이어야 합니다` : undefined

export const validateContractNo = (value: string) =>
  lenError(value, PROJECT_MIN.contractNo, '계약번호')

export const validateProjectName = (value: string) =>
  lenError(value, PROJECT_MIN.name, '프로젝트 이름')

export const validateProjectDescription = (value: string) =>
  lenError(value, PROJECT_MIN.description, '프로젝트 설명')

export const validateCustomer = (value: string) =>
  value.trim().length === 0 ? '발주처를 입력해주세요' : undefined

/**
 * 기간 검증 — 도메인 정본: "착수일이 완공일보다 빠르거나 같아야 한다".
 * 두 값 중 하나라도 비어 있으면 검증 보류 (필수값 검증은 별도).
 */
export const validateProjectPeriod = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return undefined
  return startDate > endDate ? '착수일은 완공일보다 빠르거나 같아야 합니다' : undefined
}
