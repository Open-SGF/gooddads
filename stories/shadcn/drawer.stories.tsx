import type { Meta, StoryObj } from '@storybook/react'

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../resources/js/Components/ui'

/**
 * A drawer component for React.
 */
const meta: Meta<typeof Drawer> = {
	title: 'shadcn/Drawer',
	component: Drawer,
	tags: ['autodocs'],
	argTypes: {},
	render: (args) => (
		<Drawer {...args}>
			<DrawerTrigger>Open</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
					<DrawerDescription>
						This action cannot be undone.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<button className='rounded bg-primary px-4 py-2 text-primary-foreground'>
						Submit
					</button>
					<DrawerClose>
						<button className='hover:underline'>Cancel</button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the drawer.
 */
// @ts-ignore
export const Default: Story = {}
