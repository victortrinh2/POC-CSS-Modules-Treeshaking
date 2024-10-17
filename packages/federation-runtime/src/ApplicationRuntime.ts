import { FireflyRuntime, type FireflyRuntimeOptions, type RegisterRouteOptions, type RootNavigationItem, type RuntimeMode } from "@squide/firefly";
import type { Environment } from "./Environment.ts";
import { EnvironmentVariablesRegistry, type EnvironmentVariables } from "./EnvironmentVariablesRegistry.ts";
import type { Route } from "./Route.ts";
import { AppLayoutRoute, SidebarMenuId } from "./federationConstants.ts";
import { createI18nextPlugin } from "./i18next/createI18nextPlugin.ts";
import { resolveRoutePath } from "./resolveRoutePath.ts";

export type ApplicationRuntimeOptions = FireflyRuntimeOptions;

function getModeFromEnvironment(env: Environment): RuntimeMode {
    if (env === "msw" || env === "local" || env === "development") {
        return "development";
    }

    return "production";
}

export class ApplicationRuntime extends FireflyRuntime {
    readonly #environment: Environment;
    readonly #isIsolated: boolean;
    readonly #environmentVariablesRegistry = new EnvironmentVariablesRegistry();

    constructor(env: Environment, isIsolated: boolean, { mode, plugins, ...options }: ApplicationRuntimeOptions = {}) {
        super({
            mode: mode ?? getModeFromEnvironment(env),
            useMsw: env === "msw",
            plugins: [
                ...(plugins ?? []),
                runtime => createI18nextPlugin(runtime)
            ],
            ...options
        });

        this.#environment = env;
        this.#isIsolated = isIsolated;
    }

    get environment() {
        return this.#environment;
    }

    get isIsolated() {
        return this.#isIsolated;
    }

    registerEnvironmentVariables(variables: Partial<EnvironmentVariables>) {
        for (const [key, value] of Object.entries(variables)) {
            this.#environmentVariablesRegistry.add(key as keyof EnvironmentVariables, value);
        }
    }

    get environmentVariables() {
        return this.#environmentVariablesRegistry.getVariables();
    }

    registerRoute(route: Route, options?: RegisterRouteOptions | undefined) {
        return super.registerRoute(route, options);
    }

    registerAppRoute(route: Route, options?: RegisterRouteOptions | undefined) {
        return super.registerRoute(
            { ...route, path: resolveRoutePath(route.path, AppLayoutRoute) },
            { ...options, parentPath: AppLayoutRoute });
    }

    registerSidebarNavigationItem(navigationItem: RootNavigationItem) {
        return super.registerNavigationItem(navigationItem, { menuId: SidebarMenuId });
    }
}
