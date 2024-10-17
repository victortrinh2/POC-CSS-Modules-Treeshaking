import { Flex, slot, useResponsiveValue, type FlexProps, type ResponsiveProp } from "@workleap/orbiter-ui";

export interface PageActionsProps extends Omit<FlexProps, "wrap"> {
    /**
     * Whether or not the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: ResponsiveProp<boolean>;
}

export const PageActions = slot("page-actions", ({ wrap: wrapProp, ...rest }: PageActionsProps) => {
    const wrap = useResponsiveValue(wrapProp);

    return (<Flex wrap={wrap ? "wrap" : undefined} {...rest} />);
});
