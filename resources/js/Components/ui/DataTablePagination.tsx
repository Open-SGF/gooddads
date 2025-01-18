import { ButtonGroup } from '@/Components/ui/ButtonGroup'
import { Button } from '@/Components/ui/Button'
import { router } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent, SelectGroup, SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/Select'
import { Label } from '@/Components/ui/Label'
import { PaginationProps } from '@/types'

type DataTablePaginationProps = PaginationProps & {
  query: Record<string, string>
}

export function DataTablePagination({ page, pageSize, totalPages, count, query }: DataTablePaginationProps ) {
  const handlePageSize = (value: string) => {
    router.visit(route('users.list'), {
      method: 'get',
      data: {
        ...query,
        page: undefined,
        pageSize: value,
      },
      preserveScroll: true,
      preserveState: true,
    })
  }

  return (
    <div
      className={'grid [grid-template-columns:1fr_1fr] [grid-template-rows:auto_auto] [grid-template-areas:\'pagination_pagination\'\'results_pagesize\'] gap-4 items-center md:[grid-template-columns:1fr_auto_1fr] md:[grid-template-rows:auto] md:[grid-template-areas:\'results_pagination_pagesize\']'}>
      <div
        className="text-sm font-medium [grid-area:results]">
        Results: {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, count)} of {count}
      </div>
      {totalPages > 1 && (
        <ButtonGroup
          className={'justify-center [grid-area:pagination]'}>

          <Button variant={'outline'}
                  onClick={() => router.visit(route('users.list'), {
                    method: 'get',
                    data: {
                      ...query,
                      page: page - 1,
                    },
                    preserveScroll: true,
                    preserveState: true,
                  })}
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : undefined}
                  className={cn(
                    page <= 1 ? 'pointer-events-none opacity-50' : undefined,
                  )}><ChevronLeft />Prev</Button>
          <Select defaultValue={page.toString()}
                  onValueChange={(value) => {
                    router.visit(route('users.list', {
                      method: 'get',
                      data: {
                        ...query,
                        page: value,
                      },
                      preserveScroll: true,
                      preserveState: true,
                    }))
                  }}>
            <SelectTrigger
              className={'flex gap-1 font-medium z-10 rounded-l-none rounded-r-none border-l-0'}>
              <SelectValue>Page {page} of {totalPages}</SelectValue>
            </SelectTrigger>
            <SelectContent align={'center'}>
              <SelectGroup>
                {Array.from({ length: totalPages }, (_, i) => (
                  <SelectItem key={i}
                              value={(i + 1).toString()}>Page {i + 1}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant={'outline'}
                  onClick={() => router.visit(route('users.list'), {
                    method: 'get',
                    data: {
                      ...query,
                      page: page + 1,
                    },
                    preserveScroll: true,
                    preserveState: true,
                  })}
                  aria-disabled={page === totalPages}
                  tabIndex={page === totalPages ? -1 : undefined}
                  className={cn(
                    page === totalPages ? 'pointer-events-none opacity-50' : undefined,
                  )}>Next<ChevronRight /></Button>
        </ButtonGroup>
      )}
      <div
        className={'flex gap-2 items-center justify-self-end order-3 [grid-area:pagesize]'}>
        <Label htmlFor={'pageSize'} className={'whitespace-nowrap'}>Page
          Size:</Label>
        <Select onValueChange={handlePageSize}
                defaultValue={pageSize.toString()}>
          <SelectTrigger className={'font-medium'}>
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
