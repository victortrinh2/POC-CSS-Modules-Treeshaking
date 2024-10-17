import type { EnvironmentVariables } from "@poc-css/federation-runtime";
import type { HttpHandler } from "msw";
import { getAuthenticationHandlers, type GetAuthenticationHandlersOptions } from "./authenticationHandlers.ts";
import { getNavigationHandlers } from "./navigationHandlers.ts";

export interface GetRequestHandlersOptions extends GetAuthenticationHandlersOptions {}

// Must specify the return type, otherwise we get a TS2742: The inferred type cannot be named without a reference to X. This is likely not portable.
// A type annotation is necessary.
export function getRequestHandlers(environmentVariables: EnvironmentVariables, { additionalLogins }: GetRequestHandlersOptions = {}): HttpHandler[] {
    return [
        ...getAuthenticationHandlers(environmentVariables, { additionalLogins }),
        ...getNavigationHandlers(environmentVariables)
    ];
}
