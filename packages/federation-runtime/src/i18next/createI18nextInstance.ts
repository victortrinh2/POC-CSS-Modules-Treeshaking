import type { InitOptions } from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { LanguageKey } from "./languageKey.ts";

export type CreateI18nextInstanceOptions = Omit<InitOptions, "lng">;

export async function createI18nextInstance(language: LanguageKey, options: CreateI18nextInstanceOptions = {}) {
    const instance = i18n.createInstance()
        .use(initReactI18next);

    instance.init({
        ...options,
        lng: language
    });

    return instance;
}
