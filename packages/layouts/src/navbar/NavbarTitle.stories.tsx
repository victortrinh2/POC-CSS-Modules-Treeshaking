import type { Meta, StoryObj } from "@storybook/react";
import { NavbarTitle } from "./NavbarTitle.tsx";

const meta = {
    component: NavbarTitle,
    parameters: {
        layout: "fullscreen"
    },
    args: {
        children: "Title"
    }
} satisfies Meta<typeof NavbarTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
};
