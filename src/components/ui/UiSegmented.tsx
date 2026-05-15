/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type UiSegmentedOption<V extends string> = {
  value: V
  label: string
}

export type UiSegmentedProps<V extends string> = {
  name: string
  options: UiSegmentedOption<V>[]
  value: V
  onChange: (value: V) => void
  className?: string
}

export const UiSegmented = <V extends string>({
  name,
  options,
  value,
  onChange,
  className,
}: UiSegmentedProps<V>) => {
  return (
    <div
      role="radiogroup"
      className={cn(
        'inline-flex self-start overflow-hidden rounded-[4px] border border-[var(--gray-300)] bg-white',
        className,
      )}
    >
      {options.map((opt, i) => {
        const id = `${name}-${opt.value}`
        const isChecked = opt.value === value
        const isLast = i === options.length - 1
        return (
          <React.Fragment key={opt.value}>
            <input
              type="radio"
              name={name}
              id={id}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange(opt.value)}
              className="hidden"
            />
            <label
              htmlFor={id}
              className={cn(
                'inline-flex h-[38px] cursor-pointer items-center px-4 text-[13px] font-medium transition-colors',
                !isLast && 'border-r border-[var(--gray-300)]',
                isChecked
                  ? 'bg-[var(--primary-50)] font-semibold text-[var(--primary-700)]'
                  : 'text-[var(--gray-500)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-700)]',
              )}
            >
              {opt.label}
            </label>
          </React.Fragment>
        )
      })}
    </div>
  )
}
