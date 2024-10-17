import { SvgImage, slot, type SvgImageProps } from "@workleap/orbiter-ui";
import { Suspense, forwardRef, lazy } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createLazySvgImage(factory: () => any) {
    const src = lazy(factory);

    return slot("image", forwardRef<SVGSVGElement, Omit<SvgImageProps, "src">>((props, ref) => {
        return (
            <Suspense fallback={<SvgImage ref={ref} {...props} />}>
                <SvgImage ref={ref} {...props} src={src} />
            </Suspense>
        );
    }));
}
