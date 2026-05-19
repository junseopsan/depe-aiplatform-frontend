/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const UiDialog = ({ ...props }: DialogPrimitive.Root.Props) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
)

const UiDialogTrigger = ({ ...props }: DialogPrimitive.Trigger.Props) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
)

const UiDialogClose = ({ ...props }: DialogPrimitive.Close.Props) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
)

const UiDialogPortal = ({ ...props }: DialogPrimitive.Portal.Props) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
)

const UiDialogOverlay = ({ className, ...props }: DialogPrimitive.Backdrop.Props) => (
  <DialogPrimitive.Backdrop
    data-slot="dialog-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-[rgba(13,17,23,0.45)] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0',
      className,
    )}
    {...props}
  />
)

type UiDialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  maxWidth?: string
}

const UiDialogContent = ({
  className,
  children,
  showCloseButton = true,
  maxWidth = '520px',
  ...props
}: UiDialogContentProps) => (
  <UiDialogPortal>
    <UiDialogOverlay />
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      style={{ maxWidth }}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-48px)] w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-white shadow-[0_20px_40px_rgba(13,17,23,0.2)] transition duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className="absolute right-3 top-3 inline-flex size-7 cursor-pointer items-center justify-center rounded text-[var(--gray-500)] transition-colors hover:bg-[var(--gray-100)] hover:text-[var(--gray-800)]"
          aria-label="닫기"
        >
          <XIcon className="size-[18px]" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </UiDialogPortal>
)

const UiDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="dialog-header"
    className={cn(
      'flex items-center justify-between border-b border-[var(--gray-200)] px-[22px] pt-[18px] pb-[14px]',
      className,
    )}
    {...props}
  />
)

const UiDialogTitle = ({ className, ...props }: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn(
      'min-w-0 flex-1 truncate pr-8 text-base font-semibold text-[var(--gray-800)]',
      className,
    )}
    {...props}
  />
)

const UiDialogBody = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="dialog-body"
    className={cn('flex-1 overflow-y-auto px-[22px] py-[18px]', className)}
    {...props}
  />
)

const UiDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      'flex items-center justify-end gap-2 border-t border-[var(--gray-100)] px-[22px] pt-[14px] pb-[18px]',
      className,
    )}
    {...props}
  />
)

export {
  UiDialog,
  UiDialogTrigger,
  UiDialogClose,
  UiDialogContent,
  UiDialogHeader,
  UiDialogTitle,
  UiDialogBody,
  UiDialogFooter,
}
