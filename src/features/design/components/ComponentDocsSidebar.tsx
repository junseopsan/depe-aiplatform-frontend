/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { COMPONENT_REGISTRY } from '@/features/design/data/registry'

export const ComponentDocsSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-[var(--gray-200)] bg-card">
      {/* Logo */}
      <div className="border-b border-[var(--gray-200)] px-5 py-4">
        <Link href="/components" className="text-sm font-semibold text-foreground">
          EPC PE AI-Platform
        </Link>
        <p className="mt-0.5 text-[11px] text-[var(--gray-400)]">Component Library</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-[var(--gray-400)]">
          Components
        </p>
        <ul className="flex flex-col gap-0.5">
          {COMPONENT_REGISTRY.map((comp) => {
            const href = `/components/${comp.slug}`
            const active = pathname === href

            return (
              <li key={comp.slug}>
                <Link
                  href={href}
                  className={cn(
                    'block px-2 py-1.5 text-[13px]',
                    active
                      ? 'font-semibold text-foreground'
                      : 'text-[var(--gray-500)] hover:text-foreground',
                  )}
                >
                  {comp.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
