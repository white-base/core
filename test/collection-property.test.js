//==============================================================
// gobal defined
import MetaElement from '../src/meta-element';
import MetaRegistry from '../src/meta-registry';
import PropertyCollection from '../src/collection-property';
import {jest} from '@jest/globals';

let Student, School, Member, Corp, House, Space;
//==============================================================
// test
describe("[target: collection-property.js, base-collection.js]", () => {
    describe("PropertyCollection :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                columns = new PropertyCollection(this);
            }
        });
        describe("MetaObject.equal() <객체 비교>", () => {
            it("- equal() : 생성 후 비교 ", () => {
                const c1 = new PropertyCollection();
                const c2 = new PropertyCollection();
                const c3 = new PropertyCollection();
                c1.add('a1');
                c2.add('a1');
                c3.add('a2');
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
                expect(c1._guid === c2._guid).toBe(false);
            });
            it("- equal() : event 추가 후 비교 ", () => {
                const c1 = new PropertyCollection();
                const c2 = new PropertyCollection();
                const fun1 = function(){return 'F1'};
                c1.$event.on('fun1', fun1);
                
                expect(c1.equal(c2)).toBe(false);
            });
            it.skip("- equal() : _descriptors 추가 비교 ", () => {
                const c1 = new PropertyCollection();
                const c2 = new PropertyCollection();
                const c3 = new PropertyCollection();
                c1._descriptors.push({aa: 1});
                c2._descriptors.push({aa: 1});
                c3._descriptors.push({aa: 2});
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
            });
            it("- equal() : _elemType 추가 비교 ", () => {
                const c1 = new PropertyCollection();
                const c2 = new PropertyCollection();
                const c3 = new PropertyCollection();
                c1._elemTypes.push(String);
                c2._elemTypes.push(String);
                const fun1 = function(){return 'F1'};
                c3._elemTypes.push(fun1);
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1.equal(c3)).toBe(false);
            });
        });

        describe("BaseCollection.remove(elem): bool <삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- remove(elem) : string ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const result = s.columns.remove('A1');
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
                expect(result > -1).toBeTruthy();
            });
            it("- remove(elem) : number ", () => {
                let s = new Student();
                s.columns.add('a1', 100);
                s.columns.remove(100);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
            });
            it("- remove(elem) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.columns.add('a1', a1);
                s.columns.remove(a1);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
            });
            it("- remove(elem) : string (없을 경우)", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const result = s.columns.remove('A2');
    
                expect(s.columns['a1']).not.toBeUndefined();
                expect(s.columns.a1).not.toBeUndefined();
                expect(s.columns.count).toBe(1);
                expect(s.columns._list.length).toBe(1);
                expect(result > -1).not.toBeTruthy();
            });
        });
        describe("BaseCollection.removeAt(num): bool <인덱스로 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(idx) ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const idx = s.columns.keyToIndex('a1');
                const result = s.columns.removeAt(idx);
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 없을 경우", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                const idx = s.columns.keyToIndex('a1');
                const result = s.columns.removeAt(idx + 1);
    
                expect(s.columns['a1']).toBeTruthy();
                expect(s.columns.a1).toBeTruthy();
                expect(s.columns.count).toBe(1);
                expect(s.columns._list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
            it("- removeAt(idx) : 첫째 요소 삭제", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(0);
    
                expect(s.columns['a1']).not.toBeDefined();
                expect(s.columns.a1).not.toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns.a2).toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns.a3).toBeDefined();
                expect(s.columns[0] === s.columns['a2']).toBe(true);
                expect(s.columns[1] === s.columns['a3']).toBe(true);
                expect(s.columns.keyToIndex('a2')).toBe(0);  // 바뀐 idx 확인
                expect(s.columns.keyToIndex('a3')).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(2);
                expect(s.columns._list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 중간 요소 삭제", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(1);
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns.a1).toBeDefined();
                expect(s.columns['a2']).not.toBeDefined();
                expect(s.columns.a2).not.toBeDefined();
                expect(s.columns['a3']).toBeDefined();
                expect(s.columns.a3).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a3']).toBe(true);
                expect(s.columns.keyToIndex('a1')).toBe(0);  
                expect(s.columns.keyToIndex('a3')).toBe(1);  // 바뀐 idx 확인
                expect(s.columns.count).toBe(2);
                expect(s.columns._list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                const result = s.columns.removeAt(2);
                s.columns.add('a4', 'A4');
    
                expect(s.columns['a1']).toBeDefined();
                expect(s.columns.a1).toBeDefined();
                expect(s.columns['a2']).toBeDefined();
                expect(s.columns.a2).toBeDefined();
                expect(s.columns['a3']).not.toBeDefined();
                expect(s.columns.a3).not.toBeDefined();
                expect(s.columns['a4']).toBeDefined();
                expect(s.columns.a4).toBeDefined();
                expect(s.columns[0] === s.columns['a1']).toBe(true);
                expect(s.columns[1] === s.columns['a2']).toBe(true);
                expect(s.columns.keyToIndex('a1')).toBe(0);  
                expect(s.columns.keyToIndex('a2')).toBe(1);
                expect(s.columns.keyToIndex('a4')).toBe(2);
                expect(s.columns.count).toBe(3);
                expect(s.columns._list.length).toBe(3);
                expect(result).toBeTruthy();
            });
        });
        // property 에는 insertAt 기능 빠짐
        // describe.skip("this.insertAt(num, name): bool <idx 위치에 추가>", () => {
        //     // beforeAll(() => {
        //     //     let s = new Student();
        //     // });
        //     it("- insertAt(idx) : 첫째 요소 삭제", () => {
        //         let s = new Student();
        //         s.columns.add('a2', 'A2');
        //         s.columns.add('a3', 'A3');
        //         const result = s.columns.insertAt(0, 'a1', 'A1');
    
        //         expect(s.columns['a1']).toBeDefined();
        //         expect(s.columns['a2']).toBeDefined();
        //         expect(s.columns['a3']).toBeDefined();
        //         expect(s.columns[0] === s.columns['a1']).toBe(true);
        //         expect(s.columns[1] === s.columns['a2']).toBe(true);
        //         expect(s.columns[2] === s.columns['a3']).toBe(true);
        //         expect(s.columns.indexOf('a1', 1)).toBe(0);  // 바뀐 idx 확인
        //         expect(s.columns.indexOf('a2', 1)).toBe(1);  // 바뀐 idx 확인
        //         expect(s.columns.indexOf('a3', 1)).toBe(2);  // 바뀐 idx 확인
        //         expect(s.columns.count).toBe(3);
        //         expect(s.columns.list.length).toBe(3);
        //         expect(result).toBeTruthy();
        //     });
        //     it("- insertAt(idx) : 중간 요소 추가", () => {
        //         let s = new Student();
        //         s.columns.add('a1', 'A1');
        //         s.columns.add('a3', 'A3');
        //         const result = s.columns.insertAt(1, 'a2', 'A2');
    
        //         expect(s.columns['a1']).toBeDefined();
        //         expect(s.columns['a2']).toBeDefined();
        //         expect(s.columns['a3']).toBeDefined();
        //         expect(s.columns[0] === s.columns['a1']).toBe(true);
        //         expect(s.columns[1] === s.columns['a2']).toBe(true);
        //         expect(s.columns[2] === s.columns['a3']).toBe(true);
        //         expect(s.columns.indexOf('a1', 1)).toBe(0);  // 바뀐 idx 확인
        //         expect(s.columns.indexOf('a2', 1)).toBe(1);  // 바뀐 idx 확인
        //         expect(s.columns.indexOf('a3', 1)).toBe(2);  // 바뀐 idx 확인
        //         expect(s.columns.count).toBe(3);
        //         expect(s.columns.list.length).toBe(3);
        //         expect(result).toBeTruthy();
        //     });
        //     it("- insertAt(idx) : 마지막 요소 추가 후 add()", () => {
        //         let s = new Student();
        //         s.columns.add('a1', 'A1');
        //         s.columns.add('a2', 'A2');
        //         const result = s.columns.insertAt(2, 'a3', 'A3');
        //         s.columns.add('a4', 'A4');
    
        //         expect(s.columns['a1']).toBeDefined();
        //         expect(s.columns['a2']).toBeDefined();
        //         expect(s.columns['a3']).toBeDefined();
        //         expect(s.columns['a4']).toBeDefined();
        //         expect(s.columns[0] === s.columns['a1']).toBe(true);
        //         expect(s.columns[1] === s.columns['a2']).toBe(true);
        //         expect(s.columns[2] === s.columns['a3']).toBe(true);
        //         expect(s.columns[3] === s.columns['a4']).toBe(true);
        //         expect(s.columns.indexOf('a1', 1)).toBe(0);  
        //         expect(s.columns.indexOf('a2', 1)).toBe(1);
        //         expect(s.columns.indexOf('a3', 1)).toBe(2);
        //         expect(s.columns.indexOf('a4', 1)).toBe(3);
        //         expect(s.columns.count).toBe(4);
        //         expect(s.columns.list.length).toBe(4);
        //         expect(result).toBeTruthy();
        //     });
        //     it("- insertAt(pos) : 예외 : 사이즈 초과", () => {
        //         let s = new Student();
        //         s.columns.add('a0', 'A0');
        //         s.columns.add('a1', 'A1');

        //         expect(()=> s.columns.insertAt(3, 'a2', 'A2')).toThrow(/pos.*size/);
        //     });
        //     it("- insertAt(pos) : 예외 : 0 보다 작을 경우", () => {
        //         let s = new Student();
        //         s.columns.add('a0', 'A0');
        //         s.columns.add('a1', 'A1');

        //         expect(()=> s.columns.insertAt(-1, 'a2', 'A2')).toThrow(/pos.*0/);
        //     });
        // });
        
        describe("BaseCollection.removeAt(this.indexOf(name, 1)): bool <이름으로 삭제> ", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(this.indexOf(name, 1)) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
    
                s.columns.add('a1', a1);
                // const result = s.columns.removeByProp('a1');
                const result = s.columns.removeAt(s.columns.keyToIndex('a1'));
    
                expect(s.columns['a1']).toBeUndefined();
                expect(s.columns.a1).toBeUndefined();
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(this.indexOf(name, 1)) : 없는 경우 ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.columns.add('a1', a1);
                // const result = s.columns.removeByProp('a5');
                const result =  s.columns.removeAt(s.columns.indexOf('a5', 1));
    
                expect(s.columns['a1']).not.toBeUndefined();
                expect(s.columns.a1).not.toBeUndefined();
                expect(s.columns.count).toBe(1);
                expect(s.columns._list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
        });
        describe("BaseCollection.contains() <유무 검사> ", () => {
            it("- contains(elem) : 존재하는지 확인, {특정요소를 찾을경우 : name}", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
        
                expect(s.columns.contains('A1')).toBeTruthy();
                expect(s.columns.contains(a2)).toBeTruthy();
                expect(s.columns.contains(10)).toBeTruthy();
                expect(s.columns.count).toBe(3);
            });
        });
        
        describe("BaseCollection.exists(key) <키 유무 검사> ", () => {
            it("- exists(key) : 유무 검사  ", () => {
                const i = new Student();
                const result1 = i.columns.add('a1', 'A1');
                const result2 = i.columns.add('a2', true);
                
                expect(result1 > -1).toBeTruthy();
                expect(result2).toBeTruthy();
                expect(i.columns.exists('a1')).toBe(true);
                expect(i.columns.exists('a2')).toBe(true);
                expect(i.columns.exists('a3')).toBe(false);
                // expect(i.columns.exists(0)).toBe(false);
                // expect(i.columns.exists(1)).toBe(true);
                // expect(i.columns.exists(2)).toBe(false);
                expect(i.columns.exists('0')).toBe(true);
                expect(i.columns.exists('1')).toBe(true);
                expect(i.columns.exists('2')).toBe(false);
                expect(()=> i.columns.exists(true)).toThrow(/EL0422B/);
            });
        });

        
        describe("PropertyCollection._remove(idx) <삭제 : 내부> ", () => {
            it("- _remove(idx)  : 내부 함수로 삭제 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns._remove(0);
        
                expect(s.columns.count).toBe(0);
            });
        });
        
        describe("PropertyCollection.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 직렬화 객체 얻기 ", () => {
                const a1 = new PropertyCollection();
                a1.add('a1', 10);
                a1.add('a2', 20);
                const obj = a1.getObject();
        
                expect(obj._elem).toEqual([10, 20]);
                expect(obj._key).toEqual(['a1', 'a2']);
                expect(obj._type === 'Collection.PropertyCollection').toBe(true);
            });
            it("- getObject() : 직렬화 객체 얻기 <상속, _NS 설정 안함>", () => {
                class SubClass extends PropertyCollection{
                    constructor(){ super() }
                }
                const a1 = new SubClass();
                a1.add('a1', 10);
                a1.add('a2', 20);
                const obj = a1.getObject();
        
                expect(obj._elem).toEqual([10, 20]);
                expect(obj._key).toEqual(['a1', 'a2']);
                expect(obj._type === 'Collection.SubClass').toBe(true);
            });
            it("- getObject() : 직렬화 객체 얻기 <상속, _NS 설정>", () => {
                class SubClass extends PropertyCollection{
                    constructor(){ super() }
                    static _NS = 'Etc'
                }
                const a1 = new SubClass();
                const obj = a1.getObject();
        
                expect(obj._type === 'Etc.SubClass').toBe(true);
            });
            it("- getObject() : 메타객체와 참조객체 얻기 ", () => {
                const a1 = new PropertyCollection();
                const m1 = new MetaElement('E1')
                a1.add('p1', m1);
                a1.add('p2', m1);
                const obj = a1.getObject();
        
                expect(obj._elem[0]._guid).toBe(m1._guid)
                expect(obj._elem[1].$ref).toBe(m1._guid)
                expect(obj._type === 'Collection.PropertyCollection').toBe(true);
            });
            it("- 커버리지 ", () => {
                const a1 = new PropertyCollection();
                const obj = a1.getObject(0, {});
            });
        });
        describe("PropertyCollection.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const a1 = new PropertyCollection();
                a1.add('a1', 10);
                a1.add('a2', 20);
                const obj = a1.getObject();
                const a2 = new PropertyCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(a2[0]).toBe(10);
                expect(a2[1]).toBe(20);
                expect(a2['a1']).toBe(10);
                expect(a2['a2']).toBe(20);
            });
            it("- setObject() : 메타객체와 참조 ", () => {
                const a1 = new PropertyCollection();
                const m1 = new MetaElement('E1')
                a1.add('a1', m1);
                a1.add('a2', m1);
                const obj = a1.getObject();
                const a2 = new PropertyCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(m1.equal(a2[0])).toBe(true);
                expect(m1.equal(a2[1])).toBe(true);
                expect(m1.equal(a2['a1'])).toBe(true);
                expect(m1.equal(a2['a2'])).toBe(true);
            });
            it("- setObject() : 빈 컬렉션  ", () => {
                const a1 = new PropertyCollection();
                const obj = a1.getObject();
                const a2 = new PropertyCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(0);
                expect(a2.count).toBe(0);
            });
            it("- setObject() : PropertyCollection 속성 ", () => {
                class Table extends MetaElement {
                    colleciton = new PropertyCollection(this);
                    constructor(name){ 
                        super(name);
                        this.colleciton._elemTypes = Number;
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
                const desc = {
                    value: 'A1',
                    writable: true
                };
                var t1 = new Table('t1');
                t1.colleciton.add('n1', 10, desc);
                const obj = t1.getObject();
                var t2 = new Table('t2');
                t2.setObject(obj);

                expect(t2.colleciton.count).toBe(1);
                expect(t2.colleciton[0]).toBe(10);
            });
            it("- setObject() : 예외 : $ref 삽입 ", () => {
                const a1 = new PropertyCollection();
                const m1 = new MetaElement('E1');
                const ref1 = MetaRegistry.createReferObject(m1);
                ref1.$ref = 'ERR'
                a1.add('n1', m1);
                a1.add('n2', ref1);
                const obj = a1.getObject();
                const a2 = new PropertyCollection();
        
                expect(()=> a2.setObject(obj)).toThrow(/EL04223/)
            });
            it("- setObject() : 예외 <_key, _dest 크기다름> ", () => {
                const a1 = new PropertyCollection();
                a1.add('a1', 10);
                a1.add('a2', 20);
                const a2 = new PropertyCollection();
                const obj1 = a1.getObject();
                const obj2 = a1.getObject();
                obj1._desc.pop()
                obj2._key.pop()
                
                expect(()=> a2.setObject(obj1)).toThrow(/EL04222/)
                expect(()=> a2.setObject(obj2)).toThrow(/EL04221/)
        
            });
            
        });
        describe("PropertyCollection.indexOf(obj | str | num): num <인덱스 조회> ", () => {
            it("- indexOf(elem) : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.indexOf('A1')).toBe(0);
                expect(s.columns.indexOf(a2)).toBe(1);
                expect(s.columns.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
                expect(s.columns.count).toBe(4);
            });
            it.skip("- indexOf(name, 1) ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.indexOf('a1', 1)).toBe(0);
                expect(s.columns.indexOf('a2', 1)).toBe(1);
                expect(s.columns.indexOf('a3', 1)).toBe(2);
                expect(s.columns.indexOf('a4', 1)).toBe(3);
                expect(s.columns.indexOf('a5', 1)).toBe(-1); // 없는 경우
                expect(s.columns.count).toBe(4);
            });
            it.skip("- indexOf(name, 1) : 예외 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
        
                expect(s.columns.indexOf('a5', 2)).toBe(-1); // 없는 경우
                expect(()=> s.columns.indexOf(100, 1)).toThrow(/EL04224/);  
            });
            // it("- indexToKey(elem) : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
            //     let s = new Student();
            //     const a2 = { style: 1};
            //     s.columns.add('a1', 'A1');
            //     s.columns.add('a2', a2);
            //     s.columns.add('a3', 10);
            //     s.columns.add('a4', 10);
        
            //     expect(s.columns.indexToKey('A1')).toBe('a1');
            //     expect(s.columns.indexToKey(a2)).toBe('a2');
            //     expect(s.columns.indexToKey(10)).toBe('a3');
            //     expect(s.columns.indexToKey(10)).toBe('a3');
            //     expect(s.columns.indexToKey(4)).toBeUndefined();
            //     expect(s.columns.count).toBe(4);
            // });
        });
        describe("PropertyCollection.keyToIndex(str): num <키의 인덱스 조회> ", () => {
            it("- keyToIndex(name) ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.keyToIndex('a1')).toBe(0);
                expect(s.columns.keyToIndex('a2')).toBe(1);
                expect(s.columns.keyToIndex('a3')).toBe(2);
                expect(s.columns.keyToIndex('a4')).toBe(3);
                expect(s.columns.keyToIndex('a5')).toBe(-1); // 없는 경우
                expect(s.columns.count).toBe(4);
            });
            it("- keyToIndex(name) : 예외 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
        
                expect(s.columns.keyToIndex('a5', 2)).toBe(-1); // 없는 경우
                expect(()=> s.columns.keyToIndex(100, 1)).toThrow(/EL04224/);  
            });
            // it("- indexToKey(elem) : {동일객체 있을경우 첫번째 값을 리턴} ", () => {
            //     let s = new Student();
            //     const a2 = { style: 1};
            //     s.columns.add('a1', 'A1');
            //     s.columns.add('a2', a2);
            //     s.columns.add('a3', 10);
            //     s.columns.add('a4', 10);
        
            //     expect(s.columns.indexToKey('A1')).toBe('a1');
            //     expect(s.columns.indexToKey(a2)).toBe('a2');
            //     expect(s.columns.indexToKey(10)).toBe('a3');
            //     expect(s.columns.indexToKey(10)).toBe('a3');
            //     expect(s.columns.indexToKey(4)).toBeUndefined();
            //     expect(s.columns.count).toBe(4);
            // });
        });
        describe("PropertyCollection.add(name, value?, desc?): bool <컬렉션 추가> ", () => {
            beforeAll(() => {
            });
            it("- add(name) : undefined", () => {
                let s = new Student();
                const result = s.columns.add('a1');
        
                expect(s.columns['a1']).toBe(undefined);
                expect(s.columns.a1).toBe(undefined);
                expect(s.columns.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(name, value) ", () => {
                let s = new Student();
                const result = s.columns.add('a1', 'A1');
        
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(name, value, desc) : 읽기 전용", () => {
                console.warn = jest.fn((val) => { expect(val).toMatch(/WS011/)});
                let s = new Student();
                const desc = {
                    value: 'A1',
                    writable: false
                };
                const result = s.columns.add('a1', null, desc);
    
                expect(() => s.columns['a1'] = 1).toThrow(/Cannot assign to read only property/);
                // expect(()=> s.columns.removeAt(0)).toThrow(/Cannot delete property/);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result > -1).toBeTruthy();
                // expect(s.columns.count).toBe(0);
            });
            it("- add(name, value, desc) : set/get (제약조건 추가) ", () => {
                let s = new Student();
                let bValue;
                const desc = {
                    get() {
                      return bValue;
                    },
                    set(nVal) {
                        if (typeof nVal !== 'string') throw new Error('ES024 string 타입만')
                        bValue = nVal;
                    },
                    enumerable: true,
                    configurable: true,
                }
                const result = s.columns.add('a1', null, desc);
                s.columns['a1'] = 'A1';
    
                expect(() => s.columns['a1'] = 1).toThrow(/ES024/);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns.a1).toBe('A1');
                expect(s.columns.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(name, value, desc) : 기술자, 0 삭제후 0에 삽입 ", () => {
                console.warn = jest.fn((val) => { expect(val).toMatch(/WS011/)});
                let s = new Student();
                const desc1 = { value: 'A2', writable: false, configurable: true};   // REVIEW: config true 아니면 삭제 못함
                const desc2 = { value: 'A1', writable: false, configurable: true};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', null, desc1);
                s.columns.add('a3', 'A3');
    
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns.$elements.length).toBe(3);
                expect(s.columns.$descriptors.length).toBe(3);
                expect(s.columns.count).toBe(3);
                expect(s.columns.$descriptors[0]).toBe(undefined);
                expect(s.columns.$descriptors[1]).toBe(desc1);
                expect(s.columns.$descriptors[2]).toBe(undefined);
                // 삭제 후 결과
                s.columns.removeAt(0);
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns.$elements.length).toBe(2);
                expect(s.columns.$descriptors.length).toBe(2);
                expect(s.columns.count).toBe(2);
                expect(s.columns.$descriptors[0]).toBe(desc1);
                expect(s.columns.$descriptors[1]).toBe(undefined);
                // 추가후 결과
                s.columns.add('a1', null, desc2);
                expect(s.columns['a1']).toBe('A1');
                expect(s.columns['a2']).toBe('A2');
                expect(s.columns['a3']).toBe('A3');
                expect(s.columns.$elements.length).toBe(3);
                expect(s.columns.$descriptors.length).toBe(3);
                expect(s.columns.count).toBe(3);
                expect(s.columns.$descriptors[0]).toBe(desc1);
                expect(s.columns.$descriptors[1]).toBe(undefined);
                expect(s.columns.$descriptors[2]).toBe(desc2);

            });
            // it("- add(name) : 중복 이름 등록시 (경고)", () => {
            //     let s = new Student();
            //     const logSpy = jest.spyOn(global.console, 'warn');
            //     const result1 = s.columns.add('a1');
            //     const result2 = s.columns.add('a1');
        
            //     expect(logSpy).toHaveBeenCalledWith('Warning:: 프로퍼티 이름 중복 !!');
            //     expect(result1).toBeTruthy();
            //     expect(result2).not.toBeTruthy();
            //     logSpy.mockRestore();
            // });
            it("- add(name) : 중복 이름 등록시 (경고)", () => {
                let s = new Student();
                global.console.warn = jest.fn((val) => {
                    expect(val).toBe('Warning:: 프로퍼티 이름 중복 !!');
                });
                const result1 = s.columns.add('a1');
                // const result2 = s.columns.add('a1');
                
                expect(()=> s.columns.add('a1')).toThrow(/EL04228/);
                expect(result1 > -1).toBeTruthy();
                // jest.mockRestore();
            });
            it("- add(name) : 예약어 사용시 (예외)", () => {
                let s = new Student();
                expect(() => s.columns.add('_owner')).toThrow(/EL04227/);
                expect(() => s.columns.add('$elements')).toThrow(/EL04229/);
                expect(() => s.columns.add('$KEYWORD')).toThrow(/EL04229/);
                expect(() => s.columns.add('_elemTypes')).toThrow(/EL04227/);
                expect(() => s.columns.add('_list')).toThrow(/EL04227/);
                expect(() => s.columns.add('count')).toThrow(/EL04227/);
                expect(() => s.columns.add('onAdd')).toThrow(/EL04227/);
                expect(() => s.columns.add('onRemove')).toThrow(/EL04227/);
                expect(() => s.columns.add('onClear')).toThrow(/EL04227/);
                expect(() => s.columns.add('onChanging')).toThrow(/EL04227/);
                expect(() => s.columns.add('onChanged')).toThrow(/EL04227/);
                expect(() => s.columns.add('_remove')).toThrow(/EL04227/);
                expect(() => s.columns.add('add')).toThrow(/EL04227/);
                expect(() => s.columns.add('clear')).toThrow(/EL04227/);
                expect(() => s.columns.add('remove')).toThrow(/EL04227/);
                expect(() => s.columns.add('removeAt')).toThrow(/EL04227/);
                expect(() => s.columns.add('indexOf')).toThrow(/EL04227/);
                expect(() => s.columns.add('exists')).toThrow(/EL04227/);
                // expect(() => s.columns.add('keys')).toThrow(/ES048/);
                expect(() => s.columns.add('$keys')).toThrow(/EL04229/);
                // expect(() => s.columns.add('indexOfProp')).toThrow(/ES048/);
                expect(() => s.columns.add('indexToKey')).toThrow(/EL04227/);
                // expect(() => s.columns.add('removeByProp')).toThrow(/ES048/);
            });
            it("- add(name) : 이름을 숫자로 사용할 경우 (예외)", () => {
                let s = new Student();
                expect(() => s.columns.add(10)).toThrow(/EL04225/);
            });
            it("- add(value, desc) : 기술자 정의 경고 ", () => {
                let s = new Student();
                let bValue;
                const desc1 = {
                    get() { return bValue; },
                    enumerable: true,
                    configurable: false,
                }
                const desc2 = {
                    enumerable: true,
                    writable: false,
                }
                let count = 0;
                console.warn = jest.fn((val) => {
                    expect(val).toMatch(/WS011/);
                    count++;
                });
                s.columns.add('p1', null, desc1);
                s.columns.add('p2', null, desc2);
                expect(count).toBe(2)
            });
            it("- add(name) : 이름규칙 (예외)", () => {
                let s = new Student();
                expect(() => s.columns.add('10')).toThrow(/EL04226/);
                expect(() => s.columns.add('0')).toThrow(/EL04226/);
            });
        });
        describe("PropertyCollection.clear() <초기화> ", () => {
            it("- clear() ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                s.columns.add('a2', 'A2');
                s.columns.add('a3', 'A3');
                s.columns.clear();
        
                expect(s.columns.count).toBe(0);
                expect(s.columns._list.length).toBe(0);
                // expect(s.columns._keys.length).toBe(0);  // 내부 함수는 검사에 사용안하는게 원칙임
            });
        });
        describe("PropertyCollection.indexToKey(idx) <인덱스로 키 조회> ", () => {
            it("- indexToKey(idx) ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.columns.add('a1', 'A1');
                s.columns.add('a2', a2);
                s.columns.add('a3', 10);
                s.columns.add('a4', 10);
        
                expect(s.columns.indexToKey(0)).toBe('a1');
                expect(s.columns.indexToKey(1)).toBe('a2');
                expect(s.columns.indexToKey(2)).toBe('a3');
                expect(s.columns.indexToKey(3)).toBe('a4');
                expect(s.columns.indexToKey(4)).toBeUndefined();
                expect(s.columns.count).toBe(4);
            });
            it("- indexToKey(string) : 예외 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
        
                expect(()=> s.columns.indexToKey('a1')).toThrow('EL0422A');
            });
        });

        describe("PropertyCollection.map()", () => {
            it("- map() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                s.columns.add('A1', 10);
                s.columns.add('A2', 20);
                s.columns.add('A3', 30);
                var arr = s.columns.map(function(elem, i, k, array) {
                    return {a: elem, b: i, c: k, d:array, e: this};
                }, s);
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c:'A1', d: s.columns._list, e: s})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c:'A2', d: s.columns._list, e: s})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c:'A3', d: s.columns._list, e: s})
            });
            it("- map() : 연산 ", () => {
                const collection = new PropertyCollection();
                collection.add('k1', 1);
                collection.add('k2', 2);
                collection.add('k3', 3);
                const doubledValues = collection.map((value) => value * 2);
        
                expect(doubledValues).toEqual([2, 4, 6]);
            });            
            it("- map() : function ", () => {
                let s = new Student();
                var arr = [];
                s.columns.add('A1', 10);
                s.columns.add('A2', 20);
                s.columns.add('A3', 30);
                var arr = s.columns.map(function(elem, i, k, array) {
                    return {a: elem, b: i, c:k, d: array, e: this};
                });
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c:'A1', d: s.columns._list, e: s.columns})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c:'A2', d: s.columns._list, e: s.columns})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c:'A3', d: s.columns._list, e: s.columns})
            });
            it("- map() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                s.columns.add('A1', 10);
                s.columns.add('A2', 20);
                s.columns.add('A3', 30);
                var arr = s.columns.map((elem, i, k, array) => {
                    return {a: elem, b: i, c: k, d: array, e: this};
                }, s);
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'A1', d: s.columns._list, e: undefined})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'A2', d: s.columns._list, e: undefined})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'A3', d: s.columns._list, e: undefined})
            });

            it("- map() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.map({})).toThrow(/EL04116/);
            });
        });
        describe("PropertyCollection.filter()", () => {
            it("- filter() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                var arr2 = [];

                s.columns.add('A1', 10);
                s.columns.add('A2', 20);
                s.columns.add('A3', 30);
                var arr = s.columns.filter(function(elem, i, k, array) {
                    if (k == 'A1') {
                        arr2.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                // arr
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual(10)
                // arr2
                expect(arr2.length).toBe(1);
                expect(arr2[0]).toEqual({a: s.columns[0], b: 0, c:'A1', d: s.columns._list, e: s})
            });
            it("- filter() : function ", () => {
                let s = new Student();
                var arr = [];
                var arr2 = [];

                s.columns.add('k1', 'A1');
                s.columns.add('k2', 'A2');
                s.columns.add('k3', 'A3');
                var arr = s.columns.filter(function(elem, i, k, array) {
                    if (elem == 'A1') {
                        arr2.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                });
        
                // arr
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual('A1')
                // arr2
                expect(arr2.length).toBe(1);
                expect(arr2[0]).toEqual({a: s.columns[0], b: 0, c:'k1', d: s.columns._list, e: s.columns})
            });
            it("- filter() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                var arr2 = [];

                s.columns.add('k1', 'A1');
                s.columns.add('k2', 'A2');
                s.columns.add('k3', 'A3');
                var arr = s.columns.filter((elem, i, k, array) => {
                    if (elem == 'A1') {
                        arr2.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                // arr
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual('A1')
                // arr2
                expect(arr2.length).toBe(1);
                expect(arr2[0]).toEqual({a: s.columns[0], b: 0, c:'k1', d: s.columns._list, e: undefined})
            });
            it("- filter() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.filter({})).toThrow(/EL04117/);
            });
        });
        describe("PropertyCollection.reduce()", () => {
            it("- reduce() : ()=> {} 초기값 = 10 ", () => {
                let s = new Student();
                var sum = [];

                s.columns.add('k1', 1);
                s.columns.add('k2', 2);
                s.columns.add('k3', 3);
                var sum = s.columns.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                }, 10);
        
                expect(s.columns.length).toBe(3);
                expect(sum).toEqual(16)
            });
            it("- reduce() : ()=> {} ", () => {
                let s = new Student();
                var sum = [];

                s.columns.add('k1', 1);
                s.columns.add('k2', 2);
                s.columns.add('k3', 3);
                var sum = s.columns.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                });
        
                expect(s.columns.length).toBe(3);
                expect(sum).toEqual(6)
            });
            it("- reduce() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.reduce({})).toThrow(/EL04118/);
            });
        });
        describe("PropertyCollection.find()", () => {
            it("- find() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.find(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c:'k2', d: s.columns._list, e: s})
                expect(result).toBe(3);
            });
            it("- find() : return undefined ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.find(function(elem, i, k, array) {
                    if (elem > 10) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(0);
                // expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: s.columns._list, d: s})
                expect(result).toBe(undefined);
            });
            it("- find() : function ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.find(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                });
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s.columns})
                expect(result).toBe(3);
            });
            it("- find() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.find((elem, i, k, array) => {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c:'k2', d: s.columns._list, e: undefined })
                expect(result).toBe(3);
            });
            it("- find() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.find({})).toThrow(/EL04119/);
            });
        });

        describe("PropertyCollection.forEach()", () => {
            it("- forEach() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];

                s.columns.add('k1', 'A1');
                s.columns.add('k2', 'A2');
                s.columns.add('k3', 'A3');
                s.columns.forEach(function(elem, i, k, array) {
                    arr.push({a: elem, b: i, c:k, d: array, e: this});
                }, s);
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: s})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: s})
            });
            it("- forEach() : function ", () => {
                let s = new Student();
                var arr = [];

                s.columns.add('k1', 'A1');
                s.columns.add('k2', 'A2');
                s.columns.add('k3', 'A3');
                s.columns.forEach(function(elem, i, k, array) {
                    arr.push({a: elem, b: i, c: k, d: array, e: this});
                });
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: s.columns})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s.columns})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: s.columns})
            });
            it("- forEach() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];

                s.columns.add('k1', 'A1');
                s.columns.add('k2', 'A2');
                s.columns.add('k3', 'A3');
                s.columns.forEach((elem, i, k, array) => {
                    arr.push({a: elem, b: i, c: k, d: array, e: this});
                }, s);
        
                expect(arr.length).toBe(3);
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: undefined })
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: undefined })
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: undefined })
            });
            it("- forEach() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.forEach({})).toThrow(/EL041110/);
            });
        });
        describe("PropertyCollection.some()", () => {
            it("- some() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.some(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
                var result2 = s.columns.some(function(elem, i, k, array) {
                    if (elem > 5) {
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s})
                expect(result).toBe(true);
                expect(result2).toBe(false);
            });
            it("- some() : function ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.some(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                });
                var result2 = s.columns.some(function(elem, i, k, array) {
                    if (elem > 5) {
                        return true;    
                    }
                });
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s.columns})
                expect(result).toBe(true);
                expect(result2).toBe(false);
            });
            it("- some() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.some((elem, i, k, array) => {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c:k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c:'k2', d: s.columns._list, e: undefined })
                expect(result).toBe(true);
            });
            it("- some() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.some({})).toThrow(/EL041111/);
            });
        });

        describe("PropertyCollection.every()", () => {
            it("- every() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.every(function(elem, i, k, array) {
                    if (elem > 0) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                }, s);
                var result2 = s.columns.every(function(elem, i, k, array) {
                    if (elem > 3) {
                        return true;    
                    }
                }, s);
        
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: s})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: s})
                expect(result).toBe(true);
                expect(result2).toBe(false);
            });
            it("- every() : function, ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.every(function(elem, i, k, array) {
                    if (elem > 0) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                });
                var result2 = s.columns.every(function(elem, i, k, array) {
                    if (elem > 3) {
                        return true;    
                    }
                });
        
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: s.columns})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s.columns})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: s.columns})
                expect(result).toBe(true);
                expect(result2).toBe(false);
            });
            it("- every() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.every((elem, i, k, array) => {
                    if (elem > 0) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                }, s);
                var result2 = s.columns.every((elem, i, k, array) => {
                    if (elem > 3) {
                        return true;    
                    }
                }, s);
        
                expect(arr[0]).toEqual({a: s.columns[0], b: 0, c: 'k1', d: s.columns._list, e: undefined})
                expect(arr[1]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: undefined})
                expect(arr[2]).toEqual({a: s.columns[2], b: 2, c: 'k3', d: s.columns._list, e: undefined})
                expect(result).toBe(true);
                expect(result2).toBe(false);
            });
            it("- every() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.every({})).toThrow(/EL041112/);
            });
        });

        describe("PropertyCollection.findIndex()", () => {
            it("- findIndex() : function, thisArg ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.findIndex(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                }, s);
                var result2 = s.columns.findIndex(function(elem, i, k, array) {
                    if (elem > 5) {
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s})
                expect(result).toBe(1);
                expect(result2).toBe(-1);
            });
            it("- findIndex() : function ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.findIndex(function(elem, i, k, array) {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                });
                var result2 = s.columns.findIndex(function(elem, i, k, array) {
                    if (elem > 5) {
                        return true;    
                    }
                });
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: s.columns})
                expect(result).toBe(1);
                expect(result2).toBe(-1);
            });
            it("- findIndex() : ()=> {} ", () => {
                let s = new Student();
                var arr = [];
                var result;

                s.columns.add('k1', 1);
                s.columns.add('k2', 3);
                s.columns.add('k3', 5);
                var result = s.columns.findIndex((elem, i, k, array) => {
                    if (elem > 2) {
                        arr.push({a: elem, b: i, c: k, d: array, e: this});
                        return true;    
                    }
                }, s);
        
                expect(arr.length).toBe(1);
                expect(arr[0]).toEqual({a: s.columns[1], b: 1, c: 'k2', d: s.columns._list, e: undefined })
                expect(result).toBe(1);
            });
            it("- findIndex() : 예외 함수타입 ", () => {
                let s = new Student();
                expect(()=> s.columns.findIndex({})).toThrow(/EL041113/);
            });
        });
        describe("for in 열거 속성 검사", () => {
            it("- for in", () => {
                var arr = [];
                let s = new Student();
                s.columns.add('a1', 'A1');
                for (var prop in s.columns) {
                    arr.push(prop);
                }
            
                expect(arr.length).toBe(1);
            });

            it("- for in 삭제 ", () => {
                var arr = [];
                let s = new Student();
                s.columns.add('A1');
                s.columns.add('A2');
                s.columns.removeAt(0)
                for (var prop in s.columns) {
                    arr.push(prop);
                }
            
                expect(arr.length).toBe(1);
            });
        });
        describe("예외, 커버리지 ", () => {
            it("- this.$keys : 커버리지 ", () => {
                let s = new Student();
                s.columns.add('a1', 'A1');
                // s.columns.__SET$keys('aa2', {}) // 접근 금지됨

                expect(s.columns.$keys).toEqual(['a1'])
            });
            it("- this.$keys : 커버리지 ", () => {
                let s = new Student();
                var aa = s.columns.$keys
            });
        });
        // it("- _remove(not idx) : 예외 ", () => {
        //     let s = new Student();
        //     s.columns.add('a1', 'A1');
    
        //     expect(()=> s.columns._remove('str')).toThrow(/ES021/);
        // });
    });
    describe("BaseCollection._elemTypes <전체 타입을 설정할 경우 : 클래스타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                level = 0;
                constructor(level) { this.level = level }
            }
            Member = class {
                type = 10;
                constructor(type) { this.type = type }
            }
            School = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = Student }
            }
            Corp = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = [Member, Student] }
            }
            House = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = ['_any_'] }
            }
            Space = class {
                columns = new PropertyCollection(this);
            }
        });
        it("- 단일 타입 : columns.add(name, obj) ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const result = elem.columns.add('a1', c1);
            
            // expect(() => elem.columns.add('a2')).toThrow(/맞는 타입이 없습니다./);
            // expect(() => elem.columns.add('a2', 'str')).toThrow(/instance/);
            // expect(result).toBeTruthy();
        });
        it("- 단일 타입 : columns.요소명 = obj ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const s2 = new Student(2);
            const result = elem.columns.add('a1', c1);
            elem.columns['a1'] = s2;
    
            expect(() => elem.columns['a1'] = 10 ).toThrow(/EL0130B/);
            expect(elem.columns['a1'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result > -1).toBeTruthy();
        });
        it("- _any_ 타입 : columns.add(name, obj) ", () => {
            const elem = new House();
            const c1 = new Student(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', 'str');
            
            expect(() => elem.columns.add('a3')).toThrow(/EL0130B/);
            expect(elem.columns[0].level).toBe(1);
            expect(elem.columns['a1'].level).toBe(1);
            elem.columns['a1'] = 'OVER';
            expect(elem.columns[0]).toBe('OVER');
            expect(elem.columns['a1']).toBe('OVER');
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- undefined 타입 : columns.add(name, obj) ", () => {
            const elem = new Space();
            const c1 = new Student(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', 'str');
            const result3 = elem.columns.add('a3');
    
            expect(elem.columns[0].level).toBe(1);
            expect(elem.columns['a1'].level).toBe(1);
            expect(elem.columns[1]).toBe('str');
            expect(elem.columns['a2']).toBe('str');
            expect(elem.columns[2]).toBeUndefined();
            expect(elem.columns['a3']).toBeUndefined();
            elem.columns['a3'] = 'OVER';    // 수정
            expect(elem.columns[2]).toBe('OVER');
            expect(elem.columns['a3']).toBe('OVER');
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- 복합 타입 : columns.add(name, obj) ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const m1 = new Member(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', m1);
            
            expect(() => elem.columns.add('a3')).toThrow(/EL04229/);
            expect(() => elem.columns.add('a3', 'str')).toThrow(/EL04229/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : columns.요소명 = obj ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const s2 = new Student(2);
            const m1 = new Member(1);
            const result1 = elem.columns.add('a1', c1);
            const result2 = elem.columns.add('a2', m1);
            elem.columns['a1'] = s2;
            elem.columns['a2'] = s2;
    
            expect(() => elem.columns['a1'] = 'str' ).toThrow(/EL0130B/);
            expect(elem.columns['a1'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a1'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(elem.columns['a2'].level).toBe(2);                   // 교체된 객체
            expect(elem.columns['a2'] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("BaseCollection._elemTypes <전체 타입을 설정할 경우 : 원시타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = String }
            }
            Corp = class {
                columns = new PropertyCollection(this);
                constructor() { this.columns._elemTypes = [String, Boolean] }
            }
        });
        it("- 단일 타입 : columns.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', '');
            i.columns['a1'] = 'AA1';
            i.columns['a2'] = 'AA2';
    
            expect(() => i.columns.add('a3')).toThrow(/EL04229/);
            expect(() => i.columns.add('a3', 10)).toThrow(/EL04229/);
            expect(() => i.columns['a1'] = 10).toThrow(/EL0130B/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : columns.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.columns.add('a1', 'A1');
            const result2 = i.columns.add('a2', true);
            
            expect(() => i.columns.add('a3')).toThrow(/EL04229/);
            expect(() => i.columns.add('a3', 10)).toThrow(/EL04229/);
            expect(() => i.columns.add('a3', {})).toThrow(/EL04229/);
            expect(() => i.columns['a1'] = 10).toThrow(/EL0130B/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        
    });

});