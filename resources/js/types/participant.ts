import type { User } from '@/types/index'

export type Participant = {
	id: string
	user: User

	created_at: string
	updated_at: string
}
