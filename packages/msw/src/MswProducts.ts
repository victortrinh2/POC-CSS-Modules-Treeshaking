export type MswProductId = "wov" | "lms" | "onb" | "wsg" | "sks";

export interface MswProduct {
    identifier: MswProductId;
    isNew: boolean;
    isExternal: boolean;
    iconUrl: string;
    redirectUrl: string;
}

export const MswProducts: Record<MswProductId, MswProduct> = {
    "wov": {
        identifier: "wov",
        isNew: false,
        isExternal: false,
        iconUrl: "https://cdn.platform.workleap-dev.com/products/wov/icon.svg",
        redirectUrl: ""
    },
    "onb": {
        identifier: "onb",
        isNew: false,
        isExternal: false,
        iconUrl: "https://cdn.platform.workleap-dev.com/products/onb/icon.svg",
        redirectUrl: ""
    },
    "wsg": {
        identifier: "wsg",
        isNew: false,
        isExternal: true,
        iconUrl: "https://cdn.platform.workleap-dev.com/products/wsg/icon.svg",
        redirectUrl: "https://home.sharegate.com"
    },
    "lms": {
        identifier: "lms",
        isNew: true,
        isExternal: false,
        iconUrl: "https://cdn.platform.workleap-dev.com/products/lms/icon.svg",
        redirectUrl: ""
    },
    "sks": {
        identifier: "sks",
        isNew: true,
        isExternal: false,
        iconUrl: "https://cdn.platform.workleap-dev.com/products/sks/icon.svg",
        redirectUrl: ""
    }
};
