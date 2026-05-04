# UiTable

데이터 배열과 컬럼 정의를 props로 받아 테이블을 렌더링하는 컴포넌트.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `UiTableColumn<T>[]` | — | 컬럼 정의 배열 |
| `data` | `T[]` | — | 행 데이터 배열 |
| `rowKey` | `(row: T) => string` | — | 각 행의 고유 키 추출 함수 |
| `selectable` | `boolean` | `false` | 체크박스 선택 기능 활성화 |
| `onSelectionChange` | `(keys: string[]) => void` | — | 선택 변경 콜백 |
| `filters` | `UiTableFilter<T>[]` | — | 상단 필터 버튼 목록 (최대 5개 권장) |
| `footer` | `UiTableFooterRow` | — | 하단 요약 행 |
| `className` | `string` | — | 루트 요소 추가 클래스 |

## UiTableColumn\<T\>

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | 데이터 객체의 필드명 |
| `header` | `string` | 헤더 텍스트 |
| `align` | `'left' \| 'center' \| 'right'` | 텍스트 정렬 |
| `width` | `string` | 컬럼 너비 (예: `'140px'`) |
| `sortable` | `boolean` | 정렬 기능 활성화 |
| `render` | `(row: T) => ReactNode` | 커스텀 셀 렌더링 |

## UiTableFilter\<T\>

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | 버튼 텍스트 |
| `predicate` | `(row: T) => boolean` | 필터 조건 함수 |

## 사용 예시

```tsx
import { UiTable } from '@/components/ui/UiTable'
import type { UiTableColumn, UiTableFilter } from '@/components/ui/UiTable'

type Invoice = { id: string; status: string; amount: number }

const columns: UiTableColumn<Invoice>[] = [
  { key: 'id', header: 'Invoice', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'amount', header: 'Amount', align: 'right', sortable: true,
    render: (row) => `$${row.amount.toFixed(2)}` },
]

const filters: UiTableFilter<Invoice>[] = [
  { label: 'Paid', predicate: (row) => row.status === 'Paid' },
  { label: 'Pending', predicate: (row) => row.status === 'Pending' },
]

<UiTable
  columns={columns}
  data={invoices}
  rowKey={(row) => row.id}
  selectable
  filters={filters}
  footer={{ label: 'Total', value: '$2,500.00' }}
/>
```

## 기능

- **필터 버튼**: `filters` prop으로 상단에 필터 버튼 표시. "전체" 버튼 자동 포함. 클릭 시 해당 조건에 맞는 행만 표시. 다시 클릭하면 필터 해제.
- **체크박스 선택**: `selectable` prop으로 전체/개별 행 선택. 헤더 체크박스는 전체 선택/해제 및 indeterminate 상태 지원.
- **컬럼 정렬**: `sortable: true`인 컬럼 헤더 클릭 시 오름차순 → 내림차순 → 정렬 해제 순으로 토글. 숫자는 숫자 비교, 문자열은 `localeCompare` 사용.
- **커스텀 렌더링**: `render` 함수로 셀 내용을 자유롭게 커스터마이징.
- **빈 상태**: 필터 결과가 없을 때 "데이터가 없습니다" 메시지 표시.
- **Footer**: 합계 등 요약 행 표시.

## 내부 구조

shadcn/ui 표준 Table 프리미티브 위에 구성됨. 같은 폴더의 `table-primitives.tsx`에서 다음 컴포넌트를 export 한다.

```tsx
import {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
} from '@/components/ui/UiTable'
```

- 프로젝트 디자인 토큰(`var(--gray-*)`)에 맞춰 스타일링됨.
- `UiTable`을 쓰지 않고 직접 프리미티브를 조합해 커스텀 테이블을 구성할 수도 있다.
