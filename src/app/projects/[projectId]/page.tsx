import { DeliverableMatrixPage } from '@/features/project-detail/components/DeliverableMatrixPage'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <DeliverableMatrixPage projectId={projectId} />
}
