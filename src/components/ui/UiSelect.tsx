/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type UiSelectOption<T extends string = string> = {
  value: T
  label: string
}

export type UiSelectProps<T extends string = string> = {
  value?: T
  onChange?: (value: T) => void
  options: UiSelectOption<T>[]
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export const UiSelect = <T extends string = string>({
  value,
  onChange,
  options,
  placeholder = '선택',
  disabled,
  id,
  name,
  className,
}: UiSelectProps<T>) => {
  const selected = options.find((o) => o.value === value)

  return (
    <SelectPrimitive.Root
      value={value ?? null}
      onValueChange={(next) => {
        if (next != null) onChange?.(next)
      }}
      disabled={disabled}
      name={name}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-slot="select-trigger"
        className={cn(
          'flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-[4px] border border-[var(--gray-300)] bg-white px-3 text-[13px] text-[var(--gray-800)] transition-colors outline-none focus:border-[var(--primary-500)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
          className,
        )}
      >
        <span className={cn('truncate', !selected && 'text-[var(--gray-400)]')}>
          {selected?.label ?? placeholder}
        </span>
        <SelectPrimitive.Icon className="shrink-0 text-[var(--gray-500)]">
          <ChevronDown className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={4} className="z-50 outline-none">
          <SelectPrimitive.Popup
            data-slot="select-popup"
            className="max-h-64 min-w-[var(--anchor-width)] overflow-y-auto rounded-[4px] border border-[var(--gray-200)] bg-white py-1 text-[13px] text-[var(--gray-800)] shadow-[0_8px_16px_rgba(13,17,23,0.12)] transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0"
          >
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 outline-none data-highlighted:bg-[var(--gray-100)] data-selected:font-medium data-selected:text-[var(--primary-700)]"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="text-[var(--primary-500)]">
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
