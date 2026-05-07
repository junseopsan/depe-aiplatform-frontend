import { notFound } from 'next/navigation'
import { MOCK_PROJECTS } from '@/features/project-detail/data/mock-project'
import { ProjectInfoBar } from '@/features/project-detail/components/ProjectInfoBar'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === projectId)
  if (!project) notFound()

  return (
    <>
      <ProjectInfoBar project={project} />
      <div className="flex-1 overflow-y-auto bg-background" />
    </>
  )
}
