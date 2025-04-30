//==============================================================
// gobal defined
// import { PropertyCollection, ArrayCollection } from '../index.js';

// import { PropertyCollection } from '../src/collection-property.js';
// import { ArrayCollection } from '../src/collection-array.js';
// import { PropertyCollection } from 'logic-core/ko';
import { ArrayCollection } from 'logic-core/ko';
import { jest } from '@jest/globals';

//==============================================================
/**
 * 'logic-core'
 * 'dist/logic-core.esm.js'
 */
describe("index", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        // globalThis.isESM = true
    });
    describe("logic-core 모듈", () => {
        it("- 기본", async () => {
            // const p = new PropertyCollection();
            const a = new ArrayCollection();
            // const b = new ArrayCollection();
            a.add('a', 'aa');
            // a
            // a.
            // a.
            // expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
});
