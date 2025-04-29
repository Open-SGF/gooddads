import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import { UserData } from '@/types'
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
import { Users, ArrowLeft, Edit } from 'lucide-react'
import { usePermission } from '@/hooks/permissions'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { forEach } from 'lodash-es'

interface UserShowProps extends PageProps {
	user: UserData
}

export default function Show({ auth, user }: UserShowProps) {
	const { hasPermission } = usePermission(auth.user)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const handleDeleteUser = () => {
		router.delete(route('users.destroy', user.id), {
			onError: (errors) => {
				forEach(errors, (error) => {
					toast.error('Error', { description: error })
				})
			},
			onFinish: () => {
				setShowDeleteDialog(false)
			},
		})
	}

	return (
		<>
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete {user.firstName} {user.lastName}?
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteUser}
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
							User Details
						</h2>
					</div>
				}
				actions={
					<>
						{hasPermission('delete users') && (
							<Button
								size="sm"
								variant="destructive"
								onClick={() => setShowDeleteDialog(true)}
							>
								Delete User
							</Button>
						)}
						{hasPermission('edit users') && (
							<Button size="sm" asChild>
								<Link href={route('users.edit', user.id)}>
									<Edit className="w-4 h-4 mr-2" /> Edit User
								</Link>
							</Button>
						)}
					</>
				}
			>
				<Head title={`User: ${user.firstName} ${user.lastName}`} />

				<div className="py-4">
					<div className="mx-auto sm:px-6 lg:px-8">
						<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-lg font-semibold mb-4 border-b pb-2">
										Basic Information
									</h3>

									<div className="space-y-4">
										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												First Name
											</div>
											<div className="mt-1">{user.firstName}</div>
										</div>

										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												Last Name
											</div>
											<div className="mt-1">{user.lastName}</div>
										</div>

										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												Email
											</div>
											<div className="mt-1">{user.email}</div>
										</div>

										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												Email Verified
											</div>
											<div className="mt-1">
												{user.emailVerifiedAt ?
													<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
														Verified on {formatDate(user.emailVerifiedAt)}
													</span>
												:	<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
														Not verified
													</span>
												}
											</div>
										</div>
									</div>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-4 border-b pb-2">
										Roles & Permissions
									</h3>

									<div className="space-y-4">
										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												Roles
											</div>
											<div className="mt-1 flex flex-wrap gap-1">
												{user.roles.length > 0 ?
													user.roles.map((role) => (
														<span
															key={role}
															className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
														>
															{role.charAt(0).toUpperCase() + role.slice(1)}
														</span>
													))
												:	<span className="text-gray-500">
														No roles assigned
													</span>
												}
											</div>
										</div>

										<div>
											<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
												Permissions
											</div>
											<div className="mt-1 flex flex-wrap gap-1">
												{user.permissions.length > 0 ?
													user.permissions.map((permission) => (
														<span
															key={permission}
															className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
														>
															{permission.charAt(0).toUpperCase() +
																permission.slice(1)}
														</span>
													))
												:	<span className="text-gray-500">
														No permissions assigned
													</span>
												}
											</div>
										</div>
									</div>
								</div>
							</div>

							{(user.createdAt || user.updatedAt) && (
								<div className="mt-8">
									<h3 className="text-lg font-semibold mb-4 border-b pb-2">
										System Information
									</h3>

									<div className="grid grid-cols-2 gap-4">
										{user.createdAt && (
											<div>
												<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
													Created At
												</div>
												<div className="mt-1">{formatDate(user.createdAt)}</div>
											</div>
										)}
										{user.updatedAt && (
											<div>
												<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
													Last Updated
												</div>
												<div className="mt-1">{formatDate(user.updatedAt)}</div>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</AuthenticatedLayout>
		</>
	)
}
