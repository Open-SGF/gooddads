import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/Components/ui/Table'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Button } from '@/Components/ui/Button'
import { TableFilter } from '@/Components/ui'
import { DataTablePagination } from '@/Components/ui/DataTablePagination'
import { router, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { UsersListPageProps } from '@/Pages/Users/List'

type BaseRow = {
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type DataTableFields<T> = {
  id: string
  label: string
  disabled?: boolean
  sorting?: boolean
  content?: (row: T) => ReactNode
}

type DataTableProps<T> = {
  fields: DataTableFields<T>[]
  data: T[]
}

export const DataTable = <T extends BaseRow>({
  fields,
  data,
}: DataTableProps<T>) => {
  const {
    ziggy: { query },
    page,
    pageSize,
    totalPages,
    count,
  } = usePage<UsersListPageProps>().props
  const queryAsObject = Array.isArray(query) ? {} : query || {}

  const [sort, setSort] = useState(queryAsObject.sort || 'id,asc')
  const [sortField, sortDirection] = sort.split(',')

  const handleSort = (field: DataTableFields<T>) => {
    const newSort =
      sortField === field.id && sortDirection === 'desc'
        ? ''
        : `${field.id},${sortField === field.id ? 'desc' : 'asc'}`
    setSort(newSort)
    router.reload({
      data: {
        ...query,
        page: undefined,
        sort: newSort || undefined,
      },
    })
  }

  return (
    <DataTableProvider
      value={{ fields, data, page, pageSize, totalPages, count, query }}
    >
      <div className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 gap-6">
        <TableFilter />
        {data.length > 0 && (
          <Table>
            <TableHeader className={'font-medium bg-gray-100'}>
              <TableRow>
                {fields.map((field) => {
                  if (field.disabled) {
                    return null
                  }

                  if (field.sorting) {
                    return (
                      <TableCell key={field.id}>
                        <Button
                          variant="link"
                          className={'p-0 text-foreground font-medium gap-2'}
                          onClick={() => handleSort(field)}
                        >
                          {field.label}
                          <SortingIcon
                            direction={sortDirection}
                            isSorted={sortField === field.id}
                          />
                        </Button>
                      </TableCell>
                    )
                  }

                  return <TableCell key={field.id}>{field.label}</TableCell>
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {fields.map((field) => {
                    if (field.disabled) {
                      return null
                    }

                    return (
                      <TableCell key={field.id}>
                        {field.content ? field.content(row) : row[field.id]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {data.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No users found.
          </div>
        )}
        <DataTablePagination />
      </div>
    </DataTableProvider>
  )
}

interface DataTableContextProps<T extends Record<string, string | number>> {
  fields: DataTableFields<T>[]
  data: T[]
  page: number
  pageSize: number
  totalPages: number
  count: number
  query: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<DataTableContextProps<any> | undefined>(
  undefined,
)

export const useDataTableContext = <T extends BaseRow>() => {
  const context = useContext(DataTableContext)
  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider',
    )
  }
  return context as DataTableContextProps<T>
}

interface DataTableProviderProps<T extends BaseRow> {
  value: DataTableContextProps<T>
  children: ReactNode
}

export const DataTableProvider = <T extends BaseRow>({
  value,
  children,
}: DataTableProviderProps<T>) => {
  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  )
}

const SortingIcon = ({
  direction,
  isSorted,
}: {
  direction: string
  isSorted: boolean
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'lucide lucide-chevrons-up-down',
        `[&>path:nth-child(1)]:${isSorted && direction === 'asc' ? 'stroke-[hsl(var(--primary))]' : 'stroke-current'}`,
        `[&>path:nth-child(2)]:${isSorted && direction === 'desc' ? 'stroke-[hsl(var(--primary))]' : 'stroke-current'}`,
      )}
    >
      <path d="m7 9 5-5 5 5" />
      <path d="m7 15 5 5 5-5" />
    </svg>
  )
}
