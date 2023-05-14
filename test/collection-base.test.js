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
        //     items = new ArrayCollection(this);
        //     constructor() { this.items.elementType = Student }
        // }
        School = class {
            items = new BaseCollection(this);
            constructor() { }
        }
        Corp = class {
            constructor() { }
        }
    });
    it("- 예외 : 상속 없이 사용할 경우 ", () => {
        const i = new School();
        
        expect(()=> i.items.add('a1')).toThrow(/add.*Abstract/);
        expect(()=> i.items.clear()).toThrow(/clear.*Abstract/);
        expect(()=> i.items._remove('a1')).toThrow(/_remove.*Abstract/);
    });
    it("- _owner : 변경  ", () => {
        const i1 = new School();
        const i2 = new Corp();
        i1.items._owner = i2;
        
        expect(i1.items._owner instanceof Corp).toBe(true);
    });
});
