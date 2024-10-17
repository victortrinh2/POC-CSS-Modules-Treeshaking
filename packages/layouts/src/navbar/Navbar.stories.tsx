import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@workleap/orbiter-ui";
import { Navbar } from "./Navbar.tsx";

const meta = {
    component: Navbar,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <Button slot="leadingItems" variant="tertiary">Leading items</Button>,
            <Button slot="trailingItems" variant="tertiary">Trailing items</Button>
        ]
    }
};
