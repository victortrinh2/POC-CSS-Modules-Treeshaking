import type { Meta, StoryObj } from "@storybook/react";
import { AppLoading } from "./AppLoading.tsx";

const meta = {
    component: AppLoading
} satisfies Meta<typeof AppLoading>;

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
