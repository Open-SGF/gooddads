import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import IntakeLayout from '@/Layouts/IntakeLayout'
import FatherhoodAssessmentForm from '@/Components/Intake/FatherhoodAssessmentForm'

interface IntakePageProps extends PageProps {
	participant: Participant
	fatherhoodAssessment: any
}

export const Create: React.FC<IntakePageProps> = ({ participant }) => {
	return (
		<IntakeLayout title="Media Release" subtitle="Please sign the release form">
			<FatherhoodAssessmentForm participant={participant} />
		</IntakeLayout>
	)
}

export default Create
