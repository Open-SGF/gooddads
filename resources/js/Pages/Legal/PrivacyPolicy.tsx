import GuestLayout from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'

export default function PrivacyPolicy() {
	return (
		<GuestLayout>
			<Head title="Privacy Policy" />

			<h1>Privacy Policy</h1>
			<div className="my-4 text-sm text-gray-600 dark:text-gray-400">
				Privacy Policy....
			</div>
		</GuestLayout>
	)
}
