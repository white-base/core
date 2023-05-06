/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const ComplexElement        = require('../src/meta-element-complex');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const IPropertyCollection   = require('../src/i-collection-property');

let MetaObjectSub, MetaElementSub, ComplexElementSub, EmpytClass;

//==============================================================
// test
describe("< MetaObject >", () => {
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
    it("- getType() : function ", () => {
        const c = new MetaObjectSub();
        const type = c.getType();

        expect(type).toBe(MetaObjectSub);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new MetaObjectSub();
        const types = c.getTypes();

        expect(types[0]).toBe(Object);
        expect(types[1]).toBe(MetaObject);
        expect(types[2]).toBe(MetaObjectSub);
        expect(types.length).toBe(3);
    });
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
    it("- EmpytClass : 검사 ", () => {
        const c = new EmpytClass();

        expect(c.getType).not.toBeDefined();
        expect(c.getTypes).not.toBeDefined();
        expect(c.instanceOf).not.toBeDefined();
    });
});
describe("< MetaElement >", () => {
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
    it("- getType() : function ", () => {
        const c = new MetaElementSub();
        const types = c.getTypes();

        expect(types[0]).toBe(Object);
        expect(types[1]).toBe(MetaObject);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(MetaElementSub);
        expect(types.length).toBe(4);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new MetaElementSub();
        const types = c.getTypes();

        expect(types[0]).toBe(Object);
        expect(types[1]).toBe(MetaObject);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(MetaElementSub);
        expect(types.length).toBe(4);
    });
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
    it("- getGuid() ", () => {
        const c1 = new MetaElementSub();
        const c2 = new MetaElementSub();
        const guid1 = c1.getGuid();
        const guid2 = c1.getGuid();
        const guid3 = c2.getGuid();

        expect(guid1.length).toBe(36);
        expect(guid2.length).toBe(36); // guid 길이
        expect(guid1).toBe(guid2);
        expect(guid1).not.toBe(guid3);
    });
    it("- getObject() : function 타입 ", () => {
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

        expect(obj).toEqual({ str: 'STR', name: 'foo', prop: 10 });
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

        expect(obj).toEqual({ str: 'STR', name: 'foo', prop: 10 });
    });
});
describe("< MetaComplexElement >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의        
        ComplexElementSub = class ComplexElementSub extends ComplexElement {
            constructor(name) { super(name) }
        }
    });
    // it("- getTypeNames() : array<string> ", () => {
    //     const c = new ComplexElementSub();
    //     const typeNames = c.getTypeNames();

    //     expect(typeNames[0]).toBe('Object');
    //     expect(typeNames[1]).toBe('MetaObject');
    //     expect(typeNames[2]).toBe('MetaElement');
    //     expect(typeNames[3]).toBe('ComplexElement');
    //     expect(typeNames[4]).toBe('ComplexElementSub');
    //     expect(typeNames.length).toBe(5);
    // });
    it("- getType() : function ", () => {
        const c = new ComplexElementSub();
        const type = c.getType();

        expect(type).toBe(ComplexElementSub);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new ComplexElementSub();
        const types = c.getTypes();

        expect(types[0]).toBe(Object);
        expect(types[1]).toBe(MetaObject);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(ComplexElement);
        expect(types[4]).toBe(ComplexElementSub);
        expect(types.length).toBe(5);
    });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new ComplexElementSub();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('IPropertyCollection')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('ComplexElement')).toBe(true);
        expect(c.instanceOf('ComplexElementSub')).toBe(true);
        // false
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new ComplexElementSub();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(IPropertyCollection)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(ComplexElement)).toBe(true);
        expect(c.instanceOf(ComplexElementSub)).toBe(true);
        // false
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
});