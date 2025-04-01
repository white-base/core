// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
// import { EventEmitter } from 'logic-core';
// const {EventEmitter, Util, PropertyCollection } = require('logic-core');

// test("빌드된 ESM 모듈 테스트", () => {
//   var a = new EventEmitter();
//   var b = new PropertyCollection();

//   expect(typeof EventEmitter === 'function').toBe(true);
//   expect(typeof Util === 'object').toBe(true);
// });



/**
 * 'dist/logic-core.node.cjs'
 * 'logic-core'
 */
describe("cjs", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        // globalThis.isESM = true
        
    });
    describe("logic-core 모듈", () => {
      it("- 기본", async () => {
          const { PropertyCollection } = require('logic-core');
          const { ArrayCollection } = require('logic-core');
          const p = new PropertyCollection();
          const a = new ArrayCollection();
          
          expect(typeof PropertyCollection === 'function').toBe(true);
          expect(typeof ArrayCollection === 'function').toBe(true);
      });
  });
  describe("dist/logic-core.esm.js 모듈", () => {
      it("- 기본", async () => {
          const { PropertyCollection } = require('../dist/logic-core.node.cjs');
          const { ArrayCollection } = require('../dist/logic-core.node.cjs');
          const p = new PropertyCollection();
          const a = new ArrayCollection();
          
          expect(typeof PropertyCollection === 'function').toBe(true);
          expect(typeof ArrayCollection === 'function').toBe(true);
      });
  });
    describe.skip("dist/logic-core.js 모듈", () => {
      it("- 기본", async () => {
        // const { PropertyCollection } = await import('../dist/logic-core.js');
        

        // await import('../dist/logic-core.js');
        
        // const { PropertyCollection } = require('../dist/logic-core.js');
          // const { ArrayCollection } = require('../dist/logic-core.js');
          
          
          const p = new PropertyCollection();
          const a = new ArrayCollection();
          
          expect(typeof PropertyCollection === 'function').toBe(true);
          expect(typeof ArrayCollection === 'function').toBe(true);
      });
  });
    
});