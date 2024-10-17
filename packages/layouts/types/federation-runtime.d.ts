import "@poc-css/federation-runtime";

// Duplicating the type from the shell. Remotes aren't supposed to know about the shell's types, but it's ok for layouts.
export interface ShellEnvironmentVariables {
    authenticationApiBaseUrl: string;
    navigationApiBaseUrl: string;
    loginPageUrl: string;
    logoutPageUrl: string;
    organizationManagementApiBaseUrl: string;
}

declare module "@poc-css/federation-runtime" {
    interface EnvironmentVariables extends ShellEnvironmentVariables {}
}
