import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import { UserData } from '@/types'
import { Button } from '@/Components/ui'
import { Users, ArrowLeft, Edit } from 'lucide-react'
import { usePermission } from '@/hooks/permissions'
import { format } from 'date-fns'

interface UserShowProps extends PageProps {
  user: UserData
}

export default function Show({ auth, user }: UserShowProps) {
  const { hasPermission } = usePermission(auth.user)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set'
    return format(new Date(dateString), 'PPP')
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center flex-1 gap-6">
          <h2 className="inline-flex gap-4 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <Users color="black" size={24} />
            User Details
          </h2>

          {hasPermission('edit users') && (
            <Button size="sm" asChild>
              <Link href={route('users.edit', user.id)}>
                <Edit className="w-4 h-4 mr-2" /> Edit User
              </Link>
            </Button>
          )}
        </div>
      }
    >
      <Head title={`User: ${user.firstName} ${user.lastName}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <Link
                href={route('users.list')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Users
              </Link>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        First Name
                      </div>
                      <div className="mt-1">{user.firstName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Name
                      </div>
                      <div className="mt-1">{user.lastName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </div>
                      <div className="mt-1">{user.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email Verified
                      </div>
                      <div className="mt-1">
                        {user.emailVerifiedAt ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified on {formatDate(user.emailVerifiedAt)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Not verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Roles & Permissions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Roles
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No roles assigned</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Permissions
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {user.permissions.length > 0 ? (
                          user.permissions.map((permission) => (
                            <span key={permission} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {permission.charAt(0).toUpperCase() + permission.slice(1)}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No permissions assigned</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">System Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created At
                    </div>
                    <div className="mt-1">{formatDate(user.createdAt)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Updated
                    </div>
                    <div className="mt-1">{formatDate(user.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 