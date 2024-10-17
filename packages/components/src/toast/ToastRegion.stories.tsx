import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast.tsx";
import { ToastRegion } from "./ToastRegion.tsx";

const meta = {
    component: ToastRegion
} satisfies Meta<typeof ToastRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleToast: Story = {
    args: {
        "aria-label": "Notifications",
        children: (
            <Toast
                variant="success"
                message="Your changes have been saved."
                onClose={() => {
                    console.log("Closing...");
                }}
            />
        )
    }
};

export const MultipleToasts: Story = {
    args: {
        "aria-label": "Notifications",
        children: (
            <>
                <Toast
                    variant="success"
                    message="Your changes have been saved."
                    onClose={() => {
                        console.log("Closing...");
                    }}
                />
                <Toast
                    variant="error"
                    message="Your changes have not been saved."
                    onClose={() => {
                        console.log("Closing...");
                    }}
                />
            </>
        )
    }
};
