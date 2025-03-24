import { antfu } from '@antfu/eslint-config';
import { REACT_OPTIONS, TURBO_PLUGIN } from '@repo/configs/eslint/antifu';

export default antfu(
  {
    type: 'app',
    ...REACT_OPTIONS,
  },
  TURBO_PLUGIN,
);
