import { PageProps, UserData, Permissions, Roles } from '@/types'
import { usePage } from '@inertiajs/react'

export function usePermission(user?: UserData) {
	// Use the inertia use page hook to get the props from the HandleInertiaRequest Middleware
	user ??= usePage<PageProps>().props.auth.user

	const hasRole = (role: Roles) => {
		return user?.roles?.includes(role) ?? false
	}

	const hasPermission = (permission: Permissions) => {
		return user?.permissions?.includes(permission) ?? false
	}

	return { hasRole, hasPermission }
}
