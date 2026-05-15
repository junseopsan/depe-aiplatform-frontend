/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary — brand blue (doc btn-primary)
        default:
          "bg-[var(--primary-500)] text-white border-[var(--primary-500)] hover:bg-[var(--primary-600)] hover:border-[var(--primary-600)]",
        // Secondary — 흰 배경 + gray border (doc btn-secondary)
        secondary:
          "bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]",
        // Outline — 투명 + brand blue border (color-system 기준)
        outline:
          "bg-transparent text-[var(--primary-500)] border-[1.5px] border-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]",
        // Ghost — primary-50 bg (color-system 기준)
        ghost:
          "bg-[var(--primary-50)] text-[var(--primary-700)] hover:bg-[var(--primary-100)]",
        // Dark — primary-900 bg (color-system 기준)
        dark:
          "bg-[var(--primary-900)] text-white border-[var(--primary-900)] hover:bg-[var(--primary-800)] hover:border-[var(--primary-800)]",
        // Destructive
        destructive:
          "bg-[var(--error-bg)] text-[var(--error)] border-[var(--error)] hover:bg-[var(--error)] hover:text-white",
        // Link
        link:
          "text-[var(--primary-500)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-3",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-7 gap-1 px-2.5 text-xs",
        // lg — doc btn 기준 (height 36, padding 14, 13px)
        lg: "h-9 gap-1.5 px-[14px] text-[13px]",
        icon: "size-8",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function UiButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { UiButton, buttonVariants }
