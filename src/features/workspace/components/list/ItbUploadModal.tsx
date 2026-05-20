/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
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
import type { Project } from '@/features/workspace/types/workspace.types'

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

  const title = project ? `ITB 업로드 — ${project.name}` : 'ITB 업로드'

  return (
    <UiDialog open={open} onOpenChange={handleOpenChange}>
      <UiDialogContent maxWidth="640px">
        <UiDialogHeader>
          <UiDialogTitle>{title}</UiDialogTitle>
        </UiDialogHeader>
        <UiDialogBody>
          <div className="mb-3.5 flex items-start gap-2 rounded border border-[var(--primary-100)] bg-[var(--primary-50)] px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--primary-700)]">
            <Info size={14} className="mt-0.5 shrink-0" />
            <span>
              ITB 문서는 <b>최상위 폴더 단위로</b> 업로드합니다. 폴더 안의 모든 파일이 자동으로 추가됩니다.
            </span>
          </div>
          <UiFileUpload
            value={files}
            onChange={setFiles}
            mode="folder"
            accept=".pdf,.docx,.xlsx"
            placeholder="폴더를 끌어다 놓으세요"
            acceptHint="PDF · DOCX · XLSX"
            pickFolderLabel="폴더 선택"
          />
        </UiDialogBody>
        <UiDialogFooter>
          <UiButton variant="secondary" onClick={onClose}>
            취소
          </UiButton>
          {files.length > 0 && <UiButton>업로드</UiButton>}
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  )
}
