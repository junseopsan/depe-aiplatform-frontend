/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type UiSegmentedOption<V extends string> = {
  value: V
  label: string
}

export type UiSegmentedSize = 'sm' | 'md'

export type UiSegmentedProps<V extends string> = {
  name: string
  options: UiSegmentedOption<V>[]
  value: V
  onChange: (value: V) => void
  /** 'md' (기본, h-[38px]/px-4/13px, 분리선 있음) · 'sm' (h-7/px-2.5/11px, 분리선 없음) */
  size?: UiSegmentedSize
  className?: string
}

const SIZE_CLASS: Record<UiSegmentedSize, string> = {
  md: 'h-[38px] px-4 text-[13px]',
  sm: 'h-7 px-2.5 text-[11px]',
}

export const UiSegmented = <V extends string>({
  name,
  options,
  value,
  onChange,
  size = 'md',
  className,
}: UiSegmentedProps<V>) => {
  const showDivider = size === 'md'

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
                'inline-flex cursor-pointer items-center font-medium transition-colors',
                SIZE_CLASS[size],
                showDivider && !isLast && 'border-r border-[var(--gray-300)]',
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
