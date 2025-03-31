// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
// import { EventEmitter } from 'logic-core';

test("빌드된 ESM 모듈 테스트", () => {
  const {EventEmitter, Util, PropertyCollection } = require('logic-core');
  
  var a = new EventEmitter();
  var b = new PropertyCollection();

  expect(typeof EventEmitter === 'function').toBe(true);
  expect(typeof Util === 'object').toBe(true);
});


test("빌드된 ESM 모듈 테스트", () => {
  // const {EventEmitter, Util, PropertyCollection } = require('../dist/logic-core.js');
  // const _L = import('../dist/logic-core.js');
  // const {EventEmitter, Util, PropertyCollection } = _L;
  // const {EventEmitter, Util, PropertyCollection } = import('../dist/logic-core.js');
  const logicCore = import('../dist/logic-core.browser.cjs');
  
  // const {Message} = globalThis._L;


  var a = new EventEmitter();
  var b = new PropertyCollection();

  expect(typeof EventEmitter === 'function').toBe(true);
  expect(typeof Util === 'object').toBe(true);
});