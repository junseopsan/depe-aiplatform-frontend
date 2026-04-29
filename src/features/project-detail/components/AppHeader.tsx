'use client'

import type { Project } from '../types/project-detail.types'
import { ProjectSwitcher } from './ProjectSwitcher'
import { ProjectSearchInput } from './ProjectSearchInput'

type AppHeaderProps = {
  project: Project
  onProjectChange: (project: Project) => void
}

export const AppHeader = ({ project, onProjectChange }: AppHeaderProps) => {
  return (
    <header className="flex flex-1 items-center justify-between bg-card px-8 py-3.5">
      {/* Breadcrumb + Project switcher */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">산출물관리</span>
        <span className="text-[var(--gray-300)]">/</span>
        <ProjectSwitcher current={project} onSelect={onProjectChange} />
      </div>

      {/* Search — 중앙 */}
      <ProjectSearchInput current={project} onSelect={onProjectChange} />

      {/* Meta */}
      <div className="flex items-center gap-4 text-[11px] text-[var(--gray-500)]">
        <span><span className="font-semibold text-[var(--gray-700)]">계약번호</span> <span className="font-mono">{project.contractNo}</span></span>
        <span><span className="font-semibold text-[var(--gray-700)]">계약기간</span> {project.startDate} – {project.endDate}</span>
      </div>
    </header>
  )
}
