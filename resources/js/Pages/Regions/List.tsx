import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { PageProps, PaginationProps } from '@/types'
import { Button, DataTable, DataTableFields } from '@/Components/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'
import { DownloadIcon, TrashIcon, EyeIcon } from 'lucide-react'
import { json2csv } from 'json-2-csv'
import { RegionData } from '@/types'
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

export type RegionsListPageProps = PageProps &
	PaginationProps & {
		regions: RegionData[]
	}

export default function List({ auth, regions }: RegionsListPageProps) {
	const { hasPermission } = usePermission(auth.user)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [regionsToDelete, setRegionsToDelete] = useState<RegionData[]>([])

	// Force re-render of DataTable to clear selections
	const [dataTableKey, setDataTableKey] = useState(0)

	const handleExport = async (data: RegionData[]) => {
		const csv = json2csv(data)
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('download', 'RegionExport.csv')
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const handleDeleteRegions = () => {
		if (regionsToDelete.length > 0) {
			const userIds = regionsToDelete.map((region) => region.id)
			router.delete(route('users.destroyMultiple'), {
				data: { user_ids: userIds },
				onSuccess: () => {
					setRegionsToDelete([])
					setDataTableKey((prevKey) => prevKey + 1)
				},
				onFinish: () => {
					setShowDeleteDialog(false)
				},
			})
		}
	}

	const fields: DataTableFields<RegionData>[] = [
		{
			fieldKey: 'description',
			databaseField: 'description',
			label: 'Region',
		},
		
	]

	const tableActions = (disabled: boolean, data: RegionData[]) => [
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
					setRegionsToDelete([...data])
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
							{regionsToDelete.length === 1 ?
								'this region'
							:	`these ${regionsToDelete.length} regions`}
							? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteRegions}
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
					<>
						<Users color="black" size={24} />
						REgions
					</>
				}
				actions={
					<Button size="sm" asChild>
						<a href={route('regions.create')}>
							<PlusIcon /> Create Region
						</a>
					</Button>
				}
			>
				<Head title="Regions" />
				<DataTable
					key={dataTableKey}
					fields={fields}
					data={regions}
					allowSelect={true}
					rowSelect={true}
					tableActions={tableActions}
				/>
			</AuthenticatedLayout>
		</>
	)
}
