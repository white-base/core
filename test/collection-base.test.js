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
        describe("BaseCollection.equal() <객체 비교>", () => {
            it("- equal() : 생성 후 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1._guid === c2._guid).toBe(false);
                expect(c1 === c2).toBe(false);
            });
            it("- equal() : event 추가 후 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                const fun1 = function(){return 'F1'};
                c1.__event.subscribe(fun1, 'fun1');
                
                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : _elements 추가 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                const c3 = new ArrayCollection();
                c1._elements.push('A');
                c2._elements.push('A');
                c3._elements.push('B');
                
                expect(c1.count).toBe(1);
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
            });
            it("- equal() : _descriptors 추가 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                const c3 = new ArrayCollection();
                c1._descriptors.push({aa: 1});
                c2._descriptors.push({aa: 1});
                c3._descriptors.push({aa: 2});
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
            });
            it("- equal() : _elemType 추가 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                const c3 = new ArrayCollection();
                c1._elemTypes.push(String);
                c2._elemTypes.push(String);
                const fun1 = function(){return 'F1'};
                c3._elemTypes.push(fun1);
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
            });

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


