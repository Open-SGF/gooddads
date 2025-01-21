import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDataTableContext,
} from '@/Components/ui'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ListFilterIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { debounce } from 'lodash-es'
import { Cross2Icon } from '@radix-ui/react-icons'

type FilterItemProps = {
  label: string
  value: string
  filterKey: string
  shouldFocus: boolean
  handleRemoveFilter: (label: string) => void
  handleSetFilters: (
    e: ChangeEvent<HTMLInputElement>,
    label: string,
    value: string,
  ) => void
  handleFilter: () => void
}

export const TableFilter = () => {
  const { fields } = useDataTableContext()

  const query = usePage<PageProps>().props.ziggy.query
  const queryFilters = () => {
    if (query.filters) {
      return Object.fromEntries(
        query.filters.split(',').map((filter) => {
          const [key, value] = filter.split('=')
          const label = fields.find((field) => field.id === key)?.label ?? ''
          return [key, { value, label: label }]
        }),
      )
    }
    return {}
  }
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState(false)
  const [filters, setFilters] = useState<{
    [key: string]: {
      value: string
      label: string
    }
  }>(queryFilters())

  const handleRemoveFilter = useCallback(
    (filterKey: string) => {
      setFilters((prev) => {
        delete prev[filterKey]
        return prev
      })
    },
    [setFilters, filters],
  )

  const handleSetFilters = useCallback(
    (e: ChangeEvent<HTMLInputElement>, label: string, field: string) => {
      const value = e.target.value
      if (!value) return
      setFilters((prev) => {
        prev[field] = {
          value,
          label,
        }
        return prev
      })
    },
    [setFilters],
  )

  const handleFilter = useCallback(() => {
    const filtersString =
      Object.keys(filters).length > 0
        ? Object.entries(filters)
            .map(([key, filter]) => `${key}=${filter.value}`)
            .join(',')
        : undefined
    router.reload({
      data: {
        ...query,
        page: undefined,
        filters: filtersString,
      },
    })
  }, [filters])

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    router.reload({
      data: {
        ...query,
        page: undefined,
        search,
      },
    })
  }, 300)

  return (
    <div className={'flex flex-col gap-3'}>
      <div className={'flex flex-wrap gap-3 align-center'}>
        <Input
          type={'search'}
          placeholder={'Search users...'}
          onChange={handleSearch}
          className={'flex-1'}
          defaultValue={query.search || undefined}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
              onClick={() => {
                setShouldFocus(true)
              }}
            >
              Filter
              <ListFilterIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align={'end'} className="p-0">
            <Command>
              <CommandList>
                <CommandInput className={'my-2'} placeholder="Search columns" />
                <CommandEmpty>No columns found.</CommandEmpty>
                <CommandGroup>
                  {fields
                    .filter((field) => !Object.keys(filters).includes(field.id))
                    .map((field) => (
                      <CommandItem
                        key={field.id}
                        value={field.id}
                        onSelect={() => {
                          setFilters((prev) => {
                            return {
                              ...prev,
                              [field.id]: {
                                value: '',
                                label: field.label,
                              },
                            }
                          })
                          setOpen(false)
                        }}
                      >
                        {field.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {query.search && (
        <div className={'flex items-center gap-2 '}>
          <div className="text-gray-900 dark:text-gray-100">
            Search results for "{query.search}"
          </div>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={() =>
              router.reload({
                data: {
                  ...query,
                  search: undefined,
                },
              })
            }
          >
            <Cross2Icon /> Clear
          </Button>
        </div>
      )}
      <div className={'flex flex-wrap gap-3 align-center'}>
        {Object.keys(filters).length > 0 &&
          Object.entries(filters).map(([key, filter]) => (
            <FilterItem
              key={key}
              label={filter.label}
              value={filter.value}
              filterKey={key}
              shouldFocus={shouldFocus}
              handleRemoveFilter={handleRemoveFilter}
              handleSetFilters={handleSetFilters}
              handleFilter={handleFilter}
            />
          ))}
      </div>
    </div>
  )
}

const FilterItem = ({
  label,
  value,
  filterKey,
  shouldFocus,
  handleRemoveFilter,
  handleSetFilters,
  handleFilter,
}: FilterItemProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input ref on mount unless it's the initial page load
  useEffect(() => {
    if (inputRef.current && shouldFocus) {
      inputRef.current.focus()
    }
  }, [])

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }

  return (
    <div
      className={cn(
        'flex items-center border border-input rounded-md overflow-hidden',
        isFocused ? 'outline-none ring-2 ring-ring ring-offset-2' : '',
      )}
    >
      <div
        className={
          'border-r h-full align-baseline border-input p-2 bg-input text-input-foreground text-sm font-medium user-select-none hover:cursor-pointer'
        }
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </div>
      <input
        ref={inputRef}
        type={'text'}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          handleSetFilters(e, label, filterKey)
          handleFilter()
        }}
        onFocusCapture={() => inputRef.current?.select()}
        onKeyDown={(e) => handleKeyPress(e)}
        defaultValue={value}
        className={cn(
          'flex h-auto max-w-28 border-none bg-background pr-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 field-sizing-content',
        )}
      />
      <div
        className={'p-2 hover:cursor-pointer'}
        onClick={() => {
          handleRemoveFilter(filterKey)
          handleFilter()
        }}
      >
        <XIcon size={18} />
      </div>
    </div>
  )
}
