/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { ProjectFormSection } from '@/features/workspace/components/form/ProjectFormSection'
import { ProjectDetailField } from '@/features/workspace/components/detail/ProjectDetailField'

type ProjectDetailPeriodSectionProps = {
  startDate: string
  endDate: string
}

export const ProjectDetailPeriodSection = ({
  startDate,
  endDate,
}: ProjectDetailPeriodSectionProps) => (
  <ProjectFormSection index={3} title="기간">
    <div className="grid grid-cols-2 gap-4">
      <ProjectDetailField label="착수일" mono>
        {startDate}
      </ProjectDetailField>
      <ProjectDetailField label="완공일" mono>
        {endDate}
      </ProjectDetailField>
    </div>
  </ProjectFormSection>
)
