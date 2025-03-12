export type Ethnicity =
	| 'white'
	| 'africanAmerican'
	| 'nativeAmerican'
	| 'asian'
	| 'pacificIslander'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type QuizQuestionType = 'trueFalse' | 'multipleChoice' | 'shortAnswer'
export type UserResource = {
	id: number
	first_name: string
	last_name: string
	email: string
	roles: Array<string>
	permissions: Array<string>
	created_at: string
	updated_at: string
	email_verified_at: string
}
