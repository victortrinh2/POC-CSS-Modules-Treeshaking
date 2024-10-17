import { useEnvironmentVariables, useLogger } from "@poc-css/federation-runtime";
import { isApiError } from "@poc-css/http";
import { ChunkLoadError, ForbiddenError, InternalServerError, isChunkLoadError } from "@poc-css/layouts";
import { useEffect } from "react";
import { useLocation, useRouteError } from "react-router-dom";

export interface RootErrorBoundaryProps {
    error?: unknown;
}

export function RootErrorBoundary({ error }: RootErrorBoundaryProps) {
    const location = useLocation();

    const logger = useLogger();
    const environmentVariables = useEnvironmentVariables();

    useEffect(() => {
        logger.error(`[shell] An unmanaged error occurred while rendering the route with path ${location.pathname}`, error);
    }, [logger, error, location]);

    if (isApiError(error)) {
        if (error.status === 401) {
            const returnUrl = new URLSearchParams({ returnUrl: window.location.href }).toString();

            window.location.href = `${environmentVariables.loginPageUrl}?${returnUrl}`;
        } else if (error.status === 403) {
            return (
                <ForbiddenError />
            );
        }
    } else if (isChunkLoadError(error)) {
        return <ChunkLoadError />;
    }

    // Should usually only handles HTTP 500 error but it's currently also used as the default
    // error screen since it's the root error boundary.
    return (
        <InternalServerError />
    );
}

export function ConnectedRootErrorBoundary() {
    const error = useRouteError();

    return <RootErrorBoundary error={error} />;
}

