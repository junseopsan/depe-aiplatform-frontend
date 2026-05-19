/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '@/lib/utils'

type UiInputProps = React.ComponentProps<'input'> & {
  /** IBM Plex Mono 폰트 적용 (계약번호·예산코드 등) */
  mono?: boolean
}

export const UiInput = ({ className, type, mono, ...props }: UiInputProps) => (
  <InputPrimitive
    type={type}
    data-slot="input"
    className={cn(
      'h-10 w-full min-w-0 rounded-[4px] border border-[var(--gray-300)] bg-white px-3 text-[13px] text-[var(--gray-800)] transition-colors outline-none placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
      mono && 'font-mono',
      className,
    )}
    {...props}
  />
)
