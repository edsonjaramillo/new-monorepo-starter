import { antfu } from '@antfu/eslint-config';
import { REACT_OPTIONS, TURBO_PLUGIN } from '@repo/configs/antfu';

export default antfu(
  {
    type: 'app',
    ignores: ['**/routeTree.gen.ts'],
    ...REACT_OPTIONS,
  },
  TURBO_PLUGIN,
);
