//==============================================================
// gobal defined
import Util from '../src/util';
import Type from '../src/type';
import MetaObject from '../src/meta-object';
import MetaElement from '../src/meta-element';
import IObject from '../src/i-object';
import MetaRegistry from '../src/meta-registry';
import {jest} from '@jest/globals';

let MetaObjectSub, MetaElementSub, ComplexElementSub, EmpytClass;

//==============================================================
// test
describe("[target: meta-object.js]", () => {
    describe("MetaObject :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
            // 클래스 정의
            MetaObjectSub = class MetaObjectSub extends MetaObject {
                constructor() { super() }
            }
            MetaObjectSub._NS = ''
            EmpytClass = class EmpytClass {};
        });
        // it("- getTypeNames() : array<string> ", () => {
        //     const c = new MetaObjectSub();
        //     const typeNames = c.getTyps();
  
        //     expect(typeNames[0]).toBe('Object');
        //     expect(typeNames[1]).toBe('MetaObject');
        //     expect(typeNames[2]).toBe('MetaObjectSub');
        //     expect(typeNames.length).toBe(3);
        // });   
        describe("MetaObject._type: fun <타입>", () => {
            it("- _type : function ", () => {
                const c = new MetaObjectSub();
                const type = c._type;

                expect(type).toBe(MetaObjectSub);
            });
            it("- _type : 커버리지 ", () => {
                const c = new MetaObjectSub();
                c.__proto__ = null

                expect(()=> c._type).toThrow(/constructor/)
            });
            it("- _KIND : 커버리지 ", () => {
                class MetaObjectA extends MetaObject {
                    constructor() { super() }
                }
                MetaObjectA._KIND = 'abstract'
                class MetaObjectB extends MetaObject {
                    constructor() { super() }
                }
                MetaObjectB._KIND = 'etc'

                var obj01 = new MetaObjectB()

                expect(()=> new MetaObjectA).toThrow(/EL03111/)
                // expect(()=> new MetaObjectB).toThrow(/ES018/)
            });
        });
        describe("MetaObject.guid: str <GUID 얻기>", () => {
            it("- this.guid ", () => {
                const c1 = new MetaObjectSub();
                const c2 = new MetaObjectSub();
                const guid1 = c1._guid;
                const guid2 = c1._guid;
                const guid3 = c2._guid;

                expect(guid1.length).toBe(36);
                expect(guid2.length).toBe(36); // guid 길이
                expect(guid1).toBe(guid2);
                expect(guid1).not.toBe(guid3);
            });
        });
        describe("MetaObject.equal(tar): bool <객체 비교>", () => {
            it("- equal() : 비교, 거꾸로 비교 ", () => {
                const c1 = new MetaObjectSub();
                const c2 = new MetaObjectSub();

                expect(c1.equal(c2)).toBe(true);
                expect(c2.equal(c1)).toBe(true);
                expect(c2.equal({})).toBe(false);
                // expect(c2.equal(10)).toBe(false);
            });
            it("- equal() : 외부 객체 비교, 객체 비교 ", () => {
                var meta1 = new MetaObject();
                var meta2 = new MetaObject();
                var obj1 = {a: 1};
                var obj2 = {a: 1};
                
                expect(meta1.equal(meta1)).toBe(true);
                expect(meta1.equal(meta2)).toBe(true);
                expect(meta2.equal(meta1)).toBe(true);
                expect(meta1 === meta2).toBe(false);
                // expect(meta1.equal(obj1, obj2)).toBe(true);
                expect(Type.deepEqual(obj1, obj2)).toBe(true);
            });
        });
        
        describe("MetaObject.getTypes() : arr<func> <타입 조회>", () => {
            it("- getTypes() : array<function> ", () => {
                const c = new MetaObjectSub();
                const types = c.getTypes();

                expect(types[0]).toBe(MetaObjectSub);
                expect(types[1]).toBe(MetaObject);
                expect(types[2]).toBe(Object);
                expect(types.length).toBe(3);
            });
        });
        describe("MetaObject.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaObjectSub();

                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaObjectSub')).toBe(true);
                // false
                expect(c.instanceOf('Array')).toBe(false);
                expect(c.instanceOf('String')).toBe(false);
            });
            it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaObjectSub();

                expect(c.instanceOf(IObject)).toBe(true);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaObjectSub)).toBe(true);
                // false
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
            it.skip("- instanceOf(function) : 예외 (_inteface 강제삭제) ", () => {
                const c = new MetaObjectSub();

                // expect(()=> delete c._interface).toThrow(/Cannot delete property/);
                expect(()=> delete c._UNION).toThrow(/Cannot delete property/);
            });
            it("- instanceOf(?) : 커버리지  ", () => {
                const c = new MetaObjectSub();

                expect(c.instanceOf(10)).toBe(false)
            });
        });

        describe("MetaObject.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 직렬화 객체 얻기 ", () => {
                const c = new MetaObjectSub();
                const obj = c.getObject();

                expect(typeof obj._type === 'string').toBe(true);
                expect(typeof obj._guid === 'string').toBe(true);
            });
        });
        describe("MetaObject.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const m1 = new MetaObjectSub();
                const m2 = new MetaObjectSub();
                const m3 = new MetaObject();
                const obj = m1.getObject();

                const s1 = m2.setObject(obj);
                // const s2 = m3.setObject(obj);

                expect(m1 !== m2).toBe(true);
                expect(m1._guid !== m2._guid).toBe(true);
                expect(m1._type === m2._type).toBe(true);
                // expect(m1._guid !== m3._guid).toBe(true);
                // expect(m1._type !== m3._type).toBe(true);
            });
            it.skip("- setObject() : 직렬화 객체 설정 ", () => {
                const m1 = new MetaObjectSub();
                const mr = MetaRegistry;

                expect(m1 !== m2).toBe(true);
            });
            it("- setObject() : 예외 ", () => {
                const m1 = new MetaObject();
                const m2 = new MetaObject();
                const m3 = new MetaElement('E3');
                const m4 = new MetaElement('E4');
                const m5 = new MetaObjectSub('E5');
                const m6 = new MetaObjectSub('E6');
                const obj1 = m1.getObject();
                const obj3 = m3.getObject();
                const obj5 = m5.getObject();
                m6.setObject(obj5)

                expect(()=> m2.setObject(-1)).toThrow(/EL03112/)
                expect(()=> m4.setObject(obj3, {})).toThrow(/EL03114/)
                expect(()=> m2.setObject(obj3)).toThrow(/EL03113/)
            });
            it("- setObject() : 커버리지 ", () => {
                const m1 = new MetaObject();
                const m2 = new MetaObject();
                const obj1 = m1.getObject();
                obj1.__TRANSFORM_REFER = true;
                m2.setObject(obj1)

                expect(m1 !== m2).toBe(true);
            });
        });
        
        describe("빈 검사", () => {
            it("- EmpytClass : 검사 ", () => {
                const c = new EmpytClass();

                expect(c.getType).not.toBeDefined();
                expect(c.getTypes).not.toBeDefined();
                expect(c.instanceOf).not.toBeDefined();
            });
        });

        describe("예외 및 커버리지", () => {
            it("- MetaObject.__SET_guid : 내부 setter ", () => {
                const i = new MetaObject();
                
                i._guid = 10
                expect(i._guid).toBe(10);
                i._guid = 20
                expect(i._guid).toBe(20);
            });
            it("- MetaObject.__compare() : 내부 비교 ", () => {
                const i = new MetaObject();
                
                // expect(i.__compare(1, 10)).toBe(false);
                // expect(i.__compare({aa: 1}, {aa:1})).toBe(true);
                // expect(i.__compare({aa: 1}, {aa:2})).toBe(false);
                expect(i.equal(10)).toBe(false);
                // expect(i.equal({aa: 1}, {aa:1})).toBe(true);
                // expect(i.equal({aa: 1}, {aa:2})).toBe(false);
            });
        });
    });
});

