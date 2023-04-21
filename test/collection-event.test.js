/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const PropertyCollection            = require('../src/collection-property');
const ArrayCollection               = require('../src/collection-array');
let arrResult = [];

//==============================================================
// test
describe("< PropertyCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        School = class {
            level = 0;
            items = new PropertyCollection(this);
            constructor(level) { 
                this.level = level;
                this.items.onAdd = function(i, v, _this) {
                    arrResult.push(`ADD.${i}.${v}.${_this._owner.constructor.name}`);
                }
                this.items.onRemove = function(i, v, _this) {
                    arrResult.push(`REMOVE.${i}.${v}.${_this._owner.constructor.name}`);
                }
                this.items.onClear = function(_this) {
                    arrResult.push(`CLEAR.${_this._owner.constructor.name}`);
                }
                this.items.onChanging = function(_this) {
                    arrResult.push(`CHANGING.${_this._owner.constructor.name}`);
                }
                this.items.onChanged = function(_this) {
                    arrResult.push(`CHANGED.${_this._owner.constructor.name}`);
                }
            }
        }
        
    });
    it("- add() : 성공 ", () => {
        const i = new School();
        arrResult = [];
        const result = i.items.add('a1', 'A1');

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('ADD.0.A1.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result).toBeTruthy();
    });
    it("- add() : 실패 (중복, 예외) ", () => {
        const i = new School();
        const result1 = i.items.add('a1', 'A1');
        arrResult = [];
        const result2 = i.items.add('a1', 'A1');

        expect(()=> i.items.add(0)).toThrow(/string/);
        expect(arrResult.length).toBe(0);
        expect(result1).toBeTruthy();
        expect(result2).not.toBeTruthy();
    });
    it("- remove() : 성공 ", () => {
        const i = new School();
        const result1 = i.items.add('a1', 'A1');
        const result2 = i.items.add('a2', 'A2');
        arrResult = [];
        const result3 = i.items.remove('A2');

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('REMOVE.1.A2.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(result3).toBeTruthy();
    });
    it("- remove() : 실패 ", () => {
        const i = new School();
        const result1 = i.items.add('a1', 'A1');
        arrResult = [];
        const result2 = i.items.remove('A2');

        expect(arrResult.length).toBe(0);
        expect(result1).toBeTruthy();
        expect(result2).not.toBeTruthy();
    });
    it("- 초기화 ", () => {
        const i = new School();
        const result1 = i.items.add('a1', 'A1');
        arrResult = [];
        i.items.clear();

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('CLEAR.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result1).toBeTruthy();
    });
});

describe("< ArrayCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        School = class {
            level = 0;
            items = new ArrayCollection(this);
            constructor(level) { 
                this.level = level;
                this.items.onAdd = function(i, v, _this) {
                    arrResult.push(`ADD.${i}.${v}.${_this._owner.constructor.name}`);
                }
                this.items.onRemove = function(i, v, _this) {
                    arrResult.push(`REMOVE.${i}.${v}.${_this._owner.constructor.name}`);
                }
                this.items.onClear = function(_this) {
                    arrResult.push(`CLEAR.${_this._owner.constructor.name}`);
                }
                this.items.onChanging = function(_this) {
                    arrResult.push(`CHANGING.${_this._owner.constructor.name}`);
                }
                this.items.onChanged = function(_this) {
                    arrResult.push(`CHANGED.${_this._owner.constructor.name}`);
                }
            }
        }
    });
    it("- add() : 성공 ", () => {
        const i = new School();
        arrResult = [];
        const result = i.items.add('A1');

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('ADD.0.A1.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result).toBeTruthy();
    });
    it("- add() : 실패 (예외) ", () => {
        const i = new School();
        const result1 = i.items.add('A1');
        arrResult = [];

        expect(()=> i.items.add(undefined)).toThrow(/value/);
        expect(arrResult.length).toBe(0);
        expect(result1).toBeTruthy();
    });
    it("- remove() : 성공 ", () => {
        const i = new School();
        const result1 = i.items.add('A1');
        const result2 = i.items.add('A2');
        arrResult = [];
        const result3 = i.items.remove('A2');

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('REMOVE.1.A2.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(result3).toBeTruthy();
    });
    it("- remove() : 실패 ", () => {
        const i = new School();
        const result1 = i.items.add('A1');
        arrResult = [];
        const result2 = i.items.remove('A2');

        expect(arrResult.length).toBe(0);
        expect(result1).toBeTruthy();
        expect(result2).not.toBeTruthy();
    });
    it("- 초기화 ", () => {
        const i = new School();
        const result1 = i.items.add('A1');
        arrResult = [];
        i.items.clear();

        expect(arrResult[0]).toBe('CHANGING.School');
        expect(arrResult[1]).toBe('CLEAR.School');
        expect(arrResult[2]).toBe('CHANGED.School');
        expect(arrResult.length).toBe(3);
        expect(result1).toBeTruthy();
    });
});    
/**
 * 이벤트 종류
 * - onAdd
 * - onRemove
 * - onClear : 
 * - onChanging : 변화하는
 * - onChanged : 달라진
 * 
 */