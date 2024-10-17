import { Flex, Text, useSlots, type FlexProps } from "@workleap/orbiter-ui";
import { PageContainer } from "./PageContainer.tsx";

interface PageProps extends FlexProps {
    footerZIndex?: number;
}

export function Page({ children, footerZIndex = 10, ...rest }: PageProps) {
    const {
        "page-breadcrumbs": breadcrumbs,
        "page-header": header,
        "page-content": content,
        "page-tabgroup": tabgroup,
        "page-footer": footer } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        "page-tabgroup": {},
        "page-breadcrumbs":{},
        "page-header": {},
        "page-content": {},
        "page-footer": {}
    });

    return (
        <Flex direction="column" height="100%" alignItems="center" {...rest}>
            <PageContainer
                wrapperProps={{ flexGrow: 1 }}
                marginBottom={footer ? "4.5rem" : undefined}
                height="100%"
            >
                <Flex
                    width="100%"
                    height="100%"
                    direction="column"
                    rowGap="stack-lg"
                    padding={{ base: "inset-stretch-sm", sm: "inset-xl" }}
                >
                    {breadcrumbs}
                    {header}
                    {tabgroup}
                    {content}
                </Flex>
            </PageContainer>
            {footer && (
                <Flex
                    position="sticky"
                    zIndex={footerZIndex}
                    bottom="0px"
                    backgroundColor="neutral"
                    width="100%"
                    borderTop="neutral-weak"
                >
                    <PageContainer>
                        {footer}
                    </PageContainer>
                </Flex>
            )}
        </Flex>
    );
}
