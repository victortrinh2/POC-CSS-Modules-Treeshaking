import { AddIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Lozenge, Text, TextLink } from "@workleap/orbiter-ui";
import { PageActions } from "./PageActions.tsx";
import { PageContainer } from "./PageContainer.tsx";
import { PageHeader } from "./PageHeader.tsx";
import { PageTitle } from "./PageTitle.tsx";

const meta = {
    component: PageHeader,
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
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <PageTitle>Page Title</PageTitle>
        ]
    }
};

export const WithActions: Story = {
    args: {
        children: [
            <PageTitle>Page Title</PageTitle>,
            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};

export const WithOverflow: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
             consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
             luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
             scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
             vehicula risus.</Text>
            </PageTitle>,
            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};

export const WithOverflowAndIcon: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
             consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
             luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
             scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
             vehicula risus.</Text>
                <AddIcon />
            </PageTitle>,
            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};

export const WithOverflowAndLozenge: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
             consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
             luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
             scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
             vehicula risus.</Text>
                <Lozenge>New</Lozenge>
            </PageTitle>,

            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};

export const WithOverflowAndIconAndLozenge: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
             consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
             luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
             scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
             vehicula risus.</Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
            </PageTitle>,
            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};

export const WithOverflowAndIconAndLozengeAndDescription: Story = {
    args: {
        children: [
            <PageTitle>
                <Text>Page Title followed by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mi non ex
             consectetur consectetur ac sit amet massa. Mauris interdum massa et feugiat imperdiet. Ut vel risus id est
             luctus accumsan. In egestas magna in lorem euismod ultrices. Integer elit ante, tempus id cursus a,
             scelerisque eget sem. Ut convallis massa convallis odio lobortis, quis congue nisl feugiat. Morbi et
             vehicula risus.</Text>
                <Lozenge>New</Lozenge>
                <AddIcon />
                <Text slot="description">
                    Segments allow you to get data from your organization members, regardless of their teams. {" "}
                    <TextLink
                        href="https://help.officevibe.com/hc/en-us/articles/360042491212-Officevibe-Team-Segmentation"
                        variant="accent"
                    >How to build segments</TextLink>
                </Text>
            </PageTitle>,
            <PageActions>
                <Button variant="secondary">Deactivate User</Button>
                <Button variant="negative">Delete User</Button>
            </PageActions>
        ]
    }
};
