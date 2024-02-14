import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@ui/components/ui/button"
import { Input } from "@ui/components/ui/input"
import { Label } from "@ui/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@ui/components/ui/tabs"
import * as React from "react"

/**
 * A set of layered sections of content—known as tab panels—that are displayed
 * one at a time.
 */
const meta = {
    title: "Tabs",
    component: Tabs,
    tags: ["autodocs"],
    argTypes: {},
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the tabs.
 */
export const Default: Story = {
    render: (args) => (
        <Tabs {...args} className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Make changes to your account here. Click save when you're done.
                </p>
                <div className="grid gap-2 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@peduarte" />
                    </div>
                </div>
                <div className="flex">
                    <Button>Save changes</Button>
                </div>
            </TabsContent>
            <TabsContent value="password">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Change your password here. After saving, you'll be logged out.
                </p>
                <div className="grid gap-2 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                    </div>
                </div>
                <div className="flex">
                    <Button>Save password</Button>
                </div>
            </TabsContent>
        </Tabs>
    ),
    args: {
        defaultValue: "account",
    },
}