'use client'

import { useState } from 'react'
import type { Project } from '../types/project-detail.types'
import { MOCK_PROJECT } from '../data/mock-project'
import { TopBand } from './TopBand'
import { AppHeader } from './AppHeader'

export const ProjectDetailPage = () => {
  const [project, setProject] = useState<Project>(MOCK_PROJECT)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBand />

      <div className="flex shrink-0 border-b border-border">
        <AppHeader project={project} onProjectChange={setProject} />
      </div>

      <main className="flex-1 overflow-y-auto bg-background" />
    </div>
  )
}
