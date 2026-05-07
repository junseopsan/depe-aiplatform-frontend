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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--gray-200)] bg-card px-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-500)] text-sm font-bold text-white">
          D
        </span>
        <span className="text-[15px] font-semibold text-foreground">
          EPC PE AI-Platform
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = item.isActive(pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative py-4 text-sm font-medium transition-colors',
                isActive
                  ? 'text-[var(--primary-500)]'
                  : 'text-[var(--gray-600)] hover:text-foreground',
              )}
            >
              {item.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--primary-500)]" />
              )}
            </Link>
          )
        })}
      </nav>

      <button
        type="button"
        aria-label="알림"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--gray-600)] hover:bg-[var(--gray-100)] hover:text-foreground"
      >
        <Bell size={18} />
        {NOTIFICATION_COUNT > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--error)] px-1 text-[10px] font-semibold text-white">
            {NOTIFICATION_COUNT}
          </span>
        )}
      </button>
    </header>
  )
}
