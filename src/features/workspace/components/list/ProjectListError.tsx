/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { UiButton } from '@/components/ui/UiButton'

type ProjectListErrorProps = {
  message?: string
  onRetry: () => void
}

export const ProjectListError = ({ message, onRetry }: ProjectListErrorProps) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-[4px] border border-[var(--gray-200)] bg-white py-16 text-center">
    <AlertCircle className="size-10 text-[var(--error)]" />
    <h2 className="text-base font-semibold text-[var(--gray-800)]">
      프로젝트 목록을 불러올 수 없습니다
    </h2>
    {message && (
      <p className="max-w-md text-[13px] text-[var(--gray-500)]">{message}</p>
    )}
    <UiButton type="button" variant="secondary" onClick={onRetry} className="mt-2">
      <RefreshCw className="size-4" />
      다시 시도
    </UiButton>
  </div>
)
