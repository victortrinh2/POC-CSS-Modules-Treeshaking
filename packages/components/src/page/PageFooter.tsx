import { Flex, slot, type FlexProps } from "@workleap/orbiter-ui";

type PageFooterProps = FlexProps;

export const PageFooter = slot("page-footer", function PageFooter({ children, ...rest }: PageFooterProps) {
    return (
        <Flex
            width="100%"
            minHeight="4.5rem"
            padding="inset-md"
            {...rest}
        >
            {children}
        </Flex>
    );
});
