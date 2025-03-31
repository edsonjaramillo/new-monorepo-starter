import { antfu } from '@antfu/eslint-config';
import { BASE_OPTIONS, TURBO_PLUGIN } from '@repo/configs/antfu';

export default antfu(
  {
    type: 'lib',
    ignores: ['apps/*', 'packages/*'],
    ...BASE_OPTIONS,
  },
  TURBO_PLUGIN,
);
