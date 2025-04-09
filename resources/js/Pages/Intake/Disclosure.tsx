import React from 'react'
import { Head } from '@inertiajs/react'
import { type PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface DisclosureProps extends PageProps {}

export const Disclosure: React.FC<DisclosureProps> = ({ auth }) => {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Disclosure" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">Disclosure</div>
			</div>
		</AuthenticatedLayout>
	)
}

export default Disclosure
