import type { HttpClientErrorResponse, HttpClientResponse } from "./httpClient.ts";
import { sleep } from "./sleep.ts";

const RetryDelayInMs = 1000;

const RetryHeaders: HeadersInit = {
    "Access-Control-Request-Headers": "X-Retry-After"
};

export type RetryRequestExecutor = (headers: HeadersInit) => Promise<HttpClientResponse>;

export type RetryDelayFunction = (response: HttpClientErrorResponse, retryedCount: number) => number | false;

export interface WithRetryOptions {
    retryDelayInMs?: number | RetryDelayFunction;
}

export function withRetry(execute: RetryRequestExecutor, retryCount: number, options: WithRetryOptions = {}) {
    const {
        retryDelayInMs = RetryDelayInMs
    } = options;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<HttpClientResponse>(async (resolve, reject) => {
        try {
            let failureCount = 0;

            // eslint-disable-next-line no-constant-condition
            while (true) {
                const response = await execute(RetryHeaders);

                if (!response.ok) {
                    const { error } = response;

                    if (error.reason === "Aborted" || error.reason === "Timeout") {
                        resolve(response);
                        break;
                    }

                    if (failureCount < retryCount) {
                        let delayInMs: number;

                        // The function can either returned the expected delay to wait before the next loop
                        // or "false" to prevent any further retries.
                        if (isFunction(retryDelayInMs)) {
                            const value = retryDelayInMs(response, failureCount);

                            if (value === false) {
                                // The consumer asked to stop the retries, resolve.
                                resolve(response);
                                break;
                            }

                            delayInMs = value;
                        } else {
                            delayInMs = retryDelayInMs;
                        }

                        failureCount += 1;

                        await sleep(delayInMs);
                    } else {
                        // The retries count has been exhausted, resolve.
                        resolve(response);
                        break;
                    }
                } else {
                    // The request succeeded, resolve.
                    resolve(response);
                    break;
                }
            }
        } catch (error: unknown) {
            reject(error);
        }
    });
}

// Using "unknown" loses the typings.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === "function";
}
