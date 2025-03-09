import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tailwindStylesheetPath = resolve(__dirname, '../tailwind/theme.css');


/**
 * @type {import("prettier").Config}
 */
export const reactInternalPrettierConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  importOrder: ['^@repo', '^\\.'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindStylesheet: tailwindStylesheetPath,
  tailwindAttributes: ['cn', 'cva', 'classNames'],
  tailwindFunctions: ['cn', 'cva', 'classNames'],
  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
