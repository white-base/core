// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
import { EventEmitter, PropertyCollection } from 'logic-core';
import Util from '../src/util.js';

test("빌드된 ESM 모듈 테스트", () => {
  
  var a = new EventEmitter();
  var b = new PropertyCollection();
  // b.$keys
  // b.map((valu))
  // b.map((value, idx))
  // b.map()

  expect(typeof EventEmitter === 'function').toBe(true);
  expect(typeof Util === 'object').toBe(true);

});