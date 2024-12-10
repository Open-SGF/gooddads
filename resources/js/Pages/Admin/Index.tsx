import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Table, TableBody,
  TableCaption, TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui'

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin</h2>}
    >
      <Head title="Admin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table>
                <TableCaption>
                  A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      User
                    </TableHead>
                    <TableHead>
                      Email
                    </TableHead>
                    <TableHead>
                      Roles
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      INV001
                    </TableCell>
                    <TableCell>
                      Paid
                    </TableCell>
                    <TableCell>
                      Credit Card
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
