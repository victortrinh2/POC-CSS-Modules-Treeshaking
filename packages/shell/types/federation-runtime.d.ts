import "@poc-css/federation-runtime";
import type { ShellEnvironmentVariables } from "../src/env/registerEnvironmentVariables.ts";

declare module "@poc-css/federation-runtime" {
    interface EnvironmentVariables extends ShellEnvironmentVariables {}
}
