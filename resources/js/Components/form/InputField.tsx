import { Input, Label } from '@/Components/ui'
import { FormDataType, useForm } from '@/Context/FormContext'
import React from 'react'
import { FormDataConvertible } from '@inertiajs/core'
import type { ConditionalKeys } from 'type-fest'

type FormKeysType<T extends FormDataConvertible> = Extract<keyof T, string>

type InputFieldProps<T extends FormDataConvertible> = {
	id: FormKeysType<T>
	label: string
	// Input field will not be rendered if this field is falsy
	conditionalField?: FormKeysType<T>
	required?: boolean
}

export default function InputField<T extends FormDataType>({
	id,
	label,
	conditionalField,
	required = false,
}: InputFieldProps<T>) {
	const { data, setData, errors } = useForm<T>()
	if (conditionalField && !data[conditionalField]) return

	return (
		<div className="ml-6 mt-2">
			<div className="space-y-2">
				<Label htmlFor={id}>
					{label}
					{required && <span className="text-red-500">*</span>}
				</Label>
				<Input
					id={id}
					type="text"
					name={id}
					value={(data[id] || '') as string}
					onChange={(e) => setData(id, e.target.value)}
					className={errors[id] ? 'border-red-500' : ''}
				/>

				{errors[id] && (
					<p className="mt-1 text-sm text-red-500">{errors[id]}</p>
				)}
			</div>
		</div>
	)
}
