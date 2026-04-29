'use client'

import { UiTable } from '@/components/ui/UiTable'
import type { UiTableColumn, UiTableFilter } from '@/components/ui/UiTable'
import { INVOICES, type Invoice } from '../data/table-demo-data'

const columns: UiTableColumn<Invoice>[] = [
  { key: 'id', header: 'Invoice', width: '140px', sortable: true, render: (row) => <span className="font-medium">{row.id}</span> },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'method', header: 'Method', sortable: true },
  { key: 'amount', header: 'Amount', align: 'right', sortable: true, render: (row) => `$${row.amount.toFixed(2)}` },
]

const filters: UiTableFilter<Invoice>[] = [
  { label: 'Paid', predicate: (row) => row.status === 'Paid' },
  { label: 'Pending', predicate: (row) => row.status === 'Pending' },
  { label: 'Unpaid', predicate: (row) => row.status === 'Unpaid' },
]

export const TableDemo = () => (
  <div className="w-full max-w-[650px]">
    <UiTable
      columns={columns}
      data={INVOICES}
      rowKey={(row) => row.id}
      selectable
      filters={filters}
    />
  </div>
)
