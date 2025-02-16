// import typings of tsup in mjs style
/**
 * @type {import("tsup").Options}
 */
export const prodHonoConfig = {
  outDir: 'dist',
  format: 'esm',
  clean: true,
  splitting: true,
  dts: false,
  sourcemap: false,
  minify: true,
};

/**
 * @type {import("tsup").Options}
 */
export const devHonoConfig = {
  ...prodHonoConfig,
  sourcemap: true,
  minify: false,
  treeshake: false,
};
