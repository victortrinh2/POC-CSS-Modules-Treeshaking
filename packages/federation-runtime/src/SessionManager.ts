import { createContext, useContext } from "react";
import type { Session } from "./Session.ts";

export interface SessionManager {
    getSession: () => Session | undefined;
    clearSession: () => void;
}

export const SessionManagerContext = createContext<SessionManager | undefined>(undefined);

export const SessionManagerProvider = SessionManagerContext.Provider;

export function useSessionManager() {
    return useContext(SessionManagerContext);
}

export function useSession() {
    const sessionManager = useSessionManager();

    return sessionManager?.getSession();
}

export function useIsAuthenticated() {
    const sessionManager = useSessionManager();

    return !!sessionManager?.getSession();
}
