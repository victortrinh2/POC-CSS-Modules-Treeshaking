import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@workleap/orbiter-ui";
import { useNavigate } from "react-router-dom";
import { PreventNavigationModal } from "./PreventNavigationModal.tsx";

const meta = {
    component: Component
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {};

function Component () {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate("somewhere")}>
                Navigate Away
            </Button>
            <PreventNavigationModal
                isDisabled={false}
                onDiscard={() => {
                    console.log("discarded");
                    location.reload();
                }}
            />
        </>
    );
}
