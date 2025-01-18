import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, PaginationProps, User } from '@/types'
import {
  Button,
  TableFilter,
  DataTable,
  DataTableFields,
} from '@/Components/ui'
import {
  Pencil1Icon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'
import { DataTablePagination } from '@/Components/ui/DataTablePagination'

export type UsersListPageProps = PageProps & PaginationProps & {
  users: User[];
}

export default function List({
                               auth,
                               users,
                               page,
                               totalPages,
                               count,
                               pageSize,
                               ziggy: { query },
                             }: UsersListPageProps) {
  const { hasPermission } = usePermission(auth.user)

  const fields: DataTableFields<User>[] = [
    {
      value: 'first_name',
      label: 'First Name',
      enabled: true,
    },
    {
      value: 'last_name',
      label: 'Last Name',
      enabled: true,
    },
    {
      value: 'email',
      label: 'Email',
      enabled: true,
    },
    {
      value: 'permissions',
      label: 'Permissions',
      enabled: true,
      content: (row) => {
        return row.permissions.map((permission) => permission.charAt(0).toUpperCase() + permission.slice(1)).join(', ')
      }
    },
    {
      value: 'roles',
      label: 'Roles',
      enabled: true,
      content: (row) => {
        return row.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')
      }
    },
    {
      value: 'actions',
      label: '',
      enabled: hasPermission('edit users'),
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
          <div
            className="flex flex-col bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 gap-6">
            <TableFilter fields={fields} />
            <DataTable<User> fields={fields} data={users} />
            <DataTablePagination page={page} pageSize={pageSize} totalPages={totalPages} count={count} query={query} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
