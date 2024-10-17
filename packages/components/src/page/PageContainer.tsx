import { Div, type DivProps } from "@workleap/orbiter-ui";

export interface PageContainerProps extends DivProps {
    wrapperProps?: Partial<DivProps>;
}

/**
 * Container for a standard page.
 * Handles the content's max width and padding.
 * Handles responsive padding.
 */
export function PageContainer({ children, wrapperProps, ...rest }:PageContainerProps) {
    return (
        <Div
            width="100%"
            paddingX="inset-md"
            {...wrapperProps}
        >
            <Div maxWidth="66rem" marginX="auto" {...rest}>
                {children}
            </Div>
        </Div>
    );
}
