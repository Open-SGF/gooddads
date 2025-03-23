import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import MediaReleaseForm from '@/Components/Intake/MediaReleaseForm'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'

interface ReleasePageProps extends PageProps {
	participant: Participant
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
