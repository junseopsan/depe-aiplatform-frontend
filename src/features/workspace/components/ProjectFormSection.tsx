/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'

type ProjectFormSectionProps = {
  index: number
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}

export const ProjectFormSection = ({
  index,
  title,
  description,
  children,
}: ProjectFormSectionProps) => (
  <section className="mb-4 rounded-[4px] border border-[var(--gray-200)] bg-white px-7 py-6">
    <div className="mb-[18px] flex items-center gap-2.5 border-b border-[var(--gray-100)] pb-3.5">
      <span className="inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary-50)] font-mono text-xs font-semibold text-[var(--primary-700)]">
        {index}
      </span>
      <span className="text-[15px] font-semibold text-[var(--gray-800)]">{title}</span>
      {description && (
        <span className="ml-auto text-xs text-[var(--gray-500)]">{description}</span>
      )}
    </div>
    {children}
  </section>
)
