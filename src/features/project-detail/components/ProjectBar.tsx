import type { Project } from '../types/project-detail.types'

type ProjectBarProps = {
  project: Project
}

export function ProjectBar({ project }: ProjectBarProps) {
  return (
    <div className="border-b border-border bg-card px-8 py-4">
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        {project.name}
      </h1>
      <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        <span className="font-mono text-[11px] tracking-wide">
          {project.contractNo}
        </span>
        <span className="text-[var(--gray-300)]">·</span>
        <span>
          {project.startDate} – {project.endDate}
        </span>
      </p>
    </div>
  )
}
