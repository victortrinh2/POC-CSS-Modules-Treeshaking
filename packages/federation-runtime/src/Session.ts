export interface Session {
    memberId: string;
    organizationId: string;
    emailAddress: string;
    givenName: string;
    isExecutiveManager: boolean;
    isOrganizationAdmin: boolean;
    isTeamManager: boolean;
    isCollaborator: boolean;
    isReportingManager: boolean;
    preferredLanguages: string[];
    timeZone: string;
}
