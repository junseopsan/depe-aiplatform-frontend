/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex h-[22px] items-center rounded-full px-2 text-[11px] font-semibold tracking-[0.02em] whitespace-nowrap',
  {
    variants: {
      tone: {
        primary: 'bg-[var(--primary-50)] text-[var(--primary-700)]',
        gray: 'bg-[var(--gray-100)] text-[var(--gray-600)]',
        success: 'bg-[var(--success-bg)] text-[var(--success)]',
        warning: 'bg-[var(--warning-bg)] text-[var(--warning)]',
        error: 'bg-[var(--error-bg)] text-[var(--error)]',
        info: 'bg-[var(--info-bg)] text-[var(--info)]',
      },
    },
    defaultVariants: {
      tone: 'gray',
    },
  },
)

export type UiBadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

export type UiBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export const UiBadge = ({ tone, className, ...props }: UiBadgeProps) => {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
