import { Button, ButtonGroup, Content, Heading, Modal, Overlay, Paragraph, type ModalProps } from "@workleap/orbiter-ui";
import { useCallback, useEffect } from "react";
import { useBlocker } from "react-router-dom";
import { useTranslation } from "./localization/useTranslation.ts";

interface PreventNavigationModalProps extends Omit<ModalProps, "children">{
    isDisabled: boolean;
    onDiscard: () => void;
}

export function PreventNavigationModal({ isDisabled, onDiscard, ...rest } : PreventNavigationModalProps) {
    const { t } = useTranslation("PreventNavigationModal");

    const blockerFunction = useCallback(() => {
        if (isDisabled) {
            return false;
        }

        return true;
    }, [isDisabled]);

    const blocker = useBlocker(blockerFunction);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        if (!isDisabled) {
            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, [blocker.state, isDisabled]);

    const handleDiscard = useCallback(() => {
        onDiscard?.();
        if (blocker.state === "blocked") {
            blocker.proceed();
        }
    }, [onDiscard, blocker]);

    const handleClose = useCallback(() => {
        blocker.reset?.();
    }, [blocker]);

    return (
        <Overlay zIndex={10000} show={blocker.state === "blocked"} >
            <Modal onClose={handleClose} {...rest}>
                <Heading style={{ marginInline: "auto" }}>{t("heading")}</Heading>
                <Content textAlign="center">
                    <Paragraph size="sm">{t("content")}</Paragraph>
                </Content>
                <ButtonGroup fluid>
                    <Button variant="secondary" onClick={handleClose} width="min-content">{t("keepEditing")}</Button>
                    <Button variant="negative" onClick={handleDiscard} width="min-content">{t("discardChanges")}</Button>
                </ButtonGroup>
            </Modal>
        </Overlay>
    );
}
