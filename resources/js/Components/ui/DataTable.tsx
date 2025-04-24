import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '@/Components/ui/Table'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Button } from '@/Components/ui/Button'
import { Checkbox, TableFilter } from '@/Components/ui'
import { DataTablePagination } from '@/Components/ui/DataTablePagination'
import { router, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { UsersListPageProps } from '@/Pages/Users/List'

export type BaseRow = {
	id: string
}

type DataTableProps<T> = {
	fields: DataTableFields<T>[]
	data: T[]
	allowSelect?: boolean
	tableActions?: (disabled: boolean, rows: T[]) => ReactNode[]
}

type BaseDataTableFields = {
	label: string
	disabled?: boolean
	sort?: boolean
	filter?: boolean
	export?: boolean
	databaseField?: string
}

export type DataTableFields<T> =
	| (BaseDataTableFields & {
			fieldKey: Extract<keyof T, string>
			content?: (row: T) => ReactNode
	  })
	| (BaseDataTableFields & {
			fieldKey: 'actions'
			content: (row: T) => ReactNode
	  })

export const DataTable = <T extends BaseRow>({
	fields,
	data,
	allowSelect = false,
	tableActions,
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
	const [selectAll, setSelectAll] = useState(false)
	const [selectedRows, setSelectedRows] = useState<T[]>([])

	const tableActionsDisabled = selectedRows.length === 0

	const handleSort = (field: DataTableFields<T>) => {
		const newSort =
			(
				sortField === (field.databaseField ?? field.fieldKey) &&
				sortDirection === 'desc'
			) ?
				''
			:	`${field.databaseField ?? field.fieldKey},${sortField === (field.databaseField ?? field.fieldKey) ? 'desc' : 'asc'}`
		setSort(newSort)
		router.reload({
			data: {
				...query,
				page: undefined,
				sort: newSort || undefined,
			},
		})
	}

	const handleSelectAll = () => {
		setSelectAll(!selectAll)
		if (!selectAll) {
			setSelectedRows(data)
		} else {
			setSelectedRows([])
		}
	}

	const handleSelectRow = (id: string) => {
		if (selectedRows.map((row) => row.id).includes(id)) {
			setSelectedRows(selectedRows.filter((row) => row.id !== id))
		} else {
			setSelectedRows([...selectedRows, data.find((row) => row.id === id)!])
		}
	}

	return (
		<DataTableProvider
			value={{ fields, data, page, pageSize, totalPages, count, query }}
		>
			<div className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden sm:rounded-lg gap-6">
				<TableFilter />
				{tableActions && (
					<div className="flex items-center gap-3">
						{tableActions(tableActionsDisabled, selectedRows)}
					</div>
				)}
				{data.length > 0 && (
					<Table>
						<TableHeader className="font-medium bg-gray-100">
							<TableRow>
								{allowSelect && (
									<TableCell key="select">
										<div className="flex items-center">
											<Checkbox
												checked={selectAll}
												onCheckedChange={handleSelectAll}
											/>
										</div>
									</TableCell>
								)}
								{fields.map((field) => {
									if (field.disabled) {
										return null
									}

									if (field.sort === false) {
										return (
											<TableCell
												className="whitespace-nowrap"
												key={field.fieldKey}
											>
												{field.label}
											</TableCell>
										)
									}

									return (
										<TableCell key={field.fieldKey}>
											<Button
												variant="link"
												className="p-0 text-foreground font-medium gap-2"
												onClick={() => handleSort(field)}
											>
												{field.label}
												<SortingIcon
													direction={sortDirection}
													isSorted={sortField === field.fieldKey}
												/>
											</Button>
										</TableCell>
									)
								})}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((row) => (
								<TableRow key={row.id}>
									{allowSelect && (
										<TableCell key="select">
											<div className="flex items-center">
												<Checkbox
													checked={selectedRows
														.map((row) => row.id)
														.includes(row.id)}
													onCheckedChange={() => handleSelectRow(row.id)}
												/>
											</div>
										</TableCell>
									)}
									{fields.map((field) => {
										if (field.disabled) {
											return null
										}

										return (
											<TableCell key={field.fieldKey}>
												{field.content ?
													field.content(row)
												: field.fieldKey === 'actions' ?
													null
												:	(row[field.fieldKey] as ReactNode)}
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

interface DataTableContextProps<T extends Record<string, unknown>> {
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
				isSorted && direction === 'asc' ?
					'[&>path:nth-child(1)]:stroke-[hsl(var(--primary))]'
				:	'[&>path:nth-child(1)]:stroke-current',
				isSorted && direction === 'desc' ?
					'[&>path:nth-child(2)]:stroke-[hsl(var(--primary))]'
				:	'[&>path:nth-child(2)]:stroke-current',
			)}
		>
			<path d="m7 9 5-5 5 5" />
			<path d="m7 15 5 5 5-5" />
		</svg>
	)
}
