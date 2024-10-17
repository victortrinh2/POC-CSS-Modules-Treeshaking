import type { CSSProperties, ReactNode } from "react";
import { RouterNavLink, type RouterNavLinkProps } from "../router/RouterNavLink.tsx";

import "./PageTab.css";

interface TabProps extends RouterNavLinkProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

export function PageTab({ children, className, ...rest }: TabProps) {
    return (
        <RouterNavLink
            position="relative"
            textDecoration="none"
            borderRadius="rounded-sm"
            fontSize="body-sm-medium"
            fontWeight="body-sm-medium"
            lineHeight="body-sm-medium"
            fontFamily="body-sm-medium"
            className={[className, "page-tab"].filter(x => x).join(" ")}
            {...rest}
        >
            {children}
        </RouterNavLink>
    );
}

