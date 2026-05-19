/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiFormField } from '@/components/ui/UiFormField'
import { UiInput } from '@/components/ui/UiInput'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
)

export const InputPreview = () => {
  const [value, setValue] = useState('Saudi ARAMCO Jafurah Gas Plant')

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-8">
      <Section title="BASIC">
        <UiFormField label="기본" htmlFor="iv-1">
          <UiInput
            id="iv-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </UiFormField>
        <UiFormField label="Placeholder" htmlFor="iv-2">
          <UiInput id="iv-2" placeholder="값을 입력하세요" />
        </UiFormField>
      </Section>

      <Section title="VARIANT">
        <UiFormField label="Mono (계약번호)" htmlFor="iv-3">
          <UiInput id="iv-3" mono defaultValue="JA-2025-078" />
        </UiFormField>
        <UiFormField label="Required" required htmlFor="iv-4" error="필수 입력입니다">
          <UiInput id="iv-4" />
        </UiFormField>
      </Section>

      <Section title="STATE">
        <UiFormField label="Disabled" htmlFor="iv-5">
          <UiInput id="iv-5" disabled defaultValue="수정 불가" />
        </UiFormField>
        <UiFormField label="Focus (클릭해 보세요)" htmlFor="iv-6">
          <UiInput id="iv-6" />
        </UiFormField>
      </Section>
    </div>
  )
}
