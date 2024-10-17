import { TextLink, as } from "@workleap/orbiter-ui";
import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

export const RouterTextLink = as(TextLink, Link, { normalizeStyles: true });

export type RouterTextLinkProps = ComponentProps<typeof RouterTextLink>;
