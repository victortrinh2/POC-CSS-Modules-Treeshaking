import { useCurrentLanguage as useSquideCurrentLanguage } from "@squide/i18next";
import type { LanguageKey } from "./languageKey.ts";

export function useCurrentLanguage() {
    return useSquideCurrentLanguage() as LanguageKey;
}
