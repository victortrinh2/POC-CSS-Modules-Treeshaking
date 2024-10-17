import { ButtonAsLink, as, slot } from "@workleap/orbiter-ui";
import type { ComponentProps } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const RouterButtonAsLink = slot("button", as(ButtonAsLink, ReactRouterLink, { normalizeStyles: true }));

export type RouterButtonAsLinkProps = ComponentProps<typeof RouterButtonAsLink>;
