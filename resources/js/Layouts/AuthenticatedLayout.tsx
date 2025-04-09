import { useState, PropsWithChildren, ReactNode } from 'react'
import ApplicationLogo from '@/Components/ui/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import { ResponsiveNavLink } from '@/Components/ui/ResponsiveNavLink'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from '@/Components/ui'
import { Link } from '@inertiajs/react'
import { usePermission } from '@/hooks/permissions'
import { UserData } from '@/types'
import {
	House,
	Users,
	FileChartColumn,
	FolderClosed,
	GraduationCap,
	LogOut,
} from 'lucide-react'

export default function Authenticated({
	user,
	header,
	children,
}: PropsWithChildren<{
	user: UserData
	header?: ReactNode
}>) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false)
	const { hasPermission } = usePermission(user)

	return (
		<div className="min-h-screen dark:bg-gray-900 flex flex-row">
			<div className="max-w-3xs flex flex-col flex-[1_1_200px] border-r border-var(--border) hidden sm:flex">
				<div className="p-4 sm:p-6 lg:p-8 shrink-0 flex items-center justify-center">
					<Link href="/">
						<ApplicationLogo variant="horizontal-black" size={120} />
					</Link>
				</div>
				<NavigationMenu className="w-full max-w-full [&>div]:w-full">
					<NavigationMenuList className="flex flex-col w-full space-x-0">
						<NavigationMenuItem className="w-full">
							<NavigationMenuLink
								href={route('home')}
								active={route().current('home')}
							>
								<House
									className="transition-colors group-hover/navlink:stroke-black group-focus/navlink:stroke-black group-data-[active]/navlink:stroke-white group-data-[state=open]/navlink:stroke-white"
									color="black"
									size={20}
								/>{' '}
								Dashboard
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem className="w-full">
							{hasPermission('list users') && (
								<NavigationMenuLink
									href={route('users.list')}
									active={route().current('users.list')}
								>
									<Users
										className="transition-colors group-hover/navlink:stroke-black group-focus/navlink:stroke-black group-data-[active]/navlink:stroke-white group-data-[state=open]/navlink:stroke-white"
										color="black"
										size={20}
									/>{' '}
									Users
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
						<NavigationMenuItem className="w-full">
							{hasPermission('list curriculum') && (
								<NavigationMenuLink
									href={route('curriculum.list')}
									active={route().current('curriculum.list')}
								>
									<FolderClosed
										className="transition-colors group-hover/navlink:stroke-black group-focus/navlink:stroke-black group-data-[active]/navlink:stroke-white group-data-[state=open]/navlink:stroke-white"
										color="black"
										size={20}
									/>{' '}
									Curriculum
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
						<NavigationMenuItem className="w-full">
							{hasPermission('list classes') && (
								<NavigationMenuLink
									href={route('classes.list')}
									active={route().current('classes.list')}
								>
									<GraduationCap
										className="transition-colors group-hover/navlink:stroke-black group-focus/navlink:stroke-black group-data-[active]/navlink:stroke-white group-data-[state=open]/navlink:stroke-white"
										color="black"
										size={20}
									/>{' '}
									Classes
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
						<NavigationMenuItem className="w-full">
							{hasPermission('list reports') && (
								<NavigationMenuLink
									href={route('reports.list')}
									active={route().current('reports.list')}
								>
									<FileChartColumn
										className="transition-colors group-hover/navlink:stroke-black group-focus/navlink:stroke-black group-data-[active]/navlink:stroke-white group-data-[state=open]/navlink:stroke-white"
										color="black"
										size={20}
									/>{' '}
									Reports
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<ResponsiveNavLink
					method="post"
					href={route('logout')}
					as="button"
					className="group/logout flex w-full justify-start items-center gap-4 px-7 py-5 text-sm font-medium transition-colors hover:text-sidebar-ring focus:text-sidebar-ring"
				>
					<LogOut
						className="transition-colors group-hover/logout:stroke-sidebar-ring group-focus/logout:stroke-sidebar-ring"
						color="black"
						size={20}
					/>{' '}
					Log Out
				</ResponsiveNavLink>
			</div>

			<div className="flex flex-col flex-[1_1_80%]">
				<div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 h-fit">
					<div className="flex justify-between">
						<div className="flex items-center space-x-8 sm:flex">
							{header && (
								<header className="bg-white dark:bg-gray-800 flex flex-row">
									<div className="p-4 sm:p-6 lg:p-8 shrink-0 flex items-center justify-center sm:hidden">
										<Link href="/">
											<ApplicationLogo variant="horizontal-black" size={80} />
										</Link>
									</div>
									<div className="mx-auto py-8 sm:py-10 lg:py-12 px-6 sm:px-8 lg:px-10 flex items-center">
										{header}
									</div>
								</header>
							)}
						</div>

						<div className="flex items-center hidden sm:flex py-8 sm:py-10 lg:py-12 px-6 sm:px-8 lg:px-10">
							<div className="ms-3 relative">
								<Dropdown>
									<Dropdown.Trigger>
										<span className="inline-flex rounded-md">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
											>
												{`${user.firstName} ${user.lastName}`}

												<svg
													className="ms-2 -me-0.5 h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
										</span>
									</Dropdown.Trigger>

									<Dropdown.Content>
										<Dropdown.Link href={route('profile.edit')}>
											Profile
										</Dropdown.Link>
										<Dropdown.Link
											href={route('logout')}
											method="post"
											as="button"
										>
											Log Out
										</Dropdown.Link>
									</Dropdown.Content>
								</Dropdown>
							</div>
						</div>

						<div className="-me-2 flex items-center sm:hidden">
							<button
								onClick={() =>
									setShowingNavigationDropdown(
										(previousState) => !previousState,
									)
								}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
							>
								<svg
									className="h-6 w-6"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										className={
											!showingNavigationDropdown ? 'inline-flex' : 'hidden'
										}
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
									<path
										className={
											showingNavigationDropdown ? 'inline-flex' : 'hidden'
										}
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>

					<div
						className={
							(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'
						}
					>
						<div className="pt-2 pb-3 space-y-1">
							<ResponsiveNavLink
								href={route('home')}
								active={route().current('home')}
							>
								Dashboard
							</ResponsiveNavLink>

							{hasPermission('list users') && (
								<ResponsiveNavLink
									href={route('users.list')}
									active={route().current('users.list')}
								>
									Users
								</ResponsiveNavLink>
							)}

							{hasPermission('list curriculum') && (
								<ResponsiveNavLink
									href={route('curriculum.list')}
									active={route().current('curriculum.list')}
								>
									Curriculum
								</ResponsiveNavLink>
							)}

							{hasPermission('list classes') && (
								<ResponsiveNavLink
									href={route('classes.list')}
									active={route().current('classes.list')}
								>
									Classes
								</ResponsiveNavLink>
							)}

							{hasPermission('list reports') && (
								<ResponsiveNavLink
									href={route('reports.list')}
									active={route().current('reports.list')}
								>
									Reports
								</ResponsiveNavLink>
							)}
						</div>

						<div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
							<div className="px-4">
								<div className="font-medium text-base text-gray-800 dark:text-gray-200">
									{user.firstName} {user.lastName}
								</div>
								<div className="font-medium text-sm text-gray-500">
									{user.email}
								</div>
							</div>

							<div className="mt-3 space-y-1">
								<ResponsiveNavLink href={route('profile.edit')}>
									Profile
								</ResponsiveNavLink>
								<ResponsiveNavLink
									method="post"
									href={route('logout')}
									as="button"
								>
									Log Out
								</ResponsiveNavLink>
							</div>
						</div>
					</div>
				</div>

				<main>{children}</main>
			</div>
		</div>
	)
}
