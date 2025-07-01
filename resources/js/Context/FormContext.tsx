import { createContext, useContext, ReactNode } from 'react'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { InertiaFormProps } from '@inertiajs/react/types/useForm'

// Create the context with undefined default value
// We'll use type assertion since we know the context will be provided before use
export const FormContext = createContext<InertiaFormProps>(undefined)

// Form provider component
export function FormProvider<TForm extends Record<string, any>>({
	children,
	initialValues,
	preserveState = false,
	resetOnSuccess = false,
}: FormProviderProps<TForm>) {
	// Use Inertia's useForm hook
	const formMethods = useInertiaForm(initialValues, {
		preserveState,
		resetOnSuccess,
	})

	return (
		<FormContext.Provider value={formMethods as FormContextType<TForm>}>
			{children}
		</FormContext.Provider>
	)
}

// Custom hook to use form context
export function useForm<
	TForm extends Record<string, any>,
>(): FormContextType<TForm> {
	const context = useContext(FormContext)

	if (context === undefined) {
		throw new Error('useForm must be used within a FormProvider')
	}

	return context as FormContextType<TForm>
}

// Export the original useForm in case it's needed
export { useInertiaForm }
