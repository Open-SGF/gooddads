import { Link, InertiaLinkProps } from '@inertiajs/react'

const ResponsiveNavLink = ({
	active = false,
	className = '',
	children,
	...props
}: InertiaLinkProps & { active?: boolean }) => {
	return (
		<Link
			{...props}
			className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
				active ?
					'border-primary dark:border-primary text-foreground dark:text-foreground bg-primary/30 dark:bg-primary/30 focus:text-foreground dark:focus:text-foreground focus:bg-primary/50 dark:focus:bg-primary/50 focus:border-primary dark:focus:border-primary'
				:	'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600'
			} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
		>
			{children}
		</Link>
	)
}

export { ResponsiveNavLink }
