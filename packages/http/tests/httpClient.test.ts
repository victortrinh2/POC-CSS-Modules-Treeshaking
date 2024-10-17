import { HttpClientErrorReasons, httpGet, httpPost, type HttpClientOptions, type HttpClientResponse } from "../src/httpClient.ts";

class FakeError {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

let fetchMock: jest.Mock;

beforeEach(() => {
    // eslint-disable-next-line jest/prefer-spy-on
    fetchMock = global.fetch = jest.fn();
});

afterEach(() => {
    fetchMock.mockClear();
});

describe("httpGet", () => {
    test("when the request succeeded, response.ok is true", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers(),
            text: () => Promise.resolve("")
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeTruthy();
    });

    test("when the request succeeded and the response content-type is \"application/json\", parse the data", async () => {
        const data = { foo: "bar" };

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers({
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(data).length.toString()
            }),
            text: () => Promise.resolve(JSON.stringify(data))
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeTruthy();
        expect(response.data).toEqual(data);
        expect(response.contentType).toBe("application/json");
        expect(response.contentLength).toBe(JSON.stringify(data).length);
    });

    test("when the request succeeded and the response content-type is \"application/json; charset=utf-8\", parse the data", async () => {
        const data = { foo: "bar" };

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers({
                "Content-Type": "application/json; charset=utf-8",
                "Content-Length": JSON.stringify(data).length.toString()
            }),
            text: () => Promise.resolve(JSON.stringify(data))
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeTruthy();
        expect(response.data).toEqual(data);
        expect(response.contentType).toBe("application/json; charset=utf-8");
        expect(response.contentLength).toBe(JSON.stringify(data).length);
    });

    test("when the request succeeded and the request is a blob, parse the blob", async () => {
        const BlobSize = 1024;

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers({
                "Content-Type": "application/pdf",
                "Content-Length": BlobSize.toString()
            }),
            blob: () => Promise.resolve(new Blob(["fake-pdf"], { type: "application/pdf" }))
        });

        const response = await httpGet("/foo", {
            headers: {
                "Content-Type": "blob"
            }
        });

        expect(response.ok).toBeTruthy();
        expect(await (response.data as Blob).text()).toBe("fake-pdf");
        expect((response.data as Blob).type).toBe("application/pdf");
        expect(response.contentType).toBe("application/pdf");
        expect(response.contentLength).toBe(BlobSize);
    });

    test("when the request succeeded and the response content-type is not \"application/json\", return the raw data", async () => {
        const content = "bar";

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers({
                "Content-Type": "foo",
                "Content-Length": content.length.toString()
            }),
            text: () => Promise.resolve(content)
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeTruthy();
        expect(response.data).toEqual(content);
        expect(response.contentType).toBe("foo");
        expect(response.contentLength).toBe(content.length);
    });

    test("when the request succeeded and the response has no content-type, do not parse the response", async () => {
        const content = "bar";

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers(),
            text: () => Promise.resolve(content)
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeTruthy();
        expect(response.data).toBeUndefined();
        expect(response.contentType).toBeUndefined();
        expect(response.contentLength).toBeUndefined();
    });

    test("when the request succeeded and the response data is malformed JSON, return an error", async () => {
        const data = "{ foo:";

        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers({
                "Content-Type": "application/json",
                "Content-Length": data.length.toString()
            }),
            text: () => Promise.resolve(data)
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error?.reason).toBe(HttpClientErrorReasons.malformedJson);
        expect(response.error?.status).toBeUndefined();
        expect(response.error?.statusText).toBeUndefined();
        expect(response.data).toEqual(data);
        expect(response.contentType).toBe("application/json");
        expect(response.contentLength).toBe(data.length);
    });

    test("when the request failed, response.ok is false", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            headers: new Headers(),
            text: () => Promise.resolve("")
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
    });

    test("when the server returns a 400 for a blob request and the response content-type is \"application/json\", parse the data", async () => {
        const data = { foo: "bar" };

        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 400,
            headers: new Headers({
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(data).length.toString()
            }),
            text: () => Promise.resolve(JSON.stringify(data))
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
        expect(response.error?.status).toBe(400);
        expect(response.error?.statusText).toBeUndefined();
        expect(response.data).toEqual(data);
        expect(response.contentType).toBe("application/json");
        expect(response.contentLength).toBe(JSON.stringify(data).length);
        expect(await response.error?.getResponseContent()).toEqual(data);
    });

    test("when the server returns a 400 for a blob request and the response content-type is \"application/json; charset=utf-8\", parse the data", async () => {
        const data = { foo: "bar" };

        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 400,
            headers: new Headers({
                "Content-Type": "application/json; charset=utf-8",
                "Content-Length": JSON.stringify(data).length.toString()
            }),
            text: () => Promise.resolve(JSON.stringify(data))
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
        expect(response.error?.status).toBe(400);
        expect(response.error?.statusText).toBeUndefined();
        expect(response.data).toEqual(data);
        expect(response.contentType).toBe("application/json; charset=utf-8");
        expect(response.contentLength).toBe(JSON.stringify(data).length);
        expect(await response.error?.getResponseContent()).toEqual(data);
    });

    test("when the server returns a 400 for a blob request and the response data is not JSON, parse the data", async () => {
        const content = "bar";

        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 400,
            headers: new Headers({
                "Content-Type": "foo",
                "Content-Length": content.length.toString()
            }),
            text: () => Promise.resolve(content)
        });

        const response = await httpGet("/foo");

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
        expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
        expect(response.error?.status).toBe(400);
        expect(response.error?.statusText).toBeUndefined();
        expect(response.data).toEqual(content);
        expect(response.contentType).toBe("foo");
        expect(response.contentLength).toBe(content.length);
        expect(await response.error?.getResponseContent()).toEqual(content);
    });
});

