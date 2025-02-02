import React from 'react'
import { Button, DataTable } from '@/Components/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { Head, Link } from '@inertiajs/react'
import { type PageProps, User } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { usePermission } from '@/hooks/permissions'

// IntakeIndex

interface IntakeIndexProps extends PageProps {}

export const IntakeIndex: React.FC<IntakeIndexProps> = ({ auth }) => {
	const { hasPermission } = usePermission(auth.user)

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center flex-1">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Participant Registration
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
					<Button>
						<Link href={route('users.create')}>Start New Registration</Link>
					</Button>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default IntakeIndex
