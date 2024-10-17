import { HttpResponse } from "msw";
import type { MswSession } from "./MswSession.ts";
import { sessionManager } from "./sessionManager.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withSession<TInput>(resolver: (input: TInput, session: MswSession) => any) {
    return (input: TInput) => {
        const session = sessionManager.getSession();

        if (!session) {
            return new HttpResponse(null, {
                status: 401
            });
        }

        return resolver(input, session);
    };
}
