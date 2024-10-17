import { PageLoader } from "@poc-css/components";
import { CrossButton, Div, Flex, Main, ThemeProvider, useColorSchemeContext, useResponsiveValue, type DivProps } from "@workleap/orbiter-ui";
import { Suspense, createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Dialog, Modal, type DialogProps } from "react-aria-components";
import { Outlet } from "react-router-dom";
import { useTranslation } from "./localization/useTranslation.ts";
import { Navbar } from "./navbar/Navbar.tsx";
import { NavbarTitle } from "./navbar/NavbarTitle.tsx";
import { SidebarItemContextProvider } from "./sidebar/SidebarItem.tsx";

export interface AuthenticatedLayoutProps {
    /**
     * The navbar
     */
    navBar: ReactNode;
    /**
     * The sidebar
     */
    sidebar: ReactNode;
    /**
     * The main content of the layout
     * @default <Outlet />
     */
    mainContent?: ReactNode;
    /**
     * Title of the page
     */
    title: string;
    stickyZIndex?: number;
}

const NavBarHeight = "4.5rem";
const SidebarWidth = "16rem";

export interface AuthenticatedLayoutContextValue {
    sidebarType: "desktop" | "mobile";
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
}

const AuthenticatedLayoutContext = createContext<AuthenticatedLayoutContextValue>({
    isSidebarOpen: false,
    sidebarType: "desktop",
    openSidebar: () => {},
    closeSidebar: () => {},
    setSidebarOpen: () => {}
});

export const useAuthenticatedLayoutContext = () => useContext(AuthenticatedLayoutContext);

export function AuthenticatedLayout({ navBar, sidebar, mainContent = <Outlet />, title, stickyZIndex = 10 }: AuthenticatedLayoutProps) {
    const sidebarState = useSidebarState();
    const isMobile = useResponsiveValue({ base: true, sm: false });
    const { t } = useTranslation("AuthenticatedLayout");

    const content = isMobile ? (
        <>
            <MobileSidebarContainer zIndex={stickyZIndex + 2} title={title}>{sidebar}</MobileSidebarContainer>
            <Main
                marginTop={NavBarHeight}
                height={`calc(100dvh - ${NavBarHeight})`}
            >
                <Suspense fallback={<PageLoader aria-label={t("loading")} />}>
                    {mainContent}
                </Suspense>
            </Main>
        </>
    ) : (
        <>
            <DesktopSidebarContainer zIndex={stickyZIndex}>{sidebar}</DesktopSidebarContainer>
            <Main
                marginTop={NavBarHeight}
                marginLeft={SidebarWidth}
                height={`calc(100dvh - ${NavBarHeight})`}
            >
                <Suspense fallback={<PageLoader aria-label={t("loading")} />}>
                    {mainContent}
                </Suspense>
            </Main>
        </>
    );

    return (
        <AuthenticatedLayoutContext.Provider value={{
            sidebarType: isMobile ? "mobile" : "desktop",
            openSidebar: sidebarState.open,
            closeSidebar: sidebarState.close,
            isSidebarOpen: sidebarState.isOpen,
            setSidebarOpen: sidebarState.setIsOpen
        }}
        >
            <Flex direction="column">
                <Div
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    zIndex={stickyZIndex + 1}
                    height={NavBarHeight}
                >
                    {navBar}
                </Div>
                {content}
            </Flex>
        </AuthenticatedLayoutContext.Provider>
    );
}

interface DesktopSidebarContainerProps extends Omit<DivProps, "children"> {
    children: ReactNode;
}

function DesktopSidebarContainer({ children, ...rest }:DesktopSidebarContainerProps) {
    return (
        <Div
            position="fixed"
            top={NavBarHeight}
            height={`calc(100dvh - ${NavBarHeight})`}
            width={SidebarWidth}
            {...rest}
        >
            {children}
        </Div>
    );
}

interface MobileSidebarContainerProps extends DialogProps {
    children: ReactNode;
    title: string;
    zIndex?: number;
}

function MobileSidebarContainer({ children, title, zIndex, ...rest }: MobileSidebarContainerProps) {
    const { isSidebarOpen, closeSidebar } = useAuthenticatedLayoutContext();
    const { colorScheme } = useColorSchemeContext();
    const { t } = useTranslation("AuthenticatedLayout");

    return (
        <Modal
            isOpen={isSidebarOpen}
            isDismissable={false}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex : zIndex }}
        >
            <Dialog
                aria-label={t("sidebar")}
                style={{ height:"100%", width: "100%" }}
                {...rest}
            >
                <ThemeProvider colorScheme={colorScheme ?? "light"} height="100dvh" display="flex" flexDirection="column">
                    <MobileSidebarHeader title={title} />
                    <SidebarItemContextProvider value={{ onClick: closeSidebar }}>
                        {children}
                    </SidebarItemContextProvider>
                </ThemeProvider>
            </Dialog>
        </Modal>
    );
}

interface MobileSidebarHeaderProps {
    title:string;
}

function MobileSidebarHeader({ title }: MobileSidebarHeaderProps) {
    const { closeSidebar } = useAuthenticatedLayoutContext();
    const { t } = useTranslation("AuthenticatedLayout");

    return (
        <Navbar height={NavBarHeight}>
            <NavbarTitle slot="leadingItems">
                {title}
            </NavbarTitle>
            <CrossButton slot="trailingItems" title={t("close")} aria-label={t("close")} onClick={closeSidebar} />
        </Navbar>
    );
}

function useSidebarState() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return useMemo(() => ({
        isOpen: isSidebarOpen,
        open: () => setIsSidebarOpen(true),
        close: () => setIsSidebarOpen(false),
        setIsOpen: setIsSidebarOpen
    }), [isSidebarOpen]);
}
