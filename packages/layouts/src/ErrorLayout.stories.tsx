import type { Meta, StoryObj } from "@storybook/react";
import { Div } from "@workleap/orbiter-ui";
import { ErrorLayout } from "./ErrorLayout.tsx";

const meta = {
    component: ErrorLayout,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <Div min-width="100dvh" height="100dvh">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof ErrorLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
    args: {
        children: "This is an error!"
    }
};

export const WithContentTablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    },
    args: {
        children: "This is an error!"
    }
};

export const WithContentMobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    },
    args: {
        children: "This is an error!"
    }
};

export const NestedVariant: Story = {
    args: {
        variant: "nested",
        children: "This is an error!"
    }
};
