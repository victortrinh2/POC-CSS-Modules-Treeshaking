import type { Meta, StoryObj } from "@storybook/react";
import { Div } from "@workleap/orbiter-ui";
import { NotFoundError } from "./NotFoundError.tsx";

const meta = {
    component: NotFoundError,
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
} satisfies Meta<typeof NotFoundError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    }
};
