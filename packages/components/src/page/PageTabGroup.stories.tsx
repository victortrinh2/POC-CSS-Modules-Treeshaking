import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer } from "./PageContainer.tsx";
import { PageTab } from "./PageTab.tsx";
import { PageTabGroup } from "./PageTabGroup.tsx";

const meta = {
    component: PageTabGroup,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <PageContainer paddingTop="8rem">
                <Story />
            </PageContainer>
        )
    ]
} satisfies Meta<typeof PageTabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <PageTab key="1" to="/1">Tab 1</PageTab>,
            <PageTab key="2" to="/12">Tab 2</PageTab>,
            <PageTab key="3" to="/123">Tab 3</PageTab>
        ]
    }
};

export const ActiveState: Story = {
    args: {
        children: [
            <PageTab key="1" to="/1">Tab 1</PageTab>,
            <PageTab key="2" to="/12">Tab 2</PageTab>,
            <PageTab key="3" to="#">Tab 3</PageTab>
        ]
    }
};
