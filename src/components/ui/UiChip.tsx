/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cn } from '@/lib/utils'

export type UiChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  /** 우측에 count 노출 (필터 결과 수 등) */
  count?: number
}

/**
 * 필터링 등 클릭 가능한 chip. h-28, rounded-full, hover/active 상태 지원.
 * 기본은 회색, active 시 primary 톤.
 */
export const UiChip = ({
  active = false,
  count,
  className,
  children,
  type = 'button',
  ...props
}: UiChipProps) => (
  <button
    type={type}
    aria-pressed={active}
    className={cn(
      'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
      active
        ? 'border-[var(--primary-200)] bg-[var(--primary-50)] text-[var(--primary-700)] hover:border-[var(--primary-500)]'
        : 'border-[var(--gray-300)] bg-white text-[var(--gray-700)] hover:bg-[var(--gray-50)] hover:border-[var(--gray-400)]',
      className,
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span className={cn('font-semibold', active ? 'text-[var(--primary-700)]' : 'text-[var(--gray-500)]')}>
        {count}
      </span>
    )}
  </button>
)
