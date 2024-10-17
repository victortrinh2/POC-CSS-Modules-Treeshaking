import { AngleRightIcon } from "@hopper-ui/icons";
import { Flex, Text, Tooltip, TooltipTrigger, slot, type TextProps } from "@workleap/orbiter-ui";
import { Fragment, type ReactNode } from "react";
import { RouterTextLink, type RouterTextLinkProps } from "../index.ts";

import "./PageBreadcrumbs.css";

export interface PageBreadcrumbLink {
    name: string;
    link: string | null;
}

interface PageBreadcrumbsProps {
    links: PageBreadcrumbLink[];
}

function InnerPageBreadcrumbs({ links }: PageBreadcrumbsProps) {
    return (
        <Flex gap="inline-sm" alignItems="center">
            {links.map((link, index) => {
                const isLastBreadcrumb = index === links.length - 1;

                return (
                    <Fragment key={link.name}>
                        <BreadcrumbPart
                            to={link.link}
                            color={isLastBreadcrumb ? "neutral" : "neutral-weak"}
                            fontSize="overline"
                            fontFamily="overline"
                            fontWeight="overline"
                            lineHeight="overline"
                            textTransform="uppercase"
                            marginBottom="-0.125rem" // to align the text with the icons
                        >
                            {link.name}
                        </BreadcrumbPart>
                        {!isLastBreadcrumb && <Separator />}
                    </Fragment>
                );
            })}
        </Flex>
    );
}

type ShortenedComponents = ShortenedLinkProps & ShortenedTextPros;

interface BreadcrumbPartProps extends Omit<ShortenedComponents, "to">{
    to: string | null;
}

function BreadcrumbPart({ to, ...rest }: BreadcrumbPartProps) {
    return to ? (
        <ShortenedLink to={to} {...rest} />
    ) : (
        <ShortenedText {...rest} />
    );
}

function Separator() {
    return <AngleRightIcon UNSAFE_width="10px" UNSAFE_height="10px" />;
}

function truncateString(str: string, num: number) {
    if (str.length <= num) {
        return str;
    }

    // trimEnd to make sure there is not a weird space between the string and the ellipsis
    return str.substring(0, num).trimEnd() + "…";
}

interface ShortenedLinkProps extends RouterTextLinkProps {
    children: string;
}

const ShortenedLink = ({ children, ...rest }: ShortenedLinkProps) => {
    const content = (
        <RouterTextLink
            className="page-breadcrumb__link"
            textDecoration="none"
            {...rest}
        >
            {truncateString(children, 40)}
        </RouterTextLink>
    );

    return children.length > 40 ? withTooltip(content, children) : content;
};

interface ShortenedTextPros extends TextProps {
    children: string;
}

const ShortenedText = ({ children, ...rest }: ShortenedTextPros) => {
    const content = (
        <Text {...rest}>
            {truncateString(children, 40)}
        </Text>
    );

    return children.length > 40 ? withTooltip(content, children) : content;
};

function withTooltip(trigger: ReactNode, tooltipText: string) {
    return (
        <TooltipTrigger>
            {trigger}
            <Tooltip>{tooltipText}</Tooltip>
        </TooltipTrigger>
    );
}

export const PageBreadcrumbs = slot("page-breadcrumbs", InnerPageBreadcrumbs);
