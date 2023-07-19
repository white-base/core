/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
const {MetaEntity}                = require('../src/meta-entity');
const {IObject}               = require('../src/i-object');
const {IMarshal}              = require('../src/i-marshal');
const Util                  = require('../src/util');
const { MetaTable }       = require('../src/meta-table');
const { MetaView }        = require('../src/meta-view');
const { MetaRow }               = require('../src/meta-row');
const { MetaColumn }              = require('../src/meta-column');

//==============================================================
// test
describe("[target: meta-row.js]", () => {
    describe("MetaRow :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("Row(entity) <생성자>", () => {
            it("- new Row(entity) : 생성 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                // var row1 = new MetaRow();
                var row2 = new MetaRow(table1);
                // table1.rows.add(row1);
                table1.rows.add(row2);
                
                // expect(row1.count).toBe(0);
                expect(row2.count).toBe(2);
                expect(table1.rows[0].count).toBe(2);
                // expect(table1.rows[1].count).toBe(2);
                // expect(row2['i1']).toBe(null);
                // expect(row2['i2']).toBe(null);
                expect(row2[0]).toBeDefined();
                expect(row2[1]).toBeDefined();
                expect(row2['i1']).toBeDefined();
                expect(row2['i2']).toBeDefined();
            });
            it("- new Row() : 예외(빈 엔티티) ", () => {
                expect(() => new MetaRow()).toThrow('p_entity');
            });
            it("- new Row() : 예외(빈 엔티티) ", () => {
                expect(() => new MetaRow({})).toThrow('p_entity');
            });
        });
        describe("this.clone(): Row <복제>", () => {
            it("- clone() : 복사 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                var row1 = new MetaRow(table1);
                row1['i1'] = 'R1';
                row1['i2'] = 'R2';
                table1.rows.add(row1);
                var row2 = row1.clone();
                table1.rows.add(row2);
                // table1
                expect(row1.count).toBe(2);
                expect(table1.rows[0].count).toBe(2);
                expect(table1.rows[0]['i1']).toBe('R1');
                expect(table1.rows[0]['i2']).toBe('R2');
                // clone row
                expect(row2.count).toBe(2);
                expect(row2['i1']).toBe('R1');
                expect(row2['i2']).toBe('R2');
                // 비교
                expect(table1.rows[0]).toEqual(table1.rows[1]);
        
            });
        });
    });
    describe("MetaRowCollection :: 클래스", () => {
        // it.skip("- add() : 빈 row 등록 ", () => {
        //     var table1 = new MetaTable('T1');
        //     table1.columns.addValue('i1', 'V1');
        //     table1.columns.addValue('i2', 'V2');
        //     table1.rows.add();
            
        //     expect(table1.rows[0].count).toBe(2);
        //     expect(table1.rows[0]['i1']).toBe(null);  // REVIEW: '' 인데 null 리턴함
        //     expect(table1.rows[0]['i2']).toBe(null);
        //     expect(table1.rows[0]['i3']).toBe(undefined);
        // });
        describe("this.add(row): bool <row 등록>", () => {
            it("- add(row) : row 등록 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                table1.rows.add(row);
                
                expect(table1.rows[0].count).toBe(2);
                expect(table1.rows[0]['i1']).toBe('R1');
                expect(table1.rows[0]['i2']).toBe('R2');
                expect(table1.rows[0]['i3']).toBe(undefined);
            });
            it("- add(row, true) : 유효성 검사 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', '');
                table1.columns.addValue('i2', '');
                table1.columns['i1'].isNotNull = true;
                table1.columns['i2'].setConstraint(/\d/, '숫자', 'E1', true);
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                row['i2'] = 10;
                table1.rows.add(row, true);
                var row2 = new MetaRow(table1);
                row2['i1'] = 'R1';
                row2['i2'] = 'ERR';
                var row3 = new MetaRow(table1);
                row3['i1'] = '';
                row3['i2'] = 10;
        
                expect(table1.rows[0]['i1']).toBe('R1');
                expect(table1.rows[0]['i2']).toBe(10);
                expect(() => table1.rows.add(row2, true)).toThrow('숫자');
                expect(() => table1.rows.add(row3, true)).toThrow('p_row');
            });
            /**
             * TODO: 많은 조건이 있음
             */
            it("- add(row) : 예외(다른 엔티티) ", () => {
                var table1 = new MetaTable('T1');
            
                expect(() => table1.rows.add('ERR')).toThrow('MetaRow');
            });
            it("- add(row) : 예외(다른 객체) ", () => {
                var table1 = new MetaTable('T1');
                var table2 = new MetaTable('T2');
                table1.columns.addValue('i1', 'V1');
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                table1.rows.add(row);
            
                expect(() => table2.rows.add(row)).toThrow('entity');        
            });
        });

    
    });
});

// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

