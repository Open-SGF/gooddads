import IntakeLayout from '@/Layouts/IntakeLayout'
import { ParticipantDisclosureAuthorizationProps } from '@/types'
import DisclosureForm from '@/Components/Intake/DisclosureForm'

export const Create = (props: ParticipantDisclosureAuthorizationProps) => {
	return (
		<IntakeLayout
			title="Disclosure authorization"
			subtitle="Please sign the authorization disclosure form"
		>
			<DisclosureForm {...props} />
		</IntakeLayout>
	)
}

export default Create
