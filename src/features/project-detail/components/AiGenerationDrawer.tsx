'use client'

import { useState, useRef } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/UiSheet'
import { Button } from '@/components/ui/UiButton'
import { Sparkles, Upload, FileText, X } from 'lucide-react'
import type { DeliverableCell } from '../types/project-detail.types'

type AiGenerationDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  cell: DeliverableCell | null
  onSubmit: (cellId: string) => void
}

const ACCEPTED_TYPES = ['PDF', 'DWG', 'XLSX', 'DOCX']

export function AiGenerationDrawer({ open, onOpenChange, cell, onSubmit }: AiGenerationDrawerProps) {
  const [instructions, setInstructions] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setInstructions('')
    setFiles([])
    setIsDragging(false)
    onOpenChange(false)
  }

  const handleSubmit = () => {
    if (!cell) return
    onSubmit(cell.id)
    handleClose()
  }

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    setFiles((prev) => [...prev, ...Array.from(newFiles)])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <Sparkles size={18} className="text-[var(--primary-500)]" />
            AI 생성
          </SheetTitle>
          <SheetDescription>
            AI를 활용하여 산출물을 자동 생성합니다.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          {/* Context info */}
          {cell && (
            <div className="rounded-lg border border-[var(--primary-500)]/15 bg-[var(--primary-50)] p-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--primary-600)]/70">문서명</span>
                  <span className="text-xs font-medium text-[var(--primary-900)]">
                    {cell.documentTitle || '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--primary-600)]/70">Workstream</span>
                  <span className="text-xs text-[var(--primary-900)]">
                    <span className="font-mono">{cell.workstreamCode}</span> · {cell.workstreamName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--primary-600)]/70">Stage</span>
                  <span className="text-xs text-[var(--primary-900)]">
                    <span className="font-mono">{cell.stageCode}</span> · {cell.stageName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              추가 지시사항
            </label>
            <textarea
              className="min-h-[100px] w-full resize-none rounded-lg border border-[var(--gray-300)] bg-[var(--gray-50)] p-3 text-sm text-foreground outline-none transition-colors placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] focus:bg-white"
              placeholder="AI 생성 시 참고할 지시사항을 입력하세요..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Dropzone */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              참고 자료 첨부 <span className="font-normal text-muted-foreground">(선택)</span>
            </label>
            <div
              className={`relative flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                isDragging
                  ? 'border-[var(--primary-500)] bg-[var(--primary-50)]'
                  : 'border-[var(--gray-300)] bg-[var(--gray-50)] hover:border-[var(--gray-400)]'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                handleFiles(e.dataTransfer.files)
              }}
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={20} className="mb-1.5 text-[var(--gray-400)]" />
              <span className="text-xs font-medium text-[var(--gray-600)]">
                참고 자료 첨부
              </span>
              <span className="mt-0.5 text-[10px] text-[var(--gray-400)]">
                {ACCEPTED_TYPES.join(', ')}
              </span>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.dwg,.xlsx,.docx"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground">
                첨부 파일 ({files.length})
              </span>
              {files.map((file, i) => (
                <div
                  key={`${file.name}-${i}`}
                  className="flex items-center gap-2 rounded-md border border-border bg-white p-2"
                >
                  <FileText size={14} className="shrink-0 text-[var(--gray-400)]" />
                  <span className="flex-1 truncate text-xs text-foreground">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                    className="shrink-0 rounded p-0.5 text-[var(--gray-400)] transition-colors hover:bg-[var(--gray-100)] hover:text-[var(--gray-600)]"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-border">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              취소
            </Button>
            <Button
              className="flex-1 gap-1.5 bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)]"
              onClick={handleSubmit}
            >
              <Sparkles size={14} />
              AI 생성
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
