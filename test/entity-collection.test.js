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
describe("< EntityTable >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    describe("< ItemTableCollection >", () => {
        it("- add(name) : 아이템명으로 추가 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');

            expect(table1.items.count).toBe(2);
        });
        it("- add(item) : 아이템 객체로 추가 ", () => {
                var table1 = new EntityTable('T1');
            table1.items.add(new Item('i1'));
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var table2 = new EntityTable('T2');
            table2.items.add(table1.items['i2']);
            table1.items['i2'].caption = 'C2';

            // table1
            expect(table1.items.count).toBe(2);
            expect(table1.items['i2'].caption).toBe('C2');
            expect(table1.items['i2'].entity.name).toBe('T1');
            // table2
            expect(table2.items.count).toBe(1);
            expect(table2.items['i2'].caption).toBe('C1');
            expect(table2.items['i2'].entity.name).toBe('T2');
        });
        it("- addValue(value, value) : 아이템명 + 값 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.addValue('i1', 'V1');
            table1.items.addValue('i2', 'V2');
    
            expect(table1.items.count).toBe(2);
            expect(table1.items['i1'].value).toBe('V1');
            expect(table1.items['i2'].value).toBe('V2');
        });
    });
    describe("< ItemViewCollection >", () => {
        it("- add(name, baseCollection) : 독립형 생성 ", () => {
            var view1 = new EntityView('T1');        // 독립형 생성
            view1.items.add('i1');                   // 아이템 추가
            view1.items.add('i2');
            view1.items['i2'].caption = 'C1';
            var view2 = new EntityView('T2');       // 독립형 생성
            view2.items.add(view1.items['i1']);      // 참조 아이템 추가
            view2.items.add('i2');                  
            view2.items.add('i3', view1.items);      // 컬렉션 지정 추가
            view2.items['i1'].value = 'V1';
            view2.items['i2'].caption = 'C2';
            view2.items['i3'].caption = 'C3';

            // view1
            expect(view1.name).toBe('T1');
            expect(view1.items.count).toBe(3);
            expect(view1.items['i1'].value).toBe('V1');
            expect(view1.items['i2'].caption).toBe('C1');
            expect(view1.items['i3'].caption).toBe('C3');
            // view2
            expect(view2.name).toBe('T2');
            expect(view2.items.count).toBe(3);
            expect(view2.items['i1'].value).toBe('V1');
            expect(view2.items['i2'].caption).toBe('C2');
            expect(view2.items['i3'].caption).toBe('C3');
        });
        it("- addValue(name, value) : 아이템명 + 값 ", () => {
            var view1 = new EntityView('T1');        // 독립형 생성
            var view2 = new EntityView('T2', view1);    // 참조형 생성
            var view3 = new EntityView('T3');      // 독립형 생성
            view1.items.add('i1');                   // 아이템 추가
            view1.items.add('i2');
            view1.items.addValue('i3', 'V3');
            view1.items['i1'].caption = 'C1';
            view1.items['i2'].caption = 'C2';
            view2.items.add(view1.items['i1']);         // 중복 삽입 : 기존값 리턴
            view2.items.add('i2');                     // 중복 삽입 : 기존값 리턴
            view2.items.add('i3');                      
            view2.items.add('i4', view3.items);      // 참조형에 참조컬렉션 지정
            view2.items['i3'].caption = 'C3';       // 참조에 속성 덮어씀
            view2.items['i4'].caption = 'C4';

            // view1
            expect(view1.name).toBe('T1');
            expect(view1.items.count).toBe(3);
            expect(view1.items['i1'].caption).toBe('C1');
            expect(view1.items['i2'].caption).toBe('C2');
            expect(view1.items['i3'].caption).toBe('C3');
            expect(view1.items['i3'].value).toBe('V3');
            // view2
            expect(view2.name).toBe('T2');
            expect(view2.items.count).toBe(4);
            expect(view2.items['i1'].caption).toBe('C1');
            expect(view2.items['i2'].caption).toBe('C2');
            expect(view2.items['i3'].caption).toBe('C3');
            expect(view1.items['i3'].value).toBe('V3');
            // view3
            expect(view3.name).toBe('T3');
            expect(view3.items.count).toBe(1);
            expect(view3.items['i4'].caption).toBe('C4');
            // view1 기준 비교
            expect(view1.items['i1']).toEqual(view2.items['i1']);
            expect(view1.items['i2']).toEqual(view2.items['i2']);
            expect(view1.items['i3']).toEqual(view2.items['i3']);
            // view2 기준 비교
            expect(view2.items['i1']).toEqual(view1.items['i1']);
            expect(view2.items['i2']).toEqual(view1.items['i2']);
            expect(view2.items['i3']).toEqual(view1.items['i3']);
            expect(view2.items['i4']).toEqual(view3.items['i4']);
            // view3 기준 비교
            expect(view3.items['i4']).toEqual(view2.items['i4']);
        });
        it("- addEntity(entity) : 엔티티의 컬렉션 모두 추가 ", () => {
            var view1 = new EntityView('T1');
            var view2 = new EntityView('T2');
            view1.items.addValue('i1', 'V1');
            view1.items.addValue('i2', 'V2');
            view2.items.addEntity(view1);
    
            // view1
            expect(view1.name).toBe('T1');
            expect(view1.items.count).toBe(2);
            expect(view1.items['i1'].value).toBe('V1');
            expect(view1.items['i2'].value).toBe('V2');
            // view2
            expect(view2.name).toBe('T2');
            expect(view2.items.count).toBe(2);
            expect(view2.items['i1'].value).toBe('V1');
            expect(view2.items['i2'].value).toBe('V2');
            // 비교
            expect(view1.items['i1']).toEqual(view2.items['i1']);
            expect(view1.items['i2']).toEqual(view2.items['i2']);
            expect(view1.items).not.toEqual(view2.items);
        });
        it("- initValue(entity) : 컬렉션 전체값 초기화 ", () => {
            var view1 = new EntityView('T1');
            view1.items.addValue('i1', 'V1');
            view1.items.addValue('i2', 'V2');
            view1.items.initValue();
    
            // view1
            expect(view1.name).toBe('T1');
            expect(view1.items.count).toBe(2);
            expect(view1.items['i1'].value).toBe('');
            expect(view1.items['i2'].value).toBe('');   // REVIEW: default 값을 기준으로 초기화?
        });
    });
});
// describe("< setValue(row) >", () => {
//     it("-  ", () => {
        
//     });
// });

