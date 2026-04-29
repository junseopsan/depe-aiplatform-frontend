'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '../types/project-detail.types'
import { MOCK_PROJECTS } from '../data/mock-project'

type ProjectSwitcherProps = {
  current: Project
  onSelect: (project: Project) => void
}

export const ProjectSwitcher = ({ current, onSelect }: ProjectSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // 열릴 때 검색 input에 포커스
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const filtered = MOCK_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.contractNo.toLowerCase().includes(query.toLowerCase()),
  )

  const handleSelect = (project: Project) => {
    onSelect(project)
    setOpen(false)
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-[var(--primary-500)]"
        onClick={() => setOpen(!open)}
      >
        {current.name}
        <ChevronDown size={14} className="text-[var(--gray-400)]" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-[380px] border border-[var(--gray-200)] bg-card shadow-[0_8px_24px_rgba(0,30,60,0.12)]"
          onKeyDown={handleKeyDown}
        >
          {/* Search */}
          <div className="flex items-center gap-2 border-b border-[var(--gray-200)] px-3 py-2">
            <Search size={14} className="shrink-0 text-[var(--gray-400)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="프로젝트 검색..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-[var(--gray-400)]"
            />
            <kbd className="border border-[var(--gray-200)] bg-[var(--gray-50)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--gray-400)]">
              Esc
            </kbd>
          </div>

          {/* List */}
          <div className="max-h-[280px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-[var(--gray-400)]">
                검색 결과가 없습니다
              </div>
            ) : (
              filtered.map((project) => {
                const isActive = project.id === current.id
                return (
                  <button
                    key={project.id}
                    className={cn(
                      'flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-[var(--gray-50)]',
                      isActive && 'bg-[var(--primary-50)]',
                    )}
                    onClick={() => handleSelect(project)}
                  >
                    <div>
                      <p className={cn(
                        'text-[13px]',
                        isActive ? 'font-semibold text-foreground' : 'text-[var(--gray-700)]',
                      )}>
                        {project.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-[var(--gray-400)]">
                        {project.contractNo} · {project.startDate} – {project.endDate}
                      </p>
                    </div>
                    {isActive && <Check size={14} className="shrink-0 text-[var(--primary-500)]" />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
