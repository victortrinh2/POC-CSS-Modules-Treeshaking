import {
    mergeDeferredRegistrations as squideMergeDeferredRegistrations,
    // FIX: error TS2742: The inferred type of 'mergeDeferredRegistrations' cannot be named without a reference to XXX. This is likely not portable. A type annotation is necessary.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type DeferredRegistrationFunction
} from "@squide/firefly";
import type { DeferredRegistrationData } from "./ModuleRegisterFunction.ts";

export const mergeDeferredRegistrations = squideMergeDeferredRegistrations<DeferredRegistrationData>;
