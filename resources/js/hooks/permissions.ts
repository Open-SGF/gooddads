import { User } from '@/types'

export function usePermission(user: User) {
  const hasRole = (role: string) => {
    return user.roles.includes(role)
  }

  const hasPermission = (permission: string) => {
    return user.permissions.includes(permission)
  }

  return { hasRole, hasPermission }
}
