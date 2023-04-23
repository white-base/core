/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const ArrayCollection          = require('../src/collection-array');
let Student, School, Corp, Member;

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
        });
        it("- 단일 타입 : items.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result = sc.items.add(s1);
            
            expect(() => sc.items.add(null)).toThrow(/instance/);
            expect(() => sc.items.add('str')).toThrow(/instance/);
            expect(result).toBeTruthy();
        });
        it("- 단일 타입 : items.요소명 = obj ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const result = sc.items.add(s1);
            sc.items[0] = s2;

            expect(() => sc.items[0] = 10 ).toThrow(/instance/);
            expect(sc.items[0].level).toBe(2);                   // 교체된 객체
            expect(sc.items[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
        it("- 복합 타입 : items.add(name, obj) ", () => {
            const sc = new Corp();
            const s1 = new Student(1);
            const m1 = new Member(1);
            const result1 = sc.items.add(s1);
            const result2 = sc.items.add(m1);
            
            expect(() => sc.items.add(null)).toThrow(/instance/);
            expect(() => sc.items.add('str')).toThrow(/instance/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : items.요소명 = obj ", () => {
            const sc = new Corp();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const m1 = new Member(1);
            const result1 = sc.items.add(s1);
            const result2 = sc.items.add(m1);
            sc.items[0] = s2;
            sc.items[1] = s2;

            expect(() => sc.items[0] = 'str' ).toThrow(/instance/);
            expect(sc.items[0].level).toBe(2);                   // 교체된 객체
            expect(sc.items[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(sc.items[1].level).toBe(2);                   // 교체된 객체
            expect(sc.items[1] instanceof Student).toBeTruthy(); // 인스턴스 검사
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
    });
});