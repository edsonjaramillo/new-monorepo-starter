/**
 * @type {import("tsup").Options}
 */
export const baseTSupConfig = {
  outDir: 'dist',
  format: 'esm',
  target: 'es2022',
  publicDir: 'public',
};

/**
 * @type {import("tsup").Options}
 */
export const prepareTSupConfig = {
  ...baseTSupConfig,
  clean: true,
  dts: true,
  sourcemap: true,
  treeshake: false,
};

/**
 * @type {import("tsup").Options}
 */
  export const productionTSupConfig = {
  ...baseTSupConfig,
  clean: true,
  minify: true,
  treeshake: true,
};

/**
 * @type {import("tsup").Options}
 */
export const developmentTSupConfig = {
  ...baseTSupConfig,
  watch: true,
  clean: false,
  dts: true,
  sourcemap: true,
  treeshake: false,
};
