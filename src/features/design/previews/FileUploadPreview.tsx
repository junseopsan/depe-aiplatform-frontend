"use client"

import { useState } from "react"

import { UiFileUpload, type UploadedFile } from "@/components/ui/UiFileUpload"

export const FileUploadPreview = () => {
  const [anyFiles, setAnyFiles] = useState<UploadedFile[]>([])
  const [folderFiles, setFolderFiles] = useState<UploadedFile[]>([])

  return (
    <div className="flex w-full max-w-[640px] flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-[12px] font-semibold tracking-wider text-[var(--gray-500)]">
          MODE — ANY (기본)
        </h3>
        <UiFileUpload
          value={anyFiles}
          onChange={setAnyFiles}
          accept=".pdf,.docx"
        />
        <StateBlock files={anyFiles} />
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-[12px] font-semibold tracking-wider text-[var(--gray-500)]">
          MODE — FOLDER (폴더 전용)
        </h3>
        <UiFileUpload
          value={folderFiles}
          onChange={setFolderFiles}
          accept=".pdf,.docx"
          mode="folder"
        />
        <StateBlock files={folderFiles} />
      </section>
    </div>
  )
}

const StateBlock = ({ files }: { files: UploadedFile[] }) => (
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
)
