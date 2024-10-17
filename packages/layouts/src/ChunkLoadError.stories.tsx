import type { Meta, StoryObj } from "@storybook/react";
import { Div } from "@workleap/orbiter-ui";
import { ChunkLoadError } from "./ChunkLoadError.tsx";

const meta = {
    component: ChunkLoadError,
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
} satisfies Meta<typeof ChunkLoadError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RootVariant: Story = {};

export const RootVariantTablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    }
};

export const RootVariantMobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    }
};

export const NestedVariant: Story = {
    args: {
        variant: "nested"
    }
};

export const NestedVariantTablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    },
    args: {
        variant: "nested"
    }
};

export const NestedVariantMobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    },
    args: {
        variant: "nested"
    }
};
