import { RouterTextLink, createLazySvgImage } from "@poc-css/components";
import { Content, Heading, IllustratedMessage, Paragraph, TextLink } from "@workleap/orbiter-ui";
import { ErrorLayout } from "./ErrorLayout.tsx";
import { Trans } from "./localization/Trans.tsx";
import { useTranslation } from "./localization/useTranslation.ts";

const NotFoundIllustration = createLazySvgImage(() => import("./assets/NotFoundIllustration.tsx"));

export function NotFoundError() {
    const { t } = useTranslation("NotFound");

    return (
        <ErrorLayout>
            <IllustratedMessage>
                <NotFoundIllustration aria-label={t("imageAriaLabel")} />
                <Heading>{t("title")}</Heading>
                <Content as="div">
                    <Paragraph>
                        {t("line-1")}
                    </Paragraph>
                    <Paragraph>
                        <Trans
                            t={t}
                            i18nKey="line-2"
                            components={{
                                // The content will be added by the Trans component.
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                HomeLink: <RouterTextLink to="/" reloadDocument />,
                                // The content will be added by the Trans component.
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                // eslint-disable-next-line jsx-a11y/anchor-has-content
                                ContactLink: <TextLink href="https://workleap.com/get/support" />
                            }}
                        />
                    </Paragraph>
                </Content>
            </IllustratedMessage>
        </ErrorLayout>
    );
}
