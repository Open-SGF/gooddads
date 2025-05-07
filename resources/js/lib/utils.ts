import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
	return format(new Date(dateString), 'PPP')
}

export function hasRoute(url: string) {
	const { props } = usePage<PageProps>()

	return props.breadcrumbs.some((breadcrumb) => {
		return breadcrumb.url === route(url)
	})
}
