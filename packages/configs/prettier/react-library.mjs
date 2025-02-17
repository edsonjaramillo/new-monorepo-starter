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
  tailwindStylesheet: '@repo/tailwind-config/theme.css',
  tailwindAttributes: ['cn', 'cva'],
  tailwindFunctions: ['cn', 'cva'],
  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
