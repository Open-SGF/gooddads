import { PageProps } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { useForm } from '@inertiajs/react'
import { format } from 'date-fns'
import { Button, Input, InputError } from '@/Components/ui'

interface StartPageProps extends PageProps {
	sessionId: string
	formData: StartForm
}

interface StartForm {
	sessionId: string
	// fullName: string
	// date: string
	addressLine1: string
	addressLine2: string
	addressCity: string
	addressZipcode: string
	addressState: string
	phone: string
	alternateContactName: string
	alternateContactNumber: string
	childName: string
}

const currentDate = () => {
	return format(new Date(), 'mm/dd/yyyy')
}

export default function StartPage({
	sessionId,
	formData: defaultFormData,
}: StartPageProps) {
	const { data, setData, post, errors, processing } = useForm<StartForm>({
		sessionId: defaultFormData?.sessionId ?? '',
		// fullName: defaultFormData?.fullName ?? '',
		// date: defaultFormData?.date ?? currentDate(),
		addressLine1: defaultFormData?.addressLine1 ?? '',
		addressLine2: defaultFormData?.addressLine2 ?? '',
		addressCity: defaultFormData?.addressCity ?? '',
		addressZipcode: defaultFormData?.addressZipcode ?? '',
		addressState: defaultFormData?.addressState ?? '',
		phone: defaultFormData?.phone ?? '',
		alternateContactName: defaultFormData?.alternateContactName ?? '',
		alternateContactNumber: defaultFormData?.alternateContactNumber ?? '',
		childName: defaultFormData?.childName ?? '',
	})

	return (
		<IntakeLayout
			title={'Sign Up'}
			subtitle={"Welcome, we're happy to have you!"}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					window.console.log('posting')

					post(route('intake.start'))
				}}
			>
				<div className={'flex flex-col gap-y-3'}>
					<div>
						<Input
							placeholder="Address Line 1"
							className="w-full"
							autoComplete={'off'}
							value={data.addressLine1}
							onChange={(e) => setData('addressLine1', e.target.value)}
						/>
						<InputError message={errors.addressLine1} className="mt-2" />
					</div>
					<div>
						<Input
							placeholder="Address Line 2"
							className="w-full"
							autoComplete={'off'}
							value={data.addressLine2}
							onChange={(e) => setData('addressLine2', e.target.value)}
						/>
						<InputError message={errors.addressLine2} className="mt-2" />
					</div>
					<div className={'flex gap-x-3'}>
						<div className={'w-full'}>
							<Input
								placeholder="City"
								className="inline"
								autoComplete={'off'}
								value={data.addressCity}
								onChange={(e) => setData('addressCity', e.target.value)}
							/>
							<InputError message={errors.addressCity} className="mt-2" />
						</div>
						<div className={'w-full'}>
							<Input
								placeholder="Zip Code"
								className="inline"
								autoComplete={'off'}
								value={data.addressZipcode}
								onChange={(e) => setData('addressZipcode', e.target.value)}
							/>
							<InputError message={errors.addressZipcode} className="mt-2" />
						</div>
					</div>
					<div>
						<Input
							type="tel"
							placeholder="Phone Number"
							className="w-full"
							autoComplete={'off'}
							value={data.phone}
							onChange={(e) => setData('phone', e.target.value)}
						/>
						<InputError message={errors.phone} className="mt-2" />
					</div>
					<div>
						<Input
							placeholder="Alternate Contact Name"
							autoComplete={'off'}
							className="w-full"
							value={data.alternateContactName}
							onChange={(e) => setData('alternateContactName', e.target.value)}
						/>
						<InputError
							message={errors.alternateContactName}
							className="mt-2"
						/>
					</div>
					<div>
						<Input
							type="tel"
							placeholder="Alternate Phone Number"
							autoComplete={'off'}
							className="w-full"
							value={data.alternateContactNumber}
							onChange={(e) =>
								setData('alternateContactNumber', e.target.value)
							}
						/>
						<InputError
							message={errors.alternateContactNumber}
							className="mt-2"
						/>
					</div>
					<div>
						<Input
							placeholder="Children's Name"
							className="w-full"
							autoComplete={'off'}
							value={data.childName}
							onChange={(e) => setData('childName', e.target.value)}
						/>
						<InputError message={errors.childName} className="mt-2" />
					</div>
					<div className={'flex justify-center'}>
						<Button
							className="ms-4"
							disabled={processing}
							size="default"
							variant="default"
						>
							Next
						</Button>
					</div>
				</div>
			</form>
		</IntakeLayout>
	)
}
