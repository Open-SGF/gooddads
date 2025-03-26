import React from 'react'
import { Head } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { Participant } from '@/types/participant'
import FatherhoodSurveyForm from '@/Components/Intake/FatherhoodSurveyForm'

interface SurveyPageProps extends PageProps {
	participant: Participant
}

export const Create: React.FC<SurveyPageProps> = ({ auth, participant }) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Survey" />
			<FatherhoodSurveyForm participant={participant} />
		</AuthenticatedLayout>
	)
}

export default Create
