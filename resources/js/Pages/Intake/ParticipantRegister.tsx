import { useEffect, FormEventHandler } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Button, Label, Input, InputError, Checkbox } from '@/Components/ui'
import { Head, Link, useForm } from '@inertiajs/react'

export default function ParticipantRegister() {
	const { data, setData, post, processing, errors, reset } = useForm<{
		first_name: string
		last_name: string
		email: string
		phone_number: string
		password: string
		password_confirmation: string
		terms: boolean
	}>({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		password: '',
		password_confirmation: '',
		terms: false as boolean,
	})

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('intake.register'), {
			onError: (err) => {
				window.console.log(err)
			},
		})
	}

	return (
		<GuestLayout>
			<Head title="Participant Registration" />
			<div className="text-xl mt-3 mb-6">New Participant Registration</div>
			<form onSubmit={submit}>
				<div>
					<Label htmlFor="first_name">First Name</Label>

					<Input
						id="first_name"
						name="first_name"
						value={data.first_name}
						className="mt-1 block w-full"
						autoComplete="given-name"
						onChange={(e) => setData('first_name', e.target.value)}
						required
					/>

					<InputError message={errors.first_name} className="mt-2" />
				</div>

				<div>
					<Label htmlFor="last_name">Last Name</Label>

					<Input
						id="last_name"
						name="last_name"
						value={data.last_name}
						className="mt-1 block w-full"
						autoComplete="family-name"
						onChange={(e) => setData('last_name', e.target.value)}
						required
					/>

					<InputError message={errors.last_name} className="mt-2" />
				</div>

				<div className="mt-4">
					<Label htmlFor="email">Email</Label>

					<Input
						id="email"
						type="email"
						name="email"
						value={data.email}
						className="mt-1 block w-full"
						autoComplete="username"
						onChange={(e) => setData('email', e.target.value)}
						required
					/>

					<InputError message={errors.email} className="mt-2" />
				</div>

				<div className="mt-4">
					<Label htmlFor="phone">Phone Number</Label>

					<Input
						id="phone"
						type="tel"
						name="phone"
						value={data.phone_number}
						className="mt-1 block w-full"
						autoComplete="tel"
						onChange={(e) => setData('phone_number', e.target.value)}
						required
					/>

					<InputError message={errors.phone_number} className="mt-2" />
				</div>

				<div className="mt-4">
					<Label htmlFor="password">Password</Label>

					<Input
						id="password"
						type="password"
						name="password"
						value={data.password}
						className="mt-1 block w-full"
						autoComplete="new-password"
						onChange={(e) => setData('password', e.target.value)}
						required
					/>

					<InputError message={errors.password} className="mt-2" />
				</div>

				<div className="mt-4">
					<Label htmlFor="password_confirmation">Confirm Password</Label>

					<Input
						id="password_confirmation"
						type="password"
						name="password_confirmation"
						value={data.password_confirmation}
						className="mt-1 block w-full"
						autoComplete="new-password"
						onChange={(e) => setData('password_confirmation', e.target.value)}
						required
					/>

					<InputError message={errors.password_confirmation} className="mt-2" />
				</div>
				<div className="mt-4  ">
					<Label htmlFor="terms">
						<div className="flex items-center font-light">
							<Checkbox
								id="terms"
								checked={data.terms}
								onCheckedChange={(checked) => setData('terms', !!checked)}
								name="terms"
							/>
							<div className="ms-2  ">
								I agree to the{' '}
								<a
									target="_blank"
									href={route('terms-of-service')}
									className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
									rel="noreferrer"
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									target="_blank"
									href={route('privacy-policy')}
									className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
									rel="noreferrer"
								>
									Privacy Policy
								</a>
							</div>
						</div>
						<InputError className="mt-2" message={errors.terms} />
					</Label>
				</div>
				<div className="flex items-center justify-end mt-4">
					<Link
						href={route('login')}
						className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
					>
						Already registered?
					</Link>

					<Button
						className="ms-4"
						disabled={processing}
						size="default"
						variant="default"
					>
						Register
					</Button>
				</div>
			</form>
		</GuestLayout>
	)
}
