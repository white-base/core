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
    describe("MetaRegistry :: 클래스(static)", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
        });
        it("- 초기값 조회 ", () => {
            expect(MetaRegistry.count).toBe(0);
        });
        describe("this.release() <등록/해제>", () => {
            it("- release() : 등록/해제 ", () => {
                let i = new MetaObject();
                
                // 등록 [자동]
                // MetaRegistry.register(i);
                expect(MetaRegistry.count).toBe(1);
                // 해제
                MetaRegistry.release(i);
                // expect(MetaRegistry.count).toBe(0);
            });

        });
        describe("this.init() <초기화>", () => {
            it("- init() : 초기화 ", () => {
                let i = new MetaObject();
                // MetaRegistry.register(i);
    
                // 등록 조회
                expect(MetaRegistry.count).toBe(1);
                MetaRegistry.init();
                //초기화 후 조회
                expect(MetaRegistry.count).toBe(0);
            });
        });
        describe("this.hasReferObject() <참조객체 여부>", () => {
            it("- hasReferObject() : 참조객체 여부 ", () => {
                let i = new MetaObject();
                let obj1 = i.getObject();
                let obj2 = i.getObject();
                obj1.obj = MetaRegistry.createReferObject(obj2);    // 강제 참조 생성
    
                expect(MetaRegistry.hasReferObject(obj1)).toBe(true);
                expect(MetaRegistry.hasReferObject(obj2)).toBe(false);
            });
        });
        // describe("this.ns <네임스페이스 여부>", () => {
        //     it("- ns.get() : 네임스페이스 조회 ", () => {
        //         let i = new MetaObject();
        //         let i2 = new MetaObject();
        //         const nsMgr = MetaRegistry.ns;
               
        //         expect(nsMgr.get('MetaObject')).toBe(MetaObject);
        //     });
        // });
    });
    
});
