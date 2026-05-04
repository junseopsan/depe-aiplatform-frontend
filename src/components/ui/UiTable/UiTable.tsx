'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from './table-primitives'

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
  filters?: UiTableFilter<T>[]
  footer?: UiTableFooterRow
  actionLabel?: string
  onAction?: (key: string) => void
  className?: string
}

export const UiTable = <T,>({
  columns,
  data,
  rowKey,
  filters,
  footer,
  actionLabel,
  onAction,
  className,
}: UiTableProps<T>) => {
  const [sort, setSort] = useState<SortState>(null)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)

  const filteredData = useMemo(() => {
    if (activeFilter == null || !filters?.[activeFilter]) return data
    return data.filter(filters[activeFilter].predicate)
  }, [data, filters, activeFilter])

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

  const hasAction = !!actionLabel && !!onAction
  const totalCols = columns.length + (hasAction ? 1 : 0)

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
                  'cursor-pointer px-3 py-1.5 text-xs font-medium',
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
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => {
              const isSorted = sort?.key === col.key
              const SortIcon = isSorted
                ? sort.direction === 'asc' ? ArrowUp : ArrowDown
                : ArrowUpDown

              return (
                <TableHead
                  key={col.key}
                  className={cn(
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
                </TableHead>
              )
            })}
            {hasAction && <TableHead className="w-[120px] text-right" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={totalCols}
                className="px-4 py-8 text-center text-sm text-[var(--gray-400)]"
              >
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => {
              const key = rowKey(row)

              return (
                <TableRow key={key}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                      )}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </TableCell>
                  ))}
                  {hasAction && (
                    <TableCell className="text-right">
                      <button
                        className="cursor-pointer bg-[var(--primary-500)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--primary-600)]"
                        onClick={() => onAction(key)}
                      >
                        {actionLabel}
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              )
            })
          )}
        </TableBody>

        {footer && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={footer.colSpan ?? totalCols - 1}
                className="font-semibold"
              >
                {footer.label}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {footer.value}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}
