/**
 * @type {import("prettier").Config}
 */
export const packageSortConfig = {
  importOrder: ["^ui", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export const packageSortPlugin = "prettier-plugin-packagejson";
