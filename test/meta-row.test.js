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
        describe("MetaRow(entity) <생성자>", () => {
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
                expect(() => new MetaRow()).toThrow('ES032');
            });
            it("- new Row() : 예외(빈 엔티티) ", () => {
                expect(() => new MetaRow({})).toThrow('ES032');
            });
        });
        describe("MetaObject.equal() <객체 비교>", () => {
            it.only("- equal() : __event ", () => {
                var table1 = new MetaTable('T1');
                var table2 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table2.columns.addValue('i1', 'V1');
                var row1 = new MetaRow(table1);
                var row2 = new MetaRow(table2);
                var fun1 = function(){return 'Fun1'};

                expect(row1.equal(row2)).toBe(true);
                row2.onChanged = fun1;
                expect(row1.equal(row2)).toBe(false);
            });
            it("- equal() : 하나의 _entity 로 비교 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                var row1 = new MetaRow(table1);
                var row2 = new MetaRow(table1);
                
                expect(row1.equal(row2)).toBe(true);
            });
            it("- equal() : 다른 _entity 비교, 값 삽입 ", () => {
                var table1 = new MetaTable('T1');
                var table2 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table2.columns.addValue('i1', 'V1');
                var row1 = new MetaRow(table1);
                var row2 = new MetaRow(table2);
                
                expect(row1.equal(row2)).toBe(true);
                row2['i1'] = 'R1';
                expect(row1.equal(row2)).toBe(false);
            });
            it("- equal() : _elements, _keys 비교 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                var row1 = new MetaRow(table1);
                table1.columns.addValue('i2', 'V2');
                var row2 = new MetaRow(table1);
                
                expect(row1.equal(row2)).toBe(false);
            });            
        });
        // TODO: getObject()
        // TODO: setObject()
        describe("MetaRow.clone(): Row <복제>", () => {
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
                // 비교 : 
                // REVIEW: new 일반 new 생성으로 guid 의 차이점가 있음
                // table1.rows[0].setObject({_guid: 'ID'});
                // table1.rows[1].setObject({_guid: 'ID'});
                // const row0 = table1.rows[0].getObject(p_vOpt);
                // const row1 = table1.rows[1].getObject(p_vOpt);
                // table1.rows[0].__SET_guid('ID', table1.rows[0]);
                // table1.rows[1].__SET_guid('ID', table1.rows[1]);
                
                // expect(row0).toEqual(row1);
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
                table1.columns['i2'].addConstraint(/\d/, '숫자', 'E1', true);
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                row['i2'] = 10;
                table1.rows.add(row, true); // 검사활성화 옵션
                var row2 = new MetaRow(table1);
                row2['i1'] = 'R1';
                row2['i2'] = 'ERR';
                var row3 = new MetaRow(table1);
                row3['i1'] = '';
                row3['i2'] = 10;
        
                expect(table1.rows[0]['i1']).toBe('R1');
                expect(table1.rows[0]['i2']).toBe(10);
                expect(() => table1.rows.add(row2, true)).toThrow(/ES054/);
                expect(() => table1.rows.add(row3, true)).toThrow('ES054');
            });
            /**
             * TODO: 많은 조건이 있음
             */
            it("- add(row) : 예외(다른 엔티티) ", () => {
                var table1 = new MetaTable('T1');
            
                expect(() => table1.rows.add('ERR')).toThrow('ES032');
            });
            it("- add(row) : 예외(다른 객체) ", () => {
                var table1 = new MetaTable('T1');
                var table2 = new MetaTable('T2');
                table1.columns.addValue('i1', 'V1');
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                table1.rows.add(row);
            
                expect(() => table2.rows.add(row)).toThrow('ES034');        
            });
        });

        describe("this.commit() <커밋>", () => {
            it("- isChanges : 변경 유무", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                // 초기
                expect(table1.rows.isChanges).toBe(false);
                // 변경후
                var row = table1.newRow();
                row[0] = 'R1';
                table1.rows.add(row);
                expect(table1.rows.isChanges).toBe(true);
                // 커밋 후
                table1.rows.commit();
                expect(table1.rows.isChanges).toBe(false);
            });
        });
    
        describe("this.rollback() <롤백>", () => {
            it("- add() : 추가 후 롤백", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                // 초기                
                var row = table1.newRow();
                row[0] = 'R1';
                table1.rows.add(row);
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                // 롤백 후
                table1.rows.rollback();
                expect(table1.rows.count).toBe(0);
            });
            it("- remove() : 추가 커밋 -> 삭제 -> 롤백", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
                
                // 추가 커밋 
                var row = table1.newRow();
                row[0] = 'R1';
                table1.rows.add(row);
                table1.rows.commit();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                // 삭제
                table1.rows.remove(row);
                expect(table1.rows.count).toBe(0);
                // 롤백
                table1.rows.rollback();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
            });
            it("- add(), remove() : 추가 커밋 -> 삭제 -> 커밋 -> 추가 -> 롤백 ", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1')
                
                // 추가 커밋 
                var row = table1.newRow();
                row[0] = 'R1';
                table1.rows.add(row);
                table1.rows.commit();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                // 삭제 
                table1.rows.remove(row);
                expect(table1.rows.count).toBe(0);
                // 커밋
                table1.rows.commit();
                expect(table1.rows.count).toBe(0);
                // 추가
                var row = table1.newRow();
                row[0] = 'R2';
                table1.rows.add(row);
                var row = table1.newRow();
                row[0] = 'R3';
                table1.rows.add(row);
                expect(table1.rows.count).toBe(2);
                expect(table1.rows[0][0]).toBe('R2');
                expect(table1.rows[1][0]).toBe('R3');
                // 롤백
                table1.rows.rollback();
                expect(table1.rows.count).toBe(0);
            });
            it("- add(), insertAt() remove() : 중복 추가 삭제시 ", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1')
                
                // 추가 커밋 
                var row1 = table1.newRow();
                row1[0] = 'R1';
                table1.rows.add(row1);
                table1.rows.commit();
                expect(table1.rows.count).toBe(1);
                // 삭제 및 추가 삭제
                table1.rows.remove(row1);
                var row2 = table1.newRow();
                row2[0] = 'R2';
                table1.rows.add(row2);
                var row3 = table1.newRow();
                row3[0] = 'R3';
                table1.rows.add(row3);
                table1.rows.insertAt(0, row1);
                expect(table1.rows.count).toBe(3);
                expect(table1.rows[0][0]).toBe('R1');
                expect(table1.rows[1][0]).toBe('R2');
                expect(table1.rows[2][0]).toBe('R3');
                // 롤백
                table1.rows.rollback();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
            });
            it("- rows 수정 후 롤백 (단일)", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                var row = table1.newRow();
                row[0] = 'R1';
                
                // 추가 및 커밋                
                table1.rows.add(row);
                table1.rows.commit();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
    
                // 변경
                table1.rows[0][0] = 'RR1';
                expect(table1.rows[0][0]).toBe('RR1');
    
                // 롤백 후
                table1.rows.rollback();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
            });
            it("- rows 수정 후 롤백 (단일)", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                var row = table1.newRow();
                row[0] = 'R1';
                
                // 추가 및 커밋                
                table1.rows.add(row);
                table1.rows.commit();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
    
                // 변경
                table1.rows[0][0] = 'RR1';
                expect(table1.rows[0][0]).toBe('RR1');
                var etc = table1.rows._transQueue.queue[0].etc;

                // 롤백 후
                table1.rows.rollback();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                expect(etc).toMatch(/idx:0.*new:RR1.*old:R1/);  // etc 로그 확인
            });
            it("- rows[0] = row : row 설정 롤백", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
    
                // 추가 및 커밋                
                table1.rows.add(row1);
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                expect(table1.rows[0]['i1']).toBe('R1');
                table1.rows.commit();
    
                // 변경
                table1.rows[0] = row2;
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R2');
                expect(table1.rows[0]['i1']).toBe('R2');
    
                // 롤백 후
                table1.rows.rollback();
                expect(table1.rows.count).toBe(1);
                expect(table1.rows[0][0]).toBe('R1');
                expect(table1.rows[0]['i1']).toBe('R1');
            });
    
        });
    

        describe("this[0] = row <컬렉션 설정>", () => {
            it("- rows[0] = row : row 설정 ", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
                var table2 = new MetaTable('T2');
                table2.rows.autoChanges = false;
                table2.columns.add('ii1');
                
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
                var row3 = table2.newRow();
                row3[0] = 'R3';
    
                table1.rows.add(row1);
                expect(table1.rows[0][0]).toBe('R1');
                table1.rows[0] = row2;
                expect(table1.rows[0][0]).toBe('R2');
                expect(() => table1.rows[0] = row3).toThrow(/ES032/);
            });
        });
    
        describe("this.insertAt(pos, row, chkValid): bool <지정 위치에 삽입> ", () => {
            it("- insertAt(idx, value) : 첫째 요소 추가", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row0 = table1.newRow();
                row0[0] = 'R0';
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
    
                table1.rows.add(row1);
                table1.rows.add(row2);
                table1.rows.insertAt(0, row0);
    
                expect(table1.rows[0]).toBeDefined();
                expect(table1.rows[1]).toBeDefined();
                expect(table1.rows[2]).toBeDefined();
                expect(table1.rows.indexOf(row0)).toBe(0);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row1)).toBe(1);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row2)).toBe(2);  // 바뀐 idx 확인
                expect(table1.rows.count).toBe(3);
                expect(table1.rows.list.length).toBe(3);
            });
            it("- insertAt(idx, value) : 중간 요소 추가", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row0 = table1.newRow();
                row0[0] = 'R0';
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
    
                table1.rows.add(row0);
                table1.rows.add(row2);
                table1.rows.insertAt(1, row1);
    
                expect(table1.rows[0]).toBeDefined();
                expect(table1.rows[1]).toBeDefined();
                expect(table1.rows[2]).toBeDefined();
                expect(table1.rows.indexOf(row0)).toBe(0);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row1)).toBe(1);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row2)).toBe(2);  // 바뀐 idx 확인
                expect(table1.rows.count).toBe(3);
                expect(table1.rows.list.length).toBe(3);
            });
            it("- insertAt(idx, value) : 마지막 요소 추가 후 add()", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row0 = table1.newRow();
                row0[0] = 'R0';
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
                var row3 = table1.newRow();
                row3[0] = 'R3';
    
                table1.rows.add(row0);
                table1.rows.add(row1);
                table1.rows.insertAt(2, row2);
                table1.rows.add(row3);
    
                expect(table1.rows[0]).toBeDefined();
                expect(table1.rows[1]).toBeDefined();
                expect(table1.rows[2]).toBeDefined();
                expect(table1.rows[3]).toBeDefined();
                expect(table1.rows.indexOf(row0)).toBe(0);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row1)).toBe(1);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row2)).toBe(2);  // 바뀐 idx 확인
                expect(table1.rows.indexOf(row3)).toBe(3);  // 바뀐 idx 확인
                expect(table1.rows.count).toBe(4);
                expect(table1.rows.list.length).toBe(4);
            });
            it("- insertAt(pos) : 예외 : 사이즈 초과", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row0 = table1.newRow();
                row0[0] = 'R0';
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
    
                table1.rows.add(row0);
                table1.rows.add(row1);
    
                expect(()=> table1.rows.insertAt(3, row2)).toThrow(/ES061/);
            });
            it("- insertAt(pos) : 예외 : 0 보다 작을 경우", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row0 = table1.newRow();
                row0[0] = 'R0';
                var row1 = table1.newRow();
                row1[0] = 'R1';
                var row2 = table1.newRow();
                row2[0] = 'R2';
    
                table1.rows.add(row0);
                table1.rows.add(row1);
    
                expect(()=> table1.rows.insertAt(-1, row2)).toThrow(/ES062/);
            });
        });
    });

    
});

// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

