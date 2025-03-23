import React, { useState, useEffect } from 'react'
import { router, useForm } from '@inertiajs/react'

import dayjs from 'dayjs'
import type { IntakeFatherhoodAssessmentForm } from '@/types/intake-fatherhood-assessment-form'
import type { Participant } from '@/types/participant'

// Type for our form data
interface FatherhoodAssessmentForm
	extends Record<string, string | number | boolean | null> {
	vendor_name: string
	participant_name: string
	date_of_birth: string
	social_security_number: string
	is_missouri_resident: boolean
	child_is_under_18: boolean
	is_financially_eligible: boolean
	drivers_license_provided: boolean
	utility_bill_provided: boolean
	pay_stub_provided: boolean
	written_employer_statement_provided: boolean
	social_security_benefits_provided: boolean
	self_attestation_provided: boolean
	unemployment_compensation_provided: boolean
	other_provided: boolean
	other_provided_name: string
	gross_monthly_household_income: number | ''
	number_of_family_members: number | ''
	percentage_of_fpl: number | ''
	approved_for_services: boolean | null
	state_agency_review_date: string
}

interface FatherhoodAssessmentFormProps {
	fatherhoodAssessmentForm?: IntakeFatherhoodAssessmentForm
	participant: Participant
	viewOnly?: boolean
	nextRoute?: string
}

