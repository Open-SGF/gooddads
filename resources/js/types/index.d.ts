import { Config } from 'ziggy-js'
import { UserData } from '@/types/generated'

export type Ziggy = {
	ziggy: Config & { location: string; query: Record<string, string> }
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: UserData
	}
	toast: string
} & Ziggy

export type PaginationProps = {
	page: number
	pageSize: number
	totalPages: number
	count: number
}

export * from './generated'

export type Child = {
	first_name: string
	last_name: string
	date_of_birth: string
	child_support: number
	custody: boolean
	visitation: boolean
	phone_contact: boolean
}

export type Permissions =
	| 'create users'
	| 'edit users'
	| 'delete users'
	| 'list users'
	| 'view users'
	| 'list curriculum'
	| 'list classes'
	| 'list reports'
