import { notFound } from 'next/navigation'
import { MOCK_PROJECTS } from '@/features/project-detail/data/mock-project'
import { ProjectShell } from '@/features/project-detail/components/ProjectShell'

// TODO: API 연동 시 아래 함수로 교체
// async function fetchProject(projectId: string) {
//   const res = await fetch(`${process.env.API_BASE_URL}/projects/${projectId}`, { cache: 'no-store' })
//   if (!res.ok) return null
//   return res.json()
// }

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

  return <ProjectShell project={project}>{children}</ProjectShell>
}
