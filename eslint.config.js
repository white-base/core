export default [
    {
      ignores: ["node_modules", "dist", "src/temp"],
    },
    {
      files: ["**/*.js", "**/*.ts"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
      },
    },
  ];