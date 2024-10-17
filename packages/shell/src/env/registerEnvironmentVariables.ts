import type { ApplicationRuntime, Environment } from "@poc-css/federation-runtime";

export interface ShellEnvironmentVariables {
    authenticationApiBaseUrl: string;
    navigationApiBaseUrl: string;
    loginPageUrl: string;
    logoutPageUrl: string;
}

const MswEnvironmentVariables: ShellEnvironmentVariables = {
    authenticationApiBaseUrl: "/api/auth/",
    navigationApiBaseUrl: "/api/shell/navigation/",
    loginPageUrl: "/login",
    logoutPageUrl: "/logout"
};

const LocalEnvironmentVariables: ShellEnvironmentVariables = {
    authenticationApiBaseUrl: "https://api.platform.workleap-dev.com/authentication/",
    navigationApiBaseUrl: "https://api.platform.workleap-dev.com/shell/navigation/",
    loginPageUrl: "https://login.workleap-dev.com",
    logoutPageUrl: "https://auth.workleap-dev.com/oauth2/logout?client_id=0408fee3-2d6a-447a-a891-6cddac77f2f9"
};

const DevelopmentEnvironmentVariables: ShellEnvironmentVariables = {
    authenticationApiBaseUrl: "https://api.platform.workleap-dev.com/authentication/",
    navigationApiBaseUrl: "https://api.platform.workleap-dev.com/shell/navigation/",
    loginPageUrl: "https://login.workleap-dev.com",
    logoutPageUrl: "https://auth.workleap-dev.com/oauth2/logout?client_id=5ccbd958-99da-4546-8ad2-cae32911af67"
};

const StagingEnvironmentVariables: ShellEnvironmentVariables = {
    authenticationApiBaseUrl: "https://api.platform.workleap-stg.com/authentication/",
    navigationApiBaseUrl: "https://api.platform.workleap-stg.com/shell/navigation/",
    loginPageUrl: "https://login.workleap-stg.com/",
    logoutPageUrl: "https://auth.workleap-stg.com/oauth2/logout?client_id=c042f3d3-c7a3-4c65-bbfa-e3d58b459d79"
};

const ProductionEnvironmentVariables: ShellEnvironmentVariables = {
    authenticationApiBaseUrl: "https://api.platform.workleap.com/authentication/",
    navigationApiBaseUrl: "https://api.platform.workleap.com/shell/navigation/",
    loginPageUrl: "https://login.workleap.com/",
    logoutPageUrl: "https://auth.workleap.com/oauth2/logout?client_id=db0c69d2-1d49-4a6a-af86-7fc3feb96cac"
};

function getEnvironmentVariables(env: Environment): ShellEnvironmentVariables {
    switch (env) {
        case "msw": {
            return MswEnvironmentVariables;
        }
        case "local": {
            return LocalEnvironmentVariables;
        }
        case "development": {
            return DevelopmentEnvironmentVariables;
        }
        case "staging": {
            return StagingEnvironmentVariables;
        }
        case "production": {
            return ProductionEnvironmentVariables;
        }
        default: {
            throw new Error(`[shell] Unknown environment "${env}".`);
        }
    }
}

export function registerEnvironmentVariables(runtime: ApplicationRuntime) {
    const variables = getEnvironmentVariables(runtime.environment);

    runtime.registerEnvironmentVariables(variables);
}
