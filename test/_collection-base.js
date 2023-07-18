/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {PropertyCollection}          = require('../src/collection-property');
let School, Student, sc, st;

//==============================================================
// test
describe.skip("< BaseCollection >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 클래스 정의
        Student = class {
            level = 0;
            constructor(level) { this.level = level }
        }
        School = class {
            columns = new PropertyCollection(this);
            constructor() { this.columns.elementType = Student }
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
                columns = new PropertyCollection(this);
                constructor() { this.columns.elementType = Student }
            }
        });
        it("- columns.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result = sc.columns.add('a1', s1);
            
            expect(() => sc.columns.add('a2')).toThrow(/instance/);
            expect(() => sc.columns.add('a2', 'str')).toThrow(/instance/);
            expect(result).toBeTruthy();
        });
        it("- columns.요소명 = obj ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const s2 = new Student(2);
            const result = sc.columns.add('a1', s1);
            sc.columns['a1'] = s2;

            expect(() => sc.columns['a1'] = 10 ).toThrow(/instance/);
            expect(sc.columns['a1'].level).toBe(2);                   // 교체된 객체
            expect(sc.columns['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
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
                columns = new PropertyCollection(this);
                constructor() { this.columns.elementType = String }
            }
        });
        it("- columns.add(name, obj) ", () => {
            const sc = new School();
            const s1 = new Student(1);
            const result1 = sc.columns.add('a1', 'A1');
            const result2 = sc.columns.add('a2', '');
            
            expect(() => sc.columns.add('a3')).toThrow(/string/);     // 공백 예외
            expect(() => sc.columns.add('a3', 10)).toThrow(/string/); // 타입 예외
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
        

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