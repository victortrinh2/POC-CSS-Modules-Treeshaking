import type { Meta, StoryObj } from "@storybook/react";
import { EpisodesPage } from "./EpisodesPage.tsx";

const meta = {
    component: EpisodesPage,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof EpisodesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "Default",
    args: {
        episodes: [{ id: 1, name: "Pilot", episode: "S01 E01" }]
    }
};