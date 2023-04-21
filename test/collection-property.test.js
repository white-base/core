/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const PropertyCollection          = require('../src/collection-property');
// let Student, s;

//==============================================================
// test

describe("< BaseCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            level = 0;
            constructor(level) { this.level = level }
        }
        School = class {
            items = new PropertyCollection(this);
            constructor() { this.items.elementType = Student }
        }
    });
    describe("[ this.elementType 전체 타입을 설정할 경우 : 클래스타입 ]", () => {
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
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = Student }
            }
            Corp = class {
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = [Member, Student] }
            }
        });
        it("- 단일 타입 : items.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result = sc.items.add('a1', s1);
            
            expect(() => sc.items.add('a2')).toThrow(/null/);
            expect(() => sc.items.add('a2', 'str')).toThrow(/instance/);
            expect(result).toBeTruthy();
        });
        it("- 단일 타입 : items.요소명 = obj ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const result = sc.items.add('a1', s1);
            sc.items['a1'] = s2;

            expect(() => sc.items['a1'] = 10 ).toThrow(/instance/);
            expect(sc.items['a1'].level).toBe(2);                   // 교체된 객체
            expect(sc.items['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
        it("- 복합 타입 : items.add(name, obj) ", () => {
            const sc = new Corp();
            const s1 = new Student(1);
            const m1 = new Member(1);
            const result1 = sc.items.add('a1', s1);
            const result2 = sc.items.add('a2', m1);
            
            expect(() => sc.items.add('a3')).toThrow(/null/);
            expect(() => sc.items.add('a3', 'str')).toThrow(/instance/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : items.요소명 = obj ", () => {
            const sc = new Corp();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const m1 = new Member(1);
            const result1 = sc.items.add('a1', s1);
            const result2 = sc.items.add('a2', m1);
            sc.items['a1'] = s2;
            sc.items['a2'] = s2;

            expect(() => sc.items['a1'] = 'str' ).toThrow(/instance/);
            expect(sc.items['a1'].level).toBe(2);                   // 교체된 객체
            expect(sc.items['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(sc.items['a2'].level).toBe(2);                   // 교체된 객체
            expect(sc.items['a2'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("[ this.elementType 전체 타입을 설정할 경우 : 원시타입  ]", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = String }
            }
            Corp = class {
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = [String, Boolean] }
            }
        });
        it("- 단일 타입 : items.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.items.add('a1', 'A1');
            const result2 = i.items.add('a2', '');
            i.items['a1'] = 'AA1';
            i.items['a2'] = 'AA2';

            expect(() => i.items.add('a3')).toThrow(/string/);     // 공백 예외
            expect(() => i.items.add('a3', 10)).toThrow(/string/); // 타입 예외
            expect(() => i.items['a1'] = 10).toThrow(/string/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : items.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.items.add('a1', 'A1');
            const result2 = i.items.add('a2', true);
            
            expect(() => i.items.add('a3')).toThrow(/string/);     // 공백 예외
            expect(() => i.items.add('a3', 10)).toThrow(/boolean/); // 타입 예외
            expect(() => i.items.add('a3', {})).toThrow(/(boolean)|(string)/);
            expect(() => i.items['a1'] = 10).toThrow(/(boolean)|(string)/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
});

describe("< PropertyCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            items = new PropertyCollection(this);
        }
    });
    describe("< this.add(name, value?, desc?) >", () => {
        beforeAll(() => {
        });
        it("- add(name)", () => {
            let s = new Student();
            const result = s.items.add('a1');
    
            expect(s.items['a1']).toBe(null);
            expect(s.items.a1).toBe(null);
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(name, value) ", () => {
            let s = new Student();
            const result = s.items.add('a2', 'A2');
    
            expect(s.items['a2']).toBe('A2');
            expect(s.items.a2).toBe('A2');
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(name, value, desc) : 읽기 전용", () => {
            let s = new Student();
            const desc = {
                value: 'A3',
                writable: false
            };
            const result = s.items.add('a3', null, desc);

            expect(() => s.items['a3'] = 1).toThrow(/a3/);
            expect(s.items['a3']).toBe('A3');
            expect(s.items.a3).toBe('A3');
            expect(s.items.count).toBe(1);
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
            const result = s.items.add('a4', null, desc);
            s.items['a4'] = 'A4';

            expect(() => s.items['a4'] = 1).toThrow(/string/);
            expect(s.items['a4']).toBe('A4');
            expect(s.items.a4).toBe('A4');
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(name) : 중복 이름 등록시 (경고)", () => {
            let s = new Student();
            const logSpy = jest.spyOn(global.console, 'warn');
            const result1 = s.items.add('a1');
            const result2 = s.items.add('a1');
    
            expect(logSpy).toHaveBeenCalledWith('Warning:: 프로퍼티 이름 중복 !!');
            expect(result1).toBeTruthy();
            expect(result2).not.toBeTruthy();
            logSpy.mockRestore();
        });
        it("- add(name) : 예약어 사용시 (예외)", () => {
            let s = new Student();
            expect(() => s.items.add('_owner')).toThrow(/Symbol word/);
            expect(() => s.items.add('_element')).toThrow(/Symbol word/);
            expect(() => s.items.add('_symbol')).toThrow(/Symbol word/);
            expect(() => s.items.add('elementType')).toThrow(/Symbol word/);
            expect(() => s.items.add('list')).toThrow(/Symbol word/);
            expect(() => s.items.add('count')).toThrow(/Symbol word/);
            expect(() => s.items.add('onAddr')).toThrow(/Symbol word/);
            expect(() => s.items.add('onRemove')).toThrow(/Symbol word/);
            expect(() => s.items.add('onClear')).toThrow(/Symbol word/);
            expect(() => s.items.add('onChanging')).toThrow(/Symbol word/);
            expect(() => s.items.add('onChanged')).toThrow(/Symbol word/);
            expect(() => s.items.add('_remove')).toThrow(/Symbol word/);
            expect(() => s.items.add('add')).toThrow(/Symbol word/);
            expect(() => s.items.add('clear')).toThrow(/Symbol word/);
            expect(() => s.items.add('remove')).toThrow(/Symbol word/);
            expect(() => s.items.add('removeAt')).toThrow(/Symbol word/);
            expect(() => s.items.add('indexOf')).toThrow(/Symbol word/);
            expect(() => s.items.add('properties')).toThrow(/Symbol word/);
            expect(() => s.items.add('indexOfName')).toThrow(/Symbol word/);
            expect(() => s.items.add('propertyOf')).toThrow(/Symbol word/);
            expect(() => s.items.add('removeByname')).toThrow(/Symbol word/);
        });
        it("- add(name) : 이름을 숫자로 사용할 경우 (예외)", () => {
            let s = new Student();
            expect(() => s.items.add(10)).toThrow(/"string" can be added/);
        });
    });
    describe("< this.remove(elem) >", () => {
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- remove(elem) : string ", () => {
            let s = new Student();
            s.items.add('a1', 'A1');
            const result = s.items.remove('A1');

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- remove(elem) : number ", () => {
            let s = new Student();
            s.items.add('a1', 100);
            s.items.remove(100);

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : object ", () => {
            let s = new Student();
            const a1 = { name: 'O1' };
            s.items.add('a1', a1);
            s.items.remove(a1);

            expect(s.items['a1']).toBeUndefined();
            expect(s.items.a1).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : string (없을 경우)", () => {
            let s = new Student();
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
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- removeAt(idx) ", () => {
            let s = new Student();
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
            let s = new Student();
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
            let s = new Student();
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
            expect(s.items[0] === s.items['a2']).toBe(true);
            expect(s.items[1] === s.items['a3']).toBe(true);
            expect(s.items.indexOfName('a2')).toBe(0);  // 바뀐 idx 확인
            expect(s.items.indexOfName('a3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 중간 요소 삭제", () => {
            let s = new Student();
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
            expect(s.items[0] === s.items['a1']).toBe(true);
            expect(s.items[1] === s.items['a3']).toBe(true);
            expect(s.items.indexOfName('a1')).toBe(0);  
            expect(s.items.indexOfName('a3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
            let s = new Student();
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
            expect(s.items[0] === s.items['a1']).toBe(true);
            expect(s.items[1] === s.items['a2']).toBe(true);
            expect(s.items.indexOfName('a1')).toBe(0);  
            expect(s.items.indexOfName('a2')).toBe(1);
            expect(s.items.indexOfName('a4')).toBe(2);
            expect(s.items.count).toBe(3);
            expect(s.items.list.length).toBe(3);
            expect(result).toBeTruthy();
        });
    });
    describe("< this.removeByName(string) >", () => {
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- removeByName(name) : object ", () => {
            let s = new Student();
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
            let s = new Student();
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
        let s = new Student();
        s.items.add('a1', 'A1');
        s.items.add('a2', 'A2');
        s.items.add('a3', 'A3');
        s.items.clear();

        expect(s.items.count).toBe(0);
        expect(s.items.list.length).toBe(0);
        expect(s.items.properties.length).toBe(0);

    });
    it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
        let s = new Student();
        const a2 = { style: 1};
        s.items.add('a1', 'A1');
        s.items.add('a2', a2);
        s.items.add('a3', 10);

        expect(s.items.contains('A1')).toBeTruthy();
        expect(s.items.contains(a2)).toBeTruthy();
        expect(s.items.contains(10)).toBeTruthy();
        expect(s.items.count).toBe(3);

    });

    it("- indexOf() : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
        let s = new Student();
        const a2 = { style: 1};
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
        let s = new Student();
        const a2 = { style: 1};
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
        let s = new Student();
        const a2 = { style: 1};
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
});