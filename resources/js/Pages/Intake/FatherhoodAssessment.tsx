import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import FatherhoodAssessmentForm from '@/Components/Intake/FatherhoodAssessmentForm'

interface IntakePageProps extends PageProps {
	participant: ParticipantData
}

export const FatherhoodAssessment = ({ participant }: IntakePageProps) => {
	return (
		<IntakeLayout
			title="Fatherhood assessment"
			subtitle="Please fill out the assessmentform"
		>
			<FatherhoodAssessmentForm participant={participant} />
		</IntakeLayout>
	)
}

export default FatherhoodAssessment
