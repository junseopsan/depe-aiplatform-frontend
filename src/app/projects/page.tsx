/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { UiSearch } from '@/components/ui/UiSearch'
import { NewProjectButton } from '@/features/workspace/components/list/NewProjectButton'
import { ProjectListContainer } from '@/features/workspace/components/list/ProjectListContainer'

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 pt-8 pb-16">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-semibold leading-[1.25] text-[var(--gray-800)]">
            프로젝트 목록
          </h1>
          <div className="mt-1 text-[13px] text-[var(--gray-500)]">
            조직이 수행 중이거나 완료한 모든 프로젝트를 한 곳에서 확인하세요
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <UiSearch placeholder="이름 또는 계약번호 검색" className="w-[280px]" />
          <NewProjectButton />
        </div>
      </div>

      <ProjectListContainer />
    </main>
  )
}
