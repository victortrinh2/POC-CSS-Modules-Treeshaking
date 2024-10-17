import { RouterButtonAsLink, createLazySvgImage } from "@poc-css/components";
import { Content, Div, Heading, IllustratedMessage } from "@workleap/orbiter-ui";
import { ErrorLayout } from "./ErrorLayout.tsx";
import { useTranslation } from "./localization/useTranslation.ts";

export interface ForbiddenProps {
    variant?: "root" | "nested";
}

const ForbiddenIllustration = createLazySvgImage(() => import("./assets/ForbiddenIllustration.tsx"));

export function ForbiddenError({ variant = "root" }: ForbiddenProps) {
    const { t } = useTranslation("Forbidden");

    const buttonMarkup = variant === "root" ? (
        <Div marginTop={160}>
            <RouterButtonAsLink to="/" reloadDocument>{t("buttonText")}</RouterButtonAsLink>
        </Div>
    ) : undefined;

    return (
        <ErrorLayout variant={variant}>
            <IllustratedMessage>
                <ForbiddenIllustration aria-label={t("imageAriaLabel")} />
                <Heading>{t("title")}</Heading>
                <Content>{t("text")}</Content>
            </IllustratedMessage>
            {buttonMarkup}
        </ErrorLayout>
    );
}
