'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import dynamic from 'next/dynamic'

const UiPdfViewer = dynamic(
  () => import('@/components/ui/UiPdfViewer').then((mod) => ({ default: mod.UiPdfViewer })),
  { ssr: false, loading: () => <div className="py-20 text-center text-sm text-[var(--gray-400)]">PDF 뷰어 로딩 중...</div> },
)

export const PdfViewerPreview = () => {
  const [query, setQuery] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    setSearchText(query)
  }

  return (
    <div className="w-full max-w-[700px]">
      {/* Search input */}
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            placeholder="PDF 내 텍스트 검색..."
            className="h-9 w-full border border-[var(--gray-300)] bg-[var(--gray-50)] pl-9 pr-3 text-sm text-[var(--gray-900)] outline-none placeholder:text-[var(--gray-400)] focus:border-[var(--primary-500)] focus:bg-white"
          />
        </div>
        <button
          className="cursor-pointer h-9 px-4 text-xs font-medium bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)]"
          onClick={handleSearch}
        >
          찾기
        </button>
      </div>

      {/* Viewer */}
      <UiPdfViewer
        key={searchText}
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
        searchText={searchText || undefined}
        className="h-[600px]"
      />
    </div>
  )
}
