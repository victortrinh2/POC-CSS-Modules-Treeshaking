import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast.tsx";

const meta = {
    component: Toast
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        variant: "success",
        message: "Your changes have been saved.",
        onClose: () => {
            console.log("Closing...");
        }
    }
};

export const SuccessWithDuration: Story = {
    args: {
        variant: "success",
        message: "Your changes have been saved.",
        durationInMs: 5000,
        onClose: () => {
            console.log("Closing...");
        }
    }
};

export const Error: Story = {
    args: {
        variant: "error",
        message: "Your changes have not been saved.",
        onClose: () => {
            console.log("Closing...");
        }
    }
};

export const ErrorWithDuration: Story = {
    args: {
        variant: "error",
        message: "Your changes have not been saved.",
        durationInMs: 5000,
        onClose: () => {
            console.log("Closing...");
        }
    }
};
