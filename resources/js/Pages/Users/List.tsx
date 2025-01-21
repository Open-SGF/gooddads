import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { PageProps, User } from '@/types'
import {
	Button,
	Input,
	Label,
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/Components/ui'
import { Cross2Icon, Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'
import { ChangeEvent } from 'react'
import { debounce } from 'lodash-es'

export type UsersListPageProps = PageProps & {
	users: User[]
	page: number
	pageSize: number
	totalPages: number
	userCount: number
}

export default function List({
	auth,
	users,
	page,
	totalPages,
	ziggy: { query },
}: UsersListPageProps) {
	const { hasPermission } = usePermission(auth.user)
	const { pageSize = 10 } = query

	const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value
		router.get(route('users.list'), {
			...query,
			page: undefined,
			search,
		})
	}, 300)

	const handlePageSize = (value: string) => {
		router.get(route('users.list'), {
			...query,
			page: undefined,
			pageSize: value,
		})
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className={'flex justify-between items-center flex-1'}>
					<h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
						Users
					</h2>

					{hasPermission('create users') && (
						<Button size={'sm'} asChild>
							<a href={route('users.create')}>
								<PlusIcon /> Create User
							</a>
						</Button>
					)}
				</div>
			}
		>
			<Head title='Users' />
			<div className='py-12'>
				<div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
					<div className='flex flex-col bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 gap-6'>
						<div className={'flex gap-3 justify-between'}>
							<Input
								type={'search'}
								placeholder={'Search users...'}
								onChange={handleSearch}
								className={'max-w-64'}
								defaultValue={query.search || undefined}
							/>
							<div className={'flex gap-2 items-center'}>
								<Label htmlFor={'pageSize'} className={'whitespace-nowrap'}>
									Page Size:
								</Label>
								<Select
									onValueChange={handlePageSize}
									defaultValue={pageSize.toString()}
								>
									<SelectTrigger>
										<SelectValue placeholder='Page Size' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='10'>10</SelectItem>
											<SelectItem value='25'>25</SelectItem>
											<SelectItem value='50'>50</SelectItem>
											<SelectItem value='100'>100</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
						{query.search && (
							<div className={'flex items-center gap-2 '}>
								<div className='text-gray-900 dark:text-gray-100'>
									Search results for "{query.search}"
								</div>
								<Button
									variant={'outline'}
									size={'sm'}
									onClick={() =>
										router.get(
											route('users.list', {
												...query,
												search: undefined,
											}),
										)
									}
								>
									<Cross2Icon /> Clear
								</Button>
							</div>
						)}
						<div className='text-gray-900 dark:text-gray-100'>
							{users && users.length > 0 && (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Email</TableHead>
											<TableHead>Roles</TableHead>
											{hasPermission('edit users') && (
												<TableHead className={'w-5'} />
											)}
										</TableRow>
									</TableHeader>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user.id}>
												<TableCell>
													{user.first_name} {user.last_name}
												</TableCell>
												<TableCell>{user.email}</TableCell>
												<TableCell className={'capitalize'}>
													{user.roles.join(', ')}
												</TableCell>
												{hasPermission('edit users') && (
													<TableCell>
														<Button variant={'outline'} size={'sm'}>
															<Pencil1Icon href={'#'} /> Edit
														</Button>
													</TableCell>
												)}
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
							{users && users.length === 0 && (
								<div className='text-center text-gray-500 dark:text-gray-400'>
									No users found.
								</div>
							)}
						</div>
						<div className={'pb-6'}>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											size={'icon'}
											href={`?page=${page - 1}`}
											aria-disabled={page <= 1}
											tabIndex={page <= 1 ? -1 : undefined}
											className={
												page <= 1 ? 'pointer-events-none opacity-50' : undefined
											}
										/>
									</PaginationItem>
									{Array.from({ length: totalPages }, (_, i) => {
										const isActive = i + 1 === page
										return (
											<PaginationItem key={i}>
												<PaginationLink
													href={`?page=${i + 1}`}
													isActive={isActive}
													tabIndex={isActive ? -1 : undefined}
													className={
														isActive ? 'pointer-events-none' : undefined
													}
												>
													{i + 1}
												</PaginationLink>
											</PaginationItem>
										)
									})}
									{/*<PaginationItem>*/}
									{/*  <PaginationEllipsis />*/}
									{/*</PaginationItem>*/}
									<PaginationItem>
										<PaginationNext
											size={'icon'}
											href={`?page=${page + 1}`}
											aria-disabled={page === totalPages}
											tabIndex={page === totalPages ? -1 : undefined}
											className={
												page === totalPages ?
													'pointer-events-none opacity-50'
												:	undefined
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
