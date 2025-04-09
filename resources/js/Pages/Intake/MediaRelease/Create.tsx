import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import MediaReleaseForm from '@/Components/Intake/MediaReleaseForm'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'

interface ReleasePageProps extends PageProps {
	participant: Participant
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
