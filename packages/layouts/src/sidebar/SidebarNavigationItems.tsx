import { isNavigationLink, useRenderedNavigationItems, type RenderItemFunction, type RenderSectionFunction, type RootNavigationItem } from "@poc-css/federation-runtime";
import { LI, UL } from "@workleap/orbiter-ui";
import { SidebarItem } from "./SidebarItem.tsx";
import { SidebarSection } from "./SidebarSection.tsx";

export interface SidebarNavigationItemsProps {
    navigationItems: RootNavigationItem[];
}

export function SidebarNavigationItems({ navigationItems }: SidebarNavigationItemsProps) {
    const sidebarContent = useRenderedNavigationItems(navigationItems, renderItem, renderSection);

    return <nav>{sidebarContent}</nav>;
}

const renderItem: RenderItemFunction = (item, key, index) => {
    if (isNavigationLink(item)) {
        return (
            <SidebarItem key={key} {...item.linkProps} >
                {item.label}
            </SidebarItem>
        );
    }

    return (
        <SidebarSection key={key} label={item.label} marginTop={index === 0 ? undefined : "stack-xl"}>
            {item.section}
        </SidebarSection>
    );
};

const renderSection: RenderSectionFunction = (elements, key) => {
    return (
        <UL
            key={key}
            margin={0}
            padding={0}
            display="block"
            style={{ listStyle: "none" }}
        >
            {elements.map((element, index) => (
                <LI
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${key}-${index}`}
                    style={{ listStyle: "none" }}
                    margin={0}
                    padding={0}
                    display="flex"
                    flexDirection="column"
                    gap="stack-sm"
                >
                    {element}
                </LI>
            ))}
        </UL>
    );
};

