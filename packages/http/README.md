# `@poc-css/http`

## apiClient

This is a specialized HTTP client built on top of [httpClient](#httpclient) to fetch the Workleap Management Application JSON-RPC API endpoints. Whenever possible, you should use this client to fetch your API.

### Usage

Fetch JSON:

```ts
import { getJson, isApiError } from "@workleap-mgmt/http";

try {
    const response = await getJson("/foo");

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

Post JSON:

```ts
import { postJson, isApiError } from "@workleap-mgmt/http";

try {
    const response = await postJson("/foo", {
        bar: "bar"
    });

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

Fetch a Blob:

```ts
import { getBlob, isApiError } from "@workleap-mgmt/http";

try {
    const response = await getBlob("/foo");

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

Upload a file: 

```ts
import { uploadFile, isApiError } from "@workleap-mgmt/http";

const formData = new FormData();
formData.append("excelFile", AN_EXCEL_FILE);

try {
    const response = await uploadFile("/foo", formData);

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

Specify a timeout:

```ts
import { getJson, isApiError } from "@workleap-mgmt/http";

try {
    const response = await getJson("/foo", {
        timeoutInMs: 50
    });

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

Specify a retry count:

```ts
import { getJson, isApiError } from "@workleap-mgmt/http";

try {
    const response = await getJson("/foo", {
        retryCount: 3
    });

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        console.log("HTTP ERROR", error);
    }

    console.log("UNKNOWN ERROR", error);
}
```

With Tanstack Query:

```ts
import { getJson } from "@workleap-mgmt/http";

const result = useSuspenseQuery({
    queryKey: "/foo",
    queryFn: async () => {
        const response = await getJson("/foo");

        return response.data;
    }
});
```

## ApiError

The error structure thrown by `apiClient` whenever an error occurs while executing an HTTP request.

```ts
import { getJson, isApiError, type ApiError } from "@workleap-mgmt/http";

try {
    const response = await getJson("/foo");

    console.log("SUCCESS", response.data);
}
catch (error) {
    if (isApiError(error)) {
        const apiError = error as ApiError;

        console.log("HTTP ERROR", apiError.status, apiError.reason, apiError.description, apiError.getResponseContent(), apiError.data, apiError.headers, apiError.correlationId);
    }

    console.log("UNKNOWN ERROR", error);
}
```

## resolveApiUrl

Compose a `baseUrl` with a `path`. It is an alternative to the native [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) that supports a relative base URL.

### Usage

With an absolute base URL:

```ts
import { resolveApiUrl } from "@workleap-mgmt/http";

const url = resolveApiUrl("foo", "http://my-endpoint.com");
```

With a relative base URL:

```ts
import { resolveApiUrl } from "@workleap-mgmt/http";

const url = resolveApiUrl("foo", "/base");
```

## QueryClientDefaultOptions

Default options for a Tanstack Query [QueryClient]():

```ts
import { QueryClientDefaultOptions } from "@workleap-mgmt/http"; 

export const queryClient = new QueryClient({
    defaultOptions: QueryClientDefaultOptions
});
```

## httpClient

This is a generic low level HTTP client built on top of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which can be used to fetch internal or external endpoints.

### Usage

By default the content-type is `application/json`:

```ts
import { httpGet } from "@workleap-mgmt/http";

const response = await httpGet("/foo");

if (response.ok) {
    console.log("SUCCESS", response.data);
} else {
    console.log("FAILED", response.error);
}
```

Specify custom headers:

```ts
import { httpGet } from "@workleap-mgmt/http";

const response = await httpGet("/foo", {
    headers: {
        "Content-Type": "blob"
    }
});

if (response.ok) {
    console.log("SUCCESS", response.data);
} else {
    console.log("FAILED", response.error);
}
```

Specify a timeout:

```ts
import { httpGet } from "@workleap-mgmt/http";

const { ok, data, error } = await httpGet("/foo", {
    timeoutInMs: 50
});

if (ok) {
    console.log("SUCCESS", response.data);
} else {
    if (error.reason === "Aborted" || error.reason === "Timeout") {
        console.log("Aborted or Timeout");
    } else {
        console.log("FAILED", response.error);
    }
}
```

Post data:

```ts
import { httpPost } from "@workleap-mgmt/http";

const response = await httpPost("/foo", JSON.stringify({ bar: "bar" }));

if (response.ok) {
    console.log("SUCCESS", response.data);
} else {
    console.log("FAILED", response.error);
}
```

Other functions are also available: `httpPut`, `httpPatch`, `httpDelete`.
