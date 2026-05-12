"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"

const DropdownMenu = (props: MenuPrimitive.Root.Props) => (
  <MenuPrimitive.Root {...props} />
)

const DropdownMenuTrigger = (props: MenuPrimitive.Trigger.Props) => (
  <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
)

const DropdownMenuPortal = (props: MenuPrimitive.Portal.Props) => (
  <MenuPrimitive.Portal {...props} />
)

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  align = "start",
  children,
  ...props
}: MenuPrimitive.Popup.Props & {
  sideOffset?: number
  align?: "start" | "center" | "end"
}) => (
  <DropdownMenuPortal>
    <MenuPrimitive.Positioner sideOffset={sideOffset} align={align}>
      <MenuPrimitive.Popup
        data-slot="dropdown-menu-content"
        className={cn(
          "z-50 min-w-[180px] origin-[var(--transform-origin)] rounded-md border border-[var(--gray-200)] bg-white p-1 text-sm text-[var(--gray-800)] shadow-lg outline-none",
          "transition-[transform,opacity] duration-150 ease-out",
          "data-starting-style:opacity-0 data-starting-style:scale-95",
          "data-ending-style:opacity-0 data-ending-style:scale-95",
          className,
        )}
        {...props}
      >
        {children}
      </MenuPrimitive.Popup>
    </MenuPrimitive.Positioner>
  </DropdownMenuPortal>
)

const DropdownMenuItem = ({
  className,
  ...props
}: MenuPrimitive.Item.Props) => (
  <MenuPrimitive.Item
    data-slot="dropdown-menu-item"
    className={cn(
      "flex w-full cursor-pointer select-none items-center gap-2 rounded px-2.5 py-1.5 text-[13px] text-[var(--gray-700)] outline-none transition-colors",
      "data-highlighted:bg-[var(--primary-50)] data-highlighted:text-[var(--primary-700)]",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
)

const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="dropdown-menu-separator"
    className={cn("my-1 h-px bg-[var(--gray-100)]", className)}
    {...props}
  />
)

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
