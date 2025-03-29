//==============================================================
// gobal defined
import PropertyCollection from '../src/collection-property';
import ArrayCollection from '../src/collection-array';
import {jest} from '@jest/globals';

let School;
let arrResult = [];

//==============================================================
// test
describe("[target: collection-property.js, ollection-array.js, base-collection.js]", () => {
    describe("PropertyCollection :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                level = 0;
                columns = new PropertyCollection(this);
                constructor(level) { 
                    this.level = level;
                    this.columns.onAdd = function(v, i, _this) {
                        arrResult.push(`ADD.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onAdded = function(v, i, _this) {
                        arrResult.push(`ADDED.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onRemove = function(v, i, _this) {
                        arrResult.push(`REMOVE.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onRemoved = function(v, i, _this) {
                        arrResult.push(`REMOVED.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onClear = function(_this) {
                        arrResult.push(`CLEAR.${_this._owner.constructor.name}`);
                    }
                    this.columns.onCleared = function(_this) {
                        arrResult.push(`CLEARED.${_this._owner.constructor.name}`);
                    }
                    this.columns.onChanging = function(n, o, i,  _this) {
                        arrResult.push(`CHANGING.${i}.${n}.${o}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onChanged = function(n, o, i, _this) {
                        arrResult.push(`CHANGED.${i}.${n}.${o}.${_this._owner.constructor.name}`);
                    }
                }
            }
            
        });
        it("- add() : 성공 => onChanging, onAdd, onChanged", () => {
            const i = new School();
            arrResult = [];
            const result = i.columns.add('a1', 'A1');
    
            expect(arrResult[0]).toBe('ADD.0.A1.School');
            expect(arrResult[1]).toBe('ADDED.0.A1.School');
            expect(arrResult.length).toBe(2);
            expect(result > -1).toBeTruthy();
        });
        it("- add() : 실패 (중복, 예외) => 이벤트 없음 ", () => {
            global.console.warn = jest.fn((val) => {
                expect(val).toBe('Warning:: 프로퍼티 이름 중복 !!');
            });
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            arrResult = [];
            // const result2 = i.columns.add('a1', 'A1');
    
            expect(()=> i.columns.add('a1', 'A1')).toThrow(/EL04228/);
            expect(()=> i.columns.add(0)).toThrow(/EL04225/);
            expect(arrResult.length).toBe(0);
            expect(result1 > -1).toBeTruthy();
        });
        it("- remove() : 성공 => onChanging, onRemove, onChanged", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', 'A2');
            arrResult = [];
            const result3 = i.columns.remove('A2');
    
            expect(arrResult[0]).toBe('REMOVE.1.A2.School');
            expect(arrResult[1]).toBe('REMOVED.1.A2.School');
            expect(arrResult.length).toBe(2);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- remove() : 실패 => 이벤트 없음", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            arrResult = [];
            const result2 = i.columns.remove('A2');
    
            expect(arrResult.length).toBe(0);
            expect(result1 > -1).toBeTruthy();
            expect(result2 > -1).not.toBeTruthy();
        });
        it("- clear() : 초기화 => onChanging, onClear, onChanged", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            arrResult = [];
            i.columns.clear();
    
            expect(arrResult[0]).toBe('CLEAR.School');
            expect(arrResult[1]).toBe('CLEARED.School');
            expect(arrResult.length).toBe(2);
            expect(result1 > -1).toBeTruthy();
        });
        it("- 변경:  => onChanging, onChanged", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            arrResult = [];
            i.columns['a1'] = 'AA1'
    
            expect(arrResult[0]).toBe('CHANGING.0.AA1.A1.School');
            expect(arrResult[1]).toBe('CHANGED.0.AA1.A1.School');
            expect(arrResult.length).toBe(2);
            expect(result1 > -1).toBeTruthy();
        });
    });
    
    describe("ArrayCollection :: 배열 컬렉션 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                level = 0;
                columns = new ArrayCollection(this);
                constructor(level) { 
                    this.level = level;
                    this.columns.onAdd = function(v, i, _this) {
                        arrResult.push(`ADD.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onAdded = function(v, i, _this) {
                        arrResult.push(`ADDED.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onRemove = function(v, i, _this) {
                        arrResult.push(`REMOVE.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onRemoved = function(v, i, _this) {
                        arrResult.push(`REMOVED.${i}.${v}.${_this._owner.constructor.name}`);
                    }
                    this.columns.onClear = function(_this) {
                        arrResult.push(`CLEAR.${_this._owner.constructor.name}`);
                    }
                    this.columns.onCleared = function(_this) {
                        arrResult.push(`CLEARED.${_this._owner.constructor.name}`);
                    }
                    this.columns.onChanging = function(_this) {
                        arrResult.push(`CHANGING.${_this._owner.constructor.name}`);
                    }
                    this.columns.onChanged = function(_this) {
                        arrResult.push(`CHANGED.${_this._owner.constructor.name}`);
                    }
                }
            }
        });
        it("- add() : 성공 => onChanging, onAdd, onChanged", () => {
            const i = new School();
            arrResult = [];
            const result = i.columns.add('A1');
    
            expect(arrResult[0]).toBe('ADD.0.A1.School');
            expect(arrResult[1]).toBe('ADDED.0.A1.School');
            expect(arrResult.length).toBe(2);
            expect(result > -1).toBeTruthy();
        });
        // it("- add() : 실패 (예외) ", () => {
        //     const i = new School();
        //     const result1 = i.columns.add('A1');
        //     arrResult = [];
    
        //     expect(()=> i.columns.add(undefined)).toThrow(/value/);
        //     expect(arrResult.length).toBe(0);
        //     expect(result1).toBeTruthy();
        // });
        it("- remove() : 성공 => onChanging, onRemove, onChanged", () => {
            const i = new School();
            const result1 = i.columns.add('A1');
            const result2 = i.columns.add('A2');
            arrResult = [];
            const result3 = i.columns.remove('A2');
    
            expect(arrResult[0]).toBe('REMOVE.1.A2.School');
            expect(arrResult[1]).toBe('REMOVED.1.A2.School');
            expect(arrResult.length).toBe(2);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- remove() : 실패 => 이벤트 없음", () => {
            const i = new School();
            const result1 = i.columns.add('A1');
            arrResult = [];
            const result2 = i.columns.remove('A2');
    
            expect(arrResult.length).toBe(0);
            expect(result1 > -1).toBeTruthy();
            expect(result2 > -1).not.toBeTruthy();
        });
        it("- clear() : 초기화 => onChanging, onClear, onChanged", () => {
            const i = new School();
            const result1 = i.columns.add('A1');
            arrResult = [];
            i.columns.clear();
    
            expect(arrResult[0]).toBe('CLEAR.School');
            expect(arrResult[1]).toBe('CLEARED.School');
            expect(arrResult.length).toBe(2);
            expect(result1 > -1).toBeTruthy();
        });
    });
});