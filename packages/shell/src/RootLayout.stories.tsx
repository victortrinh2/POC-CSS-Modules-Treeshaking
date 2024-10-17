import type { Meta, StoryObj } from "@storybook/react";
import { Div, Flex } from "@workleap/orbiter-ui";
import { RootLayout } from "./RootLayout.tsx";

const meta = {
    component: RootLayout
} satisfies Meta<typeof RootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCenteredContent: Story = {
    args: {
        children: (
            <Flex
                alignItems="center"
                justifyContent="center"
                height="100%"
                fluid
            >
                <Div>Some content!</Div>
            </Flex>
        )
    }
};
