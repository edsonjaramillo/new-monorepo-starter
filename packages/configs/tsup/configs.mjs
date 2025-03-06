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
  clean: true,
  dts: true,
  sourcemap: true,
  treeshake: false,
};

/**
 * @type {import("tsup").Options}
 */
export const productionTSupConfig = {
  clean: true,
  minify: true,
  treeshake: true,
};

/**
 * @type {import("tsup").Options}
 */
export const developmentTSupConfig = {
  watch: true,
  clean: false,
  dts: true,
  sourcemap: true,
  treeshake: false,
};
