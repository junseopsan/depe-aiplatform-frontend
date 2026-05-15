/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { UiFormField } from '@/components/ui/UiFormField'
import { UiInput } from '@/components/ui/UiInput'
import { ProjectFormSection } from './ProjectFormSection'

type ProjectFormShapeLocationSectionProps = {
  projectForm: string
  region: string
  location: string
  onProjectFormChange: (value: string) => void
  onRegionChange: (value: string) => void
  onLocationChange: (value: string) => void
}

export const ProjectFormShapeLocationSection = ({
  projectForm,
  region,
  location,
  onProjectFormChange,
  onRegionChange,
  onLocationChange,
}: ProjectFormShapeLocationSectionProps) => (
  <ProjectFormSection index={4} title="형태 · 위치">
    <div className="grid grid-cols-3 gap-4">
      <UiFormField label="프로젝트 형태" htmlFor="projectForm">
        <UiInput
          id="projectForm"
          value={projectForm}
          onChange={(e) => onProjectFormChange(e.target.value)}
        />
      </UiFormField>
      <UiFormField label="지역" htmlFor="region">
        <UiInput
          id="region"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
        />
      </UiFormField>
      <UiFormField label="위치" htmlFor="location">
        <UiInput
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </UiFormField>
    </div>
  </ProjectFormSection>
)
