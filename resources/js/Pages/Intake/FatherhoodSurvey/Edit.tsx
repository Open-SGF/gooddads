import React from 'react'
import { Head } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { Participant } from '@/types/participant'
import FatherhoodSurveyForm from '@/Components/Intake/FatherhoodSurveyForm'
import type { IntakeFatherhoodSurveyFormData } from '@/types/intake-fatherhood-survey-form'

interface AssessmentPageProps extends PageProps {
	participant: Participant
	fatherhoodSurvey: IntakeFatherhoodSurveyFormData
}

export const Edit: React.FC<AssessmentPageProps> = ({
	auth,
	participant,
	fatherhoodSurvey,
}) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Survey" />
			<FatherhoodSurveyForm
				participant={participant}
				fatherhoodSurvey={fatherhoodSurvey}
			/>
		</AuthenticatedLayout>
	)
}

export default Edit
