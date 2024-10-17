import type { DeferredRegistrationFunction as SquideDeferredRegistrationFunction } from "@squide/firefly";
import type { ApplicationRuntime } from "./ApplicationRuntime.ts";
import type { Session } from "./Session.ts";

export interface DeferredRegistrationData {
    session?: Session;
    featureFlags?: string[]; // We use a string[] because the host app shouldn't have to know the list of all feature flags
}

export type DeferredRegistrationFunction = SquideDeferredRegistrationFunction<DeferredRegistrationData>;

export type ModuleRegisterFunction<TContext = unknown> = (runtime: ApplicationRuntime, context?: TContext) => Promise<DeferredRegistrationFunction | void> | DeferredRegistrationFunction | void;
