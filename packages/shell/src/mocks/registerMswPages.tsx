import type { ApplicationRuntime } from "@poc-css/federation-runtime";

export function registerMswPages(runtime: ApplicationRuntime) {
    // Ony register these pages if we are in an MSW environment. Otherwise, they are not necessary as we use
    // an external auth provider.
    if (runtime.environment === "msw") {
        runtime.registerPublicRoute({
            path: "/login",
            lazy: async () => {
                const { LoginPage } = await import("./pages/LoginPage.tsx");

                return {
                    element: <LoginPage />
                };
            }
        });

        runtime.registerPublicRoute({
            path: "/logout",
            lazy: async () => {
                const { LogoutPage } = await import("./pages/LogoutPage.tsx");

                return {
                    element: <LogoutPage />
                };
            }
        });
    }
}
