//==============================================================
// gobal defined
import BaseCollection from '../src/base-collection';
import MetaElement from '../src/meta-element';
import ArrayCollection from '../src/collection-array';
import MetaRegistry from '../src/meta-registry';
import {jest} from '@jest/globals';

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

        describe("BaseCollection.getObject() : setObject()", () => {
            it("- getObject() : setObject() ", () => {
                class SubCollection extends BaseCollection {
                    constructor(own){ super(own)}
                    clear(){
                    }
                }
                class Table extends MetaElement {
                    colleciton = new SubCollection(this);
                    constructor(name){ 
                        super(name);
                        this.colleciton._elemTypes = String;
                    }
                    getObject(p_vOpt, p_owned){
                        var obj = MetaElement.prototype.getObject.call(this, p_vOpt, p_owned);
                        obj['colleciton'] = this.colleciton.getObject(p_vOpt, p_owned);
                        return obj;
                    }
                    setObject(p_oGuid, p_origin){
                        MetaElement.prototype.setObject.call(this, p_oGuid, p_origin);
                        this.colleciton.setObject(p_oGuid['colleciton'], p_oGuid);
                    }
                }
                const t1 = new Table('t1');
                const rObj = t1.getObject();
                const mObj = MetaRegistry.transformRefer(rObj);  
                const t2 = new Table('t2');
                t2.setObject(mObj);
                const obj2 = t2.getObject();

                expect(rObj._type).toEqual(obj2._type);
                expect(rObj.name).toEqual(obj2.name);
            });
            it("- setObject() : EL04112 ", () => {
                var e1 = new MetaElement('e1')
                var a1 = new ArrayCollection(e1);
                var o1 = a1.getObject();
                var a2 = new ArrayCollection();

                expect(()=> a2.setObject(o1)).toThrow('EL04112')
            });
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
                
                expect(()=> s1.add()).toThrow(/EL04114/)
                expect(()=> s1.clear()).toThrow(/EL04115/)
            });

            it("- getObject()  ", () => {
                class SubCollection extends BaseCollection {
                    constructor(){ super()}
                }
                const s1 = new SubCollection();
               const obj1 = s1.getObject( 0, {})
            });
            
            it("- 커버리지 :  this.$elements ", () => {
                class SubCollection extends BaseCollection {
                    constructor(){ super()}
                }
                const s1 = new SubCollection();
               const obj1 = s1.$elements
               const obj2 = s1.$descriptors
            });

        });
        
    });
});


