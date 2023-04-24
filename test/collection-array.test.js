/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const ArrayCollection          = require('../src/collection-array');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test

describe("< BaseCollection >", () => {
    beforeAll(() => {
        // jest.resetModules();
        // 클래스 정의
        // Student = class {
        //     level = 0;
        //     constructor(level) { this.level = level }
        // }
        // School = class {
        //     items = new ArrayCollection(this);
        //     constructor() { this.items.elementType = Student }
        // }
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
                items = new ArrayCollection(this);
                constructor() { this.items.elementType = Student }
            }
            Corp = class {
                items = new ArrayCollection(this);
                constructor() { this.items.elementType = [Member, Student] }
            }
            House = class {
                items = new ArrayCollection(this);
                constructor() { this.items.elementType = null }
            }
            Space = class {
                items = new ArrayCollection(this);
            }

        });
        it("- 단일 타입 : items.add(name, obj) ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const result = elem.items.add(c1);
            
            expect(() => elem.items.add(null)).toThrow(/instance/);
            expect(() => elem.items.add('str')).toThrow(/instance/);
            expect(result).toBeTruthy();
        });
        it("- 단일 타입 : items.요소명 = obj ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const result = elem.items.add(c1);
            elem.items[0] = c2;

            expect(() => elem.items[0] = 10 ).toThrow(/instance/);
            expect(elem.items[0].level).toBe(2);                   // 교체된 객체
            expect(elem.items[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
        it("- null 타입 : items.add(name, obj) ", () => {
            const elem = new House();
            const c1 = new Student(1);
            const result1 = elem.items.add( c1);
            const result2 = elem.items.add('str');
            
            expect(() => elem.items.add()).toThrow(/없습니다./);
            expect(elem.items[0].level).toBe(1);
            elem.items[0] = 'OVER';
            expect(elem.items[0]).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- undefined 타입 : items.add(name, obj) ", () => {
            const elem = new Space();
            const c1 = new Student(1);
            const result1 = elem.items.add(c1);
            const result2 = elem.items.add('str');
            const result3 = elem.items.add();

            expect(elem.items[0].level).toBe(1);
            expect(elem.items[1]).toBe('str');
            expect(elem.items[2]).toBeUndefined();
            elem.items[2] = 'OVER';    // 수정
            expect(elem.items[2]).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- 복합 타입 : items.add(name, obj) ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const m1 = new Member(1);
            const result1 = elem.items.add(c1);
            const result2 = elem.items.add(m1);
            
            expect(() => elem.items.add(null)).toThrow(/instance/);
            expect(() => elem.items.add('str')).toThrow(/instance/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : items.요소명 = obj ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const m1 = new Member(1);
            const result1 = elem.items.add(c1);
            const result2 = elem.items.add(m1);
            elem.items[0] = c2;
            elem.items[1] = c2;

            expect(() => elem.items[0] = 'str' ).toThrow(/instance/);
            expect(elem.items[0].level).toBe(2);                   // 교체된 객체
            expect(elem.items[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(elem.items[1].level).toBe(2);                   // 교체된 객체
            expect(elem.items[1] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("[ this.elementType 전체 타입을 설정할 경우 : 원시타입  ]", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                items = new ArrayCollection(this);
                constructor() { this.items.elementType = String }
            }
            Corp = class {
                items = new ArrayCollection(this);
                constructor() { this.items.elementType = [String, Boolean] }
            }
        });
        it("- 단일 타입 : items.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.items.add('A1');
            const result2 = i.items.add('');
            i.items[0] = 'AA1';
            i.items[1] = 'AA2';

            expect(() => i.items.add(null)).toThrow(/string/);     // 공백 예외
            expect(() => i.items.add(10)).toThrow(/string/); // 타입 예외
            expect(() => i.items[0] = 10).toThrow(/string/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : items.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.items.add('A1');
            const result2 = i.items.add(true);
            
            expect(() => i.items.add(undefined)).toThrow(/(boolean)|(string)/);  // 값이 없음
            expect(() => i.items.add(null)).toThrow(/(boolean)|(string)/);    // 공백 예외
            expect(() => i.items.add(10)).toThrow(/(boolean)|(string)/);// 타입 예외
            expect(() => i.items.add({})).toThrow(/(boolean)|(string)/);
            expect(() => i.items[0] = 10).toThrow(/(boolean)|(string)/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 유무 검사 : exist(key) ", () => {
            const i = new Corp();
            const result1 = i.items.add('A1');
            const result2 = i.items.add(true);
            
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(i.items.exist(0)).toBe(true);
            expect(i.items.exist(1)).toBe(true);
            expect(i.items.exist(2)).toBe(false);
            expect(i.items.exist('0')).toBe(true);
            expect(i.items.exist('1')).toBe(true);
            expect(i.items.exist('2')).toBe(false);
        });
    });
});
describe("< ArrayCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            items = new ArrayCollection(this);
        }
    });
    describe("< this.add(value?, desc?) >", () => {
        beforeAll(() => {
        });
        it("- add() : undefined", () => {
            let s = new Student();
            const result = s.items.add();
    
            expect(s.items[0]).toBeUndefined();
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(value) ", () => {
            let s = new Student();
            const result = s.items.add('A1');
    
            expect(s.items[0]).toBe('A1');
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(value, desc) : 읽기 전용", () => {
            let s = new Student();
            const desc = {
                value: 'A1',
                writable: false
            };
            const result = s.items.add(null, desc);

            expect(() => s.items[0] = 1).toThrow(/0/);
            expect(s.items[0]).toBe('A1');
            expect(s.items['0']).toBe('A1');
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
            const result = s.items.add(null, desc);
            s.items[0] = 'A1';

            expect(() => s.items[0] = 1).toThrow(/string/);
            expect(s.items[0]).toBe('A1');
            expect(s.items['0']).toBe('A1');
            expect(s.items.count).toBe(1);
            expect(result).toBeTruthy();
        });
    });
    describe("< this.remove(elem) >", () => {
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- remove(elem) : string ", () => {
            let s = new Student();
            s.items.add('A1');
            const result = s.items.remove('A1');

            expect(s.items[0]).toBeUndefined();
            expect(s.items['0']).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- remove(elem) : number ", () => {
            let s = new Student();
            s.items.add(100);
            s.items.remove(100);

            expect(s.items[0]).toBeUndefined();
            expect(s.items['0']).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : object ", () => {
            let s = new Student();
            const a1 = { name: 'O1' };
            s.items.add(a1);
            s.items.remove(a1);

            expect(s.items[0]).toBeUndefined();
            expect(s.items['0']).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
        });
        it("- remove(elem) : string (없을 경우)", () => {
            let s = new Student();
            s.items.add('A1');
            const result = s.items.remove('A2');

            expect(s.items[0]).not.toBeUndefined();
            expect(s.items.count).toBe(1);
            expect(s.items.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
    });
    /**
     * REVIEW: 동일한 요소가 있을 경우 중복삭제의 이슈
     * 현재는 첫번째 요소를 삭제 후 두번째 삭제시 두번째 요소를 검색함
     *  방안>
     *  - 첫번재 것만 삭제
     *  - 모두 삭제
     *  - 경고 메세지
     *  - remove 메소드 삭제
     */
    describe("< this.removeAt(num) >", () => {
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- removeAt(idx) ", () => {
            let s = new Student();
            s.items.add('A1');
            const idx = s.items.indexOf('A1');
            const result = s.items.removeAt(idx);

            expect(s.items[0]).toBeUndefined();
            expect(s.items.count).toBe(0);
            expect(s.items.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 없을 경우", () => {
            let s = new Student();
            s.items.add('A1');
            const idx = s.items.indexOf('A1');
            const result = s.items.removeAt(idx + 1);

            expect(s.items[0]).toBeTruthy();
            expect(s.items.count).toBe(1);
            expect(s.items.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
        it("- removeAt(idx) : 첫째 요소 삭제", () => {
            let s = new Student();
            s.items.add('A1');
            s.items.add('A2');
            s.items.add('A3');
            const result = s.items.removeAt(0);

            expect(s.items[0]).toBeDefined();
            expect(s.items[1]).toBeDefined();
            expect(s.items[2]).not.toBeDefined();
            expect(s.items.indexOf('A2')).toBe(0);  // 바뀐 idx 확인
            expect(s.items.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 중간 요소 삭제", () => {
            let s = new Student();
            s.items.add('A1');
            s.items.add('A2');
            s.items.add('A3');
            const result = s.items.removeAt(1);

            expect(s.items['0']).toBeDefined();
            expect(s.items['1']).toBeDefined();
            expect(s.items['2']).not.toBeDefined();
            expect(s.items.indexOf('A1')).toBe(0);  
            expect(s.items.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
            expect(s.items.count).toBe(2);
            expect(s.items.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
            let s = new Student();
            s.items.add('A1');
            s.items.add('A2');
            s.items.add('A3');
            const result = s.items.removeAt(2);
            s.items.add('A4');

            expect(s.items[0]).toBeDefined();
            expect(s.items[1]).toBeDefined();
            expect(s.items[2]).toBeDefined();
            expect(s.items[3]).not.toBeDefined();
            expect(s.items.indexOf('A1')).toBe(0);  
            expect(s.items.indexOf('A2')).toBe(1);
            expect(s.items.indexOf('A4')).toBe(2);
            expect(s.items.count).toBe(3);
            expect(s.items.list.length).toBe(3);
            expect(result).toBeTruthy();
        });
    });
    it("- clear() ", () => {
        let s = new Student();
        s.items.add('A1');
        s.items.add('A2');
        s.items.add('A3');
        s.items.clear();

        expect(s.items.count).toBe(0);
        expect(s.items.list.length).toBe(0);
    });
    it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
        let s = new Student();
        const a2 = { style: 1};
        s.items.add('A1');
        s.items.add(a2);
        s.items.add(10);

        expect(s.items.contains('A1')).toBeTruthy();
        expect(s.items.contains(a2)).toBeTruthy();
        expect(s.items.contains(10)).toBeTruthy();
        expect(s.items.count).toBe(3);
    });
    it("- indexOf() : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
        let s = new Student();
        const a2 = { style: 1};
        s.items.add('A1');
        s.items.add(a2);
        s.items.add(10);
        s.items.add(10);

        expect(s.items.indexOf('A1')).toBe(0);
        expect(s.items.indexOf(a2)).toBe(1);
        expect(s.items.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
        expect(s.items.count).toBe(4);
    });
});

