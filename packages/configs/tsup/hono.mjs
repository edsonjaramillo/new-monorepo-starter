// import typings of tsup in mjs style
/**
 * @type {import("tsup").Options}
 */
export const prodHonoConfig = {
  outDir: 'dist',
  format: 'esm',
  target: 'es2022',
  clean: true,
  publicDir: 'public',
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
  clean: false,
  sourcemap: true,
  minify: false,
  treeshake: false,
};
