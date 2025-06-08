import { MiddlewareProps } from '@/types/generated'

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T &
	MiddlewareProps & {
		breadcrumbs: BreadcrumbType[]
	}

export type PaginationProps = {
	page: number
	pageSize: number
	totalPages: number
	count: number
}

export type BreadcrumbType = {
	title: string
	url: string
	is_current_page: boolean
}

export * from './generated'
