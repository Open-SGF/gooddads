export type Ethnicity =
	| 'white'
	| 'africanAmerican'
	| 'nativeAmerican'
	| 'asian'
	| 'pacificIslander'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type QuizQuestionType = 'trueFalse' | 'multipleChoice' | 'shortAnswer'
export type UserData = {
	id: string
	firstName: string
	lastName: string
	email: string
	roles: Array<string>
	permissions: Array<string>
	created_at: string | null
	updated_at: string | null
	emailVerifiedAt: string | null
}
