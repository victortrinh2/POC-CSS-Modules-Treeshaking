/* eslint-disable max-len */

import type { EnvironmentVariables } from "@poc-css/federation-runtime";
import { resolveApiUrl } from "@poc-css/http";
import { withSession } from "@poc-css/msw";
import { HttpResponse, http, type HttpHandler } from "msw";

export function getRickAndMortyHandlers(environmentVariables: EnvironmentVariables): HttpHandler[] {
    return [
        http.get(resolveApiUrl("episode/1,2,3,4", environmentVariables.rickAndMortyApiUrl), withSession((_, session) => {
            const isEn = session.memberContext.preferredLanguages[0] === "en-US";

            return HttpResponse.json([{
                "id": 1,
                "name": isEn ? "Pilot" : "De la graine de héros",
                "episode": "S01 E01"
            }, {
                "id": 2,
                "name": isEn ? "Lawnmower Dog" : "I, Croquette",
                "episode": "S01 E02"
            }, {
                "id": 3,
                "name": isEn ? "Anatomy Park" : "Anatomy Park",
                "episode": "S01 E03"
            }, {
                "id": 4,
                "name": isEn ? "M. Night Shaym-Aliens!" : "M. Night Shaym-Aliens!",
                "episode": "S01 E04"
            }]);
        }))
    ];
}
