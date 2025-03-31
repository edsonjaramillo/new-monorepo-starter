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
