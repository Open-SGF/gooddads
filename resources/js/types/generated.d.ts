export type AuthProp = {
	user?: UserData
}
export type ChildData = {
	id: string
	participantId: string
	firstName: string
	lastName: string
	dateOfBirth: string
	phoneContact?: boolean
	custody?: boolean
	visitation?: boolean
	contact?: string
	childSupport: number
	createdAt: string
	updatedAt: string
}
export type DisclosureContentType =
	| 'entireFile'
	| 'licensureInformation'
	| 'medicalPsychiatricRecords'
	| 'hotlineInvestigations'
	| 'homeStudies'
	| 'eligibilityDeterminations'
	| 'substanceAbuseTreatment'
	| 'clientEmploymentRecords'
	| 'benefitsReceived'
	| 'other'
export type DisclosurePurposeType =
	| 'eligibilityDetermination'
	| 'legalConsultation'
	| 'legalProceedings'
	| 'employment'
	| 'complaintInvestigation'
	| 'treatmentPlanning'
	| 'continuityOfServices'
	| 'backgroundInvestigation'
	| 'consumerRequest'
	| 'shareAndRefer'
	| 'other'
export type Ethnicity =
	| 'white'
	| 'africanAmerican'
	| 'nativeAmerican'
	| 'asian'
	| 'pacificIslander'
	| 'hispanic'
	| 'noAnswer'
export type GuestProp = {
	user?: null
}
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type MiddlewareProps = {
	auth: AuthProp
	request: RequestProp
	toast?: ToastProp
	breadcrumb?: any
}
export type ParticipantData = {
	id: string
	userId: string
	regionId: string
	addressLine1: string
	addressLine2?: string
	city: string
	state: string
	zipcode: string
	employer?: string
	cellPhoneNumber?: string
	homePhoneNumber?: string
	workPhoneNumber?: string
	altContactNumber?: string
	maritalStatus: MaritalStatus
	ethnicity: Ethnicity
	tShirtSize?: string
	probationParoleCaseWorkerName?: string
	probationParoleCaseWorkerPhone?: string
	participantPhoto?: string
	intakeDate?: string
	createdAt: string
	updatedAt: string
}
export type ParticipantDisclosureAuthorizationProps = {
	purposes: Record<DisclosurePurposeType, string>
	contentTypes: Record<DisclosureContentType, string>
}
export type ParticipantMediaReleaseData = {
	id: string
	participantId: string
	printedName: string
	signature: string
	signatureDate?: string
	phoneNumber: string
	email: string
	dateCompleted?: string
	createdAt: string
	updatedAt: string
}
export type ParticipantRegistrationProps = {
	ethnicity: Ethnicity
	maritalStatus: MaritalStatus
	regions: Array<RegionProp>
}
export type PermissionData = {
	id: string
	name: string
	guard_name: string
}
export type Permissions =
	| 'create users'
	| 'edit users'
	| 'delete users'
	| 'list users'
	| 'view users'
	| 'list curriculum'
	| 'list classes'
	| 'list reports'
export type PostUserData = {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	passwordConfirmation: string
	role?: string
}
export type QuizQuestionType = 'trueFalse' | 'multipleChoice' | 'shortAnswer'
export type RegionData = {
	id: string
	description: string
	createdAt: string
	updatedAt: string
}
export type RegionProp = {
	id: string
	description: string
}
export type RequestProp = {
	location: string
	query: { [key: string]: string }
}
export type RoleData = {
	id: string
	name: string
	guard_name: string
}
export type Roles =
	| 'admin'
	| 'director'
	| 'region director'
	| 'program director'
	| 'facilitator'
	| 'auditor'
	| 'participant'
export type ToastProp = {
	message: string
	type: ToastType
}
export type ToastType = 'success' | 'error' | 'info' | 'warning'
export type UserData = {
	id: string
	firstName: string
	lastName: string
	email: string
	roles: Array<Roles>
	permissions: Array<Permissions>
	emailVerifiedAt?: string
	active: boolean
}
