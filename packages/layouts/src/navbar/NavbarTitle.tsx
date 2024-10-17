import { Flex, Heading, Img, type FlexProps } from "@workleap/orbiter-ui";

export type NavBarTitleProps = FlexProps;

export function NavbarTitle({ children, ...rest }: NavBarTitleProps) {
    return (
        <Flex slot="leadingItems" alignItems="center" gap="inline-md" {...rest}>
            <Img src="/workleap.svg" alt="Workleap" height={320} width={320} />
            <Heading size="md" margin={0}>{children}</Heading>
        </Flex>
    );
}
