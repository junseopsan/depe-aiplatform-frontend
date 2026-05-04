"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Printer,
  X,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type UiPdfViewerProps = {
  src: string;
  searchText?: string;
  className?: string;
};

type SearchResult = {
  page: number;
  count: number;
};

export const UiPdfViewer = ({ src, searchText: externalSearch, className }: UiPdfViewerProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Search
  const [searchOpen, setSearchOpen] = useState(!!externalSearch);
  const [searchQuery, setSearchQuery] = useState(externalSearch ?? "");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentResultIdx, setCurrentResultIdx] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);

  const activeSearch = searchQuery.trim();

  const goToPage = useCallback((page: number) => {
    setPageNumber(page);
    setPageInput(String(page));
  }, []);

  const performSearch = useCallback(
    async (query: string, doc?: PDFDocumentProxy, pages?: number) => {
      const pdfDoc = doc ?? pdfDocRef.current;
      const totalPages = pages ?? numPages;
      if (!pdfDoc || !query.trim()) {
        setSearchResults([]);
        return;
      }

      const q = query.trim().toLowerCase();
      const results: SearchResult[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ")
          .toLowerCase();

        const count = pageText.split(q).length - 1;
        if (count > 0) {
          results.push({ page: i, count });
        }
      }

      setSearchResults(results);
      setCurrentResultIdx(0);

      if (results.length > 0) {
        goToPage(results[0].page);
      }
    },
    [numPages, goToPage],
  );

  // PDF document proxy 저장 (검색용)
  const onDocumentLoadSuccessMain = useCallback(
    (pdf: { numPages: number }) => {
      setNumPages(pdf.numPages);
      setLoading(false);
      pdfDocRef.current = pdf as unknown as PDFDocumentProxy;

      // 외부에서 searchText가 넘어온 경우 자동 검색
      if (externalSearch) {
        performSearch(externalSearch, pdf as unknown as PDFDocumentProxy, pdf.numPages);
      }
    },
    [externalSearch, performSearch],
  );

  const handleSearch = () => {
    performSearch(searchQuery);
  };

  const goToNextResult = () => {
    if (searchResults.length === 0) return;
    const next = (currentResultIdx + 1) % searchResults.length;
    setCurrentResultIdx(next);
    goToPage(searchResults[next].page);
  };

  const goToPrevResult = () => {
    if (searchResults.length === 0) return;
    const prev = (currentResultIdx - 1 + searchResults.length) % searchResults.length;
    setCurrentResultIdx(prev);
    goToPage(searchResults[prev].page);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentResultIdx(0);
    setSearchOpen(false);
  };
  const goToPrev = () => goToPage(Math.max(1, pageNumber - 1));
  const goToNext = () => goToPage(Math.min(numPages, pageNumber + 1));
  const zoomIn = () => setScale((s) => Math.min(2.0, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.4, s - 0.2));
  const resetZoom = () => setScale(1.0);

  const printViewerId = useRef(`pdf-viewer-${Math.random().toString(36).slice(2)}`);

  const handlePrint = useCallback(() => {
    // window.print() + CSS isolation: 새 탭/팝업 없이 인쇄 다이얼로그 표시
    // visibility 속성을 사용하므로 canvas 콘텐츠가 그대로 유지됨
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        body * { visibility: hidden !important; }
        #${printViewerId.current}, #${printViewerId.current} * { visibility: visible !important; }
        #${printViewerId.current} {
          position: fixed !important;
          inset: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: white !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  }, []);

  const pageArray = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
    [numPages],
  );

  // 텍스트 하이라이트 렌더러
  const customTextRenderer = useCallback(
    (textItem: { str: string }) => {
      if (!activeSearch) return textItem.str;

      const text = textItem.str;
      const query = activeSearch.toLowerCase();
      const lower = text.toLowerCase();

      if (!lower.includes(query)) return text;

      const parts: string[] = [];
      let lastIdx = 0;

      let idx = lower.indexOf(query, lastIdx);
      while (idx !== -1) {
        if (idx > lastIdx) {
          parts.push(text.slice(lastIdx, idx));
        }
        parts.push(
          `<mark style="background:#FBBF24;color:#0D1117;padding:1px 0;border-radius:2px">${text.slice(idx, idx + query.length)}</mark>`,
        );
        lastIdx = idx + query.length;
        idx = lower.indexOf(query, lastIdx);
      }

      if (lastIdx < text.length) {
        parts.push(text.slice(lastIdx));
      }

      return parts.join("");
    },
    [activeSearch],
  );

  return (
    <div
      className={cn(
        "flex flex-col border border-[var(--gray-200)] bg-card",
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--gray-200)] bg-[var(--gray-50)] px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Thumbnail toggle */}
          <button
            className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)]"
            onClick={() => setShowThumbnails((v) => !v)}
            title={showThumbnails ? "썸네일 닫기" : "썸네일 열기"}
          >
            {showThumbnails ? (
              <PanelLeftClose size={16} />
            ) : (
              <PanelLeftOpen size={16} />
            )}
          </button>

          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)] disabled:cursor-not-allowed disabled:opacity-30"
              onClick={goToPrev}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="flex items-center gap-1 text-xs text-[var(--gray-600)]">
              <input
                type="text"
                inputMode="numeric"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={() => {
                  const val = parseInt(pageInput, 10);
                  if (!isNaN(val) && val >= 1 && val <= numPages) {
                    goToPage(val);
                  } else {
                    setPageInput(String(pageNumber));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-[36px] border border-[var(--gray-200)] bg-white px-1 py-0.5 text-center text-xs font-semibold text-[var(--gray-900)] outline-none focus:border-[var(--primary-500)]"
              />
              <span>/ {numPages}</span>
            </span>
            <button
              className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)] disabled:cursor-not-allowed disabled:opacity-30"
              onClick={goToNext}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right — search + zoom */}
        <div className="flex items-center gap-3">
          {/* Search toggle */}
          <button
            className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)]"
            onClick={() => {
              setSearchOpen((v) => !v);
              setTimeout(() => searchInputRef.current?.focus(), 50);
            }}
            title="텍스트 검색"
          >
            <Search size={14} />
          </button>

          {/* Print */}
          <button
            className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)]"
            onClick={handlePrint}
            title="인쇄"
          >
            <Printer size={14} />
          </button>

          {/* Zoom controls */}
          <button
            className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)] disabled:cursor-not-allowed disabled:opacity-30"
            onClick={zoomOut}
            disabled={scale <= 0.4}
          >
            <ZoomOut size={14} />
          </button>
          <button
            className="cursor-pointer px-2 py-0.5 text-xs text-[var(--gray-600)] hover:text-[var(--gray-900)]"
            onClick={resetZoom}
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            className="cursor-pointer p-1 text-[var(--gray-500)] hover:text-[var(--gray-900)] disabled:cursor-not-allowed disabled:opacity-30"
            onClick={zoomIn}
            disabled={scale >= 2.0}
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="flex items-center gap-2 border-b border-[var(--gray-200)] bg-white px-4 py-2">
          <Search size={14} className="shrink-0 text-[var(--gray-400)]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              if (e.key === "Escape") clearSearch();
            }}
            placeholder="텍스트 검색..."
            className="flex-1 bg-transparent text-sm text-[var(--gray-900)] outline-none placeholder:text-[var(--gray-400)]"
          />
          {searchResults.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-[var(--gray-500)]">
                {currentResultIdx + 1} / {searchResults.length} 페이지
              </span>
              <button
                className="cursor-pointer p-0.5 text-[var(--gray-500)] hover:text-[var(--gray-900)]"
                onClick={goToPrevResult}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="cursor-pointer p-0.5 text-[var(--gray-500)] hover:text-[var(--gray-900)]"
                onClick={goToNextResult}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
          {activeSearch && searchResults.length === 0 && (
            <span className="text-xs text-[var(--gray-400)]">결과 없음</span>
          )}
          <button
            className="cursor-pointer p-1 text-[var(--gray-400)] hover:text-[var(--gray-900)]"
            onClick={clearSearch}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Body — thumbnails + main viewer */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail sidebar */}
        {showThumbnails && (
          <div className="w-[140px] shrink-0 overflow-y-auto border-r border-[var(--gray-200)] bg-[var(--gray-100)] p-3">
            <Document file={src} loading="">
              {pageArray.map((p) => (
                <button
                  key={p}
                  className={cn(
                    "mb-3 flex w-full cursor-pointer flex-col items-center gap-1 last:mb-0",
                  )}
                  onClick={() => goToPage(p)}
                >
                  <div
                    className={cn(
                      "overflow-hidden border-2",
                      p === pageNumber
                        ? "border-[var(--primary-400)]"
                        : "border-transparent hover:border-[var(--gray-500)]",
                    )}
                  >
                    <Page
                      pageNumber={p}
                      width={110}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[11px]",
                      p === pageNumber
                        ? "font-semibold text-[var(--primary-500)]"
                        : "text-[var(--gray-500)]",
                    )}
                  >
                    {p}
                  </span>
                </button>
              ))}
            </Document>
          </div>
        )}

        {/* Main viewer */}
        <div id={printViewerId.current} className="flex flex-1 items-start justify-center overflow-auto bg-[var(--gray-100)] p-4">
          {loading && (
            <div className="flex items-center justify-center py-20 text-sm text-[var(--gray-400)]">
              PDF 로딩 중...
            </div>
          )}
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccessMain}
            loading=""
            error={
              <div className="py-20 text-center text-sm text-[var(--error)]">
                PDF를 불러올 수 없습니다
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
              customTextRenderer={activeSearch ? customTextRenderer : undefined}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};
