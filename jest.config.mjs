export default {
    //collectCoverageFrom: ['**/*.[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
    // transform: {
    //   "^.+\\.js$": "babel-jest",
    //   "^.+\\.mjs$": "babel-jest"
    // },
    // moduleNameMapper: {
    //   "^(\\.{1,2}/.*)\\.js$": "$1",
    // },
    // moduleNameMapper: {
    //   "^(.*)\\.js$": "$1.cjs" // .js 파일을 .cjs로 변환하여 CommonJS 환경에서 실행
    // },
    collectCoverageFrom: ['src/*.js', '!src/_*.js'],
    // testMatch: ['<rootDir>/test/*.js', '<rootDir>/test/*.cjs', '!<rootDir>/test/**/_*.js'],
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
    // transform: {}, // ✅ Jest가 .js 파일을 변환하지 않도록 설정
    // testEnvironment: "node",
    // moduleNameMapper: {
    //   "^(.*)\\.js$": "$1.cjs" // .js 파일을 .cjs로 변환하여 CommonJS 환경에서 실행
    // },
    projects: [
      {
        displayName: "CommonJS",
        testEnvironment: "node",
        testMatch: ["**/test/*.test.cjs"],
      },
      {
        displayName: "ES Module",
        testEnvironment: "node",
        testMatch: ["**/test/*.test.mjs"],
        transform: {
          "^.+\\.js$": "babel-jest",
          "^.+\\.mjs$": "babel-jest"
        },
      },
      {
        displayName: "Browser",
        testEnvironment: "jsdom",
        // transform: {
        //   "^.+\\.js$": "babel-jest",
        //   "^.+\\.mjs$": "babel-jest"
        // },
        testMatch: ["**/test/*.test.dom.cjs", "**/test/*.test.browser.cjs"],
      },
    ],
};