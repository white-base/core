/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {BaseCollection}          = require('../src/collection-base');
const {ArrayCollection}          = require('../src/collection-array');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test
describe("[target: collection-base.js]", () => {
    describe("BaseCollection :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
            // 클래스 정의
            // Student = class {
            //     level = 0;
            //     constructor(level) { this.level = level }
            // }
            // School = class {
            //     columns = new ArrayCollection(this);
            //     constructor() { this.columns._elemTypes = Student }
            // } 
            School = class {
                columns = new ArrayCollection(this);
                constructor() { }
            }
            Corp = class {
                constructor() { }
            }
        });
        
        describe("예외, 소유자 변경", () => {
            it("- 예외 : 상속 없이 사용할 경우 ", () => {
                const i = new School();
                // REVIEW: 추상클래스는 생성자체를 할 수 없으므로 의미없음 
                
                // expect(()=> i.columns.add('a1')).toThrow(/ES013/);
                // expect(()=> i.columns.clear()).toThrow(/ES013/);
                // expect(()=> i.columns._remove('a1')).toThrow(/ES013/);
            });
            it("- _owner : 변경  ", () => {
                const i1 = new School();
                const i2 = new Corp();
                i1.columns._owner = i2;
                
                expect(i1.columns._owner instanceof Corp).toBe(true);
            });
        });
    });
});


