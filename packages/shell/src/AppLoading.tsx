import { Flex } from "@workleap/orbiter-ui";
import { forwardRef, useId, type ComponentProps } from "react";
import { useTranslation } from "./localization/useTranslation.ts";

import "./AppLoading.css";

export function AppLoading() {
    const { t } = useTranslation("AppLoading");

    return (
        <Flex width="100%" height="100vh" alignItems="center" justifyContent="center">
            <WorkleapIcon className="wl-page-loader-pulse" aria-label={t("text")} height="104px" width="104px" />
        </Flex>
    );
}

const WorkleapIcon = forwardRef<SVGSVGElement, ComponentProps<"svg">>((props, ref) => {
    const id = useId();

    return (
        <svg
            ref={ref}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 104 104"
            {...props}
        >
            <path d="M81.7 0H22.3C10 0 0 10 0 22.3v59.4C0 94 10 104 22.3 104h59.4C94 104 104 94 104 81.7V22.3C104 10 94 0 81.7 0Z" fill="#F0E9E1" />
            <path d="M76.2 26.3h-.8l-7.6 23.1-7-22.4a1 1 0 0 0-1-.7H47.5a1.2 1.2 0 0 0-1.1.8l-8 27-7.7-27.8H16l14.2 50.5a1.1 1.1 0 0 0 1.1.9h13a1 1 0 0 0 1-.7l8.9-30.1L60.6 67a1.2 1.2 0 0 0 1.1.8h11.4a1.3 1.3 0 0 0 1.3-1L88 26.4H76.2Z" fill="#2545FF" />
            <path d="m54.2 46.9-6-18.6a.4.4 0 0 0-.8 0L42 46.7c3.9.8 7.7 2 11.4 3.3l.9-3.1Z" fill={`url(#${id}-a)`} />
            <path d="m62.3 66.3 3.3-10a71.3 71.3 0 0 0-8.7-4.5l4.6 14.5a.4.4 0 0 0 .8 0Z" fill={`url(#${id}-b)`} />
            <path d="m31.9 75.7.1-.2 6.4-21.3-2.2-8c-4.4-.6-8.9-.8-13.3-.5l8.4 29.8a.4.4 0 0 0 .4.3h.2Z" fill={`url(#${id}-c)`} />
            <defs>
                <radialGradient id={`${id}-a`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(23 0 0 23 47.4 28.3)">
                    <stop offset=".1" stopColor="#F0E9E1" />
                    <stop offset=".4" stopColor="#A2AAED" />
                    <stop offset=".8" stopColor="#4862FA" />
                    <stop offset=".9" stopColor="#2545FF" />
                </radialGradient>
                <radialGradient id={`${id}-b`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(14 0 0 14 57.3 64)">
                    <stop offset=".1" stopColor="#F0E9E1" />
                    <stop offset=".3" stopColor="#B4B9EA" />
                    <stop offset=".5" stopColor="#687BF5" />
                    <stop offset=".7" stopColor="#3754FC" />
                    <stop offset=".8" stopColor="#2545FF" />
                </radialGradient>
                <radialGradient id={`${id}-c`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-4 -33 35 -5 32.3 75.4)">
                    <stop offset=".1" stopColor="#F0E9E1" />
                    <stop offset=".2" stopColor="#E7E2E2" />
                    <stop offset=".3" stopColor="#CFCEE6" />
                    <stop offset=".5" stopColor="#A7AEEC" />
                    <stop offset=".7" stopColor="#7081F4" />
                    <stop offset=".9" stopColor="#2A49FE" />
                    <stop offset="1" stopColor="#2545FF" />
                </radialGradient>
                <path fill="#fff" d="M0 0h104v104H0z" />
            </defs>
        </svg>
    );
});
