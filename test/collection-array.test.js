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
    it("- 단일 타입 : items.add(name, obj) ", () => {
        const sc = new School();
        const s1 = new Student(1);
        const result = sc.items.add('a1', s1);
        
        expect(() => sc.items.add('a2')).toThrow(/null/);
        expect(() => sc.items.add('a2', 'str')).toThrow(/instance/);
        expect(result).toBeTruthy();
    });
});