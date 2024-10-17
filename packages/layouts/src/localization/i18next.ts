import { createI18nextInstance, getI18nextPlugin, type ApplicationRuntime, type CreateI18nextInstanceOptions, type i18nextPlugin } from "@poc-css/federation-runtime";
import resourcesEnUs from "./en-US/resources.json";
import resourcesFrCa from "./fr-CA/resources.json";

export const i18nextInstanceKey = "poc-css-layouts";

export async function initI18next(runtime: ApplicationRuntime, options?: CreateI18nextInstanceOptions) {
    const i18nextPlugin = getI18nextPlugin(runtime);

    return createAndRegisterLayoutsI18nextInstance(i18nextPlugin, options);
}

export async function createAndRegisterLayoutsI18nextInstance(i18nextPlugin: i18nextPlugin, options: CreateI18nextInstanceOptions = {}) {
    const instance = await createI18nextInstance(i18nextPlugin.currentLanguage, {
        ...options,
        resources: {
            "en-US": resourcesEnUs,
            "fr-CA": resourcesFrCa
        }
    });

    i18nextPlugin.registerInstance(i18nextInstanceKey, instance);

    return instance;
}
