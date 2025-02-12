/**
 * @type {import("prettier").Config}
 */
export const importSortConfig = {
  importOrder: ["^ui", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export const importSortPlugin = "@trivago/prettier-plugin-sort-imports";
