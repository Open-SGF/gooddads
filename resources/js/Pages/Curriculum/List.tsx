import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { FolderClosed } from 'lucide-react'
import { PageProps } from '@/types'

export default function List({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<>
					<FolderClosed color="black" size={24} />
					Curriculum
				</>
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
