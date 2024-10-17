// @ts-check

import { defineBuildConfig } from "@workleap/webpack-configs";
import { swcConfig } from "./swc.build.js";

const env = /** @type {"msw" | "local" | "staging" | "production"} */ (process.env.APP_ENV ?? "production");

const environmentVariables = {
    "APP_ENV": env
};

export default defineBuildConfig(swcConfig, {
    publicPath: "auto",
    environmentVariables
});
