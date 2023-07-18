/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {ArrayCollection}          = require('../src/collection-array');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test
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
            columns = new ArrayCollection(this);
            constructor() { this.columns.elementType = Student }
        }
        Corp = class {
            columns = new ArrayCollection(this);
            constructor() { this.columns.elementType = [Member, Student] }
        }
        House = class {
            columns = new ArrayCollection(this);
            constructor() { this.columns.elementType = null }
        }
        Space = class {
            columns = new ArrayCollection(this);
        }

    });
    it("- 단일 타입 : columns.add(name, obj) ", () => {
        const elem = new School();
        const c1 = new Student(1);
        const result = elem.columns.add(c1);
        
        expect(() => elem.columns.add(null)).toThrow(/instance/);
        expect(() => elem.columns.add('str')).toThrow(/instance/);
        expect(result).toBeTruthy();
    });
    it("- 단일 타입 : columns.요소명 = obj ", () => {
        const elem = new School();
        const c1 = new Student(1);
        const c2 = new Student(2);
        const result = elem.columns.add(c1);
        elem.columns[0] = c2;

        expect(() => elem.columns[0] = 10 ).toThrow(/instance/);
        expect(elem.columns[0].level).toBe(2);                   // 교체된 객체
        expect(elem.columns[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
        expect(result).toBeTruthy();
    });
    it("- null 타입 : columns.add(name, obj) ", () => {
        const elem = new House();
        const c1 = new Student(1);
        const result1 = elem.columns.add( c1);
        const result2 = elem.columns.add('str');
        
        expect(() => elem.columns.add()).toThrow(/없습니다./);
        expect(elem.columns[0].level).toBe(1);
        elem.columns[0] = 'OVER';
        expect(elem.columns[0]).toBe('OVER');
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
    it("- undefined 타입 : columns.add(name, obj) ", () => {
        const elem = new Space();
        const c1 = new Student(1);
        const result1 = elem.columns.add(c1);
        const result2 = elem.columns.add('str');
        const result3 = elem.columns.add();

        expect(elem.columns[0].level).toBe(1);
        expect(elem.columns[1]).toBe('str');
        expect(elem.columns[2]).toBeUndefined();
        elem.columns[2] = 'OVER';    // 수정
        expect(elem.columns[2]).toBe('OVER');
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(result3).toBeTruthy();
    });
    it("- 복합 타입 : columns.add(name, obj) ", () => {
        const elem = new Corp();
        const c1 = new Student(1);
        const m1 = new Member(1);
        const result1 = elem.columns.add(c1);
        const result2 = elem.columns.add(m1);
        
        expect(() => elem.columns.add(null)).toThrow(/instance/);
        expect(() => elem.columns.add('str')).toThrow(/instance/);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
    it("- 복합 타입 : columns.요소명 = obj ", () => {
        const elem = new Corp();
        const c1 = new Student(1);
        const c2 = new Student(2);
        const m1 = new Member(1);
        const result1 = elem.columns.add(c1);
        const result2 = elem.columns.add(m1);
        elem.columns[0] = c2;
        elem.columns[1] = c2;

        expect(() => elem.columns[0] = 'str' ).toThrow(/instance/);
        expect(elem.columns[0].level).toBe(2);                   // 교체된 객체
        expect(elem.columns[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
        expect(elem.columns[1].level).toBe(2);                   // 교체된 객체
        expect(elem.columns[1] instanceof Student).toBeTruthy(); // 인스턴스 검사
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
});
describe("[ this.elementType 전체 타입을 설정할 경우 : 원시타입  ]", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        School = class {
            columns = new ArrayCollection(this);
            constructor() { this.columns.elementType = String }
        }
        Corp = class {
            columns = new ArrayCollection(this);
            constructor() { this.columns.elementType = [String, Boolean] }
        }
    });
    it("- 단일 타입 : columns.add(name, obj) ", () => {
        const i = new School();
        const result1 = i.columns.add('A1');
        const result2 = i.columns.add('');
        i.columns[0] = 'AA1';
        i.columns[1] = 'AA2';

        expect(() => i.columns.add(null)).toThrow(/string/);     // 공백 예외
        expect(() => i.columns.add(10)).toThrow(/string/); // 타입 예외
        expect(() => i.columns[0] = 10).toThrow(/string/);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
    it("- 복합 타입 : columns.add(name, obj)  [String, Boolean] ", () => {
        const i = new Corp();
        const result1 = i.columns.add('A1');
        const result2 = i.columns.add(true);
        
        expect(() => i.columns.add(undefined)).toThrow(/(boolean)|(string)/);  // 값이 없음
        expect(() => i.columns.add(null)).toThrow(/(boolean)|(string)/);    // 공백 예외
        expect(() => i.columns.add(10)).toThrow(/(boolean)|(string)/);// 타입 예외
        expect(() => i.columns.add({})).toThrow(/(boolean)|(string)/);
        expect(() => i.columns[0] = 10).toThrow(/(boolean)|(string)/);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
    it("- 유무 검사 : exist(key) ", () => {
        const i = new Corp();
        const result1 = i.columns.add('A1');
        const result2 = i.columns.add(true);
        
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(i.columns.exist(0)).toBe(true);
        expect(i.columns.exist(1)).toBe(true);
        expect(i.columns.exist(2)).toBe(false);
        expect(i.columns.exist('0')).toBe(true);
        expect(i.columns.exist('1')).toBe(true);
        expect(i.columns.exist('2')).toBe(false);
        expect(()=> i.columns.exist(true)).toThrow(/key.*number.*string/);
    });
});
describe("< ArrayCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            columns = new ArrayCollection(this);
        }
    });
    describe("< this.add(value?, desc?) >", () => {
        beforeAll(() => {
        });
        it("- add() : undefined", () => {
            let s = new Student();
            const result = s.columns.add();
    
            expect(s.columns[0]).toBeUndefined();
            expect(s.columns.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(value) ", () => {
            let s = new Student();
            const result = s.columns.add('A1');
    
            expect(s.columns[0]).toBe('A1');
            expect(s.columns.count).toBe(1);
            expect(result).toBeTruthy();
        });
        it("- add(value, desc) : 읽기 전용", () => {
            let s = new Student();
            const desc = {
                value: 'A1',
                writable: false
            };
            const result = s.columns.add(null, desc);

            expect(() => s.columns[0] = 1).toThrow(/0/);
            expect(s.columns[0]).toBe('A1');
            expect(s.columns['0']).toBe('A1');
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
            const result = s.columns.add(null, desc);
            s.columns[0] = 'A1';

            expect(() => s.columns[0] = 1).toThrow(/string/);
            expect(s.columns[0]).toBe('A1');
            expect(s.columns['0']).toBe('A1');
            expect(s.columns.count).toBe(1);
            expect(result).toBeTruthy();
        });
    });
    describe("< this.remove(elem) >", () => {
        // beforeAll(() => {
        //     let s = new Student();
        // });
        it("- remove(elem) : string ", () => {
            let s = new Student();
            s.columns.add('A1');
            const result = s.columns.remove('A1');

            expect(s.columns[0]).toBeUndefined();
            expect(s.columns['0']).toBeUndefined();
            expect(s.columns.count).toBe(0);
            expect(s.columns.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- remove(elem) : number ", () => {
            let s = new Student();
            s.columns.add(100);
            s.columns.remove(100);

            expect(s.columns[0]).toBeUndefined();
            expect(s.columns['0']).toBeUndefined();
            expect(s.columns.count).toBe(0);
            expect(s.columns.list.length).toBe(0);
        });
        it("- remove(elem) : object ", () => {
            let s = new Student();
            const a1 = { name: 'O1' };
            s.columns.add(a1);
            s.columns.remove(a1);

            expect(s.columns[0]).toBeUndefined();
            expect(s.columns['0']).toBeUndefined();
            expect(s.columns.count).toBe(0);
            expect(s.columns.list.length).toBe(0);
        });
        it("- remove(elem) : string (없을 경우)", () => {
            let s = new Student();
            s.columns.add('A1');
            const result = s.columns.remove('A2');

            expect(s.columns[0]).not.toBeUndefined();
            expect(s.columns.count).toBe(1);
            expect(s.columns.list.length).toBe(1);
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
            s.columns.add('A1');
            const idx = s.columns.indexOf('A1');
            const result = s.columns.removeAt(idx);

            expect(s.columns[0]).toBeUndefined();
            expect(s.columns.count).toBe(0);
            expect(s.columns.list.length).toBe(0);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 없을 경우", () => {
            let s = new Student();
            s.columns.add('A1');
            const idx = s.columns.indexOf('A1');
            const result = s.columns.removeAt(idx + 1);

            expect(s.columns[0]).toBeTruthy();
            expect(s.columns.count).toBe(1);
            expect(s.columns.list.length).toBe(1);
            expect(result).not.toBeTruthy();
        });
        it("- removeAt(idx) : 첫째 요소 삭제", () => {
            let s = new Student();
            s.columns.add('A1');
            s.columns.add('A2');
            s.columns.add('A3');
            const result = s.columns.removeAt(0);

            expect(s.columns[0]).toBeDefined();
            expect(s.columns[1]).toBeDefined();
            expect(s.columns[2]).not.toBeDefined();
            expect(s.columns.indexOf('A2')).toBe(0);  // 바뀐 idx 확인
            expect(s.columns.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
            expect(s.columns.count).toBe(2);
            expect(s.columns.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 중간 요소 삭제", () => {
            let s = new Student();
            s.columns.add('A1');
            s.columns.add('A2');
            s.columns.add('A3');
            const result = s.columns.removeAt(1);

            expect(s.columns['0']).toBeDefined();
            expect(s.columns['1']).toBeDefined();
            expect(s.columns['2']).not.toBeDefined();
            expect(s.columns.indexOf('A1')).toBe(0);  
            expect(s.columns.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
            expect(s.columns.count).toBe(2);
            expect(s.columns.list.length).toBe(2);
            expect(result).toBeTruthy();
        });
        it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
            let s = new Student();
            s.columns.add('A1');
            s.columns.add('A2');
            s.columns.add('A3');
            const result = s.columns.removeAt(2);
            s.columns.add('A4');

            expect(s.columns[0]).toBeDefined();
            expect(s.columns[1]).toBeDefined();
            expect(s.columns[2]).toBeDefined();
            expect(s.columns[3]).not.toBeDefined();
            expect(s.columns.indexOf('A1')).toBe(0);  
            expect(s.columns.indexOf('A2')).toBe(1);
            expect(s.columns.indexOf('A4')).toBe(2);
            expect(s.columns.count).toBe(3);
            expect(s.columns.list.length).toBe(3);
            expect(result).toBeTruthy();
        });
        it("- removeAt(str) : 예외 ", () => {
            let s = new Student();

            expect(()=> s.columns.removeAt('1')).toThrow(/idx.*number/);
        });
    });
    it("- clear() ", () => {
        let s = new Student();
        s.columns.add('A1');
        s.columns.add('A2');
        s.columns.add('A3');
        s.columns.clear();

        expect(s.columns.count).toBe(0);
        expect(s.columns.list.length).toBe(0);
    });
    it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
        let s = new Student();
        const a2 = { style: 1};
        s.columns.add('A1');
        s.columns.add(a2);
        s.columns.add(10);

        expect(s.columns.contains('A1')).toBeTruthy();
        expect(s.columns.contains(a2)).toBeTruthy();
        expect(s.columns.contains(10)).toBeTruthy();
        expect(s.columns.count).toBe(3);
    });
    it("- indexOf() : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
        let s = new Student();
        const a2 = { style: 1};
        s.columns.add('A1');
        s.columns.add(a2);
        s.columns.add(10);
        s.columns.add(10);

        expect(s.columns.indexOf('A1')).toBe(0);
        expect(s.columns.indexOf(a2)).toBe(1);
        expect(s.columns.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
        expect(s.columns.count).toBe(4);
    });
});

