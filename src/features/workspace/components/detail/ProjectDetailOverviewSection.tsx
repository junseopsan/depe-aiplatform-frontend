/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'
import { ProjectDetailField, valueOrDash } from '@/features/workspace/components/detail/ProjectDetailField'

type ProjectDetailOverviewSectionProps = {
  name: string
  client: string
  description?: string
}

export const ProjectDetailOverviewSection = ({
  name,
  client,
  description,
}: ProjectDetailOverviewSectionProps) => (
  <ProjectFormSection index={2} title="프로젝트 개요">
    <div className="mb-4 grid grid-cols-2 gap-4">
      <ProjectDetailField label="프로젝트 이름">{name}</ProjectDetailField>
      <ProjectDetailField label="발주처">{client}</ProjectDetailField>
    </div>
    <ProjectDetailField label="프로젝트 설명">
      <p className="whitespace-pre-wrap">{valueOrDash(description)}</p>
    </ProjectDetailField>
  </ProjectFormSection>
)
