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
const {MetaEntity}                            = require('../src/meta-entity');
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
        // describe.skip("this.merge() <병합>", () => {
        //     it("- TODO: ", () => {
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
                const str = set1.output(stringify, '\t');
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
                const str = set1.output(stringify, '\t');
                // MetaRegistry.init();
                // const initCnt = MetaRegistry.count;
                // loadNamespace();    // init() 초기화하여 불러와야함
                // const load_ns_Cnt = MetaRegistry.ns.count;
                // 생성자를 통해 성성
                var set2 = new MetaSet('S2');
                set2.load(str, parse);

                expect(beginCnt).toBe(18);
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
                const str = set1.output(stringify, '\t');
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
                const str = set1.output(stringify, '\t');
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
                expect(set1 !== set2).toBe(true);
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
                const json2 = { 
                    setName: 'S1',
                    tables: {
                        _key: ['T1'],
                        T1: {
                            columns: {
                                _key: ['i1', 'i2'],
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        _key: ['V1'],
                        V1: {
                            columns: {
                                _key: ['i1'],
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
                const str = set1.output(stringify, '\t');
                // MetaRegistry.init();
                // const initCnt = MetaRegistry.count;
                // loadNamespace();
                // const load_ns_Cnt = MetaRegistry.ns.count;
                // 등록소를 통해서 생성
                const set2 = MetaRegistry.createMetaObject({_type: 'MetaSet', _ns: 'Meta.Entity', name: 'S2'});
                set2.load(str, parse);
                const json3 = set2.write();

                expect(json3).toEqual(json2);
                // expect(beginCnt).toBe(18);
                // expect(initCnt).toBe(0);
                // expect(load_ns_Cnt).toBe(38);
            });
        });
        describe("MetaSet.read(json, opt) <가져오기>", () => {
            it("- read(obj) object 가져오기 ", () => {
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
            it("- read(rObj) object 가져오기 ", () => {
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
            it("- 테이블이 존재하지 않을 때", () => {
                // TODO:
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
                const json2 = {
                    setName: 'S1',
                    tables: {
                        _key: ['T1'],
                        T1: {
                            columns: {
                                _key: ['i1', 'i2'],
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: []
                        },
                    },
                    views: {
                        _key: ['V1'],
                        V1: {
                            columns: {
                                _key: ['i1'],
                                i1: { caption: 'C1'},
                            },
                            rows: []
                        },
                    },
                }
                set1.read(json1);
                const obj = set1.writeSchema();

                expect(obj).toEqual(json2);
            });
            it("- 뷰 출력의 경우, 참조가 외부에 있는 경우, 복제 ", () => {
                // TODO:
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
                    setName: 'S1',
                    tables: {
                        T1: {
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        V1: {
                            rows: [
                                { i1: 'R1' },
                            ]
                        },
                    },
                }
                set1.read(json1);
                const obj = set1.writeData();

                expect(obj).toEqual(json2); 
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
                const json2 = { 
                    setName: 'S1',
                    tables: {
                        _key: ['T1'],
                        T1: {
                            columns: {
                                _key: ['i1', 'i2'],
                                i1: { caption: 'C1'},
                                i2: { caption: 'C2'},
                            },
                            rows: [
                                { i1: 'R1', i2: 'R2' },
                            ]
                        },
                    },
                    views: {
                        _key: ['V1'],
                        V1: {
                            columns: {
                                _key: ['i1'],
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

                expect(obj).toEqual(json2); 
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
                expect(set1.tables['T1'].rows.isChanges).toBe(false);
                expect(set1.tables['T2'].rows.isChanges).toBe(false);
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
                expect(set1.tables['T1'].rows.isChanges).toBe(false);
                expect(set1.tables['T2'].rows.isChanges).toBe(false);
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
                expect(set1.tables['T1'].rows.isChanges).toBe(false);
                expect(set1.tables['T2'].rows.isChanges).toBe(false);
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
    });
    

    // REVIEW: 위치 테이블 쪽으로 이동하는게 적합할듯!
    describe("MetaTableCollection :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("MetaTableCollection.add() <테이블 추가>", () => {
            it("- tables.add() ", () => {
                const set1 = new MetaSet('S1');
                const table1 = new MetaTable('T1');
                set1.tables.add(table1);
                
                expect(set1.tables.count).toBe(1);
            });
        });
    });
    describe("MetaVieweCollection :: 클래스", () => {
        describe("MetaTableCollection.add() <뷰 추가>", () => {
            it("- add() ", () => {
                const set1 = new MetaSet('S1');
                const veiw1 = new MetaView('V1');
                set1.views.add(veiw1);
                
                expect(set1.views.count).toBe(1);
            });
        });
    });

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
