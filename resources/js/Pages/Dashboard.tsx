import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { House } from 'lucide-react'

export default function Dashboard({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="inline-flex gap-4 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
					<House color="black" size={24} />
					Dashboard
				</h2>
			}
		>
			<Head title="Dashboard" />

			<div className="py-12">
				<div className="sm:px-6 lg:px-8">
					<div className="bg-white dark:bg-gray-800 overflow-hidden">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							You're logged in!
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
