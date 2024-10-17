import { AppLayoutRoute, type ModuleRegisterFunction } from "@poc-css/federation-runtime";
import { initI18next } from "./localization/i18next.ts";
import { QueryProvider } from "./QueryProvider.tsx";

export const registerSharedLayouts: ModuleRegisterFunction = async runtime => {
    await initI18next(runtime, runtime.mode === "development" ? { debug : true } : undefined);

    runtime.registerRoute({
        path: AppLayoutRoute,
        lazy: async () => {
            const { ConnectedAuthenticatedRootLayout } = await import("./AuthenticatedRootLayout.tsx");

            return {
                element: <QueryProvider><ConnectedAuthenticatedRootLayout /></QueryProvider>
            };
        }
    });

    runtime.registerPublicRoute({
        path: "*",
        lazy: async () => {
            const { NotFoundError } = await import("./NotFoundError.tsx");

            return { element: <NotFoundError /> };
        }
    });
};
