/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'
import { ProjectDetailField, valueOrDash } from '@/features/workspace/components/detail/ProjectDetailField'

type ProjectDetailShapeLocationSectionProps = {
  projectForm?: string
  region?: string
  location?: string
}

export const ProjectDetailShapeLocationSection = ({
  projectForm,
  region,
  location,
}: ProjectDetailShapeLocationSectionProps) => (
  <ProjectFormSection index={4} title="형태 · 위치">
    <div className="grid grid-cols-3 gap-4">
      <ProjectDetailField label="프로젝트 형태">
        {valueOrDash(projectForm)}
      </ProjectDetailField>
      <ProjectDetailField label="지역">{valueOrDash(region)}</ProjectDetailField>
      <ProjectDetailField label="위치">{valueOrDash(location)}</ProjectDetailField>
    </div>
  </ProjectFormSection>
)
