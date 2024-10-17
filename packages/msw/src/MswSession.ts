import type { MswMemberContext, MswMemberData } from "./MswLogin.ts";
import type { MswProduct } from "./MswProducts.ts";

export interface MswSession {
    memberContext: MswMemberContext;
    memberData: MswMemberData;
    assignedProducts: MswProduct[];
    unassignedProducts: MswProduct[];
}

export const MswSessionKey = "wl-mgmt-msw-session";
