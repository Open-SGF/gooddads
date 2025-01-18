import {
  Table,
  TableBody, TableCell,
  TableHeader,
  TableRow,
} from '@/Components/ui/Table'
import { ReactNode } from 'react'

export type DataTableFields<T extends Record<string, any>> = {
  value: string;
  label: string;
  enabled: boolean;
  content?: (row: T) => ReactNode;
}

export const DataTable = <T extends Record<string, any>>({
                                                           fields,
                                                           data,
                                                         }: {
  fields: DataTableFields<T>[];
  data: T[];
}) => {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {data.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map((field) => {
                if (!field.enabled) {
                  return null
                }

                return (
                  <TableCell key={field.value}>
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
                  if (!field.enabled) {
                    return null
                  }

                  return (
                    <TableCell key={field.value}>
                      {field.content ? field.content(row) : row[field.value]}
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
    </div>
  )
}
