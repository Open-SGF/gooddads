import { useEffect, FormEventHandler } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Button, Label, Input, InputError } from '@/Components/ui'
import { Head, Link, useForm } from '@inertiajs/react'
import { UserRegistrationForm } from '@/types'

export default function Register() {
	const { data, setData, post, processing, errors, reset } =
		useForm<UserRegistrationForm>({
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			password: '',
			passwordConfirmation: '',
		})

	useEffect(() => {
		return () => {
			reset('password', 'passwordConfirmation')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('intake.register'))
	}

	return (
		<GuestLayout>
			<Head title="Register" />

			<form onSubmit={submit}>
				<div>
					<Label htmlFor="firstName">First Name</Label>

					<Input
						id="firstName"
						name="firstName"
						value={data.firstName}
						className="mt-1 block w-full"
						autoComplete="given-name"
						onChange={(e) => setData('firstName', e.target.value)}
						required
					/>

					<InputError message={errors.firstName} className="mt-2" />
				</div>

				<div>
					<Label htmlFor="lastName">Last Name</Label>

					<Input
						id="lastName"
						name="lastName"
						value={data.lastName}
						className="mt-1 block w-full"
						autoComplete="family-name"
						onChange={(e) => setData('lastName', e.target.value)}
						required
					/>

					<InputError message={errors.lastName} className="mt-2" />
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
					<Label htmlFor="phoneNumber">Phone Number</Label>

					<Input
						id="phoneNumber"
						type="tel"
						name="phoneNumber"
						value={data.phoneNumber}
						className="mt-1 block w-full"
						autoComplete="username"
						onChange={(e) => setData('phoneNumber', e.target.value)}
						required
					/>

					<InputError message={errors.phoneNumber} className="mt-2" />
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
					<Label htmlFor="passwordConfirmation">Confirm Password</Label>

					<Input
						id="passwordConfirmation"
						type="password"
						name="passwordConfirmation"
						value={data.passwordConfirmation}
						className="mt-1 block w-full"
						autoComplete="new-password"
						onChange={(e) => setData('passwordConfirmation', e.target.value)}
						required
					/>

					<InputError message={errors.passwordConfirmation} className="mt-2" />
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
