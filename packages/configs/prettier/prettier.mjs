import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @type {import("prettier").Config}
 */
export const libraryPrettierConfig = {
  printWidth: 100,
  quoteProps: 'preserve',
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-packagejson'],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tailwindStylesheetPath = resolve(__dirname, '../tailwind/theme.css');

/**
 * @type {import("prettier").Config}
 */
export const reactLibraryPrettierConfig = {
  printWidth: 100,
  quoteProps: 'preserve',
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  tailwindStylesheet: tailwindStylesheetPath,
  tailwindAttributes: ['cn', 'cva'],
  tailwindFunctions: ['cn', 'cva'],
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};
