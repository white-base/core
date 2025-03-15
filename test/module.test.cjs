// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
// import { EventEmitter } from 'logic-core';
const {EventEmitter, Util, PropertyCollection } = require('logic-core');

test("빌드된 ESM 모듈 테스트", () => {
  var a = new EventEmitter();
  var b = new PropertyCollection();

  expect(typeof EventEmitter === 'function').toBe(true);
  expect(typeof Util === 'object').toBe(true);
});