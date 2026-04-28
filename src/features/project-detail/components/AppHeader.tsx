'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/UiInput'

export function AppHeader() {
  return (
    <header className="sticky top-[5px] z-40 flex h-[52px] items-center justify-between border-b border-border bg-card px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-muted-foreground">산출물관리</span>
        <span className="text-[var(--gray-300)]">/</span>
        <span className="font-medium text-foreground">프로젝트 상세</span>
      </div>

      {/* Search */}
      <div className="relative w-[340px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"
          size={14}
        />
        <Input
          type="text"
          placeholder="프로젝트 검색..."
          className="pl-9"
        />
      </div>

      {/* Right — POC tag */}
      <div className="flex items-center gap-3">
        <span className="rounded border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground">
          POC v0.2
        </span>
      </div>
    </header>
  )
}
