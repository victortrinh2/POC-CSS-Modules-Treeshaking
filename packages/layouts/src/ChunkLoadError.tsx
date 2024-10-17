import { RouterButtonAsLink, createLazySvgImage } from "@poc-css/components";
import { Button, Content, Flex, Heading, IllustratedMessage } from "@workleap/orbiter-ui";
import { useMemo } from "react";
import { ErrorLayout } from "./ErrorLayout.tsx";
import { useTranslation } from "./localization/useTranslation.ts";

export function isChunkLoadError(error: unknown): boolean {
    return error instanceof Error && error.name === "ChunkLoadError";
}

export interface ChunkLoadErrorProps {
    variant?: "root" | "nested";
}

function handleBackButton() {
    window.history.back();
}

const ChunkLoadErrorIllustration = createLazySvgImage(() => import("./assets/InternalServerErrorIllustration.tsx"));

export function ChunkLoadError({ variant = "root" }: ChunkLoadErrorProps) {
    const { t } = useTranslation("ChunkLoadError");

    const buttonMarkup = useMemo(() => (
        <Flex direction="row" justifyContent="center" gap={80} marginTop={160}>
            {(variant === "root" && window.history.length > 1) && <Button variant="secondary" onClick={handleBackButton}>{t("goBackButtonText")}</Button>}
            <RouterButtonAsLink to="/" reloadDocument>{t("reloadButtonText")}</RouterButtonAsLink>
        </Flex>
    ), [t, variant]);

    return (
        <ErrorLayout variant={variant}>
            <IllustratedMessage>
                <ChunkLoadErrorIllustration aria-label={t("imageAriaLabel")} />
                <Heading>{t("title")}</Heading>
                <Content>{t("text")}</Content>
            </IllustratedMessage>
            {buttonMarkup}
        </ErrorLayout>
    );
}
