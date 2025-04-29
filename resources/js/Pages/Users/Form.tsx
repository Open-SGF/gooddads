import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
} from '@/Components/ui'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, Roles, UserData } from '@/types'
import { useForm } from '@inertiajs/react'
import { Head, router } from '@inertiajs/react'
import React from 'react'
import { Users } from 'lucide-react'

interface ExtendedUserData extends UserData {
	phoneNumber?: string
	active?: boolean
}

interface UserFormProps extends PageProps {
	user?: ExtendedUserData
	roles: Roles[]
}

export default function UserForm({ auth, user, roles }: UserFormProps) {
	const isEditMode = !!user

	const { data, setData, post, put, processing, errors } = useForm({
		first_name: user?.firstName || '',
		last_name: user?.lastName || '',
		email: user?.email || '',
		phone_number: user?.phoneNumber || '',
		active: user?.active !== undefined ? user.active : true,
		roles: user?.roles || [],
		password: '',
		password_confirmation: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (isEditMode) {
			put(route('users.update', user.id), {
				onSuccess: () => {
					router.visit(route('users.list'))
				},
				onError: (errors) => {
					console.error('Error updating user:', errors)
				},
				preserveScroll: true,
			})
		} else {
			post(route('users.store'), {
				onSuccess: () => {
					router.visit(route('users.list'))
				},
				onError: (errors) => {
					console.error('Error creating user:', errors)
				},
			})
		}
	}

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<>
					<Users color="black" size={24} />
					{isEditMode ? 'Edit User' : 'Create User'}
				</>
			}
		>
			<Head title={isEditMode ? 'Edit User' : 'Create User'} />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<Card>
						<CardHeader>
							<CardTitle>
								{isEditMode ? 'Edit User' : 'Create New User'}
							</CardTitle>
							<CardDescription>
								{isEditMode ?
									'Update user information and access rights'
								:	'Enter details to create a new user account'}
							</CardDescription>
						</CardHeader>

						<form onSubmit={handleSubmit}>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<div>
											<Label htmlFor="first_name">First Name</Label>
											<Input
												id="first_name"
												type="text"
												value={data.first_name}
												onChange={(e) => setData('first_name', e.target.value)}
												className="mt-1 block w-full"
												required
											/>
											{errors.first_name && (
												<p className="text-sm text-red-600 mt-1">
													{errors.first_name}
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="last_name">Last Name</Label>
											<Input
												id="last_name"
												type="text"
												value={data.last_name}
												onChange={(e) => setData('last_name', e.target.value)}
												className="mt-1 block w-full"
												required
											/>
											{errors.last_name && (
												<p className="text-sm text-red-600 mt-1">
													{errors.last_name}
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												value={data.email}
												onChange={(e) => setData('email', e.target.value)}
												className="mt-1 block w-full"
												required
											/>
											{errors.email && (
												<p className="text-sm text-red-600 mt-1">
													{errors.email}
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="phone_number">Phone Number</Label>
											<Input
												id="phone_number"
												type="text"
												value={data.phone_number}
												onChange={(e) =>
													setData('phone_number', e.target.value)
												}
												className="mt-1 block w-full"
											/>
											{errors.phone_number && (
												<p className="text-sm text-red-600 mt-1">
													{errors.phone_number}
												</p>
											)}
										</div>

										<div className="flex items-center space-x-2">
											<Checkbox
												id="active"
												checked={data.active}
												onCheckedChange={(checked) =>
													setData('active', checked as boolean)
												}
											/>
											<Label htmlFor="active">Active</Label>
										</div>
									</div>

									<div className="space-y-4">
										<div>
											<Label>Roles</Label>
											<div className="mt-2 space-y-2 border rounded-md p-4">
												{roles.map((role) => (
													<div
														key={role}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`role-${role}`}
															checked={data.roles.includes(role)}
															onCheckedChange={(checked) => {
																if (checked) {
																	setData('roles', [...data.roles, role])
																} else {
																	setData(
																		'roles',
																		data.roles.filter((r) => r !== role),
																	)
																}
															}}
														/>
														<Label htmlFor={`role-${role}`}>
															{role.charAt(0).toUpperCase() + role.slice(1)}
														</Label>
													</div>
												))}
											</div>
											{errors.roles && (
												<p className="text-sm text-red-600 mt-1">
													{errors.roles}
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="password">Password</Label>
											<Input
												id="password"
												type="password"
												value={data.password}
												onChange={(e) => setData('password', e.target.value)}
												className="mt-1 block w-full"
												required={!isEditMode}
											/>
											{errors.password && (
												<p className="text-sm text-red-600 mt-1">
													{errors.password}
												</p>
											)}
											{isEditMode && (
												<p className="text-xs text-gray-500 mt-1">
													Leave blank to keep the current password
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="password_confirmation">
												Confirm Password
											</Label>
											<Input
												id="password_confirmation"
												type="password"
												value={data.password_confirmation}
												onChange={(e) =>
													setData('password_confirmation', e.target.value)
												}
												className="mt-1 block w-full"
												required={!isEditMode}
											/>
										</div>
									</div>
								</div>
							</CardContent>

							<CardFooter className="flex justify-between">
								<Button
									type="button"
									variant="outline"
									onClick={() => window.history.back()}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={processing}>
									{isEditMode ? 'Update User' : 'Create User'}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
