import { RouterButtonAsLink, createLazySvgImage } from "@poc-css/components";
import { Content, Div, Heading, IllustratedMessage } from "@workleap/orbiter-ui";
import { ErrorLayout } from "./ErrorLayout.tsx";
import { useTranslation } from "./localization/useTranslation.ts";

export interface InternalServerErrorProps {
    variant?: "root" | "nested";
}

const InternalServerErrorIllustration = createLazySvgImage(() => import("./assets/InternalServerErrorIllustration.tsx"));

export function InternalServerError({ variant = "root" }: InternalServerErrorProps) {
    const { t } = useTranslation("InternalServerError");

    const buttonMarkup = variant === "root" ? (
        <Div marginTop={160}>
            <RouterButtonAsLink to="/" reloadDocument>{t("buttonText")}</RouterButtonAsLink>
        </Div>
    ) : undefined;

    return (
        <ErrorLayout variant={variant}>
            <IllustratedMessage>
                <InternalServerErrorIllustration aria-label={t("imageAriaLabel")} />
                <Heading>{t("title")}</Heading>
                <Content>{t("text")}</Content>
            </IllustratedMessage>
            {buttonMarkup}
        </ErrorLayout>
    );
}
