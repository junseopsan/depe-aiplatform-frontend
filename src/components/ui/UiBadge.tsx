/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cn } from '@/lib/utils'

export type UiBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** 표시할 숫자. 0 이하면 렌더되지 않음 */
  count: number
  /** 절단 임계값 (기본 99 → "99+") */
  max?: number
  /** primary-500 펄스 효과 (AppHeader 알림 벨 기본) */
  pulse?: boolean
}

/**
 * 알림 카운트 배지 — 18×18 원형, primary-500 배경 + 흰색 보더 + 흰 텍스트.
 * 호출처에서 absolute 등으로 위치를 잡는다.
 *
 * @example
 * <span className="relative">
 *   <BellIcon />
 *   <UiBadge count={3} className="absolute -right-1 -top-1" pulse />
 * </span>
 */
export const UiBadge = ({ count, max = 99, pulse, className, ...props }: UiBadgeProps) => {
  if (count <= 0) return null
  const display = count > max ? `${max}+` : String(count)
  return (
    <span
      className={cn(
        "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] border-2 border-white bg-[var(--primary-500)] px-[5px] font-mono text-[10px] font-medium leading-none text-white",
        pulse &&
          "after:absolute after:inset-[-2px] after:rounded-full after:bg-[var(--primary-500)] after:opacity-30 after:[animation:notif-pulse_2s_infinite] after:content-['']",
        className,
      )}
      {...props}
    >
      {display}
    </span>
  )
}
