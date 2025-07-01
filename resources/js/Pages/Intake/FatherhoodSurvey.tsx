import React from 'react'
import { Head } from '@inertiajs/react'
import { PageProps, ParticipantData } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FatherhoodSurveyForm from '@/Components/Intake/FatherhoodSurveyForm'

type SurveyPageProps = Omit<PageProps, 'auth'> & {
	participant: ParticipantData
	auth: {
		user: NonNullable<PageProps['auth']['user']>
	}
}

export const FatherhoodSurvey = ({ auth, participant }: SurveyPageProps) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Survey" />
			<FatherhoodSurveyForm participant={participant} />
		</AuthenticatedLayout>
	)
}

export default FatherhoodSurvey
