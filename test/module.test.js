//==============================================================
// gobal defined
import {jest} from '@jest/globals';

// import { EventEmitter } from "../dist/node/logic-core.cjs";
// import { EventEmitter } from "../dist/esm/logic-core";
// import { EventEmitter } from "../index.js";
// import { EventEmitter, PropertyCollection, Type, ExtendError, MetaElement} from 'logic-core';
// import { MetaRegistry} from 'logic-core';
// import Util from '../src/util.js';

// test("빌드된 ESM 모듈 테스트", () => {
  
//   var a = new EventEmitter();
//   var b = new PropertyCollection();
//   var c = new MetaElement('cc');
//   // b.$keys
//   // b.map((valu))
//   // b.map((value, idx))
//   // Type.deepEqual(2,3)
//   var e = new ExtendError()

//   c.getObject()
//   c.instanceOf()
//   // MetaRegistry.register()

//   expect(typeof EventEmitter === 'function').toBe(true);
//   expect(typeof Util === 'object').toBe(true);

// });

//==============================================================
// test

/**
 * 'dist/logic-core.esm.js'
 * 'logic-core' >> index.js
 */
describe("esm", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        globalThis.isESM = true
    });
    describe("dist/logic-core.esm.js 모듈", () => {
        it("- 기본", async () => {
            const { PropertyCollection } = await import('../dist/logic-core.esm.js');
            const { ArrayCollection } = await import('../dist/logic-core.esm.js');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
    describe("logic-core 모듈", () => {
        it("- 기본", async () => {
            const { PropertyCollection } = await import('logic-core');
            const { ArrayCollection } = await import('logic-core');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
});
