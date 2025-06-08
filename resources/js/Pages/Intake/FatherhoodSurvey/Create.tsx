import React from 'react'
import { Head } from '@inertiajs/react'
import { PageProps, ParticipantData } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FatherhoodSurveyForm from '@/Components/Intake/FatherhoodSurveyForm'

interface SurveyPageProps extends PageProps {
	participant: ParticipantData
}

export const Create = ({ auth, participant }: SurveyPageProps) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Survey" />
			<FatherhoodSurveyForm participant={participant} />
		</AuthenticatedLayout>
	)
}

export default Create
