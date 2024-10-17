import { AppLayoutRoute } from "./federationConstants.ts";

// Cannot use URL() because it doesn't support relative base url: https://github.com/whatwg/url/issues/531.
export function resolveRoutePath(path: string | undefined, baseUrl: string) {
    if (!path) {
        return undefined;
    }

    if (path.includes(baseUrl)) {
        return path;
    }

    return `${baseUrl}${baseUrl!.endsWith("/") ? "" : "/"}${path.startsWith("/") ? path.substring(1) : path}`;
}

export function resolveAppRoutePath(path: string) {
    return resolveRoutePath(path, AppLayoutRoute);
}
