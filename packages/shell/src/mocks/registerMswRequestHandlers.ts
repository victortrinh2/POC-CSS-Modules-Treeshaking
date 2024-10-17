import type { ApplicationRuntime } from "@poc-css/federation-runtime";
import type { GetRequestHandlersOptions } from "./handlers.ts";

export async function registerMswRequestHandlers(runtime: ApplicationRuntime, options?: GetRequestHandlersOptions) {
    // Files including an import to the "msw" package are included dynamically to prevent adding
    // MSW stuff to the bundled when it's not used.
    if (runtime.environment === "msw") {
        const requestHandlers = (await import("./handlers.ts")).getRequestHandlers(runtime.environmentVariables, options);

        runtime.registerRequestHandlers(requestHandlers);
    }
}
