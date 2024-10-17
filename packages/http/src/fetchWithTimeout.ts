import { anySignal } from "./anySignal.ts";

export interface FetchWithTimeoutOptions extends RequestInit {
    timeoutInMs?: number;
}

export function fetchWithTimeout(url: RequestInfo, { timeoutInMs, signal, ...options }: FetchWithTimeoutOptions = {}) {
    let requestSignal: AbortSignal | undefined | null = signal;

    if (timeoutInMs && timeoutInMs > 0) {
        const timeoutSignal = AbortSignal.timeout(timeoutInMs);

        if (signal) {
            // Using anySignal until AbortSignal.any browser compatibility expands: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static#browser_compatibility.
            requestSignal = anySignal([timeoutSignal, signal]);
        } else {
            requestSignal = timeoutSignal;
        }
    }

    return fetch(url, {
        ...options,
        signal: requestSignal
    });
}