// describe("< MetaComplexElement >", () => {
//     beforeAll(() => {
//         jest.resetModules();
//         // 클래스 정의
//         ComplexElementSub = class ComplexElementSub extends ComplexElement {
//             constructor(name) { super(name) }
//         }
//     });
//     // it("- getTypeNames() : array<string> ", () => {
//     //     const c = new ComplexElementSub();
//     //     const typeNames = c.getTypeNames();

//     //     expect(typeNames[0]).toBe('Object');
//     //     expect(typeNames[1]).toBe('MetaObject');
//     //     expect(typeNames[2]).toBe('MetaElement');
//     //     expect(typeNames[3]).toBe('ComplexElement');
//     //     expect(typeNames[4]).toBe('ComplexElementSub');
//     //     expect(typeNames.length).toBe(5);
//     // });
//     // it("- _type : function ", () => {
//     //     const c = new ComplexElementSub();
//     //     const type = c._type;

//     //     expect(type).toBe(ComplexElementSub);
//     // });
//     it("- getTypes() : array<function> ", () => {
//         const c = new ComplexElementSub();
//         const types = c.getTypes();

//         expect(types[0]).toBe(ComplexElementSub);
//         expect(types[1]).toBe(ComplexElement);
//         expect(types[2]).toBe(MetaElement);
//         expect(types[3]).toBe(MetaObject);
//         expect(types[4]).toBe(Object);
//         expect(types.length).toBe(5);
//     });
//     it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
//         const c = new ComplexElementSub();

//         expect(c.instanceOf('IObject')).toBe(true);
//         expect(c.instanceOf('IMarshal')).toBe(true);
//         expect(c.instanceOf('IPropertyCollection')).toBe(true);
//         expect(c.instanceOf('Object')).toBe(true);
//         expect(c.instanceOf('MetaObject')).toBe(true);
//         expect(c.instanceOf('MetaElement')).toBe(true);
//         expect(c.instanceOf('ComplexElement')).toBe(true);
//         expect(c.instanceOf('ComplexElementSub')).toBe(true);
//         // false
//         expect(c.instanceOf('Array')).toBe(false);
//         expect(c.instanceOf('String')).toBe(false);
//     });
//     it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
//         const c = new ComplexElementSub();

//         expect(c.instanceOf(IObject)).toBe(true);
//         expect(c.instanceOf(IMarshal)).toBe(true);
//         expect(c.instanceOf(IPropertyCollection)).toBe(true);
//         expect(c.instanceOf(Object)).toBe(true);
//         expect(c.instanceOf(MetaObject)).toBe(true);
//         expect(c.instanceOf(MetaElement)).toBe(true);
//         expect(c.instanceOf(ComplexElement)).toBe(true);
//         expect(c.instanceOf(ComplexElementSub)).toBe(true);
//         // false
//         expect(c.instanceOf(Array)).toBe(false);
//         expect(c.instanceOf(String)).toBe(false);
//     });
// });