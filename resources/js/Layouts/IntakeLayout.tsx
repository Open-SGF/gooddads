import React, { PropsWithChildren } from 'react'

interface IntakeLayoutProps extends PropsWithChildren {
	progress?: {
		current: number
		total: number
	}
	title: React.ReactNode
	subtitle?: React.ReactNode
}

export default function IntakeLayout({
	children,
	title,
	subtitle,
	progress,
}: IntakeLayoutProps) {
	return (
		<div className="min-h-screen w-full flex justify-center">
			<div className="flex flex-col min-w-[350px] w-fit border border-slate-300 rounded-sm mt-6 px-6 py-4 shadow-md overflow-hidden ">
				<div className={'text-[24px] font-bold leading-7 text-center'}>
					{title}
				</div>
				{subtitle && (
					<div className={'text-[16px] my-2  leading-5 text-center '}>
						{subtitle}
					</div>
				)}

				<div className={'flex flex-col mt-5'}>{children}</div>
			</div>
		</div>
	)
}
