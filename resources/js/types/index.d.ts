import { Config } from 'ziggy-js'

export interface User {
	id: number
	first_name: string
	last_name: string
	email: string
	roles: string[]
	permissions: string[]
}

export type Ziggy = {
	ziggy: Config & { location: string; query: Record<string, string> }
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User
	}
} & Ziggy

export type PaginationProps = {
	page: number
	pageSize: number
	totalPages: number
	count: number
}

export type Child = {
	first_name: string;
	last_name: string;
	date_of_birth: string;
	child_support: number;
	custody: boolean;
	visitation: boolean;
	phone_contact: boolean;
}
