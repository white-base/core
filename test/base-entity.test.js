/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
const {BaseEntity}            = require('../src/base-entity');
const {IObject}               = require('../src/i-object');
const {IMarshal}              = require('../src/i-marshal');
const Util                  = require('../src/util');
const { MetaTable }         = require('../src/meta-table');
const { MetaView }          = require('../src/meta-view');
const { MetaRow }           = require('../src/meta-row');
const { MetaColumn }        = require('../src/meta-column');

//==============================================================
// test
describe("[target: base-entity.js]", () => {
    describe("BaseEntity :: 추상 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("BaseEntity.rows <로우 속성>", () => {
            it("- this.rows : 타입 조회 ", () => {
                var table1 = new MetaTable('T1');
        
                expect(table1.rows.instanceOf('MetaRowCollection')).toBe(true);
            });
        });
        describe("BaseEntity.columns <컬럼 속성>", () => {
            it("- this.columns : 예외 ", () => {
                class SubClass extends BaseEntity {
                    constructor(name) {super(name)}
                }
                const s1 = new SubClass('S1');

                expect(()=> s1.columns).toThrow(/ES0111/)
            });
        });
        describe("MetaObject.getTypes(): arr<func> <타입 얻기> ", () => {
            it("- getTypes() : array<function> ", () => {
                const c = new MetaTable('C');
                const types = c.getTypes();
        
                expect(types[0]).toBe(MetaTable);
                expect(types[1]).toBe(BaseEntity);
                expect(types[2]).toBe(MetaElement);
                expect(types[3]).toBe(MetaObject);
                expect(types[4]).toBe(Object);
                expect(types.length).toBe(5);
            });
        });
        describe("MetaObject.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaTable('C');
        
                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('IMarshal')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaElement')).toBe(true);
                expect(c.instanceOf('BaseEntity')).toBe(true);
                // false
                expect(c.instanceOf('MetaView')).toBe(false);
                expect(c.instanceOf('Array')).toBe(false);
                expect(c.instanceOf('String')).toBe(false);
            });
            it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaTable('C');
        
                expect(c.instanceOf(IObject)).toBe(true);
                expect(c.instanceOf(IMarshal)).toBe(true);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaElement)).toBe(true);
                expect(c.instanceOf(BaseEntity)).toBe(true);
                // false
                expect(c.instanceOf(MetaView)).toBe(false);
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
        });
        describe("BaseEntity.BaseEntity() <생성 : 추상클래스>", () => {
            it("- new BaseEntity() : 예외 ", () => {
        
                expect(()=> new BaseEntity('T1')).toThrow(/EL03111/);
            });
        });
        describe("BaseEntity.clone() <복제>", () => {
            it("- clone() : 예외 ", () => {
                class SubClass extends BaseEntity {
                    constructor(name) {super(name)}
                }
                const s1 = new SubClass('S1');

                expect(()=> s1.clone()).toThrow(/ES013/)
            });
        });
        describe("BaseEntity.copy() <복사>", () => {
            it("- copy() : 예외 ", () => {
                class SubClass extends BaseEntity {
                    constructor(name) {super(name)}
                }
                const s1 = new SubClass('S1');

                expect(()=> s1.copy()).toThrow(/ES013/)
            });
        });
        describe("커버리지 및 예외", () => {
            it("- 커버리지 : _isSchema() ", () => {
                // class SubClass extends BaseEntity {
                //     constructor(name) {super(name)}
                // }
                // const s1 = new SubClass('S1');

                expect(()=> BaseEntity.transformSchema('ERR')).toThrow(/ES021/)
                expect(()=> BaseEntity.transformSchema(null)).toThrow(/ES021/)
            });
        });
    });
});
