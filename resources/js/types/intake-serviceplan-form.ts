export interface IntakeServicePlanForm {
	id: string
	
	participant_name: string
	client_number: string
	review_date: string
	parenting_skill_development_is_service_area: boolean
	effective_co_parenting_is_service_area: boolean
	employment_and_education_is_service_area: boolean
	child_support_is_service_area: boolean
	domestic_violence_is_service_area: boolean
	service_identified_by_participant: string
	goal: string
	custody_visitation_strategy: string
	custody_visitation_person_responsible: string
	custody_visitation_timeline: string
	custody_visitation_measure_of_success: string
	education_employment_strategy: string
	education_employment_person_responsible: string
	education_employment_timeline: string
	education_employment_measure_of_success: string
	housing_transportation_strategy: string
	housing_transportation_person_responsible: string
	housing_transportation_timeline: string
	housing_transportation_measure_of_success: string
	participant_signature: string
	participant_signature_date: string
	case_manager_signature: string
	case_manager_signature_date: string
	date_completed: string
}
