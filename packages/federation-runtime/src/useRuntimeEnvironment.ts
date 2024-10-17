import { useRuntime } from "./RuntimeProvider.tsx";

export function useRuntimeEnvironment() {
    const runtime = useRuntime();

    return runtime.environment;
}
