# `@poc-css/msw`

## Typings

Available typings are in the [src](./src) folder.

## sessionManager

A shared session manager is available. The session manager save & read the session from the user's browser local storage.

Read the session:

```ts
import { sessionManager } from "@workleap-mgmt/msw";

const session = sessionManager.getSession();
```

Save a session:

```ts
import { sessionManager } from "@workleap-mgmt/msw";

sessionManager.setSession({
    memberContext: match.memberContext,
    memberData: match.memberData,
    assignedProducts: match.assignedProducts,
    unassignedProducts: match.unassignedProducts
});
```

## withSession

Utility decorator to retrive the session form the user's browser local storage. If no session are available, a `401` will be returned automatically.

```ts
import { withSession } from "@workleap-mgmt/msw";

http.get("/foo", withSession(async (_, session) => {
    const memberContext = session.memberContext;

    return HttpResponse.json(memberContext);
})),
```
