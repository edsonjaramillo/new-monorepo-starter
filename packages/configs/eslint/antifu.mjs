import turboPlugin from 'eslint-plugin-turbo';

// ####################### BASE #######################

/**
 * @type {import('@antfu/eslint-config').Rules}
 */
const BASE_RULES = {
  'node/prefer-global/process': 'off',
  'style/eol-last': 'off',
};

/**
 * @type {import('@antfu/eslint-config').OptionsConfig}
 */
export const BASE_OPTIONS = {
  typescript: true,
  stylistic: {
    semi: true,
    quotes: 'single',
    indent: 2,
    overrides: {
      'style/max-len': ['error', { code: 100, ignoreStrings: true }],
    },
  },
  rules: {
    ...BASE_RULES,
  },
};

// ####################### REACT #######################

/**
 * @type {import('@antfu/eslint-config').Rules}
 */
const REACT_RULES = {
  'react-refresh/only-export-components': 'off',
};

/**
 * @type {import('@antfu/eslint-config').OptionsConfig}
 */
export const REACT_OPTIONS = {
  ...BASE_OPTIONS,
  react: true,
  rules: {
    ...BASE_RULES,
    ...REACT_RULES,
  },
};

// ####################### PLUGINS #######################

/**
 * @type {import('eslint').Linter.Config}
 */
export const TURBO_PLUGIN = {
  plugins: {
    turbo: turboPlugin,
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'warn',
  },
};
