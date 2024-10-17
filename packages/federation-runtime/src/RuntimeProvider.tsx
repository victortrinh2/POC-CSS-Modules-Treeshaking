import { RuntimeContext, useRuntime as useFireflyRuntime } from "@squide/firefly";
import type { ReactNode } from "react";
import type { ApplicationRuntime } from "./ApplicationRuntime.ts";

export interface RuntimeProviderProps {
    runtime: ApplicationRuntime;
    children: ReactNode;
}

export function RuntimeProvider({ runtime, children }: RuntimeProviderProps) {
    return (
        <RuntimeContext.Provider value={runtime}>
            {children}
        </RuntimeContext.Provider>
    );
}

export function useRuntime() {
    const runtime = useFireflyRuntime();

    return runtime as ApplicationRuntime;
}
