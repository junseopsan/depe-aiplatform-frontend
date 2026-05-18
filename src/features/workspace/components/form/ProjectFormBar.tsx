/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import Link from 'next/link'

type ProjectFormBarProps = {
  title: string
  breadcrumb: string
  onDelete?: React.ReactNode
  onCancel: React.ReactNode
  onSubmit: React.ReactNode
}

export const ProjectFormBar = ({ title, breadcrumb, onDelete, onCancel, onSubmit }: ProjectFormBarProps) => {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[var(--gray-200)] bg-white px-8 py-[18px]">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-[var(--gray-500)]">
          <Link
            href="/projects"
            className="text-[var(--primary-700)] transition-colors hover:text-[var(--primary-500)] hover:underline"
          >
            Projects
          </Link>
          <span className="text-[var(--gray-300)]">/</span>
          <span className="truncate">{breadcrumb}</span>
        </div>
        <h1 className="text-xl font-semibold leading-[1.25] text-[var(--gray-800)]">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {onDelete && (
          <>
            {onDelete}
            <span aria-hidden className="mx-1 h-5 w-px bg-[var(--gray-300)]" />
          </>
        )}
        {onCancel}
        {onSubmit}
      </div>
    </div>
  )
}
