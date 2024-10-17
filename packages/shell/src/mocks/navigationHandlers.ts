import type { EnvironmentVariables } from "@poc-css/federation-runtime";
import { resolveApiUrl } from "@poc-css/http";
import { withSession } from "@poc-css/msw";
import type { HeaderData } from "@workleap-nav/react";
import { HttpResponse, http, type HttpHandler } from "msw";

// Must specify the return type, otherwise we get a TS2742: The inferred type cannot be named without a reference to X. This is likely not portable.
// A type annotation is necessary.
export function getNavigationHandlers(environmentVariables: EnvironmentVariables): HttpHandler[] {
    return [
        http.get(resolveApiUrl("getMemberContext", environmentVariables.navigationApiBaseUrl), withSession(async (_, session) => {
            return HttpResponse.json(session.memberContext);
        })),

        http.get(resolveApiUrl("header/data", environmentVariables.navigationApiBaseUrl), withSession((_, session) => {
            return HttpResponse.json<HeaderData>({
                userInfo: {
                    avatarUrl: "https://avatars.githubusercontent.com/u/64637271",
                    name: session.memberContext.displayName,
                    canEditProfile: true
                },
                products: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    assignedProducts: session.assignedProducts,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    unassignedProducts: session.unassignedProducts
                },
                organizations: [{
                    id: "1",
                    displayName: "Workleap",
                    image: null,
                    isCurrentOrganization: true
                }, {
                    id: "2",
                    displayName: "ShareGate",
                    image: null,
                    isCurrentOrganization: false
                }]
            });
        })),

        http.post(resolveApiUrl("header/setOrganization", environmentVariables.navigationApiBaseUrl), () => {
            return new HttpResponse(null, { status: 200 });
        })
    ];
}
