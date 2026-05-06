'use client'

import { useState } from 'react'
import type { Project } from '../types/project-detail.types'
import { TopBand } from './TopBand'
import { Sidebar, SidebarLogo } from './Sidebar'
import { AppHeader } from './AppHeader'

type ProjectShellProps = {
  project: Project
  children: React.ReactNode
}

export const ProjectShell = ({ project, children }: ProjectShellProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBand />

      {/* 헤더 행 — 사이드바 로고 + 앱 헤더 */}
      <div className="flex shrink-0 border-b border-border">
        <SidebarLogo
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
        <AppHeader project={project} />
      </div>

      {/* 바디 — 사이드바 + 메인 콘텐츠 */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="relative flex flex-1 flex-col overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
