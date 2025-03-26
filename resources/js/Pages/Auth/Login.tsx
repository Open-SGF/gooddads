import { useEffect, FormEventHandler } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Button, Label, Input, InputError, Checkbox } from '@/Components/ui'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string
	canResetPassword: boolean
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
	})

	useEffect(() => {
		return () => {
			reset('password')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post('/login')
	}

	return (
		<GuestLayout>
			<Head title="Log in" />

			{status && (
				<div className="mb-4 font-medium text-sm text-green-600">{status}</div>
			)}

			<form onSubmit={submit}>
				<div className="grid items-center gap-1.5">
					<Label htmlFor="email">Email</Label>

					<Input
						id="email"
						type="email"
						name="email"
						value={data.email}
						className="mt-1 block w-full"
						autoComplete="username"
						onChange={(e) => setData('email', e.target.value)}
					/>

					<InputError message={errors.email} className="mt-2" />
				</div>

				<div className="grid items-center gap-1.5 mt-4">
					<Label htmlFor="password">Password</Label>

					<Input
						id="password"
						type="password"
						name="password"
						value={data.password}
						className="mt-1 block w-full"
						autoComplete="current-password"
						onChange={(e) => setData('password', e.target.value)}
					/>

					<InputError message={errors.password} className="mt-2" />
				</div>

				<div className="flex items-center mt-4 space-x-2">
					<Checkbox
						id="remember"
						checked={data.remember}
						onCheckedChange={(checked) => setData('remember', !!checked)}
					/>
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						htmlFor="remember"
					>
						Remember me
					</label>
				</div>

				<div className="flex items-center justify-end mt-4">
					{canResetPassword && (
						<Link
							href={route('password.request')}
							className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
						>
							Forgot your password?
						</Link>
					)}

					<Button
						className="ms-4"
						disabled={processing}
						size="default"
						variant="default"
					>
						Log in
					</Button>
				</div>
			</form>
		</GuestLayout>
	)
}
