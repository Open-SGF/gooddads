import React from 'react'
import { type PageProps } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import { clsx } from 'clsx'
import type { Participant } from '@/types/participant'
import type { IntakeServicePlanForm } from '@/types/intake-serviceplan-form'

interface AssessmentPageProps extends PageProps {
	participant: Participant
	servicePlans: IntakeServicePlanForm[]
}

export const Index: React.FC<AssessmentPageProps> = ({
	participant,
	servicePlans,
}) => {
	if (servicePlans.length === 0) {
		router.visit(route('intake.service-plan.create'))
	}

	return (
		<IntakeLayout
			title="Service plans"
			subtitle={`${participant.user.first_name}, Service plan`}
		>
			<div className="grid grid-cols-3 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="font-semibold ">Signed Name</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{servicePlans.map((plan, index) => (
					<React.Fragment key={plan.id}>
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{plan.participant_name}
						</div>
						{/* <div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{dayjs(plan.created_at).format('MM/DD/YYYY')}
						</div> */}
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							Service plan object has no created date
						</div>
						<div className={clsx('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							<Button
								onClick={() => {
									router.visit(
										route('intake.fatherhood-assessment.show', plan.id),
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
									router.visit(route('intake.service-plan.edit', plan.id))
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
										router.delete(route('intake.service-plan.destroy', plan.id))
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
						router.visit(route('intake.service-plan.create'))
					}}
					className="ms-4"
					size="default"
					variant="outline"
				>
					Create New Assessment
				</Button>

				{servicePlans.length > 0 && (
					<Button
						onClick={() => {
							router.visit(route('intake.media-release.index'))
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
