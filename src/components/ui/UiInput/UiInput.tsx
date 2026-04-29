import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-[var(--gray-300)] bg-[var(--gray-50)] px-3 text-sm text-[var(--gray-900)] transition-colors outline-none placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] focus:bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
