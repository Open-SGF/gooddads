import {
  Table,
  TableBody, TableCell,
  TableHeader,
  TableRow,
} from '@/Components/ui/Table'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { Button } from '@/Components/ui/Button'
import {
  TableFilter,
} from '@/Components/ui'
import { DataTablePagination } from '@/Components/ui/DataTablePagination'
import { PaginationProps } from '@/types'
import { router } from '@inertiajs/react'
import { MoveDown, MoveUp } from 'lucide-react'

type BaseRow = {
  id: number;
} & Record<string, string | number>

export type DataTableFields<T> = {
  id: string;
  label: string
  disabled?: boolean;
  sorting?: boolean;
  content?: (row: T) => ReactNode;
}

type DataTableProps<T> = {
  fields: DataTableFields<T>[];
  data: T[];
  query: Record<string, string>
} & PaginationProps

export const DataTable = <T extends BaseRow>({
                                               fields,
                                               data,
                                               page,
                                               pageSize,
                                               totalPages,
                                               count,
                                               query,
                                             }: DataTableProps<T>) => {
  // get query params
  const queryAsObject = Array.isArray(query) ? {} : query || {}

  const [sort, setSort] = useState(queryAsObject.sort || 'id,asc')
  const [sortField, sortDirection] = sort.split(',')

  const handleSort = (field: DataTableFields<T>) => {
    const newSort = sortField === field.id ? `${field.id},${sortDirection === 'asc' ? 'desc' : 'asc'}` : `${field.id},asc`
    setSort(newSort)
    router.reload({
      data: {
        ...query,
        page: undefined,
        sort: newSort,
      },
    })
  }

  return (
    <DataTableProvider
      value={{ fields, data, page, pageSize, totalPages, count, query }}>
      <div
        className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 gap-6">
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
                        <Button variant="link"
                                className={'p-0 text-foreground font-medium gap-0'}
                                onClick={() => handleSort(field)}>
                          {field.label}
                          {sortField === field.id && (
                            <span className="ml-1">
                                {sortDirection === 'asc' ? (
                                  <MoveDown />
                                ) : (
                                  <MoveUp />
                                )}
                              </span>
                          )}
                        </Button>
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell key={field.id}>
                      {field.label}
                    </TableCell>
                  )
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
  fields: DataTableFields<T>[];
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  count: number;
  query: Record<string, string>;
}

const DataTableContext = createContext<DataTableContextProps<any> | undefined>(undefined)

export const useDataTableContext = <T extends BaseRow>() => {
  const context = useContext(DataTableContext)
  if (!context) {
    throw new Error('useDataTableContext must be used within a DataTableProvider')
  }
  return context as DataTableContextProps<T>
}

interface DataTableProviderProps<T extends BaseRow> {
  value: DataTableContextProps<T>;
  children: ReactNode;
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
