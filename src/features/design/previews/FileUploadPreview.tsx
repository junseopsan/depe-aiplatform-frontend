"use client"

import { useState } from "react"

import { UiFileUpload, type UploadedFile } from "@/components/ui/UiFileUpload"

export const FileUploadPreview = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  return (
    <div className="flex w-full max-w-[640px] flex-col gap-6">
      <UiFileUpload value={files} onChange={setFiles} accept=".pdf,.docx" />

      <div className="rounded border border-[var(--gray-200)] bg-[var(--gray-50)] p-3">
        <p className="mb-2 text-[11px] font-semibold tracking-wider text-[var(--gray-500)]">
          STATE
        </p>
        <pre className="overflow-x-auto text-[11px] leading-relaxed text-[var(--gray-700)]">
{JSON.stringify(
  files.map((f) => ({
    id: f.id,
    relativePath: f.relativePath,
    size: f.file.size,
    type: f.file.type,
  })),
  null,
  2,
)}
        </pre>
      </div>
    </div>
  )
}
