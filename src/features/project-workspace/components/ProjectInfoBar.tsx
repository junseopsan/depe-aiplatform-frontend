import type { Project } from '../types/project-workspace.types'

type ProjectInfoBarProps = {
  project: Project
}

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
  const items: { label: string; value: string; mono?: boolean }[] = [
    { label: '계약번호', value: project.contractNo, mono: true },
    { label: '계약기간', value: `${project.startDate} — ${project.endDate}`, mono: true },
    { label: '발주처', value: project.client },
  ]

  return (
    <section className="flex h-[72px] shrink-0 items-center gap-6 border-b border-[var(--gray-200)] bg-card px-8">
      <div className="flex min-w-0 flex-col gap-[3px]">
        <h1 className="truncate text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--gray-800)]">
          {project.name}
        </h1>
        <div className="flex items-center gap-3 text-[13px] tracking-[0.01em] text-[var(--gray-600)] [word-spacing:0.2em]">
          {items.map((item, i) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="mx-1 text-[var(--gray-400)]">·</span>}
              <span className="font-medium text-[var(--gray-400)]">{item.label}</span>
              <span className={item.mono ? 'font-mono text-[var(--gray-700)]' : undefined}>
                {item.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
