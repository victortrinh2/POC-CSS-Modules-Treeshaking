import type { KnipConfig } from "knip";

type KnipWorkspaceConfig = NonNullable<KnipConfig["workspaces"]>[string];

type KnipTransformer = (config: KnipWorkspaceConfig) => KnipWorkspaceConfig;

function defineWorkspace({ ignore, ...config }: KnipWorkspaceConfig, transformers?: KnipTransformer[]): KnipWorkspaceConfig {
    let transformedConfig: KnipWorkspaceConfig = {
        ...config,
        ignore: [
            ...(ignore as string[] ?? []),
            "node_modules/**",
            "dist/**"
        ]
    };

    if (transformers) {
        transformedConfig = transformers.reduce((acc, transformer) => transformer(acc), transformedConfig);
    }

    return transformedConfig;
}

const ignoreBrowserslist: KnipTransformer = ({ ignoreDependencies, ...config }) => {
    return {
        ...config,
        ignoreDependencies: [
            ...(ignoreDependencies as string[] ?? []),
            // Browserlist isn't supported by plugins.
            "@workleap/browserslist-config"
        ]
    };
};

const configureLocalModule: KnipTransformer = config => {
    return configureMsw({
        ...config,
        eslint: true,
        stylelint: true,
        tsup: {
            config: ["tsup.*.ts"]
        }
    });
};

const configurePackage: KnipTransformer = config => {
    return {
        ...config,
        eslint: true,
        stylelint: true,
        tsup: {
            config: ["tsup.*.ts"]
        }
    };
};

const configureMsw: KnipTransformer = ({ entry, ignore, ...config }) => {
    return {
        ...config,
        entry: [
            ...(entry as string[] ?? []),
            "src/index.ts",
            "src/mocks/browser.ts"
        ],
        ignore: [
            ...(ignore as string[] ?? []),
            // MSW isn't supported by plugins.
            "public/mockServiceWorker.js"
        ]
    };
};

const configurePostcss: KnipTransformer = config => {
    return {
        ...config,
        postcss: {
            config: ["postcss.config.ts"]
        }
    };
};

// This monorepo Storybook setup is quite unorthodox because the .storybook folder has been
// made as a workspace folder. Therefore, it requires some configuration.
const configureStorybook: KnipTransformer = ({ ignoreDependencies, ...config }) => {
    return {
        ...config,
        ignoreDependencies: [
            ...(ignoreDependencies as string[] ?? []),
            "@chromatic-com/storybook",
            "@storybook/addon-webpack5-compiler-swc",
            "@storybook/addon-a11y",
            "@storybook/addon-essentials",
            "@storybook/addon-interactions",
            "@storybook/addon-links",
            "@storybook/builder-webpack5"
        ],
        storybook: true
    };
};

const rootConfig = defineWorkspace({
    ignoreDependencies: [
        // Azure Devops pipeline aren't supported by plugins.
        "netlify-cli",
        // Required for Stylelint (seems like a Knip bug)
        "prettier"
    ],
    ignoreBinaries: [
        "build",
        "serve-build"
    ]
});

const hostAppConfig = defineWorkspace({
    entry: [
        "src/index.tsx"
    ],
    webpack: {
        config: ["webpack.*.js"]
    },
    eslint: true,
    stylelint: true,
    ignoreDependencies: [
        "swc-loader",
        "css-loader",
        "postcss-loader",
        "style-loader",
        "mini-css-extract-plugin"
    ]
}, [
    ignoreBrowserslist,
    configurePostcss
]);

const localModuleSampleConfig = defineWorkspace({
    ignore: [
        // Will be used eventually.
        "src/localization/Trans.tsx"
    ]
}, [
    configureLocalModule
]);

const packagesConfig = defineWorkspace({}, [
    configurePackage
]);

const eslintPluginConfig = defineWorkspace({
    ignoreDependencies: [
        // Knip doesn't seem to be able to resolve ESLint plugins dependencies.
        "@orbit-ui/eslint-plugin"
    ]
}, [
    configurePackage
]);

const shellConfig = defineWorkspace({
    ignore: [
        // Will be used eventually.
        "src/localization/Trans.tsx"
    ]
}, [
    configurePackage,
    configureMsw
]);

// This monorepo Storybook setup is quite unorthodox because the .storybook folder has been
// made as a workspace folder. Therefore, it requires some configuration.
const storybookConfig = defineWorkspace({
    entry: [
        "main.ts",
        "preview.tsx"
    ]
}, [
    ignoreBrowserslist,
    configurePostcss
]);

let config: KnipConfig = {
    workspaces: {
        ".": rootConfig,
        "apps/host-app": hostAppConfig,
        "apps/local-module-sample": localModuleSampleConfig,
        "packages/*": packagesConfig,
        "packages/eslint-plugin": eslintPluginConfig,
        "packages/shell": shellConfig,
        ".storybook": storybookConfig
    },
    exclude: [
        // It cause issues with config like Jest "projects".
        "unresolved"
    ],
    ignoreExportsUsedInFile: true
};

export default config = configureStorybook(config);
