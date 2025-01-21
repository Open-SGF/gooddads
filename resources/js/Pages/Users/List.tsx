import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, PaginationProps, User } from '@/types'
import {
  Button,
  DataTable,
  DataTableFields,
} from '@/Components/ui'
import {
  Pencil1Icon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'

export type UsersListPageProps = PageProps & PaginationProps & {
  users: User[];
}

export default function List({
                               auth,
                               users,
                             }: UsersListPageProps) {
  const { hasPermission } = usePermission(auth.user)

  const fields: DataTableFields<User>[] = [
    {
      id: 'first_name',
      label: 'First Name',
      sorting: true
    },
    {
      id: 'last_name',
      label: 'Last Name',
      sorting: true
    },
    {
      id: 'email',
      label: 'Email',
      sorting: true
    },
    {
      id: 'permissions',
      label: 'Permissions',
      content: (row) => {
        return row.permissions.map((permission) => permission.charAt(0).toUpperCase() + permission.slice(1)).join(', ')
      }
    },
    {
      id: 'roles',
      label: 'Roles',
      content: (row) => {
        return row.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')
      }
    },
    {
      id: 'actions',
      label: '',
      disabled: !hasPermission('edit users'),
      content: () => (
        <Button variant={'outline'} size={'sm'}>
          <Pencil1Icon href={'#'} /> Edit
        </Button>
      ),
    },
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<div className={'flex justify-between items-center flex-1'}>
        <h2
          className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>

        {hasPermission('create users') && (
          <Button size={'sm'} asChild>
            <a href={route('users.create')}>
              <PlusIcon /> Create User
            </a>
          </Button>
        )}
      </div>}
    >
      <Head title="Users" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
           <DataTable<User> fields={fields} data={users} />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
