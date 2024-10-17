import type { Meta, StoryObj } from "@storybook/react";
import { SidebarItem } from "./SidebarItem.tsx";
import { SidebarSection } from "./SidebarSection.tsx";

const meta = {
    component: SidebarSection,
    parameters: {
        layout: "fullscreen"
    },
    args: {
        label: "Section Title",
        children: [
            <SidebarItem key="1" to="/123" >
                NavLink 1
            </SidebarItem>,
            <SidebarItem key="2" to="#" >
                NavLink 2
            </SidebarItem>
        ]
    },
    decorators: [
        Story => (
            <div style={{ width: "12rem" }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof SidebarSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const ConflictingUrls: Story = {
    args: {
        children: [
            <SidebarItem key="1" to="/settings" >
                Profile
            </SidebarItem>,
            <SidebarItem key="2" to="/settings/users" >
                Preference
            </SidebarItem>
        ]
    }
};
