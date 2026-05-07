'use client'

import { useState } from 'react'
import type { DeliverableCell, DeliverableAction } from '../types/project-detail.types'
import { MOCK_DELIVERABLES } from '../data/mock-deliverables'
import { publishCell, startGenerating, uploadComplete } from '../utils/deliverable-actions'
import { DeliverableLegend } from './DeliverableLegend'
import { DeliverableMatrix, StagePipelineHeader } from './DeliverableMatrix'
import { AiGenerationDrawer } from './AiGenerationDrawer'
import { UploadDrawer } from './UploadDrawer'

type DeliverableMatrixPageProps = {
  projectId: string
}

export function DeliverableMatrixPage({ projectId }: DeliverableMatrixPageProps) {
  const [deliverables, setDeliverables] = useState<DeliverableCell[]>(MOCK_DELIVERABLES)

  const [aiDrawerOpen, setAiDrawerOpen] = useState(false)
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false)
  const [activeCell, setActiveCell] = useState<DeliverableCell | null>(null)

  const handleAction = (cellId: string, action: DeliverableAction) => {
    const cell = deliverables.find((d) => d.id === cellId)
    if (!cell) return

    switch (action.type) {
      case 'publish':
        setDeliverables((prev) => prev.map((d) => (d.id === cellId ? publishCell(d) : d)))
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
    setDeliverables((prev) => prev.map((d) => (d.id === cellId ? startGenerating(d) : d)))
  }

  const handleUploadSubmit = (cellId: string) => {
    setDeliverables((prev) => prev.map((d) => (d.id === cellId ? uploadComplete(d) : d)))
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 bg-background pt-2">
        <DeliverableLegend deliverables={deliverables} />
        <StagePipelineHeader />
      </div>

      <DeliverableMatrix deliverables={deliverables} onAction={handleAction} />

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

      {/* Debug: ensure route param is used for now */}
      <span className="sr-only">projectId: {projectId}</span>
    </div>
  )
}

