import { useRoutes as useFireflyRoutes } from "@squide/firefly";
import type { Route } from "./Route.ts";

export function useRoutes() {
    const routes = useFireflyRoutes();

    return routes as Route[];
}
