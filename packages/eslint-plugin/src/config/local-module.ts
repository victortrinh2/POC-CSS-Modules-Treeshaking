import type { Linter } from "eslint";

const config: Linter.Config = {
    plugins: [
        "@workleap",
        "@orbit-ui"
    ],
    extends: [
        "plugin:@workleap/web-application",
        "plugin:@orbit-ui/recommended"
    ],
    rules: {
        "no-restricted-imports": ["error", {
            "patterns": [
                {
                    "group": ["react-i18next"],
                    "importNames": ["useTranslation"],
                    "message": "Use 'useTranslation' from @/localization/useTranslation.ts instead."
                },
                {
                    "group": ["react-i18next"],
                    "importNames": ["Trans"],
                    "message": "Use 'Trans' from @/localization/Trans.tsx instead."
                },
                {
                    "group": ["@poc-css/federation-runtime"],
                    "importNames": ["I18nextNavigationItemLabel"],
                    "message": "Use 'I18nextNavigationItemLabel' from @/localization/I18nextNavigationItemLabel.tsx instead."
                },
                {
                    "group": ["@poc-css/federation-runtime"],
                    "importNames": ["I18nextNavigationItemLabelProps"],
                    "message": "Use 'I18nextNavigationItemLabelProps' from @/localization/I18nextNavigationItemLabel.tsx instead."
                }
            ]
        }]
    }
};

// Using TypeScript "export" keyword until ESLint support ESM.
// Otherwise we must deal with a weird CommonJS output from esbuild which is not worth it.
// For more info, see: https://github.com/evanw/esbuild/issues/1079
export = config;
