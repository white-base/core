export default [
    {
      ignores: ["node_modules", "dist", "src/temp"],
    },
    {
      files: ["**/*.js", "**/*.ts"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          browser: true, // 기존 `env.browser`
          node: true,    // 기존 `env.node`
          // es6: true,     // 기존 `env.es6`
          es5: true,     // 기존 `env.es5`
          es6: true,     // 기존 `env.es6`
          console: true, // console 사용 허용
          process: 'readonly',
          require: 'readonly',
          fetch: 'readonly',
          navigator: 'readonly',
        },
      },
      rules: {
        // "indent": ["warn", 4], // 들여쓰기
        "quotes": ["warn", "single"], // 따옴표
        // "semi": ["warn", "always"], // 세미콜론
        // "comma-dangle": ["warn", "always"], // 마지막 쉼표
        "no-undef": ["warn"], // 선언되지 않은 변수 사용
        "no-unused-vars": ["warn", { "caughtErrors": "none" }], // 사용되지 않은 변수
        "no-redeclare": ["warn"], // 중복 선언
        // "no-console": ["warn"], // console 사용
        // "eqeqeq": ["warn"], // ==, != 사용
        // "curly": ["warn"], // 중괄호 사용
        // "no-eval": ["warn"], // eval 사용
        // "no-implied-eval": ["warn"], // setTimeout, setInterval에 문자열 사용
        // "default-case": ["warn"] //  switch 문에 default case 누락
      }
    },
  ];