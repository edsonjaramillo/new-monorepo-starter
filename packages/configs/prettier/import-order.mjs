/**
 * @type {import("prettier").Config}
 */
export const importSortConfig = {
  importOrder: ["^@repo", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export const importSortPlugin = "@trivago/prettier-plugin-sort-imports";
