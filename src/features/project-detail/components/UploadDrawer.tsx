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
import { Upload, FileText, X } from 'lucide-react'
import type { DeliverableCell } from '../types/project-detail.types'

type UploadDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  cell: DeliverableCell | null
  onSubmit: (cellId: string) => void
}

const ACCEPTED_TYPES = ['PDF', 'DWG', 'XLSX', 'DOCX']

export function UploadDrawer({ open, onOpenChange, cell, onSubmit }: UploadDrawerProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setFiles([])
    setIsDragging(false)
    onOpenChange(false)
  }

  const handleSubmit = () => {
    if (!cell || files.length === 0) return
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
            <Upload size={18} className="text-[var(--gray-600)]" />
            문서 업로드
          </SheetTitle>
          <SheetDescription>
            산출물 문서를 업로드합니다.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          {/* Context info */}
          {cell && (
            <div className="rounded-lg border border-border bg-[var(--gray-50)] p-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">문서명</span>
                  <span className="text-xs font-medium text-foreground">
                    {cell.documentTitle || '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Workstream</span>
                  <span className="text-xs text-foreground">
                    <span className="font-mono">{cell.workstreamCode}</span> · {cell.workstreamName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Stage</span>
                  <span className="text-xs text-foreground">
                    <span className="font-mono">{cell.stageCode}</span> · {cell.stageName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Dropzone */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              파일 첨부
            </label>
            <div
              className={`relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
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
              <Upload size={24} className="mb-2 text-[var(--gray-400)]" />
              <span className="text-xs font-medium text-[var(--gray-600)]">
                파일을 드래그하거나 클릭하여 선택
              </span>
              <span className="mt-1 text-[10px] text-[var(--gray-400)]">
                {ACCEPTED_TYPES.join(', ')} 지원
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
              className="flex-1 gap-1.5"
              disabled={files.length === 0}
              onClick={handleSubmit}
            >
              <Upload size={14} />
              업로드
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
