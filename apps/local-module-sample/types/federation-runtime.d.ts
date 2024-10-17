import "@poc-css/federation-runtime";

declare module "@poc-css/federation-runtime" {
    interface EnvironmentVariables {
        rickAndMortyApiUrl: string;
    }
}
