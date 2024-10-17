import { RouterTextLink } from "@poc-css/components";
import { Flex, H1, Paragraph } from "@workleap/orbiter-ui";

export function LogoutPage() {
    return (
        <Flex width="100%" height="100vh" alignItems="center" justifyContent="center">
            <Flex gap={80} direction="column" alignItems="center">
                <H1>Logged out</H1>
                <Paragraph><strong>NOTE: This fake logout page is strictly for development purpose when using an MSW environment with fake endpoints.</strong></Paragraph>
                <Paragraph>You are logged out from the application!</Paragraph>
                <RouterTextLink to="/login">Log in again</RouterTextLink>
            </Flex>
        </Flex>
    );
}
