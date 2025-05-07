export type Ethnicity =
	| 'white'
	| 'african_american'
	| 'native_american'
	| 'asian'
	| 'pacific_islander'
	| 'hispanic'
	| 'no_answer'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
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
export type Roles =
	| 'admin'
	| 'director'
	| 'region director'
	| 'program director'
	| 'facilitator'
	| 'auditor'
	| 'intake'
	| 'participant'
export type UserData = {
	id: string
	firstName: string
	lastName: string
	email: string
	roles: Array<Roles>
	permissions: Array<Permissions>
	createdAt: string | null
	updatedAt: string | null
	emailVerifiedAt: string | null
}
