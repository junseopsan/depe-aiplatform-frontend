/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { UiButton } from '@/components/ui/UiButton'
import { useUserRole } from '@/lib/use-user-role'

export const NewProjectButton = () => {
  const { role } = useUserRole()
  if (role !== 'admin') return null

  return (
    <UiButton nativeButton={false} render={<Link href="/projects/new" />}>
      <Plus />
      새 프로젝트 추가
    </UiButton>
  )
}