describe("httpPost", () => {
    test("when the request succeeded, response.ok is true", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            headers: new Headers(),
            text: () => Promise.resolve("")
        });

        const response = await httpPost("/foo", JSON.stringify({ bar: "bar" }));

        expect(response.ok).toBeTruthy();
    });

    test("when the request failed, response.ok is false", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            headers: new Headers(),
            text: () => Promise.resolve("")
        });

        const response = await httpPost("/foo", JSON.stringify({ bar: "bar" }));

        expect(response.ok).toBeFalsy();
        expect(response.error).toBeDefined();
    });
});

interface TestSetup {
    section: string;
    executor: (options?: HttpClientOptions) => Promise<HttpClientResponse>;
}

const TestSetups: TestSetup[] = [
    {
        section: "httpGet",
        executor: options => httpGet("/foo", options)
    },
    {
        section: "httpPost",
        executor: options => httpPost("/foo", JSON.stringify({ bar: "bar" }), options)
    }
];

TestSetups.forEach(({ section, executor }) => {
    // eslint-disable-next-line jest/valid-title
    describe(section, () => {
        test("when a correlation id is provided and the request succeeded, include the correlation id in the response", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: true,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor({
                correlationId: "1"
            });

            expect(response.ok).toBeTruthy();
            expect(response.correlationId).toBe("1");
        });

        test("when a correlation id is provided and the request failed, include the correlation id in the response", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor({
                correlationId: "1"
            });

            expect(response.ok).toBeFalsy();
            expect(response.correlationId).toBe("1");
        });

        test("when a request is timeout, return an error", async () => {
            fetchMock.mockImplementationOnce(() => {
                throw new FakeError("TimeoutError");
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.timeout);
            expect(response.error?.status).toBeUndefined();
            expect(response.error?.statusText).toBeUndefined();
            expect(await response.error?.getResponseContent()).toBeUndefined();
        });

        test("when a request is aborted, return an error", async () => {
            fetchMock.mockImplementationOnce(() => {
                throw new FakeError("AbortError");
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.aborted);
            expect(response.error?.status).toBeUndefined();
            expect(response.error?.statusText).toBeUndefined();
            expect(await response.error?.getResponseContent()).toBeUndefined();
        });

        test("when the server returns a 400, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 400,
                headers: new Headers(),
                text: () => Promise.resolve("bar")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
            expect(response.error?.status).toBe(400);
            expect(response.data).toBeUndefined();
            expect(await response.error?.getResponseContent()).toBeUndefined();
        });

        test("when the server returns a 400 and the response content-type is \"application/json\", parse the data", async () => {
            const data = { foo: "bar" };

            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 400,
                headers: new Headers({
                    "content-type": "application/json",
                    "content-length": JSON.stringify(data).length.toString()
                }),
                text: () => Promise.resolve(JSON.stringify(data))
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
            expect(response.error?.status).toBe(400);
            expect(response.data).toEqual(data);
            expect(response.contentType).toBe("application/json");
            expect(response.contentLength).toBe(JSON.stringify(data).length);
            expect(await response.error?.getResponseContent()).toEqual(data);
        });

        test("when the server returns a 400 and the response content-type is \"application/json; charset=utf-8\", parse the data", async () => {
            const data = { foo: "bar" };

            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 400,
                headers: new Headers({
                    "content-type": "application/json; charset=utf-8",
                    "content-length": JSON.stringify(data).length.toString()
                }),
                text: () => Promise.resolve(JSON.stringify(data))
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
            expect(response.error?.status).toBe(400);
            expect(response.data).toEqual(data);
            expect(response.contentType).toBe("application/json; charset=utf-8");
            expect(response.contentLength).toBe(JSON.stringify(data).length);
            expect(await response.error?.getResponseContent()).toEqual(data);
        });

        test("when the server returns a 400 and the response data is unknown, return the raw data", async () => {
            const data = "bar";

            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 400,
                headers: new Headers({
                    "Content-Type": "foo",
                    "Content-Length": data.length.toString()
                }),
                text: () => Promise.resolve(data)
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.badRequest);
            expect(response.error?.status).toBe(400);
            expect(response.data).toEqual(data);
            expect(response.contentType).toBe("foo");
            expect(response.contentLength).toBe(data.length);
            expect(await response.error?.getResponseContent()).toBe(data);
        });

        test("when the server returns a 401, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.unauthorized);
            expect(response.error?.status).toBe(401);
        });

        test("when the server returns a 403, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 403,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.forbidden);
            expect(response.error?.status).toBe(403);
        });

        test("when the server returns a 404, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 404,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.notFound);
            expect(response.error?.status).toBe(404);
        });

        test("when the server returns a 409, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 409,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.concurrencyError);
            expect(response.error?.status).toBe(409);
        });

        test("when the server returns a 412, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 412,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.preconditionFailed);
            expect(response.error?.status).toBe(412);
        });

        test("when the server returns a 429, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 429,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.tooManyRequests);
            expect(response.error?.status).toBe(429);
        });

        test("when the server returns a 500, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 500,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.internalServerError);
            expect(response.error?.status).toBe(500);
        });

        test("when the server returns a 502, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 502,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.badGateway);
            expect(response.error?.status).toBe(502);
        });

        test("when the server returns a 503, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 503,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.serviceUnavailable);
            expect(response.error?.status).toBe(503);
        });

        test("when the server returns a 504, return an error", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 504,
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.gatewayTimeout);
            expect(response.error?.status).toBe(504);
        });

        test("when the server returns an unmanaged status code, return the status code", async () => {
            fetchMock.mockResolvedValueOnce({
                ok: false,
                status: 1234567,
                statusText: "1234567",
                headers: new Headers(),
                text: () => Promise.resolve("")
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBeUndefined();
            expect(response.error?.status).toBe(1234567);
            expect(response.error?.statusText).toBe("1234567");
        });

        test("when an unmanaged error is thrown, return a network error", async () => {
            fetchMock.mockImplementationOnce(() => {
                throw new Error("Unmanaged error");
            });

            const response = await executor();

            expect(response.ok).toBeFalsy();
            expect(response.error).toBeDefined();
            expect(response.error?.reason).toBe(HttpClientErrorReasons.networkError);
            expect(response.error?.status).toBeUndefined();
        });
    });
});
