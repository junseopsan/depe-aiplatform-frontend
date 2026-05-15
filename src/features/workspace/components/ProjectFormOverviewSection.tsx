/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { UiFormField } from '@/components/ui/UiFormField'
import { UiInput } from '@/components/ui/UiInput'
import { UiTextarea } from '@/components/ui/UiTextarea'
import { ProjectFormSection } from './ProjectFormSection'

type ProjectFormOverviewSectionProps = {
  name: string
  client: string
  description: string
  onNameChange: (value: string) => void
  onClientChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export const ProjectFormOverviewSection = ({
  name,
  client,
  description,
  onNameChange,
  onClientChange,
  onDescriptionChange,
}: ProjectFormOverviewSectionProps) => (
  <ProjectFormSection index={2} title="프로젝트 개요">
    <div className="mb-4 grid grid-cols-2 gap-4">
      <UiFormField label="프로젝트 이름" required htmlFor="name">
        <UiInput
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </UiFormField>
      <UiFormField label="발주처" required htmlFor="client">
        <UiInput
          id="client"
          value={client}
          onChange={(e) => onClientChange(e.target.value)}
        />
      </UiFormField>
    </div>
    <div className="grid gap-4">
      <UiFormField label="프로젝트 설명" htmlFor="description">
        <UiTextarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </UiFormField>
    </div>
  </ProjectFormSection>
)
