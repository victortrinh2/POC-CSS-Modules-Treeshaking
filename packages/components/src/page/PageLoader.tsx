import { Flex, Spinner, isNumber } from "@workleap/orbiter-ui";
import { useEffect, useState } from "react";

export function PageLoader(props: LoaderProps) {
    return (
        <Flex height="100%" alignItems="center" justifyContent="center" >
            <Loader {...props} />
        </Flex>
    );
}

interface LoaderProps {
    delay?: false | number;
    "aria-label": string;
}

const DefaultLoaderDelay = 300;

// We should use Orbiter's loader here, but the styling has never been done for the custom loader component, so we use
// a custom one for a spinner instead.
function Loader({ delay, "aria-label": ariaLabel }: LoaderProps) {
    const [isShown, setIsShown] = useState<boolean>(!delay);

    useEffect(() => {
        if (!delay) {
            return;
        }

        const showTimer = setTimeout(() => setIsShown(true), isNumber(delay) ? delay : DefaultLoaderDelay);

        return () => clearTimeout(showTimer);
    }, [delay]);

    return isShown && <Spinner aria-label={ariaLabel} />;
}
