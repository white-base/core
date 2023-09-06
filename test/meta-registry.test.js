/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {MetaRegistry}        = require('../src/meta-registry');
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');

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
        describe("MetaRegistry.init() <초기화>", () => {
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
        describe("MetaRegistry.register() <메타객체 등록>", () => {
            it("- register() : 메타객체 등록 ", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.release() <해제>", () => {
            it("- release() : 해제 ", () => {
                let i = new MetaObject();
                
                // 등록 [자동]
                // MetaRegistry.register(i);
                expect(MetaRegistry.count).toBe(1);
                // 해제
                MetaRegistry.release(i);
                // expect(MetaRegistry.count).toBe(0);
            });

        });
        describe("MetaRegistry.has(meta) <메타객체 여부>", () => {
            it("- has() : 메타객체 여부 검사 ", () => {
                // TODO:
            });
        });
        describe.only("MetaRegistry.find() <메타객체 조회>", () => {
            it("- find(meta, caller) : 메타객체 조회 호출처", () => {
                let m1 = new MetaElement();
                let m2 = new MetaElement();
                const i1 = MetaRegistry.find(m1);
                const i2 = MetaRegistry.find(m1, m2);
                
                expect(i1).toBe(i1);
                expect(i2).toBe(i1);
                expect(MetaRegistry.count).toBe(2);
            });
        });
        describe("MetaRegistry.createMetaObject() <메타객체 생성>", () => {
            it("- createMetaObject() : 메타객체 생성", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.createReferObject() <참조객체 생성>", () => {
            it("- register() : 메타객체 등록 ", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.createNsReferObject() <네임스페이스 객체 생성>", () => {
            it("- createNsRefer() : 네임스페이스 객체 생성", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.validObject() <메태객체 유효성 검사>", () => {
            it("- valid() : 유효성 검사", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.isGuidObject() <guid 객체 여부 감사>", () => {
            it("- isGuidObject() : guid 객체 여부 검사", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.hasRefer(obj) <참조객체 여부>", () => {
            it("- hasRefer() : 참조객체 여부 ", () => {
                let i = new MetaObject();
                let obj1 = i.getObject();
                let obj2 = i.getObject();
                obj1.obj = MetaRegistry.createReferObject(obj2);    // 강제 참조 생성
    
                expect(MetaRegistry.hasRefer(obj1)).toBe(true);
                expect(MetaRegistry.hasRefer(obj2)).toBe(false);
            });
        });
        describe("MetaRegistry.transformRefer() <참조 객체 변환>", () => {
            it("- transformRefer() : $ref, $ns 참조로 변환", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.registerClass() <클래스 등록>", () => {
            it("- registerClass() : ns에 클래스 등록", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.releaseClass() <클래스 해제>", () => {
            it("- releaseClass() : ns에서 클래스 해제", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.findClass() <클래스 조화>", () => {
            it("- findClass() : ns에서 클래스 조회", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.getClass() <클래스 얻기>", () => {
            it("- getClass() : ns에서 클래스 얻기 ", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.loading() <로드>", () => {
            it("- loading() : 로드", () => {
                // TODO:
            });
        });
    });
    
});
