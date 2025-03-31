import { antfu } from '@antfu/eslint-config';
import { BASE_OPTIONS, TURBO_PLUGIN } from './eslint/antfu.mjs';

export default antfu(
  {
    type: 'lib',
    ...BASE_OPTIONS,
  },
  TURBO_PLUGIN,
);
