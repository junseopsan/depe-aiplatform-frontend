/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { ProjectDetailContainer } from '@/features/workspace/components/detail/ProjectDetailContainer'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ contractNo: string }>
}) {
  const { contractNo } = await params
  return <ProjectDetailContainer contractNo={contractNo} />
}
