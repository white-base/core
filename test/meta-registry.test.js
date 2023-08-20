/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {MetaRegistry}        = require('../src/meta-registry');
const {MetaObject}            = require('../src/meta-object');

//==============================================================
// test
describe("[target: meta-registry.js]", () => {
    describe("MetaReistry :: 클래스(static)", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
        });
        it("- 초기값 조회 ", () => {
            expect(MetaRegistry.count).toBe(0);
        });
        it("- register(), release() : 등록/해제 ", () => {
            let i = new MetaObject();
            
            // 등록
            MetaRegistry.register(i);
            expect(MetaRegistry.count).toBe(1);
            // 해제
            MetaRegistry.release(i);
            // expect(MetaRegistry.count).toBe(0);
        });
        it("- init() : 초기화 ", () => {
            // const aa = MetaRegistry;
            let i = new MetaObject();
            MetaRegistry.register(i);
            // 등록 조회
            expect(MetaRegistry.count).toBe(1);
            MetaRegistry.init();
            //초기화 후 조회
            expect(MetaRegistry.count).toBe(0);
        });
    });
    
});
