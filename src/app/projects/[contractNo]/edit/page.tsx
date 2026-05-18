/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { notFound } from 'next/navigation'
import { MOCK_PROJECTS } from '@/features/workspace/data/mock-project'
import { ProjectEditForm } from '@/features/workspace/components/form/ProjectEditForm'

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ contractNo: string }>
}) {
  const { contractNo } = await params
  const project = MOCK_PROJECTS.find((p) => p.contractNo === contractNo)
  if (!project) notFound()

  return <ProjectEditForm project={project} />
}
