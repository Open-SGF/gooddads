import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import MediaReleaseForm from '@/Components/Intake/MediaReleaseForm'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'

interface ReleasePageProps extends PageProps {
	participant: ParticipantData
	mediaReleaseForm: IntakeMediaReleaseForm
}

export const Create: React.FC<ReleasePageProps> = ({ participant }) => {
	return (
		<IntakeLayout title="Media Release" subtitle="Please sign the release form">
			<MediaReleaseForm participant={participant} />
		</IntakeLayout>
	)
}

export default Create
