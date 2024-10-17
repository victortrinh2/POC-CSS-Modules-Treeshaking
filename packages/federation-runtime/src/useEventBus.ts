// Must import the following types, otherwise we get a TS2742: The inferred type cannot be named without a reference to X. This is likely not portable.
// A type annotation is necessary.
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/no-duplicates
import type { AddListenerOptions, EventCallbackFunction, EventName, RemoveListenerOptions } from "@squide/firefly";

// eslint-disable-next-line import/no-duplicates
import { useEventBus as useFireflyEventBus, useEventBusDispatcher as useFireflyEventBusDispatcher, useEventBusListener as useFireflyEventBusListener, type EventBus as FireflyEventBus } from "@squide/firefly";
import type { SessionLoadedEvent } from "./SessionLoadedEvent.ts";
import type { ShowToastEvent } from "./useToast.ts";

export type AllEvents = typeof SessionLoadedEvent | typeof ShowToastEvent;

export type EventBus = FireflyEventBus<AllEvents>;

export function useEventBus() {
    const eventBus = useFireflyEventBus();

    return eventBus as EventBus;
}

export const useEventBusDispatcher = useFireflyEventBusDispatcher<AllEvents>;
export const useEventBusListener = useFireflyEventBusListener<AllEvents>;
