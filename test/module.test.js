//==============================================================
// gobal defined
import { jest } from '@jest/globals';

//==============================================================
/**
 * 'logic-core'
 * 'dist/logic-core.esm.js'
 */
describe("esm", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        globalThis.isESM = true
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
});
