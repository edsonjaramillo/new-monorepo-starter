/**
 * @type {import("prettier").Config}
 */
export const libraryPrettierConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: true,
  bracketSameLine: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
