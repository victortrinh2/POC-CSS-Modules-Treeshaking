// eslint-disable-next-line no-restricted-imports
import { I18nextNavigationItemLabel as SquideI18nextNavigationItemLabel, useI18nextInstance, type I18nextNavigationItemLabelProps as BaseI18nextNavigationItemLabelProps } from "@poc-css/federation-runtime";
import type { i18n } from "i18next";
import { i18nextInstanceKey } from "./i18next.ts";

export interface I18nextNavigationItemLabelProps extends Omit<BaseI18nextNavigationItemLabelProps, "i18next"> {
    i18next?: i18n;
}

export function I18nextNavigationItemLabel({ i18next, ...props }: I18nextNavigationItemLabelProps) {
    const i18nextInstance = useI18nextInstance(i18nextInstanceKey);

    return (
        <SquideI18nextNavigationItemLabel
            i18next={i18next ?? i18nextInstance}
            {...props}
        />
    );
}
