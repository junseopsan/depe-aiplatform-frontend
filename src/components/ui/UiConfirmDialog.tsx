/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import * as React from 'react'
import { UiButton } from '@/components/ui/UiButton'
import {
  UiDialog,
  UiDialogBody,
  UiDialogContent,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogTitle,
} from '@/components/ui/UiDialog'

export type UiConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
}

export const UiConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
}: UiConfirmDialogProps) => {
  const handleOpenChange = (next: boolean) => {
    if (!next) onClose()
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <UiDialog open={open} onOpenChange={handleOpenChange}>
      <UiDialogContent maxWidth="420px" showCloseButton={false}>
        <UiDialogHeader>
          <UiDialogTitle>{title}</UiDialogTitle>
        </UiDialogHeader>
        {description && (
          <UiDialogBody>
            <p className="text-[13px] leading-[1.6] whitespace-pre-wrap text-[var(--gray-700)]">
              {description}
            </p>
          </UiDialogBody>
        )}
        <UiDialogFooter>
          <UiButton type="button" variant="secondary" size="lg" onClick={onClose}>
            {cancelLabel}
          </UiButton>
          <UiButton type="button" size="lg" onClick={handleConfirm}>
            {confirmLabel}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  )
}
