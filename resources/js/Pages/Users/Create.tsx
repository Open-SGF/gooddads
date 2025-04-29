import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Create({ auth }: PageProps) {
	return (
		<AuthenticatedLayout user={auth.user} header="Create User">
			<Head title="Create User" />
		</AuthenticatedLayout>
	)
}
