import { useRouteMatch as useFireflyRouteMatch, type UseRouteMatchOptions } from "@squide/firefly";
import type { Route } from "./Route.ts";

export function useRouteMatch(locationArg: Partial<Location>, options: UseRouteMatchOptions = {}) {
    const route = useFireflyRouteMatch(locationArg, options);

    return route as Route;
}
