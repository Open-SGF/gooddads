import React from 'react'
import { Head } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { Participant } from '@/types/participant'

interface AssessmentPageProps extends PageProps {
	participant: Participant
}

export const Create: React.FC<AssessmentPageProps> = ({
	auth,
	participant,
}) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Assessment" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					Fatherhood Assessment for {participant.user.first_name}
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default Create
