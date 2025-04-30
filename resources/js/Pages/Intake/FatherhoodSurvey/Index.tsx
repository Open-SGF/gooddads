import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import dayjs from 'dayjs'
import { IntakeFatherhoodSurveyFormData as IntakeFatherhoodSurveyForm } from '@/types/intake-fatherhood-survey-form'
import { cn } from '@/lib/utils'

interface SurveyPageProps extends PageProps {
	participant: ParticipantData
	fatherhoodSurveys: IntakeFatherhoodSurveyForm[]
}

export const Index: React.FC<SurveyPageProps> = ({
	participant,
	fatherhoodSurveys,
}) => {
	if (fatherhoodSurveys.length === 0) {
		router.visit(route('intake.fatherhood-survey.create'))
	}

	return (
		<IntakeLayout
			title="Fatherhood Survey"
			subtitle={`${participant.user.firstName}, Fatherhood Survey`}
		>
			<div className="grid grid-cols-2 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{fatherhoodSurveys.map((survey, index) => (
					<React.Fragment key={survey.id}>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{dayjs(survey.created_at).format('MM/DD/YYYY')}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							<Button
								onClick={() => {
									router.visit(
										route('intake.fatherhood-survey.show', survey.id),
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
										route('intake.fatherhood-survey.edit', survey.id),
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
											route('intake.fatherhood-survey.destroy', survey.id),
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
