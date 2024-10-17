import { Div, slot, type DivProps } from "@workleap/orbiter-ui";

type PageContentProps = DivProps;

export const PageContent = slot("page-content", function PageContent({ children, ...rest }: PageContentProps) {
    return (
        <Div height="100%" {...rest}>
            {children}
        </Div>
    );
});
