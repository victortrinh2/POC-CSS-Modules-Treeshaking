import { Div, type DivProps } from "@workleap/orbiter-ui";
import { forwardRef } from "react";

export interface SidebarProps extends DivProps { }
/**
 * The sidebar component is simply a styled Div component
 * Insert it into a sidebar container for desktop or mobile to create a sidebar
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
    return (
        <Div
            ref={ref}
            height="100%"
            paddingX="inset-sm"
            paddingY="inset-xl"
            overflowY="auto"
            backgroundColor="neutral-weakest"
            borderRight="neutral-weak"
            {...props}
        />
    );
});
