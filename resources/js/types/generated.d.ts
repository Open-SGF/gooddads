export type ChildData = {
	id: string
	participantId: string
	firstName: string
	lastName: string
	dateOfBirth: string
	phoneContact: boolean | null
	custody: boolean | null
	visitation: boolean | null
	contact: string | null
	childSupport: number
	createdAt: string
	updatedAt: string
}
export type Ethnicity =
	| 'white'
	| 'african_american'
	| 'native_american'
	| 'asian'
	| 'pacific_islander'
	| 'hispanic'
	| 'no_answer'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type ParticipantData = {
	id: string
	userId: string
	user: UserData
	name: string
	regionId: string | null
	region: RegionData | null
	children: ChildData | null
	addressLine1: string | null
	addressLine2: string | null
	city: string | null
	state: string | null
	zipcode: string | null
	employer: string | null
	cellPhoneNumber: string | null
	homePhoneNumber: string | null
	workPhoneNumber: string | null
	altContactNumber: string | null
	maritalStatus: MaritalStatus
	ethnicity: Ethnicity
	monthlyChildSupport: number | null
	tShirtSize: string | null
	probationParoleCaseWorkerName: string | null
	probationParoleCaseWorkerPhone: string | null
	participantPhoto: string | null
	intakeDate: string
	createdAt: string
	updatedAt: string
}
export type ParticipantMediaReleaseData = {
	id: string
	participantId: string
	printedName: string
	signature: string
	signatureDate: string | null
	phoneNumber: string
	email: string
	dateCompleted: string
	createdAt: string
	updatedAt: string
}
export type PermissionData = {
	id: string | number
	name: string
	guard_name: string
}
export type QuizQuestionType = 'trueFalse' | 'multipleChoice' | 'shortAnswer'
export type RegionData = {
	id: string
	description: string
	createdAt: string
	updatedAt: string
}
export type RoleData = {
	id: string | number
	name: string
	guard_name: string
}
export type UserData = {
	id: string
	firstName: string
	lastName: string
	email: string
	roles: Array<string>
	permissions: Array<string>
	createdAt: string | null
	updatedAt: string | null
	emailVerifiedAt: string | null
}
