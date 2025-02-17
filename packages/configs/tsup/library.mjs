// import typings of tsup in mjs style
/**
 * @type {import("tsup").Options}
 */
export const prodLibraryConfig = {
  outDir: 'dist',
  format: ['esm'],
  target: 'esnext',
  clean: true,
  dts: true,
  minify: true,
  treeshake: true,
  sourcemap: false,
};

/**
 * @type {import("tsup").Options}
 */
export const devLibraryConfig = {
  ...prodLibraryConfig,
  silent: true,
  sourcemap: true,
  minify: false,
  treeshake: false,
};
