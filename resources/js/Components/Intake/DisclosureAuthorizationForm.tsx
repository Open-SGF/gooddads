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
import type {
	ParticipantData,
	ParticipantDisclosureAuthorizationForm,
} from '@/types'
import {
	DisclosurePurposeType,
	DisclosureContentType,
} from '@/types'

interface DisclosureAuthorizationFormProps {
	participant: ParticipantData
	disclosureAuthorizationForm?: ParticipantDisclosureAuthorizationForm
	viewOnly?: boolean
	nextRoute?: string
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
		useForm<ParticipantDisclosureAuthorizationForm>({
			id: disclosureAuthorizationForm?.id ?? '',
			
			// Consumer name is pulled from participant name in the backend
			consumerName: disclosureAuthorizationForm?.consumerName ?? participant?.name ?? null,
			
			isDssAuthorized: disclosureAuthorizationForm?.isDssAuthorized ?? true,
			isDysAuthorized: disclosureAuthorizationForm?.isDysAuthorized ?? false,
			isMhdAuthorized: disclosureAuthorizationForm?.isMhdAuthorized ?? false,
			isDfasAuthorized: disclosureAuthorizationForm?.isDfasAuthorized ?? false,
			isMmacAuthorized: disclosureAuthorizationForm?.isMmacAuthorized ?? false,
			isFsdAuthorized: disclosureAuthorizationForm?.isFsdAuthorized ?? true,
			isCdAuthorized: disclosureAuthorizationForm?.isCdAuthorized ?? false,
			isDlsAuthorized: disclosureAuthorizationForm?.isDlsAuthorized ?? false,
			isOtherAuthorized: disclosureAuthorizationForm?.isOtherAuthorized ?? false,
			otherAuthorizedEntity: disclosureAuthorizationForm?.otherAuthorizedEntity ?? null,

			subjectName:
				disclosureAuthorizationForm?.subjectName ?? participant.name ?? null,
			subjectPhone:
				disclosureAuthorizationForm?.subjectPhone ??
				participant.homePhoneNumber ??
				null,
			subjectDob: disclosureAuthorizationForm?.subjectDob ?? null,
			subjectSsn: disclosureAuthorizationForm?.subjectSsn ?? null,
			subjectAddress:
				disclosureAuthorizationForm?.subjectAddress ??
				participant.addressLine1 ??
				null,
			subjectEmail:
				disclosureAuthorizationForm?.subjectEmail ??
				participant.user.email ??
				null,

			discloseToAttorney:
				disclosureAuthorizationForm?.discloseToAttorney ?? false,
			attorneyName: disclosureAuthorizationForm?.attorneyName ?? null,
			discloseToEmployer:
				disclosureAuthorizationForm?.discloseToEmployer ?? false,
			employerName: disclosureAuthorizationForm?.employerName ?? null,
			discloseToLegislator:
				disclosureAuthorizationForm?.discloseToLegislator ?? false,
			legislatorName: disclosureAuthorizationForm?.legislatorName ?? null,
			discloseToGovernorsStaff:
				disclosureAuthorizationForm?.discloseToGovernorsStaff ?? false,
			otherRecipientDetails: disclosureAuthorizationForm?.otherRecipientDetails ?? 'Good Dads/Jennifer Baker (and staff)',

			// Purpose of disclosure - using array of enum values
			purposes: disclosureAuthorizationForm?.purposes ?? [DisclosurePurposeType.SHARE_AND_REFER],
			otherPurposeDetails: disclosureAuthorizationForm?.otherPurposeDetails ?? null,

			// Information to be disclosed - using array of enum values
			contentTypes: disclosureAuthorizationForm?.contentTypes ?? [
				DisclosureContentType.ENTIRE_FILE,
				DisclosureContentType.BENEFITS_RECEIVED,
				DisclosureContentType.OTHER
			],
			otherDisclosureDetails:
				disclosureAuthorizationForm?.otherDisclosureDetails ??
				'Child support records that FSD may release to the parent from his/her own case file.',

			acceptTextMessages:
				disclosureAuthorizationForm?.acceptTextMessages ?? false,
			consumerSignature: disclosureAuthorizationForm?.consumerSignature ?? null,
			signatureDate: disclosureAuthorizationForm?.signatureDate ?? null,
			witnessSignature: disclosureAuthorizationForm?.witnessSignature ?? null,
			witnessSignatureDate:
				disclosureAuthorizationForm?.witnessSignatureDate ?? null,
			guardianSignature: disclosureAuthorizationForm?.guardianSignature ?? null,
			guardianSignatureDate: disclosureAuthorizationForm?.guardianSignatureDate ?? null,

			surveyByEmail: disclosureAuthorizationForm?.surveyByEmail ?? false,
			surveyByMail: disclosureAuthorizationForm?.surveyByMail ?? false,
			surveyByOnline: disclosureAuthorizationForm?.surveyByOnline ?? false,
		})

