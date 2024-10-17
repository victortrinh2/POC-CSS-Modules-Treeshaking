import { getI18nextPlugin as baseGetI18nextPlugin, type i18nextPlugin as FireflyI18nextPlugin } from "@squide/i18next";
import type { ApplicationRuntime } from "../ApplicationRuntime.ts";
import type { LanguageKey } from "./languageKey.ts";

export type i18nextPlugin = FireflyI18nextPlugin<LanguageKey>;

export function getI18nextPlugin(runtime: ApplicationRuntime) {
    const plugin = baseGetI18nextPlugin(runtime);

    return plugin as i18nextPlugin;
}
