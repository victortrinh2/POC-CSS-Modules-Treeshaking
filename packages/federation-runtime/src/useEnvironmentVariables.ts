import { useRuntime } from "./RuntimeProvider.tsx";

export function useEnvironmentVariables() {
    const runtime = useRuntime();

    return runtime.environmentVariables;
}
