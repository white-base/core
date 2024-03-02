/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const Util                  = require('../src/util');
const {IObject}               = require('../src/i-object');
const {IMarshal}              = require('../src/i-marshal');
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
const {BaseEntity}                            = require('../src/base-entity');
const { MetaTable, MetaTableCollection }    = require('../src/meta-table');
const { MetaView, MetaViewCollection }      = require('../src/meta-view');
const { MetaRow }           = require('../src/meta-row');
const { MetaColumn }        = require('../src/meta-column');
const  {MetaSet}              = require('../src/meta-set');
const { replacer, reviver, stringify, parse }              = require('telejson');
const { MetaRegistry } = require('../src/meta-registry');
const { loadNamespace } = require('../src/load-namespace');


//==============================================================
// test
describe("[target: meta-set.js]", () => {
    beforeEach(() => {
       jest.resetModules();
       MetaRegistry.init();
    });
    
    describe("MetaSet :: 클래스", () => {
        describe("MetaSet.setName <셋이름>", () => {
            it("- this.setName : 조회 ", () => {
                var set1 = new MetaSet('S1');
        
                expect(set1._name).toBe('S1');
                expect(set1.setName).toBe('S1');
            });
            it("- this.setName : 수정 ", () => {
                var set1 = new MetaSet('S1');
                set1.setName = 'S2';

                expect(set1._name).toBe('S2');
                expect(set1.setName).toBe('S2');
            });
            it("- 예외 : 다른자료형 ", () => {
                var set1 = new MetaSet('S1');
                expect(()=> set1.setName = 10).toThrow(/ES021/)
                expect(()=> set1.setName = '').toThrow(/EL03122/)
            });
        });
        describe("MetaSet.autoChanges <자동 변경 설정>", () => {
            it("- 예외 : 다른자료형 ", () => {
                var set1 = new MetaSet('S1');
                expect(()=> set1.autoChanges = 10).toThrow(/ES021/)
                // expect(()=> set1.setName = '').toThrow(/ES055/)
            });
        });
        describe("MetaTable.equal() <객체 비교>", () => {
            it("- equal() : 생성 후 비교 ", () => {
                const c1 = new MetaSet('S1');
                const c2 = new MetaSet('S1');
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1._guid === c2._guid).toBe(false);
                expect(c1 === c2).toBe(false);
            });
            it("- equal() : columns 추가 후 비교 ", () => {
                const c1 = new MetaSet('S1');
                const c2 = new MetaSet('S1');
                c2.tables.add('a1');

                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : column 추가 후 비교 ", () => {
                const c1 = new MetaSet('S1');
                const c2 = new MetaSet('S1');
                c1.tables.add('T1');
                c2.tables.add('T1');

                expect(c1.equal(c2)).toBe(true);
                // column 추가
                c1.tables['T1'].columns.add('a1');
                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : rows 추가 후 비교 ", () => {
                const c1 = new MetaSet('S1');
                const c2 = new MetaSet('S1');
                c1.tables.add('T1');
                c2.tables.add('T1');
                c1.tables['T1'].columns.add('a1');
                c2.tables['T1'].columns.add('a1');

                expect(c1.equal(c2)).toBe(true);
                // row 추가
                var row = c1.tables['T1'].newRow();
                row['a1'] = 'R1';
                c1.tables['T1'].rows.add(row);
                expect(c1.equal(c2)).toBe(false);
            });
        });
        describe("MetaSet.transformSchema(): obj<guid> <스키마로 변환>", () => {
            it("- transformSchema() : 직렬화 객체 얻기 ", () => {
                // var set1 = new MetaSet('S1');
                // // table add
                // set1.tables.add("T1");
                // set1.tables['T1'].columns.add('i1');
                // set1.tables['T1'].columns.add('i2');
            });
            it("- 커버리지 : transformSchema() ", () => {
                expect(()=> MetaSet.transformSchema(null)).toThrow(/ES021/)
            });
        });                
        describe("MetaSet.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 직렬화 객체 얻기 ", () => {
                var set1 = new MetaSet('S1');
                // table add
                set1.tables.add("T1");
                set1.tables['T1'].columns.add('i1');
                set1.tables['T1'].columns.add('i2');
                var row = set1.tables['T1'].newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                set1.tables['T1'].rows.add(row);
                // view add
                set1.views.add("V1");
                set1.views['V1'].columns.add('i3');
                var row = set1.views['V1'].newRow();
                row['i3'] = 'R3';
                set1.views['V1'].rows.add(row);
                const obj = set1.getObject();
    
                expect(obj._type === 'Meta.Entity.MetaSet').toBe(true);
                expect(obj.name === 'S1').toBe(true);
                expect(obj.tables._elem[0]._type === 'Meta.Entity.MetaTable').toBe(true);
                expect(obj.tables._elem[0].name === 'T1').toBe(true);
                expect(obj.tables._elem[0].tableName === 'T1').toBe(true);
                expect(obj.tables._elem[0].columns._elem[0]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj.tables._elem[0].columns._elem[0].name === 'i1').toBe(true);
                expect(obj.tables._elem[0].columns._elem[0].columnName === 'i1').toBe(true);
                expect(obj.tables._elem[0].columns._elem[1]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj.tables._elem[0].columns._elem[1].name === 'i2').toBe(true);
                expect(obj.tables._elem[0].columns._elem[1].columnName === 'i2').toBe(true);
                expect(obj.tables._elem[0].columns._key).toEqual(['i1', 'i2']);
                expect(obj.tables._elem[0].rows._elem[0]._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj.tables._elem[0].rows._elem[0]._elem).toEqual(['R1', 'R2']);
                expect(obj.tables._elem[0].rows._elem[0]._key).toEqual(['i1', 'i2']);
                expect(obj.views._elem[0]._type === 'Meta.Entity.MetaView').toBe(true);
                expect(obj.views._elem[0].name === 'V1').toBe(true);
                expect(obj.views._elem[0].viewName === 'V1').toBe(true);
                expect(obj.views._elem[0].columns._elem[0]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj.views._elem[0].columns._elem[0].name === 'i3').toBe(true);
                expect(obj.views._elem[0].columns._elem[0].columnName === 'i3').toBe(true);
                expect(obj.views._elem[0].columns._key).toEqual(['i3']);
                expect(obj.views._elem[0].rows._elem[0]._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj.views._elem[0].rows._elem[0]._elem).toEqual(['R3']);
            });
            it("- 커버리지 : 다른 객체 전달 ", () => {
                var set1 = new MetaSet('S1');
                const obj1 = set1.getObject(0, {});
                const obj2 = set1.getObject(0, [{}]);
            });
        });
        describe("MetaTable.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                var set1 = new MetaSet('S1');
                // table add
                set1.tables.add("T1");
                set1.tables['T1'].columns.add('i1');
                set1.tables['T1'].columns.add('i2');
                var row = set1.tables['T1'].newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                set1.tables['T1'].rows.add(row);
                // view add
                set1.views.add("V1");
                set1.views['V1'].columns.add('i3');
                var row = set1.views['V1'].newRow();
                row['i3'] = 'R3';
                set1.views['V1'].rows.add(row);
                const obj1 = set1.getObject();
                // 참조 변환 > 객체 초기화 > 네임스페이스 로드
                const mObj = MetaRegistry.transformRefer(obj1);  
                // MetaRegistry.init();
                // loadNamespace();
                const set2 = new MetaSet('S2');
                set2.setObject(mObj);
                const obj2 = set2.getObject();

                expect(obj2._type === 'Meta.Entity.MetaSet').toBe(true);
                expect(obj2.name === 'S1').toBe(true);
                expect(obj2.tables._elem[0]._type === 'Meta.Entity.MetaTable').toBe(true);
                expect(obj2.tables._elem[0].name === 'T1').toBe(true);
                expect(obj2.tables._elem[0].tableName === 'T1').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[0]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[0].name === 'i1').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[0].columnName === 'i1').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[1]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[1].name === 'i2').toBe(true);
                expect(obj2.tables._elem[0].columns._elem[1].columnName === 'i2').toBe(true);
                expect(obj2.tables._elem[0].columns._key).toEqual(['i1', 'i2']);
                expect(obj2.tables._elem[0].rows._elem[0]._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj2.tables._elem[0].rows._elem[0]._elem).toEqual(['R1', 'R2']);
                expect(obj2.tables._elem[0].rows._elem[0]._key).toEqual(['i1', 'i2']);
                expect(obj2.views._elem[0]._type === 'Meta.Entity.MetaView').toBe(true);
                expect(obj2.views._elem[0].name === 'V1').toBe(true);
                expect(obj2.views._elem[0].viewName === 'V1').toBe(true);
                expect(obj2.views._elem[0].columns._elem[0]._type === 'Meta.Entity.MetaColumn').toBe(true);
                expect(obj2.views._elem[0].columns._elem[0].name === 'i3').toBe(true);
                expect(obj2.views._elem[0].columns._elem[0].columnName === 'i3').toBe(true);
                expect(obj2.views._elem[0].columns._key).toEqual(['i3']);
                expect(obj2.views._elem[0].rows._elem[0]._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj2.views._elem[0].rows._elem[0]._elem).toEqual(['R3']);
            });
            it("- setObject() : base, ref ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const s1 = new MetaSet('S1')
                s1.views.add(view1)
                s1.views.add(view2)
                s1.views.add(view3)
                const s2 = new MetaSet('VV3');
                s2.setObject(s1.getObject());
                const v1 = s2.views.V1;
                const v2 = s2.views.V1;
                const v3 = s2.views.V1;

                expect(v1.viewName).toBe('V1');
                expect(v1.columns.count).toBe(3);
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v2.columns['c2']._entity === v1).toBe(true);
                expect(v3.columns['c3']._entity === v1).toBe(true);
            });
            it("- 커버리지 : origin 전달 ", () => {
                const s1 = new MetaSet('S1')
                const s2 = new MetaSet('VV3');
                const obj1 = s1.getObject()
                s2.setObject(obj1, obj1);
            });
        });
        describe("MetaSet.clone() <복제>", () => {
            it("- clone() : 복제 ", () => {
                const set1 = new MetaSet('S1');
                const table1 = new MetaTable('T1');
                const veiw1 = new MetaView('V1');
                var row;
                // table add
                table1.columns.add('i1');
                table1.columns.add('i2');
                row = table1.newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                table1.rows.add(row);
                set1.tables.add(table1);
                // view add
                veiw1.columns.add('i1');
                row = veiw1.newRow();
                row['i1'] = 'R1';
                veiw1.rows.add(row);
                set1.views.add(veiw1);
                const set2 = set1.clone();
        
                expect(set2.setName).toMatch('S1');
                expect(set2.tables['T1'].columns.count).toBe(2);
                expect(set2.tables['T1'].columns['i1']).toBeDefined();
                expect(set2.tables['T1'].columns['i2']).toBeDefined();
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set2.tables['T1'].rows[0]['i2']).toBe('R2');
                expect(set2.views['V1'].columns['i1']).toBeDefined();
                expect(set2.views['V1'].rows[0]['i1']).toBe('R1');
                expect(set2 === set1).toBe(false);
                // 비교
                expect(set1.tables['T1'] == set2.tables['T1']).toBe(false);
                expect(set1.views['V1'] == set2.tables['V1']).toBe(false);
            });
        });
        describe("MetaSet.clear() <rows 초기화>", () => {
            it("- clear() : rows 초기화 ", () => {
                const set1 = new MetaSet('S1');
                const table1 = new MetaTable('T1');
                const veiw1 = new MetaView('V1');
                var row;
                // table add
                table1.columns.add('i1');
                table1.columns.add('i2');
                row = table1.newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                table1.rows.add(row);
                set1.tables.add(table1);
                // view add
                veiw1.columns.add('i1');
                row = veiw1.newRow();
                row['i1'] = 'R1';
                veiw1.rows.add(row);
                set1.views.add(veiw1);
                
                // before
                expect(set1.tables.count).toBe(1);
                expect(set1.views.count).toBe(1);
                expect(set1.tables[0].columns.count).toBe(2);
                expect(set1.views[0].columns.count).toBe(1);
                expect(set1.tables[0].rows.count).toBe(1);
                expect(set1.views[0].rows.count).toBe(1);
                set1.clear();
                // after
                expect(set1.tables.count).toBe(1);
                expect(set1.views.count).toBe(1);
                expect(set1.tables[0].columns.count).toBe(2);
                expect(set1.views[0].columns.count).toBe(1);
                expect(set1.tables[0].rows.count).toBe(0);
                expect(set1.views[0].rows.count).toBe(0);
            });
        });
        describe("MetaSet.reset() <rows, columns 초기화>", () => {
            it("- reset() : rows, columns 초기화 ", () => {
                const set1 = new MetaSet('S1');
                const table1 = new MetaTable('T1');
                const veiw1 = new MetaView('V1');
                var row;
                // table add
                table1.columns.add('i1');
                table1.columns.add('i2');
                row = table1.newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                table1.rows.add(row);
                set1.tables.add(table1);
                // view add
                veiw1.columns.add('i1');
                row = veiw1.newRow();
                row['i1'] = 'R1';
                veiw1.rows.add(row);
                set1.views.add(veiw1);
                
                // before
                expect(set1.tables.count).toBe(1);
                expect(set1.views.count).toBe(1);
                expect(set1.tables[0].columns.count).toBe(2);
                expect(set1.views[0].columns.count).toBe(1);
                expect(set1.tables[0].rows.count).toBe(1);
                expect(set1.views[0].rows.count).toBe(1);
                set1.reset();
                // after
                expect(set1.tables.count).toBe(0);
                expect(set1.views.count).toBe(0);
            });
        });
        
        // describe.skip("this.merge() <병합>", () => {
        //     it("-  ", () => {
        //     });
        // });
        describe("MetaSet.load(str | rObj) 출력", () => {
            it("- load(str) :  ", () => {
                const set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                const str = set1.output(0, stringify, '\t');
                // MetaRegistry.init();
                // loadNamespace();
                var set2 = new MetaSet('S2');
                set2.load(str, parse);

                expect(set2.tables['T1']).toBeDefined();
                expect(set2.tables['T1'].columns.count).toBe(2);
                expect(set2.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set2.views['V1']).toBeDefined();
                expect(set2.views['V1'].columns.count).toBe(1);
                expect(set2.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.tables['T1'].rows[0].count).toBe(2);
                expect(set2.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set2.tables['T1'].rows[0]['i2']).toBe('R2');
                expect(set2.views['V1'].rows.count).toBe(1);
                expect(set2.views['V1'].rows[0].count).toBe(1);
                expect(set2.views['V1'].rows[0]['i1']).toBe('R1');
            });
            it("- 예외 : MetaSet 로드 ", () => {
                const set1 = new MetaSet('S1');
                const set2 = new MetaSet('S2');

                expect(()=> set2.load(set2)).toThrow(/ES022/)
                expect(()=> set2.load(null)).toThrow(/ES021/)
                // expect(()=> set2.load({})).toThrow(/ES022/)
            });
            
        });
        describe("MetaSet.output() 출력", () => {
            it("- output() : new 객체 비교 ", () => {
                const set1 = new MetaSet('S1');
                const set2 = new MetaSet('S2');
                // load() 전
                expect(set1 === set2).toBe(false);
                expect(set1._guid === set2._guid).toBe(false);
                expect(set1.setName === set2.setName).toBe(false);
                // load() 후
                set2.load(set1.output());
                expect(set1 === set2).toBe(false);
                expect(set1._guid !== set2._guid).toBe(true);
                expect(set1.setName === set2.setName).toBe(true);
            });
            it("- output() : new 생성후 load() ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                const beginCnt = MetaRegistry.count;
                const str = set1.output(0, stringify, '\t');
                // MetaRegistry.init();
                // const initCnt = MetaRegistry.count;
                // loadNamespace();    // init() 초기화하여 불러와야함
                // const load_ns_Cnt = MetaRegistry.ns.count;
                // 생성자를 통해 성성
                var set2 = new MetaSet('S2');
                set2.load(str, parse);

                // expect(beginCnt).toBe(18);
                // expect(initCnt).toBe(0);
                // expect(load_ns_Cnt).toBe(38);
                expect(set2.tables['T1']).toBeDefined();
                expect(set2.tables['T1'].columns.count).toBe(2);
                expect(set2.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set2.views['V1']).toBeDefined();
                expect(set2.views['V1'].columns.count).toBe(1);
                expect(set2.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.tables['T1'].rows[0].count).toBe(2);
                expect(set2.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set2.tables['T1'].rows[0]['i2']).toBe('R2');
                expect(set2.views['V1'].rows.count).toBe(1);
                expect(set2.views['V1'].rows[0].count).toBe(1);
                expect(set2.views['V1'].rows[0]['i1']).toBe('R1');
            });
            it("- output() : createMetaObject() 생성 후 load() ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                // const beginCnt = MetaRegistry.count;
                const str = set1.output(0,stringify, '\t');
                // MetaRegistry.init();
                // const initCnt = MetaRegistry.count;
                // loadNamespace();    // init() 초기화하여 불러와야함
                // const load_ns_Cnt = MetaRegistry.ns.count;
                // 등록소를 통해서 생성
                const set2 = MetaRegistry.createMetaObject({_type: 'MetaSet', _ns: 'Meta.Entity', name: 'S2'});
                set2.load(str, parse);

                // expect(beginCnt).toBe(18);
                // expect(initCnt).toBe(0);
                // expect(load_ns_Cnt).toBe(38);
                expect(set2.tables['T1']).toBeDefined();
                expect(set2.tables['T1'].columns.count).toBe(2);
                expect(set2.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set2.views['V1']).toBeDefined();
                expect(set2.views['V1'].columns.count).toBe(1);
                expect(set2.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.tables['T1'].rows[0].count).toBe(2);
                expect(set2.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set2.tables['T1'].rows[0]['i2']).toBe('R2');
                expect(set2.views['V1'].rows.count).toBe(1);
                expect(set2.views['V1'].rows[0].count).toBe(1);
                expect(set2.views['V1'].rows[0]['i1']).toBe('R1');
            });
            it("- output() : MetaRegistry.load() <같은객체를 가르킨>", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                const str = set1.output(0, stringify, '\t');
                // MetaRegistry.init()
                const set2 = MetaRegistry.loadMetaObject(str, parse);
                
                // expect(set2.tables['T1']).toBeDefined();
                // expect(set2.tables['T1'].columns.count).toBe(2);
                // expect(set2.tables['T1'].columns['i1'].caption).toBe('C1');
                // expect(set2.tables['T1'].columns['i2'].caption).toBe('C2');
                // expect(set2.views['V1']).toBeDefined();
                // expect(set2.views['V1'].columns.count).toBe(1);
                // expect(set2.views['V1'].columns['i1'].caption).toBe('C1');
                // expect(set2.tables['T1'].rows.count).toBe(1);
                // expect(set2.tables['T1'].rows[0].count).toBe(2);
                // expect(set2.tables['T1'].rows[0]['i1']).toBe('R1');
                // expect(set2.tables['T1'].rows[0]['i2']).toBe('R2');
                // expect(set2.views['V1'].rows.count).toBe(1);
                // expect(set2.views['V1'].rows[0].count).toBe(1);
                // expect(set2.views['V1'].rows[0]['i1']).toBe('R1');
                expect(set1 === set2).toBe(true);
            });
            it("- output() : 출력 후 MeTaRegistry", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                
                set1.read(json1);
                // const beginCnt = MetaRegistry.count;
                const str = set1.output(0, stringify, '\t');
                // MetaRegistry.init();
                // const initCnt = MetaRegistry.count;
                // loadNamespace();
                // const load_ns_Cnt = MetaRegistry.ns.count;
                // 등록소를 통해서 생성
                const set2 = MetaRegistry.createMetaObject({_type: 'MetaSet', _ns: 'Meta.Entity', name: 'S2'});
                set2.load(str, parse);
                const json3 = set2.write();
                const json2 = { 
                    name: 'S1',
                    tables: {
                        $key: ['T1'],
                        T1: {
                            _guid: set2.tables.T1._guid,
                            // name: 'T1',
                            columns: {
                                $key: ['i1', 'i2'],
                                i1: { 
                                    _guid: set2.tables.T1.columns.i1._guid,
                                    caption: 'C1'
                                },
                                i2: { 
                                    _guid: set2.tables.T1.columns.i2._guid,
                                    caption: 'C2'
                                },
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        $key: ['V1'],
                        V1: {
                            _guid: set2.views.V1._guid,
                            // name: 'V1',
                            columns: {
                                $key: ['i1'],
                                i1: { 
                                    _guid: set2.views.V1.columns.i1._guid,
                                    caption: 'C1'
                                },
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };


                expect(json3).toEqual(json2);
                // expect(beginCnt).toBe(18);
                // expect(initCnt).toBe(0);
                // expect(load_ns_Cnt).toBe(38);
            });
        });
        describe("MetaSet.read(json, opt) <가져오기>", () => {
            it("- read(oSchema) object 가져오기 ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);

                // table
                expect(set1.tables['T1']).toBeDefined();
                expect(set1.tables['T1'].columns.count).toBe(2);
                expect(set1.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set1.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set1.tables['T1'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set1.tables['T1'].rows[0]['i2']).toBe('R2');
                // view
                expect(set1.views['V1']).toBeDefined();
                expect(set1.views['V1'].columns.count).toBe(1);
                expect(set1.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set1.views['V1'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
            });
            it("- read(oSchema) object 가져오기 ", () => {
                var set0 = new MetaSet('S0');
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set0.read(json1);
                let rObj = set0.getObject();
                set1.read(rObj);

                // table
                expect(set1.tables['T1']).toBeDefined();
                expect(set1.tables['T1'].columns.count).toBe(2);
                expect(set1.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set1.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set1.tables['T1'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set1.tables['T1'].rows[0]['i2']).toBe('R2');
                // view
                expect(set1.views['V1']).toBeDefined();
                expect(set1.views['V1'].columns.count).toBe(1);
                expect(set1.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set1.views['V1'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
            });
            it("- getObect(0) vs getObject(1) 읽기 비교 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const set1 = new MetaSet('S1')
                set1.views.add(view1)
                set1.views.add(view2)
                set1.views.add(view3)
                const s1 = new MetaSet('S1');
                const ss1 = new MetaSet('S1');
                s1.read(set1.getObject(0));
                ss1.read(set1.getObject(1));
                
                // s1.equal(ss1) 와 동일
                expect(s1.equal(ss1)).toBe(true);
                expect(s1.getObject(2)).toEqual(ss1.getObject(2));
            });
            it("- read(oSchema) :  스키마로 참조 읽기 ", () => {
                const sch1 = {
                    name: "S1",
                    tables: {
                        $key: []
                    },
                    views: {
                        V1: {
                            _guid: "_V1",
                            columns: {
                                c1: {
                                    _guid: "_C1",
                                    value: "V1"
                                },
                                c2: {
                                    _guid: "_C2",
                                    value: "V2"
                                },
                                c3: {
                                    _guid: "_C3",
                                    alias: "cc3",
                                    value: "V3"
                                },
                                $key: ["c1","c2","c3"]
                            },
                            rows: [{c1: "V1", c2: "V2", cc3: "V3"}]
                        },
                        V2: {
                            _guid: "_V2",
                            _baseEntity: {
                                $ref: "_V1"
                            },
                            columns: {
                                c2: {$ref: "_C2"},
                                c3: {$ref: "_C3"},
                                $key: ["c2", "c3"]
                            },
                            rows: [{c2: "V2", cc3: "V3"}]
                        },
                        V3: {
                            _guid: "_V3",
                            columns: {
                                "c3": {$ref: "_C3"},
                                $key: ["c3"]
                            },
                            rows: [{cc3: "V3"}]
                        },
                        $key: ["V1","V2","V3"]
                    }
                };
                const s2 = new MetaSet('S2')
                const s3 = new MetaSet('S3')
                const s4 = new MetaSet('S4')
                s2.read(sch1);  // 3
                s3.read(sch1, 1);
                s4.read(sch1, 2);
                const v1 = s2.views.V1
                const v2 = s2.views.V2
                const v3 = s2.views.V3

                expect(v1.columns.count).toBe(3)
                expect(v2.columns.count).toBe(2)
                expect(v3.columns.count).toBe(1)
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v2.columns['c2']._entity === v1).toBe(true);
                expect(v3.columns['c3']._entity === v1).toBe(true);
                expect(v1.rows.count).toBe(1);
                expect(v1.rows[0]['c1']).toBe('V1');
                expect(v1.rows[0]['c2']).toBe('V2');
                expect(v1.rows[0]['cc3']).toBe('V3');
            });
            it("- read(oGuid) :  oGuid 로 읽기 ", () => {
                const set1 = new MetaSet('S1')
                const set2 = new MetaSet('S2')
                set1.tables.add('T1')
                set1.views.add('V1')
                const table1 = set1.tables['T1']
                const view1 = set1.views['V1']
                table1.columns.addValue('c1', 1);
                view1.columns.addValue('c1', 1);
                table1.rows.add(table1.getValue());
                view1.rows.add(view1.getValue());
                set2.read(set1);

                expect(set2.tables.count).toBe(1)
                expect(set2.views.count).toBe(1)
                expect(set2.tables['T1'].columns['c1'].value).toBe(1);
                expect(set2.views['V1'].columns['c1'].value).toBe(1);
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.views['V1'].rows.count).toBe(1);
            });
            it("- read(oGuid) :  읽는 메타셋에 뷰와 테이블 존재시 ", () => {
                const set1 = new MetaSet('S1')
                const set2 = new MetaSet('S2')
                const set3 = new MetaSet('S3')
                set1.tables.add('T1')
                set1.views.add('V1')
                set2.tables.add('T1')
                set2.views.add('V1')
                set3.tables.add('T1')
                set3.views.add('V1')
                const table1 = set1.tables['T1']
                const view1 = set1.views['V1']
                table1.columns.addValue('c1', 1);
                view1.columns.addValue('c1', 1);
                table1.rows.add(table1.getValue());
                view1.rows.add(view1.getValue());
                set2.read(set1);
                set3.read(set1.getObject());

                expect(set2.tables.count).toBe(1)
                expect(set2.views.count).toBe(1)
                expect(set2.tables['T1'].columns['c1'].value).toBe(1);
                expect(set2.views['V1'].columns['c1'].value).toBe(1);
                expect(set2.tables['T1'].rows.count).toBe(1);
                expect(set2.views['V1'].rows.count).toBe(1);
            });
            it("- 예외 :  타입 다름 ", () => {
                const set1 = new MetaSet('S1')
                expect(()=> set1.read(null)).toThrow(/ES021/)
                expect(()=> set1.read({}, 'ERR')).toThrow(/ES021/)
            });
            // it("- 커버리지 :  객체 타입 ", () => {
            //     const set1 = new MetaSet('S1')
            //     const set2 = new MetaSet('S2')
            //     const obj1 = {}
            //     set2.read({})
                
            // });
        });
        describe("MetaSet.readSchema() <스키마 가져오기>", () => {
            it("- readSchema() : 기본 로딩 ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.readSchema(json1);

                // table
                expect(set1.tables['T1']).toBeDefined();
                expect(set1.tables['T1'].columns.count).toBe(2);
                expect(set1.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set1.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set1.tables['T1'].rows.count).toBe(0);
                // view
                expect(set1.views['V1']).toBeDefined();
                expect(set1.views['V1'].columns.count).toBe(1);
                expect(set1.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set1.views['V1'].rows.count).toBe(0);
            });
            it("- readSchema() : getObject()로 읽기 ", () => {
                // 참조도 가능하게
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const set1 = new MetaSet('S1')
                set1.views.add(view1)
                set1.views.add(view2)
                set1.views.add(view3)
                const gObj1 = set1.getObject()
                const set2 = new MetaSet('S1')
                set2.readSchema(gObj1);
                const v1 = set1.views.V1;
                const v2 = set1.views.V2;
                const v3 = set1.views.V3;

                // const tObj1 = BaseEntity._transformObject(gObj1)
                // const tObj2 = BaseEntity._transformObject(gObj2)
                // const tObj3 = BaseEntity._transformObject(gObj3)

                expect(set1.views.count).toBe(3);
                expect(v1.viewName).toBe('V1');
                expect(v2.viewName).toBe('V2');
                expect(v3.viewName).toBe('V3');
                // V1
                expect(v1.columns.count).toBe(3);
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v1.columns['c2']._entity === v1).toBe(true);
                expect(v1.columns['c3']._entity === v1).toBe(true);
                // V2
                expect(v2.columns['c2']._entity === v1).toBe(true);
                expect(v2.columns['c3']._entity === v1).toBe(true);
                // V3
                expect(v3.columns['c3']._entity === v1).toBe(true);
            });
            it("- 커버리지 : 참조가 없는 메타셋 ", () => {
                const set1 = new MetaSet('S1')
                const set2 = new MetaSet('S2')
                const obj2 = set2.getObject()
                set1.readSchema(obj2)
                // expect(()=> ).toThrow(/ES021/)
            });
            it("- 커버리지 : views, tables 한쪽만 존재 ", () => {
                const set1 = new MetaSet('S1')
                const obj1 = {
                    tables: {}
                }
                const obj2 = {
                    views: {}
                }
                set1.readSchema(obj1)
                set1.readSchema(obj2)
            });
            it("- 예외 : 스키마가 아닌 객체 ", () => {
                const set1 = new MetaSet('S1')
                expect(()=> set1.readSchema({})).toThrow(/ES021/)
                expect(()=> set1.readSchema(null)).toThrow(/ES021/)
            });
            it("- 예외 : 기존에 중복 테이블/뷰가 존재할 경우 ", () => {
                // TODO:
            });
        });
        describe("MetaSet.readData() <데이터 가져오기>", () => {
            it("- readData() : 기본 로딩", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                
                // schema
                set1.readSchema(json1);
                expect(set1.tables['T1']).toBeDefined();
                expect(set1.tables['T1'].columns.count).toBe(2);
                expect(set1.tables['T1'].columns['i1'].caption).toBe('C1');
                expect(set1.tables['T1'].columns['i2'].caption).toBe('C2');
                expect(set1.views['V1']).toBeDefined();
                expect(set1.views['V1'].columns.count).toBe(1);
                expect(set1.views['V1'].columns['i1'].caption).toBe('C1');
                expect(set1.tables['T1'].rows.count).toBe(0);
                expect(set1.views['V1'].rows.count).toBe(0);
                // data
                set1.readData(json1);
                expect(set1.tables['T1'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set1.tables['T1'].rows[0]['i2']).toBe('R2');
                expect(set1.tables['T1'].rows[0]['i1']).toBe('R1');
                expect(set1.views['V1'].rows.count).toBe(1);
            });
            it("- 예외 : 스키마가 아닌 객체 ", () => {
                const set1 = new MetaSet('S1')
                // expect(()=> set1.readData({})).toThrow(/ES021/)
                expect(()=> set1.readData(null)).toThrow(/ES021/)
                expect(()=> set1.readData({})).toThrow(/ES021/)
            });
            it("- 예외 : 객체가 아닌 스키마 ", () => {
                const set1 = new MetaSet('S1')
                const obj1 = {
                    tables: 1,
                    views: null
                }
                expect(()=> set1.readData(obj1)).toThrow(/ES021/)
            });
            it("- 커버리지 : views, tables 한쪽만 존재 ", () => {
                const set1 = new MetaSet('S1')
                const obj1 = {
                    tables: {}
                }
                const obj2 = {
                    views: {}
                }
                set1.readData(obj1)
                set1.readData(obj2)
            });
            it("- 테이블이 존재하지 않을 때", () => {
                // TODO:
            });
        });
        describe("MetaSet.write() <내보내기>", () => {
            it("- write() : 스키마/데이터 내보내기 ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                const obj = set1.write();
                const json2 = { 
                    name: 'S1',
                    tables: {
                        $key: ['T1'],
                        T1: {
                            _guid: set1.tables.T1._guid,
                            columns: {
                                $key: ['i1', 'i2'],
                                i1: { 
                                    _guid: set1.tables.T1.columns.i1._guid,
                                    caption: 'C1'
                                },
                                i2: { 
                                    _guid: set1.tables.T1.columns.i2._guid,
                                    caption: 'C2'
                                },
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        $key: ['V1'],
                        V1: {
                            _guid: set1.views.V1._guid,
                            columns: {
                                $key: ['i1'],
                                i1: { 
                                    _guid: set1.views.V1.columns.i1._guid,
                                    caption: 'C1'
                                },
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };

                expect(obj).toEqual(json2); 
            });
            it("- write() :  참조뷰 쓰기 후 읽기", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const s1 = new MetaSet('S1')
                s1.views.add(view1)
                s1.views.add(view2)
                s1.views.add(view3)
                const obj1 = s1.write(); // p_vOpt = 0
                const s2 = new MetaSet('S2')
                s2.read(obj1);
                const v1 = s2.views.V1
                const v2 = s2.views.V2
                const v3 = s2.views.V3

                expect(v1.columns.count).toBe(3)
                expect(v2.columns.count).toBe(2)
                expect(v3.columns.count).toBe(1)
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v2.columns['c2']._entity === v1).toBe(true);
                expect(v3.columns['c3']._entity === v1).toBe(true);
                expect(v1.rows.count).toBe(1);
                expect(v1.rows[0]['c1']).toBe('V1');
                expect(v1.rows[0]['c2']).toBe('V2');
                expect(v1.rows[0]['cc3']).toBe('V3');
                /**
                 * MEMO:
                 * - write() 로 생성한 스키마를 로딩시 구조가 그대로 가져오는지 확인
                 */
            });

            


        });
        describe("MetaSet.writeSchema() <스키마 내보내기>", () => {
            it("- writeSchema() : 스키마 내보내기 ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                set1.read(json1);
                const json2 = {
                    name: 'S1',
                    tables: {
                        $key: ['T1'],
                        T1: {
                            _guid: set1.tables.T1._guid,
                            // name: 'T1',
                            columns: {
                                $key: ['i1', 'i2'],
                                i1: { 
                                    _guid: set1.tables.T1.columns.i1._guid,
                                    caption: 'C1'
                                },
                                i2: { 
                                    _guid: set1.tables.T1.columns.i2._guid,
                                    caption: 'C2'
                                },
                            },
                            rows: []
                        },
                    },
                    views: {
                        $key: ['V1'],
                        V1: {
                            _guid: set1.views.V1._guid,
                            // name: 'V1',
                            columns: {
                                $key: ['i1'],
                                i1: { 
                                    _guid: set1.views.V1.columns.i1._guid,
                                    caption: 'C1'
                                },
                            },
                            rows: []
                        },
                    },
                }

                const obj = set1.writeSchema();

                expect(obj).toEqual(json2);
            });
            it("- 뷰 출력의 경우, 참조가 외부에 있는 경우, 복제 ", () => {
                // TODO: 스키마에서의 참조키 역활? 필용한가?
            });
        });
        describe("MetaSet.writeData() <데이터 내보내기>", () => {
            it("- writeData() : 내보내기 ", () => {
                var set1 = new MetaSet('S1');
                var json1 = { 
                    tables: {
                        T1: {
                            columns: {
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            columns: {
                                i1: { caption: 'C1'},
                            },
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                };
                const json2 = {
                    name: 'S1',
                    tables: {
                        $key: ['T1'],
                        T1: {
                            columns: {},
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        $key: ['V1'],
                        V1: {
                            columns: {},
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                }
                set1.read(json1);
                const obj = set1.writeData(2);

                expect(obj).toEqual(json2); 
            });
            it("- 커버리지 : opt 설정 ", () => {
                var set1 = new MetaSet('S1');
                const obj = set1.writeData();

                // expect(obj).toEqual(json2); 
            });
        });
        
        
        describe("MetaSet.acceptChanges() <커밋>", () => {
            it("- autoChanges : 전체 트랜젝션 모드 변경후 커밋", () => {
                var set1 = new MetaSet('S1');
                set1.tables.add('T1');
                set1.tables.add('T2');
                set1.tables['T1'].columns.add('c1');
                set1.tables['T2'].columns.add('cc1');
                var row1 = set1.tables['T1'].newRow();
                row1[0] = 'R1';
                var row2 = set1.tables['T2'].newRow();
                row2[0] = 'RR1';

                // 전체 트랜젝션 모드
                set1.autoChanges = false;
                expect(set1.tables['T1'].rows.hasChanges).toBe(false);
                expect(set1.tables['T2'].rows.hasChanges).toBe(false);
                // 변경후
                set1.tables['T1'].rows.add(row1);
                set1.tables['T2'].rows.add(row2);
                expect(set1.hasChanges()).toBe(true);
                // 커밋 후
                set1.acceptChanges();
                expect(set1.hasChanges()).toBe(false);
            });
        });
        describe("MetaSet.rejectChanges() <롤백>", () => {
            it("- add() -> remove() -> 롤백 ", () => {
                var set1 = new MetaSet('S1');
                set1.tables.add('T1');
                set1.tables.add('T2');
                set1.tables['T1'].columns.add('c1');
                set1.tables['T2'].columns.add('cc1');
                var row1 = set1.tables['T1'].newRow();
                row1[0] = 'R1';
                var row2 = set1.tables['T2'].newRow();
                row2[0] = 'RR1';

                // 전체 트랜젝션 모드
                set1.autoChanges = false;
                expect(set1.tables['T1'].rows.hasChanges).toBe(false);
                expect(set1.tables['T2'].rows.hasChanges).toBe(false);
                // add()
                set1.tables['T1'].rows.add(row1);
                set1.tables['T2'].rows.add(row2);
                expect(set1.tables['T1'].rows.count).toBe(1);
                expect(set1.tables['T2'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['c1']).toBe('R1');
                expect(set1.tables['T2'].rows[0]['cc1']).toBe('RR1');
                expect(set1.hasChanges()).toBe(true);
                // remove()
                set1.tables['T1'].rows.remove(row1);
                expect(set1.tables['T1'].rows.count).toBe(0);
                expect(set1.tables['T2'].rows.count).toBe(1);
                expect(set1.tables['T2'].rows[0]['cc1']).toBe('RR1');
                expect(set1.hasChanges()).toBe(true);
                // rejectChanges()
                set1.rejectChanges();
                expect(set1.hasChanges()).toBe(false);
            });
        });
        
        // REVIEW: 삭제 대기
        describe.skip("MetaSet.getChanges() <변경 내역 얻기>", () => {
            it("- add() -> remove() -> getChanages() ", () => {
                var set1 = new MetaSet('S1');
                set1.tables.add('T1');
                set1.tables.add('T2');
                set1.tables['T1'].columns.add('c1');
                set1.tables['T2'].columns.add('cc1');
                var row1 = set1.tables['T1'].newRow();
                row1[0] = 'R1';
                var row2 = set1.tables['T2'].newRow();
                row2[0] = 'RR1';
                var changes = [];

                // 전체 트랜젝션 모드
                set1.autoChanges = false;
                expect(set1.tables['T1'].rows.hasChanges).toBe(false);
                expect(set1.tables['T2'].rows.hasChanges).toBe(false);
                // add()
                set1.tables['T1'].rows.add(row1);
                set1.tables['T2'].rows.add(row2);
                expect(set1.tables['T1'].rows.count).toBe(1);
                expect(set1.tables['T2'].rows.count).toBe(1);
                expect(set1.tables['T1'].rows[0]['c1']).toBe('R1');
                expect(set1.tables['T2'].rows[0]['cc1']).toBe('RR1');
                expect(set1.hasChanges()).toBe(true);
                // remove()
                set1.tables['T1'].rows.remove(row1);
                expect(set1.tables['T1'].rows.count).toBe(0);
                expect(set1.tables['T2'].rows.count).toBe(1);
                expect(set1.tables['T2'].rows[0]['cc1']).toBe('RR1');
                expect(set1.hasChanges()).toBe(true);
                // getChanage()
                // var set1Changes = set1.getChanges();
            });
        });
        describe("MetaSet.hasChanges() <변경 유무>", () => {
            it("- 등록 후 검사, 삭제 후 검사 ", () => {
                var set1 = new MetaSet('S1');
                set1.tables.add('T1');
                var row1 = set1.tables['T1'].newRow();
                row1[0] = 'R1';

                // 전체 트랜젝션 모드
                set1.autoChanges = false;
                // 등록 후 검사
                set1.tables['T1'].rows.add(row1);
                expect(set1.hasChanges()).toBe(true);
                // 커밋 (초기화)
                set1.acceptChanges();
                expect(set1.hasChanges()).toBe(false);
                // 삭제 후 검사
                set1.tables['T1'].rows.remove(row1);
                expect(set1.hasChanges()).toBe(true);
                set1.acceptChanges();
                expect(set1.hasChanges()).toBe(false);
            });
        });
        describe("MetaSet.autoChanges <자동 변경 유무 설정>", () => {
            it("- 설정 전, 설정 후 ", () => {
                var set1 = new MetaSet('S1');
                set1.tables.add('T1');
                set1.tables.add('T2');

                // 설정전
                expect(set1.tables['T1'].rows.autoChanges).toBe(true);
                expect(set1.tables['T2'].rows.autoChanges).toBe(true);
                // 설정후
                set1.autoChanges = false;
                expect(set1.tables['T1'].rows.autoChanges).toBe(false);
                expect(set1.tables['T2'].rows.autoChanges).toBe(false);
                // 초기화
                set1.autoChanges = true;
                expect(set1.tables['T1'].rows.autoChanges).toBe(true);
                expect(set1.tables['T2'].rows.autoChanges).toBe(true);
            });
        });
        describe("예외 및 커버리지", () => {
            it("- MetaSet._metaSet : 예외 ", () => {
                var set1 = new MetaSet('S1');
                var table1 = new MetaTable('T1');
                table1._metaSet = set1;

                expect(table1._metaSet === set1).toBe(true)
                expect(()=> table1._metaSet = 'ERR').toThrow(/ES032/)
            });
            it.skip("- MetaSet._isSchema() ", () => {
                // class SubClass extends BaseEntity {
                //     constructor(name) {super(name)}
                // }
                // const s1 = new SubClass('S1');
    
                expect(MetaSet._isSchema('ERR')).toBe(false);
                expect(MetaSet._isSchema(null)).toBe(false);
                expect(MetaSet._isSchema({tables: {}})).toBe(true);
                expect(MetaSet._isSchema({views: {}})).toBe(true);
            });

        });
    });
    

    // REVIEW: 위치 테이블 쪽으로 이동하는게 적합할듯!
    

});


// describe("< MetaTableCollection >", () => {
//     beforeAll(() => {
//         // jest.resetModules();
//     });
// });

// describe("< MetaTable >", () => {
//     beforeAll(() => {
//         // jest.resetModules();
//     });
//     it("- 테이블 등록후 속성 검사 ", () => {
//     });
// });
