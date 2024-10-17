import { useI18nextInstance } from "@poc-css/federation-runtime";
// eslint-disable-next-line no-restricted-imports
import { useTranslation as useI18nextTranslation } from "react-i18next";
import { i18nextInstanceKey } from "./i18next.ts";

export const useTranslation: typeof useI18nextTranslation = (namespace, options) => {
    const i18nextInstance = useI18nextInstance(i18nextInstanceKey);

    return useI18nextTranslation(namespace, {
        i18n: i18nextInstance,
        ...options
    });
};
