import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientDefaultOptions } from "@poc-css/http";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
    defaultOptions: QueryClientDefaultOptions
});

export function QueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
