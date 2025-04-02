import { antfu } from '@antfu/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';

// ####################### OPTIONS #######################
/**
 * @type {import('@antfu/eslint-config').OptionsConfig}
 */
const BASE_OPTIONS = {
  typescript: true,
  stylistic: {
    semi: true,
    quotes: 'single',
    indent: 2,
    overrides: {
      'style/max-len': ['error', { code: 100, ignoreStrings: true }],
    },
  },
};

/**
 * @type {import('@antfu/eslint-config').OptionsConfig}
 */
const REACT_OPTIONS = {
  react: true,
  ...BASE_OPTIONS,
};

// ####################### RULES #######################

/**
 * @type {import('@antfu/eslint-config').Rules}
 */
const BASE_RULES = {
  'node/prefer-global/process': 'off',
  'style/eol-last': 'off',
};

/**
 * @type {import('@antfu/eslint-config').Rules}
 */
const REACT_RULES = {
  'react-refresh/only-export-components': 'off',
};

// ####################### PLUGINS #######################

/**
 * @type {import('eslint').Linter.Config}
 */
const TURBO_PLUGIN = {
  plugins: {
    turbo: turboPlugin,
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'warn',
  },
};

// ####################### CONFIGS #######################

export const MONOREPO_LINT_CONFIG = antfu(
  {
    type: 'lib',
    ignores: ['apps/*', 'packages/*'],
    ...BASE_OPTIONS,
    rules: {
      ...BASE_RULES,
    },
  },
  TURBO_PLUGIN,
);

export const LIBRARY_STANDARD_LINT_CONFIG = antfu(
  {
    type: 'lib',
    ...BASE_OPTIONS,
    rules: {
      ...BASE_RULES,
    },
  },
  TURBO_PLUGIN,
);

export const LIBRARY_REACT_LINT_CONFIG = antfu(
  {
    type: 'lib',
    ...REACT_OPTIONS,
    rules: {
      ...BASE_RULES,
      ...REACT_RULES,
    },
  },
  TURBO_PLUGIN,
);

export const APP_STANDARD_LINT_CONFIG = antfu(
  {
    type: 'app',
    ...BASE_OPTIONS,
    rules: {
      ...BASE_RULES,
    },
  },
  TURBO_PLUGIN,
);

export const APP_REACT_LINT_CONFIG = antfu(
  {
    type: 'app',
    ignores: ['**/routeTree.gen.ts'],
    ...REACT_OPTIONS,
    rules: {
      ...BASE_RULES,
      ...REACT_RULES,
    },
  },
  TURBO_PLUGIN,
);
