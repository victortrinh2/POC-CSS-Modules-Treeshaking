import { HttpClientErrorReasons } from "../src/httpClient.ts";
import { sleep } from "../src/sleep.ts";
import { withRetry } from "../src/withRetry.ts";

test("when the request succeeded, return the response immediatly", async () => {
    const data = { foo: "bar" };

    const executor = jest.fn().mockResolvedValue({
        ok: true,
        data
    });

    const response = await withRetry(executor, 3, {
        retryDelayInMs: 1
    });

    expect(response.ok).toBeTruthy();
    expect(response.data).toBe(data);
    expect(executor).toHaveBeenCalledTimes(1);
});

test("when the request failed and the retry count is 1, retry once", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: "foo"
        }
    });

    const response = await withRetry(executor, 1, {
        retryDelayInMs: 1
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(2);
});

test("when the request failed and the retry count is 3, retry 3 times", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.forbidden
        }
    });

    const response = await withRetry(executor, 3, {
        retryDelayInMs: 1
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(4);
});

test("when the request failed because it's aborted and the retry count is 3, do not retry", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.aborted
        }
    });

    const response = await withRetry(executor, 3, {
        retryDelayInMs: 1
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(1);
});

test("when the request failed because of a timeout and the retry count is 3, do not retry", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.timeout
        }
    });

    const response = await withRetry(executor, 3, {
        retryDelayInMs: 1
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(1);
});

test("when the request failed, wait the specified delay before trying again", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.forbidden
        }
    });

    withRetry(executor, 1, {
        retryDelayInMs: 5
    });

    expect(executor).toHaveBeenCalledTimes(1);

    await sleep(6);

    expect(executor).toHaveBeenCalledTimes(2);
});

test("when retryDelayInMs is a function and returns a delay, retry the request after the specified delay elapsed", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.forbidden
        }
    });

    const response = await withRetry(executor, 1, {
        retryDelayInMs: () => {
            return 1;
        }
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(2);
});

test("when retryDelayInMs is a function and returns false, do not retry the request", async () => {
    const executor = jest.fn().mockResolvedValue({
        ok: false,
        error: {
            reason: HttpClientErrorReasons.forbidden
        }
    });

    const response = await withRetry(executor, 3, {
        retryDelayInMs: () => {
            return false;
        }
    });

    expect(response.ok).toBeFalsy();
    expect(executor).toHaveBeenCalledTimes(1);
});

test("when the executor throw an error, reject with the error", async () => {
    const error = new Error("Executor error");

    const executor = jest.fn().mockImplementation(() => {
        throw error;
    });

    await expect(withRetry(executor, 3, { retryDelayInMs: 1 })).rejects.toBe(error);
    expect(executor).toHaveBeenCalledTimes(1);
});
