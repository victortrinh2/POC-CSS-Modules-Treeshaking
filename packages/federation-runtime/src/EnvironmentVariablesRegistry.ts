// The "EnvironmentVariables" interface is expected to be extended by remote modules adding their own environment variables to the runtime.
// This magic is called module augmentation: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation.
export interface EnvironmentVariables {}

export class EnvironmentVariablesRegistry {
    // Silencing error TS2739: Type '{}' is missing the following properties from type 'EnvironmentVariables' that only happens
    // when running "pnpm lint" from the root of the project.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    readonly #variables: EnvironmentVariables = {};

    add(key: keyof EnvironmentVariables, value: unknown) {
        if (!this.#variables[key]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.#variables[key] = value;
        } else if (this.#variables[key] !== value) {
            throw new Error(`[federation-runtime] An environment variable with the key "${key}" already exist and the new value differs from the existing one. Existing value: "${this.#variables[key]}" - New Value: "${value}"`);
        }
    }

    getVariables() {
        return this.#variables;
    }
}
