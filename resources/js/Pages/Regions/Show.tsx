import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import { RegionData } from '@/types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from '@/Components/ui'
import { Users, Edit } from 'lucide-react'
import { usePermission } from '@/hooks/permissions'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { forEach } from 'lodash-es'

interface RegionShowProps extends PageProps {
	region: RegionData
}

export default function Show({ auth, region }: RegionShowProps) {
	const { hasPermission } = usePermission(auth.user)
	const [showDeleteRegionDialog, setShowDeleteRegionDialog] = useState(false)

	const handleDeleteRegion = () => {
		console.log('Show.handleDeleteRegion')
		router.delete(route('regions.destroy', region.id), {
			onError: (errors) => {
				forEach(errors, (error) => {
					toast.error('Error', { description: error })
				})
			},
			onFinish: () => {
				setShowDeleteRegionDialog(false)
			},
		})
	}

	return (
		<>
			<AlertDialog
				open={showDeleteRegionDialog}
				onOpenChange={setShowDeleteRegionDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete {region.description}? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteRegion}
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
							Region Details
						</h2>
					</div>
				}
				actions={
					<>
						{hasPermission('delete regions') && (
							<Button
								size="sm"
								variant="destructive"
								onClick={() => setShowDeleteRegionDialog(true)}
							>
								Delete Region
							</Button>
						)}
						{hasPermission('edit regions') && (
							<Button size="sm" asChild>
								<Link href={route('regions.edit', region.id)}>
									<Edit className="w-4 h-4 mr-2" /> Edit Region
								</Link>
							</Button>
						)}
					</>
				}
			>
				<Head title={`${region.description}`} />
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
					<div className="grid md:grid-cols-2 gap-8">
						<div>
							{/* <h3 className="text-lg font-semibold mb-4 border-b pb-2">
								Basic Information
							</h3> */}

							<div className="space-y-4">
								<h3 className="text-lg font-semibold mb-4 border-b pb-2">
									Region
								</h3>
								<div>
									<div className="mt-1">{region.description}</div>
								</div>
							</div>
						</div>
					</div>

					{(region.createdAt || region.updatedAt) && (
						<div className="mt-8">
							<h3 className="text-lg font-semibold mb-4 border-b pb-2">
								System Information
							</h3>

							<div className="grid grid-cols-2 gap-4">
								{region.createdAt && (
									<div>
										<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Created At
										</div>
										<div className="mt-1">{formatDate(region.createdAt)}</div>
									</div>
								)}
								{region.updatedAt && (
									<div>
										<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
											Last Updated
										</div>
										<div className="mt-1">{formatDate(region.updatedAt)}</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</AuthenticatedLayout>
		</>
	)
}
