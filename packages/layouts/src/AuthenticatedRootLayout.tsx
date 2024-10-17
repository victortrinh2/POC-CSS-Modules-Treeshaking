import { useCurrentLanguage, useEnvironmentVariables, useSidebarNavigationItems, type RootNavigationItem } from "@poc-css/federation-runtime";
import { getJson, postJson, resolveApiUrl } from "@poc-css/http";
import { WorkleapHeader, type HeaderData, type WorkleapHeaderProps } from "@workleap-nav/react";
import { Stack } from "@workleap/orbiter-ui";
import { useCallback } from "react";
import { AuthenticatedLayout, useAuthenticatedLayoutContext, type AuthenticatedLayoutProps } from "./AuthenticatedLayout.tsx";
import { useHeaderData } from "./HeaderDataContext.ts";
import { useTranslation } from "./localization/useTranslation.ts";
import { Sidebar } from "./sidebar/Sidebar.tsx";
import { SidebarNavigationItems } from "./sidebar/SidebarNavigationItems.tsx";

type ConnectedAuthenticatedRootLayoutProps = Pick<AuthenticatedLayoutProps, "mainContent">;

export function ConnectedAuthenticatedRootLayout(props: ConnectedAuthenticatedRootLayoutProps) {
    const { t } = useTranslation("ApplicationRootLayout");
    const environmentVariables = useEnvironmentVariables();
    const headerData = useHeaderData();
    const navigationItems = useSidebarNavigationItems();

    const handleOrganizationChange = useCallback(async (selectedOrganizationId: string) => {
        await postJson(resolveApiUrl("header/setOrganization", environmentVariables.navigationApiBaseUrl), {
            selectedOrganizationId
        });

        await postJson(resolveApiUrl("cookies/flush", environmentVariables.authenticationApiBaseUrl));

        const params = new URLSearchParams({ returnUrl: window.location.href });
        const redirectUrl = await getJson(resolveApiUrl(`oauth2/url/logout?${params}`, environmentVariables.authenticationApiBaseUrl)).then(x => x.data as string);

        window.location.assign(redirectUrl);
    }, [environmentVariables]);

    const handleLogoutUser = useCallback(async () => {
        await postJson(resolveApiUrl("logout", environmentVariables.authenticationApiBaseUrl));
        const logoutUrl = await getJson(resolveApiUrl("oauth2/url/logout", environmentVariables.authenticationApiBaseUrl)).then(x => x.data as string);

        window.location.assign(logoutUrl);
    }, [environmentVariables]);

    return (
        <AuthenticatedRootLayout
            {...props}
            title={t("title")}
            headerData={headerData}
            navigationItems={navigationItems}
            onOrganizationChange={handleOrganizationChange}
            onLogout={handleLogoutUser}
        />
    );
}

type AuthenticatedRootLayoutProps = Pick<AuthenticatedLayoutProps, "mainContent"> & {
    title: string;
    headerData?: HeaderData;
    navigationItems: RootNavigationItem[];
    onOrganizationChange: (selectedOrganizationId: string) => void;
    onLogout: () => void;
};

export function AuthenticatedRootLayout({ title, mainContent, headerData, navigationItems, onOrganizationChange, onLogout }: AuthenticatedRootLayoutProps) {
    const navbarProps = {
        getData: headerData ? () => headerData : undefined,
        onOrganizationChange,
        icon: {
            src: "/workleap.svg",
            alt: "Workleap"
        },
        links: {
            profile: {
                href: "https://todo.com/path/to/the/profile",
                target: "_blank"
            },
            signOut: {
                onClick: onLogout
            }
        }
    };

    return (
        <AuthenticatedLayout
            title={title}
            navBar={<RootNavbar title={title} {...navbarProps} />}
            sidebar={<RootSidebar navigationItems={navigationItems} />}
            mainContent={mainContent}
        />
    );
}

interface RootNavbarProps extends Omit<WorkleapHeaderProps, "hamburger"> {
    title: string;
}

function RootNavbar({ title, ...rest }: RootNavbarProps) {
    const { openSidebar } = useAuthenticatedLayoutContext();
    const language = useCurrentLanguage();

    return (
        <WorkleapHeader
            title={title}
            language={language}
            hamburger={{ onClick: openSidebar }}
            {...rest}
        />
    );
}

interface RootSidebarProps {
    navigationItems: RootNavigationItem[];
}

function RootSidebar({ navigationItems }: RootSidebarProps) {
    return (
        <Sidebar>
            <Stack gap="stack-xl">
                <SidebarNavigationItems navigationItems={navigationItems} />
            </Stack>
        </Sidebar>
    );
}
