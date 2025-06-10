import React from 'react'
import {
	DisclosureContentType,
	DisclosurePurposeType,
	type ParticipantDisclosureAuthorizationForm,
	ParticipantDisclosureAuthorizationProps,
} from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { useForm } from '@inertiajs/react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
} from '@/Components/ui'

export const Create = ({
	purposes,
	contentTypes,
}: ParticipantDisclosureAuthorizationProps) => {
	const { data, setData, errors, ...form } =
		useForm<ParticipantDisclosureAuthorizationForm>()

	const renderCheckbox = (
		id: keyof ParticipantDisclosureAuthorizationForm,
		label: string,
		is_checked: boolean | null,
	) => (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={id}
				checked={!!is_checked}
				onCheckedChange={(checked) => setData(id, !!checked)}
			/>
			<Label htmlFor={id} className="cursor-pointer">
				{label}
			</Label>
		</div>
	)

	const renderPurposeCheckbox = (
		purposeType: DisclosurePurposeType,
		label: string,
	) => {
		const purposeKeys = Object.keys(purposes) as DisclosurePurposeType[]
		const isChecked = purposeKeys.includes(purposeType)
		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`purpose_${purposeType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						if (checked) {
							if (!purposeKeys.includes(purposeType)) {
								purposeKeys.push(purposeType)
							}
						} else {
							const index = purposeKeys.indexOf(purposeType)
							if (index > -1) {
								purposeKeys.splice(index, 1)
							}
						}
						setData('purposes', purposeKeys)
					}}
				/>
				<Label htmlFor={`purpose_${purposeType}`} className="cursor-pointer">
					{label}
				</Label>
			</div>
		)
	}

	const renderContentTypeCheckbox = (
		contentType: DisclosureContentType,
		label: string,
	) => {
		const isChecked = Object.keys(contentTypes).includes(contentType)

		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`content_${contentType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						const contentTypes = [...data.contentTypes]
						if (checked) {
							if (!contentTypes.includes(contentType)) {
								contentTypes.push(contentType)
							}
						} else {
							const index = contentTypes.indexOf(contentType)
							if (index > -1) {
								contentTypes.splice(index, 1)
							}
						}
						setData('contentTypes', contentTypes)
					}}
				/>
				<Label htmlFor={`content_${contentType}`} className="cursor-pointer">
					{label}
				</Label>
			</div>
		)
	}

	const renderConditionalField = (
		id: keyof ParticipantDisclosureAuthorizationForm,
		checkbox_id: keyof ParticipantDisclosureAuthorizationForm,
		label: string,
		content: string | null,
		required = false,
	) => (
		<div className="ml-6 mt-2">
			<div className="space-y-2">
				<Label htmlFor={id}>
					{label}
					{required && <span className="text-red-500">*</span>}
				</Label>
				<Input
					id={id}
					type="text"
					name={id}
					disabled={!data[checkbox_id]}
					value={content || ''}
					onChange={(e) => setData(id, e.target.value)}
					className={errors[id] ? 'border-red-500' : ''}
				/>
				{errors[id] && (
					<p className="mt-1 text-sm text-red-500">{errors[id]}</p>
				)}
			</div>
		</div>
	)

	const renderEnumConditionalField = (
		id: keyof ParticipantDisclosureAuthorizationForm,
		enumValue: string,
		enumArray: keyof ParticipantDisclosureAuthorizationForm,
		label: string,
		content: string | null,
		required = false,
	) => {
		const isChecked = Object.keys(purposes).includes(enumValue)

		return (
			<div className="ml-6 mt-2">
				<div className="space-y-2">
					<Label htmlFor={id}>
						{label}
						{required && <span className="text-red-500">*</span>}
					</Label>
					<Input
						id={id}
						type="text"
						name={id}
						disabled={!isChecked}
						value={content || ''}
						onChange={(e) => setData(id, e.target.value)}
						className={errors[id] ? 'border-red-500' : ''}
					/>
					{errors[id] && (
						<p className="mt-1 text-sm text-red-500">{errors[id]}</p>
					)}
				</div>
			</div>
		)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		form.submit('post', route('intake.disclosure'))
	}

	return (
		<IntakeLayout
			title="Disclosure authorization"
			subtitle="Please sign the authorization disclosure form"
		>
			<form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 p-4">
				<Card>
					<CardHeader>
						<CardTitle>Authorized Entities</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							{renderCheckbox(
								'isDssAuthorized',
								'Department of Social Services (DSS)',
								data.isDssAuthorized,
							)}
							{renderCheckbox(
								'isFsdAuthorized',
								'Family Support Division (FSD)',
								data.isFsdAuthorized,
							)}
							{renderCheckbox(
								'isDysAuthorized',
								'Division of Youth Services (DYS)',
								data.isDysAuthorized,
							)}
							{renderCheckbox(
								'isCdAuthorized',
								"Children's Division (CD)",
								data.isCdAuthorized,
							)}
							{renderCheckbox(
								'isMhdAuthorized',
								'Department of Mental Health (MHD)',
								data.isMhdAuthorized,
							)}
						</div>
						<div className="space-y-2">
							{renderCheckbox(
								'isDlsAuthorized',
								'Division of Legal Services (DLS)',
								data.isDlsAuthorized,
							)}
							{renderCheckbox(
								'isDfasAuthorized',
								'Division of Finance and Administrative Services (DFAS)',
								data.isDfasAuthorized,
							)}
							{renderCheckbox(
								'isMmacAuthorized',
								'Missouri Medicaid Audit and Compliance (MMAC)',
								data.isMmacAuthorized,
							)}
							<div>
								{renderCheckbox(
									'isOtherAuthorized',
									'Other (specify)',
									data.isOtherAuthorized,
								)}
								{renderConditionalField(
									'otherAuthorizedEntity',
									'isOtherAuthorized',
									'Other Entity',
									data.otherAuthorizedEntity,
									true,
								)}
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Recipients</CardTitle>
						<p className="text-sm text-gray-500">
							I authorize the disclosure of information to:
						</p>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-4">
							<div>
								{renderCheckbox(
									'discloseToAttorney',
									'Attorney',
									data.discloseToAttorney,
								)}
								{renderConditionalField(
									'attorneyName',
									'discloseToAttorney',
									'Attorney Name',
									data.attorneyName,
									true,
								)}
							</div>
							<div>
								{renderCheckbox(
									'discloseToEmployer',
									'Employer',
									data.discloseToEmployer,
								)}
								{renderConditionalField(
									'employerName',
									'discloseToEmployer',
									'Employer Name',
									data.employerName,
									true,
								)}
							</div>
						</div>
						<div className="space-y-4">
							<div>
								{renderCheckbox(
									'discloseToLegislator',
									'Legislator',
									data.discloseToLegislator,
								)}
								{renderConditionalField(
									'legislatorName',
									'discloseToLegislator',
									'Legislator Name',
									data.legislatorName,
									true,
								)}
							</div>
							<div>
								{renderCheckbox(
									'discloseToGovernorsStaff',
									"Governor's Staff",
									data.discloseToGovernorsStaff,
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="otherRecipientDetails">
									Other Recipient Details
								</Label>
								<Input
									id="otherRecipientDetails"
									type="text"
									name="otherRecipientDetails"
									value={
										data.otherRecipientDetails ||
										'Good Dads/Jennifer Baker (and staff)'
									}
									onChange={(e) =>
										setData('otherRecipientDetails', e.target.value)
									}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Purpose of Disclosure</CardTitle>
						<p className="text-sm text-gray-500">
							The disclosure is being made for the following purpose(s):
						</p>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							{renderPurposeCheckbox(
								'eligibility_determination',
								'Eligibility Determination',
							)}
							{renderPurposeCheckbox(
								'legal_consultation',
								'Legal Consultation',
							)}
							{renderPurposeCheckbox('legal_proceedings', 'Legal Proceedings')}
							{renderPurposeCheckbox('employment', 'Employment')}
							{renderPurposeCheckbox(
								'complaint_investigation',
								'Complaint/Investigation',
							)}
							{renderPurposeCheckbox(
								'treatment_planning',
								'Treatment Planning',
							)}
						</div>
						<div className="space-y-2">
							{renderPurposeCheckbox(
								'continuity_of_services',
								'Continuity of Services',
							)}
							{renderPurposeCheckbox(
								'background_investigation',
								'Background Investigation',
							)}
							{renderPurposeCheckbox('consumer_request', 'Consumer Request')}
							{renderPurposeCheckbox(
								'share_and_refer',
								'Share and Refer Within the Organization',
							)}
							<div>
								{renderPurposeCheckbox('other', 'Other')}
								{renderEnumConditionalField(
									'otherPurposeDetails',
									'other',
									'purposes',
									'Other Purpose Details',
									data.otherPurposeDetails,
									true,
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Information to be Disclosed</CardTitle>
						<p className="text-sm text-gray-500">
							The following information is to be disclosed:
						</p>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							{renderContentTypeCheckbox('entire_file', 'Entire File')}
							{renderContentTypeCheckbox(
								'licensure_information',
								'Licensure Information',
							)}
							{renderContentTypeCheckbox(
								'medical_psychiatric_records',
								'Medical/Psychiatric Records',
							)}
							{renderContentTypeCheckbox(
								'hotline_investigations',
								'Hotline Investigations',
							)}
							{renderContentTypeCheckbox('home_studies', 'Home Studies')}
						</div>
						<div className="space-y-2">
							{renderContentTypeCheckbox(
								'eligibility_determinations',
								'Eligibility Determinations',
							)}
							{renderContentTypeCheckbox(
								'substance_abuse_treatment',
								'Substance Abuse Treatment',
							)}
							{renderContentTypeCheckbox(
								'client_employment_records',
								'Client Employment Records',
							)}
							{renderContentTypeCheckbox(
								'benefits_received',
								'Benefits Received',
							)}
							<div>
								{renderContentTypeCheckbox('other', 'Other Information')}
								{renderEnumConditionalField(
									'otherDisclosureDetails',
									'other',
									'contentTypes',
									'Other Information Details',
									data.otherDisclosureDetails,
									true,
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Communication Preferences</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-2">
							{renderCheckbox(
								'acceptTextMessages',
								'I agree to receive text messages regarding this authorization',
								data.acceptTextMessages,
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Signatures</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="consumerSignature">
									Consumer Signature <span className="text-red-500">*</span>
								</Label>
								<Input
									id="consumerSignature"
									type="text"
									name="consumerSignature"
									value={data.consumerSignature || ''}
									onChange={(e) => setData('consumerSignature', e.target.value)}
									className={
										errors.consumerSignature ? 'border-red-500' : undefined
									}
								/>
								{errors.consumerSignature && (
									<p className="mt-1 text-sm text-red-500">
										{errors.consumerSignature}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="signatureDate">
									Date <span className="text-red-500">*</span>
								</Label>
								<Input
									id="signatureDate"
									type="date"
									name="signatureDate"
									value={data.signatureDate || ''}
									onChange={(e) => setData('signatureDate', e.target.value)}
									className={
										errors.signatureDate ? 'border-red-500' : undefined
									}
								/>
								{errors.signatureDate && (
									<p className="mt-1 text-sm text-red-500">
										{errors.signatureDate}
									</p>
								)}
							</div>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="witnessSignature">Witness Signature</Label>
								<Input
									id="witnessSignature"
									type="text"
									name="witnessSignature"
									value={data.witnessSignature || ''}
									onChange={(e) => setData('witnessSignature', e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="witnessSignatureDate">
									Witness Signature Date
								</Label>
								<Input
									id="witnessSignatureDate"
									type="date"
									name="witnessSignatureDate"
									value={data.witnessSignatureDate || ''}
									onChange={(e) =>
										setData('witnessSignatureDate', e.target.value)
									}
								/>
							</div>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="guardianSignature">
									Parent/Legal Guardian Signature
								</Label>
								<Input
									id="guardianSignature"
									type="text"
									name="guardianSignature"
									value={data.guardianSignature || ''}
									onChange={(e) => setData('guardianSignature', e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="guardianSignatureDate">
									Parent/Legal Guardian Signature Date
								</Label>
								<Input
									id="guardianSignatureDate"
									type="date"
									name="guardianSignatureDate"
									value={data.guardianSignatureDate || ''}
									onChange={(e) =>
										setData('guardianSignatureDate', e.target.value)
									}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Survey Delivery Methods</CardTitle>
						<p className="text-sm text-gray-500">
							Please select how you would like to receive satisfaction surveys:
						</p>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-4">
						{renderCheckbox('surveyByEmail', 'Email', data.surveyByEmail)}
						{renderCheckbox('surveyByMail', 'Mail', data.surveyByMail)}
						{renderCheckbox('surveyByOnline', 'Online', data.surveyByOnline)}
					</CardContent>
				</Card>
			</form>
		</IntakeLayout>
	)
}

export default Create
