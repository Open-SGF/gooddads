import React from 'react'
import { type PageProps } from '@/types'
import type { Participant } from '@/types/participant'
import IntakeLayout from '@/Layouts/IntakeLayout'
import type { IntakeMediaReleaseForm } from '@/types/intake-media-release-form'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import { clsx } from 'clsx'
import type { IntakeFatherhoodAssessmentForm } from '@/types/intake-fatherhood-assessment-form'
import dayjs from 'dayjs'

interface AssessmentPageProps extends PageProps {
	participant: Participant
	fatherhoodSurveys: IntakeFatherhoodAssessmentForm[]
}

export const Index: React.FC<AssessmentPageProps> = ({
	participant,
	fatherhoodSurveys,
}) => {
	if (fatherhoodSurveys.length === 0) {
		router.visit(route('intake.fatherhood-assessment.create'))
	}

	return (
		<IntakeLayout
			title="Media Release"
			subtitle={`${participant.user.first_name}, Media Release`}
		>
			<div className="grid grid-cols-3 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="font-semibold ">Signed Name</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{fatherhoodSurveys.map((assessment, index) => (
					<React.Fragment key={assessment.id}>
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{assessment.participant_name}
						</div>
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{dayjs(assessment.created_at).format('MM/DD/YYYY')}
						</div>
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							<Button
								onClick={() => {
									router.visit(
										route('intake.fatherhood-assessment.show', assessment.id),
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
										route('intake.fatherhood-assessment.edit', assessment.id),
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
									confirm('Are you sure you want to delete this?') &&
										router.delete(
											route(
												'intake.fatherhood-assessment.destroy',
												assessment.id,
											),
										)
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
					Create New Assessment
				</Button>

				{fatherhoodSurveys.length > 0 && (
					<Button
						onClick={() => {
							router.visit(route('intake.fatherhood-survey.index'))
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
