//==============================================================
// gobal defined
const fs = require('fs');
const path = require('path');

//==============================================================
/**
 * 'logic-core'
 * 'dist/logic-core.node.cjs'
 * 'dist/logic-core.js' : umd
 */
describe("cjs", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        process.env.LANG = 'en_US.UTF-8';
    });
    describe("logic-core 모듈", () => {
        it("- 기본", async () => {
            process.env.LANG = 'ko_KR.UTF-8';

            const { PropertyCollection, ArrayCollection, Message } = require('logic-core');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
    describe("dist/logic-core.node.cjs 모듈", () => {
        it("- 기본", async () => {
            const { PropertyCollection, ArrayCollection } = require('../dist/logic-core.node.cjs');
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
    describe("dist/logic-core.js umd", () => {
        it("- script 실행", () => {
            const umdCode = fs.readFileSync(path.resolve(__dirname, '../dist/logic-core.js'), 'utf8');
            const script = new Function('global', umdCode + '; return global._L;');
            globalThis._L = script(global);
            const { PropertyCollection, ArrayCollection } = _L;
            const p = new PropertyCollection();
            const a = new ArrayCollection();
            
            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
        it("- require", async () => {
            await import('../dist/logic-core.js');
            const { PropertyCollection, ArrayCollection } = globalThis._L;

            expect(typeof PropertyCollection === 'function').toBe(true);
            expect(typeof ArrayCollection === 'function').toBe(true);
        });
    });
});