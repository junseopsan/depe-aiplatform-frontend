/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiFormField } from '@/components/ui/UiFormField'
import { UiSelect } from '@/components/ui/UiSelect'

const OPTIONS = [
  { value: 'middle-east', label: '중동' },
  { value: 'asia', label: '아시아' },
  { value: 'europe', label: '유럽' },
  { value: 'americas', label: '아메리카' },
  { value: 'africa', label: '아프리카' },
]

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
)

export const SelectPreview = () => {
  const [region, setRegion] = useState<string>('middle-east')

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-8">
      <Section title="BASIC">
        <UiFormField label="지역 (선택됨)" htmlFor="sel-1">
          <UiSelect
            id="sel-1"
            value={region}
            onChange={setRegion}
            options={OPTIONS}
          />
        </UiFormField>
        <UiFormField label="지역 (미선택)" htmlFor="sel-2">
          <UiSelect id="sel-2" options={OPTIONS} placeholder="지역을 선택하세요" />
        </UiFormField>
      </Section>

      <Section title="STATE">
        <UiFormField label="Disabled" htmlFor="sel-3">
          <UiSelect
            id="sel-3"
            options={OPTIONS}
            value="asia"
            disabled
          />
        </UiFormField>
      </Section>
    </div>
  )
}
