/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {BaseCollection}          = require('../src/base-collection');
const {ArrayCollection}          = require('../src/collection-array');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test
describe("[target: base-collection.js]", () => {
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
        
        describe("BaseCollection.removeAt() : 지정 삭제", () => {

        });

        describe("예외 및 커버리지", () => {

            it("- _owner : 변경  ", () => {
                const i1 = new School();
                const i2 = new Corp();
                i1.columns._owner = i2;
                
                expect(i1.columns._owner instanceof Corp).toBe(true);
            });
            it("- add(), clear : 추상메소드 미구현  ", () => {
                class SubCollection extends BaseCollection {
                    constructor(){ super()}
                }
                const s1 = new SubCollection();
               
                expect(()=> s1.add()).toThrow(/ES013/)
                expect(()=> s1.clear()).toThrow(/ES013/)
            });

            it("- getObject()  ", () => {
                class SubCollection extends BaseCollection {
                    constructor(){ super()}
                }
                const s1 = new SubCollection();
               const obj1 = s1.getObject( 0, {})
            });

        });
        
    });
});


