import { useEnvironmentVariables, useIsAuthenticated } from "@poc-css/federation-runtime";
import { isApiError, postJson, resolveApiUrl } from "@poc-css/http";
import { Button, Div, Field, Flex, Form, H1, LI, Label, Paragraph, PasswordInput, TextInput, UL, as } from "@workleap/orbiter-ui";
import { useCallback, useState, type ChangeEvent, type MouseEvent } from "react";
import { Navigate } from "react-router-dom";

const FormAsFlex = as(Form, Flex);

export function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isBusy, setIsBusy] = useState(false);

    const environmentVariables = useEnvironmentVariables();

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setIsBusy(true);
        setErrorMessage(undefined);

        postJson(resolveApiUrl("login", environmentVariables.authenticationApiBaseUrl), { username, password })
            .then(() => {
                setIsBusy(false);

                const searchParams = new URLSearchParams(window.location.search);

                if (searchParams.has("returnUrl")) {
                    window.location.href = searchParams.get("returnUrl")!;
                } else {
                    window.location.href = "/";
                }
            })
            .catch((error: unknown) => {
                setIsBusy(false);

                if (isApiError(error) && error.status === 401) {
                    setErrorMessage("Invalid credentials, please try again.");
                } else {
                    throw error;
                }
            });
    }, [username, password, environmentVariables]);

    const handleUserNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <Flex width="100%" height="100vh" alignItems="center" justifyContent="center">
            <Flex gap={80} direction="column" alignItems="center">
                <H1>Login</H1>
                <Paragraph><strong>NOTE: This fake login page is strictly for development purpose when using an MSW environment with fake endpoints.</strong></Paragraph>
                <FormAsFlex direction="column" alignItems="center">
                    <Field required>
                        <Label>Username</Label>
                        <TextInput onChange={handleUserNameChange} />
                    </Field>
                    <Field required>
                        <Label>Password</Label>
                        <PasswordInput onChange={handlePasswordChange} />
                    </Field>
                    <Button onClick={handleClick}>Login</Button>
                    <br />
                    <Paragraph display="block" textAlign="center">
                        Hint :)
                    </Paragraph>
                    <UL>
                        <LI>Use <strong>en/en</strong> for a en-US profile</LI>
                        <LI>Use <strong>fr/fr</strong> for a fr-CA profile</LI>
                    </UL>
                    {isBusy && <Div color="blue">Loading...</Div>}
                    {errorMessage && <Div color="red">{errorMessage}</Div>}
                </FormAsFlex>
            </Flex>
        </Flex>
    );
}
