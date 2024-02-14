import type { StoryObj } from "@storybook/react"
import * as React from "react"

/**
 * Base typography customized from Tailwind CSS
 */
const meta = {
  title: "Typography",
  tags: ["autodocs"],
  argTypes: {},
  render: () => (
    <>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Paragraph</p>
        <a>Link</a>
    </>
  )
}

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default typography is as follows.
 */
export const Default: Story = {}
