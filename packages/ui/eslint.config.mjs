import { antfu } from '@antfu/eslint-config';

export default antfu({
  type: 'lib',
  typescript: true,
  react: true,
  stylistic: {
    semi: true,
    quotes: 'single',
    overrides: {
      'style/max-len': ['error', { code: 100, ignoreStrings: true }],
    },
  },
  rules: {
    'react-refresh/only-export-components': 'off',
  },
});
