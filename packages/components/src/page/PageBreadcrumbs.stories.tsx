import type { Meta, StoryObj } from "@storybook/react";
import { PageBreadcrumbs } from "./PageBreadcrumbs.tsx";
import { PageContainer } from "./PageContainer.tsx";

const meta = {
    component: PageBreadcrumbs,
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
} satisfies Meta<typeof PageBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        links: [
            {
                name: "Users",
                link: "/"
            },
            {
                name: "Betty Braxton",
                link: null
            }
        ]
    }
};

export const WithLongLinkName: Story = {
    args: {
        links: [
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Page",
                link: null
            }
        ]
    }
};

export const WithLongSpanName: Story = {
    args: {
        links: [
            {
                name: "Home",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: null
            }
        ]
    }
};

export const WithBothLongLinkAndSpanName: Story = {
    args: {
        links: [
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: null
            }
        ]
    }
};

export const WithLotsOfUrl: Story = {
    args: {
        links: [
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: "/"
            },
            {
                name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                link: null
            }
        ]
    }
};