const FatherhoodAssessmentForm: React.FC<FatherhoodAssessmentFormProps> = ({
	participant,
	fatherhoodAssessmentForm,
	viewOnly = false,
	nextRoute = 'intake.fatherhood-survey.index',
}) => {
	const { data, setData, processing, errors, ...form } =
		useForm<FatherhoodAssessmentForm>({
			vendor_name: 'Good Dads', // Default value based on form image
			participant_name:
				fatherhoodAssessmentForm?.participant_name ?? participant?.name ?? '',
			date_of_birth: fatherhoodAssessmentForm?.date_of_birth ?? '',
			social_security_number:
				fatherhoodAssessmentForm?.social_security_number ?? '',
			is_missouri_resident:
				fatherhoodAssessmentForm?.is_missouri_resident ?? true,
			child_is_under_18: fatherhoodAssessmentForm?.child_is_under_18 ?? true,
			is_financially_eligible:
				fatherhoodAssessmentForm?.is_financially_eligible ?? true,
			drivers_license_provided:
				fatherhoodAssessmentForm?.drivers_license_provided ?? false,
			utility_bill_provided:
				fatherhoodAssessmentForm?.utility_bill_provided ?? false,
			pay_stub_provided: fatherhoodAssessmentForm?.pay_stub_provided ?? false,
			written_employer_statement_provided:
				fatherhoodAssessmentForm?.written_employer_statement_provided ?? false,
			social_security_benefits_provided:
				fatherhoodAssessmentForm?.social_security_benefits_provided ?? false,
			self_attestation_provided:
				fatherhoodAssessmentForm?.self_attestation_provided ?? false,
			unemployment_compensation_provided:
				fatherhoodAssessmentForm?.unemployment_compensation_provided ?? false,
			other_provided: fatherhoodAssessmentForm?.other_provided ?? false,
			other_provided_name: fatherhoodAssessmentForm?.other_provided_name ?? '',
			gross_monthly_household_income:
				fatherhoodAssessmentForm?.gross_monthly_household_income ?? '',
			number_of_family_members:
				fatherhoodAssessmentForm?.number_of_family_members ?? '',
			percentage_of_fpl: 0,
			approved_for_services: null,
			state_agency_review_date: '',
		})

	// Calculate FPL percentage when income or family members change
	useEffect(() => {
		if (
			data.gross_monthly_household_income !== '' &&
			data.number_of_family_members !== ''
		) {
			// This is a simplified calculation - in reality you would use the actual FPL guidelines
			// For this example we'll do a simple calculation
			const annualIncome = Number(data.gross_monthly_household_income) * 12
			const baseFPL = 14580 // 2023 base value for 1 person
			const additionalPersonValue = 5140 // Additional amount per person

			const fplThreshold =
				baseFPL +
				(Number(data.number_of_family_members) - 1) * additionalPersonValue
			const fplPercentage = (annualIncome / fplThreshold) * 100

			setData('percentage_of_fpl', parseFloat(fplPercentage.toFixed(2)))
		}
	}, [data.gross_monthly_household_income, data.number_of_family_members])

	// Format SSN as user types (XXX-XX-XXXX)
	const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '')
		if (value.length > 9) {
			value = value.slice(0, 9)
		}

		// Format with hyphens
		if (value.length > 5) {
			value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`
		} else if (value.length > 3) {
			value = `${value.slice(0, 3)}-${value.slice(3)}`
		}

		setData('social_security_number', value)
	}
	const continueToNextStep = () => {
		router.visit(route(nextRoute))
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<form
				onSubmit={(e) => {
					e.preventDefault()

					if (viewOnly) {
						continueToNextStep()
						return
					}

					if (fatherhoodAssessmentForm?.id) {
						form.post(route('intake.fatherhood-assessment.update'), {
							onSuccess: () => {
								continueToNextStep()
							},
						})
					} else {
						form.post(route('intake.fatherhood-assessment.store'), {
							onSuccess: () => {
								continueToNextStep()
							},
						})
					}
				}}
				className="bg-white rounded-lg shadow-md p-6"
			>
				<h1 className="text-2xl font-bold text-center mb-6">
					Healthy Marriage and Responsible Fatherhood Assessment Worksheet
				</h1>

				{/* Vendor Information */}
				<div className="mb-4">
					<label
						htmlFor="vendor_name"
						className="block text-sm font-medium text-gray-700"
					>
						Vendor Name:
					</label>
					<input
						type="text"
						id="vendor_name"
						value={data.vendor_name}
						onChange={(e) => setData('vendor_name', e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{errors.vendor_name && (
						<div className="text-red-500 text-sm mt-1">
							{errors.vendor_name}
						</div>
					)}
				</div>

				{/* Participant Information Section */}
				<div className="mb-6 border rounded-md p-4">
					<h2 className="text-lg font-semibold bg-black text-white p-2 -mx-4 -mt-4 mb-4">
						Participant Information
					</h2>

					<div className="mb-4">
						<label
							htmlFor="participant_name"
							className="block text-sm font-medium text-gray-700"
						>
							Name:
						</label>
						<input
							type="text"
							id="participant_name"
							value={data.participant_name}
							onChange={(e) => setData('participant_name', e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
						{errors.participant_name && (
							<div className="text-red-500 text-sm mt-1">
								{errors.participant_name}
							</div>
						)}
					</div>

					<div className="mb-4">
						<label
							htmlFor="date_of_birth"
							className="block text-sm font-medium text-gray-700"
						>
							Date of Birth:
						</label>
						<input
							type="date"
							id="date_of_birth"
							value={data.date_of_birth}
							onChange={(e) => setData('date_of_birth', e.target.value)}
							max={dayjs().format('YYYY-MM-DD')}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
						{errors.date_of_birth && (
							<div className="text-red-500 text-sm mt-1">
								{errors.date_of_birth}
							</div>
						)}
					</div>

					<div className="mb-4">
						<label
							htmlFor="social_security_number"
							className="block text-sm font-medium text-gray-700"
						>
							Social Security Number:
						</label>
						<input
							type="text"
							id="social_security_number"
							value={data.social_security_number}
							onChange={handleSSNChange}
							placeholder="XXX-XX-XXXX"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
						{errors.social_security_number && (
							<div className="text-red-500 text-sm mt-1">
								{errors.social_security_number}
							</div>
						)}
					</div>
				</div>

				{/* Eligibility Information Section */}
				<div className="mb-6 border rounded-md p-4">
					<h2 className="text-lg font-semibold bg-black text-white p-2 -mx-4 -mt-4 mb-4">
						Eligibility Information
					</h2>

					<div className="mb-4">
						<div className="flex items-center">
							<label className="block text-sm font-medium text-gray-700 mr-4">
								Missouri Resident:
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="is_missouri_resident"
										checked={data.is_missouri_resident}
										onChange={() => setData('is_missouri_resident', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="is_missouri_resident"
										checked={data.is_missouri_resident === false}
										onChange={() => setData('is_missouri_resident', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>
						{errors.is_missouri_resident && (
							<div className="text-red-500 text-sm mt-1">
								{errors.is_missouri_resident}
							</div>
						)}
					</div>

					<div className="mb-4">
						<div className="flex items-center">
							<label className="block text-sm font-medium text-gray-700 mr-4">
								Child under 18 years old:
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="child_is_under_18"
										checked={data.child_is_under_18 === true}
										onChange={() => setData('child_is_under_18', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="child_is_under_18"
										checked={data.child_is_under_18 === false}
										onChange={() => setData('child_is_under_18', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>
						{errors.child_is_under_18 && (
							<div className="text-red-500 text-sm mt-1">
								{errors.child_is_under_18}
							</div>
						)}
					</div>

					<div className="mb-4">
						<div className="flex items-center">
							<label className="block text-sm font-medium text-gray-700 mr-4">
								Financially eligible according to the appropriate income /
								resources standards:
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="is_financially_eligible"
										checked={data.is_financially_eligible === true}
										onChange={() => setData('is_financially_eligible', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="is_financially_eligible"
										checked={data.is_financially_eligible === false}
										onChange={() => setData('is_financially_eligible', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>
						{errors.is_financially_eligible && (
							<div className="text-red-500 text-sm mt-1">
								{errors.is_financially_eligible}
							</div>
						)}
					</div>
				</div>

				{/* Financial Assessment Section */}
				<div className="mb-6 border rounded-md p-4">
					<h2 className="text-lg font-semibold bg-black text-white p-2 -mx-4 -mt-4 mb-4">
						Financial Assessment (Documents Provided)
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Driver's License
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="drivers_license_provided"
										checked={data.drivers_license_provided === true}
										onChange={() => setData('drivers_license_provided', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="drivers_license_provided"
										checked={data.drivers_license_provided === false}
										onChange={() => setData('drivers_license_provided', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Utility Bill
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="utility_bill_provided"
										checked={data.utility_bill_provided === true}
										onChange={() => setData('utility_bill_provided', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="utility_bill_provided"
										checked={data.utility_bill_provided === false}
										onChange={() => setData('utility_bill_provided', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Pay Stub
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="pay_stub_provided"
										checked={data.pay_stub_provided === true}
										onChange={() => setData('pay_stub_provided', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="pay_stub_provided"
										checked={data.pay_stub_provided === false}
										onChange={() => setData('pay_stub_provided', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Written Employer Statement
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="written_employer_statement_provided"
										checked={data.written_employer_statement_provided === true}
										onChange={() =>
											setData('written_employer_statement_provided', true)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="written_employer_statement_provided"
										checked={data.written_employer_statement_provided === false}
										onChange={() =>
											setData('written_employer_statement_provided', false)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Social Security Benefits Statement
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="social_security_benefits_provided"
										checked={data.social_security_benefits_provided === true}
										onChange={() =>
											setData('social_security_benefits_provided', true)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="social_security_benefits_provided"
										checked={data.social_security_benefits_provided === false}
										onChange={() =>
											setData('social_security_benefits_provided', false)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Self-Attestation of No Employment or Income
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="self_attestation_provided"
										checked={data.self_attestation_provided === true}
										onChange={() => setData('self_attestation_provided', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="self_attestation_provided"
										checked={data.self_attestation_provided === false}
										onChange={() => setData('self_attestation_provided', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Unemployment Compensation
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="unemployment_compensation_provided"
										checked={data.unemployment_compensation_provided === true}
										onChange={() =>
											setData('unemployment_compensation_provided', true)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="unemployment_compensation_provided"
										checked={data.unemployment_compensation_provided === false}
										onChange={() =>
											setData('unemployment_compensation_provided', false)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>

						<div className="flex items-center justify-between col-span-2">
							<div className="flex items-center">
								<label className="block text-sm font-medium text-gray-700 mr-2">
									Other:
								</label>
								<input
									type="text"
									value={data.other_provided_name}
									onChange={(e) =>
										setData('other_provided_name', e.target.value)
									}
									className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									disabled={!data.other_provided}
								/>
							</div>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="other_provided"
										checked={data.other_provided === true}
										onChange={() => setData('other_provided', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
										required
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="other_provided"
										checked={data.other_provided === false}
										onChange={() => {
											setData('other_provided', false)
											setData('other_provided_name', '')
										}}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>
						{errors.other_provided_name && (
							<div className="text-red-500 text-sm mt-1 col-span-2">
								{errors.other_provided_name}
							</div>
						)}
					</div>
				</div>

				{/* Poverty Level Section */}
				<div className="mb-6 border rounded-md p-4">
					<h2 className="text-lg font-semibold bg-black text-white p-2 -mx-4 -mt-4 mb-4">
						Poverty Level Percentage Determination (using the provided tool):
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="gross_monthly_household_income"
								className="block text-sm font-medium text-gray-700"
							>
								Gross Monthly Household Income
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span className="text-gray-500 sm:text-sm">$</span>
								</div>
								<input
									type="number"
									id="gross_monthly_household_income"
									value={data.gross_monthly_household_income}
									onChange={(e) =>
										setData(
											'gross_monthly_household_income',
											e.target.value === '' ? '' : parseFloat(e.target.value),
										)
									}
									min="0"
									step="0.01"
									className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									required
								/>
							</div>
							{errors.gross_monthly_household_income && (
								<div className="text-red-500 text-sm mt-1">
									{errors.gross_monthly_household_income}
								</div>
							)}
						</div>

						<div>
							<label
								htmlFor="number_of_family_members"
								className="block text-sm font-medium text-gray-700"
							>
								Number of Family Members in Household
							</label>
							<input
								type="number"
								id="number_of_family_members"
								value={data.number_of_family_members}
								onChange={(e) =>
									setData(
										'number_of_family_members',
										e.target.value === '' ? '' : parseInt(e.target.value),
									)
								}
								min="1"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								required
							/>
							{errors.number_of_family_members && (
								<div className="text-red-500 text-sm mt-1">
									{errors.number_of_family_members}
								</div>
							)}
						</div>

						<div>
							<label
								htmlFor="percentage_of_fpl"
								className="block text-sm font-medium text-gray-700"
							>
								Percentage of FPL
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									type="number"
									id="percentage_of_fpl"
									value={data.percentage_of_fpl}
									onChange={(e) =>
										setData('percentage_of_fpl', parseFloat(e.target.value))
									}
									min="0"
									max="99.99"
									step="0.01"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									readOnly
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
									<span className="text-gray-500 sm:text-sm">%</span>
								</div>
							</div>
							{errors.percentage_of_fpl && (
								<div className="text-red-500 text-sm mt-1">
									{errors.percentage_of_fpl}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* State Agency Section */}
				<div className="mb-6 border rounded-md p-4">
					<h2 className="text-xl font-semibold mb-4 text-center">
						COMPLETED BY STATE AGENCY
					</h2>

					<div className="mb-4">
						<div className="flex items-center">
							<label className="block text-sm font-medium text-gray-700 mr-4">
								Approved for Services:
							</label>
							<div className="flex space-x-4">
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="approved_for_services"
										checked={data.approved_for_services === true}
										onChange={() => setData('approved_for_services', true)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">Yes</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										name="approved_for_services"
										checked={data.approved_for_services === false}
										onChange={() => setData('approved_for_services', false)}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
									/>
									<span className="ml-2">No</span>
								</label>
							</div>
						</div>
					</div>

					<div className="mb-4">
						<label
							htmlFor="state_agency_review_date"
							className="block text-sm font-medium text-gray-700"
						>
							State Agency review date:
						</label>
						<input
							type="date"
							id="state_agency_review_date"
							value={data.state_agency_review_date}
							onChange={(e) =>
								setData('state_agency_review_date', e.target.value)
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
						{errors.state_agency_review_date && (
							<div className="text-red-500 text-sm mt-1">
								{errors.state_agency_review_date}
							</div>
						)}
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={processing}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{processing ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default FatherhoodAssessmentForm
