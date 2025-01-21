import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Create({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className={'flex justify-between items-center flex-1'}>
					<h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
						Create User
					</h2>
				</div>
			}
		>
			<Head title='Create User' />
		</AuthenticatedLayout>
	)
}
