import { useQueryClient, type QueryClient } from "@tanstack/react-query";
import type { Session, SessionManager } from "@poc-css/federation-runtime";
import { useMemo } from "react";

class TanstackQuerySessionManager implements SessionManager {
    #session: Session | undefined;
    readonly #queryClient: QueryClient;

    constructor(session: Session, queryClient: QueryClient) {
        this.#session = session;
        this.#queryClient = queryClient;
    }

    getSession() {
        return this.#session;
    }

    clearSession() {
        this.#session = undefined;

        this.#queryClient.invalidateQueries({ queryKey: ["/api/session"], refetchType: "inactive" });
        this.#queryClient.invalidateQueries({ queryKey: ["/header/data"], refetchType: "inactive" });
    }
}

export function useSessionManagerInstance(session: Session) {
    const queryClient = useQueryClient();

    return useMemo(() => new TanstackQuerySessionManager(session, queryClient), [session, queryClient]);
}
