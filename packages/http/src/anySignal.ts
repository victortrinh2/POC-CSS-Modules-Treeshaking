// This code has been copied from https://github.com/jacobheun/any-signal/blob/master/src/index.ts because I was having issues
// to get the package working with Jest.

export interface ClearableSignal extends AbortSignal {
    clear: () => void;
}

// This is a temporary function until AbortSignal.any browser compatibility expands: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static#browser_compatibility.
export function anySignal(signals: Array<AbortSignal | undefined | null>): ClearableSignal {
    const controller = new globalThis.AbortController();

    function onAbort(): void {
        controller.abort();

        for (const signal of signals) {
            if (signal?.removeEventListener != null) {
                signal.removeEventListener("abort", onAbort);
            }
        }
    }

    for (const signal of signals) {
        if (signal?.aborted === true) {
            onAbort();
            break;
        }

        if (signal?.addEventListener != null) {
            signal.addEventListener("abort", onAbort);
        }
    }

    function clear(): void {
        for (const signal of signals) {
            if (signal?.removeEventListener != null) {
                signal.removeEventListener("abort", onAbort);
            }
        }
    }

    const signal = controller.signal as ClearableSignal;
    signal.clear = clear;

    return signal;
}
