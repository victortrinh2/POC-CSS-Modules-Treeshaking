import { PageLoader } from "@poc-css/components";
import { Div } from "@workleap/orbiter-ui";
import { Suspense, type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "./localization/useTranslation.ts";

export function RootLayout({ children = <Outlet /> }: PropsWithChildren) {
    const { t } = useTranslation("RootLayout");

    return (
        <Div min-width="100dvh" height="100dvh">
            <Suspense fallback={<PageLoader aria-label={t("loading")} />}>
                {children}
            </Suspense>
        </Div>
    );
}
