import { mergeDeferredRegistrations, type ModuleRegisterFunction } from "@poc-css/federation-runtime";
import { registerSharedLayouts } from "@poc-css/layouts";
import type { MswLogin } from "@poc-css/msw";
import { registerEnvironmentVariables } from "./env/registerEnvironmentVariables.ts";
import { initI18next } from "./localization/i18next.ts";
import { registerMswPages } from "./mocks/registerMswPages.tsx";
import { registerMswRequestHandlers } from "./mocks/registerMswRequestHandlers.ts";
import { registerAppShell } from "./registerAppShell.tsx";

export interface RegisterShellOptions {
    /**
     * To facilitate the integration of features that relies on the member session, the shell accepts
     * an array of custom members that will be forwarded to the MSW handlers and available at login (the MSW login page).
     */
    additionalLogins?: MswLogin[];
}

export function registerShell({ additionalLogins }: RegisterShellOptions = {}) {
    const register: ModuleRegisterFunction = async runtime => {
        registerEnvironmentVariables(runtime);

        await initI18next(runtime, runtime.mode === "development" ? { debug : true } : undefined);
        await registerMswRequestHandlers(runtime, { additionalLogins });

        return mergeDeferredRegistrations([
            registerMswPages(runtime),
            registerAppShell(runtime),
            await registerSharedLayouts(runtime)
        ]);
    };

    return register;
}
