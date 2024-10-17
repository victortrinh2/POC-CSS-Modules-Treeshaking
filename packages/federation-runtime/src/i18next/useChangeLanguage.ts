import { useChangeLanguage as useSquideChangeLanguage } from "@squide/i18next";
import type { LanguageKey } from "./languageKey.ts";

export const useChangeLanguage = useSquideChangeLanguage<LanguageKey>;
