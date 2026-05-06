'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/UiInput'
import type { Project } from '../types/project-detail.types'
import { MOCK_PROJECTS } from '../data/mock-project'

type ProjectSearchInputProps = {
  current: Project
}

export const ProjectSearchInput = ({ current }: ProjectSearchInputProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

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

  const filtered = MOCK_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.contractNo.toLowerCase().includes(query.toLowerCase()),
  )

  const handleSelect = (project: Project) => {
    router.push(`/projects/${project.id}`)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative w-[380px]">
      {/* Input */}
      <Search
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[var(--gray-400)]"
        size={14}
      />
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="프로젝트 검색..."
        className="pl-9"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-full border border-[var(--gray-200)] bg-card shadow-[0_8px_24px_rgba(0,30,60,0.12)]">
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
