import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 禁用未使用变量警告
      "@typescript-eslint/no-unused-vars": "off",
      // 禁用any类型警告
      "@typescript-eslint/no-explicit-any": "off",
      // 禁用ARIA属性警告
      "jsx-a11y/role-supports-aria-props": "off",
      // 禁用未转义实体警告
      "react/no-unescaped-entities": "off",
      // 禁用React Hooks依赖警告
      "react-hooks/exhaustive-deps": "off",
      // 禁用prefer-const警告
      "prefer-const": "off",
      // 禁用img元素警告
      "@next/next/no-img-element": "off"
    },
  },
];

export default eslintConfig;
