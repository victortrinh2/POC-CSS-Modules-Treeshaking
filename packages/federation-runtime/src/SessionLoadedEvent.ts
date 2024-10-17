import { useCallback } from "react";
import type { Session } from "./Session.ts";
import { useEventBusDispatcher, useEventBusListener } from "./useEventBus.ts";

export const SessionLoadedEvent = "SESSION_LOADED";

export function useDispatchSessionLoadedEvent() {
    const dispatch = useEventBusDispatcher();

    return useCallback((session: Session) => {
        dispatch(SessionLoadedEvent, session);
    }, [dispatch]);
}

export function useSessionLoadedListener(callback: (session: Session) => void) {
    useEventBusListener(SessionLoadedEvent, callback as (message: unknown) => void);
}
