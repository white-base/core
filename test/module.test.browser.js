import {jest} from '@jest/globals';


// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
// import { EventEmitter } from 'logic-core';

// test("빌드된 ESM 모듈 테스트", () => {
//   const {EventEmitter, Util, PropertyCollection } = require('logic-core');
  
//   var a = new EventEmitter();
//   var b = new PropertyCollection();

//   expect(typeof EventEmitter === 'function').toBe(true);
//   expect(typeof Util === 'object').toBe(true);
// });


// test("빌드된 ESM 모듈 테스트", () => {
//   // const {EventEmitter, Util, PropertyCollection } = require('../dist/logic-core.js');
//   // const _L = import('../dist/logic-core.js');
//   // const {EventEmitter, Util, PropertyCollection } = _L;
//   // const {EventEmitter, Util, PropertyCollection } = import('../dist/logic-core.js');
//   // const logicCore = import('../dist/logic-core.browser.cjs');
//   const {EventEmitter, Util, PropertyCollection } = require('../dist/logic-core.browser.cjs');
  
//   // const {Message} = globalThis._L;


//   var a = new EventEmitter();
//   var b = new PropertyCollection();

//   expect(typeof EventEmitter === 'function').toBe(true);
//   expect(typeof Util === 'object').toBe(true);
// });


/**
 * 'logic-core'
 * 'dist/logic-core.esm.js' : esm  
 * 'dist/logic-core.js' : umd
 */
describe("cjs", () => {
  beforeEach(() => {
      jest.resetModules();
      jest.restoreAllMocks();
      // globalThis.isESM = true
  });
//   describe("dist/logic-core.esm.js 모듈", () => {
//       it("- 기본", async () => {
//           const { PropertyCollection } = require('../dist/logic-core.browser.cjs');
//           const { ArrayCollection } = require('../dist/logic-core.browser.cjs');
//           const p = new PropertyCollection();
//           const a = new ArrayCollection();
          
//           expect(typeof PropertyCollection === 'function').toBe(true);
//           expect(typeof ArrayCollection === 'function').toBe(true);
//       });
//   });
  describe("logic-core 모듈", () => {
      it("- 기본", async () => {
          const { PropertyCollection } = await import('logic-core');
          const { ArrayCollection } =  await import('logic-core');
          const p = new PropertyCollection();
          const a = new ArrayCollection();
          
          expect(typeof PropertyCollection === 'function').toBe(true);
          expect(typeof ArrayCollection === 'function').toBe(true);
      });
  });
  describe("logic-core 모듈", () => {
    it("- 기본", async () => {
        const { PropertyCollection } = await import('../dist/logic-core.esm.js');
        const { ArrayCollection } =  await import('../dist/logic-core.esm.js');
        const p = new PropertyCollection();
        const a = new ArrayCollection();
        
        expect(typeof PropertyCollection === 'function').toBe(true);
        expect(typeof ArrayCollection === 'function').toBe(true);
    });
});
    describe("dist/logic-core.js umd", () => {
        it("- 기본", async () => {
            await import('../dist/logic-core.js');
            // const { PropertyCollection } = await import('../dist/logic-core.js');
            // const { PropertyCollection } = require('../dist/logic-core.js');
            // const { ArrayCollection } = require('../dist/logic-core.js');
            const { PropertyCollection, ArrayCollection } = globalThis._L;
            
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
});