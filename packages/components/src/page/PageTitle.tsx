import { H1, Inline, Stack, Text, Tooltip, TooltipTrigger, slot, useSlots, type InlineProps } from "@workleap/orbiter-ui";
import { useLayoutEffect, useRef, useState } from "react";

import "./PageTitle.css";

interface PageTitleProps extends InlineProps {
}

function InnerPageTitle({ children, ...rest }: PageTitleProps) {
    const { ref, isOverflowing } = useIsOverflowing();
    const { text, description, icon, lozenge, tag } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        "text": {
            size: "inherit",
            fontFamily: "inherit"
        },
        "lozenge": {},
        "tag": {},
        "icon": {},
        "description": {
            color: "neutral-weak"
        }
    });

    return (
        <Stack gap={0} minWidth={0}>
            <Inline alignY="center" gap="inline-sm" wrap={false} {...rest}>
                <TooltipTrigger disabled={!isOverflowing}>
                    <H1
                        ref={ref}
                        className="page-title"
                        size="2xl"
                        height="100%"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        marginBottom={0}
                    >
                        {text}
                    </H1>
                    <Tooltip>{text}</Tooltip>
                </TooltipTrigger>
                {lozenge}
                {tag}
                {icon}
            </Inline>
            {description}
        </Stack>
    );
}

function useIsOverflowing<T extends HTMLElement>() {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            // Account for rounding errors: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions.
            setIsOverflowing(Math.abs(ref.current.offsetHeight - ref.current.scrollHeight) > 1);
        }
    }, [ref]);

    return { isOverflowing, ref };
}

export const PageTitle = slot("page-title", InnerPageTitle);
