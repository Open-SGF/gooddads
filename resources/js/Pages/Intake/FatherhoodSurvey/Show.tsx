import React from 'react'
import { Head } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import type { Participant } from '@/types/participant'
import type { IntakeFatherhoodSurveyFormData } from '@/types/intake-fatherhood-survey-form'
import FatherhoodSurveyForm from '@/Components/Intake/FatherhoodSurveyForm'

interface AssessmentPageProps extends PageProps {
	participant: Participant
	fatherhoodSurveyForm: IntakeFatherhoodSurveyFormData
}

export const Show: React.FC<AssessmentPageProps> = ({
	auth,
	participant,
	fatherhoodSurveyForm,
}) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Fatherhood Assessment" />
			<FatherhoodSurveyForm
				participant={participant}
				fatherhoodSurvey={fatherhoodSurveyForm}
				viewOnly={true}
				nextRoute={'intake.service-plan.index'}
			/>
		</AuthenticatedLayout>
	)
}

export default Show
