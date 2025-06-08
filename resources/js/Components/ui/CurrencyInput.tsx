import { Input, InputProps } from './Input'

export const CurrencyInput = (props: InputProps) => {
	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<span className="text-muted-foreground">$</span>
			</div>
			<Input
				id="currency"
				type="number"
				min={0}
				max={10000}
				step={0.01}
				placeholder="0.00"
				className="pl-9"
				{...props}
			/>
		</div>
	)
}
