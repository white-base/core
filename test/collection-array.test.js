/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {ArrayCollection}          = require('../src/collection-array');
const { MetaElement } = require('../src/meta-element');
const { replacer, reviver, stringify, parse }              = require('telejson');
const {MetaRegistry}        = require('../src/meta-registry');
// const { loadNamespace } = require('../src/load-namespace');
const { BaseCollection } = require('../src/base-collection');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test
describe("[target: collection-array.js, base-collection.js]", () => {
    describe("ArrayCollection :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                rows = new ArrayCollection(this);
            }
        });

        describe("BaseCollection.list <목록>", () => {
            it("- 목록 변경시 불변여부 ", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                let arr = s.rows.list;
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                arr.pop();
                expect(arr.length).toBe(2);
                expect(s.rows.count).toBe(3);
            });
        });
        
        describe("MetaObject.equal() <객체 비교>", () => {
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
                c1.$event.subscribe(fun1, 'fun1');
                
                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : _elements 추가 비교 ", () => {
                const c1 = new ArrayCollection();
                const c2 = new ArrayCollection();
                const c3 = new ArrayCollection();
                c1._elements.push('A');
                c2._elements.push('A');
                c3._elements.push('B');
                
                expect(c1.count).toBe(0);   // 직접 금지
                // expect(c1.equal(c2)).toBe(true);
                // expect(c1.equal(c3)).toBe(false);
            });
            it.skip("- equal() : _descriptors 추가 비교 ", () => {
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
        describe("BaseCollection.remove(elem): bool <컬렉션 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- remove(elem) : string ", () => {
                let s = new Student();
                s.rows.add('A1');
                const result = s.rows.remove('A1');
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
                expect(result > -1).toBeTruthy();
            });
            it("- remove(elem) : number ", () => {
                let s = new Student();
                s.rows.add(100);
                s.rows.remove(100);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
            it("- remove(elem) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.rows.add(a1);
                s.rows.remove(a1);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
            it("- remove(elem) : string (없을 경우)", () => {
                let s = new Student();
                s.rows.add('A1');
                const result = s.rows.remove('A2');
    
                expect(s.rows[0]).not.toBeUndefined();
                expect(s.rows.count).toBe(1);
                expect(s.rows.list.length).toBe(1);
                expect(result > -1).not.toBeTruthy();
            });
        });
        /**
         * REVIEW: 동일한 요소가 있을 경우 중복삭제의 이슈
         * 현재는 첫번째 요소를 삭제 후 두번째 삭제시 두번째 요소를 검색함
         *  방안>
         *  - 첫번재 것만 삭제
         *  - 모두 삭제
         *  - 경고 메세지
         *  - remove 메소드 삭제
         */
        describe("BaseCollection.removeAt(num): bool <컬렉션 idx로 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(idx) ", () => {
                let s = new Student();
                s.rows.add('A1');
                const idx = s.rows.indexOf('A1');
                const result = s.rows.removeAt(idx);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 없을 경우", () => {
                let s = new Student();
                s.rows.add('A1');
                const idx = s.rows.indexOf('A1');
                const result = s.rows.removeAt(idx + 1);
    
                expect(s.rows[0]).toBeTruthy();
                expect(s.rows.count).toBe(1);
                expect(s.rows.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
            it("- removeAt(idx) : 첫째 요소 삭제", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(0);
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).not.toBeDefined();
                expect(s.rows.indexOf('A2')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(2);
                expect(s.rows.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 중간 요소 삭제", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(1);
    
                expect(s.rows['0']).toBeDefined();
                expect(s.rows['1']).toBeDefined();
                expect(s.rows['2']).not.toBeDefined();
                expect(s.rows.indexOf('A1')).toBe(0);  
                expect(s.rows.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(2);
                expect(s.rows.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(2);
                s.rows.add('A4');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows[3]).not.toBeDefined();
                expect(s.rows.indexOf('A1')).toBe(0);  
                expect(s.rows.indexOf('A2')).toBe(1);
                expect(s.rows.indexOf('A4')).toBe(2);
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- _remve() 추상클래스를 잘못 구현한 경우 ", () => { // TODO: array test 이동 요망
                class SubCollection extends ArrayCollection {
                    constructor(){ super()}
                    _remove(idx) {
                        return false;   // 강제 실페
                    }
                }
                const s1 = new SubCollection();
                s1.add(10)
                s1.add(20)

                expect(s1.count).toBe(2)
                s1.removeAt(1);
                expect(s1.count).toBe(2)
            });
            it("- removeAt(str) : 예외 ", () => {
                let s = new Student();
    
                expect(()=> s.rows.removeAt('1')).toThrow(/EL04113/);
            });
        });

        

        describe("BaseCollection.contains(elem): bool <존재유무 검사>", () => {
            it("- contains(str | obj | num): bool = {특정요소를 찾을경우 : name}", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.rows.add('A1');
                s.rows.add(a2);
                s.rows.add(10);
                
                expect(s.rows.contains('A1')).toBeTruthy();
                expect(s.rows.contains(a2)).toBeTruthy();
                expect(s.rows.contains(10)).toBeTruthy();
                expect(s.rows.count).toBe(3);
            });
        });
        describe("BaseCollection.indexOf(elem): num <인덱스 조회>", () => {
            it("- indexOf() = {동일객체 있을경우 첫번째 값을 리턴} ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.rows.add('A1');
                s.rows.add(a2);
                s.rows.add(10);
                s.rows.add(10);
                
                expect(s.rows.indexOf('A1')).toBe(0);
                expect(s.rows.indexOf(a2)).toBe(1);
                expect(s.rows.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
                expect(s.rows.count).toBe(4);
            });
        });
        describe("BaseCollection.exist(key): bool <키 여부 조회>", () => {
            it.skip("- exist(key) : number, string 타입으로 키 여부 조회 ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.rows.add('A1');
                s.rows.add(a2);
                s.rows.add(10);
                
                expect(s.rows.exist('A1')).toBe(false);
                expect(s.rows.exist(10)).toBe(false);
                expect(s.rows.exist(0)).toBe(true);
                expect(s.rows.exist(1)).toBe(true);
                expect(s.rows.exist(2)).toBe(true);
                expect(s.rows.exist('0')).toBe(true);
                expect(s.rows.exist('1')).toBe(true);
                expect(s.rows.exist('2')).toBe(true);
            });
        });
        describe("ArrayCollection.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 직렬화 객체 얻기 ", () => {
                const a1 = new ArrayCollection();
                a1.add(10);
                a1.add(20);
                const obj = a1.getObject();
        
                expect(obj._elem).toEqual([10, 20]);
                expect(obj._type === 'Collection.ArrayCollection').toBe(true);
            });
            it("- getObject() : 직렬화 객체 얻기 <상속, _NS 설정 안함>", () => {
                class ArraySub extends ArrayCollection{
                    constructor(){ super() }
                }
                const a1 = new ArraySub();
                a1.add(10);
                a1.add(20);
                const obj = a1.getObject();
        
                expect(obj._elem).toEqual([10, 20]);
                expect(obj._type === 'Collection.ArraySub').toBe(true);
            });
            it("- getObject() : 직렬화 객체 얻기 <상속, _NS 설정>", () => {
                class ArraySub extends ArrayCollection{
                    constructor(){ super() }
                    static _NS = 'Etc'
                }
                const a1 = new ArraySub();
                const obj = a1.getObject();
        
                expect(obj._type === 'Etc.ArraySub').toBe(true);
            });
            it("- getObject() : 메타객체와 참조객체 얻기 ", () => {
                const a1 = new ArrayCollection();
                const m1 = new MetaElement('E1')
                a1.add(m1);
                a1.add(m1);
                const obj = a1.getObject();
        
                expect(obj._elem[0]._guid).toBe(m1._guid)
                expect(obj._elem[1].$ref).toBe(m1._guid)
                expect(obj._type === 'Collection.ArrayCollection').toBe(true);
            });
            it("- 커버리지 ", () => {
                const a1 = new ArrayCollection();
                const obj = a1.getObject(0, {});
            });
        });
        describe("ArrayCollection.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const a1 = new ArrayCollection();
                const fun1 = function() {}
                a1.onAdd = fun1;
                a1.add(10);
                a1.add(20);
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(a2[0]).toBe(10);
                expect(a2[1]).toBe(20);
                expect(a2.$event.$subscribers.add).toBeDefined()
            });
            it("- setObject() : MetaElment 삽입 ", () => {
                const a1 = new ArrayCollection();
                const m1 = new MetaElement('E1');
                a1.add(10);
                a1.add(m1);
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(a2[0]).toBe(10);
                expect(m1.equal(a2[1])).toBe(true);
            });
            it("- setObject() : MetaElment $ref 삽입 ", () => {
                const a1 = new ArrayCollection();
                const m1 = new MetaElement('E1');
                const ref1 = MetaRegistry.createReferObject(m1);
                a1.add(m1);
                a1.add(ref1);
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
                a2.setObject(obj);
        
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(m1.equal(a2[0])).toBe(true);
                expect(m1.equal(a2[1])).toBe(true);
            });
            it("- setObject() : 메타객체와 참조  ", () => {
                const a1 = new ArrayCollection();
                const fun1 = function() {}
                const m1 = new MetaElement('E1')
                a1.add(m1);
                a1.add(m1);
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(2);
                expect(a2.count).toBe(2);
                expect(m1.equal(a2[0])).toBe(true);
                expect(m1.equal(a2[1])).toBe(true);
            });
            it("- setObject() : 빈 컬렉션  ", () => {
                const a1 = new ArrayCollection();
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
                a2.setObject(obj);
        
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(a1.count).toBe(0);
                expect(a2.count).toBe(0);
            });
            it("- setObject() : ArrayCollection 속성 ", () => {
                class Table extends MetaElement {
                    colleciton = new ArrayCollection(this);
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
                t1.colleciton.add(10, desc);
                const obj = t1.getObject();
                var t2 = new Table('t2');
                t2.setObject(obj);

                expect(t2.colleciton.count).toBe(1);
                expect(t2.colleciton[0]).toBe(10);
            });
            it("- setObject() : 예외 : $ref 삽입 ", () => {
                const a1 = new ArrayCollection();
                const m1 = new MetaElement('E1');
                const ref1 = MetaRegistry.createReferObject(m1);
                ref1.$ref = 'ERR'
                a1.add(m1);
                a1.add(ref1);
                const obj = a1.getObject();
                const a2 = new ArrayCollection();
        
                expect(()=> a2.setObject(obj)).toThrow(/EL04211/)
            });
        });
        
        describe("ArrayCollection.add(value?, desc?): bool <컬렉션 추가>", () => {
            beforeAll(() => {
            });
            it("- add() : undefined", () => {
                let s = new Student();
                const result = s.rows.add();
        
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(value) ", () => {
                let s = new Student();
                const result = s.rows.add('A1');
        
                expect(s.rows[0]).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(value, desc) : 읽기 전용", () => {
                console.warn = jest.fn((val) => { expect(val).toMatch(/WS011/)});
                let s = new Student();
                const desc = {
                    value: 'A1',
                    writable: false
                };
                const result = s.rows.add(null, desc);
    
                expect(() => s.rows[0] = 1).toThrow(/Cannot assign to read only property/);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows['0']).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result > -1).toBeTruthy();
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
                const result = s.rows.add(null, desc);
                s.rows[0] = 'A1';
    
                expect(() => s.rows[0] = 1).toThrow(/ES024/);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows['0']).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result > -1).toBeTruthy();
            });
            it("- add(value, desc) : 기술자, 0 삭제후 0에 삽입 ", () => {
                let s = new Student();
                const desc1 = { value: 'A2', writable: false, configurable: true};   // REVIEW: config true 아니면 삭제 못함
                const desc2 = { value: 'A1', writable: false, configurable: true};   // REVIEW: config true 아니면 삭제 못함
                s.rows.add('A1');
                s.rows.add(null, desc1);
                s.rows.add('A3');
    
                expect(s.rows[0]).toBe('A1');
                expect(s.rows[1]).toBe('A2');
                expect(s.rows[2]).toBe('A3');
                expect(s.rows._elements.length).toBe(3);
                expect(s.rows._descriptors.length).toBe(3);
                expect(s.rows.count).toBe(3);
                // 삭제 후 결과
                s.rows.removeAt(0);
                expect(s.rows[0]).toBe('A2');
                expect(s.rows[1]).toBe('A3');
                expect(s.rows._elements.length).toBe(2);
                expect(s.rows._descriptors.length).toBe(2);
                expect(s.rows.count).toBe(2);
                // 추가후 결과
                s.rows.insertAt(0, null, desc2);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows[1]).toBe('A2');
                expect(s.rows[2]).toBe('A3');
                expect(s.rows._elements.length).toBe(3);
                expect(s.rows._descriptors.length).toBe(3);
                expect(s.rows.count).toBe(3);
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
                s.rows.add(null, desc1);
                s.rows.add(null, desc2);
                expect(count).toBe(2)
            });
        });
        describe("ArrayCollection.clear() <초기화>", () => {
            it("- clear() ", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                s.rows.clear();
        
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
        });
        describe("ArrayCollection.insertAt(num): bool <idx 위치에 추가>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- insertAt(idx, value) : 첫째 요소 추가", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                const result = s.rows.insertAt(0, 'A0');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx, value) : 중간 요소 추가", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A2');
                const result = s.rows.insertAt(1, 'A1');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx, value) : 마지막 요소 추가 후 add()", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');
                const result = s.rows.insertAt(2, 'A2');
                s.rows.add('A3');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows[3]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A3')).toBe(3);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(4);
                expect(s.rows.list.length).toBe(4);
                expect(result).toBeTruthy();
            });
            it("- insertAt(pos) : 예외 : 사이즈 초과", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');

                expect(()=> s.rows.insertAt(3, 'A2')).toThrow(/EL04213/);
            });
            it("- insertAt(pos) : 예외 : 0 보다 작을 경우", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');

                expect(()=> s.rows.insertAt(-1, 'A2')).toThrow(/EL04214/);
            });
            it("- insertAt(pos) : 예외 :자료형", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');

                expect(()=> s.rows.insertAt('ERR', 'A2')).toThrow(/EL04212/);
            });
        });
        describe("예외 및 커버리지 ", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- 커버리지 : __SET$ ", () => {
                let s1 = new Student();
                s1.rows.add('A0');
                s1.rows.$elements = []
                // s1.rows.$descriptors = []
                let s2 = new Student();
                s2.rows.add('A0');
                s2.rows.$elements = [];
                s2.rows.$descriptors = []

                expect(s1.rows._elements.length).toBe(0)
                expect(s1.rows._descriptors.length).toBe(1)
                expect(s2.rows._elements.length).toBe(0)
                expect(s2.rows._descriptors.length).toBe(0)
            });
            it("- 예외 ", () => {
                class SubClass extends BaseCollection{
                    constructor(){super()}
                }
                const s1 = new SubClass();

                expect(()=> s1._remove()).toThrow(/EL04111/)
            });


        });
        
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
                rows = new ArrayCollection(this);
                constructor() { this.rows._elemTypes = Student }
            }
            Corp = class {
                rows = new ArrayCollection(this);
                constructor() { this.rows._elemTypes = [Member, Student] }
            }
            House = class {
                rows = new ArrayCollection(this);
                 constructor() { this.rows._elemTypes = ['_any_'] }
            }
            Space = class {
                rows = new ArrayCollection(this);
            }
    
        });
        it("- 단일 타입 : rows.add(name, obj) ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const result = elem.rows.add(c1);
            
            expect(() => elem.rows.add(null)).toThrow(/EL04215/);
            expect(() => elem.rows.add('str')).toThrow(/EL04215/);
            expect(result > -1).toBeTruthy();
        });
        it("- 단일 타입 : rows.요소명 = obj ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const result = elem.rows.add(c1);
            elem.rows[0] = c2;
    
            expect(() => elem.rows[0] = 10 ).toThrow(/EL0130B/);
            expect(elem.rows[0].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result > -1).toBeTruthy();
        });
        it("- _any_ 타입 : rows.add(name, obj) ", () => {
            const elem = new House();
            const c1 = new Student(1);
            const result1 = elem.rows.add( c1);
            const result2 = elem.rows.add('str');
            
            expect(() => elem.rows.add()).toThrow('EL04215');
            expect(elem.rows[0].level).toBe(1);
            elem.rows[0] = 'OVER';
            expect(elem.rows[0]).toBe('OVER');
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- undefined 타입 : rows.add(name, obj) ", () => {
            const elem = new Space();
            const c1 = new Student(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add('str');
            const result3 = elem.rows.add();
    
            expect(elem.rows[0].level).toBe(1);
            expect(elem.rows[1]).toBe('str');
            expect(elem.rows[2]).toBeUndefined();
            elem.rows[2] = 'OVER';    // 수정
            expect(elem.rows[2]).toBe('OVER');
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- 복합 타입 : rows.add(name, obj) ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const m1 = new Member(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add(m1);
            
            expect(() => elem.rows.add(null)).toThrow(/EL04215/);
            expect(() => elem.rows.add('str')).toThrow(/EL04215/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : rows.요소명 = obj ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const m1 = new Member(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add(m1);
            elem.rows[0] = c2;
            elem.rows[1] = c2;
    
            expect(() => elem.rows[0] = 'str' ).toThrow(/EL0130B/);
            expect(elem.rows[0].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(elem.rows[1].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[1] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("BaseCollection._elemTypes <전체 타입을 설정할 경우 : 원시타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                rows = new ArrayCollection(this);
                constructor() { this.rows._elemTypes = String }
            }
            Corp = class {
                rows = new ArrayCollection(this);
                constructor() { this.rows._elemTypes = [String, Boolean] }
            }
        });
        it("- 단일 타입 : rows.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add('');
            i.rows[0] = 'AA1';
            i.rows[1] = 'AA2';
    
            expect(() => i.rows.add(null)).toThrow(/EL04215/);
            expect(() => i.rows.add(10)).toThrow(/EL04215/);
            expect(() => i.rows[0] = 10).toThrow(/EL0130B/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : rows.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add(true);
            
            expect(() => i.rows.add(undefined)).toThrow(/EL04215/);
            expect(() => i.rows.add(null)).toThrow(/EL04215/);
            expect(() => i.rows.add(10)).toThrow(/EL04215/);
            expect(() => i.rows.add({})).toThrow(/EL04215/);
            expect(() => i.rows[0] = 10).toThrow(/EL0130B/);
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it.skip("- 유무 검사 : exist(key) ", () => {
            const i = new Corp();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add(true);
            
            expect(result1 > -1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(i.rows.exist(0)).toBe(true);
            expect(i.rows.exist(1)).toBe(true);
            expect(i.rows.exist(2)).toBe(false);    // 실패 조건
            expect(i.rows.exist('0')).toBe(true);
            expect(i.rows.exist('1')).toBe(true);
            expect(i.rows.exist('2')).toBe(false);  // 실패 조건
            // 예외 조건
            expect(()=> i.rows.exist(true)).toThrow(/key.*number.*string/);     
        });
        it("- _elemTypes 삭제할 경우 : 예외 ", () => {
            const i = new Corp();

            expect(()=> delete i.rows._elemTypes).toThrow(/Cannot delete property/);     
        });
    });
});


