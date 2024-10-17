// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.dev.js";

const env = /** @type {"msw" | "local" | "staging" | "production"} */ (process.env.APP_ENV ?? "local");

const environmentVariables = {
    "APP_ENV": env
};

export default defineDevConfig(swcConfig, {
    publicPath: "auto",
    environmentVariables
});
