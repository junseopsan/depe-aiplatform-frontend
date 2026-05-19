/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { Project } from '@/features/workspace/types/workspace.types'
import { ProjectDetailIdentitySection } from '@/features/workspace/components/detail/ProjectDetailIdentitySection'
import { ProjectDetailOverviewSection } from '@/features/workspace/components/detail/ProjectDetailOverviewSection'
import { ProjectDetailPeriodSection } from '@/features/workspace/components/detail/ProjectDetailPeriodSection'
import { ProjectDetailShapeLocationSection } from '@/features/workspace/components/detail/ProjectDetailShapeLocationSection'

type ProjectDetailViewProps = {
  project: Project
}

export const ProjectDetailView = ({ project }: ProjectDetailViewProps) => (
  <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 pt-8 pb-16">
    <ProjectDetailIdentitySection
      type={project.type}
      status={project.status}
      contractNo={project.contractNo}
      budgetCode={project.budgetCode}
    />
    <ProjectDetailOverviewSection
      name={project.name}
      customer={project.customer}
      description={project.description}
    />
    <ProjectDetailPeriodSection
      startDate={project.startDate}
      endDate={project.endDate}
    />
    <ProjectDetailShapeLocationSection
      projectForm={project.projectForm}
      region={project.region}
      location={project.location}
    />
  </main>
)
