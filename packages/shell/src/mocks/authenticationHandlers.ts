import type { EnvironmentVariables } from "@poc-css/federation-runtime";
import { resolveApiUrl } from "@poc-css/http";
import { MswProducts, sessionManager, type MswCredentials, type MswLogin } from "@poc-css/msw";
import { HttpResponse, http, type HttpHandler } from "msw";

const Logins: MswLogin[] = [
    {
        credentials: {
            username: "en",
            password: "en"
        },
        memberContext: {
            memberId: "9f4d51a5-577b-4700-aa87-7792a0908608",
            organizationId: Math.random().toString(),
            email: "napoleon@kennion.com",
            displayName: "Napoleon Kennion",
            isExecutiveManager: false,
            isTeamManager: false,
            isCollaborator: false,
            isOrganizationAdmin: true,
            isReportingManager: false,
            preferredLanguages: ["en-US"],
            timeZone: "UTC"
        },
        memberData: {
            displayName: "Napoleon Kennion",
            lastName: "Kennion",
            state: "Active"
        },
        assignedProducts: [MswProducts.wov, MswProducts.onb, MswProducts.wsg],
        unassignedProducts: [MswProducts.lms, MswProducts.sks]
    },
    {
        credentials: {
            username: "fr",
            password: "fr"
        },
        memberContext: {
            memberId: "684baee1-cb69-4309-97a8-f64aea464731",
            organizationId: Math.random().toString(),
            email: "nicolas@bourbaki.com",
            displayName: "Nicolas Bourbaki",
            isExecutiveManager: false,
            isTeamManager: false,
            isCollaborator: false,
            isOrganizationAdmin: true,
            isReportingManager: false,
            preferredLanguages: ["fr-CA"],
            timeZone: "UTC"
        },
        memberData: {
            displayName: "Nicolas Bourbaki",
            lastName: "Bourbaki",
            state: "Active"
        },
        assignedProducts: [MswProducts.wov, MswProducts.onb, MswProducts.wsg],
        unassignedProducts: [MswProducts.lms, MswProducts.sks]
    }
];

export interface GetAuthenticationHandlersOptions {
    additionalLogins?: MswLogin[];
}

// Must specify the return type, otherwise we get a TS2742: The inferred type cannot be named without a reference to X. This is likely not portable.
// A type annotation is necessary.
export function getAuthenticationHandlers(environmentVariables: EnvironmentVariables, { additionalLogins = [] }: GetAuthenticationHandlersOptions = {}): HttpHandler[] {
    const augmentedLogins = [...Logins, ...additionalLogins];

    return [
        http.post(resolveApiUrl("login", environmentVariables.authenticationApiBaseUrl), async ({ request }) => {
            const { username, password } = await request.json() as MswCredentials;

            const match = augmentedLogins.find(x => {
                return x.credentials.username === username && x.credentials.password === password;
            });

            if (!match) {
                return new HttpResponse(null, {
                    status: 401
                });
            }

            sessionManager.setSession({
                memberContext: match.memberContext,
                memberData: match.memberData,
                assignedProducts: match.assignedProducts,
                unassignedProducts: match.unassignedProducts
            });

            return new HttpResponse(null, {
                status: 200
            });
        }),

        http.post(resolveApiUrl("cookies/flush", environmentVariables.authenticationApiBaseUrl), () => {
            sessionManager.clearSession();

            return new HttpResponse(null, {
                status: 200
            });
        }),

        http.post(resolveApiUrl("logout", environmentVariables.authenticationApiBaseUrl), () => {
            sessionManager.clearSession();

            return new HttpResponse(null, {
                status: 200
            });
        }),

        http.get(resolveApiUrl("oauth2/url/logout", environmentVariables.authenticationApiBaseUrl), () => {
            return new HttpResponse(environmentVariables.logoutPageUrl, {
                status: 200
            });
        })
    ];
}
