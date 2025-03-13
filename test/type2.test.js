
// const { runCommonTests } = require('./commonTests');
import {runCommonTests} from './type2.cjs'
import Type from '../src/type';
import {jest} from '@jest/globals';

describe('[Feature A] 테스트', () => {
    runCommonTests(Type);
});

