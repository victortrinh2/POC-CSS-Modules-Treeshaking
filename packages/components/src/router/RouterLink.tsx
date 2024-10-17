import { Link, as } from "@workleap/orbiter-ui";
import type { ComponentProps } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const RouterLink = as(Link, ReactRouterLink, { normalizeStyles: true });

export type RouterLinkProps = ComponentProps<typeof RouterLink>;
