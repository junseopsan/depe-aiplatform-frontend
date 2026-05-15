/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { Plus } from 'lucide-react'
import { UiButton } from '@/components/ui/UiButton'
import { UiSearch } from '@/components/ui/UiSearch'
import { MOCK_PROJECTS } from '@/features/workspace/data/mock-project'
import { ProjectTable } from '@/features/workspace/components/ProjectTable'
import { ProjectListEmpty } from '@/features/workspace/components/ProjectListEmpty'

export default function ProjectsPage() {
  const projects = MOCK_PROJECTS

  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-y-auto px-8 py-8">
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
          <UiButton size="lg">
            <Plus />
            새 프로젝트 추가
          </UiButton>
        </div>
      </div>

      {projects.length === 0 ? <ProjectListEmpty /> : <ProjectTable projects={projects} />}
    </main>
  )
}
