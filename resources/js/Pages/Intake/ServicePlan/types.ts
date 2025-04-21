// types.ts - Contains TypeScript interfaces for the application

export interface ServicePlan {
	id?: number
	participant_name: string
	client_number: string
	review_dates: string
	service_areas: {
		parenting_skill_development: boolean
		effective_co_parenting: boolean
		employment_and_education: boolean
		child_support: boolean
		domestic_violence: boolean
	}
	service_identified_by_participant: string
	goal: string
	objectives: {
		parenting_skills: Objective
		stress_and_anger: Objective
		custody_visitation: Objective
		education_employment: Objective
		housing_transportation: Objective
		child_support_awareness: Objective
		co_parenting: Objective
		mentoring: Objective
	}
	created_at?: string
	updated_at?: string
}

export interface Objective {
	id?: number
	strategies: string
	person_responsible: string
	timelines: string
	measure_of_success: string
}
