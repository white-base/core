/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {PropertyCollection}          = require('../src/collection-property');
let Student, School, Member, Corp, House, Space;

//==============================================================
// test
describe("[target: collection-property.js, collection-base.js]", () => {
        
    describe("PropertyCollection :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                columns = new PropertyCollection(this);
            }
        });

        describe("BaseCollection.remove(elem): bool <삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- remove(elem) : string ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const result = s.columns.remove('A1');
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- remove(elem) : number ", () => {
                let s = new Student();
                s.columns.add('a1', 100);
                s.columns.remove(100);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
            });
            it("- remove(elem) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.columns.add('a1', a1);
                s.columns.remove(a1);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
            });
            it("- remove(elem) : string (없을 경우)", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const result = s.columns.remove('A2');
    
                expect(s.columns['a1']).not.toBeUndefined();
                expect(s.columns.a1).not.toBeUndefined();
                expect(s.columns.count).toBe(1);
                expect(s.columns.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
        });
        describe("BaseCollection.removeAt(num): bool <인덱스로 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(idx) ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const idx = s.columns.indexOf('a1', 1);
                const result = s.columns.removeAt(idx);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 없을 경우", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const idx = s.columns.indexOf('a1', 1);
                const result = s.columns.removeAt(idx + 1);
    
                expect(s.columns['a1']).toBeTruthy();
                expect(s.columns.a1).toBeTruthy();
                expect(s.columns.count).toBe(1);
                expect(s.columns.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
            it("- removeAt(idx) : 첫째 요소 삭제", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(0);
    
                expect(s.columns['a1']).not.toBeDefined();
                expect(s.columns.a1).not.toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns.a2).toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns.a3).toBeDefined();
                expect(s.columns[0] === s.columns['a2']).toBe(true);
                expect(s.columns[1] === s.columns['a3']).toBe(true);
                expect(s.columns.indexOf('a2', 1)).toBe(0);  // 바뀐 idx 확인
                expect(s.columns.indexOf('a3', 1)).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(2);
                expect(s.columns.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 중간 요소 삭제", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(1);
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns.a1).toBeDefined();
                expect(s.columns['a2']).not.toBeDefined();
                expect(s.columns.a2).not.toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns.a3).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a3']).toBe(true);
                expect(s.columns.indexOf('a1', 1)).toBe(0);  
                expect(s.columns.indexOf('a3', 1)).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(2);
                expect(s.columns.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(2);
                s.columns.add('a4', 'A4');
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns.a1).toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns.a2).toBeDefined();
                expect(s.columns['a3']).not.toBeDefined();
                expect(s.columns.a3).not.toBeDefined();
                expect(s.columns['a4']).toBeDefined();
                expect(s.columns.a4).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a2']).toBe(true);
                expect(s.columns.indexOf('a1', 1)).toBe(0);  
                expect(s.columns.indexOf('a2', 1)).toBe(1);
                expect(s.columns.indexOf('a4', 1)).toBe(2);
                expect(s.columns.count).toBe(3);
                expect(s.columns.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
        });
        describe.skip("this.insertAt(num, name): bool <idx 위치에 추가>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- insertAt(idx) : 첫째 요소 삭제", () => {
                let s = new Student();
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.insertAt(0, 'a1', 'A1');
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a2']).toBe(true);
                expect(s.columns[2] === s.columns['a3']).toBe(true);
                expect(s.columns.indexOf('a1', 1)).toBe(0);  // 바뀐 idx 확인
                expect(s.columns.indexOf('a2', 1)).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.indexOf('a3', 1)).toBe(2);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(3);
                expect(s.columns.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx) : 중간 요소 추가", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a3', 'A3');
                const result = s.columns.insertAt(1, 'a2', 'A2');
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a2']).toBe(true);
                expect(s.columns[2] === s.columns['a3']).toBe(true);
                expect(s.columns.indexOf('a1', 1)).toBe(0);  // 바뀐 idx 확인
                expect(s.columns.indexOf('a2', 1)).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.indexOf('a3', 1)).toBe(2);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(3);
                expect(s.columns.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx) : 마지막 요소 추가 후 add()", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                const result = s.columns.insertAt(2, 'a3', 'A3');
                s.columns.add('a4', 'A4');
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns['a4']).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a2']).toBe(true);
                expect(s.columns[2] === s.columns['a3']).toBe(true);
                expect(s.columns[3] === s.columns['a4']).toBe(true);
                expect(s.columns.indexOf('a1', 1)).toBe(0);  
                expect(s.columns.indexOf('a2', 1)).toBe(1);
                expect(s.columns.indexOf('a3', 1)).toBe(2);
                expect(s.columns.indexOf('a4', 1)).toBe(3);
                expect(s.columns.count).toBe(4);
                expect(s.columns.list.length).toBe(4);
                expect(result).toBeTruthy();
            });
            it("- insertAt(pos) : 예외 : 사이즈 초과", () => {
                let s = new Student();
                s.columns.add('a0', 'A0');
                s.columns.add('a1', 'A1');

                expect(()=> s.columns.insertAt(3, 'a2', 'A2')).toThrow(/pos.*size/);
            });
            it("- insertAt(pos) : 예외 : 0 보다 작을 경우", () => {
                let s = new Student();
                s.columns.add('a0', 'A0');
                s.columns.add('a1', 'A1');

                expect(()=> s.columns.insertAt(-1, 'a2', 'A2')).toThrow(/pos.*0/);
            });
        });
        describe("BaseCollection.removeAt(this.indexOf(name, 1)): bool <이름으로 삭제> ", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(this.indexOf(name, 1)) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
    
                s.columns.add('a1', a1);
                // const result = s.columns.removeByProp('a1');
                const result = s.columns.removeAt(s.columns.indexOf('a1', 1));
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(this.indexOf(name, 1)) : 없는 경우 ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.columns.add('a1', a1);
                // const result = s.columns.removeByProp('a5');
                const result =  s.columns.removeAt(s.columns.indexOf('a5', 1));
    
                expect(s.columns['a1']).not.toBeUndefined();
                expect(s.columns.a1).not.toBeUndefined();
                expect(s.columns.count).toBe(1);
                expect(s.columns.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
        });

        describe("BaseCollection.contains() <유무 검사> ", () => {
            it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
        
                expect(s.columns.contains('A1')).toBeTruthy();
                expect(s.columns.contains(a2)).toBeTruthy();
                expect(s.columns.contains(10)).toBeTruthy();
                expect(s.columns.count).toBe(3);
            });
        });
        describe("this.add(name, value?, desc?): bool <컬렉션 추가> ", () => {
            beforeAll(() => {
            });
            it("- add(name) : undefined", () => {
                let s = new Student();
                const result = s.columns.add('a1');
        
                expect(s.columns['a1']).toBe(undefined);
                expect(s.columns.a1).toBe(undefined);
                expect(s.columns.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(name, value) ", () => {
                let s = new Student();
                const result = s.columns.add('a1', 'A1');
        
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(name, value, desc) : 읽기 전용", () => {
                let s = new Student();
                const desc = {
                    value: 'A1',
                    writable: false
                };
                const result = s.columns.add('a1', null, desc);
    
                expect(() => s.columns['a1'] = 1).toThrow(/a1/);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(name, value, desc) : set/get (제약조건 추가) ", () => {
                let s = new Student();
                let bValue;
                const desc = {
                    get() {
                      return bValue;
                    },
                    set(newValue) {
                        if (typeof newValue !== 'string') throw new Error('string 타입만')
                        bValue = newValue;
                    },
                    enumerable: true,
                    configurable: true,
                }
                const result = s.columns.add('a1', null, desc);
                s.columns['a1'] = 'A1';
    
                expect(() => s.columns['a1'] = 1).toThrow(/string/);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(name, value, desc) : 기술자, 0 삭제후 0에 삽입 ", () => {
                let s = new Student();
                const desc1 = { value: 'A2', writable: false, configurable: true};   // TODO: config true 아니면 삭제 못함
                const desc2 = { value: 'A1', writable: false, configurable: true};   // TODO: config true 아니면 삭제 못함
                s.columns.add('a1', 'A1');
                s.columns.add('a2', null, desc1);
                s.columns.add('a3', 'A3');
    
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns._elements.length).toBe(3);
                expect(s.columns._descriptors.length).toBe(3);
                expect(s.columns.count).toBe(3);
                expect(s.columns._descriptors[0]).toBe(undefined);
                expect(s.columns._descriptors[1]).toBe(desc1);
                expect(s.columns._descriptors[2]).toBe(undefined);
                // 삭제 후 결과
                s.columns.removeAt(0);
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns._elements.length).toBe(2);
                expect(s.columns._descriptors.length).toBe(2);
                expect(s.columns.count).toBe(2);
                expect(s.columns._descriptors[0]).toBe(desc1);
                expect(s.columns._descriptors[1]).toBe(undefined);
                // 추가후 결과
                s.columns.add('a1', null, desc2);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns._elements.length).toBe(3);
                expect(s.columns._descriptors.length).toBe(3);
                expect(s.columns.count).toBe(3);
                expect(s.columns._descriptors[0]).toBe(desc1);
                expect(s.columns._descriptors[1]).toBe(undefined);
                expect(s.columns._descriptors[2]).toBe(desc2);

            });
            // it("- add(name) : 중복 이름 등록시 (경고)", () => {
            //     let s = new Student();
            //     const logSpy = jest.spyOn(global.console, 'warn');
            //     const result1 = s.columns.add('a1');
            //     const result2 = s.columns.add('a1');
        
            //     expect(logSpy).toHaveBeenCalledWith('Warning:: 프로퍼티 이름 중복 !!');
            //     expect(result1).toBeTruthy();
            //     expect(result2).not.toBeTruthy();
            //     logSpy.mockRestore();
            // });
            it("- add(name) : 중복 이름 등록시 (경고)", () => {
                let s = new Student();
                global.console.warn = jest.fn((val) => {
                    expect(val).toBe('Warning:: 프로퍼티 이름 중복 !!');
                });
                const result1 = s.columns.add('a1');
                const result2 = s.columns.add('a1');
                expect(result1).toBeTruthy();
                expect(result2).not.toBeTruthy();
                // jest.mockRestore();
            });
            it("- add(name) : 예약어 사용시 (예외)", () => {
                let s = new Student();
                expect(() => s.columns.add('_owner')).toThrow(/Symbol word/);
                expect(() => s.columns.add('_elements')).toThrow(/Symbol word/);
                expect(() => s.columns.add('_KEYWORD')).toThrow(/Symbol word/);
                expect(() => s.columns.add('_elemTypes')).toThrow(/Symbol word/);
                expect(() => s.columns.add('list')).toThrow(/Symbol word/);
                expect(() => s.columns.add('count')).toThrow(/Symbol word/);
                expect(() => s.columns.add('onAddr')).toThrow(/Symbol word/);
                expect(() => s.columns.add('onRemove')).toThrow(/Symbol word/);
                expect(() => s.columns.add('onClear')).toThrow(/Symbol word/);
                expect(() => s.columns.add('onChanging')).toThrow(/Symbol word/);
                expect(() => s.columns.add('onChanged')).toThrow(/Symbol word/);
                expect(() => s.columns.add('_remove')).toThrow(/Symbol word/);
                expect(() => s.columns.add('add')).toThrow(/Symbol word/);
                expect(() => s.columns.add('clear')).toThrow(/Symbol word/);
                expect(() => s.columns.add('remove')).toThrow(/Symbol word/);
                expect(() => s.columns.add('removeAt')).toThrow(/Symbol word/);
                expect(() => s.columns.add('indexOf')).toThrow(/Symbol word/);
                expect(() => s.columns.add('exist')).toThrow(/Symbol word/);
                expect(() => s.columns.add('keys')).toThrow(/Symbol word/);
                expect(() => s.columns.add('_keys')).toThrow(/Symbol word/);
                // expect(() => s.columns.add('indexOfProp')).toThrow(/Symbol word/);
                expect(() => s.columns.add('keyOf')).toThrow(/Symbol word/);
                // expect(() => s.columns.add('removeByProp')).toThrow(/Symbol word/);
            });
            it("- add(name) : 이름을 숫자로 사용할 경우 (예외)", () => {
                let s = new Student();
                expect(() => s.columns.add(10)).toThrow(/"string" can be added/);
            });
        });
        describe("this.indexOf(obj | str | num): num <인덱스 조회> ", () => {
            it("- indexOf(elem) : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.indexOf('A1')).toBe(0);
                expect(s.columns.indexOf(a2)).toBe(1);
                expect(s.columns.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
                expect(s.columns.count).toBe(4);
            });
            it("- indexOf(name, 1) ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.indexOf('a1', 1)).toBe(0);
                expect(s.columns.indexOf('a2', 1)).toBe(1);
                expect(s.columns.indexOf('a3', 1)).toBe(2);
                expect(s.columns.indexOf('a4', 1)).toBe(3);
                expect(s.columns.indexOf('a5', 1)).toBe(-1); // 없는 경우
                expect(s.columns.count).toBe(4);
            });
            it("- indexOf(name, 1) : 예외 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
        
                expect(s.columns.indexOf('a5', 2)).toBe(-1); // 없는 경우
                expect(()=> s.columns.indexOf(100, 1)).toThrow(/obj.*string/);  
            });
            // it("- keyOf(elem) : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
            //     let s = new Student();
            //     const a2 = { style: 1};
            //     s.columns.add('a1', 'A1');
            //     s.columns.add('a2', a2);
            //     s.columns.add('a3', 10);
            //     s.columns.add('a4', 10);
        
            //     expect(s.columns.keyOf('A1')).toBe('a1');
            //     expect(s.columns.keyOf(a2)).toBe('a2');
            //     expect(s.columns.keyOf(10)).toBe('a3');
            //     expect(s.columns.keyOf(10)).toBe('a3');
            //     expect(s.columns.keyOf(4)).toBeUndefined();
            //     expect(s.columns.count).toBe(4);
            // });
        });
        describe("this.keyOf(idx) <인덱스로 키 조회> ", () => {
            it("- keyOf(idx) ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.keyOf(0)).toBe('a1');
                expect(s.columns.keyOf(1)).toBe('a2');
                expect(s.columns.keyOf(2)).toBe('a3');
                expect(s.columns.keyOf(3)).toBe('a4');
                expect(s.columns.keyOf(4)).toBeUndefined();
                expect(s.columns.count).toBe(4);
            });
            it("- keyOf(string) : 예외 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
        
                expect(()=> s.columns.keyOf('a1')).toThrow(/idx.*number/);
            });
        });
        describe("this._remove(idx) <삭제 : 내부> ", () => {
            it("- _remove(idx)  : 내부 함수로 삭제 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns._remove(0);
        
                expect(s.columns.count).toBe(0);
            });
        });
        describe("this.clear() <초기화> ", () => {
            it("- clear() ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                s.columns.clear();
        
                expect(s.columns.count).toBe(0);
                expect(s.columns.list.length).toBe(0);
                // expect(s.columns._keys.length).toBe(0);  // 내부 함수는 검사에 사용안하는게 원칙임
            });
        });
        // it("- _remove(not idx) : 예외 ", () => {
        //     let s = new Student();
        //     s.columns.add('a1', 'A1');
    
        //     expect(()=> s.columns._remove('str')).toThrow(/idx.*number/);
        // });
    });
    describe("BaseCollection._elemTypes <전체 타입을 설정할 경우 : 클래스타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                level = 0;
                constructor(level) { this.level = level }
            }
            Member = class {
                type = 10;
                constructor(type) { this.type = type }
            }
            School = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = Student }
            }
            Corp = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = [Member, Student] }
            }
            House = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = null }
            }
            Space = class {
                columns = new PropertyCollection(this);
            }
        });
        it("- 단일 타입 : columns.add(name, obj) ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const result = elem.columns.add('a1', c1);
            
            // expect(() => elem.columns.add('a2')).toThrow(/맞는 타입이 없습니다./);
            // expect(() => elem.columns.add('a2', 'str')).toThrow(/instance/);
            // expect(result).toBeTruthy();
        });
        it("- 단일 타입 : columns.요소명 = obj ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const s2 = new Student(2);
            const result = elem.columns.add('a1', c1);
            elem.columns['a1'] = s2;
    
            expect(() => elem.columns['a1'] = 10 ).toThrow(/instance/);
            expect(elem.columns['a1'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
        it("- null 타입 : columns.add(name, obj) ", () => {
            const elem = new House();
            const c1 = new Student(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', 'str');
            
            expect(() => elem.columns.add('a3')).toThrow(/없습니다./);
            expect(elem.columns[0].level).toBe(1);
            expect(elem.columns['a1'].level).toBe(1);
            elem.columns['a1'] = 'OVER';
            expect(elem.columns[0]).toBe('OVER');
            expect(elem.columns['a1']).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- undefined 타입 : columns.add(name, obj) ", () => {
            const elem = new Space();
            const c1 = new Student(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', 'str');
            const result3 = elem.columns.add('a3');
    
            expect(elem.columns[0].level).toBe(1);
            expect(elem.columns['a1'].level).toBe(1);
            expect(elem.columns[1]).toBe('str');
            expect(elem.columns['a2']).toBe('str');
            expect(elem.columns[2]).toBeUndefined();
            expect(elem.columns['a3']).toBeUndefined();
            elem.columns['a3'] = 'OVER';    // 수정
            expect(elem.columns[2]).toBe('OVER');
            expect(elem.columns['a3']).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- 복합 타입 : columns.add(name, obj) ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const m1 = new Member(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', m1);
            
            expect(() => elem.columns.add('a3')).toThrow(/instance/);
            expect(() => elem.columns.add('a3', 'str')).toThrow(/instance/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : columns.요소명 = obj ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const s2 = new Student(2);
            const m1 = new Member(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', m1);
            elem.columns['a1'] = s2;
            elem.columns['a2'] = s2;
    
            expect(() => elem.columns['a1'] = 'str' ).toThrow(/instance/);
            expect(elem.columns['a1'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(elem.columns['a2'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a2'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("BaseCollection._elemTypes <전체 타입을 설정할 경우 : 원시타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = String }
            }
            Corp = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = [String, Boolean] }
            }
        });
        it("- 단일 타입 : columns.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', '');
            i.columns['a1'] = 'AA1';
            i.columns['a2'] = 'AA2';
    
            expect(() => i.columns.add('a3')).toThrow(/string/);     // 공백 예외
            expect(() => i.columns.add('a3', 10)).toThrow(/string/); // 타입 예외
            expect(() => i.columns['a1'] = 10).toThrow(/string/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : columns.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', true);
            
            expect(() => i.columns.add('a3')).toThrow(/string/);     // 공백 예외
            expect(() => i.columns.add('a3', 10)).toThrow(/boolean/); // 타입 예외
            expect(() => i.columns.add('a3', {})).toThrow(/(boolean)|(string)/);
            expect(() => i.columns['a1'] = 10).toThrow(/(boolean)|(string)/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 유무 검사 : exist(key) ", () => {
            const i = new Corp();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', true);
            
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(i.columns.exist('a1')).toBe(true);
            expect(i.columns.exist('a2')).toBe(true);
            expect(i.columns.exist('a3')).toBe(false);
            expect(i.columns.exist(0)).toBe(true);
            expect(i.columns.exist(1)).toBe(true);
            expect(i.columns.exist(2)).toBe(false);
            expect(i.columns.exist('0')).toBe(true);
            expect(i.columns.exist('1')).toBe(true);
            expect(i.columns.exist('2')).toBe(false);
            expect(()=> i.columns.exist(true)).toThrow(/key.*number.*string/);
        });
    });

});