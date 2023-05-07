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
    it("- new EntityView(name, baseEntity) ", () => {
        var view1 = new EntityView('T1');        // 일반 뷰
        view1.items.add('i1');
        view1.items.add('i2');
        view1.items['i2'].caption = 'C1';
        var row = view1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view1.rows.add(row);
        var view3 = new EntityView('T3');
        view3.items.addValue('i5','V5');
        var view2 = new EntityView('T2', view1); // 참조 뷰
        view2.items.add(view1.items['i1']);
        view2.items.add('i2');                  // 기존에 있는 속성명
        view2.items.add('i3');                  // 신규 속성명
        view2.items.addValue('i4', 'V4');       // 신규 속성명 + value
        view2.items.add('i5', view3.items);     // 참조로 등록
        view2.items['i2'].caption = 'C2';
        view2.items['i3'].caption = 'C3';

        // view1
        expect(view1.name).toBe('T1');
        expect(view1.items.count).toBe(4);
        expect(view1.rows.count).toBe(1);
        expect(view1.items['i2'].caption).toBe('C2');
        expect(view1.items['i3'].caption).toBe('C3');
        expect(view1.items['i4'].value).toBe('V4');
        expect(view1.items._baseCollection).toBe(undefined);
        expect(view1.items['i1'].entity.name).toBe('T1');
        expect(view1.items['i2'].entity.name).toBe('T1');
        expect(view1.rows[0]['i1']).toBe('R1');
        expect(view1.rows[0]['i2']).toBe('R2');
        // view2
        expect(view2._refEntities[0].name).toBe('T1');
        expect(view2._refEntities[1].name).toBe('T3');
        expect(view2.items['i2'].caption).toBe('C2');
        expect(view2.items['i3'].caption).toBe('C3');
        expect(view2.items['i4'].value).toBe('V4');
        expect(view2.items._baseCollection._owner.name).toBe('T1');
        expect(view2.name).toBe('T2');
        expect(view2.items.count).toBe(5);
        expect(view2.rows.count).toBe(0);
        expect(view2.items['i1'].entity.name).toBe('T1');
        expect(view2.items['i2'].entity.name).toBe('T1');
    });
    it("- clone() : 복제, 일반 뷰 ", () => {
        var view1 = new EntityView('T1');
        view1.items.add('i1');
        view1.items.add('i2');
        view1.items['i2'].caption = 'C1';
        var row = view1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view1.rows.add(row);
        var view2 = view1.clone();

        // view1
        expect(view1.name).toBe('T1');
        expect(view1.items.count).toBe(2);
        expect(view1.rows.count).toBe(1);
        expect(view1.items['i2'].caption).toBe('C1');
        expect(view1.rows[0]['i1']).toBe('R1');
        expect(view1.rows[0]['i2']).toBe('R2');
        // view2
        expect(view2.name).toBe('T1');
        expect(view2.items.count).toBe(2);
        expect(view2.rows.count).toBe(1);
        expect(view2.items['i2'].caption).toBe('C1');
        expect(view2.rows[0]['i1']).toBe('R1');
        expect(view2.rows[0]['i2']).toBe('R2');
        // 비교
        expect(view1 === view2).toBe(false);
        expect(view1.items === view2.items).toBe(false);
        expect(view1.items['i1'] === view2.items['i1']).toBe(false);
        expect(view1.items['i2'] === view2.items['i2']).toBe(false);
        expect(view1.rows[0] === view2.rows[0]).toBe(false);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new EntityView();
        const types = c.getTypes();

        expect(types[0]).toBe(EntityView);
        expect(types[1]).toBe(Entity);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(MetaObject);
        expect(types[4]).toBe(Object);
        expect(types.length).toBe(5);
    });
    // it("- getTypeNames() : array<string> ", () => {
    //     const c = new EntityView();
    //     const typeNames = c.getTypeNames();

    //     expect(typeNames[0]).toBe('Object');
    //     expect(typeNames[1]).toBe('MetaObject');
    //     expect(typeNames[2]).toBe('MetaElement');
    //     expect(typeNames[3]).toBe('Entity');
    //     expect(typeNames[4]).toBe('EntityView');
    //     expect(typeNames.length).toBe(5);
    // });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new EntityView();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('Entity')).toBe(true);
        expect(c.instanceOf('EntityView')).toBe(true);
        // false
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new EntityView();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(Entity)).toBe(true);
        expect(c.instanceOf(EntityView)).toBe(true);
        // false
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
    // describe("< setValue(row) >", () => {
    //     it("- setValue(row) : row 설정(단일) ", () => {
            
    //     });
    // });
});
/**
 * 테스트가 허술해 보임
 */