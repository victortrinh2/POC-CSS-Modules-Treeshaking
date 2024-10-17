import { RemoveIcon, SuccessIcon } from "@hopper-ui/icons";
import type { AriaButtonProps } from "@react-types/button";
import type { AriaLabelingProps, DOMAttributes } from "@react-types/shared";
import { CrossButton, Div, Flex, Text, type FlexProps } from "@workleap/orbiter-ui";
import { forwardRef, useCallback, useEffect, useRef, type ForwardedRef, type MouseEventHandler } from "react";
import { useCommittedRef } from "../useComittedRef.ts";

export interface ToastProps extends Omit<FlexProps, "children">, AriaLabelingProps {
    variant: "success" | "error";
    message: string;
    durationInMs?: number;
    onClose: () => void;
    titleProps?: DOMAttributes;
    closeButtonProps?: Omit<AriaButtonProps, "onPress">;
    forwardedRef?: ForwardedRef<HTMLDivElement>;
}

export function InnerToast(props: ToastProps) {
    const {
        variant,
        message,
        durationInMs,
        onClose,
        titleProps = {},
        closeButtonProps: { "aria-label": ariaLabel, ...closeButtonProps } = {},
        forwardedRef,
        ...rest
    } = props;

    // Using a ref instead of the provided onClose handler to prevent re-starting animation on re-renders.
    const onCloseRef = useCommittedRef(onClose);

    const progressBarRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        onCloseRef.current!();
    }, [onCloseRef]);

    useEffect(() => {
        const element = progressBarRef.current;

        if (element && durationInMs) {
            const animation = element.animate([
                { width: "100%" },
                { width: "0%" }
            ], {
                duration: durationInMs,
                easing: "linear"
            });

            animation.onfinish = () => {
                close();
            };

            return () => {
                animation.cancel();
            };
        }
    }, [durationInMs, close]);

    const handleCloseButtonClick = useCallback<MouseEventHandler<HTMLButtonElement>>(event => {
        event.preventDefault();
        close();
    }, [close]);

    const iconMarkup = {
        "success": <SuccessIcon fill="success-weakest" aria-hidden />,
        "error": <RemoveIcon fill="danger-weak" aria-hidden />
    }[variant];

    const textMarkup = (
        <Text
            color="neutral-strong"
            role="status"
            aria-live={durationInMs ? "assertive" : "polite"}
            textOverflow="ellipsis"
            overflow="hidden"
        >
            {message}
        </Text>
    );

    const closeButtonMarkup = (
        <CrossButton
            {...closeButtonProps}
            aria-label={ariaLabel!}
            size="sm"
            margin="-0.5rem"
            onClick={handleCloseButtonClick}
        />
    );

    const progressBarMarkup = durationInMs && (
        <Div
            ref={progressBarRef}
            position="absolute"
            bottom={0}
            left={0}
            height={40}
            backgroundColor={{
                "success": "success-strong",
                "error": "danger-strong"
            }[variant]}
        />
    );

    return (
        <Flex
            {...rest}
            position="relative"
            gap={80}
            alignItems="center"
            borderRadius={{ base: 0, xs: 2 }}
            padding={160}
            backgroundColor="neutral-strong"
            width={{ base: "100%", xs: "488px" }}
            justifyContent="space-between"
            overflow="hidden"
            // Required to prevent breaking the animation. See ToastRegion pointerEvents="none".
            pointerEvents="initial"
            ref={forwardedRef}
        >
            <Flex
                {...titleProps}
                gap={80}
                alignItems="center"
                overflow="hidden"
            >
                {iconMarkup}
                {textMarkup}
            </Flex>
            {closeButtonMarkup}
            {progressBarMarkup}
        </Flex>
    );
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => (
    <InnerToast {...props} forwardedRef={ref} />
));

