import type { Logger } from "@poc-css/federation-runtime";
import type { RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

export function startMsw(moduleRequestHandlers: RequestHandler[], logger: Logger) {
    logger.debug("[host-app] Starting MSW with the following request handlers:", moduleRequestHandlers);

    const worker = setupWorker(...moduleRequestHandlers);

    return worker.start({
        onUnhandledRequest: "bypass"
    });
}
