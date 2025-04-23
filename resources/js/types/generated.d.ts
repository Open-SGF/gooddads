export type Ethnicity =
	| 'white'
	| 'african_american'
	| 'native_american'
	| 'asian'
	| 'pacific_islander'
	| 'hispanic'
	| 'no_answer'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type QuizQuestionType = 'trueFalse' | 'multipleChoice' | 'shortAnswer'
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
