/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const { NamespaceManager }      = require('../src/namespace-manager');

//==============================================================
// test
describe("[target: namespace-manager.js]", () => {
    describe("NamespaceManager :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        // it("- 초기값 조회 ", () => {
        //     const app = new NamespaceManager();
        //     const ns = {};

        //     expect(app.namespace).toEqual(ns);
        // });
        // 블럭
        describe("this.register(ns) <네임스페이스 등록>", () => {
            it("- register() : 등록 ", () => {
                const app = new NamespaceManager();
                app.register('aa.bb');
                let ns = app.namespace;     // 참조기능 없음

                expect(app.aa.bb).toBeDefined();
                expect(app.namespace.aa.bb).toBeDefined();
                expect(ns.aa.bb).toBeDefined();
            });
            it("- register() : 금지어 등록 ", () => {
                const app = new NamespaceManager();
                app.register('ns.aa');
    
                // expect(ns.aa).toBeDefined();
                expect(app.aa).toBeDefined();
            });

        });
        /**
         * REVIEW: 이슈
         * - ns.namespace 의 참조 기능이 안된다.
         * - namespace 오버사이클이 많다.
         */

        // it("- init() : 초기화 ", () => {
        //     let i = new MetaObject();
        //     MetaRegistry.register(i);

        //     // 등록 조회
        //     expect(MetaRegistry.count).toBe(1);
        //     MetaRegistry.init();
        //     //초기화 후 조회
        //     expect(MetaRegistry.count).toBe(0);
        // });
        // it("- hasReferObject() : 참조객체 여부 ", () => {
        //     let i = new MetaObject();
        //     let obj1 = i.getObject();
        //     let obj2 = i.getObject();
        //     obj1.obj = MetaRegistry.createReferObject(obj2);    // 강제 참조 생성

        //     // 등록 조회
        //     expect(MetaRegistry.hasReferObject(obj1)).toBe(true);
        //     expect(MetaRegistry.hasReferObject(obj2)).toBe(false);
        // });
    });
    
});
