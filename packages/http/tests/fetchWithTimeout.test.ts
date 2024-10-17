import { fetchWithTimeout } from "../src/fetchWithTimeout.ts";
import { sleep } from "../src/sleep.ts";

let fetchMock: jest.Mock;

beforeEach(() => {
    // eslint-disable-next-line jest/prefer-spy-on
    fetchMock = global.fetch = jest.fn();
});

afterEach(() => {
    fetchMock.mockClear();
});

test("when no timeout delay is specified and the request succeeded, return the data", async () => {
    const data = { foo: "bar" };

    fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(data)
    });

    const response = await fetchWithTimeout("/foo");

    expect(response.ok).toBeTruthy();
    expect(await response.json()).toBe(data);
});

test("when a timeout delay is specified, abort the signal when the delay has expired", async () => {
    let timeoutSignal: AbortSignal;

    fetchMock.mockImplementationOnce((url: RequestInfo, options: RequestInit) => {
        timeoutSignal = options.signal!;

        return new Promise(() => {});
    });

    fetchWithTimeout("/foo", {
        timeoutInMs: 2
    });

    expect(timeoutSignal!.aborted).toBeFalsy();

    await sleep(5);

    expect(timeoutSignal!.aborted).toBeTruthy();
});

test("when a timeout delay is specified and the request succeeded, do not abort the signal", async () => {
    let timeoutSignal: AbortSignal;

    fetchMock.mockImplementationOnce(async (url: RequestInfo, options: RequestInit) => {
        timeoutSignal = options.signal!;

        await sleep(5);

        return {
            ok: true
        };
    });

    const response = await fetchWithTimeout("/foo", {
        timeoutInMs: 2000
    });

    expect(timeoutSignal!.aborted).toBeFalsy();
    expect(response.ok).toBeTruthy();
});

test("when a timeout delay is specified and the request failed, do not abort the signal", async () => {
    let timeoutSignal: AbortSignal;

    fetchMock.mockImplementationOnce(async (url: RequestInfo, options: RequestInit) => {
        timeoutSignal = options.signal!;

        await sleep(5);

        return Promise.resolve({
            ok: false
        });
    });

    const response = await fetchWithTimeout("/foo", {
        timeoutInMs: 2000
    });

    expect(timeoutSignal!.aborted).toBeFalsy();
    expect(response.ok).toBeFalsy();
});

test("when a timeout delay is specified and a signal is provided, abort the signal when the delay has expired", async () => {
    let timeoutSignal: AbortSignal;

    fetchMock.mockImplementationOnce((url: RequestInfo, options: RequestInit) => {
        timeoutSignal = options.signal!;

        return new Promise(() => {});
    });

    fetchWithTimeout("/foo", {
        timeoutInMs: 2,
        signal: new AbortController().signal
    });

    expect(timeoutSignal!.aborted).toBeFalsy();

    await sleep(5);

    expect(timeoutSignal!.aborted).toBeTruthy();
});

test("when a timeout delay is specified and a signal is provided, abort the signal when the provided signal is aborted", async () => {
    let timeoutSignal: AbortSignal;

    fetchMock.mockImplementationOnce((url: RequestInfo, options: RequestInit) => {
        timeoutSignal = options.signal!;

        return new Promise(() => {});
    });

    const abortController = new AbortController();

    fetchWithTimeout("/foo", {
        timeoutInMs: 2000,
        signal: abortController.signal
    });

    expect(timeoutSignal!.aborted).toBeFalsy();

    abortController.abort();

    expect(timeoutSignal!.aborted).toBeTruthy();
});
