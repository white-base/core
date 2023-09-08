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
        describe("MetaRegistry.register() <메타객체 등록>", () => {
            it("- register() : 자동등록", () => {
                const m1 = new MetaElement('E1');
                const m2 = new MetaElement('E2');

                // 자동 등록
                expect(MetaRegistry.count).toBe(2);
            });
            it("- register() : 수동등록 ", () => {
                class CustomClass1 {
                    _guid = 'KEY1';             // 필수
                    _type = CustomClass1;       // 필수
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                // 등록전
                expect(MetaRegistry.count).toBe(0);
                // 등록후
                MetaRegistry.register(c1);
                expect(MetaRegistry.count).toBe(1);
            });
            it("- register() : 예외 ", () => {
                class CustomClass1 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                expect(()=> MetaRegistry.register(c1)).toThrow(/_type.*_guid/);                
            });
        });
        describe("MetaRegistry.release() <해제>", () => {
            it("- release() : 해제(자동등록) ", () => {
                let m1 = new MetaObject();
                let m2 = new MetaObject();
                
                // 등록 [자동]
                expect(MetaRegistry.count).toBe(2);
                // 해제
                MetaRegistry.release(m1);
                MetaRegistry.release(m2._guid);
                expect(MetaRegistry.count).toBe(0);
            });
        });
        describe("MetaRegistry.init() <초기화>", () => {
            it("- init() : 초기화 ", () => {
                let i = new MetaObject();
    
                // 등록 조회
                expect(MetaRegistry.count).toBe(1);
                MetaRegistry.init();
                //초기화 후 조회
                expect(MetaRegistry.count).toBe(0);
            });
        });
        describe("MetaRegistry.has(meta) <메타객체 여부>", () => {
            it("- has() : 메타객체 여부 검사 ", () => {
                let m1 = new MetaObject();
                let m2 = new MetaObject();
                class CustomClass1 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                expect(MetaRegistry.has(m1)).toBe(true);
                expect(MetaRegistry.has(m2)).toBe(true);
                expect(MetaRegistry.has(c1)).toBe(false);
            });
        });
        describe("MetaRegistry.find() <메타객체 조회>", () => {
            it("- find(meta) : 객체로 조회, guid로 조회 ", () => {
                let m1 = new MetaElement('M1');
                let m2 = new MetaElement('M2');
                const f1 = MetaRegistry.find(m1);
                const f2 = MetaRegistry.find(m2._guid);
                
                expect(f1 === m1).toBe(true);
                expect(f2 === m2).toBe(true);
                expect(MetaRegistry.count).toBe(2);
            });
        });
        describe("MetaRegistry.isMetaObject() <메타객체 여부>", () => {
            it("- isMetaObject() : MetaElement, guid 미정의, guid 정의", () => {
                const m1 = new MetaObject();
                class CustomClass1 {
                    _guid = 'KEY1';             // 필수
                    _type = CustomClass1;       // 필수
                    name = 'User1'
                }
                class CustomClass2 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();
                const c2 = new CustomClass2();

                expect(MetaRegistry.isMetaObject(m1)).toBe(true);
                expect(MetaRegistry.isMetaObject(c1)).toBe(true);
                expect(MetaRegistry.isMetaObject(c2)).toBe(false);
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
        describe("MetaRegistry.findSetObject(mObj, target) <guid로 생성한 객체 조회>", () => {
            it("- findSetObject() : 객체 검색", () => {
                let m1 = new MetaElement('M1');
                let m2 = new MetaElement('M2');
                let m3 = new MetaElement('M3');
                var rObj = m1.getObject();
                
                // $set 설정한 객체가 없는 경우                
                // REVIEW: guid 타입만 가능한게 맞는건지?
                // var obj = MetaRegistry.findSetObject(rObj, m1._guid);
                var obj = MetaRegistry.findSetObject(rObj, m1.getObject());
                expect(obj).toBe(undefined);
                // $set 설정한 객체가 있는 경우                
                rObj.$set = m2._guid;
                var obj = MetaRegistry.findSetObject(rObj, m1.getObject());
                expect(obj === m2).toBe(true);
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
