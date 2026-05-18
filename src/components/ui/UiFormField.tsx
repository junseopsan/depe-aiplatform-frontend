/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cn } from '@/lib/utils'

export type UiFormFieldProps = {
  label: string
  required?: boolean
  htmlFor?: string
  className?: string
  error?: string
  children: React.ReactNode
}

export const UiFormField = ({
  label,
  required,
  htmlFor,
  className,
  error,
  children,
}: UiFormFieldProps) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    <label
      htmlFor={htmlFor}
      className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--gray-700)]"
    >
      {label}
      {required && <span className="font-semibold text-[var(--error)]">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-[12px] leading-[1.5] text-[var(--error)]">{error}</p>
    )}
  </div>
)
