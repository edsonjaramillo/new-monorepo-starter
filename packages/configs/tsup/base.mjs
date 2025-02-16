// import typings of tsup in mjs style
/**
 * @type {import("tsup").Options}
 */
export const baseConfig = {
  outDir: 'dist',
  format: ['esm'],
  target: 'esnext',
  clean: true,
  dts: true,
  minify: false,
  sourcemap: true,
  treeshake: true,
};
