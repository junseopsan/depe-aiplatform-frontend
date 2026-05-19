/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiFormField } from '@/components/ui/UiFormField'
import { UiTextarea } from '@/components/ui/UiTextarea'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="grid grid-cols-1 gap-4">{children}</div>
  </div>
)

export const TextareaPreview = () => {
  const [value, setValue] = useState(
    '걸프 지역 가스 플랜트 EPC 프로젝트. ITB 분석 후 계약 협상 단계.',
  )

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-8">
      <Section title="BASIC">
        <UiFormField label="프로젝트 설명" htmlFor="ta-1">
          <UiTextarea
            id="ta-1"
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </UiFormField>
        <UiFormField label="Placeholder" htmlFor="ta-2">
          <UiTextarea id="ta-2" rows={4} placeholder="여러 줄 입력이 가능합니다" />
        </UiFormField>
      </Section>

      <Section title="STATE">
        <UiFormField label="Disabled" htmlFor="ta-3">
          <UiTextarea id="ta-3" rows={3} disabled defaultValue="수정 불가 상태" />
        </UiFormField>
      </Section>
    </div>
  )
}
