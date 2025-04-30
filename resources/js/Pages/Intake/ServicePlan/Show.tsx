import React from 'react'
import { Head } from '@inertiajs/react'
import { PageProps, ParticipantData } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface AssessmentPageProps extends PageProps {
	participant: ParticipantData
}

export const Show: React.FC<AssessmentPageProps> = ({ auth, participant }) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Assessment" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					Fatherhood Assessment for {participant.user.firstName}
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default Show
