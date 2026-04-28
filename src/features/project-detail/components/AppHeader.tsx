'use client'

import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/UiInput'
import type { Project } from '../types/project-detail.types'

type AppHeaderProps = {
  project: Project
}

export function AppHeader({ project }: AppHeaderProps) {
  return (
    <header className="flex flex-1 items-center justify-between bg-card px-8 py-3.5">
      {/* Breadcrumb + Project info */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">산출물관리</span>
        <ChevronRight size={14} className="text-[var(--gray-300)]" />
        <span className="text-sm font-semibold text-foreground">
          {project.name}
        </span>
        <span className="ml-1 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {project.contractNo}
        </span>
        <span className="text-[11px] text-[var(--gray-400)]">
          {project.startDate} – {project.endDate}
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative w-[280px]">
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
        <span className="rounded border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground">
          POC v0.2
        </span>
      </div>
    </header>
  )
}
