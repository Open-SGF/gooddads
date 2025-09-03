import { Checkbox, Label } from '@/Components/ui'
import { FormDataType, useForm } from '@/Context/FormContext'
import type { ConditionalKeys } from 'type-fest'
import { FormDataConvertible } from '@inertiajs/core'

type FormKeysType<T extends FormDataConvertible> = Extract<
	ConditionalKeys<T, boolean>,
	string
>

type CheckboxFieldProps<T extends FormDataConvertible> = {
	id: FormKeysType<T>
	label: string
}

export default function CheckboxField<T extends FormDataType>({
	id,
	label,
}: CheckboxFieldProps<T>) {
	const { data, setData } = useForm<T>()

	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={id}
				checked={!!data[id]}
				onCheckedChange={(checked) => setData(id, checked)}
			/>
			<Label htmlFor={id} className="cursor-pointer">
				{label}
			</Label>
		</div>
	)
}
