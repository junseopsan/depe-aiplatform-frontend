import type { Project } from '../types/project-detail.types'

type ProjectInfoBarProps = {
  project: Project
}

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <span className="inline-flex items-center gap-1">
    <span className="text-[var(--gray-500)]">{label}</span>
    <span>{value}</span>
  </span>
)

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
  return (
    <section className="flex shrink-0 items-center gap-6 border-b border-[var(--gray-200)] bg-card px-8 py-3.5">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-base font-semibold text-[var(--gray-800)]">
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--gray-600)]">
          <MetaItem label="계약번호" value={project.contractNo} />
          <span className="text-[var(--gray-400)]">·</span>
          <MetaItem label="계약기간" value={`${project.startDate} — ${project.endDate}`} />
          <span className="text-[var(--gray-400)]">·</span>
          <MetaItem label="발주처" value={project.client} />
        </div>
      </div>
    </section>
  )
}
