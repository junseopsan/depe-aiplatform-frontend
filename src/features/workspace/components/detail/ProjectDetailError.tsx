/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { UiButton } from '@/components/ui/UiButton'

type ProjectDetailErrorProps = {
  message?: string
  onRetry: () => void
}

export const ProjectDetailError = ({ message, onRetry }: ProjectDetailErrorProps) => (
  <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center gap-3 px-8 pt-8 pb-16 text-center">
    <AlertCircle className="size-10 text-[var(--error)]" />
    <h2 className="text-base font-semibold text-[var(--gray-800)]">
      프로젝트 정보를 불러올 수 없습니다
    </h2>
    {message && (
      <p className="max-w-md text-[13px] text-[var(--gray-500)]">{message}</p>
    )}
    <UiButton type="button" variant="secondary" onClick={onRetry} className="mt-2">
      <RefreshCw className="size-4" />
      다시 시도
    </UiButton>
  </main>
)
