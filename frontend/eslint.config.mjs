import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const nextConfigs = require('eslint-config-next/core-web-vitals');

const eslintConfig = [
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
