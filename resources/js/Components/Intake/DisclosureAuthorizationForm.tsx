import React from 'react'
import { router, useForm } from '@inertiajs/react'
import {
	Button,
	Input,
	Checkbox,
	Label,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/Components/ui'
import { IntakeDisclosureAuthorizationForm } from '@/types/intake-disclosure-authorization-form'
import type { ParticipantData } from '@/types'

interface DisclosureAuthorizationFormProps {
	participant: ParticipantData
	disclosureAuthorizationForm?: IntakeDisclosureAuthorizationForm
	viewOnly?: boolean
	nextRoute?: string
}

interface DisclosureAuthorizationFormDefinition
	extends Record<string, string | boolean | null> {
	consumer_name: string
	is_dss_authorized: boolean
	is_fsd_authorized: boolean
	is_dys_authorized: boolean
	is_cd_authorized: boolean
	is_mhd_authorized: boolean
	is_dls_authorized: boolean
	is_dfas_authorized: boolean
	is_mmac_authorized: boolean
	is_other_authorized: boolean
	other_authorized_entity: string

	subject_name: string
	subject_phone: string
	subject_dob: string
	subject_ssn: string
	subject_address: string
	subject_email: string

	disclose_to_attorney: boolean
	attorney_name: string
	disclose_to_employer: boolean
	employer_name: string
	disclose_to_legislator: boolean
	legislator_name: string
	disclose_to_governors_staff: boolean
	governors_staff_details: string
	disclose_to_other_recipient: boolean
	other_recipient_name: string
	other_recipient_address: string

	purpose_eligibility_determination: boolean
	purpose_legal_consultation: boolean
	purpose_legal_proceedings: boolean
	purpose_employment: boolean
	purpose_complaint_investigation: boolean
	purpose_treatment_planning: boolean
	purpose_continuity_of_services: boolean
	purpose_background_investigation: boolean
	purpose_consumer_request: boolean
	purpose_share_and_refer: boolean
	share_and_refer_details: string
	purpose_other: boolean
	other_purpose_details: string

	disclose_entire_file: boolean
	disclose_licensure_information: boolean
	disclose_medical_psychiatric_records: boolean
	disclose_hotline_investigations: boolean
	disclose_home_studies: boolean
	disclose_eligibility_determinations: boolean
	disclose_substance_abuse_treatment: boolean
	disclose_client_employment_records: boolean
	disclose_benefits_received: boolean
	disclose_other_information: boolean
	other_disclosure_details: string

	accept_text_messages: boolean
	consumer_signature: string
	signature_date: string
	witness_signature: string
	witness_signature_date: string
	guardian_signature: string
	guardian_authority: string

	survey_by_email: boolean
	survey_by_mail: boolean
	survey_by_online: boolean
}

export const DisclosureAuthorizationForm: React.FC<
	DisclosureAuthorizationFormProps
> = ({
	participant,
	disclosureAuthorizationForm,
	viewOnly = false,
	nextRoute = 'intake.disclosure.store',
}) => {
	const { data, setData, processing, errors, ...form } =
		useForm<DisclosureAuthorizationFormDefinition>({
			consumer_name:
				disclosureAuthorizationForm?.consumer_name ?? participant?.name ?? '',
			is_dss_authorized: disclosureAuthorizationForm?.is_dss_authorized ?? true,
			is_fsd_authorized: disclosureAuthorizationForm?.is_fsd_authorized ?? true,
			is_dys_authorized:
				disclosureAuthorizationForm?.is_dys_authorized ?? false,
			is_cd_authorized: disclosureAuthorizationForm?.is_cd_authorized ?? false,
			is_mhd_authorized:
				disclosureAuthorizationForm?.is_mhd_authorized ?? false,
			is_dls_authorized:
				disclosureAuthorizationForm?.is_dls_authorized ?? false,
			is_dfas_authorized:
				disclosureAuthorizationForm?.is_dfas_authorized ?? false,
			is_mmac_authorized:
				disclosureAuthorizationForm?.is_mmac_authorized ?? false,
			is_other_authorized:
				disclosureAuthorizationForm?.is_other_authorized ?? false,
			other_authorized_entity:
				disclosureAuthorizationForm?.other_authorized_entity ?? '',

			subject_name:
				disclosureAuthorizationForm?.subject_name ?? participant.name ?? '',
			subject_phone:
				disclosureAuthorizationForm?.subject_phone ??
				participant.homePhoneNumber ??
				'',
			subject_dob: disclosureAuthorizationForm?.subject_dob ?? '',
			subject_ssn: disclosureAuthorizationForm?.subject_ssn ?? '',
			subject_address:
				disclosureAuthorizationForm?.subject_address ??
				participant.addressLine1 ??
				'',
			subject_email:
				disclosureAuthorizationForm?.subject_email ??
				participant.user.email ??
				'',

			disclose_to_attorney:
				disclosureAuthorizationForm?.disclose_to_attorney ?? false,
			attorney_name: disclosureAuthorizationForm?.attorney_name ?? '',
			disclose_to_employer:
				disclosureAuthorizationForm?.disclose_to_employer ?? false,
			employer_name: disclosureAuthorizationForm?.employer_name ?? '',
			disclose_to_legislator:
				disclosureAuthorizationForm?.disclose_to_legislator ?? false,
			legislator_name: disclosureAuthorizationForm?.legislator_name ?? '',
			disclose_to_governors_staff:
				disclosureAuthorizationForm?.disclose_to_governors_staff ?? false,
			governors_staff_details:
				disclosureAuthorizationForm?.governors_staff_details ?? '',
			disclose_to_other_recipient:
				disclosureAuthorizationForm?.disclose_to_other_recipient ?? true,
			other_recipient_name:
				disclosureAuthorizationForm?.other_recipient_name ??
				'Good Dads/Jennifer Baker (and staff)',
			other_recipient_address:
				disclosureAuthorizationForm?.other_recipient_address ??
				'205 W. Walnut Street, Ste. 10, Springfield, MO 65806',

			purpose_eligibility_determination:
				disclosureAuthorizationForm?.purpose_eligibility_determination ?? false,
			purpose_legal_consultation:
				disclosureAuthorizationForm?.purpose_legal_consultation ?? false,
			purpose_legal_proceedings:
				disclosureAuthorizationForm?.purpose_legal_proceedings ?? false,
			purpose_employment:
				disclosureAuthorizationForm?.purpose_employment ?? false,
			purpose_complaint_investigation:
				disclosureAuthorizationForm?.purpose_complaint_investigation ?? false,
			purpose_treatment_planning:
				disclosureAuthorizationForm?.purpose_treatment_planning ?? false,
			purpose_continuity_of_services:
				disclosureAuthorizationForm?.purpose_continuity_of_services ?? false,
			purpose_background_investigation:
				disclosureAuthorizationForm?.purpose_background_investigation ?? false,
			purpose_consumer_request:
				disclosureAuthorizationForm?.purpose_consumer_request ?? false,
			purpose_share_and_refer:
				disclosureAuthorizationForm?.purpose_share_and_refer ?? true,
			share_and_refer_details:
				disclosureAuthorizationForm?.share_and_refer_details ?? 'Good Dads',
			purpose_other: disclosureAuthorizationForm?.purpose_other ?? false,
			other_purpose_details:
				disclosureAuthorizationForm?.other_purpose_details ?? '',

			disclose_entire_file:
				disclosureAuthorizationForm?.disclose_entire_file ?? true,
			disclose_licensure_information:
				disclosureAuthorizationForm?.disclose_licensure_information ?? false,
			disclose_medical_psychiatric_records:
				disclosureAuthorizationForm?.disclose_medical_psychiatric_records ??
				false,
			disclose_hotline_investigations:
				disclosureAuthorizationForm?.disclose_hotline_investigations ?? false,
			disclose_home_studies:
				disclosureAuthorizationForm?.disclose_home_studies ?? false,
			disclose_eligibility_determinations:
				disclosureAuthorizationForm?.disclose_eligibility_determinations ??
				false,
			disclose_substance_abuse_treatment:
				disclosureAuthorizationForm?.disclose_substance_abuse_treatment ??
				false,
			disclose_client_employment_records:
				disclosureAuthorizationForm?.disclose_client_employment_records ??
				false,
			disclose_benefits_received:
				disclosureAuthorizationForm?.disclose_benefits_received ?? true,
			disclose_other_information:
				disclosureAuthorizationForm?.disclose_other_information ?? true,
			other_disclosure_details:
				disclosureAuthorizationForm?.other_disclosure_details ??
				'Child support records that FSD may release to the parent from his/her own case file.',

			accept_text_messages:
				disclosureAuthorizationForm?.accept_text_messages ?? false,
			consumer_signature: disclosureAuthorizationForm?.consumer_signature ?? '',
			signature_date: disclosureAuthorizationForm?.signature_date ?? '',
			witness_signature: disclosureAuthorizationForm?.witness_signature ?? '',
			witness_signature_date:
				disclosureAuthorizationForm?.witness_signature_date ?? '',
			guardian_signature: disclosureAuthorizationForm?.guardian_signature ?? '',
			guardian_authority: disclosureAuthorizationForm?.guardian_authority ?? '',

			survey_by_email: disclosureAuthorizationForm?.survey_by_email ?? false,
			survey_by_mail: disclosureAuthorizationForm?.survey_by_mail ?? false,
			survey_by_online: disclosureAuthorizationForm?.survey_by_online ?? false,
		})

	const continueToNextStep = () => {
		router.visit(route(nextRoute))
	}

	const renderCheckbox = (
		id: string,
		label: string,
		is_checked: boolean,
		is_view_only: boolean,
	) => (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={id}
				checked={is_checked}
				onCheckedChange={(checked) => setData(id, !!checked)}
				disabled={is_view_only}
			/>
			<Label htmlFor={id} className="text-sm font-medium leading-none">
				{label}
			</Label>
		</div>
	)

	const renderConditionalField = (
		id: string,
		checkbox_id: string,
		label: string,
		content: string,
		is_view_only: boolean,
		required = false,
	) => (
		<div className={`ml-6 ${checkbox_id ? 'block' : 'hidden'}`}>
			<Label htmlFor={id} className="text-sm font-medium mb-1 block">
				{label} {required && <span className="text-red-500">*</span>}
			</Label>
			<Input
				id={id}
				value={content}
				onChange={(e) => setData(id, e.target.value)}
				disabled={is_view_only}
				className="w-full"
			/>
			{errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
		</div>
	)

	return (
		<div className="p-4">
			<Card className="w-full">
				<CardHeader className="bg-gray-50">
					<CardTitle className="text-center text-xl">
						AUTHORIZATION FOR DISCLOSURE OF CONFIDENTIAL INFORMATION
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-6">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							if (viewOnly) {
								continueToNextStep()
								return
							}

							if (disclosureAuthorizationForm?.id) {
								form.put(route('intake.disclosure.update'), {
									onSuccess: () => {
										continueToNextStep()
									},
								})
							} else {
								form.post(route('intake.disclosure.store'), {
									onSuccess: () => {
										continueToNextStep()
									},
								})
							}
						}}
					>
						{/* Consumer Information */}
						<div className="space-y-4">
							<div>
								<Label
									htmlFor="consumer_name"
									className="text-sm font-medium mb-1 block"
								>
									I, <span className="text-red-500">*</span>
								</Label>
								<Input
									id="consumer_name"
									value={data.consumer_name}
									onChange={(e) => setData('participant_name', e.target.value)}
									disabled={viewOnly || processing}
									className="w-full"
									placeholder="NAME OF CLIENT, PARENT, GUARDIAN/LEGAL REPRESENTATIVE"
								/>
								{errors.consumer_name && (
									<p className="text-xs text-red-500 mt-1">
										{errors.consumer_name}
									</p>
								)}
								<p className="text-sm text-gray-500 mt-1">
									authorize and request
								</p>
							</div>

							{/* Authorized Entities */}
							<div>
								<p className="font-medium text-sm mb-2">
									Check all that apply:
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										{renderCheckbox(
											'is_dss_authorized',
											'Department of Social Services (DSS)',
											data.is_dss_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_dys_authorized',
											'Division of Youth Services (DYS)',
											data.is_dys_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_mhd_authorized',
											'MO HealthNet Division (MHD)',
											data.is_mhd_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_dfas_authorized',
											'Division of Finance & Administrative Services (DFAS)',
											data.is_dfas_authorized,
											viewOnly || processing,
										)}
									</div>
									<div className="space-y-2">
										{renderCheckbox(
											'is_fsd_authorized',
											'Family Support Division (FSD)',
											data.is_fsd_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_cd_authorized',
											"Children's Division (CD)",
											data.is_cd_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_dls_authorized',
											'Division of Legal Services (DLS)',
											data.is_dls_authorized,
											viewOnly || processing,
										)}
										{renderCheckbox(
											'is_mmac_authorized',
											'Missouri Medicaid Audit and Compliance (MMAC)',
											data.is_mmac_authorized,
											viewOnly || processing,
										)}
									</div>
								</div>

								<div className="mt-4">
									{renderCheckbox(
										'is_other_authorized',
										'Other',
										data.is_other_authorized,
										viewOnly || processing,
									)}
									{renderConditionalField(
										'other_authorized_entity',
										'is_other_authorized',
										'Name of facility, agency, mental health center, person',
										data.other_authorized_entity,
										viewOnly || processing,
										true,
									)}
								</div>
							</div>
						</div>

						{/* Subject Information */}
						<div className="mt-6">
							<p className="text-sm font-medium mb-2">
								to disclose/release the below specified information of:
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label
										htmlFor="subject_name"
										className="text-sm font-medium mb-1 block"
									>
										Name <span className="text-red-500">*</span>
									</Label>
									<Input
										id="subject_name"
										value={data.subject_name}
										onChange={(e) => setData('subject_name', e.target.value)}
										disabled={viewOnly || processing}
										className="w-full"
									/>
									{errors.subject_name && (
										<p className="text-xs text-red-500 mt-1">
											{errors.subject_name}
										</p>
									)}
								</div>

								<div>
									<Label
										htmlFor="subject_phone"
										className="text-sm font-medium mb-1 block"
									>
										Phone <span className="text-red-500">*</span>
									</Label>
									<Input
										id="subject_phone"
										value={data.subject_phone}
										onChange={(e) => setData('subject_phone', e.target.value)}
										disabled={viewOnly || processing}
										className="w-full"
									/>
									{errors.subject_phone && (
										<p className="text-xs text-red-500 mt-1">
											{errors.subject_phone}
										</p>
									)}
								</div>

								<div>
									<Label
										htmlFor="subject_email"
										className="text-sm font-medium mb-1 block"
									>
										Email <span className="text-red-500">*</span>
									</Label>
									<Input
										id="subject_email"
										value={data.subject_email}
										onChange={(e) => setData('subject_email', e.target.value)}
										disabled={viewOnly || processing}
										className="w-full"
									/>
									{errors.subject_email && (
										<p className="text-xs text-red-500 mt-1">
											{errors.subject_email}
										</p>
									)}
								</div>

								<div>
									<Label>Date of Birth</Label>
									<Input
										id="subject_dob"
										type="date"
										placeholder="Date of Birth"
										className="w-full"
										autoComplete="off"
										value={data.subject_dob}
										onChange={(e) => setData('subject_dob', e.target.value)}
									/>
									{errors.subject_dob && (
										<p className="text-xs text-red-500 mt-1">
											{errors.subject_dob}
										</p>
									)}
								</div>

								<div>
									<Label
										htmlFor="subject_ssn"
										className="text-sm font-medium mb-1 block"
									>
										Social Security Number
									</Label>
									<Input
										id="subject_ssn"
										value={data.subject_ssn}
										onChange={(e) => setData('subject_ssn', e.target.value)}
										disabled={viewOnly || processing}
										className="w-full"
									/>
								</div>
							</div>
						</div>

						{/* Recipients */}
						<div className="mt-6">
							<p className="font-medium text-sm mb-2">
								to (check all that apply)
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									{renderCheckbox(
										'disclose_to_attorney',
										'Attorney',
										data.disclose_to_attorney,
										viewOnly || processing,
									)}
									{renderConditionalField(
										'attorney_name',
										'disclose_to_attorney',
										'Name',
										data.attorney_name,
										viewOnly || processing,
									)}

									{renderCheckbox(
										'disclose_to_employer',
										'Employer',
										data.disclose_to_employer,
										viewOnly || processing,
									)}
									{renderConditionalField(
										'employer_name',
										'disclose_to_employer',
										'Name',
										data.employer_name,
										viewOnly || processing,
									)}
								</div>

								<div>
									{renderCheckbox(
										'disclose_to_legislator',
										'Legislator/staff',
										data.disclose_to_legislator,
										viewOnly || processing,
									)}
									{renderConditionalField(
										'legislator_name',
										'disclose_to_legislator',
										'Name',
										data.legislator_name,
										viewOnly || processing,
									)}

									{renderCheckbox(
										'disclose_to_governors_staff',
										"Governor's staff",
										data.disclose_to_governors_staff,
										viewOnly || processing,
									)}
									{renderConditionalField(
										'governors_staff_details',
										'disclose_to_governors_staff',
										'Name',
										data.governors_staff_details,
										viewOnly || processing,
									)}
								</div>
							</div>

							<div className="mt-4">
								{renderCheckbox(
									'disclose_to_other_recipient',
									'Other',
									data.disclose_to_other_recipient,
									viewOnly || processing,
								)}
								{data.disclose_to_other_recipient && (
									<div className="ml-6 space-y-2">
										<div>
											<Label
												htmlFor="other_recipient_name"
												className="text-sm font-medium mb-1 block"
											>
												Name of facility, agency, person
											</Label>
											<Input
												id="other_recipient_name"
												value={data.other_recipient_name}
												onChange={(e) =>
													setData('other_recipient_details', e.target.value)
												}
												disabled={viewOnly || processing}
												className="w-full"
											/>
										</div>

										<div>
											<Label
												htmlFor="other_recipient_address"
												className="text-sm font-medium mb-1 block"
											>
												Address, city, state, zip
											</Label>
											<Input
												id="other_recipient_address"
												value={data.other_recipient_address}
												onChange={(e) =>
													setData('other_recipient_address', e.target.value)
												}
												disabled={viewOnly || processing}
												className="w-full"
											/>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Purpose of Disclosure */}
						<div className="mt-6">
							<p className="font-medium text-sm mb-2 uppercase">
								The purpose of this disclosure is (check all that apply)
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								<div className="space-y-2">
									{renderCheckbox(
										'purpose_eligibility_determination',
										'Eligibility determination',
										data.purpose_eligibility_determination,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_employment',
										'Employment',
										data.purpose_employment,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_continuity_of_services',
										'Continuity of services/care',
										data.purpose_continuity_of_services,
										viewOnly || processing,
									)}
								</div>

								<div className="space-y-2">
									{renderCheckbox(
										'purpose_legal_consultation',
										'Legal consultation/representation',
										data.purpose_legal_consultation,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_complaint_investigation',
										'Complaint/investigation/resolution',
										data.purpose_complaint_investigation,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_background_investigation',
										'Background investigation',
										data.purpose_background_investigation,
										viewOnly || processing,
									)}
								</div>

								<div className="space-y-2">
									{renderCheckbox(
										'purpose_legal_proceedings',
										'Legal proceedings',
										data.purpose_legal_consultation,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_treatment_planning',
										'Treatment planning',
										data.purpose_treatment_planning,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'purpose_consumer_request',
										"At consumer's request",
										data.purpose_consumer_request,
										viewOnly || processing,
									)}
								</div>
							</div>

							<div className="mt-4">
								{renderCheckbox(
									'purpose_share_and_refer',
									'To share or refer my information to other Missouri state agencies (such as DMH, DHSS, DSS, DESE, etc.) to obtain services consistent with the',
									data.purpose_share_and_refer,
									viewOnly || processing,
								)}
								{data.purpose_share_and_refer && (
									<div className="ml-6">
										<Label
											htmlFor="share_and_refer_details"
											className="text-sm font-medium mb-1 block"
										>
											Program name
										</Label>
										<Input
											id="share_and_refer_details"
											value={data.share_and_refer_details}
											onChange={(e) =>
												setData('share_and_refer_details', e.target.value)
											}
											disabled={viewOnly || processing}
											className="w-full"
											placeholder="program (please complete the name of the program in which you want to participate)"
										/>
									</div>
								)}
							</div>

							<div className="mt-4">
								{renderCheckbox(
									'purpose_other',
									'Other (specify)',
									data.purpose_other,
									viewOnly || processing,
								)}
								{renderConditionalField(
									'other_purpose_details',
									'purpose_other',
									'Details',
									data.other_purpose_details,
									viewOnly || processing,
								)}
							</div>
						</div>

						{/* Information to be Disclosed */}
						<div className="mt-6">
							<p className="font-medium text-sm mb-2 uppercase">
								The specific information to be disclosed is (check all that
								apply)
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
								<div className="space-y-2">
									{renderCheckbox(
										'disclose_entire_file',
										'Entire file',
										data.disclose_entire_file,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_licensure_information',
										'Licensure information',
										data.disclose_licensure_information,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_medical_psychiatric_records',
										'Medical/psychiatric evaluation/treatment records',
										data.disclose_medical_psychiatric_records,
										viewOnly || processing,
									)}
								</div>

								<div className="space-y-2">
									{renderCheckbox(
										'disclose_hotline_investigations',
										'Hotline investigations',
										data.disclose_hotline_investigations,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_home_studies',
										'Home studies',
										data.disclose_home_studies,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_client_employment_records',
										'Client employment records',
										data.disclose_client_employment_records,
										viewOnly || processing,
									)}
								</div>

								<div className="space-y-2">
									{renderCheckbox(
										'disclose_eligibility_determinations',
										'Eligibility determinations',
										data.disclose_eligibility_determinations,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_substance_abuse_treatment',
										'Substance abuse treatment',
										data.disclose_substance_abuse_treatment,
										viewOnly || processing,
									)}
									{renderCheckbox(
										'disclose_benefits_received',
										'Benefits received',
										data.disclose_benefits_received,
										viewOnly || processing,
									)}
								</div>
							</div>

							<div className="mt-4">
								{renderCheckbox(
									'disclose_other_information',
									'Other',
									data.disclose_other_information,
									viewOnly || processing,
								)}
								{renderConditionalField(
									'other_disclosure_details',
									'disclose_other_information',
									'Details',
									data.other_disclosure_details,
									viewOnly || processing,
								)}
							</div>
						</div>

						{/* Terms and Authorization */}
						<div className="mt-6 space-y-4">
							<div className="bg-gray-50 p-4 rounded text-sm">
								<ol className="list-decimal pl-5 space-y-2">
									<li>
										<strong>READ CAREFULLY:</strong> I understand that my
										information and records with the Department of Social
										Services are confidential by law. I understand that by
										signing this authorization, I am allowing the release of any
										and all of my information and records which I am authorized
										to receive as specified on this document whether past,
										present or created in the future up to the expiration or
										revocation date of this authorization, unless otherwise
										authorized. The protected information in my records may
										include medical treatment and/or evaluation information,
										mental/behavioral health information, information relating
										to sexually transmitted diseases, acquired immunodeficiency
										syndrome (AIDS), human immunodeficiency virus (HIV), other
										communicable or environmental diseases and conditions,
										alcohol/drug abuse, application for and/or receipt of public
										assistance benefits, alcohol/drug abuse information, and/or
										information concerning child abuse and neglect.
									</li>
									<li>
										This authorization includes both information presently
										compiled and information to be compiled during your
										association or dealings with the Department of Social
										Services, during the specified time frame.
									</li>
									<li>
										Unless otherwise indicated, this authorization becomes
										effective on the date of signature below and will expire one
										year from that date.
									</li>
									<li>
										I understand that I have a right to revoke this
										authorization at any time. I understand that if I revoke
										this authorization I must do so <strong>IN WRITING</strong>{' '}
										and present my written revocation to the Privacy Officer of
										the Department of Social Services at P.O. Box 1527, MO
										65102. I further understand that actions already taken based
										on this authorization, prior to revocation, will{' '}
										<strong>NOT</strong> be affected.
									</li>
									<li>
										I understand that I have the right to receive a copy of this
										authorization upon request.{' '}
										<strong>
											A photographic copy of this authorization is as valid as
											the original.
										</strong>
									</li>
									<li>
										I understand that authorizing the disclosure of this
										information is voluntary. I can refuse to sign this
										authorization. I need not sign this form in order to receive
										services from the Department of Social Services. I
										understand that I may request to inspect or request a copy
										of information to be used or disclosed, as provided in 45
										CFR section 164.524. I understand that any disclosure of
										information carries with it the potential for redisclosure
										by the party receiving it and that the information may no
										longer be protected by law once it is in the possession of
										the receiving party. If I have questions about disclosure of
										my information, I can contact the Privacy Officer of the
										Department of Social Services, my caseworker or family
										support eligibility specialist.
									</li>
									<li>
										By signing this disclosure on paper or electronically, I am
										giving the Family Support Division (FSD) permission to
										deliver, or cause to be delivered, phone calls or text
										messages to me regarding my case from an automated dialing
										system at my primary number. The FSD does not use an
										encryption system when sending text messages. Such
										unencrypted systems are not secure and carry some level of
										risk that text messages could be read by a third party. By
										signing, I am affirming that I nevertheless prefer to
										receive text messages from FSD and understand I do not have
										to consent to this as part of my application and can opt out
										of getting these calls or text messages by checking “No” in
										the “Accept Text Messages” box below
									</li>
								</ol>

								<p className="mt-4">
									My signature below acknowledges that I have read and
									understood the text above, and authorize the release of my
									confidential information.
								</p>
							</div>
						</div>

						{/* Signature Section */}
						<div className="mt-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label
										htmlFor="consumer_signature"
										className="text-sm font-medium mb-1 block"
									>
										Signature of Consumer{' '}
										<span className="text-red-500">*</span>
									</Label>
									<Input
										id="consumer_signature"
										value={data.consumer_signature}
										onChange={(e) =>
											setData('consumer_signature', e.target.value)
										}
										disabled={viewOnly || processing}
										className="w-full"
									/>
									{errors.consumer_signature && (
										<p className="text-xs text-red-500 mt-1">
											{errors.consumer_signature}
										</p>
									)}
								</div>

								<div>
									<Label>Date</Label>
									<Input
										id="signature_date"
										type="date"
										placeholder="Date"
										className="w-full"
										autoComplete="off"
										value={data.signature_date}
										onChange={(e) => setData('signature_date', e.target.value)}
									/>
									{errors.signature_date && (
										<p className="text-xs text-red-500 mt-1">
											{errors.signature_date}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label
										htmlFor="witness_signature"
										className="text-sm font-medium mb-1 block"
									>
										Witness <span className="text-red-500">*</span>
									</Label>
									<Input
										id="witness_signature"
										value={data.witness_signature}
										onChange={(e) =>
											setData('witness_signature', e.target.value)
										}
										disabled={viewOnly || processing}
										className="w-full"
									/>
									{errors.consumer_signature && (
										<p className="text-xs text-red-500 mt-1">
											{errors.witness_signature}
										</p>
									)}
								</div>

								<div>
									<Label>Date</Label>
									<Input
										id="witness_signature_date"
										type="date"
										placeholder="Date"
										className="w-full"
										autoComplete="off"
										value={data.witness_signature_date}
										onChange={(e) =>
											setData('witness_signature_date', e.target.value)
										}
									/>
									{errors.witness_signature_date && (
										<p className="text-xs text-red-500 mt-1">
											{errors.witness_signature_date}
										</p>
									)}
								</div>
							</div>

							<div className="mt-4">
								<div className="grid grid-cols-1 gap-4">
									<div>
										<Label
											htmlFor="guardian_signature"
											className="text-sm font-medium mb-1 block"
										>
											Signature of Parent/Legal Guardian/Representative (if
											applicable)
										</Label>
										<Input
											id="guardian_signature"
											value={data.guardian_signature}
											onChange={(e) =>
												setData('guardian_signature', e.target.value)
											}
											disabled={viewOnly || processing}
											className="w-full"
										/>
									</div>

									<div>
										<Label className="text-sm font-medium mb-1 block">
											Accept Text Messages
										</Label>

										<div className="flex items-center space-x-2">
											<Checkbox
												id="accept_text_messages"
												checked={data.accept_text_messages}
												onCheckedChange={(checked) =>
													setData('accept_text_messages', Boolean(checked))
												}
												disabled={viewOnly || processing}
											/>
											<Label
												htmlFor="accept_text_messages"
												className="text-sm font-medium leading-none"
											>
												Yes
											</Label>
										</div>

										<div className="flex items-center space-x-2">
											<Checkbox
												id="decline_text_messages"
												checked={!data.accept_text_messages}
												onCheckedChange={(checked) =>
													setData('accept_text_messages', Boolean(!checked))
												}
												disabled={viewOnly || processing}
											/>
											<Label
												htmlFor="decline_text_messages"
												className="text-sm font-medium leading-none"
											>
												No
											</Label>
										</div>
									</div>

									<div>
										<Label className="text-sm font-medium mb-1 block">
											(Please include a description of authority to act on
											client's behalf and attach a copy of the Document Granting
											Authority, where applicable.)
										</Label>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<p className="font-medium text-sm mb-2 uppercase">Surveys</p>
							<p className="font-medium text-sm mb-2 uppercase">
								Family Support Division would like to know what services
								enrolled participants are seeking from our programs. In an
								effort to capture this data Family Support Division is
								administering a survey through Survey Monkey. Plase selet the
								preferred mothod of survey delivery:
							</p>
							<div className="grid grid-cols-1 gap-2">
								<div className="space-y-2">
									{renderCheckbox(
										'survey_by_email',
										'Email',
										data.survey_by_email,
										viewOnly || processing,
									)}
								</div>
							</div>
							<div className="grid grid-cols-1 gap-2">
								<div className="space-y-2">
									{renderCheckbox(
										'survey_by_mail',
										'Address',
										data.survey_by_mail,
										viewOnly || processing,
									)}
								</div>
							</div>
							<div className="grid grid-cols-1 gap-2">
								<div className="space-y-2">
									{renderCheckbox(
										'survey_by_online',
										'Online',
										data.survey_by_online,
										viewOnly || processing,
									)}
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
				</CardContent>
			</Card>
		</div>
	)
}

export default DisclosureAuthorizationForm
