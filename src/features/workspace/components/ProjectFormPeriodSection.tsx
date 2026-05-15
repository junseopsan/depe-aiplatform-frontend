/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { UiFormField } from '@/components/ui/UiFormField'
import { UiInput } from '@/components/ui/UiInput'
import { ProjectFormSection } from './ProjectFormSection'

type ProjectFormPeriodSectionProps = {
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
}

export const ProjectFormPeriodSection = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ProjectFormPeriodSectionProps) => (
  <ProjectFormSection index={3} title="기간">
    <div className="grid grid-cols-2 gap-4">
      <UiFormField label="착수일" required htmlFor="startDate">
        <UiInput
          id="startDate"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          placeholder="YYYY.MM"
        />
      </UiFormField>
      <UiFormField label="완공일" required htmlFor="endDate">
        <UiInput
          id="endDate"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          placeholder="YYYY.MM"
        />
      </UiFormField>
    </div>
  </ProjectFormSection>
)
