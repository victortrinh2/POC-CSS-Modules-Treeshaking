import { createLazySvgImage } from "@poc-css/components";
import { Div, Flex, Grid } from "@workleap/orbiter-ui";
import type { PropsWithChildren } from "react";

export interface ErrorLayoutProps extends PropsWithChildren {
    variant?: "root" | "nested";
}

const WorkleapLogo = createLazySvgImage(() => import("./assets/WorkleapLogo.tsx"));

function RootErrorLayout({ children }: PropsWithChildren) {
    return (
        <Grid
            backgroundColor="decorative-option7-weak"
            templateRows="auto 1fr"
            height="100%"
        >
            <Flex
                minHeight={{ base: "150px", md: "0" }}
                justifyContent={{ base: "center", xs: "start" }}
                alignItems={{ base: "end", xs: "start" }}
            >
                <WorkleapLogo aria-label="Workleap" margin={{ base: "0 0 2rem 0", xs: "2rem 0 0 2rem" }} width="150px" />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <Flex direction="column" alignItems="center" marginX={160}>
                    {children}
                </Flex>
            </Flex>
        </Grid>
    );
}

function NestedErrorLayout({ children }: PropsWithChildren) {
    return (
        <Flex justifyContent="center" alignItems="center" height="100%" fluid>
            <Div marginX={160}>{children}</Div>
        </Flex>
    );
}

export function ErrorLayout({ variant = "root", children }: ErrorLayoutProps) {
    return variant === "root"
        ? <RootErrorLayout>{children}</RootErrorLayout>
        : <NestedErrorLayout>{children}</NestedErrorLayout>;
}
