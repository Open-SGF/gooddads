import React from 'react'
import { router, useForm } from '@inertiajs/react'
import type { IntakeFatherhoodSurveyFormData } from '@/types/intake-fatherhood-survey-form'
import type { ParticipantData } from '@/types'

interface FatherhoodSurveyFormData
	extends Record<string, string | number | boolean | null> {
	date_of_birth: string
	fatherhood_program: string

	// Reason fields
	reason_become_responsible_father: boolean
	reason_referred: boolean
	reason_court_ordered: boolean
	reason_address_child_support_concerns: boolean
	reason_other: boolean
	reason_other_description: string

	// Referred by fields
	referred_by_word_of_mouth: boolean
	referred_by_past_participant: boolean
	referred_by_family_support_division: boolean
	referred_by_prosecuting_attorney: boolean
	referred_by_marketing: boolean
	referred_by_organization_itself: boolean
	referred_by_other: boolean
	referred_by_other_source: string

	// Expectations fields
	employment_opportunities_expected: boolean
	assistance_with_alcohol_abuse_expected: boolean
	increased_emphasis_on_parenting_skills_expected: boolean
	access_to_mentors_resources_outside_program_expected: boolean
	resume_building_skills_expected: boolean
	free_legal_services_expected: boolean

	assistance_with_criminal_history_expected: boolean
	assistance_with_credit_repair_expected: boolean
	assistance_with_overcoming_homelessness_expected: boolean
	assistance_with_visitation_custody_expected: boolean
	increased_understanding_of_child_support_issues_expected: boolean
	maintaining_hope_for_the_future_expected: boolean
	help_obtaining_information_about_health_wellness_expected: boolean

	other_expected: boolean
	other_expectations_description: string
}

interface FatherhoodSurveyFormProps {
	fatherhoodSurvey?: IntakeFatherhoodSurveyFormData
	participant: ParticipantData
	viewOnly?: boolean
	nextRoute?: string
}

