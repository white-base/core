//==============================================================
// gobal defined
import {jest} from '@jest/globals';

//==============================================================
/**
 * 'logic-core'
 * 'dist/logic-core.esm.js' : esm  
 * 'dist/logic-core.js' : umd
 */
describe("cjs", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        globalThis.isDOM = true;
    });
    describe("logic-core 모듈", () => {
        it("- 기본", async () => {
            const { PropertyCollection, ArrayCollection } = await import('logic-core');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
    describe("dist/logic-core.esm.js 모듈", () => {
        it("- 기본", async () => {
            const { PropertyCollection, ArrayCollection } = await import('../dist/logic-core.esm.js');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
    describe("dist/logic-core.js 모듈", () => {
        it("- 전역 _L 에 import", async () => {
            await import('../dist/logic-core.js');
            const { PropertyCollection, ArrayCollection } = globalThis._L;
            
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
});