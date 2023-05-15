/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const BaseCollection          = require('../src/collection-base');
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
        //     columns = new ArrayCollection(this);
        //     constructor() { this.columns.elementType = Student }
        // }
        School = class {
            columns = new BaseCollection(this);
            constructor() { }
        }
        Corp = class {
            constructor() { }
        }
    });
    it("- 예외 : 상속 없이 사용할 경우 ", () => {
        const i = new School();
        
        expect(()=> i.columns.add('a1')).toThrow(/add.*Abstract/);
        expect(()=> i.columns.clear()).toThrow(/clear.*Abstract/);
        expect(()=> i.columns._remove('a1')).toThrow(/_remove.*Abstract/);
    });
    it("- _owner : 변경  ", () => {
        const i1 = new School();
        const i2 = new Corp();
        i1.columns._owner = i2;
        
        expect(i1.columns._owner instanceof Corp).toBe(true);
    });
});
