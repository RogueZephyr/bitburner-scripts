import typescriptEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "prefer-const": "error",
    },
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
];