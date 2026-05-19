/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiChip } from '@/components/ui/UiChip'

const FILTERS = ['전체', '진행중', '완료', '취소'] as const

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
)

export const ChipPreview = () => {
  const [active, setActive] = useState<(typeof FILTERS)[number]>('전체')

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-8">
      <Section title="STATE">
        <UiChip>기본</UiChip>
        <UiChip active>Active</UiChip>
        <UiChip disabled>Disabled</UiChip>
      </Section>

      <Section title="COUNT 슬롯">
        <UiChip count={5}>독소조항</UiChip>
        <UiChip count={12} active>
          진행중
        </UiChip>
      </Section>

      <Section title="필터 토글 (클릭해 보세요)">
        {FILTERS.map((f) => (
          <UiChip key={f} active={f === active} onClick={() => setActive(f)}>
            {f}
          </UiChip>
        ))}
      </Section>
    </div>
  )
}
