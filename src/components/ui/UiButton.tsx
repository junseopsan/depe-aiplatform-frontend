import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary CTA — neutral gray (PRD 규칙)
        default:
          "bg-[var(--gray-600)] text-white border-[var(--gray-600)] hover:bg-[var(--gray-700)] hover:border-[var(--gray-700)]",
        // Secondary CTA — white + gray border (PRD 규칙)
        outline:
          "bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:bg-[var(--gray-50)] hover:border-[var(--gray-500)] hover:text-[var(--gray-900)]",
        // Ghost — 배경 없음
        ghost:
          "hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]",
        // Destructive
        destructive:
          "bg-[var(--error-bg)] text-[var(--error)] border-[var(--error)] hover:bg-[var(--error)] hover:text-white",
        // Link
        link:
          "text-[var(--primary-500)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-3",
        xs: "h-6 gap-1 px-2 text-xs rounded",
        sm: "h-7 gap-1 px-2.5 text-xs rounded",
        lg: "h-9 gap-1.5 px-4",
        icon: "size-8",
        "icon-sm": "size-7 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
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

export { Button, buttonVariants }
