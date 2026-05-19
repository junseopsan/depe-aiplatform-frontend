/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiFormField } from '@/components/ui/UiFormField'
import { UiSegmented } from '@/components/ui/UiSegmented'
import type { ProjectStatus, ProjectType } from '@/features/workspace/types/workspace.types'
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from '@/features/workspace/utils/project-options'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-semibold tracking-wider text-[var(--gray-400)]">{title}</h3>
    <div className="flex flex-wrap items-start gap-6">{children}</div>
  </div>
)

export const SegmentedPreview = () => {
  const [type, setType] = useState<ProjectType>('EXECUTION')
  const [status, setStatus] = useState<ProjectStatus>('IN_PROGRESS')

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-8">
      <Section title="MD (기본, 38px)">
        <UiFormField label="프로젝트 구분">
          <UiSegmented
            name="seg-type"
            options={PROJECT_TYPE_OPTIONS}
            value={type}
            onChange={setType}
          />
        </UiFormField>
        <UiFormField label="프로젝트 상태">
          <UiSegmented
            name="seg-status"
            options={PROJECT_STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
          />
        </UiFormField>
      </Section>

      <Section title="SM (28px)">
        <UiFormField label="프로젝트 구분">
          <UiSegmented
            name="seg-type-sm"
            size="sm"
            options={PROJECT_TYPE_OPTIONS}
            value={type}
            onChange={setType}
          />
        </UiFormField>
      </Section>
    </div>
  )
}
