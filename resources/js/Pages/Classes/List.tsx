import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { GraduationCap } from 'lucide-react'
import { PageProps } from '@/types'

export default function List({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<>
					<GraduationCap color="black" size={24} />
					Classes
				</>
			}
		>
			<Head title="Classes" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<p>Classes</p>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}
