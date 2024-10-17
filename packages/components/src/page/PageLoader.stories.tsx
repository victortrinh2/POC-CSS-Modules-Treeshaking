import type { Meta, StoryObj } from "@storybook/react";
import { PageLoader } from "./PageLoader.tsx";

const meta = {
    component: PageLoader,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <div style={{ height: "100dvh" }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        "aria-label": "Loading..."
    }
};
export const Delay: Story = {
    ...Default,
    args: {
        ...Default.args,
        delay: 2000
    }
};
