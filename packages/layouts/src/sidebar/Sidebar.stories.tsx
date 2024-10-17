import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar.tsx";
import { SidebarNavigationItems } from "./SidebarNavigationItems.tsx";

const meta = {
    component: Sidebar,
    parameters: {
        layout: "fullscreen"
    },
    args: {
        width: "14rem",
        height: "100vh"
    }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <>
            <SidebarNavigationItems navigationItems={[
                {
                    $label: "Section 1",
                    children: [
                        {
                            $label: "Item 1",
                            to: "#"
                        },
                        {
                            $label: "Item 2",
                            to: "/123"
                        }
                    ]
                }
            ]}
            />
        </>
    }
};
