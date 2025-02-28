// import typings of tsup in mjs style
/**
 * @type {import("tsup").Options}
 */
export const prodReactLibraryConfig = {
  outDir: 'dist',
  format: 'esm',
  target: 'es2022',
  clean: true,
  publicDir: 'public',
  dts: true,
  minify: true,
  treeshake: true,
  sourcemap: false,
};

/**
 * @type {import("tsup").Options}
 */
export const devReactLibraryConfig = {
  ...prodReactLibraryConfig,
  clean: false,
  sourcemap: true,
  minify: false,
  treeshake: false,
};
