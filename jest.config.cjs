module.exports = {
    //collectCoverageFrom: ['**/*.[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
    // transform: {
    //   "^.+\\.js$": "babel-jest",
    //   "^.+\\.mjs$": "babel-jest"
    // },
    // moduleNameMapper: {
    //   "^(\\.{1,2}/.*)\\.js$": "$1",
    // },
    collectCoverageFrom: ['src/*.js', '!src/_*.js'],
    testMatch: ['<rootDir>/test/*.js', '<rootDir>/test/*.cjs', '!<rootDir>/test/**/_*.js'],
    //testSequencer: './custom-sequencer.js',
    /*
    coverageThreshold: {
        './src/': {
          statements: 95,
          branches: 90,
          functions: 95,
          lines: 90,
        },
      },
    */
    projects: [
      {
          displayName: "CJS",
          testEnvironment: "node",
          testMatch: ["**/test/*.test.cjs", "**/test/*.cjs.test.js"],
      },
      {
          displayName: "ESM",
          testEnvironment: "node",
          testMatch: ["**/test/*.test.js"],
          transform: {
            "^.+\\.js$": "babel-jest",
            "^.+\\.mjs$": "babel-jest"
          },
          // extensionsToTreatAsEsm: [".js", ".mjs"],
      },
      {
          displayName: "Browser (JSDOM)",
          testEnvironment: "jsdom",
          testMatch: ["**/test/*.dom.test.js", "**/test/*.browser.test.js"],
      },
    ],
};