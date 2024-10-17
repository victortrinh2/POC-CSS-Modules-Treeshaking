import type { Meta, StoryObj } from "@storybook/react";
import { useToast } from "@poc-css/federation-runtime";
import { Button, Flex, Text } from "@workleap/orbiter-ui";
import { useCallback, useState } from "react";
import { ToastProvider } from "./ToastProvider.tsx";

function Component() {
    const [count, setCount] = useState(0);

    const toast = useToast();

    const handleClick = useCallback(() => {
        if (count % 2 === 0) {
            toast.success("Your changes have been saved.", { durationInMs: 5000 });
        } else if (count % 2 === 1) {
            toast.error("Something went wrong...", { durationInMs: 5000 });
        }

        setCount(x => x + 1);
    }, [count, setCount, toast]);

    return (
        <Flex alignItems="center" marginBottom={160} gap={160}>
            <ToastProvider>
                <Button onClick={handleClick}>Toast</Button>
                <Text color="danger-active">Try clicking multiple times to queue toasts.</Text>
            </ToastProvider>
        </Flex>
    );
}

const meta = {
    component: Component
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
