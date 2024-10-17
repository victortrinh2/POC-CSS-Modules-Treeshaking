import { createContext, useContext, type ReactNode } from "react";

const FeatureFlagsContext = createContext<string[]>([]);

export interface FeatureFlagProviderProps {
    featureFlags: string[];
    children: ReactNode;
}

export const FeatureFlagsProvider = FeatureFlagsContext.Provider;

export function useFeatureFlags() {
    const featureFlags = useContext(FeatureFlagsContext);

    return featureFlags;
}
