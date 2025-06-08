import {
	MaritalStatus,
	Ethnicity,
	ChildForm,
	ParticipantSignupForm,
	ParticipantRegistrationProps,
} from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { useForm } from '@inertiajs/react'
import {
	Button,
	Input,
	InputError,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui'
import { ChildrenTable } from '@/Components/ChildrenTable'
import { FormEvent, useEffect } from 'react'
import { toast } from 'sonner'

export default function StartPage({
	maritalStatus,
	ethnicity,
	regions,
}: ParticipantRegistrationProps) {
	const newChild: ChildForm = {
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		childSupport: 0,
		custody: false,
		visitation: false,
		phoneContact: false,
	}

	const { data, setData, post, errors, processing } =
		useForm<ParticipantSignupForm>({
			addressLine1: '',
			addressLine2: null,
			city: '',
			state: '',
			zipcode: '',
			employer: null,
			tShirtSize: null,
			homePhoneNumber: null,
			workPhoneNumber: null,
			cellPhoneNumber: null,
			altContactNumber: null,
			probationParoleCaseWorkerPhone: null,
			probationParoleCaseWorkerName: null,
			maritalStatus: 'single',
			ethnicity: 'white',
			regionId: '',
			children: [newChild],
		})

	const addChild = () => {
		setData((prevData) => ({
			...prevData,
			children: [...prevData.children, newChild],
		}))
	}

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			toast.error('Please fix the errors and resubmit')
		}
	}, [errors])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		post(route('intake.participantRegister'))
	}

	return (
		<IntakeLayout title="Sign Up" subtitle="Welcome, we're happy to have you!">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-y-3">
					<div>
						<Label required error={!!errors.addressLine1}>
							Address Line 1
						</Label>
						<Input
							placeholder="Address Line 1"
							className="w-full"
							autoComplete="off"
							value={data.addressLine1}
							onChange={(e) => setData('addressLine1', e.target.value)}
						/>
						<InputError message={errors.addressLine1} className="mt-2" />
					</div>
					<div>
						<Label>Address Line 2</Label>
						<Input
							placeholder="Address Line 2"
							className="w-full"
							autoComplete="off"
							value={data.addressLine2 ?? ''}
							onChange={(e) => setData('addressLine2', e.target.value)}
						/>
						<InputError message={errors.addressLine2} className="mt-2" />
					</div>
					<div className="flex gap-x-3">
						<div className="w-full">
							<Label required error={!!errors.city}>
								City
							</Label>
							<Input
								placeholder="City"
								className="inline"
								autoComplete="off"
								value={data.city}
								onChange={(e) => setData('city', e.target.value)}
							/>
							<InputError message={errors.city} className="mt-2" />
						</div>
						<div className="w-full">
							<Label required error={!!errors.state}>
								State
							</Label>
							<Select
								value={data.state}
								onValueChange={(value) => setData('state', value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="State" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="AL">Alabama</SelectItem>
									<SelectItem value="AK">Alaska</SelectItem>
									<SelectItem value="AZ">Arizona</SelectItem>
									<SelectItem value="AR">Arkansas</SelectItem>
									<SelectItem value="CA">California</SelectItem>
									<SelectItem value="CO">Colorado</SelectItem>
									<SelectItem value="CT">Connecticut</SelectItem>
									<SelectItem value="DE">Delaware</SelectItem>
									<SelectItem value="DC">District Of Columbia</SelectItem>
									<SelectItem value="FL">Florida</SelectItem>
									<SelectItem value="GA">Georgia</SelectItem>
									<SelectItem value="HI">Hawaii</SelectItem>
									<SelectItem value="ID">Idaho</SelectItem>
									<SelectItem value="IL">Illinois</SelectItem>
									<SelectItem value="IN">Indiana</SelectItem>
									<SelectItem value="IA">Iowa</SelectItem>
									<SelectItem value="KS">Kansas</SelectItem>
									<SelectItem value="KY">Kentucky</SelectItem>
									<SelectItem value="LA">Louisiana</SelectItem>
									<SelectItem value="ME">Maine</SelectItem>
									<SelectItem value="MD">Maryland</SelectItem>
									<SelectItem value="MA">Massachusetts</SelectItem>
									<SelectItem value="MI">Michigan</SelectItem>
									<SelectItem value="MN">Minnesota</SelectItem>
									<SelectItem value="MS">Mississippi</SelectItem>
									<SelectItem value="MO">Missouri</SelectItem>
									<SelectItem value="MT">Montana</SelectItem>
									<SelectItem value="NE">Nebraska</SelectItem>
									<SelectItem value="NV">Nevada</SelectItem>
									<SelectItem value="NH">New Hampshire</SelectItem>
									<SelectItem value="NJ">New Jersey</SelectItem>
									<SelectItem value="NM">New Mexico</SelectItem>
									<SelectItem value="NY">New York</SelectItem>
									<SelectItem value="NC">North Carolina</SelectItem>
									<SelectItem value="ND">North Dakota</SelectItem>
									<SelectItem value="OH">Ohio</SelectItem>
									<SelectItem value="OK">Oklahoma</SelectItem>
									<SelectItem value="OR">Oregon</SelectItem>
									<SelectItem value="PA">Pennsylvania</SelectItem>
									<SelectItem value="RI">Rhode Island</SelectItem>
									<SelectItem value="SC">South Carolina</SelectItem>
									<SelectItem value="SD">South Dakota</SelectItem>
									<SelectItem value="TN">Tennessee</SelectItem>
									<SelectItem value="TX">Texas</SelectItem>
									<SelectItem value="UT">Utah</SelectItem>
									<SelectItem value="VT">Vermont</SelectItem>
									<SelectItem value="VA">Virginia</SelectItem>
									<SelectItem value="WA">Washington</SelectItem>
									<SelectItem value="WV">West Virginia</SelectItem>
									<SelectItem value="WI">Wisconsin</SelectItem>
									<SelectItem value="WY">Wyoming</SelectItem>
								</SelectContent>
							</Select>
							<InputError message={errors.state} className="mt-2" />
						</div>
						<div className="w-full">
							<Label required error={!!errors.zipcode}>
								Zip Code
							</Label>
							<Input
								placeholder="Zip Code"
								className="inline"
								autoComplete="off"
								value={data.zipcode}
								onChange={(e) => setData('zipcode', e.target.value)}
							/>
							<InputError message={errors.zipcode} className="mt-2" />
						</div>
					</div>
					<div>
						<Label>Employer</Label>
						<Input
							placeholder="Employer"
							className="w-full"
							autoComplete="off"
							value={data.employer ?? ''}
							onChange={(e) => setData('employer', e.target.value)}
						/>
						<InputError message={errors.employer} className="mt-2" />
					</div>
					<div>
						<Label>T-shirt Size</Label>
						<Input
							placeholder="T-shirt Size"
							className="w-full"
							autoComplete="off"
							value={data.tShirtSize ?? ''}
							onChange={(e) => setData('tShirtSize', e.target.value)}
						/>
						<InputError message={errors.tShirtSize} className="mt-2" />
					</div>
					<div>
						<Label error={!!errors.homePhoneNumber}>Home Phone Number</Label>
						<Input
							type="tel"
							placeholder="Home Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.homePhoneNumber ?? ''}
							onChange={(e) => setData('homePhoneNumber', e.target.value)}
						/>
						<InputError message={errors.homePhoneNumber} className="mt-2" />
					</div>
					<div>
						<Label error={!!errors.workPhoneNumber}>Work Phone Number</Label>
						<Input
							type="tel"
							placeholder="Work Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.workPhoneNumber ?? ''}
							onChange={(e) => setData('workPhoneNumber', e.target.value)}
						/>
						<InputError message={errors.workPhoneNumber} className="mt-2" />
					</div>
					<div>
						<Label error={!!errors.cellPhoneNumber}>Cell Phone Number</Label>
						<Input
							type="tel"
							placeholder="Cell Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.cellPhoneNumber ?? ''}
							onChange={(e) => setData('cellPhoneNumber', e.target.value)}
						/>
						<InputError message={errors.cellPhoneNumber} className="mt-2" />
					</div>
					<div>
						<Label error={!!errors.altContactNumber}>
							Alternate Phone Number
						</Label>
						<Input
							type="tel"
							placeholder="Alternate Phone Number"
							autoComplete="off"
							className="w-full"
							value={data.altContactNumber ?? ''}
							onChange={(e) => setData('altContactNumber', e.target.value)}
						/>
						<InputError message={errors.altContactNumber} className="mt-2" />
					</div>
					<div>
						<Label>Probation Officer's Name</Label>
						<Input
							placeholder="Probation Officer's Name"
							className="w-full"
							autoComplete="off"
							value={data.probationParoleCaseWorkerName ?? ''}
							onChange={(e) =>
								setData('probationParoleCaseWorkerName', e.target.value)
							}
						/>
						<InputError
							message={errors.probationParoleCaseWorkerName}
							className="mt-2"
						/>
					</div>
					<div>
						<Label>Probation Officer's Phone Number</Label>
						<Input
							placeholder="Probation Officer's Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.probationParoleCaseWorkerPhone ?? ''}
							onChange={(e) =>
								setData('probationParoleCaseWorkerPhone', e.target.value)
							}
						/>
						<InputError
							message={errors.probationParoleCaseWorkerPhone}
							className="mt-2"
						/>
					</div>
					<div>
						<Label required error={!!errors.maritalStatus}>
							Marital Status
						</Label>
						<Select
							value={data.maritalStatus ?? ''}
							onValueChange={(value: MaritalStatus) =>
								setData('maritalStatus', value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(maritalStatus).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										{value}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<InputError message={errors.maritalStatus} className="mt-2" />
					</div>
					<div>
						<Label required error={!!errors.ethnicity}>
							Ethnicity
						</Label>
						<Select
							value={data.ethnicity ?? ''}
							onValueChange={(value: Ethnicity) => setData('ethnicity', value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select as ethnicity" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(ethnicity).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										{value}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<InputError message={errors.ethnicity} className="mt-2" />
					</div>
					<div>
						<ChildrenTable
							childrenInfo={data.children}
							setChildren={(children) => setData('children', children)}
							errors={errors}
						/>
					</div>
					<div className="flex justify-center">
						<Button
							className="ms-4"
							onClick={addChild}
							size="default"
							variant="default"
							type="button"
						>
							Add child
						</Button>
					</div>
					<div>
						<Label required error={!!errors.regionId}>
							Region
						</Label>
						<Select
							value={data.regionId ?? ''}
							onValueChange={(value: string) => setData('regionId', value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a region" />
							</SelectTrigger>
							<SelectContent>
								{regions?.map((region) => (
									<SelectItem key={region.id} value={region.id}>
										{region.description}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<InputError message={errors.regionId} className="mt-2" />
					</div>
					<div className="flex justify-center">
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
