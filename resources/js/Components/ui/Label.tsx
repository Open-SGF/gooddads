import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants> & {
			required?: boolean
			error?: boolean
		}
>(({ className, required, error, ...props }, ref) => {
	return (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(
				error && 'text-destructive',
				required && 'after:ml-0.5 after:text-destructive after:content-["*"]',
				labelVariants(),
				className,
			)}
			{...props}
		/>
	)
})
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
