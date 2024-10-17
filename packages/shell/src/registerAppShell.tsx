import { ProtectedRoutes, PublicRoutes, type ApplicationRuntime } from "@poc-css/federation-runtime";
import { RootLayout } from "./RootLayout.tsx";

export function registerAppShell(runtime: ApplicationRuntime) {
    runtime.registerPublicRoute({
        $name: "root-layout",
        element: <RootLayout />,
        children: [
            PublicRoutes
        ]
    }, { hoist: true });

    runtime.registerRoute({
        lazy: async () => {
            const { AuthenticationBoundary } = await import("./AuthenticationBoundary.tsx");

            return {
                element: <AuthenticationBoundary />
            };
        },
        children: [
            ProtectedRoutes
        ]
    }, {
        parentName: "root-layout"
    });
}
