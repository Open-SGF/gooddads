import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, PaginationProps } from '@/types'
import { Button, DataTable, DataTableFields } from '@/Components/ui'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'
import { DownloadIcon, TrashIcon } from 'lucide-react'
import { json2csv } from 'json-2-csv'
import { UserResource } from '@/types'

export type UsersListPageProps = PageProps &
	PaginationProps & {
		users: UserResource[]
	}

export default function List({ auth, users }: UsersListPageProps) {
	const { hasPermission } = usePermission(auth.user)
	const handleExport = async (data: UserResource[]) => {
		const csv = json2csv(data)
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('download', 'UserExport.csv')
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const fields: DataTableFields<UserResource>[] = [
		{
			fieldKey: 'first_name',
			label: 'First Name',
		},
		{
			fieldKey: 'last_name',
			label: 'Last Name',
		},
		{
			fieldKey: 'email',
			label: 'Email',
		},
		{
			fieldKey: 'permissions',
			label: 'Permissions',
			sort: false,
			content: (row) => {
				return row.permissions
					.map(
						(permission) =>
							permission.charAt(0).toUpperCase() + permission.slice(1),
					)
					.join(', ')
			},
		},
		{
			fieldKey: 'roles',
			label: 'Roles',
			sort: false,
			filter: false,
			content: (row) => {
				return row.roles
					.map((role) => role.charAt(0).toUpperCase() + role.slice(1))
					.join(', ')
			},
		},
		{
			fieldKey: 'actions',
			label: '',
			disabled: !hasPermission('edit users'),
			sort: false,
			filter: false,
			content: () => (
				<Button variant="outline" size="sm">
					<Pencil1Icon href="#" /> Edit
				</Button>
			),
		},
	]

	const tableActions = (disabled: boolean, data: UserResource[]) => [
		<Button
			disabled={disabled}
			onClick={() => handleExport(data)}
			variant="outline"
			key="export"
			size="sm"
		>
			<DownloadIcon /> Export to CSV
		</Button>,
		<Button disabled={disabled} variant="destructive" key="delete" size="sm">
			<TrashIcon href="#" /> Delete
		</Button>,
	]

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center flex-1">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Users
					</h2>

					{hasPermission('create users') && (
						<Button size="sm" asChild>
							<a href={route('users.create')}>
								<PlusIcon /> Create User
							</a>
						</Button>
					)}
				</div>
			}
		>
			<Head title="Users" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<DataTable<UserResource>
						fields={fields}
						data={users}
						allowSelect={true}
						tableActions={tableActions}
					/>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
