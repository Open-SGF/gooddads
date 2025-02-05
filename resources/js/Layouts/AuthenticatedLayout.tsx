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
import { User } from '@/types'
import { usePermission } from '@/hooks/permissions'
import { House, Users, FileChartColumn, FolderClosed, GraduationCap } from 'lucide-react'

export default function Authenticated({
	user,
	header,
	children,
}: PropsWithChildren<{
	user: User
	header?: ReactNode
}>) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false)
	const { hasPermission } = usePermission(user)

	return (
		<div className="min-h-screen dark:bg-gray-900 flex flex-row">
			<div className='max-w-s flex flex-col'>
<div className="p-4 sm:p-6 lg:p-8 shrink-0 flex items-center justify-center">
								<Link href="/">
									<ApplicationLogo variant="horizontal-black" size={86} />
								</Link>
							</div>
											<NavigationMenu className='justify-start'>
									<NavigationMenuList className='flex flex-col justify-start items-end'>
										<NavigationMenuItem className='w-full'>
											<NavigationMenuLink
												href={route('dashboard')}
												active={route().current('dashboard')}
												className="group/navlink inline-flex h-10 w-full justify-start items-center gap-4 px-7 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground focus:bg-primary focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[active]:text-foreground data-[state=open]:bg-primary/50 data-[state=open]:text-foreground"
											>
												<House className='transition-colors group-hover/navlink:stroke-white group-focus/navlink:stroke-white group-data-[active]/navlink:stroke-black group-data-[state=open]/navlink:stroke-black' color="black" size={20} /> Dashboard
											</NavigationMenuLink>
										</NavigationMenuItem>
										<NavigationMenuItem className='w-full'>
											{hasPermission('list users') && (
												<NavigationMenuLink
													href={route('users.list')}
													active={route().current('users.list')}
																									className="group/navlink inline-flex h-10 w-full justify-start items-center gap-4 px-7 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground focus:bg-primary focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[active]:text-foreground data-[state=open]:bg-primary/50 data-[state=open]:text-foreground"
												>
													<Users className='transition-colors group-hover/navlink:stroke-white group-focus/navlink:stroke-white group-data-[active]/navlink:stroke-black group-data-[state=open]/navlink:stroke-black' color="black" size={20} /> Users
												</NavigationMenuLink>
											)}
										</NavigationMenuItem>
										<NavigationMenuItem className='w-full'>
											{hasPermission('list users') && (
												<NavigationMenuLink
													href={route('users.list')}
													active={route().current('users.list')}
																									className="group/navlink inline-flex h-10 w-full justify-start items-center gap-4 px-7 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground focus:bg-primary focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[active]:text-foreground data-[state=open]:bg-primary/50 data-[state=open]:text-foreground"
												>
													<FolderClosed className='transition-colors group-hover/navlink:stroke-white group-focus/navlink:stroke-white group-data-[active]/navlink:stroke-black group-data-[state=open]/navlink:stroke-black' color="black" size={20} /> Curriculum
												</NavigationMenuLink>
											)}
										</NavigationMenuItem>
										<NavigationMenuItem className='w-full'>
											{hasPermission('list users') && (
												<NavigationMenuLink
													href={route('users.list')}
													active={route().current('users.list')}
																									className="group/navlink inline-flex h-10 w-full justify-start items-center gap-4 px-7 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground focus:bg-primary focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[active]:text-foreground data-[state=open]:bg-primary/50 data-[state=open]:text-foreground"
												>
													<GraduationCap className='transition-colors group-hover/navlink:stroke-white group-focus/navlink:stroke-white group-data-[active]/navlink:stroke-black group-data-[state=open]/navlink:stroke-black' color="black" size={20} /> Classes
												</NavigationMenuLink>
											)}
										</NavigationMenuItem>
										<NavigationMenuItem className='w-full'>
											{hasPermission('list users') && (
												<NavigationMenuLink
													href={route('users.list')}
													active={route().current('users.list')}
													className="group/navlink inline-flex h-10 w-full justify-start items-center gap-4 px-7 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground focus:bg-primary focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[active]:text-foreground data-[state=open]:bg-primary/50 data-[state=open]:text-foreground"
												>
													<FileChartColumn className='transition-colors group-hover/navlink:stroke-white group-focus/navlink:stroke-white group-data-[active]/navlink:stroke-black group-data-[state=open]/navlink:stroke-black' color="black" size={20} /> Reports
												</NavigationMenuLink>
											)}
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
			</div>


			<div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
							{header && (
				<header className="bg-white dark:bg-gray-800 shadow">
					<div className="max-w-7xl min-h-9 mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
						{header}
					</div>
				</header>
			)}
							</div>
						</div>

						<div className="hidden sm:flex sm:items-center sm:ms-6">
							<div className="ms-3 relative">
								<Dropdown>
									<Dropdown.Trigger>
										<span className="inline-flex rounded-md">
											<button
												type="button"
												className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
											>
												{`${user.first_name} ${user.last_name}`}

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
					</div>

					<div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
						<div className="px-4">
							<div className="font-medium text-base text-gray-800 dark:text-gray-200">
								{user.first_name} {user.last_name}
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
	
	)
}
