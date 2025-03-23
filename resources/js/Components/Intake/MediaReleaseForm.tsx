import React from 'react'
import type { Participant } from '@/types/participant'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'
import { useForm } from '@inertiajs/react'

interface MediaReleaseFormProps {
	participant: Participant
	mediaReleaseForm: IntakeMediaReleaseForm
}

interface MediaReleaseFormDefinition extends Record<string, string | null> {
	printed_name: string
	signature: string
	signature_date: string | null
	phone_number: string
	email: string
}

export const MediaReleaseForm: React.FC<MediaReleaseFormProps> = ({
	participant,
	mediaReleaseForm,
}) => {
	const form = useForm<MediaReleaseFormDefinition>({
		printed_name: mediaReleaseForm?.printed_name ?? participant?.name ?? '',
		signature: mediaReleaseForm?.signature ?? '',
		signature_date: mediaReleaseForm?.signature_date ?? null,
		phone_number:
			mediaReleaseForm?.phone_number ?? participant?.cell_phone_number ?? '',
		email: mediaReleaseForm?.email ?? participant?.user.email ?? '',
	})

	return <div className="flex flex-col"></div>
}

export default MediaReleaseForm
