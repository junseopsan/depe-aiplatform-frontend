/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pillVariants = cva(
  'inline-flex h-7 items-center rounded-full px-3 text-[12px] font-semibold tracking-[0.02em] whitespace-nowrap',
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

export type UiPillTone = NonNullable<VariantProps<typeof pillVariants>['tone']>

/**
 * 워크플로우/AI 처리 status 색상 키. 도메인 정본 `DocumentStatus`와 분리된
 * UI 전용 enum (요구사항: issued=녹색 / review=노랑 / generating=파랑 /
 * failed=빨강 / waiting=회색).
 */
export type UiPillStatus = 'issued' | 'review' | 'generating' | 'failed' | 'waiting'

const STATUS_TO_TONE: Record<UiPillStatus, UiPillTone> = {
  issued: 'success',
  review: 'warning',
  generating: 'primary',
  failed: 'error',
  waiting: 'gray',
}

export type UiPillProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: UiPillTone
  status?: UiPillStatus
}

export const UiPill = ({ tone, status, className, ...props }: UiPillProps) => {
  const resolvedTone = status ? STATUS_TO_TONE[status] : tone
  return <span className={cn(pillVariants({ tone: resolvedTone }), className)} {...props} />
}
