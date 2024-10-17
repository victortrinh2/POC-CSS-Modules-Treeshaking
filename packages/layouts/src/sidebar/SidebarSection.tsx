import { Span, type SpanProps } from "@workleap/orbiter-ui";
import type { ReactNode } from "react";

export interface SidebarSectionProps extends SpanProps {
    label: ReactNode;
}

export function SidebarSection({ label, children, ...rest }: SidebarSectionProps) {
    return (
        <>
            <Span
                fontSize="overline"
                fontWeight="overline"
                lineHeight="overline"
                color="neutral-weak"
                textTransform="uppercase"
                padding="inset-squish-sm"
                {...rest}
                style={{ fontFamily: "var(--hop-overline-font-family)", ...rest.style }}
            >
                {label}
            </Span>
            {children}
        </>
    );
}