const FatherhoodSurveyForm: React.FC<FatherhoodSurveyFormProps> = ({
	// participant,
	fatherhoodSurvey,
	viewOnly = false,
	nextRoute = 'intake.service-plan.index',
}) => {
	const { data, setData, processing, errors, ...form } =
		useForm<FatherhoodSurveyFormData>({
			fatherhood_program: 'Good Dads', // Default value
			date_of_birth: '',

			// Reason fields - default to false
			reason_become_responsible_father:
				fatherhoodSurvey?.reason_become_responsible_father ?? false,
			reason_referred: fatherhoodSurvey?.reason_referred ?? false,
			reason_court_ordered: fatherhoodSurvey?.reason_court_ordered ?? false,
			reason_address_child_support_concerns:
				fatherhoodSurvey?.reason_address_child_support_concerns ?? false,
			reason_other: fatherhoodSurvey?.reason_other ?? false,
			reason_other_description:
				fatherhoodSurvey?.reason_other_description ?? '',

			// Referred by fields - default to false
			referred_by_word_of_mouth:
				fatherhoodSurvey?.referred_by_word_of_mouth ?? false,
			referred_by_past_participant:
				fatherhoodSurvey?.referred_by_past_participant ?? false,
			referred_by_family_support_division:
				fatherhoodSurvey?.referred_by_family_support_division ?? false,
			referred_by_prosecuting_attorney:
				fatherhoodSurvey?.referred_by_prosecuting_attorney ?? false,
			referred_by_marketing: fatherhoodSurvey?.referred_by_marketing ?? false,
			referred_by_organization_itself:
				fatherhoodSurvey?.referred_by_organization_itself ?? false,
			referred_by_other: fatherhoodSurvey?.referred_by_other ?? false,
			referred_by_other_source:
				fatherhoodSurvey?.referred_by_other_source ?? '',

			// Expectations fields - default to false
			employment_opportunities_expected:
				fatherhoodSurvey?.employment_opportunities_expected ?? false,
			assistance_with_alcohol_abuse_expected:
				fatherhoodSurvey?.assistance_with_alcohol_abuse_expected ?? false,
			increased_emphasis_on_parenting_skills_expected:
				fatherhoodSurvey?.increased_emphasis_on_parenting_skills_expected ??
				false,
			access_to_mentors_resources_outside_program_expected:
				fatherhoodSurvey?.access_to_mentors_resources_outside_program_expected ??
				false,
			resume_building_skills_expected:
				fatherhoodSurvey?.resume_building_skills_expected ?? false,
			free_legal_services_expected:
				fatherhoodSurvey?.free_legal_services_expected ?? false,

			assistance_with_criminal_history_expected:
				fatherhoodSurvey?.assistance_with_criminal_history_expected ?? false,
			assistance_with_credit_repair_expected:
				fatherhoodSurvey?.assistance_with_credit_repair_expected ?? false,
			assistance_with_overcoming_homelessness_expected:
				fatherhoodSurvey?.assistance_with_overcoming_homelessness_expected ??
				false,
			assistance_with_visitation_custody_expected:
				fatherhoodSurvey?.assistance_with_visitation_custody_expected ?? false,
			increased_understanding_of_child_support_issues_expected:
				fatherhoodSurvey?.increased_understanding_of_child_support_issues_expected ??
				false,
			maintaining_hope_for_the_future_expected:
				fatherhoodSurvey?.maintaining_hope_for_the_future_expected ?? false,
			help_obtaining_information_about_health_wellness_expected:
				fatherhoodSurvey?.help_obtaining_information_about_health_wellness_expected ??
				false,
			other_expected: fatherhoodSurvey?.other_expected ?? false,
			other_expectations_description:
				fatherhoodSurvey?.other_expectations_description ?? '',
		})

	const toggleCheckbox = (field: keyof FatherhoodSurveyFormData) => {
		setData(field, !data[field] as boolean)
	}
	const continueToNextStep = () => {
		window.console.log(nextRoute)

		router.visit(route(nextRoute))
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">
				Healthy Marriage and Responsible Fatherhood Survey
			</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault()

					if (viewOnly) {
						continueToNextStep()
						return
					}

					if (fatherhoodSurvey?.id) {
						form.put(
							route('intake.fatherhood-survey.update', [fatherhoodSurvey.id]),
							{
								onSuccess: () => {
									continueToNextStep()
								},
							},
						)
					} else {
						form.post(route('intake.fatherhood-survey.store'), {
							onSuccess: () => {
								continueToNextStep()
							},
						})
					}
				}}
				className="space-y-6"
			>
				{/* Personal Information Section */}
				<div className="bg-white shadow rounded p-4">
					<h2 className="text-lg font-semibold mb-4">Personal Information</h2>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="date_of_birth"
								className="block text-sm font-medium text-gray-700"
							>
								Date of Birth (Optional)
							</label>
							<input
								type="date"
								id="date_of_birth"
								name="date_of_birth"
								value={data.date_of_birth || ''}
								onChange={(e) => setData('date_of_birth', e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
							/>
						</div>
						<div>
							<label
								htmlFor="fatherhood_program"
								className="block text-sm font-medium text-gray-700"
							>
								Fatherhood Program
							</label>
							<input
								type="text"
								id="fatherhood_program"
								name="fatherhood_program"
								disabled={true}
								value={data.fatherhood_program}
								onChange={(e) => setData('fatherhood_program', e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
								required
							/>
							{errors.fatherhood_program && (
								<p className="text-red-500 text-xs mt-1">
									{errors.fatherhood_program}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Reasons Section */}
				<div className="bg-white shadow rounded p-4">
					<h2 className="text-lg font-semibold mb-4">Why are you here?</h2>
					<div className="space-y-2">
						{[
							{
								field: 'reason_become_responsible_father',
								label: 'I want to become a more responsible father',
							},
							{
								field: 'reason_referred',
								label: 'I was referred (ex. From Probation and Parole, etc.)',
							},
							{ field: 'reason_court_ordered', label: 'I was court ordered' },
							{
								field: 'reason_address_child_support_concerns',
								label: 'I want to address my child support concerns',
							},
						].map(({ field, label }) => (
							<div key={field} className="flex items-center">
								<input
									type="checkbox"
									id={field}
									name={field}
									checked={
										data[field as keyof FatherhoodSurveyFormData] as boolean
									}
									onChange={() =>
										toggleCheckbox(field as keyof FatherhoodSurveyFormData)
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor={field}
									className="ml-2 block text-sm text-gray-900"
								>
									{label}
								</label>
							</div>
						))}

						{/* Other Reason */}
						<div className="flex items-center">
							<input
								type="checkbox"
								id="reason_other"
								name="reason_other"
								checked={data.reason_other}
								onChange={() => toggleCheckbox('reason_other')}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="reason_other"
								className="ml-2 block text-sm text-gray-900"
							>
								Other (please specify)
							</label>
						</div>

						<input
							type="text"
							name="reason_other_description"
							value={data.reason_other_description || ''}
							onChange={(e) =>
								setData('reason_other_description', e.target.value)
							}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
							placeholder="Please specify other reason"
							required={data.reason_other}
						/>
					</div>
				</div>

				{/* Referral Source Section */}
				<div className="bg-white shadow rounded p-4">
					<h2 className="text-lg font-semibold mb-4">
						How did you hear about this program?
					</h2>
					<div className="space-y-2">
						{[
							{ field: 'referred_by_word_of_mouth', label: 'Word of Mouth' },
							{
								field: 'referred_by_past_participant',
								label: 'From a Past Participant',
							},
							{
								field: 'referred_by_family_support_division',
								label: 'Family Support Division',
							},
							{
								field: 'referred_by_prosecuting_attorney',
								label: 'Prosecuting Attorney',
							},
							{
								field: 'referred_by_marketing',
								label: 'Marketing (flyers, brochure, social media, etc.)',
							},
							{
								field: 'referred_by_organization_itself',
								label: 'The Organization Itself',
							},
						].map(({ field, label }) => (
							<div key={field} className="flex items-center">
								<input
									type="checkbox"
									id={field}
									name={field}
									checked={
										data[field as keyof FatherhoodSurveyFormData] as boolean
									}
									onChange={() =>
										toggleCheckbox(field as keyof FatherhoodSurveyFormData)
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor={field}
									className="ml-2 block text-sm text-gray-900"
								>
									{label}
								</label>
							</div>
						))}

						{/* Other Referral Source */}
						<div className="flex items-center">
							<input
								type="checkbox"
								id="referred_by_other"
								name="referred_by_other"
								checked={data.referred_by_other}
								onChange={() => toggleCheckbox('referred_by_other')}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="referred_by_other"
								className="ml-2 block text-sm text-gray-900"
							>
								Other (please specify)
							</label>
						</div>

						<input
							type="text"
							name="referred_by_other_source"
							value={data.referred_by_other_source || ''}
							onChange={(e) =>
								setData('referred_by_other_source', e.target.value)
							}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
							placeholder="Please specify other referral source"
							required={data.referred_by_other}
						/>
					</div>
				</div>

				{/* Expectations Section */}
				<div className="bg-white shadow rounded p-4">
					<h2 className="text-lg font-semibold mb-4">
						What do you expect to gain from this program?
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{[
							{
								field: 'employment_opportunities_expected',
								label: 'Employment Opportunities',
							},
							{
								field: 'assistance_with_alcohol_abuse_expected',
								label: 'Assistance with Alcohol/Drug Abuse',
							},
							{
								field: 'increased_emphasis_on_parenting_skills_expected',
								label: 'Increased Emphasis on Parenting Skills',
							},
							{
								field: 'access_to_mentors_resources_outside_program_expected',
								label: 'Access to Mentors/Resources Outside of the Program',
							},
							{
								field: 'resume_building_skills_expected',
								label: 'Resume Building Skills',
							},
							{
								field: 'free_legal_services_expected',
								label: 'Free Legal Services',
							},
							{
								field: 'assistance_with_criminal_history_expected',
								label: 'Assistance w/ Criminal History',
							},
							{
								field: 'assistance_with_credit_repair_expected',
								label: 'Assistance w/ Credit Repair',
							},
							{
								field: 'assistance_with_overcoming_homelessness_expected',
								label: 'Assistance w/ Overcoming Homelessness',
							},
							{
								field: 'assistance_with_visitation_custody_expected',
								label: 'Assistance with Visitation/Custody',
							},
							{
								field:
									'increased_understanding_of_child_support_issues_expected',
								label: 'Increased Understanding of Child Support Issues',
							},
							{
								field: 'maintaining_hope_for_the_future_expected',
								label: 'Maintaining Hope for the Future',
							},
							{
								field:
									'help_obtaining_information_about_health_wellness_expected',
								label: 'Help Obtaining Information About Health/Wellness',
							},
						].map(({ field, label }) => (
							<div key={field} className="flex items-center">
								<input
									type="checkbox"
									id={field}
									name={field}
									checked={
										data[field as keyof FatherhoodSurveyFormData] as boolean
									}
									onChange={() =>
										toggleCheckbox(field as keyof FatherhoodSurveyFormData)
									}
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label
									htmlFor={field}
									className="ml-2 block text-sm text-gray-900"
								>
									{label}
								</label>
							</div>
						))}

						{/* Other Expectations */}
						<div className="flex items-center">
							<input
								type="checkbox"
								id="other_expected"
								name="other_expected"
								checked={data.other_expected}
								onChange={() => toggleCheckbox('other_expected')}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="other_expected"
								className="ml-2 block text-sm text-gray-900"
							>
								Other (please specify)
							</label>
						</div>
					</div>

					<div className="mt-4">
						<input
							type="text"
							name="other_expectations_description"
							value={data.other_expectations_description || ''}
							onChange={(e) =>
								setData('other_expectations_description', e.target.value)
							}
							className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
							placeholder="Please specify other expectations"
							required={data.other_expected}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={processing}
						className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{processing ? 'Submitting...' : 'Submit Survey'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default FatherhoodSurveyForm
