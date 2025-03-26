export interface IntakeFatherhoodSurveyFormData {
	id: string
	participant_id: string

	date_of_birth: string
	fatherhood_program: string

	// Reason fields
	reason_become_responsible_father: boolean
	reason_referred: boolean
	reason_court_ordered: boolean
	reason_address_child_support_concerns: boolean
	reason_other: boolean
	reason_other_description: string

	// Referred by fields
	referred_by_word_of_mouth: boolean
	referred_by_past_participant: boolean
	referred_by_family_support_division: boolean
	referred_by_prosecuting_attorney: boolean
	referred_by_marketing: boolean
	referred_by_organization_itself: boolean
	referred_by_other: boolean
	referred_by_other_source: string

	// Expectations fields
	employment_opportunities_expected: boolean
	assistance_with_alcohol_abuse_expected: boolean
	increased_emphasis_on_parenting_skills_expected: boolean
	access_to_mentors_resources_outside_program_expected: boolean
	resume_building_skills_expected: boolean
	free_legal_services_expected: boolean
	assistance_with_criminal_history_expected: boolean
	assistance_with_credit_repair_expected: boolean
	assistance_with_overcoming_homelessness_expected: boolean
	assistance_with_visitation_custody_expected: boolean
	increased_understanding_of_child_support_issues_expected: boolean
	maintaining_hope_for_the_future_expected: boolean
	help_obtaining_information_about_health_wellness_expected: boolean
	other_expected: boolean
	other_expectations_description: string

	created_at: string
	updated_at: string
}
