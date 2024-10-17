import { useSuspenseQuery } from "@tanstack/react-query";
import { Page, PageBreadcrumbs, PageContent, PageHeader, PageTitle } from "@poc-css/components";
import { useEnvironmentVariables } from "@poc-css/federation-runtime";
import { getJson, resolveApiUrl } from "@poc-css/http";
import { LI, Paragraph, UL } from "@workleap/orbiter-ui";
import { useTranslation } from "./localization/useTranslation.ts";

interface Episode {
    id: number;
    name: string;
    episode: string;
}

export function ConnectedEpisodesPage() {
    const environmentVariables = useEnvironmentVariables();

    const { data: episodes } = useSuspenseQuery({ queryKey: ["/api/episode/1,2,3,4"], queryFn: async () => {
        const response = await getJson(resolveApiUrl("episode/1,2,3,4", environmentVariables.rickAndMortyApiUrl));

        return response.data as Episode[];
    } });

    return <EpisodesPage episodes={episodes} />;
}

interface EpisodesPageProps {
    episodes: Episode[];
}

export function EpisodesPage({ episodes }: EpisodesPageProps) {
    const { t } = useTranslation("EpisodesPage");

    return (
        <Page>
            <PageBreadcrumbs links={[
                {
                    name: "Home",
                    link: "/"
                },
                {
                    name: "Episodes",
                    link: null
                }
            ]}
            />,
            <PageHeader>
                <PageTitle>{t("title")}</PageTitle>
            </PageHeader>,
            <PageContent>
                <Paragraph>{t("body")}</Paragraph>
                <Paragraph>{t("episodesText")}</Paragraph>
                <UL>
                    {episodes.map((x: Episode) => (
                        <LI key={x.id}>
                            <span>{t("idLabel")}: {x.id}</span>
                            <span> - </span>
                            <span>{t("nameLabel")}: {x.name}</span>
                            <span> - </span>
                            <span>{t("episodeLabel")}: {x.episode}</span>
                        </LI>
                    ))}
                </UL>
            </PageContent>
        </Page>
    );
}
