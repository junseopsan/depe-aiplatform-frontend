/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export type UiSearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

export const UiSearch = ({ className, ...props }: UiSearchProps) => {
  return (
    <div className="relative inline-flex items-center">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-2.5 size-4 text-[var(--gray-400)]"
      />
      <input
        type="text"
        className={cn(
          'h-9 w-[240px] rounded-[4px] border border-[var(--gray-300)] bg-white pl-[34px] pr-3 text-[13px] text-[var(--gray-700)] placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] focus:outline-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}
