import React from 'react'
import { PageProps, ParticipantData } from '@/types'
import type { IntakeDisclosureAuthorizationForm } from '@/types/intake-disclosure-authorization-form'
import { Button } from '@/Components/ui'
import { router } from '@inertiajs/react'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { cn } from '@/lib/utils'

interface DisclosureProps extends PageProps {
	participant: ParticipantData
	disclosureAuthorizations: IntakeDisclosureAuthorizationForm[]
}

export const Index = ({
	participant,
	disclosureAuthorizations,
}: DisclosureProps) => {
	if (disclosureAuthorizations.length === 0) {
		router.visit(route('intake.disclosure.create'))
	}
	return (
		<IntakeLayout
			title="Disclosure Authorizations"
			subtitle={`${participant.user.firstName}, Disclosure authorizations`}
		>
			<div className="grid grid-cols-3 gap-y-3">
				<div className="font-semibold ">Signed Date</div>
				<div className="font-semibold ">Signed Name</div>
				<div className="flex justify-end font-semibold ">Actions</div>
				{disclosureAuthorizations.map((disclosureAuthentication, index) => (
					<React.Fragment key={disclosureAuthentication.id}>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{participant.name}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							{/* {dayjs(disclosureAuthentication.created_at).format('MM/DD/YYYY')} */}
						</div>
						<div className={cn('py-2', index % 2 === 0 ? 'bg-gray-100' : '')}>
							<Button
								onClick={() => {
									router.visit(
										route(
											'intake.disclosure.show',
											disclosureAuthentication.id,
										),
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
										route(
											'intake.disclosure.edit',
											disclosureAuthentication.id,
										),
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
												'intake.disclosure.destroy',
												disclosureAuthentication.id,
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
						router.visit(route('intake.disclosure.create'))
					}}
					className="ms-4"
					size="default"
					variant="outline"
				>
					Create New Disclosure
				</Button>

				{disclosureAuthorizations.length > 0 && (
					<Button
						onClick={() => {
							router.visit(route('intake.fatherhood-assessment.index'))
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
