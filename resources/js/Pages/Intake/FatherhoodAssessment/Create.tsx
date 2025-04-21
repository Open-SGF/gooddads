import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import IntakeLayout from '@/Layouts/IntakeLayout'
import FatherhoodAssessmentForm from '@/Components/Intake/FatherhoodAssessmentForm'

interface IntakePageProps extends PageProps {
	participant: Participant
}

export const Create: React.FC<IntakePageProps> = ({ participant }) => {
	return (
		<IntakeLayout
			title="Fatherhood assessment"
			subtitle="Please fill out the assessmentform"
		>
			<FatherhoodAssessmentForm participant={participant} />
		</IntakeLayout>
	)
}

export default Create
