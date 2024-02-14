import { Button } from "@ui/components/ui/button";
import { Meta, StoryFn } from "@storybook/react";
import * as React from "react"

/**
 * Displays a button or a component that looks like a button.
 */
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  args: {
    children: 'Button'
  }
}

export default meta;

const Template: StoryFn<typeof Button> = (args: any) => <Button {...args} />;

export const Default: StoryFn<typeof Button> = Template.bind({});
Default.args = {};

export const Destructive: StoryFn<typeof Button> = Template.bind({});
Destructive.args = {
  variant: "destructive"
};

export const Outline: StoryFn<typeof Button> = Template.bind({});
Outline.args = {
  variant: "outline"
};

export const Secondary: StoryFn<typeof Button> = Template.bind({});
Secondary.args = {
  variant: "secondary"
};

export const Ghost: StoryFn<typeof Button> = Template.bind({});
Ghost.args = {
  variant: "ghost"
};

export const Link: StoryFn<typeof Button> = Template.bind({});
Link.args = {
  variant: "link"
};