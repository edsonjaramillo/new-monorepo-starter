import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tailwindStylesheetPath = resolve(__dirname, '../tailwind/theme.css');


/**
 * @type {import("prettier").Config}
 */
export const reactLibraryPrettierConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  importOrder: ['^@repo', '^\\.'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindStylesheet: tailwindStylesheetPath,
  tailwindAttributes: ['cn', 'cva'],
  tailwindFunctions: ['cn', 'cva'],
  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
