import { Grid, type GridProps } from "@workleap/orbiter-ui";
import { forwardRef, type ForwardedRef } from "react";

export interface ToastRegionProps extends GridProps {
    "aria-label": string;
    forwardedRef?: ForwardedRef<HTMLDivElement>;
}

export function InnerToastRegion(props: ToastRegionProps) {
    const {
        "aria-label": ariaLabel,
        forwardedRef,
        children,
        ...rest
    } = props;

    return (
        <Grid
            {...rest}
            aria-label={ariaLabel}
            position="fixed"
            top={0}
            left={0}
            right={0}
            padding={{ base: 0, xs: 80 }}
            justifyContent={{ base: "stretch", xs: "center" }}
            gap={80}
            zIndex={9999}
            // Removing the pointerEvents breaks the animation.
            pointerEvents="none"
            ref={forwardedRef}
        >
            {children}
        </Grid>
    );
}

export const ToastRegion = forwardRef<HTMLDivElement, ToastRegionProps>((props, ref) => (
    <InnerToastRegion {...props} forwardedRef={ref} />
));
