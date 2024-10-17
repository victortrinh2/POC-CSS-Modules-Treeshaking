import { ApplicationRuntime, ConsoleLogger, registerLocalModules, RuntimeProvider, setMswAsReady, type Environment } from "@poc-css/federation-runtime";
import { register as registerLocalModuleSample } from "@poc-css/local-module-sample";
import { registerShell } from "@poc-css/shell";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { registerLocalModule } from "./register.tsx";

import "./index.css";

const consoleLogger = new ConsoleLogger();

const env = process.env.APP_ENV as Environment;

const runtime = new ApplicationRuntime(env, false, {
    loggers: [consoleLogger]
});

await registerLocalModules([registerShell(), registerLocalModule, registerLocalModuleSample], runtime);

if (runtime.environment === "msw") {
    // Files that includes an import to the "msw" package are included dynamically to prevent adding
    // unused MSW stuff to the code bundles.
    const startMsw = (await import("./mocks/browser.ts")).startMsw;

    // Will start MSW with the request handlers provided by every module.
    startMsw(runtime.requestHandlers, runtime.logger)
        .then(() => {
            // Indicate to resources that are dependent on MSW that the service has been started.
            setMswAsReady();
        })
        .catch((error: unknown) => {
            consoleLogger.debug("[host-app] An error occured while starting MSW.", error);
        });
}

const root = createRoot(document.getElementById("root")!);

root.render(
    <RuntimeProvider runtime={runtime}>
        <App />
    </RuntimeProvider>
);
