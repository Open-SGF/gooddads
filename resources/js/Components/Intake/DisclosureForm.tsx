import React from 'react'
// import { useForm, useInertiaForm } from '@/Context/FormContext'
import {
	DisclosureContentType,
	DisclosurePurposeType,
	ParticipantDisclosureAuthorizationProps,
	PostDisclosureAuthorizationData,
} from '@/types'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
} from '@/Components/ui'
import CheckboxField from '../form/CheckboxField'
import { FormProvider } from '@/Context/FormContext'
import { useForm } from '@inertiajs/react'

export default function DisclosureForm({
	purposes,
	contentTypes,
}: ParticipantDisclosureAuthorizationProps) {
	const inertiaForm = useInertiaForm<PostDisclosureAuthorizationData>()

	return (
		<FormProvider initialValues={inertiaForm.data} preserveState={true}>
			<DisclosureFormContent purposes={purposes} contentTypes={contentTypes} />
		</FormProvider>
	)
}

function DisclosureFormContent({
	purposes,
	contentTypes,
}: ParticipantDisclosureAuthorizationProps) {
	const { data, setData, errors, post } =
		useForm<PostDisclosureAuthorizationData>()

	const renderPurposeCheckbox = (
		purposeType: DisclosurePurposeType,
		label: string,
	) => {
		const selectedPurposes: DisclosurePurposeType[] = data.purposes ?? []
		const isChecked = selectedPurposes.includes(purposeType)
		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`purpose_${purposeType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						const updatedPurposes =
							checked ?
								[...new Set([...selectedPurposes, purposeType])]
							:	selectedPurposes.filter((p) => p !== purposeType)

						setData('purposes', updatedPurposes)
					}}
				/>
				<Label htmlFor={`purpose_${purposeType}`} className="cursor-pointer">
					{label}
				</Label>
			</div>
		)
	}

	const renderCheckbox = (
		id: keyof PostDisclosureAuthorizationData,
		label: string,
		is_checked: boolean | null,
	) => (
		<CheckboxField<PostDisclosureAuthorizationData>
			id={id as Extract<keyof PostDisclosureAuthorizationData, string>}
			label={label}
			isChecked={is_checked}
		/>
	)

	const renderContentTypeCheckbox = (
		contentType: DisclosureContentType,
		label: string,
	) => {
		const selectedContentTypes: DisclosureContentType[] =
			data.contentTypes ?? []
		const isChecked = selectedContentTypes.includes(contentType)
		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`content_${contentType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						const updatedContentTypes =
							checked ?
								[...new Set([...selectedContentTypes, contentType])]
							:	selectedContentTypes.filter((p) => p !== contentType)

						setData('contentTypes', updatedContentTypes)
					}}
				/>
				<Label htmlFor={`content_${contentType}`} className="cursor-pointer">
					{label}
				</Label>
			</div>
		)
	}

	const renderConditionalField = (
		id: keyof PostDisclosureAuthorizationData,
		checkbox_id: keyof PostDisclosureAuthorizationData,
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
		id: keyof PostDisclosureAuthorizationData,
		enumValue: string,
		enumArray: keyof PostDisclosureAuthorizationData,
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
		post(route('intake.disclosure'))
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 p-4">
			<Card>
				<CardHeader>
					<CardTitle>Authorized Entities</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDssAuthorized"
							label="Department of Social Services (DSS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isFsdAuthorized"
							label="Family Support Division (FSD)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDysAuthorized"
							label="Division of Youth Services (DYS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isCdAuthorized"
							label="Children's Division (CD)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isCdAuthorized"
							label="Children's Division (CD)"
						/>
						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDlsAuthorized"
							label="Division of Legal Services (DLS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDfasAuthorized"
							label="Division of Finance and Administrative Services (DFAS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDlsAuthorized"
							label="Division of Legal Services (DLS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isDfasAuthorized"
							label="Division of Finance and Administrative Services (DFAS)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isMmacAuthorized"
							label="Missouri Medicaid Audit and Compliance (MMAC)"
						/>

						<CheckboxField<PostDisclosureAuthorizationData>
							id="isOtherAuthorized"
							label="Other (specify)"
						/>

						{renderConditionalField(
							'otherAuthorizedEntity',
							'isOtherAuthorized',
							'Other Entity',
							data.otherAuthorizedEntity,
							true,
						)}
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
						{renderPurposeCheckbox('legal_consultation', 'Legal Consultation')}
						{renderPurposeCheckbox('legal_proceedings', 'Legal Proceedings')}
						{renderPurposeCheckbox('employment', 'Employment')}
						{renderPurposeCheckbox(
							'complaint_investigation',
							'Complaint/Investigation',
						)}
						{renderPurposeCheckbox('treatment_planning', 'Treatment Planning')}
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
								className={errors.signatureDate ? 'border-red-500' : undefined}
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
	)
}
