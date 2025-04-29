import React from 'react'
import { Button } from '@/Components/ui'
import { Head, Link } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface IntakeIndexProps extends PageProps {}

export const IntakeIndex: React.FC<IntakeIndexProps> = ({ auth }) => {
	return (
		<AuthenticatedLayout user={auth.user} header="Participant Registration">
			<Head title="Register New Participant" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<Button>
						<Link href={route('intake.register')}>Start Registration</Link>
					</Button>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default IntakeIndex
