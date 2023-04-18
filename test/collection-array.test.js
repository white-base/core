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
    it("- items.add(name, obj) ", () => {
        // const sc = new School();
        // const s1 = new Student(1);
        // const result1 = sc.items.add('a1', 'A1');
        // const result2 = sc.items.add('a2', '');
        
        // expect(() => sc.items.add('a3')).toThrow();     // 공백 예외
        // expect(() => sc.items.add('a3', 10)).toThrow(/string/); // 타입 예외
        // expect(result1).toBeTruthy();
        // expect(result2).toBeTruthy();
    });
});