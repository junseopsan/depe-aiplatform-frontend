'use client'

import { useState } from 'react'
import type { DeliverableCell, DeliverableAction } from '../types/project-detail.types'
import { MOCK_PROJECT } from '../data/mock-project'
import { MOCK_DELIVERABLES } from '../data/mock-deliverables'
import { publishCell, startGenerating, uploadComplete } from '../utils/deliverable-actions'
import { TopBand } from './TopBand'
import { Sidebar, SidebarLogo } from './Sidebar'
import { AppHeader } from './AppHeader'
import { DeliverableLegend } from './DeliverableLegend'
import { DeliverableMatrix, StagePipelineHeader } from './DeliverableMatrix'
import { AiGenerationDrawer } from './AiGenerationDrawer'
import { UploadDrawer } from './UploadDrawer'

export function ProjectDetailPage() {
  const [deliverables, setDeliverables] = useState<DeliverableCell[]>(MOCK_DELIVERABLES)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Drawer state
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false)
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false)
  const [activeCell, setActiveCell] = useState<DeliverableCell | null>(null)

  const handleAction = (cellId: string, action: DeliverableAction) => {
    const cell = deliverables.find((d) => d.id === cellId)
    if (!cell) return

    switch (action.type) {
      case 'publish':
        setDeliverables((prev) =>
          prev.map((d) => (d.id === cellId ? publishCell(d) : d))
        )
        break
      case 'aiGenerate':
        setActiveCell(cell)
        setAiDrawerOpen(true)
        break
      case 'upload':
        setActiveCell(cell)
        setUploadDrawerOpen(true)
        break
    }
  }

  const handleAiSubmit = (cellId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === cellId ? startGenerating(d) : d))
    )
  }

  const handleUploadSubmit = (cellId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === cellId ? uploadComplete(d) : d))
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBand />

      {/* Top row — sidebar logo + header */}
      <div className="flex shrink-0 border-b border-border">
        <SidebarLogo collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((prev) => !prev)} />
        <AppHeader project={MOCK_PROJECT} />
      </div>

      {/* Body — sidebar nav + main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="relative flex flex-1 flex-col overflow-y-auto bg-background">
          <div className="sticky top-0 z-10 bg-background pt-2">
            <DeliverableLegend deliverables={deliverables} />
            <StagePipelineHeader />
          </div>
          <DeliverableMatrix deliverables={deliverables} onAction={handleAction} />
        </main>
      </div>

      <AiGenerationDrawer
        open={aiDrawerOpen}
        onOpenChange={setAiDrawerOpen}
        cell={activeCell}
        onSubmit={handleAiSubmit}
      />
      <UploadDrawer
        open={uploadDrawerOpen}
        onOpenChange={setUploadDrawerOpen}
        cell={activeCell}
        onSubmit={handleUploadSubmit}
      />
    </div>
  )
}
