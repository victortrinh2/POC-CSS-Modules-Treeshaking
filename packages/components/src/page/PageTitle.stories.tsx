import { AddIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Lozenge, Tag, Text, TextLink } from "@workleap/orbiter-ui";
import { PageContainer } from "./PageContainer.tsx";
import { PageTitle } from "./PageTitle.tsx";

const meta = {
    component: PageTitle,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [
        Story => (
            <PageContainer paddingTop="8rem">
                <Story />
            </PageContainer>
        )
    ]
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <PageTitle>Page Title</PageTitle>
        ]
    }
};

export const WithDescription: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <Text slot="description">
                    Segments allow you to get data from your organization members, regardless of their teams. {" "}
                    <TextLink
                        href="https://help.officevibe.com/hc/en-us/articles/360042491212-Officevibe-Team-Segmentation"
                        variant="accent"
                    >How to build segments</TextLink>
                </Text>
            </PageTitle>
        ]
    }
};

export const WithIcon: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <AddIcon />
            </PageTitle>
        ]
    }
};

export const WithLozenge: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <Lozenge>New</Lozenge>
            </PageTitle>
        ]
    }
};

export const WithTag: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <Tag>Active</Tag>
            </PageTitle>
        ]
    }
};
export const WithIconAndLozenge: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
            </PageTitle>
        ]
    }
};

export const WithIconAndLozengeAndDescription: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title</Text>
                <AddIcon />
                <Lozenge>New</Lozenge>
                <Text slot="description">
                    Segments allow you to get data from your organization members, regardless of their teams. {" "}
                    <TextLink
                        href="https://help.officevibe.com/hc/en-us/articles/360042491212-Officevibe-Team-Segmentation"
                        variant="accent"
                    >How to build segments</TextLink>
                </Text>
            </PageTitle>
        ]
    }
};

const OverflowingTitle = `Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
    consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
    luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
    scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
    vehicula risus. Integer eu ultrices mauris. Proin augue quam, tincidunt ac cursus a, egestas in tellus.
    Pellentesque imperdiet cursus eros a commodo. Suspendisse id iaculis diam. Nam eu sem ligula.
    Aenean tincidunt imperdiet arcu quis commodo. Donec ullamcorper leo ac interdum bibendum. Quisque ut neque sed tellus dignissim egestas`;

export const WithOverflow: Story = {
    args: {
        children: [
            <PageTitle>{OverflowingTitle}</PageTitle>
        ]
    }
};

export const WithIconOverflow: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>{OverflowingTitle}</Text>
                <AddIcon />
            </PageTitle>
        ]
    }
};

export const withLozengeOverflow: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>{OverflowingTitle}</Text>
                <Lozenge>New</Lozenge>
            </PageTitle>
        ]
    }
};

export const WithLozengeAndIconOverflow: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>{OverflowingTitle}</Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
            </PageTitle>
        ]
    }
};

export const WithOverflowAndDescription: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>{OverflowingTitle}</Text>
                <Text slot="description">
                    Segments allow you to get data from your organization members, regardless of their teams. {" "}
                    <TextLink
                        href="https://help.officevibe.com/hc/en-us/articles/360042491212-Officevibe-Team-Segmentation"
                        variant="accent"
                    >How to build segments</TextLink>
                </Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
            </PageTitle>
        ]
    }
};

export const WithOverflowAndOverflowDescription: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>{OverflowingTitle}</Text>
                <Text slot="description">
                    {OverflowingTitle}{" "}
                    <TextLink
                        href="https://help.officevibe.com/hc/en-us/articles/360042491212-Officevibe-Team-Segmentation"
                        variant="accent"
                    >How to build segments</TextLink>
                </Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
            </PageTitle>
        ]
    }
};
