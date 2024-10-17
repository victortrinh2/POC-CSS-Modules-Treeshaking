import type { Meta, StoryObj } from "@storybook/react";
import { SidebarItem } from "./SidebarItem.tsx";

const meta = {
    component: SidebarItem,
    parameters: {
        layout: "fullscreen"
    },
    args: {
        children: "Nav Link",
        to: "/"
    },
    decorators: [
        Story => (
            <div style={{ width: "12rem" }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
