import React from 'react'
import { type PageProps } from '@/types'
import { Participant } from '@/types/participant'
import IntakeLayout from '@/Layouts/IntakeLayout'
import DisclosureAuthorizationForm from '@/Components/Intake/DisclosureAuthorizationForm'

interface DisclosureProps extends PageProps {
	participant: Participant
}

export const Create: React.FC<DisclosureProps> = ({ participant }) => {
	return (
		<IntakeLayout title="Disclosure authorization" subtitle="Please sign the authorization disclosure form">
			<DisclosureAuthorizationForm participant={participant} nextRoute='intake.fatherhood-assessment.index'/>
		</IntakeLayout>
	)
}

export default Create
