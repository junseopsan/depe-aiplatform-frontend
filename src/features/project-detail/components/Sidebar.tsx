'use client'

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileStack,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  FolderOpen,
  HelpCircle,
} from 'lucide-react'

type NavItem = {
  icon: React.ReactNode
  label: string
  active?: boolean
  disabled?: boolean
}

const NAV_MAIN: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: '대시보드', disabled: true },
  { icon: <FileStack size={18} />, label: '산출물관리', active: true },
  { icon: <FolderOpen size={18} />, label: '문서함', disabled: true },
  { icon: <MessageSquare size={18} />, label: 'AI Chat', disabled: true },
  { icon: <BarChart3 size={18} />, label: '리포트', disabled: true },
  { icon: <Users size={18} />, label: '팀 관리', disabled: true },
]

const NAV_BOTTOM: NavItem[] = [
  { icon: <Settings size={18} />, label: '설정', disabled: true },
  { icon: <HelpCircle size={18} />, label: '도움말', disabled: true },
]

function NavButton({ icon, label, active, disabled }: NavItem) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
        active
          ? 'bg-[var(--primary-50)] text-[var(--primary-700)]'
          : 'text-[var(--gray-500)] hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]',
        disabled && !active && 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-[var(--gray-500)]',
      )}
    >
      <span
        className={cn(
          'transition-colors',
          active ? 'text-[var(--primary-500)]' : 'text-[var(--gray-400)] group-hover:text-[var(--gray-600)]',
          disabled && !active && 'group-hover:text-[var(--gray-400)]',
        )}
      >
        {icon}
      </span>
      {label}
      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--primary-500)]" />
      )}
    </button>
  )
}

export function Sidebar() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-[52px] items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-500)] text-[10px] font-bold tracking-wide text-white">
          AI
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-foreground">
            EPC PE
          </p>
          <p className="text-[10px] text-muted-foreground">
            AI-Platform
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_MAIN.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <nav className="flex flex-col gap-1 border-t border-border px-3 py-3">
        {NAV_BOTTOM.map((item) => (
          <NavButton key={item.label} {...item} />
        ))}

        {/* User */}
        <div className="mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gray-200)] text-[11px] font-medium text-[var(--gray-600)]">
            JS
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-medium text-foreground">
              준섭
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              PE Engineer
            </p>
          </div>
        </div>
      </nav>
    </aside>
  )
}
