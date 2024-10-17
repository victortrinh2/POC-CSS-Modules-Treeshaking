import type { Runtime } from "@squide/firefly";
import { i18nextPlugin as SquideI18nextPlugin, type i18nextPluginOptions } from "@squide/i18next";
import type { i18nextPlugin } from "./getI18nextPlugin.ts";
import type { LanguageKey } from "./languageKey.ts";

export function createI18nextPlugin(runtime: Runtime, options?: i18nextPluginOptions) {
    // For additional information, refer to: https://gsoft-inc.github.io/wl-squide/reference/i18next/i18nextplugin/.
    const plugin = new SquideI18nextPlugin<LanguageKey>(["en-US", "fr-CA"], "en-US", "language", options, runtime);

    // By default, detect user default language for anonymous pages.
    // If the user is authenticated, the language will be changed for the persisted user
    // preferred language once the session is loaded.
    plugin.detectUserLanguage();

    return plugin as i18nextPlugin;
}
