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
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type ParticipantData = {
	id: string
	userId: string
	user: UserData
	regionId: string
	region: RegionData | null
	children: Array<ChildData>
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
	maritalStatus: MaritalStatus | null
	ethnicity: Ethnicity | null
	monthlyChildSupport: number | null
	tShirtSize: string | null
	probationParoleCaseWorkerName: string | null
	probationParoleCaseWorkerPhone: string | null
	participantPhoto: string | null
	intakeDate: string | null
	createdAt: string | null
	updatedAt: string | null
}
export type ParticipantDisclosureAuthorizationForm = {
	id: string
	participantId: string
	participant: ParticipantData
	isDssAuthorized: boolean
	isDysAuthorized: boolean | null
	isMhdAuthorized: boolean | null
	isDfasAuthorized: boolean | null
	isMmacAuthorized: boolean | null
	isFsdAuthorized: boolean | null
	isCdAuthorized: boolean | null
	isDlsAuthorized: boolean | null
	isOtherAuthorized: boolean | null
	otherAuthorizedEntity: string | null
	discloseToAttorney: boolean | null
	attorneyName: string | null
	discloseToEmployer: boolean | null
	employerName: string | null
	discloseToLegislator: boolean | null
	legislatorName: string | null
	discloseToGovernorsStaff: boolean | null
	governorsStaffDetails: string | null
	discloseToOtherRecipient: boolean | null
	otherRecipientDetails: string | null
	purposes: Array<any>
	otherPurposeDetails: string | null
	contentTypes: Array<any>
	otherDisclosureDetails: string | null
	acceptTextMessages: boolean | null
	consumerSignature: string | null
	signatureDate: string | null
	witnessSignature: string | null
	witnessSignatureDate: string | null
	guardianSignature: string | null
	guardianSignatureDate: string | null
	surveyByEmail: boolean | null
	surveyByMail: boolean | null
	surveyByOnline: boolean | null
	dateCompleted: string
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
	dateCompleted: string
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
	addressLine2: string | null
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
	monthlyChildSupport: number | null
	regionId: string | null
	childrenInfo: Array<ChildData> | null
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
