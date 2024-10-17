import type { Logger } from "@poc-css/federation-runtime";
import type { RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

export function startMsw(requestHandlers: RequestHandler[], logger: Logger) {
    logger.debug("[local-module-sample] Starting MSW with the following request handlers:", requestHandlers);

    const worker = setupWorker(...requestHandlers);

    return worker.start({
        onUnhandledRequest: "bypass"
    });
}
