
// const { runCommonTests } = await import('./type2.js'); // ESM import
const { runCommonTests } = require('./type2.cjs');
// import {runCommonTests} from './type2.js'
const { Type } = require('logic-core')
// import {jest} from '@jest/globals';

describe('[Feature A] 테스트', () => {
    runCommonTests(Type);
});

