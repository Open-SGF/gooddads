import { createContext, useContext, ReactNode } from 'react'
import { useForm as useInertiaForm } from '@inertiajs/react'
import type { InertiaFormProps } from '@inertiajs/react'
import { FormDataConvertible } from '@inertiajs/core'

export type FormDataType = Record<string, FormDataConvertible>
export type FormContextType<T extends FormDataType> = InertiaFormProps<T>

export const FormContext = createContext<FormContextType<FormDataType> | null>(
	null,
)

interface FormProviderProps<TForm extends FormDataType> {
	children: ReactNode
	initialValues?: TForm
}

export function FormProvider<
	TForm extends Record<string, FormDataConvertible>,
>({ children, initialValues }: FormProviderProps<TForm>) {
	const formMethods = useInertiaForm(initialValues)

	return (
		<FormContext.Provider
			value={formMethods as unknown as FormContextType<FormDataType>}
		>
			{children}
		</FormContext.Provider>
	)
}

export function useForm<
	TForm extends Record<string, FormDataConvertible>,
>(): FormContextType<TForm> {
	const context = useContext(FormContext)

	if (context === null) {
		throw new Error('useForm must be used within a FormProvider')
	}

	// Cast the context back to the requested generic type
	return context as unknown as FormContextType<TForm>
}

export { useInertiaForm }
