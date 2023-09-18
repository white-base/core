/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
// const ComplexElement        = require('../src/meta-element-complex');
const {IObject}               = require('../src/i-object');
const {IMarshal}              = require('../src/i-marshal');
const {IPropertyCollection}   = require('../src/i-collection-property');
const { MetaRegistry } = require('../src/meta-registry');

let MetaObjectSub, MetaElementSub, ComplexElementSub, EmpytClass;

//==============================================================
// test
describe("[target: meta-object.js, meta-element.js]", () => {
    describe("MetaObject :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
            // 클래스 정의
            MetaObjectSub = class MetaObjectSub extends MetaObject {
                constructor() { super() }
            }
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
                expect(c2.equal(10)).toBe(false);
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
            it("- instanceOf(function) : 예외 (_inteface 강제삭제) ", () => {
                const c = new MetaObjectSub();

                expect(()=> delete c._interface).toThrow(/Cannot delete property/);
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
        });
        
        describe("빈 검사", () => {
            it("- EmpytClass : 검사 ", () => {
                const c = new EmpytClass();

                expect(c.getType).not.toBeDefined();
                expect(c.getTypes).not.toBeDefined();
                expect(c.instanceOf).not.toBeDefined();
            });
        });

        describe("기타", () => {
            it("- MetaObject.__SET_guid : 내부 setter ", () => {
                const i = new MetaObject();
                i.__SET$_guid(10, i);    //
                // i.__SET_guid(10);

                expect(i._guid).toBe(10);
            });
        });
    });
    describe("MetaElement :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            MetaElementSub = class MetaElementSub extends MetaElement {
                constructor(name) { super(name) }
                // clone() {}
            }
        });
        // it("- getTypeNames() : array<string> ", () => {
        //     const c = new MetaElementSub();
        //     const typeNames = c.getTypeNames();

        //     expect(typeNames[0]).toBe('Object');
        //     expect(typeNames[1]).toBe('MetaObject');
        //     expect(typeNames[2]).toBe('MetaElement');
        //     expect(typeNames[3]).toBe('MetaElementSub');
        //     expect(typeNames.length).toBe(4);
        // });

        describe("MetaObject.getTypes() : arr<func> <타입 조회>", () => {
            it("- _type : function ", () => {
                const c = new MetaElementSub();
                const type = c._type;

                expect(type).toBe(MetaElementSub);
            });
            it("- getTypes() : array<function> ", () => {
                const c = new MetaElementSub();
                const types = c.getTypes();

                expect(types[0]).toBe(MetaElementSub);
                expect(types[1]).toBe(MetaElement);
                expect(types[2]).toBe(MetaObject);
                expect(types[3]).toBe(Object);
                expect(types.length).toBe(4);
            });
        });
        describe("MetaObject.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaElement();

                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('IMarshal')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaElement')).toBe(true);
                // false
                expect(c.instanceOf('Array')).toBe(false);
                expect(c.instanceOf('String')).toBe(false);
            });
            it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaElement();

                expect(c.instanceOf(IObject)).toBe(true);
                expect(c.instanceOf(IMarshal)).toBe(true);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaElement)).toBe(true);
                // false
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
        });
        describe("MetaElement.equal(tar): bool <객체 비교>", () => {
            it("- equal() : 비교, 거꾸로 비교 ", () => {
                const c1 = new MetaElementSub('E1');
                const c2 = new MetaElementSub('E1');
                const c3 = new MetaElementSub('E2');

                expect(c1.equal(c2)).toBe(true);
                expect(c2.equal(c1)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
                expect(c1.equal({})).toBe(false);
                expect(c1.equal(10)).toBe(false);
            });
            it("- equal() : 타입 비교", () => {
                const c1 = new MetaObject();
                const c2 = new MetaElementSub();

                expect(c1.equal(c2)).toBe(false);
                expect(c2.equal(c1)).toBe(false);
            });

        });
        describe("MetaElement.getObject(p_vOpt): fun <객체 얻기>", () => {
            it("- getObject(): fun ", () => {
                function Foo(name) {
                    MetaElement.call(this, name);
                    var _prop = 10;
                    // 포함
                    this.str = 'STR';
                    Object.defineProperty(this, 'prop',
                    {
                        get: function() { return _prop; },
                        set: function(newValue) { _prop = newValue;},
                        configurable: false,
                        enumerable: true
                    });
                    // 제외
                    this._inner = 'IN';
                }
                Util.inherits(Foo, MetaElement);
                // Foo.prototype.clone  = function() {};  // 추상 구현
                Foo.prototype.getStr  = function() {};  // 제외
                Foo.prototype.getObject = function(p_vOpt) {
                    var obj = MetaElement.prototype.getObject.call(this);
                    obj.str = this.str;
                    obj.prop = this.prop;
                    return obj;
                };
                const c = new Foo('foo');
                const obj = c.getObject();
                const comp = { _guid: obj._guid, _type: Foo.name, str: 'STR', name: 'foo', prop: 10 }

                expect(obj).toEqual(comp);
            });
            it("- getObject() : class 타입, getObjct() 오버라이딩 안함 ", () => {
                class Foo extends MetaElement {
                    // 포함
                    str = 'STR';
                    get prop() { return this.#prop }    // get 없으면 자료 못 가져옴
                    set prop(val) { this.#prop = val }
                    // 제외
                    _inner = 'IN';
                    #prop = 10;
                    constructor(name) { super(name) }
                    getStr() {}
                }
                const c = new Foo('foo');
                const obj = c.getObject();
                const comp = { _guid: obj._guid, _type: 'Meta.Foo', name: 'foo' }

                expect(obj).toEqual(comp);
            });
            it("- getObject() : Meta 속성 ", () => {
                class Bar extends MetaElement {
                    sub = true;
                    constructor() { super() }
                }
                class Foo extends MetaElement {
                    str = 'STR';
                    bar = new Bar();
                    constructor(name) { super(name) }
                    getStr() {}
                    getObject() {
                        let obj = super.getObject();
                        obj.str = this.str;
                        obj.bar = this.bar.getObject();
                        return obj;
                    }
                }
                const c = new Foo('foo');
                const obj = c.getObject();
                const comp = { _guid: obj._guid, _type: 'Meta.Foo', str: 'STR', name: 'foo', bar: {
                    _guid: obj.bar._guid, _type: 'Meta.Bar', name: ''
                } };

                expect(obj).toEqual(comp);
            });
        });
        describe("MetaElement.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const m1 = new MetaElement();
                const obj = m1.getObject();
                const m2 = new MetaElement();
                m2.setObject(obj);

                expect(m1 !== m2).toBe(true);
                expect(m1._guid !== m2._guid).toBe(true);
                expect(m1._type === m2._type).toBe(true);
                expect(m1._name === m2._name).toBe(true);
            });
        });
        describe("예외", () => {
            it("- 예외 : _name, guid ", () => {
                const i = new MetaElement('_name');

                expect(()=> i._name = 10).toThrow('ES021');
                expect(()=> i._guid = 10).toThrow(/Cannot set property _guid of/); // 직접 설정할 경우는 없음
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