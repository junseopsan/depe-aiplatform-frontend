import type { ReactNode } from 'react'

type LegendBarProps = {
  left?: ReactNode
  right?: ReactNode
}

export const LegendBar = ({ left, right }: LegendBarProps) => {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-[var(--gray-200)] bg-[var(--gray-50)] px-8">
      <div className="flex flex-wrap items-center gap-4">{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  )
}
