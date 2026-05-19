/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import Link from 'next/link'
import { UiButton } from '@/components/ui/UiButton'
import type { Project } from '@/features/workspace/types/workspace.types'

type ProjectDetailBarProps = {
  /** project 가 없으면 breadcrumb 이름·수정 버튼이 비활성 상태 (로딩/에러 화면용 placeholder) */
  project?: Project
}

export const ProjectDetailBar = ({ project }: ProjectDetailBarProps) => (
  <div className="flex items-center justify-between gap-6 border-b border-[var(--gray-200)] bg-white px-8 py-[18px]">
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex items-center gap-1.5 text-xs text-[var(--gray-500)]">
        <Link
          href="/projects"
          className="text-[var(--primary-700)] transition-colors hover:text-[var(--primary-500)] hover:underline"
        >
          Projects
        </Link>
        <span className="text-[var(--gray-300)]">/</span>
        <span className="truncate">{project?.name ?? ' '}</span>
      </div>
      <h1 className="text-xl font-semibold leading-[1.25] text-[var(--gray-800)]">
        프로젝트 정보 조회
      </h1>
    </div>
    <div className="flex items-center gap-2">
      <UiButton
        variant="secondary"
        nativeButton={false}
        render={<Link href="/projects" />}
      >
        목록
      </UiButton>
      <UiButton
        nativeButton={false}
        render={<Link href={project ? `/projects/${project.contractNo}/edit` : '#'} />}
        disabled={!project}
      >
        수정
      </UiButton>
    </div>
  </div>
)
