import React from 'react'
import type { Participant } from '@/types/participant'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'
import { router, useForm } from '@inertiajs/react'
import { Button, Input, InputError, Label } from '@/Components/ui'
import dayjs from 'dayjs'

interface MediaReleaseFormProps {
	participant: Participant
	mediaReleaseForm?: IntakeMediaReleaseForm
	viewOnly?: boolean
	nextRoute?: string
}

interface MediaReleaseFormDefinition extends Record<string, string | null> {
	printed_name: string
	signature: string
	signature_date: string
	phone_number: string
	email: string
}

export const MediaReleaseForm: React.FC<MediaReleaseFormProps> = ({
	participant,
	mediaReleaseForm,
	viewOnly = false,
	nextRoute = 'intake.complete',
}) => {
	const { data, setData, errors, processing, ...form } =
		useForm<MediaReleaseFormDefinition>({
			printed_name: mediaReleaseForm?.printed_name ?? participant?.name ?? '',
			signature: mediaReleaseForm?.signature ?? '',
			signature_date:
				mediaReleaseForm?.signature_date ?? dayjs().format('MM/DD/YYYY') ?? '',
			phone_number:
				mediaReleaseForm?.phone_number ?? participant?.cell_phone_number ?? '',
			email: mediaReleaseForm?.email ?? participant?.user.email ?? '',
		})

	const continueToNextStep = () => {
		router.visit(route(nextRoute))
	}

	window.console.log(mediaReleaseForm)

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				if (viewOnly) {
					continueToNextStep()
					return
				}

				if (mediaReleaseForm?.id) {
					form.put(route('intake.media-release.update'), {
						onSuccess: () => {
							continueToNextStep()
						},
					})
				} else {
					form.post(route('intake.media-release.store'), {
						onSuccess: () => {
							continueToNextStep()
						},
					})
				}
			}}
			className="flex flex-col gap-6 w-full max-w-[80%] mx-auto"
		>
			<div className="flex flex-col gap-y-3">
				<h1>MULTI-MEDIA RELEASE FORM</h1>
				<p>
					Good Dads has my permission to use my photograph, videos, or written
					or spoken statements publicly to promote the Good Dads Organization. I
					understand that the images and statements may be used in print
					publications, online publications, presentations, websites, and social
					media. I also understand that no royalty, fee or other compensation
					shall become payable to me by reason of such use.
				</p>
				<div>
					<Label>Printed Name</Label>
					<Input
						placeholder="Printed Name"
						className="w-full"
						autoComplete="off"
						disabled={viewOnly || processing}
						value={data.printed_name}
						onChange={(e) => setData('printed_name', e.target.value)}
					/>
					<InputError message={errors.printed_name} className="mt-2" />
				</div>

				<div className="flex gap-x-6 w-full ">
					<div className="w-full">
						<Label className={'w-fit '}>Signature</Label>
						<Input
							placeholder="Signature "
							className="w-full"
							autoComplete="off"
							disabled={viewOnly || processing}
							value={data.signature}
							onChange={(e) => setData('signature', e.target.value)}
						/>
						<InputError message={errors.signature} className="mt-2" />
					</div>
					<div>
						<Label>Signature Date</Label>
						<Input
							placeholder="Signature Date"
							className="w-full"
							autoComplete="off"
							disabled={viewOnly || processing}
							value={data.signature_date}
							onChange={(e) => setData('signature_date', e.target.value)}
						/>
						<InputError message={errors.signature_date} className="mt-2" />
					</div>
				</div>
				<div className={'flex gap-6 w-full'}>
					<div>
						<Label>Phone Number</Label>
						<Input
							placeholder="Phone Number"
							className="w-full min-w-[20rem]"
							autoComplete="off"
							disabled={viewOnly || processing}
							value={data.phone_number}
							onChange={(e) => setData('phone_number', e.target.value)}
						/>
						<InputError message={errors.phone_number} className="mt-2" />
					</div>
					<div className="w-full">
						<Label className="w-fit ">Email</Label>
						<Input
							placeholder="Email"
							className="w-full"
							autoComplete="off"
							disabled={viewOnly || processing}
							value={data.email}
							onChange={(e) => setData('email', e.target.value)}
						/>
						<InputError message={errors.email} className="mt-2" />
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<Button
					className="ms-4"
					disabled={processing}
					size="default"
					variant="outline"
				>
					{viewOnly ? 'OK' : 'Save'}
				</Button>
			</div>
		</form>
	)
}

export default MediaReleaseForm
