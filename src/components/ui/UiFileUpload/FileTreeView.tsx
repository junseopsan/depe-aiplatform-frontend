"use client"

import { useState } from "react"
import { ChevronRight, File as FileIcon, Folder, FolderOpen, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FileTreeNode } from "@/components/ui/UiFileUpload/types"

type FileTreeViewProps = {
  nodes: FileTreeNode[]
  onRemove: (fileId: string) => void
  className?: string
}

export const FileTreeView = ({ nodes, onRemove, className }: FileTreeViewProps) => {
  if (nodes.length === 0) return null
  return (
    <ul className={cn("flex flex-col text-[13px] text-[var(--gray-700)]", className)}>
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} depth={0} onRemove={onRemove} />
      ))}
    </ul>
  )
}

type TreeNodeProps = {
  node: FileTreeNode
  depth: number
  onRemove: (fileId: string) => void
}

const TreeNode = ({ node, depth, onRemove }: TreeNodeProps) => {
  const [open, setOpen] = useState(true)
  const padLeft = 8 + depth * 16

  if (node.kind === "folder") {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-1.5 py-1 pr-2 hover:bg-[var(--gray-50)]"
          style={{ paddingLeft: padLeft }}
        >
          <ChevronRight
            size={14}
            className={cn(
              "shrink-0 text-[var(--gray-400)] transition-transform",
              open && "rotate-90",
            )}
          />
          {open ? (
            <FolderOpen size={14} className="shrink-0 text-[var(--primary-500)]" />
          ) : (
            <Folder size={14} className="shrink-0 text-[var(--primary-500)]" />
          )}
          <span className="truncate font-medium text-[var(--gray-800)]">{node.name}</span>
          <span className="ml-1 text-[11px] text-[var(--gray-400)]">
            {countFiles(node)}
          </span>
        </button>
        {open && node.children.length > 0 && (
          <ul>
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                onRemove={onRemove}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li
      className="group flex items-center justify-between py-1 pr-2 hover:bg-[var(--gray-50)]"
      style={{ paddingLeft: padLeft + 14 + 6 }}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <FileIcon size={14} className="shrink-0 text-[var(--gray-400)]" />
        <span className="truncate">{node.name}</span>
        <span className="ml-1 shrink-0 text-[11px] text-[var(--gray-400)]">
          {formatBytes(node.file.file.size)}
        </span>
      </span>
      <button
        type="button"
        aria-label="삭제"
        onClick={() => onRemove(node.file.id)}
        className="ml-2 inline-flex size-5 shrink-0 items-center justify-center rounded text-[var(--gray-400)] opacity-0 transition group-hover:opacity-100 hover:bg-[var(--gray-100)] hover:text-[var(--error)] focus:opacity-100"
      >
        <X size={12} />
      </button>
    </li>
  )
}

const countFiles = (node: FileTreeNode): number => {
  if (node.kind === "file") return 1
  return node.children.reduce((sum, child) => sum + countFiles(child), 0)
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
