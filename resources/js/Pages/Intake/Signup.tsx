import { PageProps, Child, User } from '@/types'
import IntakeLayout from '@/Layouts/IntakeLayout'
import { useForm } from '@inertiajs/react'
import { Button, Input, InputError, Label } from '@/Components/ui'
import { ChildrenTable } from '@/Components/ChildrenTable'

interface StartPageProps extends PageProps {
	user: User
	maritalStatus: Record<string, string>
	ethnicity: Record<string, string>
	regions: {
		id: string
		description: string
	}[]
}

export default function StartPage({
	user,
	maritalStatus,
	ethnicity,
	regions,
}: StartPageProps) {
	const { data, setData, post, errors, processing } = useForm({
		address_line_1: '',
		address_line_2: '',
		city: '',
		state: '',
		zipcode: '',
		employer: '',
		t_shirt_size: '',
		home_phone_number: user.phone_number?.toString(),
		work_phone_number: '',
		cell_phone_number: '',
		alt_contact_number: '',
		probation_parole_case_worker_name: '',
		probation_parole_case_worker_phone: '',
		marital_status: '',
		ethnicity: '',
		monthtly_child_support: '',
		region_id: '',
		children_info: [
			{
				first_name: '',
				last_name: '',
				date_of_birth: '',
				child_support: 0,
				custody: false,
				visitation: false,
				phone_contact: false,
			},
		] as Child[],
	})

	const addChild = () => {
		// Create a new empty child object with default values
		const newChild: Child = {
			first_name: '',
			last_name: '',
			date_of_birth: '', // Empty string, you can use an initial date string if needed
			child_support: 0,
			custody: false,
			visitation: false,
			phone_contact: false,
		}

		// Update the children array with the new child
		setData((prevData) => ({
			...prevData,
			children_info: [...prevData.children_info, newChild],
		}))
	}

	return (
		<IntakeLayout title="Sign Up" subtitle="Welcome, we're happy to have you!">
			{Object.keys(errors).length > 0 && (
				<div className="text-red-600 text-lg text-center pb-4">
					Please fix the errors and resubmit
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					post(route('intake.signup'))
				}}
			>
				<div className="flex flex-col gap-y-3">
					<div>
						<Label>Address Line 1</Label>
						<Input
							placeholder="Address Line 1"
							className="w-full"
							autoComplete="off"
							value={data.address_line_1}
							onChange={(e) => setData('address_line_1', e.target.value)}
						/>
						<InputError message={errors.address_line_1} className="mt-2" />
					</div>
					<div>
						<Label>Address Line 2</Label>
						<Input
							placeholder="Address Line 2"
							className="w-full"
							autoComplete="off"
							value={data.address_line_2}
							onChange={(e) => setData('address_line_2', e.target.value)}
						/>
						<InputError message={errors.address_line_2} className="mt-2" />
					</div>
					<div className="flex gap-x-3">
						<div className="w-full">
							<Label>City</Label>
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
							<Label>State</Label>
							<Input
								placeholder="State"
								className="inline"
								autoComplete="off"
								value={data.state}
								onChange={(e) => setData('state', e.target.value)}
							/>
							<InputError message={errors.state} className="mt-2" />
						</div>
						<div className="w-full">
							<Label>Zip Code</Label>
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
							value={data.employer}
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
							value={data.t_shirt_size}
							onChange={(e) => setData('t_shirt_size', e.target.value)}
						/>
						<InputError message={errors.t_shirt_size} className="mt-2" />
					</div>
					<div>
						<Label>Home Phone Number</Label>
						<Input
							type="tel"
							placeholder="Home Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.home_phone_number}
							onChange={(e) => setData('home_phone_number', e.target.value)}
						/>
						<InputError message={errors.home_phone_number} className="mt-2" />
					</div>
					<div>
						<Label>Work Phone Number</Label>
						<Input
							type="tel"
							placeholder="Work Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.work_phone_number}
							onChange={(e) => setData('work_phone_number', e.target.value)}
						/>
						<InputError message={errors.work_phone_number} className="mt-2" />
					</div>
					<div>
						<Label>Cell Phone Number</Label>
						<Input
							type="tel"
							placeholder="Cell Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.cell_phone_number}
							onChange={(e) => setData('cell_phone_number', e.target.value)}
						/>
						<InputError message={errors.cell_phone_number} className="mt-2" />
					</div>
					<div>
						<Label>Alternate Phone Number</Label>
						<Input
							type="tel"
							placeholder="Alternate Phone Number"
							autoComplete="off"
							className="w-full"
							value={data.alt_contact_number}
							onChange={(e) => setData('alt_contact_number', e.target.value)}
						/>
						<InputError message={errors.alt_contact_number} className="mt-2" />
					</div>
					<div>
						<Label>Probation Officer's Name</Label>
						<Input
							placeholder="Probation Officer's Name"
							className="w-full"
							autoComplete="off"
							value={data.probation_parole_case_worker_name}
							onChange={(e) =>
								setData('probation_parole_case_worker_name', e.target.value)
							}
						/>
						<InputError
							message={errors.probation_parole_case_worker_name}
							className="mt-2"
						/>
					</div>
					<div>
						<Label>Probation Officer's Phone Number</Label>
						<Input
							placeholder="Probation Officer's Phone Number"
							className="w-full"
							autoComplete="off"
							value={data.probation_parole_case_worker_phone}
							onChange={(e) =>
								setData('probation_parole_case_worker_phone', e.target.value)
							}
						/>
						<InputError
							message={errors.probation_parole_case_worker_phone}
							className="mt-2"
						/>
					</div>
					<div>
						<Label>Marital Status</Label>
						<select
							className="w-full border p-2 rounded"
							value={data.marital_status}
							onChange={(e) => setData('marital_status', e.target.value)}
						>
							<option value="">Martial Status</option>
							{Object.entries(maritalStatus).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</select>
						<InputError message={errors.marital_status} className="mt-2" />
					</div>
					<div>
						<Label>Ethnicity</Label>
						<select
							className="w-full border p-2 rounded"
							value={data.ethnicity}
							onChange={(e) => setData('ethnicity', e.target.value)}
						>
							<option value="">Ethnicity</option>
							{Object.entries(ethnicity).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</select>
						<InputError message={errors.ethnicity} className="mt-2" />
					</div>
					<div>
						<ChildrenTable
							childrenInfo={data.children_info}
							setChildrenInfo={(children) => setData('children_info', children)}
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
						<Label>Region</Label>
						<select
							className="w-full border p-2 rounded"
							value={data.region_id}
							onChange={(e) => setData('region_id', e.target.value)}
						>
							<option value="">Region ID</option>
							{regions?.map((region) => (
								<option key={region.id} value={region.id}>
									{region.description}
								</option>
							))}
						</select>
						<InputError message={errors.region_id} className="mt-2" />
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
