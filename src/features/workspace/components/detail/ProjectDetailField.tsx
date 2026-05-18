/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { cn } from '@/lib/utils'

type ProjectDetailFieldProps = {
  label: string
  children: React.ReactNode
  mono?: boolean
}

const EMPTY = '—'

export const ProjectDetailField = ({ label, children, mono }: ProjectDetailFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[13px] font-medium text-[var(--gray-500)]">{label}</span>
    <span
      className={cn(
        'min-h-[22px] text-[13px] text-[var(--gray-800)]',
        mono && 'font-mono',
      )}
    >
      {children}
    </span>
  </div>
)

export const valueOrDash = (value?: string) => (value && value.trim() ? value : EMPTY)
