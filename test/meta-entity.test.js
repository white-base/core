/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const MetaEntity            = require('../src/meta-entity');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const Util                  = require('../src/util');
const { MetaTable }         = require('../src/meta-table');
const { MetaView }          = require('../src/meta-view');
const { MetaRow }           = require('../src/meta-row');
const { MetaColumn }        = require('../src/meta-column');

//==============================================================
// test
describe("< MetaEntity >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- clone() : 예외 ", () => {
        var entity1 = new MetaEntity('T1');

        expect(()=> entity1.clone()).toThrow(/clone.*Abstract/);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new MetaEntity();
        const types = c.getTypes();

        expect(types[0]).toBe(MetaEntity);
        expect(types[1]).toBe(MetaElement);
        expect(types[2]).toBe(MetaObject);
        expect(types[3]).toBe(Object);
        expect(types.length).toBe(4);
    });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaEntity();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('MetaEntity')).toBe(true);
        // false
        expect(c.instanceOf('MetaView')).toBe(false);
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaEntity();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(MetaEntity)).toBe(true);
        // false
        expect(c.instanceOf(MetaView)).toBe(false);
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
});