import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import ServicePlanForm from '@/Components/Intake/ServicePlanForm'

interface AssessmentPageProps extends PageProps {
	participant: ParticipantData
}

export const Create: React.FC<AssessmentPageProps> = ({ participant }) => {
	return (
		<IntakeLayout
			title="Service Plan"
			subtitle="Please fill out the service plan"
		>
			<ServicePlanForm participant={participant} />
		</IntakeLayout>
	)
}

export default Create
