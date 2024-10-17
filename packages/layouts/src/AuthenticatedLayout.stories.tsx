import type { Meta, StoryObj } from "@storybook/react";
import { WorkleapHeader, type HeaderData, type WorkleapHeaderProps } from "@workleap-nav/react";
import { PageContainer, PageLoader } from "@poc-css/components";
import type { RootNavigationItem } from "@poc-css/federation-runtime";
import { Button, Flex, H1, type FlexProps } from "@workleap/orbiter-ui";
import { AuthenticatedLayout, useAuthenticatedLayoutContext } from "./AuthenticatedLayout.tsx";
import { Navbar } from "./navbar/Navbar.tsx";
import { Sidebar } from "./sidebar/Sidebar.tsx";
import { SidebarNavigationItems } from "./sidebar/SidebarNavigationItems.tsx";

function FakePage(props: Omit<FlexProps, "children">) {
    return (
        <Flex
            direction="column"
            gap="stack-md"
            width="100%"
            minHeight="150vh" // this ensures scroll
            backgroundColor="lightblue"
            {...props}
        >
            <H1>Page title</H1>
            <Button>Interactive Element</Button>
            {/* eslint-disable-next-line max-len */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper non arcu ut ornare. Donec euismod nec mauris ac condimentum. Integer in aliquet libero, vitae dictum orci. In sit amet luctus diam. Ut blandit mauris diam, a imperdiet enim posuere vulputate. Vivamus vel efficitur ligula. Ut sed vulputate leo. Nam rhoncus purus a orci tincidunt, sit amet convallis purus pulvinar. Quisque ornare lacus dui, et sagittis turpis ornare sed. Donec convallis fringilla augue in dapibus. Morbi placerat ullamcorper viverra. Quisque in metus congue, ultricies sem a, pretium justo. Suspendisse id condimentum magna.</p>
            {/* eslint-disable-next-line max-len */}
            <p>Donec imperdiet ornare ornare. Etiam eu elementum est. Donec mattis arcu tortor, ac fermentum odio fringilla et. Integer metus purus, porta at lorem non, pulvinar efficitur ligula. Mauris euismod euismod massa, quis luctus quam dictum vitae. Nunc metus quam, efficitur sed scelerisque id, suscipit non ipsum. Curabitur vel ipsum facilisis, ultricies quam ut, tempor metus. Phasellus dapibus placerat erat, sit amet venenatis metus euismod et. Nam euismod congue auctor. Sed convallis, nulla et ullamcorper bibendum, tortor nunc faucibus magna, in scelerisque dui tortor in velit. Aliquam varius interdum orci. Aenean vel quam malesuada, volutpat nibh eu, lobortis est. Cras convallis a justo non finibus.</p>
            {/* eslint-disable-next-line max-len */}
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis dolor nibh, in laoreet risus molestie eu. Aenean commodo dolor fermentum, varius magna in, luctus velit. Morbi luctus molestie libero, nec porta ipsum commodo et. Maecenas aliquet pretium varius. Aenean nisi orci, finibus in ligula at, volutpat iaculis justo. Duis viverra nunc mattis fermentum fringilla. Fusce quis diam pulvinar, sollicitudin ante quis, lobortis tellus. Duis feugiat eu quam eu sagittis. Suspendisse venenatis luctus iaculis. Nam volutpat, quam vitae convallis consectetur, neque ex accumsan arcu, a blandit ligula nunc sit amet tortor. Fusce arcu sapien, mollis quis mauris vel, consectetur pulvinar nisl. Ut tincidunt enim enim. Praesent pretium nisi est, vel consequat neque accumsan lacinia. Donec sit amet pulvinar lacus, sed fermentum ante. Vivamus scelerisque ut ligula eu venenatis.</p>
            {/* eslint-disable-next-line max-len */}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper non arcu ut ornare. Donec euismod nec mauris ac condimentum. Integer in aliquet libero, vitae dictum orci. In sit amet luctus diam. Ut blandit mauris diam, a imperdiet enim posuere vulputate. Vivamus vel efficitur ligula. Ut sed vulputate leo. Nam rhoncus purus a orci tincidunt, sit amet convallis purus pulvinar. Quisque ornare lacus dui, et sagittis turpis ornare sed. Donec convallis fringilla augue in dapibus. Morbi placerat ullamcorper viverra. Quisque in metus congue, ultricies sem a, pretium justo. Suspendisse id condimentum magna.</p>
            {/* eslint-disable-next-line max-len */}
            <p>Donec imperdiet ornare ornare. Etiam eu elementum est. Donec mattis arcu tortor, ac fermentum odio fringilla et. Integer metus purus, porta at lorem non, pulvinar efficitur ligula. Mauris euismod euismod massa, quis luctus quam dictum vitae. Nunc metus quam, efficitur sed scelerisque id, suscipit non ipsum. Curabitur vel ipsum facilisis, ultricies quam ut, tempor metus. Phasellus dapibus placerat erat, sit amet venenatis metus euismod et. Nam euismod congue auctor. Sed convallis, nulla et ullamcorper bibendum, tortor nunc faucibus magna, in scelerisque dui tortor in velit. Aliquam varius interdum orci. Aenean vel quam malesuada, volutpat nibh eu, lobortis est. Cras convallis a justo non finibus.</p>
            {/* eslint-disable-next-line max-len */}
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis dolor nibh, in laoreet risus molestie eu. Aenean commodo dolor fermentum, varius magna in, luctus velit. Morbi luctus molestie libero, nec porta ipsum commodo et. Maecenas aliquet pretium varius. Aenean nisi orci, finibus in ligula at, volutpat iaculis justo. Duis viverra nunc mattis fermentum fringilla. Fusce quis diam pulvinar, sollicitudin ante quis, lobortis tellus. Duis feugiat eu quam eu sagittis. Suspendisse venenatis luctus iaculis. Nam volutpat, quam vitae convallis consectetur, neque ex accumsan arcu, a blandit ligula nunc sit amet tortor. Fusce arcu sapien, mollis quis mauris vel, consectetur pulvinar nisl. Ut tincidunt enim enim. Praesent pretium nisi est, vel consequat neque accumsan lacinia. Donec sit amet pulvinar lacus, sed fermentum ante. Vivamus scelerisque ut ligula eu venenatis.</p>
        </Flex>
    );
}

const meta = {
    component: AuthenticatedLayout,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof AuthenticatedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const AuthenticatedLayoutNavigationItems: RootNavigationItem[] = [
    {
        $label: "Customizable Section 1",
        children: [
            {
                $label: "Item 1",
                to: "/123"
            },
            {
                $label: "Item 2",
                to: "#"
            }
        ]
    }
];

export const Default: Story = {
    name: "Default",
    args: {
        title: "PAGE_TITLE",
        mainContent: <PageContainer><FakePage /></PageContainer>,
        navBar: (
            <Navbar>
                <Button slot="leadingItems" variant="tertiary">Customizable Leading Items</Button>,
                <Button slot="trailingItems" variant="tertiary">Customizable Trailing Items</Button>
            </Navbar>
        ),
        sidebar: (
            <Sidebar>
                <SidebarNavigationItems navigationItems={AuthenticatedLayoutNavigationItems} />
            </Sidebar>
        )
    }
};

export const WithHorizontalScroll: Story = {
    ...Default,
    args: {
        ...Default.args,
        mainContent: <PageContainer><FakePage width="1056px" /></PageContainer>
    }
};

const NavProps: WorkleapHeaderProps = {
    title: "Title",
    getData: (): HeaderData => ({
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
    }),
    links: {
        profile: {
            href: "https://www.google.com"
        },
        signOut: {
            onClick: () => {
                console.log("Signed out!");
            }
        }
    },
    icon: {
        src: "/workleap.svg",
        alt: "Workleap"
    }
};

function AuthenticatedNavBar() {
    const { openSidebar } = useAuthenticatedLayoutContext();

    return <WorkleapHeader {...NavProps} hamburger={{ onClick: openSidebar }} />;
}

export const WithDefaultNavBar: Story = {
    ...Default,
    args: {
        ...Default.args,
        navBar: <AuthenticatedNavBar />
    }
};

export const Tablet: Story = {
    ...WithDefaultNavBar,
    parameters: {
        viewport: {
            defaultViewport: "tablet"
        }
    }
};

export const Mobile: Story = {
    ...WithDefaultNavBar,
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    }
};

export const Loading: Story = {
    ...WithDefaultNavBar,
    args: {
        ...WithDefaultNavBar.args,
        mainContent: <PageLoader aria-label="Loading..." />
    }
};

