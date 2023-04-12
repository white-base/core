/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const PropertyCollection          = require('../src/collection-property');
let Student, s;

//==============================================================
// test
describe("< PropertyCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            items = new PropertyCollection(this);
        }
        s = new Student();
    });
    describe("< this.add(name, value?, desc?) >", () => {
        beforeAll(() => {
            s = new Student();
        });
        it("- add(name)", () => {
            const result = s.items.add('a1');
    
            expect(s.items['a1']).toBe('');
            expect(s.items.a1).toBe('');
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(name, value) ", () => {
            const result = s.items.add('a2', 'A2');
    
            expect(s.items['a2']).toBe('A2');
            expect(s.items.a2).toBe('A2');
            expect(s.items.count).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- add(name, value, desc) : 읽기 전용", () => {
            const desc = {
                value: 'A3',
                writable: false
            };
            const result = s.items.add('a3', null, desc);

            expect(() => s.items['a3'] = 1).toThrow(/a3/);
            expect(s.items['a3']).toBe('A3');
            expect(s.items.a3).toBe('A3');
            expect(s.items.count).toBe(3);
            expect(result).toBeTruthy();
        });
        it("- add(name, value, desc) : set/get (제약조건 추가) ", () => {
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
            const result = s.items.add('a4', null, desc);
            s.items['a4'] = 'A4';

            expect(() => s.items['a4'] = 1).toThrow(/string/);
            expect(s.items['a4']).toBe('A4');
            expect(s.items.a4).toBe('A4');
            expect(s.items.count).toBe(4);
            expect(result).toBeTruthy();
        });
        it("- add(name) : 중복 이름 등록시 (경고)", () => {
            const logSpy = jest.spyOn(global.console, 'warn');
            const result = s.items.add('a1');
    
            expect(logSpy).toHaveBeenCalledWith('Warning:: 프로퍼티 이름 중복 !!');
            expect(result).not.toBeTruthy();
            logSpy.mockRestore();
        });
        it("- add(name) : 내부속성명 사용시 (예외)", () => {
            expect(() => s.items.add('list')).toThrow(/Symbol word/);
        });
        it("- add(name) : 이름을 숫자로 사용할 경우 (예외)", () => {
            expect(() => s.items.add(10)).toThrow(/"string" can be added/);
        });
    });
    describe("< this.remove(elem) >", () => {
        beforeAll(() => {
            s = new Student();
        });
        it("- remove(elem) : string ", () => {
            s.items.add('a1', 'A1');
            const result = s.items.remove('A1');

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- remove(elem) : number ", () => {
            s.items.add('a1', 100);
            s.items.remove(100);

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : object ", () => {
            const a1 = { name: 'O1' };
            s.items.add('a1', a1);
            s.items.remove(a1);

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : string (없을 경우)", () => {
            s.items.add('a1', 'A1');
            const result = s.items.remove('A2');

            expect(s.items['a1']).not.toBeUndefined();
            expect(s.items.a1).not.toBeUndefined();
            expect(s.items.count).toBe(1);
            expect(s.items.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
    });
    describe("< this.removeAt(num) >", () => {
        beforeAll(() => {
            s = new Student();
        });
        it("- removeAt(idx) ", () => {
            s.items.add('a1', 'A1');
            const idx = s.items.indexOfName('a1');
            const result = s.items.removeAt(idx);

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 없을 경우", () => {
            s.items.add('a1', 'A1');
            const idx = s.items.indexOfName('a1');
            const result = s.items.removeAt(idx + 1);

            expect(s.items['a1']).not.toBeUndefined();
            expect(s.items.a1).not.toBeUndefined();
            expect(s.items.count).toBe(1);
            expect(s.items.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
        it("- removeAt(idx) : 첫째 요소 삭제", () => {
            s = new Student();
            s.items.add('a1', 'A1');
            s.items.add('a2', 'A2');
            s.items.add('a3', 'A3');
            const result = s.items.removeAt(0);

            expect(s.items['a1']).not.toBeDefined();
            expect(s.items.a1).not.toBeDefined();
            expect(s.items['a2']).toBeDefined();
            expect(s.items.a2).toBeDefined();
            expect(s.items['a3']).toBeDefined();
            expect(s.items.a3).toBeDefined();
            expect(s.items.indexOfName('a2')).toBe(0);  // 바뀐 idx 확인
            expect(s.items.indexOfName('a3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 중간 요소 삭제", () => {
            s = new Student();
            s.items.add('a1', 'A1');
            s.items.add('a2', 'A2');
            s.items.add('a3', 'A3');
            const result = s.items.removeAt(1);

            expect(s.items['a1']).toBeDefined();
            expect(s.items.a1).toBeDefined();
            expect(s.items['a2']).not.toBeDefined();
            expect(s.items.a2).not.toBeDefined();
            expect(s.items['a3']).toBeDefined();
            expect(s.items.a3).toBeDefined();
            expect(s.items.indexOfName('a1')).toBe(0);  
            expect(s.items.indexOfName('a3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
            s = new Student();
            s.items.add('a1', 'A1');
            s.items.add('a2', 'A2');
            s.items.add('a3', 'A3');
            const result = s.items.removeAt(2);
            s.items.add('a4', 'A4');

            expect(s.items['a1']).toBeDefined();
            expect(s.items.a1).toBeDefined();
            expect(s.items['a2']).toBeDefined();
            expect(s.items.a2).toBeDefined();
            expect(s.items['a3']).not.toBeDefined();
            expect(s.items.a3).not.toBeDefined();
            expect(s.items['a4']).toBeDefined();
            expect(s.items.a4).toBeDefined();
            expect(s.items.indexOfName('a1')).toBe(0);  
            expect(s.items.indexOfName('a2')).toBe(1);
            expect(s.items.indexOfName('a4')).toBe(2);
            expect(s.items.count).toBe(3);
            expect(s.items.list.length).toBe(3);
            expect(result).toBeTruthy();
        });
    });
    describe("< this.removeByName(string) >", () => {
        beforeAll(() => {
            s = new Student();
        });
        it("- removeByName() ", () => {
            // expect(result).toEqual(['P1', 'P2', 'ADD1']);
        });
        it("- removeByName(name) : object ", () => {
            const a1 = { name: 'O1' };
            s.items.add('a1', a1);
            const result = s.items.removeByName('a1');

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- removeByName(name) : 없는 경우 ", () => {
            const a1 = { name: 'O1' };
            s.items.add('a1', a1);
            const result = s.items.removeByName('a5');

            expect(s.items['a1']).not.toBeUndefined();
            expect(s.items.a1).not.toBeUndefined();
            expect(s.items.count).toBe(1);
            expect(s.items.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
    });
    
    it("- clear() ", () => {
        s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', 'A2');
        s.items.add('a3', 'A3');
        s.items.clear();

        expect(s.items.count).toBe(0);
        expect(s.items.list.length).toBe(0);
        expect(s.items.properties.length).toBe(0);

    });
    it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
        const a2 = { style: 1};
        s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', a2);
        s.items.add('a3', 10);

        expect(s.items.contains('A1')).toBeTruthy();
        expect(s.items.contains(a2)).toBeTruthy();
        expect(s.items.contains(10)).toBeTruthy();
        expect(s.items.count).toBe(3);

    });

    it("- indexOf() : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
        const a2 = { style: 1};
        s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', a2);
        s.items.add('a3', 10);
        s.items.add('a4', 10);

        expect(s.items.indexOf('A1')).toBe(0);
        expect(s.items.indexOf(a2)).toBe(1);
        expect(s.items.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
        expect(s.items.count).toBe(4);
    });
    it("- indexOfName(name) ", () => {
        const a2 = { style: 1};
        s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', a2);
        s.items.add('a3', 10);
        s.items.add('a4', 10);

        expect(s.items.indexOfName('a1')).toBe(0);
        expect(s.items.indexOfName('a2')).toBe(1);
        expect(s.items.indexOfName('a3')).toBe(2);
        expect(s.items.indexOfName('a4')).toBe(3);
        expect(s.items.indexOfName('a5')).toBe(-1); // 없는 경우
        expect(s.items.count).toBe(4);
    });
    it("- propertyOf(idx) ", () => {
        const a2 = { style: 1};
        s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', a2);
        s.items.add('a3', 10);
        s.items.add('a4', 10);

        expect(s.items.propertyOf(0)).toBe('a1');
        expect(s.items.propertyOf(1)).toBe('a2');
        expect(s.items.propertyOf(2)).toBe('a3');
        expect(s.items.propertyOf(3)).toBe('a4');
        expect(s.items.propertyOf(4)).toBeUndefined();
        expect(s.items.count).toBe(4);
    });

    /**
     * TODO: 
     * - _getPropDescriptor() : 상속할때 오버라이딩해서 변형 => 나중에..
     * - elementType 타입 지정시 해당 인스턴스만 입력가능
     * ###############################
     * - 이벤트 => 별도로 파일로 분리
     * - 삭제 : collection-property-function, collection-property-object
     */
});