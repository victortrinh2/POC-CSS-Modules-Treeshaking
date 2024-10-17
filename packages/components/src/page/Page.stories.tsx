import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup, Div } from "@workleap/orbiter-ui";
import { Page } from "./Page.tsx";
import { PageActions } from "./PageActions.tsx";
import { PageBreadcrumbs } from "./PageBreadcrumbs.tsx";
import { PageContent } from "./PageContent.tsx";
import { PageFooter } from "./PageFooter.tsx";
import { PageHeader } from "./PageHeader.tsx";
import { PageTab } from "./PageTab.tsx";
import { PageTabGroup } from "./PageTabGroup.tsx";
import { PageTitle } from "./PageTitle.tsx";

const meta = {
    component: Page,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <Div height="100dvh">
                <Story />
            </Div>
        )
    ]
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
            </PageHeader>,
            <PageContent>Content</PageContent>
        ]
    }
};

export const WithBreadcrumb: Story = {
    args: {
        children: [
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Page",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
            </PageHeader>,
            <PageContent>Content</PageContent>
        ]
    }
};

export const WithHeaderActionsAndBreadcrumb: Story = {
    args: {
        children: [
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Page",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
                <PageActions>
                    <Button variant="secondary">Deactivate User</Button>
                    <Button variant="negative">Delete User</Button>
                </PageActions>
            </PageHeader>,
            <PageContent>Content</PageContent>
        ]
    }
};

export const WithHeaderActionsAndBreadcrumbAndTabGroup: Story = {
    args: {
        children: [
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Page",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
                <PageActions>
                    <Button variant="secondary">Deactivate User</Button>
                    <Button variant="negative">Delete User</Button>
                </PageActions>
            </PageHeader>,
            <PageTabGroup>
                <PageTab key="1" to="/1">Tab 1</PageTab>
                <PageTab key="2" to="/123">Tab 2</PageTab>
                <PageTab key="3" to="#">Tab 3</PageTab>
            </PageTabGroup>,
            <PageContent>Content</PageContent>
        ]
    }
};

export const WithHeaderActionsAndBreadcrumbFooter: Story = {
    args: {
        children: [
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Page",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
                <PageActions>
                    <Button variant="secondary">Deactivate User</Button>
                    <Button variant="negative">Delete User</Button>
                </PageActions>
            </PageHeader>,
            <PageContent>Content</PageContent>,
            <PageFooter justifyContent="right">
                <ButtonGroup orientation={{ base: "vertical", sm: "horizontal" }} fluid={{ base: true, sm:false }}>
                    <Button type="reset" fluid={{ base: true, sm: false }} variant="secondary">Discard Changes</Button>
                    <Button type="submit" fluid={{ base: true, sm: false }} >Save</Button>
                </ButtonGroup>
            </PageFooter>
        ]
    }
};

export const WithHeaderActionsAndBreadcrumbFooterAndScrollbar: Story = {
    args: {
        children: [
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Page",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>Page Title</PageTitle>
                <PageActions>
                    <Button variant="secondary">Deactivate User</Button>
                    <Button variant="negative">Delete User</Button>
                </PageActions>
            </PageHeader>,
            <PageContent minHeight="100dvh">Content</PageContent>,
            <PageFooter justifyContent="right">
                <ButtonGroup orientation={{ base: "vertical", sm: "horizontal" }} fluid={{ base: true, sm:false }}>
                    <Button type="reset" fluid={{ base: true, sm: false }} variant="secondary">Discard Changes</Button>
                    <Button type="submit" fluid={{ base: true, sm: false }} >Save</Button>
                </ButtonGroup>
            </PageFooter>
        ]
    }
};

