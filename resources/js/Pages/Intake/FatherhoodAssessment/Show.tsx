import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import FatherhoodAssessmentForm from '@/Components/Intake/FatherhoodAssessmentForm'
import type { IntakeFatherhoodAssessmentForm } from '@/types/intake-fatherhood-assessment-form'

interface IntakePageProps extends PageProps {
	participant: ParticipantData
	fatherhoodAssessment: IntakeFatherhoodAssessmentForm
}

export const Show: React.FC<IntakePageProps> = ({
	participant,
	fatherhoodAssessment,
}) => {
	return (
		<IntakeLayout title="Media Release" subtitle="Please sign the release form">
			<FatherhoodAssessmentForm
				participant={participant}
				fatherhoodAssessmentForm={fatherhoodAssessment}
				viewOnly={true}
				nextRoute="intake.fatherhood-assessment.index"
			/>
		</IntakeLayout>
	)
}

export default Show
