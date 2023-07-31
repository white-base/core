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

let MetaObjectSub, MetaElementSub, ComplexElementSub, EmpytClass;

//==============================================================
// test
describe("[target: meta-object.js, meta-element.js]", () => {
    describe("MetaObject :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
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
        describe("this.getTypes() : arr<func> <타입 조회>", () => {
            it("- getType() : function ", () => {
                const c = new MetaObjectSub();
                const type = c.getType();
        
                expect(type).toBe(MetaObjectSub);
            });
            // it("- getType() : 강제 예외 ", () => {
            //     const c = new MetaObjectSub();
            //     const temp = c.__proto__;
            //     const type = c.getType();
            //     c.__proto__ = temp; // 복구
            //     expect(type).toBe(MetaObjectSub);
            // });
            it("- getTypes() : array<function> ", () => {
                const c = new MetaObjectSub();
                const types = c.getTypes();
        
                expect(types[0]).toBe(MetaObjectSub);
                expect(types[1]).toBe(MetaObject);
                expect(types[2]).toBe(Object);
                expect(types.length).toBe(3);
            });
        });
        describe("this.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
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
                delete c._interface;
        
                expect(c.instanceOf(IObject)).toBe(false);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaObjectSub)).toBe(true);
            });
            it("- instanceOf(string) : 예외 (_inteface 강제삭제) ", () => {
                const c = new MetaObjectSub();
                delete c._interface;
        
                expect(c.instanceOf('IObject')).toBe(false);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaObjectSub')).toBe(true);
            });
            it("- instanceOf(function) : 예외  ", () => {
                const c = new MetaObjectSub();
                delete c._interface;
        
                expect(c.instanceOf(Function)).toBe(false);
                expect(c.instanceOf({})).toBe(false);
            });
        });

        it("- EmpytClass : 검사 ", () => {
            const c = new EmpytClass();
    
            expect(c.getType).not.toBeDefined();
            expect(c.getTypes).not.toBeDefined();
            expect(c.instanceOf).not.toBeDefined();
        });
    });
    describe("MetaElement :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의        
            MetaElementSub = class MetaElementSub extends MetaElement {
                constructor(name) { super(name) }
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
            it("- getType() : function ", () => {
                const c = new MetaElementSub();
                const type = c.getType();
        
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
                const c = new MetaElementSub();
        
                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('IMarshal')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaElement')).toBe(true);
                expect(c.instanceOf('MetaElementSub')).toBe(true);
                // false
                expect(c.instanceOf('Array')).toBe(false);
                expect(c.instanceOf('String')).toBe(false);
            });
            it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaElementSub();
        
                expect(c.instanceOf(IObject)).toBe(true);
                expect(c.instanceOf(IMarshal)).toBe(true);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaElement)).toBe(true);
                expect(c.instanceOf(MetaElementSub)).toBe(true);
                // false
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
        });
        describe("this.guid: str <GUID 얻기>", () => {
            it("- this.guid ", () => {
                const c1 = new MetaElementSub();
                const c2 = new MetaElementSub();
                const guid1 = c1.guid;
                const guid2 = c1.guid;
                const guid3 = c2.guid;
        
                expect(guid1.length).toBe(36);
                expect(guid2.length).toBe(36); // guid 길이
                expect(guid1).toBe(guid2);
                expect(guid1).not.toBe(guid3);
            });
        });
        describe("this.getObject(): fun <객체 얻기>", () => {
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
                Foo.prototype.getStr  = function() {};  // 제외
                const c = new Foo('foo');
                const obj = c.getObject();
                const comp = { guid: obj.guid, str: 'STR', metaName: 'foo', prop: 10 }
        
                expect(obj).toEqual(comp);
            });
            it("- getObject() : class 타입 ", () => {
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
                const comp = { guid: obj.guid, str: 'STR', metaName: 'foo', prop: 10 }

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
                }
                const c = new Foo('foo');
                const obj = c.getObject();
                const comp = { guid: obj.guid, str: 'STR', metaName: 'foo', bar: { 
                    guid: obj.bar.guid, metaName: '', sub: true 
                } };
        
                expect(obj).toEqual(comp);
            });
        });
        describe("예외", () => {
            it("- 예외 : metaName, guid ", () => {
                const i = new MetaElement('metaName');
        
                expect(()=> i.metaName = 10).toThrow(/metaName.*string/);
                expect(()=> i.guid = 10).toThrow(/only.*getter/); // 직접 설정할 경우는 없음
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
//     // it("- getType() : function ", () => {
//     //     const c = new ComplexElementSub();
//     //     const type = c.getType();

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