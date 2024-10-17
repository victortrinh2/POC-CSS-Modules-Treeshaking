import { Flex, StyleProvider, Text, slot, useSlots, type FlexProps } from "@workleap/orbiter-ui";
import type { PageActionsProps } from "./PageActions.tsx";

interface PageHeaderProps extends FlexProps {
}

function InnerPageHeader({ children, ...rest }: PageHeaderProps) {
    const { "page-title": title, "page-actions": pageActions } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        "page-title": {},
        "page-actions": {
            wrap: { base: true, sm: false },
            justifyContent: { base: "start", sm: "end" },
            gap: { base: "stack-md", sm: "inline-md" },
            width: { base: "100%", sm: "initial" }
        } satisfies Partial<PageActionsProps>
    });

    return (
        <Flex
            direction={{ base: "column", sm: "row" }}
            gap="stack-md"
            justifyContent="space-between"
            alignItems={{ base: "start", sm: "end" }}
            {...rest}
        >
            {title}
            <StyleProvider value={{
                button: {
                    fluid: { base: true, sm: false }
                }
            }}
            >
                {pageActions}
            </StyleProvider>
        </Flex>
    );
}

export const PageHeader = slot("page-header", InnerPageHeader);
