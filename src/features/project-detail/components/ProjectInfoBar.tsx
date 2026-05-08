import type { Project } from '../types/project-detail.types'

type ProjectInfoBarProps = {
  project: Project
}

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
  return (
    <section className="flex h-[85px] shrink-0 items-start border-b border-[var(--gray-200)] bg-card px-8 py-4">
      <div className="min-w-0 flex-1">
        <h1 className="mb-1.5 truncate text-[22px] font-semibold tracking-[-0.01em] text-[var(--gray-900)]">
          {project.name}
        </h1>
        <p className="text-[13px] leading-[1.2] tracking-[0.02em] text-[var(--gray-500)] [word-spacing:0.2em]">
          계약번호 {project.contractNo} · 계약기간 {project.startDate} — {project.endDate} · 발주처 {project.client}
        </p>
      </div>
    </section>
  )
}
