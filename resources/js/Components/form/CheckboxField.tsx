import { Checkbox, Label } from '@/Components/ui'
import { useForm } from '@/Context/FormContext'
import type { ConditionalKeys } from 'type-fest'

type CheckboxFieldProps<T extends Record<string, unknown>> = {
	id: Extract<ConditionalKeys<T, boolean>, string>
	label: string
}

export default function CheckboxField<T extends Record<string, unknown>>({
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
