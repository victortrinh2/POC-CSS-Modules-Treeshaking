import { useNavigationItems } from "@squide/firefly";
import { SidebarMenuId } from "./federationConstants.ts";

export function useSidebarNavigationItems() {
    return useNavigationItems({ menuId: SidebarMenuId });
}