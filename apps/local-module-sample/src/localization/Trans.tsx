import { useI18nextInstance } from "@poc-css/federation-runtime";
// eslint-disable-next-line no-restricted-imports
import { Trans as I18nextTrans } from "react-i18next";
import { i18nextInstanceKey } from "./i18next.ts";

export const Trans: typeof I18nextTrans = ({ i18n, ...props }) => {
    const i18nInstance = useI18nextInstance(i18nextInstanceKey);

    return (
        <I18nextTrans i18n={i18n ?? i18nInstance} {...props} />
    );
};
