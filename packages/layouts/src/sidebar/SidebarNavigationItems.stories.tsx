import type { Meta, StoryObj } from "@storybook/react";
import { SidebarNavigationItems } from "./SidebarNavigationItems.tsx";

const meta = {
    component: SidebarNavigationItems,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div style={{ width: "12rem" }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof SidebarNavigationItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
    args: {
        navigationItems: [
            {
                $label: "Item 1",
                to: "#"
            }
        ]
    }
};

export const Section: Story = {
    args: {
        navigationItems: [
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
        ]
    }
};

export const ItemThenSection: Story = {
    args: {
        navigationItems: [
            {
                $label: "Item 0",
                to: "/0"
            },
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
            },
            {
                $label: "Section 2",
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
        ]
    }
};
export const ItemThenNestedSection: Story = {
    args: {
        navigationItems: [
            {
                $label: "Item 0",
                to: "/1"
            },
            {
                $label: "Section 1",
                children: [
                    {
                        $label: "Item 1",
                        to: "/11"
                    },
                    {
                        $label: "Item 2",
                        to: "/12"
                    },
                    {
                        $label: "Section 2",
                        children: [
                            {
                                $label: "Item 1",
                                to: "/21"
                            },
                            {
                                $label: "Item 2",
                                to: "/22"
                            }
                        ]
                    }
                ]
            },
            {
                $label: "Section 3",
                children: [
                    {
                        $label: "Item 1",
                        to: "/31"
                    },
                    {
                        $label: "Item 2",
                        to: "/32"
                    }
                ]
            }
        ]
    }
};
