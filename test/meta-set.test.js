/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const MetaEntity                            = require('../src/meta-entity');
const { MetaTable, MetaTableCollection }    = require('../src/meta-table');
const { MetaView, MetaViewCollection }      = require('../src/meta-view');
const { MetaRow }           = require('../src/meta-row');
const { MetaColumn }        = require('../src/meta-column');
const  MeatSet              = require('../src/meta-set');

//==============================================================
// test
describe("< MetaSet >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- tables.add() ", () => {
        const set1 = new MeatSet('S1');
        const table1 = new MetaTable('T1');
        set1.tables.add(table1);
        
        expect(set1.tables.count).toBe(1);
    });
    it("- views.add() ", () => {
        const set1 = new MeatSet('S1');
        const veiw1 = new MetaView('V1');
        set1.views.add(veiw1);
        
        expect(set1.views.count).toBe(1);
    });
    it("- clear() : rows 초기화 ", () => {
        const set1 = new MeatSet('S1');
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
    it("- reset() : rows, columns 초기화 ", () => {
        const set1 = new MeatSet('S1');
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
