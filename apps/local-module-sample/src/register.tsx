import { resolveAppRoutePath, type ApplicationRuntime, type ModuleRegisterFunction } from "@poc-css/federation-runtime";
import { Navigate } from "react-router-dom";
import { RouteProviders } from "./Providers.tsx";
import { I18nextNavigationItemLabel } from "./localization/I18nextNavigationItemLabel.tsx";
import { initI18next } from "./localization/i18next.ts";
import { getRequestHandlers } from "./mocks/handlers.ts";

function registerRoutes(runtime: ApplicationRuntime) {
    runtime.registerAppRoute({
        path: "episodes",
        lazy: async () => {
            const { ConnectedEpisodesPage } = await import("./EpisodesPage.tsx");

            return {
                element: <RouteProviders><ConnectedEpisodesPage /></RouteProviders>
            };
        }
    });

    runtime.registerAppRoute({
        index: true,
        element: <Navigate to={resolveAppRoutePath("episodes")!} replace />
    });

    runtime.registerSidebarNavigationItem({
        $key: "episodes",
        $label: <I18nextNavigationItemLabel resourceKey="episodesPage" />,
        to: resolveAppRoutePath("episodes")!
    });
}

async function registerMsw(runtime: ApplicationRuntime) {
    if (runtime.environment === "msw") {
        const requestHandlers = getRequestHandlers(runtime.environmentVariables);

        runtime.registerRequestHandlers(requestHandlers);
    }
}

function registerEnvironmentVariables(runtime: ApplicationRuntime) {
    runtime.registerEnvironmentVariables({
        rickAndMortyApiUrl: "/api/rick-and-morty/"
    });
}

export const register: ModuleRegisterFunction = async runtime => {
    registerEnvironmentVariables(runtime);

    await initI18next(runtime);
    await registerMsw(runtime);

    return registerRoutes(runtime);
};
