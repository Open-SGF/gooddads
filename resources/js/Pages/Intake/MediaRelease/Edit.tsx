import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import MediaReleaseForm from '@/Components/Intake/MediaReleaseForm'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'

interface ReleasePageProps extends PageProps {
	participant: ParticipantData
	mediaRelease: IntakeMediaReleaseForm
}

export const Edit: React.FC<ReleasePageProps> = ({
	participant,
	mediaRelease,
}) => {
	return (
		<IntakeLayout
			title="Edit Media Release"
			subtitle="Please sign the release form"
		>
			<MediaReleaseForm
				participant={participant}
				mediaReleaseForm={mediaRelease}
			/>
		</IntakeLayout>
	)
}

export default Edit
