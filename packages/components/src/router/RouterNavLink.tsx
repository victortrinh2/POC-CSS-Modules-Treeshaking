import { Link, as } from "@workleap/orbiter-ui";
import type { ComponentProps } from "react";
import { NavLink } from "react-router-dom";

export const RouterNavLink = as(Link, NavLink, { normalizeStyles: true });

export type RouterNavLinkProps = ComponentProps<typeof RouterNavLink>;
