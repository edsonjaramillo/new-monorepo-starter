/**
 * @type {import("prettier").Config}
 */
export const libraryPrettierConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  importOrder: ['^@repo', '^\\.'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['prettier-plugin-packagejson', '@trivago/prettier-plugin-sort-imports'],
};
