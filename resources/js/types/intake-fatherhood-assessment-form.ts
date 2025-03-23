export interface IntakeFatherhoodAssessmentForm {
	id: string
	participant_id: string

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
	gross_monthly_household_income: number
	number_of_family_members: number
	percentage_of_fpl: number | null
	approved_for_services: boolean | null
	state_agency_review_date: string

	created_at: string
	updated_at: string
}
