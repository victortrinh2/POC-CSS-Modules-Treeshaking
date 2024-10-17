import { useToast, useToastRegion, type AriaToastProps } from "@react-aria/toast";
import { useToastState, type ToastState } from "@react-stately/toast";
import { Toast, ToastRegion, type ToastRegionProps } from "@poc-css/components";
import { useShowToastListener, type ToastContent } from "@poc-css/federation-runtime";
import { useCallback, useRef, type ReactNode } from "react";
import { useTranslation } from "./localization/useTranslation.ts";

export interface StatefulToastProps extends AriaToastProps<ToastContent> {
    state: ToastState<ToastContent>;
}

export function StatefulToast({ state, ...props }: StatefulToastProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { toastProps, titleProps, closeButtonProps: { onPress, ...closeButtonProps } } = useToast(props, state, ref);

    const handleClose = useCallback(() => {
        // It doesn't matter because useAriaToast doesn't handle the event.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onPress();
    }, [onPress]);

    const toast = props.toast;

    return (
        <Toast
            {...toastProps}
            variant={toast.content.variant}
            message={toast.content.message}
            durationInMs={toast.timeout}
            onClose={handleClose}
            titleProps={titleProps}
            closeButtonProps={closeButtonProps}
            ref={ref}
        />
    );
}

export interface ToastContainerProps extends Omit<ToastRegionProps, "children"> {
}

export function ToastContainer(props: ToastContainerProps) {
    const {
        "aria-label": ariaLabel,
        ...rest
    } = props;

    const ref = useRef(null);

    const toastState = useToastState<ToastContent>({
        maxVisibleToasts: 1
    });

    const { regionProps: { "aria-label": regionPropsAriaLabel, ...regionProps } } = useToastRegion({ "aria-label": ariaLabel }, toastState, ref);

    useShowToastListener(({ content, durationInMs }) => {
        toastState.add(content, {
            timeout: durationInMs
        });
    });

    if (toastState.visibleToasts.length > 0) {
        return (
            <ToastRegion
                {...rest}
                {...regionProps}
                aria-label={regionPropsAriaLabel as string}
                ref={ref}
            >
                {toastState.visibleToasts.map(toast => (
                    <StatefulToast key={toast.key} toast={toast} state={toastState} />
                ))}
            </ToastRegion>
        );
    }

    return null;
}

export interface ToastProviderProps extends Omit<ToastContainerProps, "aria-label"> {
    children: ReactNode;
}

export function ToastProvider({ children, ...props }: ToastProviderProps) {
    const { t } = useTranslation("ToastProvider");

    return (
        <>
            {children}
            <ToastContainer
                {...props}
                aria-label={t("ariaLabel")}
            />
        </>
    );
}
