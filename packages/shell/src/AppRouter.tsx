import {
    FeatureFlagsProvider,
    AppRouter as FireflyAppRouter,
    SessionManagerProvider,
    useChangeLanguage,
    useCurrentLanguage,
    useDeferredRegistrations,
    useDispatchSessionLoadedEvent,
    useEnvironmentVariables,
    useIsBootstrapping,
    useLogger,
    useProtectedDataQueries,
    usePublicDataQueries,
    useRuntime,
    useToast,
    type EnvironmentVariables,
    type LanguageKey,
    type Session
} from "@poc-css/federation-runtime";
import { getJson, isApiError, resolveApiUrl } from "@poc-css/http";
import { HeaderDataContextProvider } from "@poc-css/layouts";
import type { HeaderData } from "@workleap-nav/react";
import { ThemeProvider } from "@workleap/orbiter-ui";
import { useCallback, useEffect, useMemo, type PropsWithChildren } from "react";
import { I18nProvider as ReactAriaI18nProvider } from "react-aria-components";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AppLoading } from "./AppLoading.tsx";
import { useTranslation } from "./localization/useTranslation.ts";
import { QueryProvider } from "./QueryProvider.tsx";
import { ConnectedRootErrorBoundary } from "./RootErrorBoundary.tsx";
import { ToastProvider } from "./ToastProvider.tsx";
import { useSessionManagerInstance } from "./useSessionManagerInstance.ts";

function fetchFeatureFlags() {
    // TODO: Fetch the feature flags from the backend.
    return [] as string[];
}

async function fetchSession(environmentVariables: EnvironmentVariables) {
    const response = await getJson(resolveApiUrl("getMemberContext", environmentVariables.navigationApiBaseUrl));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = response.data as any;

    return {
        memberId: data.memberId,
        organizationId: data.organizationId,
        emailAddress: data.email,
        givenName: data.displayName,
        isExecutiveManager: data.isExecutiveManager,
        isOrganizationAdmin: data.isOrganizationAdmin,
        isTeamManager: data.isTeamManager,
        isCollaborator: data.isCollaborator,
        isReportingManager: data.isReportingManager,
        preferredLanguages: data.preferredLanguages,
        timeZone: data.timeZone
    } satisfies Session;
}

async function fetchHeaderData(environmentVariables: EnvironmentVariables, displayLoadingError: () => void) {
    try {
        const response = await getJson(resolveApiUrl("header/data", environmentVariables.navigationApiBaseUrl), {
            retryCount: 3
        });

        return response.data as HeaderData;
    } catch (error: unknown) {
        if (isApiError(error)) {
            displayLoadingError();

            // Tanstack useQueries doesn't support returning "undefined".
            return null;
        }

        throw error;
    }
}

interface CommonProvidersProps extends PropsWithChildren {
    currentLanguage: LanguageKey;
}

function CommonProviders({ currentLanguage, children }: CommonProvidersProps) {
    return (
        <ThemeProvider colorScheme="light">
            {/* To localize the @react-aria components. */}
            <ReactAriaI18nProvider locale={currentLanguage}>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ReactAriaI18nProvider>
        </ThemeProvider>
    );
}

function BootstrappingRoute() {
    const logger = useLogger();
    const environmentVariables = useEnvironmentVariables();

    const [featureFlags] = usePublicDataQueries([
        {
            queryKey: ["/api/feature-flags"],
            queryFn: () => {
                return fetchFeatureFlags();
            }
        }
    ]);

    useEffect(() => {
        if (featureFlags) {
            logger.debug("[shell] %cFeature flags has been fetched%c:", "color: white; background-color: green;", "", featureFlags);
        }
    }, [featureFlags, logger]);

    const { t } = useTranslation("AppRouter");
    const toast = useToast();

    const displayHeaderDataLoadingError = useCallback(() => {
        toast.success(t("cannotLoadHeaderDataMessage"));
    }, [toast, t]);

    const [session, headerData] = useProtectedDataQueries([
        {
            queryKey: ["/api/session"],
            queryFn: () => {
                return fetchSession(environmentVariables);
            }
        },
        {
            queryKey: ["/header/data"],
            queryFn: () => {
                return fetchHeaderData(environmentVariables, displayHeaderDataLoadingError);
            }
        }
    ], error => isApiError(error) && error.status === 401);

    const changeLanguage = useChangeLanguage();
    const dispatchSessionLoadedEvent = useDispatchSessionLoadedEvent();

    useEffect(() => {
        if (session) {
            logger.debug("[shell] %cSession has been fetched%c:", "color: white; background-color: green;", "", session);

            // If a preferred language is available, update the language to match the user preferred language.
            if (session.preferredLanguages[0]) {
                const preferredLanguage = session.preferredLanguages[0] as LanguageKey;

                logger.debug(`[shell] Changing language for %c${preferredLanguage}%c as it's the user preferred language.`, "", session);

                changeLanguage(preferredLanguage);
            }

            // Allow modules to react when the session has been loaded/updated, enabling use cases such as redirecting a user
            // if the user onboarding has not been completed yet.
            dispatchSessionLoadedEvent(session);
        }
    }, [session, changeLanguage, dispatchSessionLoadedEvent, logger]);

    useEffect(() => {
        if (headerData) {
            logger.debug("[shell] %cHeader data has been fetched%c:", "color: white; background-color: green;", "", headerData);
        }
    }, [headerData, logger]);

    useDeferredRegistrations(useMemo(() => ({
        featureFlags,
        session
    }), [featureFlags, session]));

    const sessionManager = useSessionManagerInstance(session);
    const currentLanguage = useCurrentLanguage();

    const content = useIsBootstrapping() ? <AppLoading /> : <Outlet />;

    return (
        <ThemeProvider colorScheme="light">
            {/* To localize the @react-aria components. */}
            <ReactAriaI18nProvider locale={currentLanguage}>
                <ToastProvider>
                    <FeatureFlagsProvider value={featureFlags}>
                        <SessionManagerProvider value={sessionManager}>
                            <HeaderDataContextProvider value={headerData!}>
                                {content}
                            </HeaderDataContextProvider>
                        </SessionManagerProvider>
                    </FeatureFlagsProvider>
                </ToastProvider>
            </ReactAriaI18nProvider>
        </ThemeProvider>
    );
}

export function AppRouter() {
    const runtime = useRuntime();
    const logger = useLogger();

    return (
        <QueryProvider>
            <FireflyAppRouter
                waitForMsw={runtime.environment === "msw"}
                waitForPublicData
                waitForProtectedData
            >
                {({ rootRoute, registeredRoutes, routerProviderProps }) => {
                    logger.debug("[shell] React Router will be rendered with the following route definitions: ", registeredRoutes);

                    return (
                        <RouterProvider
                            router={createBrowserRouter([
                                {
                                    element: rootRoute,
                                    errorElement: <ConnectedRootErrorBoundary />,
                                    children: [
                                        {
                                            element: <BootstrappingRoute />,
                                            children: registeredRoutes
                                        }
                                    ]
                                }
                            ])}
                            future={{ v7_startTransition: true }}
                            {...routerProviderProps}
                        />
                    );
                }}
            </FireflyAppRouter>
        </QueryProvider>
    );
}
