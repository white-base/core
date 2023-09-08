/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {MetaRegistry}        = require('../src/meta-registry');
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
const { loadNamespace } = require('../src/load-namespace');

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
        describe("MetaRegistry.register() <메타객체 등록>", () => {
            it("- register() : 자동등록", () => {
                const m1 = new MetaElement('E1');
                const m2 = new MetaElement('E2');

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

                expect(()=> MetaRegistry.register(c1)).toThrow(/_type.*_guid/);                
            });
        });
        describe("MetaRegistry.release() <해제>", () => {
            it("- release() : 해제(자동등록) ", () => {
                let m1 = new MetaObject();
                let m2 = new MetaObject();
                
                // 등록 [자동]
                expect(MetaRegistry.count).toBe(2);
                // 해제
                MetaRegistry.release(m1);
                MetaRegistry.release(m2._guid);
                expect(MetaRegistry.count).toBe(0);
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
            });
        });
        describe("MetaRegistry.find() <메타객체 조회>", () => {
            it("- find(meta) : 객체로 조회, guid로 조회 ", () => {
                let m1 = new MetaElement('M1');
                let m2 = new MetaElement('M2');
                const f1 = MetaRegistry.find(m1);
                const f2 = MetaRegistry.find(m2._guid);
                
                expect(f1 === m1).toBe(true);
                expect(f2 === m2).toBe(true);
                expect(MetaRegistry.count).toBe(2);
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
            });
        });
        describe("MetaRegistry.createMetaObject() <메타객체 생성>", () => {
            it("- createMetaObject() : 객체로 생성", () => {
                loadNamespace();    // 클래스 로딩
                const mObj1 = {_type: 'MetaTable', _ns: 'Meta.Entity', name: 'T1'};
                const mObj2 = {_type: 'MetaView', _ns: 'Meta.Entity', name: 'V1'};
                const table1 = MetaRegistry.createMetaObject(mObj1);
                const table2 = MetaRegistry.createMetaObject(mObj2);
                
                expect(table1.tableName).toBe('T1');
                expect(table2.viewName).toBe('V1');
            });
            it("- createMetaObject() : 참조가 존재하는 객체로 생성", () => {
                loadNamespace();    // 클래스 로딩
                const mObj1 = {_type: 'MetaTable', _ns: 'Meta.Entity', name: 'T1'};
                const table1 = MetaRegistry.createMetaObject(mObj1);
                const obj1 = table1.columns.getObject();
                const col1 = MetaRegistry.createMetaObject(obj1);
                
                expect(table1.tableName).toBe('T1');
                expect(table1.columns._owner).toBe(table1);
                expect(col1._owner).toBe(null);
            });
        });
        describe("MetaRegistry.createReferObject() <참조객체 생성>", () => {
            it("- createReferObject() : 일반객체에 생성 ", () => {
                const m1 = new MetaElement('M1');
                const obj1 = {
                    m1: MetaRegistry.createReferObject(m1),
                    name: 'OBJ'
                };
                const obj2 = {
                    m1: { $ref: m1._guid },
                    name: 'OBJ'   
                };

                expect(obj1).toEqual(obj2);
            });
        });
        describe("MetaRegistry.createNsReferObject() <네임스페이스 속성 생성>", () => {
            it("- createNsRefer() : 네임스페이스 객체 생성", () => {
                loadNamespace();    // 클래스 로딩
                const class1 = MetaRegistry.ns.get('Meta.Entity.MetaTable');
                const obj1 = {
                    cls1: MetaRegistry.createNsReferObject(class1),
                    name: 'OBJ'
                };
                const obj2 = {
                    cls1: {$ns: 'Meta.Entity.MetaTable'},
                    name: 'OBJ'   
                };
                
                expect(obj1).toEqual(obj2);
            });
        });
        describe("MetaRegistry.createSetObject() <setObject 설정 속성 생성>", () => {
            it("- createSetObject() : ", () => {
                const m1 = new MetaElement('M1');
                const obj1 = {
                    cls1: {},
                    name: 'OBJ'
                };
                MetaRegistry.createSetObject(obj1.cls1, m1);
                const obj2 = {
                    cls1: {$set: m1._guid},
                    name: 'OBJ'   
                };

                expect(obj1).toEqual(obj2);
            });
        });
        describe("MetaRegistry.validObject() <메태객체 유효성 검사>", () => {
            it("- validObject() : 일반객체로 검사 ($ref, $set, $ns)", () => {
                const a = new MetaElement();
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
                    type: {$ns: 'Meta.MetaElement'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(true);
            });
            it("- validObject() : 실패 검사 1 ($ref, $set, $ns)", () => {
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
                    type: {$ns: 'Meta.MetaElement'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY4'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 실패 검사 2 ($ref, $set, $ns)", () => {
                const obj1 = {
                    _guid: 'KEY1',
                    _type: 'T1',
                    name: 'a1',
                    subObj: {
                        _guid: 'KEY2',
                        _type: 'T2',
                    },
                    subArr: [
                        { _guid: 'KEY3', _type: 'T3', $set: 'KEY4'},
                        10
                    ],
                    type: {$ns: 'Meta.MetaElement'},
                    onwer: {$ref: 'KEY2'},
                    $set: 'KEY3'
                };

                expect(MetaRegistry.validObject(obj1)).toBe(false);
            });
            it("- validObject() : 성공 (컬렉션 key 검사)", () => {
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
            it("- validObject() : 실패 1 (컬렉션 key 검사)", () => {
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
            it("- validObject() : 실패 2 (컬렉션 key 검사)", () => {
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
            it("- validObject() : 실패 3 (컬렉션 key 검사)", () => {
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
        });
        describe("MetaRegistry.isGuidObject() <guid 객체 여부 감사>", () => {
            it("- isGuidObject() : getObject() 검사 <성공>", () => {
                const a = new MetaElement();
                expect(MetaRegistry.isGuidObject(a.getObject())).toBe(true);
            });
            it("- isGuidObject() : meta 검사 <실패>", () => {
                const a = new MetaElement();
                expect(MetaRegistry.isGuidObject(a)).toBe(false);
            });
        });
        describe("MetaRegistry.findSetObject(mObj, target) <guid로 생성한 객체 조회>", () => {
            it("- findSetObject() : 객체 검색", () => {
                let m1 = new MetaElement('M1');
                let m2 = new MetaElement('M2');
                let m3 = new MetaElement('M3');
                var rObj = m1.getObject();
                
                // $set 설정한 객체가 없는 경우                
                var obj = MetaRegistry.findSetObject(rObj, m1.getObject());
                expect(obj).toBe(undefined);
                // $set 설정한 객체가 있는 경우                
                rObj.$set = m2._guid;
                var obj = MetaRegistry.findSetObject(rObj, m1.getObject());
                expect(obj === m2).toBe(true);
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
    
                expect(MetaRegistry.hasRefer(obj1)).toBe(true);
                expect(MetaRegistry.hasRefer(obj2)).toBe(true);
                expect(MetaRegistry.hasRefer(obj3)).toBe(true);
                expect(MetaRegistry.hasRefer(obj4)).toBe(true);
                expect(MetaRegistry.hasRefer(obj5)).toBe(false);
                // expect(MetaRegistry.hasRefer(obj2)).toBe(false);
            });
        });
        describe("MetaRegistry.transformRefer() <참조 객체 변환>", () => {
            it("- transformRefer() : $ns 참조로 변환", () => {
                const a = new MetaElement();
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
                            oType: {$ns: 'Meta.MetaElement'},
                            owner: {$ref: 'KEY2'}
                        },
                        10
                    ],
                    oType: {$ns: 'Meta.MetaElement'},
                    owner: {$ref: 'KEY2'}
                };
                const obj2 = MetaRegistry.transformRefer(obj1);
                
                expect(obj2.oType).toBe(MetaElement);
                expect(obj2.subArr[0].oType).toBe(MetaElement);
            });
        });
        describe("MetaRegistry.registerClass() <클래스 등록>", () => {
            it("- registerClass() : 초기 자동 등록", () => {
                // 메타객체는 자동 등록됨
                const a = new MetaElement();
                expect(MetaRegistry.ns.count).toBe(1);
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
                
                expect(MetaRegistry.ns.count).toBe(0);
            });
            it("- registerClass() : 전역 함수 등록", () => {
                global.gFun1 = function() {return 'gFun1'};
                
                // 전역변수와 동일이름 사용시 등록 안함
                MetaRegistry.registerClass(global.gFun1, 'gFun1');
                expect(MetaRegistry.ns.count).toBe(0);
                // 위치 변경시 등록됨
                MetaRegistry.registerClass(global.gFun1, 'a1.gFun1');
                expect(MetaRegistry.ns.count).toBe(1);

            });
            it("- registerClass() :사용자 클래스(함수) 등록", () => {
                const fun1 = function() {return 'Fun1'};
                MetaRegistry.registerClass(fun1, 'fun1');
                MetaRegistry.registerClass(fun1, 'a1.fun1');
                MetaRegistry.registerClass(fun1, 'a1.b1', 'fun1');

                expect(MetaRegistry.ns.count).toBe(3);
                expect(MetaRegistry.ns.has('fun1')).toBe(true);
                expect(MetaRegistry.ns.has('a1.fun1')).toBe(true);
                expect(MetaRegistry.ns.has('a1.b1.fun1')).toBe(true);
            });
        });
        describe("MetaRegistry.releaseClass() <클래스 해제>", () => {
            it("- releaseClass() : ns에서 클래스 해제", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.findClass() <클래스 조화>", () => {
            it("- findClass() : ns에서 클래스 조회", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.getClass() <클래스 얻기>", () => {
            it("- getClass() : ns에서 클래스 얻기 ", () => {
                // TODO:
            });
        });
        describe("MetaRegistry.loading() <로드>", () => {
            it("- loading() : 로드", () => {
                // TODO:
            });
        });
    });
    
});
