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

//==============================================================
// test
describe("[target: meta-set.js]", () => {
    describe("MetaSet :: 클래스", () => {
        describe("this.clear() <rows 초기화>", () => {
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
        describe("this.reset() <rows, columns 초기화>", () => {
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
        describe("this.clone() <복제>", () => {
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
        describe("this.read(json, opt) <가져오기>", () => {
            it("- JSON 가져오기 ", () => {
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
        });
        describe.skip("this.write() <내보내기>", () => {
            it("- TODO: ", () => {
            });
        });
        describe("this.readSchema() <스키마 가져오기>", () => {
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
        describe.skip("this.writeSchema() <스키마 내보내기>", () => {
            it("- TODO: ", () => {
            });
            it("- 뷰 출력의 경우, 참조가 외부에 있는 경우, 복제 ", () => {
                // TODO:
            });
        });
        describe("this.readData() <데이터 가져오기>", () => {
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
                set1.readSchema(json1);
                set1.readData(json1);

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
            it("- 테이블이 존재하지 않을 때", () => {
                // TODO:
            });
        });
        describe.skip("this.acceptChanges() <커밋>", () => {
            it("- TODO: ", () => {
            });
        });
        describe.skip("this.rejectChanges() <롤백>", () => {
            it("- TODO: ", () => {
            });
        });
        describe.skip("this.getChanges() <변경 내역 얻기>", () => {
            it("- TODO: ", () => {
            });
        });
        describe.skip("this.hasChanges() <변경 유무>", () => {
            it("- TODO: ", () => {
            });
        });

    });
    
    describe("MetaTableCollection :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("this.add() <테이블 추가>", () => {
            it("- tables.add() ", () => {
                const set1 = new MetaSet('S1');
                const table1 = new MetaTable('T1');
                set1.tables.add(table1);
                
                expect(set1.tables.count).toBe(1);
            });
        });
    });
    describe("MetaTableCollection :: 클래스", () => {
        describe("this.add() <뷰 추가>", () => {
            it("- views.add() ", () => {
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
