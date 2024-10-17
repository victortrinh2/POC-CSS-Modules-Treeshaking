import { RouterNavLink, type RouterNavLinkProps } from "@poc-css/components";
import { Text, mergeProps } from "@workleap/orbiter-ui";
import { createContext, useContext, type CSSProperties, type ReactNode } from "react";

import "./SidebarItem.css";

export interface SidebarItemProps extends RouterNavLinkProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

const SidebarItemContext = createContext<Partial<SidebarItemProps>>({});

export const SidebarItemContextProvider = SidebarItemContext.Provider;

export const useSidebarItemContext = () => {
    return useContext(SidebarItemContext);
};

export function SidebarItem({ children, ...rest }: SidebarItemProps) {
    const sidebarContext = useSidebarItemContext();
    const { className, ...extraProps } = mergeProps(rest, sidebarContext);

    return (
        <RouterNavLink
            display="flex"
            width="100%"
            color="neutral"
            textDecoration="none"
            border="none"
            borderRadius="rounded-md"
            cursor="pointer"
            alignItems="center"
            gap="stack-md"
            padding="inset-sm"
            fontFamily="heading-xs"
            fontSize="heading-xs"
            fontWeight="heading-xs-medium"
            lineHeight="heading-xs"
            className={[className, "sidebar-item"].filter(x => x).join(" ")}
            {...extraProps}
        >
            <Text
                size="inherit"
                marginBottom="-0.1875rem" /* This is to account for the font-family ABC Favorit that is not vertically centered */
            >
                {children}
            </Text>
        </RouterNavLink>
    );
}
