import type { MswProduct } from "./MswProducts.ts";

export interface MswCredentials {
    username: string;
    password: string;
}

// Must keep the some field of the previous MemberContext DTO until the new endpoint
// is created.
export interface MswMemberContext {
    memberId: string;
    organizationId: string;
    email: string;
    displayName: string;
    isExecutiveManager: boolean;
    isOrganizationAdmin: boolean;
    isTeamManager: boolean;
    isCollaborator: boolean;
    isReportingManager: boolean;
    preferredLanguages: string[];
    timeZone: string;
}

export interface MswMemberData {
    displayName: string;
    lastName: string;
    state: "Active" | "Deactivated" | "Pending" | "Created";
}

export interface MswLogin {
    credentials: MswCredentials;
    memberContext: MswMemberContext;
    memberData: MswMemberData;
    assignedProducts: MswProduct[];
    unassignedProducts: MswProduct[];
}
