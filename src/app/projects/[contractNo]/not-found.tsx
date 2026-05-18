/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { UiButton } from '@/components/ui/UiButton'

export default function ProjectNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-6 py-16 text-center">
      <p className="text-[80px] font-bold leading-none text-[var(--primary-500)]">404</p>
      <h1 className="text-xl font-semibold text-foreground">프로젝트를 찾을 수 없습니다</h1>
      <p className="max-w-md text-sm text-[var(--gray-500)]">
        요청하신 프로젝트가 존재하지 않거나 접근 권한이 없습니다.
      </p>
      <UiButton size="lg" nativeButton={false} render={<Link href="/projects" />}>
        <ArrowLeft />
        목록으로 돌아가기
      </UiButton>
    </main>
  )
}
