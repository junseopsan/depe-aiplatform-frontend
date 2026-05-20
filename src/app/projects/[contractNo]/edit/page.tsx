/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { ProjectEditContainer } from '@/features/workspace/components/form/ProjectEditContainer'

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ contractNo: string }>
}) {
  const { contractNo } = await params
  return <ProjectEditContainer contractNo={contractNo} />
}
