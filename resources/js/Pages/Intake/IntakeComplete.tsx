import React from 'react'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { PageProps, ParticipantData } from '@/types'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'

interface IntakeCompleteProps extends PageProps {
	participant: ParticipantData
}

export const IntakeComplete: React.FC<IntakeCompleteProps> = ({
	participant,
}) => {
	return (
		<IntakeLayout
			title="Intake Complete"
			subtitle={`${participant.user.firstName}, Intake Is Complete`}
		>
			<div className="max-w-[80%] mx-auto [&>*]:w-full [&>div]:max-w-60 items-center flex flex-col gap-6">
				<p className="text-center font-semibold">
					Intake Complete. Please meet with the staff to sign physical copies of
					the forms.
				</p>
				<div className="flex justify-center">
					<Button
						onClick={() => {
							router.post(route('logout'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Sign out
					</Button>
				</div>
				<p className="text-center font-semibold">
					Return and update forms if needed
				</p>

				<div className="flex justify-center w-fit ">
					<Button
						onClick={() => {
							router.get(route('intake.disclosure.index'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Authorization For Disclosure
					</Button>
				</div>
				<div className="flex justify-center ">
					<Button
						onClick={() => {
							router.get(route('intake.fatherhood-assessment.index'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Fatherhood Assessment
					</Button>
				</div>
				<div className="flex justify-center">
					<Button
						onClick={() => {
							router.get(route('intake.fatherhood-survey.index.index'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Fatherhood Survey
					</Button>
				</div>
				<div className="flex justify-center">
					<Button
						onClick={() => {
							router.get(route('intake.service-plan.index'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Service Plan
					</Button>
				</div>
				<div className="flex justify-center">
					<Button
						onClick={() => {
							router.get(route('intake.media-release.index'))
						}}
						className="ms-4 w-full"
						size="default"
						variant="outline"
					>
						Media Release
					</Button>
				</div>
			</div>
		</IntakeLayout>
	)
}

export default IntakeComplete
