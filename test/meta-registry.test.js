//==============================================================
// gobal defined
// import Util from '../src/util.js';
import MetaRegistry from '../src/meta-registry';
import MetaObject from '../src/meta-object';
import MetaElement from '../src/meta-element';
import PropertyCollection from '../src/collection-property';
import loadNamespace from '../src/utils/load-namespace';
import ArrayCollection from '../src/collection-array.js';
import { replacer, reviver, stringify, parse } from 'telejson';

import {jest} from '@jest/globals';
//==============================================================
// test
describe("[target: meta-registry.js]", () => {
    describe("MetaRegistry :: 클래스(static)", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
        });
        it("- 초기값 조회 ", () => {
            expect(MetaRegistry.count).toBe(0);
        });
        describe("MetaRegistry._list <객체 목록>", () => {
            it("- _list()  ", () => {
                let i1 = new MetaObject();
                let i2 = new MetaObject();

                expect(MetaRegistry._list.length).toBe(2);
                expect(MetaRegistry._list[0]).toBe(i1)
                expect(MetaRegistry._list[1]).toBe(i2)
            });
        });
        describe("MetaRegistry.init() <초기화>", () => {
            it("- init() : 초기화 ", () => {
                let i = new MetaObject();
    
                // 등록 조회
                expect(MetaRegistry.count).toBe(1);
                MetaRegistry.init();
                //초기화 후 조회
                expect(MetaRegistry.count).toBe(0);
            });
        });
        describe("MetaRegistry.register() <메타객체 등록>", () => {
            it("- register() : 자동등록", () => {
                const m1 = new MetaObject();
                const m2 = new MetaObject();

                // 자동 등록
                expect(MetaRegistry.count).toBe(2);
            });
            it("- register() : 수동등록 ", () => {
                class CustomClass1 {
                    _guid = 'KEY1';             // 필수
                    _type = CustomClass1;       // 필수
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                // 등록전
                expect(MetaRegistry.count).toBe(0);
                // 등록후
                MetaRegistry.register(c1);
                expect(MetaRegistry.count).toBe(1);
            });
            it("- register() : 예외 ", () => {
                class CustomClass1 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                expect(()=> MetaRegistry.register(c1)).toThrow(/EL03211/);                
            });
            it("- register() : 예외 <중복> ", () => {
                const e1 = new MetaObject();

                expect(()=> MetaRegistry.register(e1)).toThrow(/EL03212/);
                /**
                 * MEMO: 자동 등록 되므로 추가도 등록하면 예외 발생
                 */
            });
            it("- register() : 예외 <중복> ", () => {
                expect(()=> MetaRegistry.register('ERR')).toThrow(/EL03211/);
            });
        });
        describe("MetaRegistry.release() <해제>", () => {
            it("- release() : 해제(자동등록) ", () => {
                let m1 = new MetaObject();
                let m2 = new MetaObject();
                let m3 = new MetaObject();
                let m4 = new MetaObject();
                
                // 등록 [자동]
                expect(MetaRegistry.count).toBe(4);
                // 해제
                MetaRegistry.release(m1);
                MetaRegistry.release(m2._guid);
                expect(MetaRegistry.count).toBe(2);
                // 예외 및 실패
                expect(MetaRegistry.release('NOT')).toBe(false);
                expect(MetaRegistry.release({})).toBe(false);
                expect(()=> MetaRegistry.release(10)).toThrow(/EL03213/);
            });
        });
        
        describe("MetaRegistry.has(meta) <메타객체 여부>", () => {
            it("- has() : 메타객체 여부 검사 ", () => {
                let m1 = new MetaObject();
                let m2 = new MetaObject();
                class CustomClass1 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();

                expect(MetaRegistry.has(m1)).toBe(true);
                expect(MetaRegistry.has(m2)).toBe(true);
                expect(MetaRegistry.has(c1)).toBe(false);
                expect(MetaRegistry.has()).toBe(false);
                expect(MetaRegistry.has('NOT')).toBe(false);
            });
        });
        describe("MetaRegistry.find() <메타객체 조회>", () => {
            it("- find(meta) : 객체로 조회, guid로 조회 ", () => {
                let m1 = new MetaObject('M1');
                let m2 = new MetaObject('M2');
                const f1 = MetaRegistry.find(m1);
                const f2 = MetaRegistry.find(m2._guid);
                
                expect(f1 === m1).toBe(true);
                expect(f2 === m2).toBe(true);
                expect(MetaRegistry.count).toBe(2);
                // 실패 조건
                expect(MetaRegistry.find()).toBe(undefined);
                expect(MetaRegistry.find({_guid: {}})).toBe(undefined);

            });
        });
        describe("MetaRegistry.isMetaObject() <메타객체 여부>", () => {
            it("- isMetaObject() : MetaElement, guid 미정의, guid 정의", () => {
                const m1 = new MetaObject();
                class CustomClass1 {
                    _guid = 'KEY1';             // 필수
                    _type = CustomClass1;       // 필수
                    name = 'User1'
                }
                class CustomClass2 {
                    name = 'User1'
                }
                const c1 = new CustomClass1();
                const c2 = new CustomClass2();

                expect(MetaRegistry.isMetaObject(m1)).toBe(true);
                expect(MetaRegistry.isMetaObject(c1)).toBe(true);
                expect(MetaRegistry.isMetaObject(c2)).toBe(false);
                expect(MetaRegistry.isMetaObject(null)).toBe(false);
            });
        });
        describe("MetaRegistry.createMetaObject() <메타객체 생성>", () => {
            it("- createMetaObject() : 객체로 생성", () => {
                loadNamespace();    // 클래스 로딩
                const mObj1 = {_type: 'MetaObject', _ns: 'Meta'};
                const mObj2 = {_type: 'MetaElement', _ns: 'Meta', name: 'V1'};
                const m1 = MetaRegistry.createMetaObject(mObj1);
                const m2 = MetaRegistry.createMetaObject(mObj2);
                
                expect(m1._ns).toBe('Meta');
                expect(m2._name).toBe('V1');
            });
            it("- createMetaObject() : 참조가 존재하는 객체로 생성", () => {
                loadNamespace();    // 클래스 로딩
                const e1 = new MetaElement('e1')
                const mObj1 = {_type: 'ArrayCollection', _ns: 'Collection', _owner: e1};
                const arr1 = MetaRegistry.createMetaObject(mObj1);
                const obj1 = arr1.getObject();
                const col1 = MetaRegistry.createMetaObject(obj1);
                
                // expect(arr1._name).toBe('T1');
                expect(arr1._owner).toBe(e1);
                expect(col1._owner).toBe(null);
            });
            it("- createMetaObject() : PARAM 없는 클래스", () => {
                const Member = function() {};
                MetaRegistry.namespace.add('Member', Member)
                const mObj1 = {_type: 'Member', _ns: ''};
                const obj1 = MetaRegistry.createMetaObject(mObj1);
                
                expect(obj1 instanceof Member).toBe(true);
            });
            it("- createMetaObject() : 예외", () => {
                loadNamespace();    // 클래스 로딩
                const mObj1 = {_type: 'MetaTable2', _ns: 'Meta.Entity', name: 'T1'};
                
                expect(()=> MetaRegistry.createMetaObject(mObj1)).toThrow(/EL03224/);
                expect(()=> MetaRegistry.createMetaObject('STR')).toThrow(/EL03221/);
                expect(()=> MetaRegistry.createMetaObject({})).toThrow(/EL03222/);
                expect(()=> MetaRegistry.createMetaObject(mObj1, -1)).toThrow(/EL03223/);
            });
        });
        describe("MetaRegistry.createReferObject() <참조객체 생성>", () => {
            it("- createReferObject() : 일반객체에 생성 ", () => {
                const m1 = new MetaObject('M1');
                const obj1 = {
                    m1: MetaRegistry.createReferObject(m1),
                    name: 'OBJ'
                };
                const obj2 = {
                    m1: { $ref: m1._guid },
                    name: 'OBJ'   
                };

                expect(obj1).toEqual(obj2);
                expect(()=> MetaRegistry.createReferObject('NOT')).toThrow(/EL03225/)
                expect(()=> MetaRegistry.createReferObject({})).toThrow(/EL03226/)
            });
        });
        describe("MetaRegistry.createNsReferObject() <네임스페이스 속성 생성>", () => {
            it("- createNsReferObject() : 네임스페이스 객체 생성", () => {
                loadNamespace();    // 클래스 로딩
                const class1 = MetaRegistry.namespace.find('Meta.MetaElement');
                const obj1 = {
                    cls1: MetaRegistry.createNsReferObject(class1),
                    name: 'OBJ'
                };
                const obj2 = {
                    cls1: {$ns: 'Meta.MetaElement'},
                    name: 'OBJ'   
                };
                
                expect(obj1).toEqual(obj2);
            });
            it("- createNsReferObject() : 예외 없을 경우", () => {
                expect(()=> MetaRegistry.createNsReferObject({aa:1}) ).toThrow(/EL03227/)
            });
        });
        describe("MetaRegistry.setMetaObject() <setObject 설정 속성 생성>", () => {
            it("- setMetaObject() : ", () => {
                const m1 = new MetaObject('M1');
                const obj1 = {
                    cls1: {},
                    name: 'OBJ'
                };
                MetaRegistry.setMetaObject(obj1.cls1, m1);
                const obj2 = {
                    cls1: {$set: m1._guid},
                    name: 'OBJ'   
                };

                expect(obj1).toEqual(obj2);
            });
            it("- setMetaObject() : 예외", () => {
                const m1 = new MetaObject('M1');
                const obj1 = {
                    cls1: {},
                    name: 'OBJ'
                };

                expect(()=> MetaRegistry.setMetaObject(obj1.name, m1)).toThrow(/EL03241/)
                expect(()=> MetaRegistry.setMetaObject({}, -1)).toThrow(/EL03242/)
                expect(()=> MetaRegistry.setMetaObject(obj1.cls1, {})).toThrow(/EL03243/)
                expect(()=> MetaRegistry.setMetaObject(obj1.cls1, {})).toThrow(/EL03243/)
            });
        });
        describe("MetaRegistry.validObject() <메태객체 유효성 검사>", () => {
            it("- validObject() : 참조 검사 ($ref, $set, $ns)", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'KEY1'},
                        10
                    ],
                    type: {$ns: 'Meta.MetaObject'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(true);
            });
            it("- validObject() : 참조 실패 검사 1 ($set)", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'KEY1'},
                        10
                    ],
                    type: {$ns: 'Meta.MetaObject'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'ERR' // 실패
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 참조 실패 검사 2 ( $set)", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'ERR'}, // 실패
                        10
                    ],
                    type: {$ns: 'Meta.MetaObject'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 참조 실패 검사 3 ( $ref)", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'KEY1'},
                        10
                    ],
                    type: {$ns: 'Meta.MetaObject'},
                    onwer: {$ref: 'ERR'},   // 실패
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 참조 실패 검사 4 ( $ns)", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'KEY1'},
                        10
                    ],
                    type: {$ns: 'ERR'}, // 실패
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 컬럼션 검사", () => {
                const obj1 = {
                    _elem: [
                        {
                            _elem: [1, 2],
                            _key: [1, 2],
                        }
                    ],
                    _key: ['1'],
                    sub: {
                        _elem: [1],
                        _key: [1],
                    }
                };

                expect(MetaRegistry.validObject(obj1)).toBe(true);
            });
            it("- validObject() : 컬렉션 검사 실패 1", () => {
                const obj1 = {
                    _elem: [
                        {
                            _elem: [1, 2],
                            _key: [1],
                        }
                    ],
                    _key: [],   // false
                    sub: {
                        _elem: [1],
                        _key: [1],
                    }
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 컬렉션 검사 실패 2", () => {
                const obj1 = {
                    _elem: [
                        {
                            _elem: [1, 2],
                            _key: [1],  // false
                        }
                    ],
                    _key: ['1'],
                    sub: {
                        _elem: [1],
                        _key: [1],
                    }
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 컬렉션 검사 실패 3", () => {
                const obj1 = {
                    _elem: [
                        {
                            _elem: [1, 2],
                            _key: [1, 2],
                        }
                    ],
                    _key: ['1'],
                    sub: {
                        _elem: [1],
                        _key: [],   // false
                    }
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 키 검사 실패 1 ", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY2', _type: 'T3', $set: 'KEY1'},    // 중복키
                        10
                    ],
                    type: {$ns: 'Meta.MetaObject'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY2'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() :  키 검사 실패 2 ", () => {
                const a = new MetaObject();
                const obj1 = 10;

                expect(()=> MetaRegistry.validObject(obj1)).toThrow(/EL03251/)
            });
        });
        describe("MetaRegistry.isGuidObject() <guid 객체 여부 감사>", () => {
            it("- isGuidObject() : getObject() 검사 <성공>", () => {
                const a = new MetaObject();
                expect(MetaRegistry.isGuidObject(a.getObject())).toBe(true);
            });
            it("- isGuidObject() : meta 검사 <실패>", () => {
                const a = new MetaObject();
                expect(MetaRegistry.isGuidObject(a)).toBe(false);
            });
        });
        describe("MetaRegistry.hasGuidObject(target, origin) <순환참조 여부>", () => {
            it("- hasGuidObject() : getObject(0) 검사", () => {
                const c1 = new PropertyCollection();
                const e1 = new MetaElement('E1');
                const e2 = new MetaElement('E1');
                c1.add('k1', e1);
                
                var obj1 = c1.getObject();
                var obj2 = e1.getObject();
                var obj3 = e2.getObject();

                expect(MetaRegistry.hasGuidObject(obj2, obj1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(obj3, obj1)).toBe(false);
            });

            it.skip("- hasGuidObject() : getObject(0) 검사", () => {
                const elem1 = new MetaElement('E1');
                const table1 = new MetaTable('T1');
                table1.columns.add('c1');
                table1.rows.add(table1.newRow());
                const e1 = elem1.getObject();
                const t1 = table1.getObject();
                const col1 = table1.columns.getObject();
                const r1 = table1.rows[0].getObject();
                const c1 = table1.columns[0].getObject();

                expect(MetaRegistry.hasGuidObject(e1._guid, t1)).toBe(false);
                expect(MetaRegistry.hasGuidObject(e1, t1)).toBe(false);
                expect(MetaRegistry.hasGuidObject(t1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(col1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(r1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(c1, t1)).toBe(true);
            });
            it("- hasGuidObject() : row 에 테이블 삽입 ", () => {
                const elem1 = new MetaElement('E1');
                const arr1 = new ArrayCollection();
                arr1.add(elem1);
                const e1 = elem1.getObject();
                const a1 = arr1.getObject();

                expect(MetaRegistry.hasGuidObject(e1, a1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(e1._guid, a1)).toBe(true);
            });
            it.skip("- hasGuidObject() : row 에 테이블 삽입 ", () => {
                const elem1 = new MetaElement('E1');
                const table1 = new MetaTable('T1');
                table1.columns.add('c1');
                table1.columns['c1']._valueTypes = Object
                // REVIEW: 강제로 _elemTypes 에 테이블 타입 등록
                // table1.rows._elemTypes.push(MetaTable)
                // MetaColumn._VALUE_TYPE.push(MetaTable)
                table1.columns['c1']._valueTypes.push(MetaTable)

                table1.rows.add(table1.newRow());
                table1.rows[0]['c1'] = table1;
                const e1 = elem1.getObject();
                const t1 = table1.getObject();
                const col1 = table1.columns.getObject();
                const r1 = table1.rows[0];
                const c1 = table1.columns[0].getObject();

                // expect(MetaRegistry.hasGuidObject(e1, t1)).toBe(false);
                // expect(MetaRegistry.hasGuidObject(t1, t1)).toBe(false);
                // expect(MetaRegistry.hasGuidObject(col1, t1)).toBe(false);
                // expect(MetaRegistry.hasGuidObject(r1, t1)).toBe(true);
                // expect(MetaRegistry.hasGuidObject(c1, t1)).toBe(false);
            });
            it.skip("- hasGuidObject() : getObject(1) 검사", () => {
                const elem1 = new MetaElement('E1');
                const table1 = new MetaTable('T1');
                table1.columns.add('c1');
                table1.rows.add(table1.newRow());
                const e1 = elem1.getObject(1);
                const t1 = table1.getObject(1);
                const col1 = table1.columns.getObject(1);
                const r1 = table1.rows[0].getObject(1);
                const c1 = table1.columns[0].getObject(1);

                expect(MetaRegistry.hasGuidObject(e1, e1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(t1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(table1.columns[0], t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(col1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(r1, t1)).toBe(true);
                expect(MetaRegistry.hasGuidObject(c1, t1)).toBe(true);
            });
            it.skip("- hasGuidObject() : getObject(2) 검사", () => {
                const elem1 = new MetaElement('E1');
                const table1 = new MetaTable('T1');
                table1.columns.add('c1');
                table1.rows.add(table1.newRow());
                const e1 = elem1.getObject(2);
                const t1 = table1.getObject(2);
                const col1 = table1.columns.getObject(2);
                const r1 = table1.rows[0].getObject(2);
                const c1 = table1.columns[0].getObject(2);

                expect(()=> MetaRegistry.hasGuidObject(e1, e1)).toThrow(/EL03252/)
                /**
                 * MEMO: getObject(2) 는 _guid, _ref 가 존재하지 않는다.
                 */
            });
            it("- hasGuidObject() :예외", () => {
                expect(()=> MetaRegistry.hasGuidObject({}, null)).toThrow(/EL03252/)
                expect(()=> MetaRegistry.hasGuidObject('SSS', null)).toThrow(/EL03253/)
            });
        });
        describe("MetaRegistry.findSetObject(mObj, target) <guid로 생성한 객체 조회>", () => {
            it("- findSetObject() : 객체 검색", () => {
                let m1 = new MetaObject('M1');
                let m2 = new MetaObject('M2');
                let m3 = new MetaObject('M3');
                var rObj = m1.getObject();
                
                // $set 설정한 객체가 없는 경우                
                var obj = MetaRegistry.findSetObject(m1.getObject(), rObj);
                expect(obj).toBe(undefined);
                // $set 설정한 객체가 있는 경우                
                rObj.$set = m2._guid;
                var obj = MetaRegistry.findSetObject(m1.getObject(), rObj);
                expect(obj).toBe(m2);

            });
            it("- findSetObject() : 예외", () => {
                let m1 = new MetaObject('M1');
                var rObj = m1.getObject();

                expect(()=> MetaRegistry.findSetObject({}, 'ERR')).toThrow(/EL03256/)
                expect(()=> MetaRegistry.findSetObject(m1.getObject(), 'ERR')).toThrow(/EL03257/)
            });
        });
        describe("MetaRegistry.hasRefer(obj) <참조객체 여부>", () => {
            it("- hasRefer() : MetaObject 로 참조객체 여부 ", () => {
                let i = new MetaObject();
                let obj1 = i.getObject();
                let obj2 = i.getObject();
                obj1.obj = MetaRegistry.createReferObject(obj2);    // 강제 참조 생성
    
                expect(MetaRegistry.hasRefer(obj1)).toBe(true);
                expect(MetaRegistry.hasRefer(obj2)).toBe(false);
            });
            it("- hasRefer() : 일반객체로 참조객체 여부 ", () => {
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    entity: {$ref: 'KEY1'}
                };
                const obj2 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    type: {$ns: 'Meta.MetaElement'},
                };
                const obj3 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    subArr: [{$ns: 'NS'}]
                };
                const obj4 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    subObj: { 
                        sub: {$ns: 'Meta.MetaElement'},
                    }
                };
                const obj5 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    subObj: { _guid: 'KEY1',  _type: 'T1', }
                };
                const obj6 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    subArr: [{}, 1]
                };
    
                expect(MetaRegistry.hasRefer(obj1)).toBe(true);
                expect(MetaRegistry.hasRefer(obj2)).toBe(true);
                expect(MetaRegistry.hasRefer(obj3)).toBe(true);
                expect(MetaRegistry.hasRefer(obj4)).toBe(true);
                expect(MetaRegistry.hasRefer(obj5)).toBe(false);
                expect(MetaRegistry.hasRefer(obj6)).toBe(false);
                // expect(MetaRegistry.hasRefer(obj2)).toBe(false);
            });
            it("- hasRefer() : 예외 1 ", () => {
                expect(()=> MetaRegistry.hasRefer('ERR')).toThrow(/EL03254/)
                expect(()=> MetaRegistry.hasRefer({})).toThrow(/EL03255/)
            });
            // it("- hasRefer() : 예외 2 ", () => {
            //     const obj3 = {
            //         _guid: 'KEY1',
            //         _type: 'T1',
            //         subArr: [{$ns: 'NS'}]
            //     };    
            //     expect(()=> MetaRegistry.hasRefer('ERR')).toThrow(/ES024/)
            //     expect(()=> MetaRegistry.hasRefer({})).toThrow(/ES024/)
            // });
        });
        describe("MetaRegistry.transformRefer() <참조 객체 변환>", () => {
            it("- transformRefer() : $ns 참조로 변환", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { 
                            _guid: 'KEY3', _type: 'T3', $set: 'KEY1',
                            oType: {$ns: 'Meta.MetaObject'},
                            owner: {$ref: 'KEY2'}
                        },
                        10
                    ],
                    oType: {$ns: 'Meta.MetaObject'},
                    owner: {$ref: 'KEY2'}
                };
                const obj2 = MetaRegistry.transformRefer(obj1);
                
                expect(obj2.oType).toBe(MetaObject);
                expect(obj2.subArr[0].oType).toBe(MetaObject);
            });
            it("- transformRefer() : 예외 ($ns) ", () => {
                const a = new MetaObject();
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    oType: {$ns: 'Meta.Error'},
                    owner: {$ref: 'KEY2'}
                };
                const obj2 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    oType: { sub: { $ns: 'Meta.Error' } },
                    owner: {$ref: 'KEY2'}
                };
                const obj3 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    oType: { sub: {sub2: { $ns: 'Meta.Error' }} },
                    owner: {$ref: 'KEY2'}
                };

                expect(()=> MetaRegistry.transformRefer(obj1)).toThrow(/EL03245/)
                expect(()=> MetaRegistry.transformRefer(obj2)).toThrow(/EL03245/)
                expect(()=> MetaRegistry.transformRefer(obj3)).toThrow(/EL03245/)
            });
            it("- 예외 : 타입 ", () => {
                expect(()=> MetaRegistry.transformRefer(-1)).toThrow(/EL03244/)
            });
        });
        describe("MetaRegistry.registerClass() <클래스 등록>", () => {
            it("- registerClass() : 초기 자동 등록", () => {
                // 메타객체는 자동 등록됨
                const a = new MetaObject();
                expect(MetaRegistry.namespace.count).toBe(1);
            });
            it("- registerClass() : 내장 함수 등록", () => {
                MetaRegistry.registerClass(String, 'str');
                MetaRegistry.registerClass(Number, 'num');
                MetaRegistry.registerClass(RegExp, 'reg');
                MetaRegistry.registerClass(Function, 'fun');
                MetaRegistry.registerClass(Array, 'arr');
                MetaRegistry.registerClass(Date, 'date');
                MetaRegistry.registerClass(Boolean, 'bool');
                MetaRegistry.registerClass(Object, 'arr');
                
                expect(MetaRegistry.namespace.count).toBe(0);
            });
            it("- registerClass() : 전역 함수 등록", () => {
                global.gFun1 = function() {return 'gFun1'};
                
                // 전역변수와 동일이름 사용시 등록 안함
                MetaRegistry.registerClass(global.gFun1, 'gFun1');
                expect(MetaRegistry.namespace.count).toBe(0);
                // 위치 변경시 등록됨
                MetaRegistry.registerClass(global.gFun1, 'a1.gFun1');
                expect(MetaRegistry.namespace.count).toBe(1);

            });
            it("- registerClass() :사용자 클래스(함수) 등록", () => {
                const fun1 = function() {return 'Fun1'};
                MetaRegistry.namespace.allowOverlap = true; // 중복허용
                MetaRegistry.registerClass(fun1, 'fun1');
                MetaRegistry.registerClass(fun1, 'a1.fun1');
                MetaRegistry.registerClass(fun1, 'a1.b1', 'fun1');

                expect(MetaRegistry.namespace.count).toBe(3);
                expect(MetaRegistry.namespace.has('fun1')).toBe(true);
                expect(MetaRegistry.namespace.has('a1.fun1')).toBe(true);
                expect(MetaRegistry.namespace.has('a1.b1.fun1')).toBe(true);
            });
            it("- 예외 : 타입 ", () => {
                expect(()=> MetaRegistry.registerClass(-1)).toThrow(/EL03231/)
            });
            it("- 예외 : 필수값 검사 ", () => {
                expect(()=> MetaRegistry.registerClass(String, 10)).toThrow(/EL03232/)
                expect(()=> MetaRegistry.registerClass(String, 'a', 10)).toThrow(/EL03233/)
            });
        });
        describe("MetaRegistry.releaseClass() <클래스 해제>", () => {
            it("- releaseClass() : ns에서 클래스 해제", () => {
                const fun1 = function() {return 'Fun1'};
                MetaRegistry.namespace.allowOverlap = true; // 중복허용
                MetaRegistry.registerClass(fun1, 'fun1');
                MetaRegistry.registerClass(fun1, 'a1.fun1');
                MetaRegistry.registerClass(fun1, 'a1.b1', 'fun1');

                // 등록
                expect(MetaRegistry.namespace.count).toBe(3);
                // 해제
                MetaRegistry.releaseClass('fun1');
                MetaRegistry.releaseClass('a1.fun1');
                MetaRegistry.releaseClass('a1.b1.fun1');
                MetaRegistry.releaseClass('String');
                expect(MetaRegistry.namespace.count).toBe(0);
            });
            it("- 예외 : 타입 ", () => {
                expect(()=> MetaRegistry.releaseClass(-1)).toThrow(/EL03234/)
            });
        });
        describe("MetaRegistry.findClass() <클래스 조화>", () => {
            it("- findClass() : 같은 클래스를 여러 곳에 등록한 경우", () => {
                const fun1 = function() {return 'Fun1'};
                MetaRegistry.namespace.allowOverlap = true; // 중복허용
                MetaRegistry.registerClass(fun1, 'fun1');
                MetaRegistry.registerClass(fun1, 'a1.fun1');
                const fullName1 = MetaRegistry.findClass(fun1);
                const fullName2 = MetaRegistry.findClass(String);
                // 첫번째 요소 리턴
                expect(fullName1).toBe('fun1');
                expect(fullName2).toBe('String');
            });
            it("- 예외 : 타입 ", () => {
                expect(()=> MetaRegistry.findClass('ERR')).toThrow(/EL03235/)
            });
        });
        describe("MetaRegistry.getClass() <클래스 얻기>", () => {
            it("- getClass() : 클래스 얻기 ", () => {
                const fun1 = function() {return 'Fun1'};
                MetaRegistry.namespace.allowOverlap = true; // 중복허용
                MetaRegistry.registerClass(fun1, 'fun1');
                MetaRegistry.registerClass(fun1, 'a1.fun1');
                const elem1 = MetaRegistry.getClass('a1.fun1');
                const elem2 = MetaRegistry.getClass('String');
                // 첫번째 요소 리턴
                expect(elem1).toBe(fun1);
                expect(elem2).toBe(String);
            });
            it("- 예외 : 타입 ", () => {
                expect(()=> MetaRegistry.getClass(-1)).toThrow(/EL03236/)
            });
        });
        
        describe("MetaRegistry.loadMetaObject() <로드>", () => {
            it("- loadMetaObject() : ", () => {
                const c1 = new PropertyCollection();
                c1.add('k1', 10);
                var rObj = c1.getObject();
                var str = JSON.stringify(rObj, null);
                const p2 = MetaRegistry.loadMetaObject(str);

                // const t1 = new MetaTable('T1');
                // t1.columns.add('i1');
                // t1.columns.add('i2');
                // const str = t1.output(0, null, '\t');
                // const t2 = MetaRegistry.loadMetaObject(str);
                expect(p2.count).toBe(1);
                expect(p2['k1']).toBe(10)
            });
            it("- loadMetaObject() : 객체 초기화 ", () => {
                const c1 = new PropertyCollection();
                c1.add('k1', 10);
                var rObj = c1.getObject();
                var str = JSON.stringify(rObj, null);
                MetaRegistry.init()
                loadNamespace();
                const p2 = MetaRegistry.loadMetaObject(str);

                expect(p2.count).toBe(1);
                expect(p2['k1']).toBe(10)

                // const t1 = new MetaTable('T1');
                // t1.columns.add('i1');
                // t1.columns.add('i2');
                // const str = t1.output(0, null, '\t');
                // MetaRegistry.init()
                // loadNamespace();
                // const t2 = MetaRegistry.loadMetaObject(str);

                // expect(t2.tableName).toBe('T1');
                // expect(t2.columns.count).toBe(2);
                // expect(t2.columns['i1']).toBeDefined();
                // expect(t2.columns['i2']).toBeDefined();
                // expect(t2.columns['i3']).not.toBeDefined();
            });
            it("- loadMetaObject() : 외부 parse 사용", () => {
                const t1 = new PropertyCollection();
                t1.add('i1', 10);
                t1.add('i2', 20);
                var obj = t1.getObject();
                var str = JSON.stringify(obj, null);
                const t2 = MetaRegistry.loadMetaObject(str, parse);

                expect(t2.count).toBe(2);
                expect(t2['i1']).toBeDefined();
                expect(t2['i2']).toBeDefined();
                expect(t2['i3']).not.toBeDefined();
            });

            it("- loadMetaObject() : 예외 ", () => {
                expect(()=>  MetaRegistry.loadMetaObject(10, parse)).toThrow(/EL03246/)
                expect(()=>  MetaRegistry.loadMetaObject("10")).toThrow(/EL03247/)
            });
        });
        describe("예외, cover", () => {
            it("- cover ", () => {
                MetaRegistry();
                
            });
        });
    });
    
});
