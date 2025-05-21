import { Button, Input, Label } from '@/Components/ui'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, RegionData } from '@/types'
import { useForm } from '@inertiajs/react'
import { Head, router } from '@inertiajs/react'
import React from 'react'
import { Users } from 'lucide-react'

interface RegionFormProps extends PageProps {
	region?: RegionData
	// roles: Roles[]
}

export default function UserForm({ auth, region }: RegionFormProps) {
	const isEditMode = !!region

	const { data, setData, post, put, processing, errors } = useForm({
		description: region?.description || '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (isEditMode) {
			put(route('regions.update', region.id), {
				onSuccess: () => {
					router.visit(route('regions.list'))
				},
				onError: (errors) => {
					console.error('Error updating region:', errors)
				},
				preserveScroll: true,
			})
		} else {
			post(route('regions.store'), {
				onSuccess: () => {
					router.visit(route('regions.list'))
				},
				onError: (errors) => {
					console.error('Error creating region:', errors)
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
					{isEditMode ? 'Edit Region' : 'Create Region'}
				</>
			}
		>
			<Head title={isEditMode ? 'Edit Region' : 'Create Region'} />
			<div className="space-y-6">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<Label htmlFor="description">Region</Label>
								<Input
									id="description"
									type="text"
									value={data.description}
									onChange={(e) => setData('description', e.target.value)}
									className="mt-1 block w-full"
									required
								/>
								{errors.description && (
									<p className="text-sm text-red-600 mt-1">
										{errors.description}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="flex justify-end space-x-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.visit(route('regions.list'))}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={processing}>
							{isEditMode ? 'Update Region' : 'Create Region'}
						</Button>
					</div>
				</form>
			</div>
		</AuthenticatedLayout>
	)
}
