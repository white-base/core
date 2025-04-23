export default {
    collectCoverageFrom: ['src/*.js', '!src/_*.js', '!src/*.bundle.js'], 
    projects: [
      {
        displayName: "CommonJS",
        testEnvironment: "node",
        testMatch: ["**/test/*.test.cjs"],
        // transform: {},
      },
      {
        displayName: "ES Module",
        testEnvironment: "node",
        testMatch: ["**/test/**/*.test.js"],
      },
      {
        displayName: "Browser",
        testEnvironment: "jsdom",
        testMatch: ["**/test/*.test.browser.js", "**/test/*.test.browser.cjs"],
      },
      {
        displayName: "Typescript",
        testEnvironment: "node",
        preset: 'ts-jest/presets/default-esm',
        testMatch: ["**/test/*.test.ts"],
        transform: {
          '^.+\\.ts$': 'ts-jest'
        },
      },
    ],
};
