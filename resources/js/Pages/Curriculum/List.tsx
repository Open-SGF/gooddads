import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { FolderClosed } from 'lucide-react'
import { PageProps } from '@/types'

export default function List({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center flex-1 gap-6">
					<h2 className="inline-flex gap-4 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						<FolderClosed color="black" size={24} />
						Curriculum
					</h2>
				</div>
			}
		>
			<Head title="Curriculum" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<p>Curriculum</p>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
