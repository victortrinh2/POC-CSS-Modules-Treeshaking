import { useMemo } from "react";
import { useEventBusDispatcher, useEventBusListener } from "./useEventBus.ts";

export const ShowToastEvent = "SHOW_TOAST";

export interface ToastContent {
    variant: "success" | "error";
    message: string;
}

export interface ShowToastPayload {
    content: ToastContent;
    durationInMs?: number;
}

export interface ShowToastOptions {
    durationInMs?: number;
}

export interface ToastDispatcher {
    success: (message: string, options?: ShowToastOptions) => void;
    error: (message: string, options?: ShowToastOptions) => void;
}

export function useToast() {
    const dispatch = useEventBusDispatcher();

    return useMemo(() => ({
        success: (message: string, { durationInMs }: ShowToastOptions = {}) => {
            dispatch(ShowToastEvent, {
                content: { variant: "success", message },
                durationInMs
            });
        },
        error: (message: string, { durationInMs }: ShowToastOptions = {}) => {
            dispatch(ShowToastEvent, {
                content: { variant: "error", message },
                durationInMs
            });
        }
    } satisfies ToastDispatcher), [dispatch]);
}

export function useShowToastListener(callback: (payload: ShowToastPayload) => void) {
    useEventBusListener(ShowToastEvent, callback as (message: unknown) => void);
}
