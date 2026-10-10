import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const nextConfigs = require('eslint-config-next/core-web-vitals');

const eslintConfig = [
    // The Android app's static build and native project (npm run build:app)
    { ignores: ['out/**', 'android/**'] },
    ...nextConfigs,
    {
        rules: {
            // eslint-plugin-react-hooks v7: syncing local UI state from props remains a common pattern here.
            'react-hooks/set-state-in-effect': 'off',
        },
    },
];

/** @type {import('eslint').Linter.Config[]} */
export default eslintConfig;
