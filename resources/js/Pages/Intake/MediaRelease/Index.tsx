import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import { cn } from '@/lib/utils'

interface AssessmentPageProps extends PageProps {
	participant: ParticipantData
	mediaReleases: IntakeMediaReleaseForm[]
}

export const Index: React.FC<AssessmentPageProps> = ({
	participant,
	mediaReleases,
}) => {
	if (mediaReleases.length === 0) {
		router.visit(route('intake.media-release.create'))
	}

	return (
		<IntakeLayout
			title="Media Release"
			subtitle={`${participant.user.firstName}, Media Release`}
		>
			<div className="grid grid-cols-3 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="font-semibold ">Signed Name</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{mediaReleases.map((mediaRelease, index) => (
					<React.Fragment key={mediaRelease.id}>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{mediaRelease.signature_date}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{mediaRelease.signature}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							<Button
								onClick={() => {
									router.visit(
										route('intake.media-release.show', mediaRelease.id),
									)
								}}
								className="ms-4"
								size="default"
								variant="outline"
							>
								View
							</Button>
							<Button
								onClick={() => {
									router.visit(
										route('intake.media-release.edit', mediaRelease.id),
									)
								}}
								className="ms-4"
								size="default"
								variant="outline"
							>
								Edit
							</Button>
							<Button
								onClick={() => {
									if (
										confirm(
											'Are you sure you want to delete this media release?',
										)
									) {
										router.delete(
											route('intake.media-release.destroy', mediaRelease.id),
										)
									}
								}}
								className="ms-4"
								size="default"
								variant="outline"
							>
								Delete
							</Button>
						</div>
					</React.Fragment>
				))}
			</div>
			<div className="flex mt-6 gap-2 justify-end border-t pt-3">
				<Button
					onClick={() => {
						router.visit(route('intake.media-release.create'))
					}}
					className="ms-4"
					size="default"
					variant="outline"
				>
					Sign New Release
				</Button>

				{mediaReleases.length > 0 && (
					<Button
						onClick={() => {
							router.visit(route('intake.complete'))
						}}
						className="ms-4"
						size="default"
						variant="outline"
					>
						Continue
					</Button>
				)}
			</div>
		</IntakeLayout>
	)
}

export default Index
