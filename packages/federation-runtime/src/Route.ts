import type { IndexRoute as FireflyIndexRoute, NonIndexRoute as FireflyNonIndexRoute } from "@squide/firefly";

interface NonIndexRoute extends Omit<FireflyNonIndexRoute, "children"> {
    children?: Route[];
    $trackingName?: string;
}

interface IndexRoute extends FireflyIndexRoute {
    $trackingName?: string;
}

type Route = (IndexRoute | NonIndexRoute);

export { type IndexRoute, type NonIndexRoute, type Route };

