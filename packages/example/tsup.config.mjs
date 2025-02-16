import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist', // Output directory
  format: ['esm'], // Output format(s)
  target: 'esnext',
  clean: true, // Clean output directory before building
  dts: true, // Generate .d.ts files
  minify: true, // Minify output
  sourcemap: true, // Generate sourcemaps
  splitting: true, // Split output into chunks
  treeshake: true, // Remove unused code
  entry: ['src/addition/add.ts', 'src/subtraction/subtract.ts'], // Entry point(s)
});