	const continueToNextStep = () => {
		router.visit(route(nextRoute))
	}

	const renderCheckbox = (
		id: keyof ParticipantDisclosureAuthorizationForm,
		label: string,
		is_checked: boolean | null,
		is_view_only: boolean,
	) => (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={id}
				checked={!!is_checked}
				onCheckedChange={(checked) => setData(id, !!checked)}
				disabled={is_view_only}
			/>
			<Label
				htmlFor={id}
				className={
					is_view_only ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'
				}
			>
				{label}
			</Label>
		</div>
	)
	
	const renderPurposeCheckbox = (
		purposeType: DisclosurePurposeType,
		label: string,
		is_view_only: boolean,
	) => {
		const isChecked = data.purposes.includes(purposeType);
		
		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`purpose_${purposeType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						const purposes = [...data.purposes];
						if (checked) {
							if (!purposes.includes(purposeType)) {
								purposes.push(purposeType);
							}
						} else {
							const index = purposes.indexOf(purposeType);
							if (index > -1) {
								purposes.splice(index, 1);
							}
						}
						setData('purposes', purposes);
					}}
					disabled={is_view_only}
				/>
				<Label
					htmlFor={`purpose_${purposeType}`}
					className={
						is_view_only ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'
					}
				>
					{label}
				</Label>
			</div>
		)
	}
	
	const renderContentTypeCheckbox = (
		contentType: DisclosureContentType,
		label: string,
		is_view_only: boolean,
	) => {
		const isChecked = data.contentTypes.includes(contentType);
		
		return (
			<div className="flex items-center space-x-2">
				<Checkbox
					id={`content_${contentType}`}
					checked={isChecked}
					onCheckedChange={(checked) => {
						const contentTypes = [...data.contentTypes];
						if (checked) {
							if (!contentTypes.includes(contentType)) {
								contentTypes.push(contentType);
							}
						} else {
							const index = contentTypes.indexOf(contentType);
							if (index > -1) {
								contentTypes.splice(index, 1);
							}
						}
						setData('contentTypes', contentTypes);
					}}
					disabled={is_view_only}
				/>
				<Label
					htmlFor={`content_${contentType}`}
					className={
						is_view_only ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'
					}
				>
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
		is_view_only: boolean,
		required = false,
	) => (
		<div className="ml-6 mt-2">
			<div className="space-y-2">
				<Label
					htmlFor={id}
					className={
						is_view_only ? 'cursor-not-allowed text-gray-500' : undefined
					}
				>
					{label}
					{required && <span className="text-red-500">*</span>}
				</Label>
				<Input
					id={id}
					type="text"
					name={id}
					disabled={is_view_only || !data[checkbox_id]}
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
		is_view_only: boolean,
		required = false,
	) => {
		const isChecked = (data[enumArray] as string[]).includes(enumValue);
		
		return (
			<div className="ml-6 mt-2">
				<div className="space-y-2">
					<Label
						htmlFor={id}
						className={
							is_view_only ? 'cursor-not-allowed text-gray-500' : undefined
						}
					>
						{label}
						{required && <span className="text-red-500">*</span>}
					</Label>
					<Input
						id={id}
						type="text"
						name={id}
						disabled={is_view_only || !isChecked}
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
		if (viewOnly) {
			return
		}

		form.submit('post', route(nextRoute, { absolute: false }))
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 p-4">
			<Card>
				<CardHeader>
					<CardTitle>Consumer Name</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label htmlFor="consumerName">
							Name <span className="text-red-500">*</span>
						</Label>
						<Input
							id="consumerName"
							type="text"
							name="consumerName"
							disabled={viewOnly}
							value={data.consumerName || ''}
							onChange={(e) => setData('consumerName', e.target.value)}
							className={errors.consumerName ? 'border-red-500' : ''}
						/>
						{errors.consumerName && (
							<p className="mt-1 text-sm text-red-500">
								{errors.consumerName}
							</p>
						)}
					</div>
				</CardContent>
			</Card>

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
							viewOnly,
						)}
						{renderCheckbox(
							'isFsdAuthorized',
							'Family Support Division (FSD)',
							data.isFsdAuthorized,
							viewOnly,
						)}
						{renderCheckbox(
							'isDysAuthorized',
							'Division of Youth Services (DYS)',
							data.isDysAuthorized,
							viewOnly,
						)}
						{renderCheckbox(
							'isCdAuthorized',
							"Children's Division (CD)",
							data.isCdAuthorized,
							viewOnly,
						)}
						{renderCheckbox(
							'isMhdAuthorized',
							'Department of Mental Health (MHD)',
							data.isMhdAuthorized,
							viewOnly,
						)}
					</div>
					<div className="space-y-2">
						{renderCheckbox(
							'isDlsAuthorized',
							'Division of Legal Services (DLS)',
							data.isDlsAuthorized,
							viewOnly,
						)}
						{renderCheckbox(
							'isDfasAuthorized',
							'Division of Finance and Administrative Services (DFAS)',
							data.isDfasAuthorized,
							viewOnly,
						)}
						{renderCheckbox(
							'isMmacAuthorized',
							'Missouri Medicaid Audit and Compliance (MMAC)',
							data.isMmacAuthorized,
							viewOnly,
						)}
						<div>
							{renderCheckbox(
								'isOtherAuthorized',
								'Other (specify)',
								data.isOtherAuthorized,
								viewOnly,
							)}
							{renderConditionalField(
								'otherAuthorizedEntity',
								'isOtherAuthorized',
								'Other Entity',
								data.otherAuthorizedEntity,
								viewOnly,
								true,
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Subject Information</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="subjectName">
								Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="subjectName"
								type="text"
								name="subjectName"
								disabled={viewOnly}
								value={data.subjectName || ''}
								onChange={(e) => setData('subjectName', e.target.value)}
								className={errors.subjectName ? 'border-red-500' : ''}
							/>
							{errors.subjectName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.subjectName}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="subjectPhone">
								Phone <span className="text-red-500">*</span>
							</Label>
							<Input
								id="subjectPhone"
								type="text"
								name="subjectPhone"
								disabled={viewOnly}
								value={data.subjectPhone || ''}
								onChange={(e) => setData('subjectPhone', e.target.value)}
								className={errors.subjectPhone ? 'border-red-500' : ''}
							/>
							{errors.subjectPhone && (
								<p className="mt-1 text-sm text-red-500">
									{errors.subjectPhone}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="subjectDob">
								Date of Birth <span className="text-red-500">*</span>
							</Label>
							<Input
								id="subjectDob"
								type="date"
								name="subjectDob"
								disabled={viewOnly}
								value={data.subjectDob || ''}
								onChange={(e) => setData('subjectDob', e.target.value)}
								className={errors.subjectDob ? 'border-red-500' : ''}
							/>
							{errors.subjectDob && (
								<p className="mt-1 text-sm text-red-500">{errors.subjectDob}</p>
							)}
						</div>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="subjectSsn">Social Security Number</Label>
							<Input
								id="subjectSsn"
								type="text"
								name="subjectSsn"
								disabled={viewOnly}
								value={data.subjectSsn || ''}
								onChange={(e) => setData('subjectSsn', e.target.value)}
								className={errors.subjectSsn ? 'border-red-500' : ''}
							/>
							{errors.subjectSsn && (
								<p className="mt-1 text-sm text-red-500">{errors.subjectSsn}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="subjectAddress">
								Address <span className="text-red-500">*</span>
							</Label>
							<Input
								id="subjectAddress"
								type="text"
								name="subjectAddress"
								disabled={viewOnly}
								value={data.subjectAddress || ''}
								onChange={(e) => setData('subjectAddress', e.target.value)}
								className={errors.subjectAddress ? 'border-red-500' : ''}
							/>
							{errors.subjectAddress && (
								<p className="mt-1 text-sm text-red-500">
									{errors.subjectAddress}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="subjectEmail">Email</Label>
							<Input
								id="subjectEmail"
								type="email"
								name="subjectEmail"
								disabled={viewOnly}
								value={data.subjectEmail || ''}
								onChange={(e) => setData('subjectEmail', e.target.value)}
								className={errors.subjectEmail ? 'border-red-500' : ''}
							/>
							{errors.subjectEmail && (
								<p className="mt-1 text-sm text-red-500">
									{errors.subjectEmail}
								</p>
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
								viewOnly,
							)}
							{renderConditionalField(
								'attorneyName',
								'discloseToAttorney',
								'Attorney Name',
								data.attorneyName,
								viewOnly,
								true,
							)}
						</div>
						<div>
							{renderCheckbox(
								'discloseToEmployer',
								'Employer',
								data.discloseToEmployer,
								viewOnly,
							)}
							{renderConditionalField(
								'employerName',
								'discloseToEmployer',
								'Employer Name',
								data.employerName,
								viewOnly,
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
								viewOnly,
							)}
							{renderConditionalField(
								'legislatorName',
								'discloseToLegislator',
								'Legislator Name',
								data.legislatorName,
								viewOnly,
								true,
							)}
						</div>
						<div>
							{renderCheckbox(
								'discloseToGovernorsStaff',
								"Governor's Staff",
								data.discloseToGovernorsStaff,
								viewOnly,
							)}
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="otherRecipientDetails"
								className={
									viewOnly ? 'cursor-not-allowed text-gray-500' : undefined
								}
							>
								Other Recipient Details
							</Label>
							<Input
								id="otherRecipientDetails"
								type="text"
								name="otherRecipientDetails"
								disabled={viewOnly}
								value={data.otherRecipientDetails || 'Good Dads/Jennifer Baker (and staff)'}
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
							DisclosurePurposeType.ELIGIBILITY_DETERMINATION,
							'Eligibility Determination',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.LEGAL_CONSULTATION,
							'Legal Consultation',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.LEGAL_PROCEEDINGS,
							'Legal Proceedings',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.EMPLOYMENT,
							'Employment',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.COMPLAINT_INVESTIGATION,
							'Complaint/Investigation',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.TREATMENT_PLANNING,
							'Treatment Planning',
							viewOnly,
						)}
					</div>
					<div className="space-y-2">
						{renderPurposeCheckbox(
							DisclosurePurposeType.CONTINUITY_OF_SERVICES,
							'Continuity of Services',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.BACKGROUND_INVESTIGATION,
							'Background Investigation',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.CONSUMER_REQUEST,
							'Consumer Request',
							viewOnly,
						)}
						{renderPurposeCheckbox(
							DisclosurePurposeType.SHARE_AND_REFER,
							'Share and Refer Within the Organization',
							viewOnly,
						)}
						<div>
							{renderPurposeCheckbox(
								DisclosurePurposeType.OTHER,
								'Other',
								viewOnly,
							)}
							{renderEnumConditionalField(
								'otherPurposeDetails',
								DisclosurePurposeType.OTHER,
								'purposes',
								'Other Purpose Details',
								data.otherPurposeDetails,
								viewOnly,
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
						{renderContentTypeCheckbox(
							DisclosureContentType.ENTIRE_FILE,
							'Entire File',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.LICENSURE_INFORMATION,
							'Licensure Information',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.MEDICAL_PSYCHIATRIC_RECORDS,
							'Medical/Psychiatric Records',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.HOTLINE_INVESTIGATIONS,
							'Hotline Investigations',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.HOME_STUDIES,
							'Home Studies',
							viewOnly,
						)}
					</div>
					<div className="space-y-2">
						{renderContentTypeCheckbox(
							DisclosureContentType.ELIGIBILITY_DETERMINATIONS,
							'Eligibility Determinations',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.SUBSTANCE_ABUSE_TREATMENT,
							'Substance Abuse Treatment',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.CLIENT_EMPLOYMENT_RECORDS,
							'Client Employment Records',
							viewOnly,
						)}
						{renderContentTypeCheckbox(
							DisclosureContentType.BENEFITS_RECEIVED,
							'Benefits Received',
							viewOnly,
						)}
						<div>
							{renderContentTypeCheckbox(
								DisclosureContentType.OTHER,
								'Other Information',
								viewOnly,
							)}
							{renderEnumConditionalField(
								'otherDisclosureDetails',
								DisclosureContentType.OTHER,
								'contentTypes',
								'Other Information Details',
								data.otherDisclosureDetails,
								viewOnly,
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
							viewOnly,
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
								disabled={viewOnly}
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
								disabled={viewOnly}
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
								disabled={viewOnly}
								value={data.witnessSignature || ''}
								onChange={(e) => setData('witnessSignature', e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="witnessSignatureDate">Witness Signature Date</Label>
							<Input
								id="witnessSignatureDate"
								type="date"
								name="witnessSignatureDate"
								disabled={viewOnly}
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
								disabled={viewOnly}
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
								disabled={viewOnly}
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
					{renderCheckbox(
						'surveyByEmail',
						'Email',
						data.surveyByEmail,
						viewOnly,
					)}
					{renderCheckbox(
						'surveyByMail',
						'Mail',
						data.surveyByMail,
						viewOnly,
					)}
					{renderCheckbox(
						'surveyByOnline',
						'Online',
						data.surveyByOnline,
						viewOnly,
					)}
				</CardContent>
			</Card>

			{!viewOnly && (
				<div className="flex justify-end space-x-4">
					<Button
						type="button"
						onClick={continueToNextStep}
						variant="outline"
						disabled={processing}
					>
						Skip for Now
					</Button>
					<Button type="submit" disabled={processing}>
						{processing ? 'Saving...' : 'Save and Continue'}
					</Button>
				</div>
			)}
		</form>
	)
}

export default DisclosureAuthorizationForm
