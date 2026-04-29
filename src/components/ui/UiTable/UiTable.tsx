'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/UiCheckbox'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

// ── Types ──

export type UiTableColumn<T> = {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

export type UiTableFilter<T> = {
  label: string
  predicate: (row: T) => boolean
}

export type UiTableFooterRow = {
  colSpan?: number
  label: string
  value: string | React.ReactNode
}

type SortState = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type UiTableProps<T> = {
  columns: UiTableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  selectable?: boolean
  onSelectionChange?: (selectedKeys: string[]) => void
  filters?: UiTableFilter<T>[]
  footer?: UiTableFooterRow
  className?: string
}

// ── Component ──

export const UiTable = <T,>({
  columns,
  data,
  rowKey,
  selectable = false,
  onSelectionChange,
  filters,
  footer,
  className,
}: UiTableProps<T>) => {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<SortState>(null)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)

  // ── Filtering ──

  const filteredData = useMemo(() => {
    if (activeFilter == null || !filters?.[activeFilter]) return data
    return data.filter(filters[activeFilter].predicate)
  }, [data, filters, activeFilter])

  // ── Selection ──

  const allSelected = filteredData.length > 0 && selected.size === filteredData.length
  const someSelected = selected.size > 0 && !allSelected

  const updateSelection = (next: Set<string>) => {
    setSelected(next)
    onSelectionChange?.(Array.from(next))
  }

  const toggleAll = () => {
    if (allSelected) {
      updateSelection(new Set())
    } else {
      updateSelection(new Set(filteredData.map(rowKey)))
    }
  }

  const toggleRow = (key: string) => {
    const next = new Set(selected)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    updateSelection(next)
  }

  // ── Sorting ──

  const handleSort = (colKey: string) => {
    setSort((prev) => {
      if (prev?.key !== colKey) return { key: colKey, direction: 'asc' }
      if (prev.direction === 'asc') return { key: colKey, direction: 'desc' }
      return null
    })
  }

  const sortedData = useMemo(() => {
    if (!sort) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sort.key]
      const bVal = (b as Record<string, unknown>)[sort.key]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      let cmp = 0
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal
      } else {
        cmp = String(aVal).localeCompare(String(bVal))
      }

      return sort.direction === 'desc' ? -cmp : cmp
    })
  }, [filteredData, sort])

  const totalCols = columns.length + (selectable ? 1 : 0)

  return (
    <div className={cn('relative w-full', className)}>
      {/* Toolbar */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-[var(--gray-500)]">
          총 <span className="font-semibold text-[var(--gray-900)]">{filteredData.length}</span>건
        </span>
        {filters && filters.length > 0 && (
          <div className="flex items-center gap-2">
            {filters.map((filter, i) => (
            <button
              key={filter.label}
              className={cn(
                'px-3 py-1.5 text-xs font-medium',
                activeFilter === i
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'bg-[var(--primary-50)] text-[var(--primary-700)] hover:bg-[var(--primary-100)]',
              )}
              onClick={() => setActiveFilter(activeFilter === i ? null : i)}
            >
              {filter.label}
            </button>
          ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full caption-bottom text-sm">
          {/* Header */}
          <thead className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
            <tr>
              {selectable && (
                <th className="h-10 w-[40px] px-4 align-middle">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sort?.key === col.key
                const SortIcon = isSorted
                  ? sort.direction === 'asc' ? ArrowUp : ArrowDown
                  : ArrowUpDown

                return (
                  <th
                    key={col.key}
                    className={cn(
                      'h-10 px-4 align-middle text-xs font-semibold text-[var(--gray-500)]',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.sortable && 'cursor-pointer select-none hover:text-[var(--gray-700)]',
                    )}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <span className={cn(
                      'inline-flex items-center gap-1',
                      col.align === 'right' && 'flex-row-reverse',
                    )}>
                      {col.header}
                      {col.sortable && (
                        <SortIcon
                          size={12}
                          className={cn(
                            isSorted ? 'text-[var(--gray-700)]' : 'text-[var(--gray-300)]',
                          )}
                        />
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="[&_tr:last-child]:border-0">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={totalCols}
                  className="px-4 py-8 text-center text-sm text-[var(--gray-400)]"
                >
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              sortedData.map((row) => {
                const key = rowKey(row)
                const isSelected = selected.has(key)

                return (
                  <tr
                    key={key}
                    className={cn(
                      'border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]',
                      isSelected && 'bg-[var(--primary-50)]',
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3 align-middle">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3 align-middle text-sm text-[var(--gray-900)]',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>

          {/* Footer */}
          {footer && (
            <tfoot className="border-t border-[var(--gray-200)] bg-[var(--gray-50)]">
              <tr>
                <td
                  colSpan={footer.colSpan ?? totalCols - 1}
                  className="px-4 py-3 text-sm font-semibold text-[var(--gray-900)]"
                >
                  {footer.label}
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-[var(--gray-900)]">
                  {footer.value}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
