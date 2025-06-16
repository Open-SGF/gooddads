export type AuthProp = {
	user: UserData | null
}
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
export type ChildForm = {
	firstName: string
	lastName: string
	dateOfBirth: string
	phoneContact: boolean | null
	custody: boolean | null
	visitation: boolean | null
	childSupport: number
}
export type DisclosureContentType =
	| 'entire_file'
	| 'licensure_information'
	| 'medical_psychiatric_records'
	| 'hotline_investigations'
	| 'home_studies'
	| 'eligibility_determinations'
	| 'substance_abuse_treatment'
	| 'client_employment_records'
	| 'benefits_received'
	| 'other'
export type DisclosurePurposeType =
	| 'eligibility_determination'
	| 'legal_consultation'
	| 'legal_proceedings'
	| 'employment'
	| 'complaint_investigation'
	| 'treatment_planning'
	| 'continuity_of_services'
	| 'background_investigation'
	| 'consumer_request'
	| 'share_and_refer'
	| 'other'
export type Ethnicity =
	| 'white'
	| 'african_american'
	| 'native_american'
	| 'asian'
	| 'pacific_islander'
	| 'hispanic'
	| 'no_answer'
export type GuestProp = {
	user: null | null
}
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type MiddlewareProps = {
	auth: AuthProp
	request: RequestProp
	toast: ToastProp | null
	breadcrumb: any | null
}
export type ParticipantData = {
	id: string
	userId: string
	regionId: string
	addressLine1: string
	addressLine2: string | null
	city: string
	state: string
	zipcode: string
	employer: string | null
	cellPhoneNumber: string | null
	homePhoneNumber: string | null
	workPhoneNumber: string | null
	altContactNumber: string | null
	maritalStatus: MaritalStatus
	ethnicity: Ethnicity
	tShirtSize: string | null
	probationParoleCaseWorkerName: string | null
	probationParoleCaseWorkerPhone: string | null
	participantPhoto: string | null
	intakeDate: string | null
	createdAt: string
	updatedAt: string
}
export type ParticipantDisclosureAuthorizationForm = {
	participantId: string
	isDssAuthorized: boolean
	isDysAuthorized: boolean
	isMhdAuthorized: boolean
	isDfasAuthorized: boolean
	isMmacAuthorized: boolean
	isFsdAuthorized: boolean
	isCdAuthorized: boolean
	isDlsAuthorized: boolean
	isOtherAuthorized: boolean
	otherAuthorizedEntity: string | null
	discloseToAttorney: boolean
	attorneyName: string | null
	discloseToEmployer: boolean
	employerName: string | null
	discloseToLegislator: boolean
	legislatorName: string | null
	discloseToGovernorsStaff: boolean
	governorsStaffDetails: string | null
	discloseToOtherRecipient: boolean
	otherRecipientDetails: string | null
	purposes: DisclosurePurposeType
	otherPurposeDetails: string | null
	contentTypes: DisclosureContentType
	otherDisclosureDetails: string | null
	acceptTextMessages: boolean
	consumerSignature: string
	signatureDate: string
	witnessSignature: string | null
	witnessSignatureDate: string | null
	guardianSignature: string | null
	guardianSignatureDate: string | null
	surveyByEmail: boolean | null
	surveyByMail: boolean | null
	surveyByOnline: boolean | null
	dateCompleted: string
}
export type ParticipantDisclosureAuthorizationProps = {
	purposes: Record<DisclosurePurposeType, string>
	contentTypes: Record<DisclosureContentType, string>
}
export type ParticipantFatherhoodAssessmentForm = {
	vendorName: string | null
	participantName: string | null
	dateOfBirth: string | null
	socialSecurityNumber: string | null
	isMissouriResident: boolean | null
	childIsUnder18: boolean | null
	isFinanciallyEligible: boolean | null
	driversLicenseProvided: boolean | null
	utilityBillProvided: boolean | null
	payStubProvided: boolean | null
	writtenEmployerStatementProvided: boolean | null
	socialSecurityBenefitsProvided: boolean | null
	selfAttestationProvided: boolean | null
	unemploymentCompensationProvided: boolean | null
	otherProvided: boolean | null
	otherProvidedName: string | null
	grossMonthlyHouseholdIncome: number | null
	numberOfFamilyMembers: number | null
	percentageOfFpl: number | null
	approvedForServices: boolean | null
	stateAgencyReviewDate: string | null
}
export type ParticipantFatherhoodSurveyForm = {
	dateOfBirth: string | null
	fatherhoodProgram: string | null
	reasonBecomeResponsibleFather: boolean | null
	reasonReferred: boolean | null
	reasonCourtOrdered: boolean | null
	reasonAddressChildSupportConcerns: boolean | null
	reasonOther: boolean | null
	reasonOtherDescription: string | null
	referredByWordOfMouth: boolean | null
	referredByPastParticipant: boolean | null
	referredByFamilySupportDivision: boolean | null
	referredByProsecutingAttorney: boolean | null
	referredByMarketing: boolean | null
	referredByOrganizationItself: boolean | null
	referredByOther: boolean | null
	referredByOtherSource: string | null
	employmentOpportunitiesExpected: boolean | null
	assistanceWithAlcoholAbuseExpected: boolean | null
	increasedEmphasisOnParentingSkillsExpected: boolean | null
	accessToMentorsResourcesOutsideProgramExpected: boolean | null
	resumeBuildingSkillsExpected: boolean | null
	freeLegalServicesExpected: boolean | null
	assistanceWithCriminalHistoryExpected: boolean | null
	assistanceWithCreditRepairExpected: boolean | null
	assistanceWithOvercomingHomelessnessExpected: boolean | null
	assistanceWithVisitationCustodyExpected: boolean | null
	increasedUnderstandingOfChildSupportIssuesExpected: boolean | null
	maintainingHopeForTheFutureExpected: boolean | null
	helpObtainingInformationAboutHealthWellnessExpected: boolean | null
	otherExpected: boolean | null
	otherExpectationsDescription: string | null
}
export type ParticipantMediaReleaseData = {
	id: string
	participantId: string
	printedName: string
	signature: string
	signatureDate: string | null
	phoneNumber: string
	email: string
	dateCompleted: string | null
	createdAt: string
	updatedAt: string
}
export type ParticipantMediaReleaseForm = {
	printedName: string | null
	signature: string | null
	signatureDate: string | null
	phoneNumber: string | null
	email: string | null
}
export type ParticipantRegistrationProps = {
	ethnicity: Ethnicity
	maritalStatus: MaritalStatus
	regions: Array<RegionProp>
}
export type ParticipantServicePlanForm = {
	participantName: string | null
	clientNumber: string | null
	parentingSkillDevelopmentIsServiceArea: boolean | null
	effectiveCoParentingIsServiceArea: boolean | null
	employmentAndEducationIsServiceArea: boolean | null
	childSupportIsServiceArea: boolean | null
	domesticViolenceIsServiceArea: boolean | null
	serviceIdentifiedByParticipant: string | null
	goal: string | null
	custodyVisitationStrategy: string | null
	custodyVisitationPersonResponsible: string | null
	custodyVisitationTimeline: string | null
	custodyVisitationMeasureOfSuccess: string | null
	educationEmploymentStrategy: string | null
	educationEmploymentPersonResponsible: string | null
	educationEmploymentTimeline: string | null
	educationEmploymentMeasureOfSuccess: string | null
	housingTransportationStrategy: string | null
	housingTransportationPersonResponsible: string | null
	housingTransportationTimeline: string | null
	housingTransportationMeasureOfSuccess: string | null
	participantSignature: string | null
	participantSignatureDate: string | null
	caseManagerSignature: string | null
	caseManagerSignatureDate: string | null
	dateCompleted: string | null
}
export type ParticipantSignupForm = {
	addressLine1: string
	addressLine2?: string
	city: string
	state: string
	zipcode: string
	employer: string | null
	tShirtSize: string | null
	homePhoneNumber: string | null
	workPhoneNumber: string | null
	cellPhoneNumber: string | null
	altContactNumber: string | null
	probationParoleCaseWorkerPhone: string | null
	probationParoleCaseWorkerName: string | null
	maritalStatus: MaritalStatus
	ethnicity: Ethnicity
	regionId: string
	children: Array<ChildForm>
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
	| 'intake'
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
	emailVerifiedAt: string | null
	active: boolean
}
export type UserRegistrationForm = {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	passwordConfirmation: string
	role?: string
}
