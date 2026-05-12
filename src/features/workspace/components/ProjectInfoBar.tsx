import type { Project } from '../types/workspace.types'

type ProjectInfoBarProps = {
  project: Project
}

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
  return (
    <section className="flex h-[72px] shrink-0 items-center gap-6 border-b border-[var(--gray-200)] bg-card px-8">
      <div className="flex min-w-0 flex-col gap-[3px]">
        <h1 className="truncate text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--gray-800)]">
          {project.name}
        </h1>
        <div className="flex items-center gap-3 text-[13px] tracking-[0.01em] text-[var(--gray-600)] [word-spacing:0.2em]">
          <span className="inline-flex items-center gap-1.5">
            <span className="font-medium text-[var(--gray-400)]">계약번호</span>
            <span className="font-mono text-[var(--gray-700)]">{project.contractNo}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 before:mx-1 before:text-[var(--gray-400)] before:content-['·']">
            <span className="font-medium text-[var(--gray-400)]">계약기간</span>
            <span className="font-mono text-[var(--gray-700)]">{project.startDate} — {project.endDate}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 before:mx-1 before:text-[var(--gray-400)] before:content-['·']">
            <span className="font-medium text-[var(--gray-400)]">발주처</span>
            <span>{project.client}</span>
          </span>
        </div>
      </div>
    </section>
  )
}
