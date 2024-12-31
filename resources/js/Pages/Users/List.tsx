import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import {
  Button,
  Table, TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { usePermission } from '@/hooks/permissions'

export default function List({ auth, users }: PageProps) {
  const { hasPermission } = usePermission(auth.user)

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<div className={'flex justify-between items-center flex-1'}>
        <h2
          className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>

        {hasPermission('list_users') && (
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
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Name
                    </TableHead>
                    <TableHead>
                      Email
                    </TableHead>
                    <TableHead>
                      Roles
                    </TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>
                        {user.email}
                      </TableCell>
                      <TableCell>
                        {user.roles.join(', ')}
                      </TableCell>
                      <TableCell>
                        <Button variant={'outline'} size={'sm'}>
                          <Pencil1Icon href={'#'} /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
