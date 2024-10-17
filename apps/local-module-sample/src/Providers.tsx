import { useCurrentLanguage, type LanguageKey } from "@poc-css/federation-runtime";
import { ThemeProvider, type ColorSchemeOrSystem } from "@workleap/orbiter-ui";
import type { PropsWithChildren, ReactNode } from "react";
import { I18nProvider as ReactAriaI18nProvider, RouterProvider } from "react-aria-components";
import { useNavigate } from "react-router-dom";
import { QueryProviders } from "./QueryProviders.tsx";

interface ProvidersProps {
    locale: LanguageKey;
    colorScheme: ColorSchemeOrSystem;
    children: ReactNode;
}

// FIX: Since you are going for a micro-frontends app composed at build time, I would register all the providers
// at the root of the application. If you eventually promote a module as a remote module, then you could re-consider.
export function Providers({ locale, colorScheme, children }: ProvidersProps) {
    const navigate = useNavigate();

    return (
        <RouterProvider navigate={navigate}>
            <QueryProviders>
                <ThemeProvider colorScheme={colorScheme} height="100%">
                    <ReactAriaI18nProvider locale={locale}>
                        {children}
                    </ReactAriaI18nProvider>
                </ThemeProvider>
            </QueryProviders>
        </RouterProvider>
    );
}

export function RouteProviders({ children }: PropsWithChildren) {
    const currentLanguage = useCurrentLanguage();

    return (
        <Providers locale={currentLanguage} colorScheme="light">
            {children}
        </Providers>
    );
}
