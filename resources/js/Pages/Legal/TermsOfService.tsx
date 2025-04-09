import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'

export default function TermsOfService() {
	return (
		<GuestLayout>
			<Head title="Terms Of Service" />

			<h1>Terms Of Service</h1>
			<div className="my-4 text-sm text-gray-600 dark:text-gray-400">
				Terms Of Service
			</div>
		</GuestLayout>
	)
}
