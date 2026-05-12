"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { ChevronDown, FileUp, Folder, Trash2, Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/UiButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/UiDropdownMenu"

import { FileTreeView } from "./FileTreeView"
import { buildFileTree } from "./buildFileTree"
import { readDroppedItems } from "./readDroppedItems"
import type { UploadedFile } from "./types"

type UiFileUploadProps = {
  value: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  /** 콤마로 구분된 허용 확장자 (예: ".pdf,.docx") */
  accept?: string
  /** 빈 상태 안내 문구 */
  placeholder?: string
  className?: string
}

export const UiFileUpload = ({
  value,
  onChange,
  accept = ".pdf,.docx",
  placeholder = "파일 또는 폴더를 업로드하세요",
  className,
}: UiFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const tree = useMemo(() => buildFileTree(value), [value])
  const acceptedExts = useMemo(
    () =>
      accept
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    [accept],
  )

  const isAccepted = useCallback(
    (name: string) => {
      if (acceptedExts.length === 0) return true
      const lower = name.toLowerCase()
      return acceptedExts.some((ext) => lower.endsWith(ext))
    },
    [acceptedExts],
  )

  const addEntries = useCallback(
    (entries: { file: File; relativePath: string }[]) => {
      const next: UploadedFile[] = []
      for (const { file, relativePath } of entries) {
        if (!isAccepted(relativePath)) continue
        next.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          file,
          relativePath,
        })
      }
      if (next.length > 0) onChange([...value, ...next])
    },
    [isAccepted, onChange, value],
  )

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const entries = Array.from(incoming).map((file) => ({
        file,
        relativePath:
          (file as File & { webkitRelativePath?: string }).webkitRelativePath ||
          file.name,
      }))
      addEntries(entries)
    },
    [addEntries],
  )

  const handleRemove = useCallback(
    (id: string) => {
      onChange(value.filter((f) => f.id !== id))
    },
    [onChange, value],
  )

  const handleClearAll = useCallback(() => {
    onChange([])
  }, [onChange])

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }
  const openFolderPicker = () => {
    folderInputRef.current?.click()
  }

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ""
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    // 폴더 드롭을 지원하려면 items + webkitGetAsEntry 경로를 우선 사용
    // (e.dataTransfer.files만으로는 폴더 진입이 안 됨)
    const items = e.dataTransfer.items
    if (items && items.length > 0 && typeof items[0].webkitGetAsEntry === "function") {
      const entries = await readDroppedItems(items)
      addEntries(entries)
      return
    }

    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
  }

  const isEmpty = value.length === 0
  const totalCount = value.length

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={onFilesSelected}
        className="hidden"
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        onChange={onFilesSelected}
        className="hidden"
        // @ts-expect-error — non-standard but widely supported
        webkitdirectory=""
        directory=""
      />

      {isEmpty ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded border-[1.5px] border-dashed px-6 py-10 text-center transition-colors",
            isDragOver
              ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]"
              : "border-[var(--gray-300)] text-[var(--gray-500)] hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]",
          )}
        >
          <Upload size={20} />
          <p className="text-[13px]">{placeholder}</p>
          <p className="text-[12px] text-[var(--gray-400)]">
            허용 형식: {acceptedExts.join(", ") || "모든 파일"}
          </p>
          <UploadDropdown
            onPickFiles={openFilePicker}
            onPickFolder={openFolderPicker}
          />
        </div>
      ) : (
        <div className="flex flex-col rounded border border-[var(--gray-200)] bg-white">
          <div className="flex items-center justify-between border-b border-[var(--gray-100)] px-3 py-2">
            <span className="text-[12px] font-medium text-[var(--gray-700)]">
              업로드된 파일 {totalCount}개
            </span>
            <div className="flex items-center gap-2">
              <UploadDropdown
                onPickFiles={openFilePicker}
                onPickFolder={openFolderPicker}
                size="sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearAll}
              >
                <Trash2 />
                전체 삭제
              </Button>
            </div>
          </div>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={onDrop}
            className={cn(
              "max-h-[360px] overflow-y-auto py-1 transition-colors",
              isDragOver && "bg-[var(--primary-50)]",
            )}
          >
            <FileTreeView nodes={tree} onRemove={handleRemove} />
          </div>
        </div>
      )}
    </div>
  )
}

const UploadDropdown = ({
  onPickFiles,
  onPickFolder,
  size = "default",
}: {
  onPickFiles: () => void
  onPickFolder: () => void
  size?: "default" | "sm"
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button type="button" size={size}>
          <Upload />
          업로드
          <ChevronDown />
        </Button>
      }
    />
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={onPickFiles}>
        <FileUp />
        파일 선택
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onPickFolder}>
        <Folder />
        폴더 선택
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
