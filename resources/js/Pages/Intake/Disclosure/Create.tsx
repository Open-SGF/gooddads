import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import DisclosureAuthorizationForm from '@/Components/Intake/DisclosureAuthorizationForm'

interface DisclosureProps extends PageProps {
	participant: ParticipantData
}

export const Create = ({ participant }: DisclosureProps) => {
	return (
		<IntakeLayout
			title="Disclosure authorization"
			subtitle="Please sign the authorization disclosure form"
		>
			<DisclosureAuthorizationForm
				participant={participant}
				nextRoute="intake.fatherhood-assessment.index"
			/>
		</IntakeLayout>
	)
}

export default Create
