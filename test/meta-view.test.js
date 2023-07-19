/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {MetaObject}              = require('../src/meta-object');
const {MetaElement}             = require('../src/meta-element');
const {MetaEntity}              = require('../src/meta-entity');
const {IObject}                 = require('../src/i-object');
const {IMarshal}                = require('../src/i-marshal');
const Util                      = require('../src/util');
const { MetaTable }             = require('../src/meta-table');
const { MetaView }              = require('../src/meta-view');
const { MetaRow }               = require('../src/meta-row');
const { MetaColumn }            = require('../src/meta-column');  

//==============================================================
// test
describe("< MetaTable >", () => {   beforeAll(() => {
        // jest.resetModules();
    });
    it("- new MetaView(name, baseEntity) ", () => {
        var view1 = new MetaView('T1');        // 일반 뷰
        view1.columns.add('i1');
        view1.columns.add('i2');
        view1.columns['i2'].caption = 'C1';
        var row = view1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view1.rows.add(row);
        var view3 = new MetaView('T3');
        view3.columns.addValue('i5','V5');
        var view2 = new MetaView('T2', view1); // 참조 뷰
        view2.columns.add(view1.columns['i1']);
        view2.columns.add('i2');                  // 기존에 있는 속성명
        view2.columns.add('i3');                  // 신규 속성명
        view2.columns.addValue('i4', 'V4');       // 신규 속성명 + value
        view2.columns.add('i5', view3.columns);     // 참조로 등록
        view2.columns['i2'].caption = 'C2';
        view2.columns['i3'].caption = 'C3';

        // view1
        expect(view1.name).toBe('T1');
        expect(view1.columns.count).toBe(4);
        expect(view1.rows.count).toBe(1);
        expect(view1.columns['i2'].caption).toBe('C2');
        expect(view1.columns['i3'].caption).toBe('C3');
        expect(view1.columns['i4'].value).toBe('V4');
        expect(view1.columns._baseCollection).toBe(undefined);
        expect(view1.columns['i1'].entity.name).toBe('T1');
        expect(view1.columns['i2'].entity.name).toBe('T1');
        expect(view1.rows[0]['i1']).toBe('R1');
        expect(view1.rows[0]['i2']).toBe('R2');
        // view2
        expect(view2._refEntities[0].name).toBe('T1');
        expect(view2._refEntities[1].name).toBe('T3');
        expect(view2.columns['i2'].caption).toBe('C2');
        expect(view2.columns['i3'].caption).toBe('C3');
        expect(view2.columns['i4'].value).toBe('V4');
        expect(view2.columns._baseCollection._owner.name).toBe('T1');
        expect(view2.name).toBe('T2');
        expect(view2.columns.count).toBe(5);
        expect(view2.rows.count).toBe(0);
        expect(view2.columns['i1'].entity.name).toBe('T1');
        expect(view2.columns['i2'].entity.name).toBe('T1');
    });
    // 오류
    it.skip("- clone() : 복제, 일반 뷰 ", () => {
        var view1 = new MetaView('T1');
        view1.columns.add('i1');
        view1.columns.add('i2');
        view1.columns['i2'].caption = 'C1';
        var row = view1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        view1.rows.add(row);
        var view2 = view1.clone();

        // view1
        expect(view1.name).toBe('T1');
        expect(view1.columns.count).toBe(2);
        expect(view1.rows.count).toBe(1);
        expect(view1.columns['i2'].caption).toBe('C1');
        expect(view1.rows[0]['i1']).toBe('R1');
        expect(view1.rows[0]['i2']).toBe('R2');
        // view2
        expect(view2.name).toBe('T1');
        expect(view2.columns.count).toBe(2);
        expect(view2.rows.count).toBe(1);
        expect(view2.columns['i2'].caption).toBe('C1');
        expect(view2.rows[0]['i1']).toBe('R1');
        expect(view2.rows[0]['i2']).toBe('R2');
        // 비교
        expect(view1 === view2).toBe(false);
        expect(view1.columns === view2.columns).toBe(false);
        expect(view1.columns['i1'] === view2.columns['i1']).toBe(false);
        expect(view1.columns['i2'] === view2.columns['i2']).toBe(false);
        expect(view1.rows[0] === view2.rows[0]).toBe(false);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new MetaView();
        const types = c.getTypes();

        expect(types[0]).toBe(MetaView);
        expect(types[1]).toBe(MetaEntity);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(MetaObject);
        expect(types[4]).toBe(Object);
        expect(types.length).toBe(5);
    });
    // it("- getTypeNames() : array<string> ", () => {
    //     const c = new MetaView();
    //     const typeNames = c.getTypeNames();

    //     expect(typeNames[0]).toBe('Object');
    //     expect(typeNames[1]).toBe('MetaObject');
    //     expect(typeNames[2]).toBe('MetaElement');
    //     expect(typeNames[3]).toBe('MetaEntity');
    //     expect(typeNames[4]).toBe('MetaView');
    //     expect(typeNames.length).toBe(5);
    // });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaView();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('MetaEntity')).toBe(true);
        expect(c.instanceOf('MetaView')).toBe(true);
        // false
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaView();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(MetaEntity)).toBe(true);
        expect(c.instanceOf(MetaView)).toBe(true);
        // false
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
    describe("< select(filter, args) >", () => {
        it("- select() : 기본값 조회 ", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.select();

            expect(view2.columns.count).toBe(2);
            expect(view2.rows.count).toBe(2);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.columns['i2'].caption).toBe('C2');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[0]['i2']).toBe(2);
            expect(view2.rows[1]['i1']).toBe(10);
            expect(view2.rows[1]['i2']).toBe(20);
            // 참조 검사
            expect(view2.columns['i1'] === view1.columns['i1']).toBe(true);
            expect(view2.columns['i2'] === view1.columns['i2']).toBe(true);
            expect(view2.instanceOf(MetaView)).toBe(true);
        });
        it("- select(filter) : 필터 설정 ", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.select(row => row['i1'] < 10);

            expect(view2.columns.count).toBe(2);
            expect(view2.rows.count).toBe(1);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.columns['i2'].caption).toBe('C2');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[0]['i2']).toBe(2);
        });
        it("- select(itmms) : 아이템 설정", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.select('i1');

            expect(view2.columns.count).toBe(1);
            expect(view2.rows.count).toBe(2);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[1]['i1']).toBe(10);
        });
    });
    describe("< copy(filter, args) >", () => {
        it("- copy() : 기본값 조회 ", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.copy();

            expect(view2.columns.count).toBe(2);
            expect(view2.rows.count).toBe(2);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.columns['i2'].caption).toBe('C2');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[0]['i2']).toBe(2);
            expect(view2.rows[1]['i1']).toBe(10);
            expect(view2.rows[1]['i2']).toBe(20);
            // 참조 검사
            expect(view2 === view1).toBe(false);
            expect(view2.columns['i1'] === view1.columns['i1']).toBe(false);
            expect(view2.columns['i2'] === view1.columns['i2']).toBe(false);
            expect(view2.instanceOf(MetaView)).toBe(true);
        });
        it("- copy(filter) : 필터 설정 ", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.copy(row => row['i1'] < 10);

            expect(view2.columns.count).toBe(2);
            expect(view2.rows.count).toBe(1);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.columns['i2'].caption).toBe('C2');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[0]['i2']).toBe(2);
        });
        it("- copy(itmms) : 아이템 설정", () => {
            var view1 = new MetaView('V1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 1, i2: 2 },
                    { i1: 10, i2: 20 },
                ]
            };
            view1.load(json1, 3);
            var view2 = view1.copy('i1');

            expect(view2.columns.count).toBe(1);
            expect(view2.rows.count).toBe(2);
            expect(view2.columns['i1'].caption).toBe('C1');
            expect(view2.rows[0]['i1']).toBe(1);
            expect(view2.rows[1]['i1']).toBe(10);
        });
    });
    // describe("< setValue(row) >", () => {
    //     it("- setValue(row) : row 설정(단일) ", () => {select
            
    //     });
    // });
});
/**
 * REVIEW: 테스트가 허술해 보임
 */