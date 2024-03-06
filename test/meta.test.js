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
                expect(c2.equal(10)).toBe(false);
            });
            it("- equal() : 외부 객체 비교, 객체 비교 ", () => {
                var meta1 = new MetaObject();
                var meta2 = new MetaObject();
                var obj1 = {a: 1};
                var obj2 = {a: 1};
                
                expect(meta1.equal(meta2)).toBe(true);
                expect(meta2.equal(meta1)).toBe(true);
                expect(meta1 === meta2).toBe(false);
                // expect(meta1.equal(obj1, obj2)).toBe(true);
                expect(Util.deepEqual(obj1, obj2)).toBe(true);
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
                
                i.__SET$_guid(10, i);
                expect(i._guid).toBe(10);
                i.__SET$_guid(20);
                expect(i._guid).toBe(10);
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
                const c = new MetaElementSub('C');
                const type = c._type;

                expect(type).toBe(MetaElementSub);
            });
            it("- getTypes() : array<function> ", () => {
                const c = new MetaElementSub('C');
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
                const c = new MetaElement('C');

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
                const c = new MetaElement('C');

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
                const c2 = new MetaElementSub('C2');

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
                        set: function(nVal) { _prop = nVal;},
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
                    constructor(name) { super(name) }
                }
                class Foo extends MetaElement {
                    str = 'STR';
                    bar = new Bar('B1');
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
                    _guid: obj.bar._guid, _type: 'Meta.Bar', name: 'B1'
                } };

                expect(obj).toEqual(comp);
            });
        });
        describe("MetaElement.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const m1 = new MetaElement('E1');
                const obj = m1.getObject();
                const m2 = new MetaElement('E2');
                m2.setObject(obj);

                expect(m1 !== m2).toBe(true);
                expect(m1._guid !== m2._guid).toBe(true);
                expect(m1._type === m2._type).toBe(true);
                expect(m1._name === m2._name).toBe(true);
            });
        });
        describe("MetaElement.clone() <객체 복제>", () => {
            it("- setObject()  ", () => {
                const m1 = new MetaElement('E1');
                const m2 = m1.clone();

                expect(m1 !== m2).toBe(true);
                expect(m1._guid !== m2._guid).toBe(true);
                expect(m1._type === m2._type).toBe(true);
                expect(m1._name === m2._name).toBe(true);
            });
        });
        describe("예외 및 커버리지", () => {
            it("- 예외 : _name, guid ", () => {
                const i = new MetaElement('_name');

                // expect(()=> i._name = 10).toThrow('ES021');
                expect(()=> i._guid = 10).toThrow(/Cannot set property _guid of/); // 직접 설정할 경우는 없음
            });
            it("- 커버리지 : this.__SET$_name ", () => {
                const i = new MetaElement('E1');
                
                i.__SET$_name('E2', i)
                expect(i._name).toBe('E2');
               
                i.__SET$_name('E3')  // 접근금지
                expect(i._name).toBe('E2');

                expect(()=> i.__SET$_name(10, i)).toThrow(/EL03121/);
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