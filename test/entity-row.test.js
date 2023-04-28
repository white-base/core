/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const Entity                = require('../src/entity-base');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const Util                  = require('../src/util');
const { EntityTable }       = require('../src/entity-table');
const { EntityView }        = require('../src/entity-view');
const { Row }               = require('../src/entity-row');
const { Item }              = require('../src/entity-item');

//==============================================================
// test
describe("< Row >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- new Row(entity) : 생성 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.addValue('i1', 'V1');
        table1.items.addValue('i2', 'V2');
        var row1 = new Row();
        var row2 = new Row(table1);
        table1.rows.add(row1);
        table1.rows.add(row2);
        
        expect(row1.count).toBe(0);
        expect(row2.count).toBe(2);
        expect(table1.rows[0].count).toBe(0);
        expect(table1.rows[1].count).toBe(2);
    });
    // TODO: 필요성 확인 검토
    // it("- copy() : 복사 ", () => {
    //     var table1 = new EntityTable('T1');
    //     table1.items.addValue('i1', 'V1');
    //     table1.items.addValue('i2', 'V2');
    //     var row1 = new Row(table1);
    //     row1['i1'] = 'R1';
    //     row1['i2'] = 'R2';
    //     table1.rows.add(row1);
    //     var row2 = table1.rows[0].copy();
        
    //     // table1
    //     expect(row1.count).toBe(2);
    //     expect(table1.rows[0].count).toBe(2);
    //     expect(table1.rows[0]['i1']).toBe('R1');
    //     expect(table1.rows[0]['i2']).toBe('R2');
    //     // copy row
    //     expect(row2.count).toBe(2);
    //     expect(row2['i1']).toBe('R1');
    //     expect(row2['i2']).toBe('R2');
    //     // 비교
    //     expect(table1.rows[0]).not.toEqual(row2);

    // });
});
describe("< RowCollection >", () => {
    it("- add() : 빈 row 등록 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.addValue('i1', 'V1');
        table1.items.addValue('i2', 'V2');
        table1.rows.add();
        
        expect(table1.rows[0].count).toBe(2);
        expect(table1.rows[0]['i1']).toBe(null);  // REVIEW: '' 인데 null 리턴함
        expect(table1.rows[0]['i2']).toBe(null);
        expect(table1.rows[0]['i3']).toBe(undefined);
    });
    it("- add(row) : row 등록 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.addValue('i1', 'V1');
        table1.items.addValue('i2', 'V2');
        var row = new Row(table1);
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        
        expect(table1.rows[0].count).toBe(2);
        expect(table1.rows[0]['i1']).toBe('R1');
        expect(table1.rows[0]['i2']).toBe('R2');
        expect(table1.rows[0]['i3']).toBe(undefined);
    });
});
// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

