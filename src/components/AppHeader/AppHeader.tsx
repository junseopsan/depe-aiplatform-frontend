'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '/projects', isActive: (p) => p.startsWith('/projects') },
  { label: 'AI Q&A', href: '/ai-qna', isActive: (p) => p.startsWith('/ai-qna') },
]

const NOTIFICATION_COUNT = 3

export const AppHeader = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-[99] grid h-[52px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-[var(--gray-200)] bg-card px-6">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-500)] text-sm font-bold text-white">
          D
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--gray-800)]">
          EPC PE AI-Platform
        </span>
      </Link>

      <nav className="flex items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = item.isActive(pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex h-[52px] items-center border-b-2 px-[18px] text-sm transition-colors',
                isActive
                  ? 'border-[var(--primary-500)] font-semibold text-[var(--primary-500)]'
                  : 'border-transparent font-medium text-[var(--gray-500)] hover:text-[var(--gray-700)]',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="알림"
          className="relative flex h-8 w-8 items-center justify-center rounded border border-transparent bg-card text-[var(--gray-700)] transition-colors hover:border-[var(--gray-200)] hover:bg-[var(--gray-50)]"
        >
          <Bell size={16} />
          {NOTIFICATION_COUNT > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] border-2 border-white bg-[var(--primary-500)] px-[5px] font-mono text-[10px] font-medium leading-none text-white">
              {NOTIFICATION_COUNT}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
