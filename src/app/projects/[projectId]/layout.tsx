import { notFound } from 'next/navigation'
import { MOCK_PROJECTS } from '@/features/project-workspace/data/mock-project'
import { ProjectInfoBar } from '@/features/project-workspace/components/ProjectInfoBar'
import { ProjectTabBar } from '@/features/project-workspace/components/ProjectTabBar'

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === projectId)
  if (!project) notFound()

  return (
    <>
      <ProjectInfoBar project={project} />
      <ProjectTabBar projectId={projectId} />
      {children}
    </>
  )
}
