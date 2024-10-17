import type { ModuleRegisterFunction } from "@poc-css/federation-runtime";
import { Navigate } from "react-router-dom";
import { initI18next } from "./localization/i18next.ts";

export const registerLocalModule: ModuleRegisterFunction = async runtime => {
    await initI18next(runtime, runtime.mode === "development" ? { debug : true } : undefined);

    runtime.registerRoute({
        index: true,
        element: <Navigate to="/app" replace />
    });
};
