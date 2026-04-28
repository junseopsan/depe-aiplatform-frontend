'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/UiInput'
import type { Project } from '../types/project-detail.types'

type AppHeaderProps = {
  project: Project
}

export function AppHeader({ project }: AppHeaderProps) {
  return (
    <header className="flex flex-1 items-center justify-between bg-card px-8 py-3.5">
      {/* Project name */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">산출물관리</span>
        <span className="text-[var(--gray-300)]">/</span>
        <span className="text-sm font-semibold text-foreground">
          {project.name}
        </span>
      </div>

      {/* Search — 중앙 */}
      <div className="relative w-[380px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"
          size={14}
        />
        <Input
          type="text"
          placeholder="프로젝트 검색..."
          className="pl-9"
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-[11px] text-[var(--gray-500)]">
        <span><span className="font-semibold text-[var(--gray-700)]">계약번호</span> <span className="font-mono">{project.contractNo}</span></span>
        <span><span className="font-semibold text-[var(--gray-700)]">계약기간</span> {project.startDate} – {project.endDate}</span>
      </div>
    </header>
  )
}
