import type { Child, User } from '@/types/index'
import type { Region } from '@/types/app'

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type Ethnicity =
	| 'white'
	| 'african_american'
	| 'native_american'
	| 'asian'
	| 'pacific_islander'
	| 'hispanic'
	| 'no_answer'

export type Participant = {
	id: string
	user: User
	name: string
	user_id: string

	region_id: string
	region?: Region
	children?: Child[]

	address_line_1: string | null
	address_line_2: string | null
	city: string | null
	state: string | null
	zipcode: string | null
	employer: string | null
	cell_phone_number: string | null
	home_phone_number: string | null
	work_phone_number: string | null
	at_contact_number: string | null
	marital_status?: MaritalStatus
	ethnicity?: Ethnicity
	monthly_child_support: number | null
	intake_date: string | null

	created_at: string
	updated_at: string
}
