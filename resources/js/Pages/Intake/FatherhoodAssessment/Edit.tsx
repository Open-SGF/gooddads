import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import IntakeLayout from '@/Layouts/IntakeLayout'
import FatherhoodAssessmentForm from '@/Components/Intake/FatherhoodAssessmentForm'
import type { IntakeFatherhoodAssessmentForm } from '@/types/intake-fatherhood-assessment-form'

interface IntakePageProps extends PageProps {
	participant: Participant
	fatherhoodAssessment: IntakeFatherhoodAssessmentForm
}

export const Create: React.FC<IntakePageProps> = ({
	participant,
	fatherhoodAssessment,
}) => {
	return (
		<IntakeLayout title="Media Release" subtitle="Please sign the release form">
			<FatherhoodAssessmentForm
				participant={participant}
				fatherhoodAssessmentForm={fatherhoodAssessment}
			/>
		</IntakeLayout>
	)
}

export default Create
