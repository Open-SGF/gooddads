import React from 'react'
import { Button, Checkbox, Input, InputError, Label } from '@/Components/ui'
import { ChildData } from '@/types'
import { CurrencyInput } from '@/Components/ui/CurrencyInput'

export interface ChildrenTableProps {
	childrenInfo: ChildData[]
	setChildren: (children: ChildData[]) => void
	errors: Record<string, string | undefined>
}

const ChildrenTable = React.forwardRef<HTMLTableElement, ChildrenTableProps>(
	({ childrenInfo: children, setChildren, errors }) => {
		const handleInputChange = (
			index: number,
			field: keyof ChildData,
			value: unknown,
		) => {
			// Update the value of a specific field in the child object at the given index
			const updatedChildren = [...children]
			updatedChildren[index] = { ...updatedChildren[index], [field]: value }
			setChildren(updatedChildren)
		}

		const handleDelete = (index: number) => {
			const updatedChildren = children.filter((_, i) => i !== index)
			setChildren(updatedChildren) // Make sure to update the parent state
		}

		return (
			<div className="flex flex-col max-w-[768px]">
				<div className="flex flex-col items-center p-8">
					<Label className="text-2xl">Family Information</Label>
				</div>
				<div className="flex flex-col">
					{children?.map((child, index) => (
						<div key={index} className="grid grid-cols-4 border-b mb-4 pb-4">
							<div className="flex-1 p-2">
								<Label>First Name</Label>

								<Input
									placeholder="First name"
									className="w-full"
									autoComplete="off"
									value={child.firstName}
									onChange={(e) =>
										handleInputChange(index, 'firstName', e.target.value)
									}
								/>
								<InputError
									message={errors[`children.${index}.firstName`]?.replace(
										`children.${index}.firstName`,
										'First name',
									)}
									className="mt-2"
								/>
							</div>
							<div className="flex-1 p-2">
								<Label>Last Name</Label>
								<Input
									placeholder="Last name"
									className="w-full"
									autoComplete="off"
									value={child.lastName}
									onChange={(e) =>
										handleInputChange(index, 'lastName', e.target.value)
									}
								/>
								<InputError
									message={errors[`children.${index}.lastName`]?.replace(
										`children.${index}.lastName`,
										'Last name',
									)}
									className="mt-2"
								/>
							</div>
							<div className="flex-1 p-2">
								<Label>Date of Birth</Label>
								<Input
									type="date"
									placeholder="Date of Birth"
									className="w-full"
									autoComplete="off"
									value={child.dateOfBirth}
									onChange={(e) =>
										handleInputChange(index, 'dateOfBirth', e.target.value)
									}
								/>
								<InputError
									message={errors[`children.${index}.dateOfBirth`]?.replace(
										`children.${index}.dateOfBirth`,
										'Date of birth',
									)}
									className="mt-2"
								/>
							</div>
							<div className="flex flex-col p-3 gap-3 row-span-2">
								<Label>Contact Level</Label>
								<div className="flex p-2 items-center gap-1">
									<Checkbox
										id="custody"
										checked={child.custody ?? false}
										onCheckedChange={(isChecked) =>
											handleInputChange(index, 'custody', isChecked)
										}
									/>
									<Label htmlFor="custody">Custody</Label>
									<InputError
										message={errors[`children.${index}.custody`]}
										className="mt-2"
									/>
								</div>
								<div className="flex p-2 items-center gap-1">
									<Checkbox
										id="visitation"
										checked={child.visitation ?? false}
										onCheckedChange={(isChecked) =>
											handleInputChange(index, 'visitation', isChecked)
										}
									/>
									<Label htmlFor="visitation">Visitation</Label>
									<InputError
										message={errors[`children.${index}.visitation`]}
										className="mt-2"
									/>
								</div>
								<div className="flex p-2 items-center gap-1">
									<Checkbox
										id="phoneContact"
										checked={!!child.phoneContact}
										onCheckedChange={(isChecked) =>
											handleInputChange(index, 'phoneContact', isChecked)
										}
									/>
									<Label htmlFor="phoneContact">Phone Contact</Label>
									<InputError
										message={errors[`children.${index}.phoneContact`]?.replace(
											`children.${index}.phoneContact`,
											'Phone contact',
										)}
										className="mt-2"
									/>
								</div>
							</div>
							<div className="flex-1 p-2 col-span-2">
								<Label>Monthly Child Support</Label>
								<CurrencyInput
									type="number"
									placeholder="Monthy Child Support"
									className="w-full"
									autoComplete="off"
									value={child.childSupport}
									onChange={(e) =>
										handleInputChange(
											index,
											'childSupport',
											parseFloat(e.target.value),
										)
									}
								/>
								<InputError
									message={errors[`children.${index}.childSupport`]?.replace(
										`children.${index}.childSupport`,
										'Child support',
									)}
									className="mt-2"
								/>
							</div>

							<div className="flex items-end justify-center p-2">
								<Button
									type="button"
									onClick={() => handleDelete(index)}
									size="default"
								>
									Remove
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	},
)
ChildrenTable.displayName = 'ChildrenTable'
export { ChildrenTable }
