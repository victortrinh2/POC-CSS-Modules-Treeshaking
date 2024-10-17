import { Flex, Text, useSlots, type FlexProps } from "@workleap/orbiter-ui";

export type NavbarProps = FlexProps;

export function Navbar({ children, ...rest }: NavbarProps) {
    const { leadingItems, trailingItems } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        leadingItems : {},
        trailingItems: {}
    });

    return (
        <Flex
            backgroundColor="neutral"
            borderBottom="neutral-weak"
            padding="inset-md"
            alignItems="center"
            justifyContent="space-between"
            {...rest}
        >
            {leadingItems}
            {trailingItems}
        </Flex>
    );
}
