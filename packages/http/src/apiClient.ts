/*
TODO:
    - Manage backend validation errors
*/

import { ApiError } from "./ApiError.ts";
import { httpGet, httpPost, type HttpClientOptions, type HttpClientResponse } from "./httpClient.ts";
import { withRetry, type RetryDelayFunction } from "./withRetry.ts";

export const ApiTimeoutInMs = 3000;
export const ApiRetryDelayInMs = 500;
export const ApiRateLimitedRetryDelayUnitInMs = 2000;

const retryFunction: RetryDelayFunction = ({ error, headers }, failureCount) => {
    const retryAfter = headers?.get("Retry-After");

    // The endpoint provided a retry delay.
    if (retryAfter) {
        try {
            return parseInt(retryAfter);
        } catch (_: unknown) {
            return ApiRetryDelayInMs;
        }
    }

    // The request has been rate limited, wait and try again.
    if (error.status === 429) {
        return (failureCount + 1) * ApiRateLimitedRetryDelayUnitInMs;
    }

    if (error.reason === "NetworkError") {
        return ApiRetryDelayInMs;
    }

    return false;
};

export interface ApiClientOptions extends HttpClientOptions {
    retryCount?: number;
}

function createRequestOptions(options: ApiClientOptions = {}, additionalHeaders: HeadersInit = {}): HttpClientOptions {
    const {
        headers,
        // API response should never be the result of a redirected request. Disabling by default to prevent forged requests.
        redirect = "error",
        timeoutInMs = ApiTimeoutInMs,
        ...rest
    } = options;

    return {
        headers: {
            ...additionalHeaders,
            ...headers
        },
        credentials: "include",
        redirect,
        timeoutInMs,
        ...rest
    };
}

type Executor = (retryHeaders?: HeadersInit) => Promise<HttpClientResponse>;

async function executeRequest(executor: Executor, retryCount?: number) {
    let response: HttpClientResponse;

    if (retryCount) {
        response = await withRetry(executor, retryCount, {
            retryDelayInMs: retryFunction
        });
    } else {
        response = await executor();
    }

    if (!response.ok) {
        throw new ApiError(response);
    }

    return response;
}

export interface ApiClientGetJsonResponse {
    data: HttpClientResponse["data"];
    headers: HttpClientResponse["headers"];
    correlationId?: HttpClientResponse["correlationId"];
}

export async function getJson(url: string, { retryCount, ...options }: ApiClientOptions = {}): Promise<ApiClientGetJsonResponse> {
    const { headers, ...requestOptions } = createRequestOptions(options, {
        "Content-Type": "application/json"
    });

    const executor = (retryHeaders: HeadersInit = {}) => httpGet(url, {
        ...requestOptions,
        headers: {
            ...retryHeaders,
            ...headers
        }
    });

    const response = await executeRequest(executor, retryCount);

    return {
        data: response.data,
        headers: response.headers,
        correlationId: response.correlationId
    };
}

export interface ApiClientGetBlobResponse {
    data: Blob;
    headers: HttpClientResponse["headers"];
    correlationId?: HttpClientResponse["correlationId"];
}

export async function getBlob(url: string, { retryCount, ...options }: ApiClientOptions = {}): Promise<ApiClientGetBlobResponse> {
    const { headers, ...requestOptions } = createRequestOptions(options, {
        "Content-Type": "blob"
    });

    const executor = (retryHeaders: HeadersInit = {}) => httpGet(url, {
        ...requestOptions,
        headers: {
            ...retryHeaders,
            ...headers
        }
    });

    const response = await executeRequest(executor, retryCount);

    return {
        data: response.data as Blob,
        headers: response.headers,
        correlationId: response.correlationId
    };
}

export interface ApiClientPostJsonResponse {
    data: HttpClientResponse["data"];
    headers: HttpClientResponse["headers"];
    correlationId?: HttpClientResponse["correlationId"];
}

export async function postJson(url: string, data?: unknown, { retryCount, ...options }: ApiClientOptions = {}): Promise<ApiClientPostJsonResponse> {
    const { headers, ...requestOptions } = createRequestOptions(options, {
        "Content-Type": "application/json"
    });

    const jsonData = data ? JSON.stringify(data) : undefined;

    const executor = (retryHeaders: HeadersInit = {}) => httpPost(url, jsonData, {
        ...requestOptions,
        headers: {
            ...retryHeaders,
            ...headers
        }
    });

    const response = await executeRequest(executor, retryCount);

    return {
        data: response.data,
        headers: response.headers,
        correlationId: response.correlationId
    };
}

export async function uploadFile(url: string, data: FormData, { retryCount, ...options }: ApiClientOptions = {}): Promise<ApiClientPostJsonResponse> {
    const { headers, ...requestOptions } = createRequestOptions(options);

    const executor = (retryHeaders: HeadersInit = {}) => httpPost(url, data, {
        ...requestOptions,
        headers: {
            ...retryHeaders,
            ...headers
        }
    });

    const response = await executeRequest(executor, retryCount);

    return {
        data: response.data,
        headers: response.headers,
        correlationId: response.correlationId
    };
}