import { useEnvironmentVariables, useLogger } from "@poc-css/federation-runtime";
import { isApiError } from "@poc-css/http";
import { useEffect } from "react";
import { useLocation, useRouteError } from "react-router-dom";
import { ChunkLoadError, isChunkLoadError } from "./ChunkLoadError.tsx";
import { ForbiddenError } from "./ForbiddenError.tsx";
import { InternalServerError } from "./InternalServerError.tsx";

export function NestedErrorBoundary() {
    const error = useRouteError();
    const location = useLocation();

    const logger = useLogger();
    const environmentVariables = useEnvironmentVariables();

    useEffect(() => {
        logger.error(`[layouts] An unmanaged error occurred while rendering the route with path ${location.pathname}`, error);
    }, [logger, error, location]);

    if (isApiError(error)) {
        if (error.status === 401) {
            const returnUrl = new URLSearchParams({ returnUrl: window.location.href }).toString();

            window.location.href = `${environmentVariables.loginPageUrl}?${returnUrl}`;
        } else if (error.status === 403) {
            return (
                <ForbiddenError variant="nested" />
            );
        } else if (error.status === 500) {
            return (
                <InternalServerError variant="nested" />
            );
        }
    } else if (isChunkLoadError(error)) {
        return <ChunkLoadError variant="nested" />;
    }

    // Bubble up the error to a parent error boundary.
    throw error;
}
