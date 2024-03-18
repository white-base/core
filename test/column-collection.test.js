/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
// const {BaseEntity}                = require('../src/base-entity');
const {IObject}               = require('../src/i-object');
const {IMarshal}              = require('../src/i-marshal');
const Util                  = require('../src/util');
// const { BaseColumn }       = require('../src/base-column');

// const { MetaTable }       = require('../src/meta-table');
// const { MetaView, MetaViewCollection }        = require('../src/meta-view');
// const { MetaRow }               = require('../src/meta-row');
// const { BaseColumnCollection }              = require('../src/collection-column');
// const { MetaColumn }              = require('../src/meta-column');

//==============================================================
// test
describe.skip("[target: meta-column.js]", () => {
    describe("BaseColumnCollection :: 클래스", () => {
        beforeAll(() => {
            // jest.resetModules();
        });
        describe("BaseColumnCollection.initValue() <컬럼 value 초기화>", () => {
            it("- initValue(entity) : 컬렉션 전체값 초기화 ", () => {
                var view1 = new MetaView('T1');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                view1.columns.initValue();
        
                // view1
                expect(view1.viewName).toBe('T1');
                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].value).toBe('');
                expect(view1.columns['i2'].value).toBe('');   // REVIEW: default 값을 기준으로 초기화?
            });
        });

        describe("BaseColumnCollection.existAlias(key): bool <별칭 유무 검사>", () => {
            it("- existAlias(key) : 기본값 ", () => {
                var view1 = new MetaView('T1');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                
                // view1.columns.existAlias('a1');
                // view1.existAlias('a1');
                // set1.existTableName(key);
                // set1.tables.existTableName(key);

                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].alias).toBe('i1');
                expect(view1.columns['i2'].alias).toBe('i2');
                expect(view1.columns.existAlias('i1')).toBe(true);
                expect(view1.columns.existAlias('i2')).toBe(true);
                expect(view1.columns.existAlias('i3')).toBe(false);
            });
            it("- existAlias(key) : 변경 ", () => {
                var view1 = new MetaView('T1');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                view1.columns['i2'].alias = 'i3';
    
                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].alias).toBe('i1');
                expect(view1.columns['i2'].alias).toBe('i3');
                expect(view1.columns.existAlias('i1')).toBe(true);
                expect(view1.columns.existAlias('i2')).toBe(false);
                expect(view1.columns.existAlias('i3')).toBe(true);
            });
            it("- existAlias(key) : 스위칭 ", () => {
                var view1 = new MetaView('T1');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                view1.columns['i1'].alias = 'i';  // 임시 이름 변경
                view1.columns['i2'].alias = 'i1';
                view1.columns['i1'].alias = 'i2';
    
                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].alias).toBe('i2');
                expect(view1.columns['i2'].alias).toBe('i1');
                expect(view1.columns.existAlias('i1')).toBe(true);
                expect(view1.columns.existAlias('i2')).toBe(true);
                expect(view1.columns.existAlias('i3')).toBe(false);
            });
        });
        describe("BaseColumnCollection.alias(key): MetaColumn <별칭으로 조회> ", () => {
            it("- alias(key) : 별칭으로 조회 하기 ", () => {
                var view1 = new MetaView('T1');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                view1.columns['i1'].alias = 'a1';
                view1.columns['i2'].alias = 'a2';
        
                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].alias).toBe('a1');
                expect(view1.columns['i2'].alias).toBe('a2');
                expect(view1.columns.existAlias('a1')).toBe(true);
                expect(view1.columns.existAlias('a2')).toBe(true);
                expect(view1.columns.existAlias('a3')).toBe(false);
                
                expect(view1.columns['i1'] === view1.columns.alias('a1')).toBe(true);
                expect(view1.columns['i2'] === view1.columns.alias('a2')).toBe(true)

            });
        });
        describe("예외, COVER ", () => {
            it("- 강제로  addValue() 제거  ", () => {
                class TempCollection extends BaseColumnCollection {
                    constructor(p_owner){
                        super(p_owner, MetaColumn) 
                    }
                }
                var temp1  = new TempCollection();

                expect(()=> temp1.addValue('i1', 'V1')).toThrow(/EL05147/)
            });
            it("- _baseType 설정 : 예외  ", () => {
                const t1 = new MetaTable('T1');

                expect(()=> t1.columns._baseType = 10).toThrow(/EL05141/)
                expect(()=> t1.columns._baseType = MetaElement).toThrow(/EL05142/)
            });
        });

    });
    describe("MetaTableColumnCollection :: 클래스", () => {
        describe("BaseColumnCollection.removeAt(idx) <컬럼 삭제>", () => {
            it("- removeAt(name) : 아이템명으로 삭제 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1');
                table1.columns.add('i2');
                table1.columns.removeAt(1)

                expect(table1.columns.count).toBe(1);
            });
            it("- removeAt(name) : 예외 <rows 존재시> ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1');
                table1.columns.add('i2');
                table1.rows.add(table1.newRow());

                expect(table1.columns.count).toBe(2);
                expect(table1.rows.count).toBe(1);
                expect(()=>table1.columns.removeAt(1)).toThrow(/EL05146/)
            });
        });
        describe("BaseColumnCollection.addValue(name, value) <이름과 값으로 컬럼 추가>", () => {
            it("- addValue(value, value) : 아이템명 + 값 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.addValue('i1', 'V1');
                table1.columns.addValue('i2', 'V2');
        
                expect(table1.columns.count).toBe(2);
                expect(table1.columns['i1'].value).toBe('V1');
                expect(table1.columns['i2'].value).toBe('V2');
            });
            it("- addValue(?, ?) : 예외 ", () => {
                var table1 = new MetaTable('T1');

                expect(() => table1.columns.addValue('c1', {})).toThrow(/EL0130B/);
                expect(() => table1.columns.addValue('c1', /reg/)).toThrow(/EL0130B/);
                expect(()=> table1.columns.addValue(10)).toThrow(/EL05152/)
                expect(()=> table1.columns.addValue({})).toThrow(/EL05152/)
            });
        });
        describe("MetaTableColumnCollection.add(name | column) <컬럼 추가>", () => {
            it("- add(name) : 아이템명으로 추가 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1');
                table1.columns.add('i2');
    
                expect(table1.columns.count).toBe(2);
            });
            it("- add(item) : 아이템 객체로 추가 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add(new MetaColumn('i1'));
                table1.columns.add('i2');
                table1.columns['i2'].caption = 'C1';
                var table2 = new MetaTable('T2');
                table2.columns.add(table1.columns['i2']);
                table1.columns['i2'].caption = 'C2';
    
                // table1
                expect(table1.columns.count).toBe(2);
                expect(table1.columns['i2'].caption).toBe('C2');
                expect(table1.columns['i2']._entity.tableName).toBe('T1');
                // table2
                expect(table2.columns.count).toBe(1);
                expect(table2.columns['i2'].caption).toBe('C1');
                expect(table2.columns['i2']._entity.tableName).toBe('T2');
            });
            it("- add(name) : 로우 존재시 컬럼 추가/제거 예외 ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('i1');
                table1.columns.add('i2');
                var row1 = table1.newRow();
                row1['i1'] = 'R1';
                row1['i2'] = 'R2';
                table1.rows.add(row1);

                expect(() => table1.columns.add('i3')).toThrow(/EL05143/);
                expect(() => table1.columns.removeAt(0) ).toThrow(/EL05146/);
                expect(() => table1.columns.remove(table1.columns['i2'])).toThrow(/EL05146/);
            });
            it("- add(?) : 예외 ", () => {
                var table1 = new MetaTable('T1');

                expect(() => table1.columns.add(1)).toThrow(/EL05151/);
                expect(() => table1.columns.add({})).toThrow(/EL05151/);
                expect(() => table1.columns.add(/err/)).toThrow(/EL05151/);
            });
            it("- add(?) : 예외 <별칭과 중복> ", () => {
                var table1 = new MetaTable('T1');
                table1.columns.add('c1');
                table1.columns.add('c2');
                table1.columns['c2'].alias = 'cc2'

                expect(() => table1.columns.add('cc2')).toThrow(/EL05145/);
                expect(() => table1.columns.add('')).toThrow(/EL03122/);
            });

        });
        

    });
    describe("MetaViewColumnCollection :: 테이블", () => {
        describe("BaseColumnCollection.addValue(name, value) <이름과 값으로 컬럼 추가>", () => {
            it("- addValue(name, value) : 아이템명 + 값 ", () => {
                var view1 = new MetaView('T1');        // 독립형 생성
                var view2 = new MetaView('T2', view1);    // 참조형 생성
                var view3 = new MetaView('T3');      // 독립형 생성
                view1.columns.add('i1');                   // 아이템 추가
                view1.columns.add('i2');
                view1.columns.addValue('i3', 'V3');
                view1.columns['i1'].caption = 'C1';
                view1.columns['i2'].caption = 'C2';
                view2.columns.add(view1.columns['i1']);         // 중복 삽입 : 기존값 리턴
                view2.columns.add('i2');                     // 중복 삽입 : 기존값 리턴
                view2.columns.add('i3');                      
                view2.columns.add('i4', view3.columns);      // 참조형에 참조컬렉션 지정
                view2.columns['i3'].caption = 'C3';       // 참조에 속성 덮어씀
                view2.columns['i4'].caption = 'C4';
    
                // view1
                expect(view1.viewName).toBe('T1');
                expect(view1.columns.count).toBe(3);
                expect(view1.columns['i1'].caption).toBe('C1');
                expect(view1.columns['i2'].caption).toBe('C2');
                expect(view1.columns['i3'].caption).toBe('C3');
                expect(view1.columns['i3'].value).toBe('V3');
                // view2
                expect(view2.viewName).toBe('T2');
                expect(view2.columns.count).toBe(4);
                expect(view2.columns['i1'].caption).toBe('C1');
                expect(view2.columns['i2'].caption).toBe('C2');
                expect(view2.columns['i3'].caption).toBe('C3');
                expect(view1.columns['i3'].value).toBe('V3');
                // view3
                expect(view3.viewName).toBe('T3');
                expect(view3.columns.count).toBe(1);
                expect(view3.columns['i4'].caption).toBe('C4');
                // view1 기준 비교
                expect(view1.columns['i1']).toEqual(view2.columns['i1']);
                expect(view1.columns['i2']).toEqual(view2.columns['i2']);
                expect(view1.columns['i3']).toEqual(view2.columns['i3']);
                // view2 기준 비교
                expect(view2.columns['i1']).toEqual(view1.columns['i1']);
                expect(view2.columns['i2']).toEqual(view1.columns['i2']);
                expect(view2.columns['i3']).toEqual(view1.columns['i3']);
                expect(view2.columns['i4']).toEqual(view3.columns['i4']);
                // view3 기준 비교
                expect(view3.columns['i4']).toEqual(view2.columns['i4']);
            });
            it("- addValue() : 켈렉션 교체로, 타입 제한 해지 ", () => {
                class SubColumn extends BaseColumn {
                    constructor(name, entity, prop) {
                        super(name, entity);
                        if (prop && prop['value']) this.value = prop['value']
                    }
                }
                SubColumn._VALUE_TYPE = [];
                var view1 = new MetaView('T1');
                // var arr = Util.getTypes(SubColumn);
                view1.columns._baseType = SubColumn;
                view1.columns.addValue('c1', /reg/)
                view1.columns.addValue('c2', {})
                
                expect(view1.columns['c1'].value).toEqual(/reg/)
                expect(view1.columns['c2'].value).toEqual({})
            });
            it("- addValue(?, ?) : 예외 ", () => {
                var view1 = new MetaView('T1');

                expect(()=> view1.columns.addValue('c2', {})).toThrow(/EL0130B/)
                expect(()=> view1.columns.addValue('c2', /reg/)).toThrow(/EL0130B/)
                expect(()=> view1.columns.addValue(10, 10)).toThrow(/EL05163/)
            });
        });
        describe("MetaViewColumnCollection.add(name, baseCollection) <컬럼 추가>", () => {
            it("- add(name, baseCollection) : 독립형 생성 ", () => {
                var view1 = new MetaView('T1');        // 독립형 생성
                view1.columns.add('i1');                   // 아이템 추가
                view1.columns.add('i2');
                view1.columns['i2'].caption = 'C1';
                var view2 = new MetaView('T2');       // 독립형 생성
                view2.columns.add(view1.columns['i1']);      // 참조 아이템 추가
                view2.columns.add('i2');                  
                view2.columns.add('i3', view1.columns);      // 컬렉션 지정 추가
                view2.columns['i1'].value = 'V1';
                view2.columns['i2'].caption = 'C2';
                view2.columns['i3'].caption = 'C3';
    
                // view1
                expect(view1.viewName).toBe('T1');
                expect(view1.columns.count).toBe(3);
                expect(view1.columns['i1'].value).toBe('V1');
                expect(view1.columns['i2'].caption).toBe('C1');
                expect(view1.columns['i3'].caption).toBe('C3');
                // view2
                expect(view2.viewName).toBe('T2');
                expect(view2.columns.count).toBe(3);
                expect(view2.columns['i1'].value).toBe('V1');
                expect(view2.columns['i2'].caption).toBe('C2');
                expect(view2.columns['i3'].caption).toBe('C3');
            });
            it("- add(?, ?) : 예외 ", () => {
                var view1 = new MetaView('T1');

                expect(()=> view1.columns.add('c2', {})).toThrow(/EL05161/)
                expect(()=> view1.columns.add('c2', 10)).toThrow(/EL05161/)
                expect(()=> view1.columns.add(10)).toThrow(/EL05162/)
                expect(()=> view1.columns.add({})).toThrow(/EL05162/)
            });
        });

        describe("MetaViewColumnCollection.addEntity(entity) <엔티티의 전체 컬럼 추가>", () => {
            it("- addEntity(entity) : 엔티티의 컬렉션 모두 추가 ", () => {
                var view1 = new MetaView('T1');
                var view2 = new MetaView('T2');
                view1.columns.addValue('i1', 'V1');
                view1.columns.addValue('i2', 'V2');
                view2.columns.addEntity(view1);
        
                // view1
                expect(view1.viewName).toBe('T1');
                expect(view1.columns.count).toBe(2);
                expect(view1.columns['i1'].value).toBe('V1');
                expect(view1.columns['i2'].value).toBe('V2');
                // view2
                expect(view2.viewName).toBe('T2');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['i1'].value).toBe('V1');
                expect(view2.columns['i2'].value).toBe('V2');
                // 비교
                expect(view1.columns['i1']).toEqual(view2.columns['i1']);
                expect(view1.columns['i2']).toEqual(view2.columns['i2']);
                expect(view1.columns).not.toEqual(view2.columns);
            });
            it("- addEntity(?) : 예외, COVER ", () => {
                var view1 = new MetaView('T1');
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c1'].alias = 'cc1'
                
                expect(()=> view1.columns['c2'].columnName = 'cc1').toThrow(/EL05114/)
                expect(()=> view1.columns['c1'].columnName = 10).toThrow(/EL05112/)
                expect(()=> view1.columns['c1'].columnName = {}).toThrow(/EL05112/)
                expect(()=> view1.columns['c1'].alias = 10).toThrow(/EL05115/)
                expect(()=> view1.columns['c1'].alias = {}).toThrow(/EL05115/)
                expect(()=> view1.columns['c1'].caption = 10).toThrow(/EL05117/)
                expect(()=> view1.columns['c1'].caption = {}).toThrow(/EL05117/)
                expect(()=> view1.columns['c1'].isNotNull = 10).toThrow(/EL05131/)
                expect(()=> view1.columns['c1'].isNotNull = {}).toThrow(/EL05131/)
                expect(()=> view1.columns['c1'].isNullPass = 10).toThrow(/EL05132/)
                expect(()=> view1.columns['c1'].isNullPass = {}).toThrow(/EL05132/)
                expect(()=> view1.columns['c1'].getter = 10).toThrow(/EL05134/)
                expect(()=> view1.columns['c1'].getter = {}).toThrow(/EL05134/)
                expect(()=> view1.columns['c1'].setter = 10).toThrow(/EL05135/)
                expect(()=> view1.columns['c1'].setter = {}).toThrow(/EL05135/)
                expect(()=> view1.columns.addEntity(10)).toThrow(/EL05164/)
                expect(()=> view1.columns.addEntity({})).toThrow(/EL05164/)
            });
        });
    });


});


// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

