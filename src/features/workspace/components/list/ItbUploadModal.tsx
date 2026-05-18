/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { UiButton } from '@/components/ui/UiButton'
import {
  UiDialog,
  UiDialogBody,
  UiDialogContent,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogTitle,
} from '@/components/ui/UiDialog'
import { UiFileUpload } from '@/components/ui/UiFileUpload/UiFileUpload'
import type { UploadedFile } from '@/components/ui/UiFileUpload/types'
import type { Project } from '@/features/workspace/components/../types/workspace.types'

type ItbUploadModalProps = {
  open: boolean
  project: Project | null
  onClose: () => void
}

export const ItbUploadModal = ({ open, project, onClose }: ItbUploadModalProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setFiles([])
      onClose()
    }
  }

  return (
    <UiDialog open={open} onOpenChange={handleOpenChange}>
      <UiDialogContent maxWidth="640px">
        <UiDialogHeader>
          <UiDialogTitle>ITB 업로드</UiDialogTitle>
        </UiDialogHeader>
        <UiDialogBody>
          {project && (
            <div className="mb-3 text-[13px] text-[var(--gray-500)]">
              <span className="font-medium text-[var(--gray-700)]">{project.name}</span>
            </div>
          )}
          <UiFileUpload
            value={files}
            onChange={setFiles}
            mode="folder"
            accept=".pdf,.docx,.xlsx"
            placeholder="폴더를 끌어다 놓으세요"
          />
        </UiDialogBody>
        <UiDialogFooter>
          <UiButton variant="secondary" size="lg" onClick={onClose}>
            취소
          </UiButton>
          <UiButton size="lg" disabled={files.length === 0}>
            업로드
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  )
}
