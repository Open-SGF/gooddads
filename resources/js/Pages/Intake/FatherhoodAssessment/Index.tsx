import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import type { IntakeFatherhoodAssessmentForm } from '@/types/intake-fatherhood-assessment-form'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'

interface AssessmentPageProps extends PageProps {
	participant: ParticipantData
	fatherhoodAssessments: IntakeFatherhoodAssessmentForm[]
}

export const Index: React.FC<AssessmentPageProps> = ({
	participant,
	fatherhoodAssessments,
}) => {
	if (fatherhoodAssessments.length === 0) {
		router.visit(route('intake.fatherhood-assessment.create'))
	}

	return (
		<IntakeLayout
			title="Fatherhood assessments"
			subtitle={`${participant.user.firstName}, Fatherhood assessments`}
		>
			<div className="grid grid-cols-3 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="font-semibold ">Signed Name</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{fatherhoodAssessments.map((assessment, index) => (
					<React.Fragment key={assessment.id}>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{assessment.participant_name}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{dayjs(assessment.created_at).format('MM/DD/YYYY')}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
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
									if (confirm('Are you sure you want to delete this?')) {
										router.delete(
											route(
												'intake.fatherhood-assessment.destroy',
												assessment.id,
											),
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
					Create New Assessment
				</Button>

				{fatherhoodAssessments.length > 0 && (
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
