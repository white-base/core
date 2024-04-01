/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
// const {MetaObject}            = require('../src/meta-object');
// const {MetaElement}           = require('../src/meta-element');
// const {BaseEntity}                = require('../src/base-entity');
// const {IObject}               = require('../src/i-object');
// const {IMarshal}              = require('../src/i-marshal');
// const Util                  = require('../src/util');
// const { MetaTable }       = require('../src/meta-table');
// const { MetaView }        = require('../src/meta-view');
// const { MetaRow }               = require('../src/meta-row');
// const { MetaColumn }              = require('../src/meta-column');
// const { ObjectColumn }              = require('../src/object-column');
// const { BaseColumn } = require('../src/base-column');

//==============================================================
// test
describe.skip("[target: meta-row.js]", () => {
    describe("MetaRow :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("MetaRow._entity <엔티티>", () => {
            it.skip("- this._entity ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                var row1 = new MetaRow(table1);
                
                expect(()=> row1._entity = {}).toThrow(/ES032/) 
                expect(()=> row1._entity = table1).toThrow(/ES045/) // count 존재
            });
        });
        describe("MetaRow.onChanging <변경 이벤트>", () => {
            it("- this.onChanging ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                var row1 = new MetaRow(table1);
                var count = 0
                const fun1 = function() { count++}
                row1.onChanging = fun1;
                row1.onChanged = fun1;
                row1['i1'] = 'R1';
                row1['i2'] = 'R2';
                expect(row1['i1']).toBe('R1')
                expect(row1['i2']).toBe('R2')
                expect(count).toBe(4)
            });
        });
        describe("MetaRow(entity) <생성자>", () => {
            it("- new MetaRow(entity) : 생성 ", () => {
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
            it("- BaseColumn._valueTypes = [] 로우 생성 : 제한없음  ", () => {
                class SubColumn extends BaseColumn {
                    constructor(name, entity) { super(name, entity) }
                    clone(p_entity) {
                        var clone = new SubColumn(this.columnName);
                        var rObj = this.getObject();
                        clone.columnName = rObj.columnName;
                        clone._entity = p_entity ? p_entity : this._entity;
                        if (rObj.default) clone.default = rObj.default;
                        if (rObj.caption) clone.caption = rObj.caption;
                        if (rObj.alias) clone.alias = rObj.alias;
                        if (rObj.value) clone.value = rObj.value;
                        return clone;
                    }
                }
                var table1 = new MetaTable('T1');
                table1.columns._baseType = SubColumn;
                table1.columns.addValue('c1', 'V1');
                table1.columns.addValue('c2', 'V2');
                table1.rows.add(table1.getValue());
                table1.rows[0]['c1'] = 1
                table1.rows[0]['c2'] = {}
                table1.rows[0]['c1'] = true
                table1.rows[0]['c2'] = /reg/

                expect(table1.columns['c1']._type.name).toBe('SubColumn')
                expect(table1.columns['c2']._type.name).toBe('SubColumn')
                expect(table1.columns['c1']._entity === table1).toBe(true)
                expect(table1.columns['c2']._entity === table1).toBe(true)
            });
            it("- new MetaRow() : 예외(빈 엔티티) ", () => {
                expect(() => new MetaRow()).toThrow('EL05211');
            });
        });
        describe("MetaObject.equal() <객체 비교>", () => {
            it("- equal() : __event ", () => {
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
        describe("MetaRow.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 직렬화 객체 얻기 ", () => {
                const a1 = new MetaTable('T1');
                a1.columns.add('a1');
                a1.columns.add('a2');
                var row = a1.newRow();
                row['a1'] = 'R1';
                row['a2'] = 'R2';
                a1.rows.add(row);
                const obj = a1.rows[0].getObject();

                expect(obj._guid).toBe(a1.rows[0]._guid);
                expect(obj._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj._elem).toEqual(['R1','R2']);
                expect(obj._key).toEqual(['a1','a2']);
                expect(obj._entity.$ref).toBe(a1._guid);
                /**
                 * MEMO: 기본값 확인
                 */
            });
            it("- getObject(1) : 직렬화 객체 얻기 (소유구조) ", () => {
                const a1 = new MetaTable('T1');
                a1.columns.add('a1');
                a1.columns.add('a2');
                var row = a1.newRow();
                row['a1'] = 'R1';
                row['a2'] = 'R2';
                a1.rows.add(row);
                const obj = a1.rows[0].getObject(1);

                expect(obj._guid).toBe(a1.rows[0]._guid);
                expect(obj._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj._elem).toEqual(['R1','R2']);
                expect(obj._key).toEqual(['a1','a2']);
                expect(obj._entity.$ref).toBe(a1._guid);
                /**
                 * MEMO: 기본값 확인, opt = 0 과 동일한 결과
                 */
            });
            it("- getObject(2) : 직렬화 객체 얻기 (참조없음) ", () => {
                const a1 = new MetaTable('T1');
                a1.columns.add('a1');
                a1.columns.add('a2');
                var row = a1.newRow();
                row['a1'] = 'R1';
                row['a2'] = 'R2';
                a1.rows.add(row);
                const obj = a1.rows[0].getObject(2);

                expect(obj._guid).toBe(undefined);
                expect(obj._type === 'Meta.Entity.MetaRow').toBe(true);
                expect(obj._elem).toEqual(['R1','R2']);
                expect(obj._key).toEqual(['a1','a2']);
                expect(obj._entity).toBe(undefined);
                /**
                 * MEMO: 참조 없는 자료 리턴 확인
                 */
            });
            it("- getObject() : Element 객체 ", () => {
                const a1 = new MetaTable('T1');
                a1.columns._baseType = ObjectColumn;
                a1.columns.add('a1');
                a1.columns.add('a2');
                var row = a1.newRow();
                var e1 = new MetaElement('E1')
                row['a1'] = e1;
                row['a2'] = e1;
                a1.rows.add(row);
                const obj = a1.rows[0].getObject();

                expect(obj._guid).toBe(a1.rows[0]._guid);
                expect(obj._elem[0]._guid).toBe(e1._guid)
                expect(obj._elem[1].$ref).toBe(e1._guid)
                expect(obj._elem[0]).toEqual(e1.getObject());
                expect(obj._elem[1]).toEqual({$ref: e1._guid});
                expect(obj._key).toEqual(['a1','a2']);
                expect(obj._entity.$ref).toBe(a1._guid);
                /**
                 * MEMO: 메타객체와 참조 객체 얻기 확인
                 */
            });
            it("- 컬럼 value 에 값을 삽입한 경우 ", () => {
                var e1 = new MetaElement('E1')
                const a1 = new MetaTable('T1');
                a1.columns._baseType = ObjectColumn;
                a1.columns.addValue('a1', e1);
                a1.columns.addValue('a2', e1);
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject()
                const obj2 = a1.getObject()
                
                expect(obj1._elem[0]).toEqual(e1.getObject());
                expect(obj1._elem[1]).toEqual({$ref: e1._guid});
                expect(obj2.rows._elem[0]._elem[0]).toEqual({$ref: e1._guid});
                expect(obj2.rows._elem[0]._elem[1]).toEqual({$ref: e1._guid});
                /**
                 * MEMO:
                 * - obj1 은 자신을 기준으로 가져오므로 guid, ref 존재 확인
                 * - obj2 은 엔티티를 기준으로 가져오므로 ref 만 존재 확인
                 */

            });
            it("- 커버리지 : getObject() ", () => {
                var e1 = new MetaElement('E1')
                const a1 = new MetaTable('T1');
                a1.columns._baseType = ObjectColumn;
                a1.columns.addValue('a1', e1);
                a1.columns.addValue('a2', e1);
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject(0, {})    // 커버리지
                const obj2 = a1.getObject()
                
                expect(obj1._elem[0]).toEqual(e1.getObject());
                expect(obj1._elem[1]).toEqual({$ref: e1._guid});
                expect(obj2.rows._elem[0]._elem[0]).toEqual({$ref: e1._guid});
                expect(obj2.rows._elem[0]._elem[1]).toEqual({$ref: e1._guid});
            });
        });
        describe("MetaRow.setObject(mObj) <객체 설정>", () => {
            it("- setObject() : 직렬화 객체 설정 ", () => {
                const a1 = new MetaTable('T1');
                a1.columns.add('a1');
                a1.columns.add('a2');
                const fun1 = function(){}
                var row = a1.newRow();
                row.onChanged = fun1;
                row['a1'] = 'R1';
                row['a2'] = 'R2';
                a1.rows.add(row);
                const obj1 = a1.rows.getObject();
                const obj2 = a1.getObject();
                const a2 = new MetaTable('T2');
                a2.setObject(obj2);

                expect(a2.equal(a1)).toBe(true);
                expect(a2.rows[0].__event.list.length).toBe(1)
                expect(()=>a2.rows.setObject(obj1)).toThrow(/EL04112/);
                /**
                 * MEMO:
                 * - 소유하는 entity에서 setObject() 확인
                 * - entity 참조가 존재해서 getObject(0) 으로 설정시 참조 오류 확인
                 */
            });
            it("- setObject() : Element값", () => {
                const a1 = new MetaTable('T1');
                a1.columns._baseType = ObjectColumn;
                a1.columns.add('a1');
                a1.columns.add('a2');
                const fun1 = function(){}
                var e1 = new MetaElement('E1')
                var row = a1.newRow();
                row['a1'] = e1;
                row['a2'] = e1;
                a1.rows.add(row);
                const obj1 = a1.rows.getObject();
                const obj2 = a1.getObject();
                const a2 = new MetaTable('T2');
                a2.setObject(obj2);

                expect(a2.equal(a1)).toBe(true);
                expect(a1 !== a2).toBe(true);
                expect(a1._guid !== a2._guid).toBe(true);
                expect(e1.equal(a2.rows[0][0])).toBe(true);
                expect(e1.equal(a2.rows[0][1])).toBe(true);
                expect(e1.equal(a2.rows[0]['a1'])).toBe(true);
                expect(e1.equal(a2.rows[0]['a2'])).toBe(true);
                /**
                 * MEMO:
                 */
            });
            it("- setObject() : row별도 설정", () => {
                const a1 = new MetaTable('T1');
                a1.columns.addValue('a1', 'V1');
                a1.columns.addValue('a2', 'V2');
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject()
                const row1 = new MetaRow(a1)

                expect(a1.rows[0]['a1']).toBe('V1');
                expect(a1.rows[0]['a2']).toBe('V2');
                expect(row1['a1']).toBe(null);
                expect(row1['a2']).toBe(null);
                row1.setObject(obj1)
                expect(row1['a1']).toBe('V1');
                expect(row1['a2']).toBe('V2');
            });
            it("- setObject() : row별도 설정", () => {
                const a1 = new MetaTable('T1');
                a1.columns.addValue('a1', 'V1');
                a1.columns.addValue('a2', 'V2');
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject()
                const row1 = new MetaRow(a1)

                expect(a1.rows[0]['a1']).toBe('V1');
                expect(a1.rows[0]['a2']).toBe('V2');
                expect(row1['a1']).toBe(null);
                expect(row1['a2']).toBe(null);
                row1.setObject(obj1)
                expect(row1['a1']).toBe('V1');
                expect(row1['a2']).toBe('V2');
            });
            it("- 예외 : _elem, _kye 크기 다름", () => {
                const a1 = new MetaTable('T1');
                a1.columns.addValue('a1', 'V1');
                a1.columns.addValue('a2', 'V2');
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject()
                const row1 = new MetaRow(a1)
                obj1._key.pop() // 강제 키 제거
                
                expect(()=> row1.setObject(obj1)).toThrow(/EL05212/)
            });
            it("- 예외 : $ref 가 없는 경우 ", () => {
                var e1 = new MetaElement('E1')
                const a1 = new MetaTable('T1');
                a1.columns._baseType = ObjectColumn;
                a1.columns.addValue('a1', e1);
                a1.columns.addValue('a2', e1);
                var row = a1.getValue();
                a1.rows.add(row);
                const obj1 = a1.rows[0].getObject()
                const obj2 = a1.getObject()
                const row1 = new MetaRow(a1)
                obj1._elem[0] = 'ERR' // 강제 guid 제거
                
                expect(()=> row1.setObject(obj1)).toThrow(/EL05213/)
            });
            /**
             * 예외
             * 참조삽입
             * 다른 자료형의 로우를 복제하는 경우?
             */
        });
        describe("MetaRow.clone(): Row <복제>", () => {
            it("- clone() : 복사 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
                var row1 = new MetaRow(table1);
                const fun1 = function(){return 'F1'};
                row1.onChanged = fun1;
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
                expect(row1.equal(row2)).toBe(true);
                // 비교 : 
                // REVIEW: new 일반 new 생성으로 guid 의 차이점가 있음
                // table1.rows[0].setObject({_guid: 'ID'});
                // table1.rows[1].setObject({_guid: 'ID'});
                // const row0 = table1.rows[0].getObject(p_vOpt);
                // const row1 = table1.rows[1].getObject(p_vOpt);
                // table1.rows[0].__SET_guid('ID', table1.rows[0]);
                // table1.rows[1].__SET_guid('ID', table1.rows[1]);
                /**
                 * MEMO: 로우 복사후 비교 확인
                 */
            });
        });
        describe("예외 및 커버리지", () => {
            
            // it("- 커버리지 : this.__SET$_keys() ", () => {
            //     const table1 = new MetaTable('T1');
            //     table1.columns.addValue('c1', 'V1');
            //     const row1 = new MetaRow(table1);

            //     row1.__SET$_keys(['cc1'], row1)
            //     expect(row1._keys).toEqual(['cc1'])
            //     row1.__SET$_keys(['ccc1'],)  // 접근금지
            //     expect(row1._keys).toEqual(['cc1'])
            // });
            it("- 커버리지 : this.$_elements ", () => {
                const table1 = new MetaTable('T1');
                table1.columns.addValue('c1', 'V1');
                const row1 = new MetaRow(table1);

                row1.$_elements = ['r1']
                expect(row1._elements).toEqual(['r1'])
                // row1.$_elements(['rr1'],)  // 접근금지
                expect(row1._elements).toEqual(['r1'])
            });
            it("- 커버리지 : this.$_elements ", () => {
                const table1 = new MetaTable('T1');
                table1.columns.addValue('c1', 'V1');
                const row1 = new MetaRow(table1);

                var elem1 = row1.$_elements
                expect(elem1).toEqual(row1._elements)
                // var elem2 = row1.__GET$_elements()
                // expect(elem2).not.toEqual(row1._elements)
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
                expect(() => table1.rows.add(row2, true)).toThrow(/EL05224/);
                expect(() => table1.rows.add(row3, true)).toThrow('EL05224');
            });
            it("- add(row) : 예외(다른 엔티티) ", () => {
                var table1 = new MetaTable('T1');
            
                expect(() => table1.rows.add('ERR')).toThrow('EL05222');
            });
            it("- add(row) : 예외(다른 객체) ", () => {
                var table1 = new MetaTable('T1');
                var table2 = new MetaTable('T2');
                table1.columns.addValue('i1', 'V1');
                var row = new MetaRow(table1);
                row['i1'] = 'R1';
                table1.rows.add(row);
            
                expect(() => table2.rows.add(row)).toThrow('EL05223');        
            });
        });

        describe("this.commit() <커밋>", () => {
            it("- hasChanges : 변경 유무", () => {
                var table1 = new MetaTable('T1');
                table1.rows.autoChanges = false;
                table1.columns.add('i1');
    
                // 초기
                expect(table1.rows.hasChanges).toBe(false);
                // 변경후
                var row = table1.newRow();
                row[0] = 'R1';
                table1.rows.add(row);
                expect(table1.rows.hasChanges).toBe(true);
                // 커밋 후
                table1.rows.commit();
                expect(table1.rows.hasChanges).toBe(false);
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
                expect(() => table1.rows[0] = row3).toThrow(/EL05221/);
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
    
                expect(()=> table1.rows.insertAt(3, row2)).toThrow(/EL04213/);
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
    
                expect(()=> table1.rows.insertAt(-1, row2)).toThrow(/EL04214/);
            });
        });
        describe("예외 및 커버리지", () => {
            
            it("- 커버리지 : _elemTypes = [] 제거 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1')
                var row1 = table1.newRow();
                table1.rows.add(row1);  // 정상 등록
                
                expect(()=> table1.rows[0] = {}).toThrow(/EL0130B/)
                table1.rows._elemTypes.length = 0   // 강제 삭제
                table1.rows[0] = row1;
            });

        });
        
    });

    
});

// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

