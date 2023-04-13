/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const PropertyCollection          = require('../src/collection-property');
let School, Student, sc, st;

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
            School = class {
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = Student }
            }
        });
        it("- items.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result = sc.items.add('a1', s1);
            
            expect(() => sc.items.add('a2')).toThrow(/type instances/);
            expect(() => sc.items.add('a2', 'str')).toThrow(/type instances/);
            expect(result).toBeTruthy();
        });
        it("- items.요소명 = obj ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const result = sc.items.add('a1', s1);
            sc.items['a1'] = s2;

            expect(() => sc.items['a1'] = 10 ).toThrow(/type instances/);
            expect(sc.items['a1'].level).toBe(2);                   // 교체된 객체
            expect(sc.items['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
    });
    describe("[ this.elementType 전체 타입을 설정할 경우 : 원시타입(String)  ]", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                level = 0;
                constructor(level) { this.level = level }
            }
            School = class {
                items = new PropertyCollection(this);
                constructor() { this.items.elementType = String }
            }
        });
        it("- items.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result1 = sc.items.add('a1', 'A1');
            const result2 = sc.items.add('a2', '');
            
            expect(() => sc.items.add('a3')).toThrow(/type instances/);     // 공백 예외
            expect(() => sc.items.add('a3', 10)).toThrow(/type instances/); // 타입 예외
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        // it("- items.요소명 = obj ", () => {
        //     const sc = new School();
        //     const s1 = new Student(1);
        //     const s2 = new Student(2);
        //     const result = sc.items.add('a1', s1);
        //     sc.items['a1'] = s2;

        //     expect(() => sc.items['a1'] = 10 ).toThrow(/type instances/);
        //     expect(sc.items['a1'].level).toBe(2);                   // 교체된 객체
        //     expect(sc.items['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
        //     expect(result).toBeTruthy();
        // });
    });
    /**
     * this.items.elementType  예외
     */
        

});
/**
 * TODO: 
 * - _getPropDescriptor() : 상속할때 오버라이딩해서 변형 => 나중에..
 *  + elementType : 타입으로 간단하게 타입의 검사가 가능할 수 있다.
 *  + 세부 제어를 위해서 _get... 을 사용함
 * - elementType 타입 지정시 해당 인스턴스만 입력가능
 * 
 * ###############################
 * - 이벤트 => 별도로 파일로 분리
 * - 삭제 : collection-property-function, collection-property-object
 */