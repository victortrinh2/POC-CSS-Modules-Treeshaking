import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientDefaultOptions } from "@poc-css/http";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
    defaultOptions: QueryClientDefaultOptions
});

export function QueryProviders({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.ISOLATED && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}

