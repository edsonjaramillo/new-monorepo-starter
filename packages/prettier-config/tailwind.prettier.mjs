/**
 * @type {import("prettier").Config}
 */
export const tailwindSortConfig = {
  tailwindStylesheet: "@repo/tailwind-config/theme.css",
  tailwindAttributes: ["cn", "cva"],
  tailwindFunctions: ["cn", "cva"],
};

export const tailwindSortPlugin = "prettier-plugin-tailwindcss";
