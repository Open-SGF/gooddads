import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { PageProps, PaginationProps } from '@/types'
import { Button, DataTable, DataTableFields } from '@/Components/ui'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'
import { DownloadIcon, TrashIcon } from 'lucide-react'
import { json2csv } from 'json-2-csv'
import { UserData } from '@/types'
import { Users } from 'lucide-react'
import { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/Components/ui/AlertDialog'
import { toast } from 'sonner'
import { forEach } from 'lodash-es'

export type UsersListPageProps = PageProps &
	PaginationProps & {
		users: UserData[]
	}

export default function List({ auth, users }: UsersListPageProps) {
	const { hasPermission } = usePermission(auth.user)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [usersToDelete, setUsersToDelete] = useState<UserData[]>([])
    
    // Force re-render of DataTable to clear selections
    const [dataTableKey, setDataTableKey] = useState(0)

	const handleExport = async (data: UserData[]) => {
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

	const handleDeleteUsers = () => {
		if (usersToDelete.length > 0) {
			const userIds = usersToDelete.map((user) => user.id)
			router.delete(route('users.destroyMultiple'), {
				data: { user_ids: userIds },
				onSuccess: (page) => {
					// Type cast to access the toast message
					const message = (page?.props as any)?.toast?.message || 'Users deleted successfully'
					toast.success('Success', {
						description: message,
					})
					setShowDeleteDialog(false)
					setUsersToDelete([])
                    
                    // Force DataTable to reset by changing its key
                    setDataTableKey(prevKey => prevKey + 1)
				},
				onError: (errors) => {
					forEach(errors, (error) => {
						toast.error('Error', { description: error })
					})
					setShowDeleteDialog(false)
				},
			})
		}
	}

	const fields: DataTableFields<UserData>[] = [
		{
			fieldKey: 'firstName',
			databaseField: 'first_name',
			label: 'First Name',
		},
		{
			fieldKey: 'lastName',
			databaseField: 'last_name',
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
			content: (row) => (
				<Button variant="outline" size="sm" asChild>
					<a href={route('users.edit', row.id)}>
						<Pencil1Icon /> Edit
					</a>
				</Button>
			),
		},
	]

	const tableActions = (disabled: boolean, data: UserData[]) => [
		<Button
			disabled={disabled}
			onClick={() => handleExport(data)}
			variant="outline"
			key="export"
			size="sm"
		>
			<DownloadIcon /> Export to CSV
		</Button>,
		<Button
			disabled={disabled || !hasPermission('delete users')}
			variant="destructive"
			key="delete"
			size="sm"
			onClick={() => {
				if (data.length > 0) {
					// Create a fresh copy of the array
					setUsersToDelete([...data])
					setShowDeleteDialog(true)
				}
			}}
		>
			<TrashIcon /> Delete
		</Button>,
	]

	return (
		<>
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{' '}
							{usersToDelete.length === 1 ?
								'this user'
							:	`these ${usersToDelete.length} users`}
							? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteUsers}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AuthenticatedLayout
				user={auth.user}
				header={
					<div className="flex justify-between items-center flex-1 gap-6">
						<h2 className="inline-flex gap-4 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
							<Users color="black" size={24} />
							Users
						</h2>

						<Button size="sm" asChild>
							<a href={route('users.create')}>
								<PlusIcon /> Create User
							</a>
						</Button>
					</div>
				}
			>
				<Head title="Users" />
				<div className="py-12">
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<DataTable
							key={dataTableKey}
							fields={fields}
							data={users}
							allowSelect={true}
							tableActions={tableActions}
						/>
					</div>
				</div>
			</AuthenticatedLayout>
		</>
	)
}
