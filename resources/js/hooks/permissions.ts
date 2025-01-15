import { PageProps, User } from '@/types'
import { usePage } from '@inertiajs/react'

export function usePermission(user?: User) {

  // Use the inertia use page hook to get the props from the HandleInertiaRequest Middleware
  user ??= usePage<PageProps>().props.auth.user;

  const hasRole = (role: string) => {
    return user?.roles?.includes(role) ?? false;
  }

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) ?? false;
  }

  return { hasRole, hasPermission }
}
