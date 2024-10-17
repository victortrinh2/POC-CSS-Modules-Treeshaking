import { Flex, slot, type FlexProps } from "@workleap/orbiter-ui";

interface PageTabGroupProps extends FlexProps {
}

function InnerPageTabGroup({ children, ...rest }: PageTabGroupProps) {
    return (
        <Flex
            backgroundColor="neutral-weakest"
            border="neutral-weak"
            borderRadius="rounded-md"
            marginBottom="stack-md"
            gap="stack-md"
            paddingY="inset-sm"
            paddingX="inset-md"
            minHeight="3rem"
            alignItems="center"
            {...rest}
        >
            {children}
        </Flex>
    );
}

export const PageTabGroup = slot("page-tabgroup", InnerPageTabGroup);
