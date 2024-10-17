import type { Meta, StoryObj } from "@storybook/react";
import { Page, PageActions, PageContent, PageHeader, PageTitle } from "@poc-css/components";
import type { RootNavigationItem } from "@poc-css/federation-runtime";
import type { HeaderData } from "@workleap-nav/react";
import { Button } from "@workleap/orbiter-ui";
import { AuthenticatedRootLayout } from "./AuthenticatedRootLayout.tsx";

const meta = {
    component: AuthenticatedRootLayout,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof AuthenticatedRootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerData: HeaderData = {
    userInfo: {
        name: "Potato",
        canEditProfile: true,
        avatarUrl: "avatar.png"
    },
    products: {
        assignedProducts: [{
            identifier: "wov",
            isNew: false,
            isExternal: false,
            iconUrl: "https://cdn.platform.workleap-dev.com/products/wov/icon.svg",
            redirectUrl: "#"
        }, {
            identifier: "onb",
            isNew: false,
            isExternal: false,
            iconUrl: "https://cdn.platform.workleap-dev.com/products/onb/icon.svg",
            redirectUrl: "#"
        }],
        unassignedProducts: []
    },
    organizations: null
};

const NavigationItems: RootNavigationItem[] = [
    {
        $label: "Item 1",
        to: "/item-1"
    },
    {
        $label: "Item 2",
        to: "/item-2"
    },
    {
        $label: "Item 3",
        to: "/item-3"
    },
    {
        $label: "Item 4",
        to: "/item-4"
    }
];

export const Default: Story = {
    args: {
        title: "Performance",
        headerData,
        mainContent: (
            <Page>
                <PageHeader>
                    <PageTitle>Page Title</PageTitle>
                    <PageActions>
                        <Button variant="primary">New</Button>
                    </PageActions>
                </PageHeader>,
                <PageContent>Content</PageContent>
            </Page>
        ),
        navigationItems: NavigationItems,
        onOrganizationChange: () => {},
        onLogout: () => {}
    }
};

export const Tablet: Story = {
    ...Default,
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    }
};

export const Mobile: Story = {
    ...Default,
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    }
};
