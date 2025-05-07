import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { FileChartColumn } from 'lucide-react'
import { PageProps } from '@/types'

export default function List({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<>
					<FileChartColumn color="black" size={24} />
					Reports
				</>
			}
		>
			<Head title="Reports" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<p>Reports</p>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
