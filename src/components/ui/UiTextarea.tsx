/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { cn } from '@/lib/utils'

function UiTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-20 w-full resize-y rounded-[4px] border border-[var(--gray-300)] bg-white px-3 py-2.5 text-[13px] text-[var(--gray-700)] transition-colors outline-none placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { UiTextarea }
