module.exports = {
    //collectCoverageFrom: ['**/*.[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.mjs$": "babel-jest"
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
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
};