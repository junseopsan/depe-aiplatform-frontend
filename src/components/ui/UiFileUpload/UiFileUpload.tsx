"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AlertCircle, FileUp, Folder, Trash2, Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { UiButton } from "@/components/ui/UiButton"

import { FileTreeView } from "@/components/ui/UiFileUpload/FileTreeView"
import { buildFileTree } from "@/components/ui/UiFileUpload/buildFileTree"
import { readDroppedItems } from "@/components/ui/UiFileUpload/readDroppedItems"
import type { UploadedFile } from "@/components/ui/UiFileUpload/types"

type UiFileUploadProps = {
  value: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
  /** 콤마로 구분된 허용 확장자 (예: ".pdf,.docx") */
  accept?: string
  /** 업로드 모드. `"folder"`면 폴더만 받음 (파일 버튼·파일 드롭 차단) */
  mode?: "any" | "folder"
  /** 빈 상태 안내 문구. 미지정 시 mode에 맞춰 기본값 사용 */
  placeholder?: string
  className?: string
}

export const UiFileUpload = ({
  value,
  onChange,
  accept = ".pdf,.docx",
  mode = "any",
  placeholder,
  className,
}: UiFileUploadProps) => {
  const folderOnly = mode === "folder"
  const resolvedPlaceholder =
    placeholder ??
    (folderOnly ? "폴더를 업로드하세요" : "파일 또는 폴더를 업로드하세요")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [rejectMessage, setRejectMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!rejectMessage) return
    const timer = setTimeout(() => setRejectMessage(null), 3500)
    return () => clearTimeout(timer)
  }, [rejectMessage])

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
      // folderOnly에서 파일 드롭이 섞여 있는지 미리 체크해 피드백 표시
      if (folderOnly) {
        const hasFile = Array.from(items).some((item) => {
          const entry = item.webkitGetAsEntry?.()
          return entry ? !entry.isDirectory : false
        })
        const hasFolder = Array.from(items).some((item) => {
          const entry = item.webkitGetAsEntry?.()
          return entry ? entry.isDirectory : false
        })
        if (hasFile) {
          setRejectMessage(
            hasFolder
              ? "파일은 받지 않습니다 — 폴더만 추가됩니다"
              : "파일은 받지 않습니다 — 폴더를 드롭해 주세요",
          )
        }
      }

      const entries = await readDroppedItems(items, { folderOnly })
      addEntries(entries)
      return
    }

    // webkitGetAsEntry 미지원 환경에서 folderOnly면 파일 드롭은 무시 + 피드백
    if (folderOnly) {
      if (e.dataTransfer.files.length > 0) {
        setRejectMessage("파일은 받지 않습니다 — 폴더를 드롭해 주세요")
      }
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
            rejectMessage
              ? "border-[var(--error)] bg-[var(--error-bg)] text-[var(--error)]"
              : isDragOver
                ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                : "border-[var(--gray-300)] text-[var(--gray-500)] hover:border-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)]",
          )}
        >
          {rejectMessage ? <AlertCircle size={20} /> : <Upload size={20} />}
          <p className="text-[13px]">{rejectMessage ?? resolvedPlaceholder}</p>
          <p className="text-[12px] text-[var(--gray-400)]">
            {folderOnly
              ? "허용: 폴더"
              : `허용 형식: ${acceptedExts.join(", ") || "모든 파일"}`}
          </p>
          <UploadActions
            folderOnly={folderOnly}
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
              <UploadActions
                folderOnly={folderOnly}
                onPickFiles={openFilePicker}
                onPickFolder={openFolderPicker}
                size="sm"
              />
              <UiButton
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearAll}
              >
                <Trash2 />
                전체 삭제
              </UiButton>
            </div>
          </div>
          {rejectMessage && (
            <div className="flex items-center gap-2 border-b border-[var(--error-border)] bg-[var(--error-bg)] px-3 py-2 text-[12px] text-[var(--error)]">
              <AlertCircle size={14} className="shrink-0" />
              <span>{rejectMessage}</span>
            </div>
          )}
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

const UploadActions = ({
  folderOnly,
  onPickFiles,
  onPickFolder,
  size = "default",
}: {
  folderOnly: boolean
  onPickFiles: () => void
  onPickFolder: () => void
  size?: "default" | "sm"
}) => (
  <div className="flex items-center gap-2">
    {!folderOnly && (
      <UiButton type="button" variant="outline" size={size} onClick={onPickFiles}>
        <FileUp />
        파일 업로드
      </UiButton>
    )}
    <UiButton type="button" variant="outline" size={size} onClick={onPickFolder}>
      <Folder />
      폴더 업로드
    </UiButton>
  </div>
)
