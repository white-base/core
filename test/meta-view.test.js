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
const {MetaRegistry}        = require('../src/meta-registry');
const { loadNamespace } = require('../src/load-namespace');
//==============================================================
// test
describe("[target: meta-view.js]", () => {
    describe("MetaView :: 클래스", () => {   
        beforeAll(() => {
            jest.resetModules();
            MetaRegistry.init();
        });
        describe("MetaView.viewName <뷰이름>", () => {
            it("- this.viewName : 조회 ", () => {
                var table1 = new MetaView('V1');
        
                expect(table1._name).toBe('V1');
                expect(table1.viewName).toBe('V1');
            });
            it("- this.viewName : 수정 ", () => {
                var table1 = new MetaView('V1');
                table1.viewName = 'V2';

                expect(table1._name).toBe('V2');
                expect(table1.viewName).toBe('V2');
            });
        });
        
        describe("MetaView(name, baseEntity) <생성자>", () => {
            it("- new MetaView(name, baseEntity) ", () => {
                var view1 = new MetaView('E1');        // 일반 뷰
                view1.columns.add('i1');
                view1.columns.add('i2');
                view1.columns['i2'].caption = 'C1';
                // var row = view1.newRow();
                // row['i1'] = 'R1';
                // row['i2'] = 'R2';
                // view1.rows.add(row);
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
                expect(view1.viewName).toBe('E1');
                expect(view1.columns.count).toBe(4);
                // expect(view1.rows.count).toBe(1);
                expect(view1.columns['i2'].caption).toBe('C2');
                expect(view1.columns['i3'].caption).toBe('C3');
                expect(view1.columns['i4'].value).toBe('V4');
                expect(view1.columns._baseCollection).toBe(undefined);
                expect(view1.columns['i1']._entity._name).toBe('E1');
                expect(view1.columns['i2']._entity._name).toBe('E1');
                // expect(view1.rows[0]['i1']).toBe('R1');
                // expect(view1.rows[0]['i2']).toBe('R2');
                // view2
                expect(view2.columns._refEntities[0]._name).toBe('E1');
                expect(view2.columns._refEntities[1]._name).toBe('T3');
                expect(view2.columns['i2'].caption).toBe('C2');
                expect(view2.columns['i3'].caption).toBe('C3');
                expect(view2.columns['i4'].value).toBe('V4');
                expect(view2.columns._baseCollection._owner._name).toBe('E1');
                expect(view2.viewName).toBe('T2');
                expect(view2.columns.count).toBe(5);
                expect(view2.rows.count).toBe(0);
                expect(view2.columns['i1']._entity._name).toBe('E1');
                expect(view2.columns['i2']._entity._name).toBe('E1');
            });
        });

        
        describe("MetaObject.getTypes() : arr<func> <타입 조회>", () => {
            it("- getTypes() : array<function> ", () => {
                const c = new MetaView('V1');
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
        });
        describe("MetaObject.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaView('V1');
        
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
                const c = new MetaView('V1');
        
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
        });
        describe("MetaEntity.setValue(row) <value 설정>", () => {
            it("- setValue(row) : row 설정(단일) ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                var row = view1.newRow();
                row['c1'] = 'R1';
                row['c2'] = 'R2';
                row['c3'] = 'R3';
                view1.setValue(row);
                
                expect(view1.columns.count).toBe(3)
                expect(view2.columns.count).toBe(2)
                expect(view3.columns.count).toBe(1)
                expect(view1.columns['c1'].value).toBe('R1');
                expect(view1.columns['c2'].value).toBe('R2');
                expect(view1.columns['c3'].value).toBe('R3');
                expect(view2.columns['c2'].value).toBe('R2');
                expect(view2.columns['c3'].value).toBe('R3');
                expect(view3.columns['c3'].value).toBe('R3');
            });
            it("- setValue(row) :row 설정(단일), 별칭 사용 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.columns['c3'].alias = 'cc3';    // 별칭
                var row = view1.newRow();
                row['c1'] = 'R1';
                row['c2'] = 'R2';
                row['cc3'] = 'RR3';  // <= 별칭
                view1.setValue(row);
        
                expect(view1.columns['c1'].value).toBe('R1');
                expect(view1.columns['c2'].value).toBe('R2');
                expect(view1.columns['c3'].value).toBe('RR3');
                expect(view2.columns['c2'].value).toBe('R2');
                expect(view2.columns['c3'].value).toBe('RR3');
                expect(view3.columns['c3'].value).toBe('RR3');
            });
        });
        describe("MetaEntity.merge(entity, opt) <병합>", () => {
            it("- merge() : opt = 0 (같은 구조) ", () => {
                // TODO:  MetaTable과 중복됨!!
            });
        });
        describe("MetaEntity.select(filter, args) <뷰 조회>", () => {
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
                view1.read(json1, 3);
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
                view1.read(json1, 3);
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
                view1.read(json1, 3);
                var view2 = view1.select('i1');
    
                expect(view2.columns.count).toBe(1);
                expect(view2.rows.count).toBe(2);
                expect(view2.columns['i1'].caption).toBe('C1');
                expect(view2.rows[0]['i1']).toBe(1);
                expect(view2.rows[1]['i1']).toBe(10);
            });
        });

        describe("MetaTable.equal() <객체 비교>", () => {
            it("- equal() : 생성 후 비교 ", () => {
                const c1 = new MetaView();
                const c2 = new MetaView();
                
                expect(c1.equal(c2)).toBe(true);
                expect(c1._guid === c2._guid).toBe(false);
                expect(c1 === c2).toBe(false);
            });
            it("- equal() : 이름이 다른 경우 ", () => {
                const c1 = new MetaView('T1');
                const c2 = new MetaView();
                
                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : columns 추가 후 비교 ", () => {
                const c1 = new MetaView('T1');
                const c2 = new MetaView('T1');
                c2.columns.add('a1');

                expect(c1.equal(c2)).toBe(false);
            });
            it("- equal() : rows 추가 후 비교 ", () => {
                const c1 = new MetaView('T1');
                const c2 = new MetaView('T1');
                c1.columns.add('a1');
                c2.columns.add('a1');

                expect(c1.equal(c2)).toBe(true);
                // row 추가
                var row = c1.newRow();
                row['a1'] = 'R1';
                c1.rows.add(row);
                expect(c1.equal(c2)).toBe(false);
            });
            /**
             * - _refEntity 다른 경우
             * - _refEntities 다른 경우
             * - 참조로 등록한 경우
             * 
             */
        });

        describe("MetaView.getObject(): obj<ref> <객체 얻기>", () => {
            it("- getObject() : 다른 뷰를 참조로 추가할 경우 ", () => {
                const v1 = new MetaView('V1');
                v1.columns.add('a1');
                v1.columns.add('a2');
                v1.columns['a2'].caption = 'C1';
                const v2 = new MetaView('V2')
                v2.columns.add(v1.columns['a2']);   // 참조로 추가
                v2.columns.add('a3');
                var row = v2.newRow();
                row['a2'] = 'R2';
                row['a3'] = 'R3';
                v2.rows.add(row);
                const obj = v2.getObject();

                expect(obj._type).toBe('Meta.Entity.MetaView');
                expect(obj.name).toBe('V2');
                expect(obj.viewName).toBe('V2');
                expect(obj.columns._elem[0]._type).toBe('Meta.Entity.MetaColumn');
                expect(obj.columns._elem[0].name).toBe('a2');
                expect(obj.columns._elem[0].columnName).toBe('a2');
                expect(obj.columns._elem[0].caption).toBe('C1');
                expect(obj.columns._elem[1]._type).toBe('Meta.Entity.MetaColumn');
                expect(obj.columns._elem[1].name).toBe('a3');
                expect(obj.columns._elem[1].columnName).toBe('a3');
                expect(obj.columns._key).toEqual(['a2', 'a3']);
                expect(obj.rows._elem[0]._type).toBe('Meta.Entity.MetaRow');
                expect(obj.rows._elem[0]._elem).toEqual(['R2', 'R3']);
                expect(obj.rows._elem[0]._key).toEqual(['a2', 'a3']);
            });
        });
        describe("MetaView.setObject(mObj) <객체 설정>", () => {
            // 외부 참조가 있는것은 setObject() 실패함
            it.skip("- setObject() : 다른 뷰를 참조로 추가할 경우 ", () => {
                const v1 = new MetaView('V1');
                v1.columns.add('a1');
                v1.columns.add('a2');
                v1.columns['a2'].caption = 'C1';
                const v2 = new MetaView('V2')
                v2.columns.add(v1.columns['a2']);   // 참조로 추가
                v2.columns.add('a3');
                var row = v2.newRow();
                row['a2'] = 'R2';
                row['a3'] = 'R3';
                v2.rows.add(row);
                const rObj = v2.getObject();
                // 참조 변환 > 객체 초기화 > 네임스페이스 로드
                const mObj = MetaRegistry.transformRefer(rObj);  
                // MetaRegistry.init();
                // loadNamespace();
                const v3 = new MetaView('V3');
                v3.setObject(mObj);
                const obj = v3.getObject();
            });
            it("- setObject() : 다른 타입에 setObject() 경우 <예외>", () => {
                const v1 = new MetaView('V1');
                const t1 = new MetaTable('T2')
                const rObj = v1.getObject();
                const mObj = MetaRegistry.transformRefer(rObj);  

                expect(() => t1.setObject(mObj)).toThrow('ES046');
            });
        });
        describe("MetaView.clone() <뷰 복제>", () => {
            it("- clone() : 복제, 일반 뷰 ", () => {
                var view1 = new MetaView('E1');
                view1.columns.add('i1');
                view1.columns.add('i2');
                view1.columns['i2'].caption = 'C1';
                var row = view1.newRow();
                row['i1'] = 'R1';
                row['i2'] = 'R2';
                view1.rows.add(row);
                var view2 = view1.clone();
        
                // view1
                expect(view1.viewName).toBe('E1');
                expect(view1.columns.count).toBe(2);
                expect(view1.rows.count).toBe(1);
                expect(view1.columns['i2'].caption).toBe('C1');
                expect(view1.rows[0]['i1']).toBe('R1');
                expect(view1.rows[0]['i2']).toBe('R2');
                // view2
                expect(view2.viewName).toBe('E1');
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
        });
        describe("MetaView.copy(filter, args) <뷰 복사>", () => {
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
                view1.read(json1, 3);
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
                expect(view2.columns['i1'] === view1.columns['i1']).toBe(true); // REVIEW: copy 한 column 의 참조 여부
                expect(view2.columns['i2'] === view1.columns['i2']).toBe(true);
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
                view1.read(json1, 3);
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
                view1.read(json1, 3);
                var view2 = view1.copy('i1');
    
                expect(view2.columns.count).toBe(1);
                expect(view2.rows.count).toBe(2);
                expect(view2.columns['i1'].caption).toBe('C1');
                expect(view2.rows[0]['i1']).toBe(1);
                expect(view2.rows[1]['i1']).toBe(10);
            });
        });
        describe("뷰사용방", () => {
            it("-  ", () => {
            });
        });
        // describe("< setValue(row) >", () => {
        //     it("- setValue(row) : row 설정(단일) ", () => {select
                
        //     });
        // });
    });
    describe("뷰사용방식별 clone(), equal(), set/getObect()", () => {
        describe("일반뷰 : 모든컬럼 소유(참조 없음)", () => {
            it("- clone(), equal() ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const view2 = view1.clone();

                expect(view2._name).toBe('V1');
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
            });
            it("- getObject(), setObject() ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const obj1 = view1.getObject();
                const view2 = new MetaView('V2');
                view2.setObject(obj1);

                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
            });
        });
        describe("일반뷰 전체 참조", () => {
            it("- clone(), equal()  ", () => {
                const view0 = new MetaView('V1');
                const view1 = new MetaView('V1', view0);
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const view2 = view1.clone();

                // view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(2);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(false);
                // view2
                expect(view2._name).toBe('V1');
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
            it.skip("- getObject(), setObject() ", () => {
                const view0 = new MetaView('V1');
                const view1 = new MetaView('V1', view0);
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const obj1 = view1.getObject();
                const view2 = new MetaView('V2');
                view2.setObject(obj1);

                // view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(2);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(true);
                // view2
                expect(view2._name).toBe('V1'); // 이름 바뀜
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
        });
        describe("일반뷰 일부 참조", () => {
            it("- clone(), equal()  ", () => {
                const view0 = new MetaView('V1');
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2', view0.columns);
                view1.columns['c2'].caption = 'C2';
                const view2 = view1.clone();

                // view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(1);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(false);
                expect(view0.columns['c2'].equal(view1.columns['c2'])).toBe(true);
                expect(view0.columns['c2'] === view1.columns['c2']).toBe(true);
                // view2
                expect(view2._name).toBe('V1');
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
            it.skip("- getObject(), setObject() ", () => {
                const view0 = new MetaView('V1');
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2', view0.columns);
                view1.columns['c2'].caption = 'C2';
                const obj1 = view1.getObject();
                const view2 = new MetaView('V2');
                view2.setObject(obj1);

                expect(view2._name).toBe('V1'); // 이름 바뀜
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
        });
        describe("참조뷰 전체 참조", () => {
            it("- clone(), equal()  ", () => {
                const view3 = new MetaView('V1');
                const view0 = new MetaView('V1', view3);
                const view1 = new MetaView('V1', view0);
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const view2 = view1.clone();

                // view3
                expect(view3.viewName).toBe('V1');  
                expect(view3.columns.count).toBe(2);
                expect(view3.columns['c2'].caption).toBe('C2');
                expect(view3.equal(view1)).toBe(false);
                // view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(2);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(false);
                // view2
                expect(view2._name).toBe('V1');
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
            it.skip("- getObject(), setObject() ", () => {
                const view3 = new MetaView('V1');
                const view0 = new MetaView('V1', view3);
                const view1 = new MetaView('V1', view0);
                view1.columns.add('c1');
                view1.columns.add('c2');
                view1.columns['c2'].caption = 'C2';
                const obj1 = view1.getObject();
                const view2 = new MetaView('V2');
                view2.setObject(obj1);

                // view3
                expect(view3.viewName).toBe('V1');  
                expect(view3.columns.count).toBe(2);
                expect(view3.columns['c2'].caption).toBe('C2');
                expect(view3.equal(view1)).toBe(true);
                // view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(2);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(true);
                // view2
                expect(view2._name).toBe('V1');
                expect(view2.viewName).toBe('V1');
                expect(view2.columns.count).toBe(2);
                expect(view2.columns['c2'].caption).toBe('C2');
                expect(view2.equal(view1)).toBe(true);
                expect(view2 !== view1).toBe(true);
            });
        });
        describe("clone(), equal()", () => {
            it("- 참조뷰 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const clone1 = view1.clone()
                const clone2 = view2.clone()
                const clone3 = view3.clone()
                const c1 = clone1.columns['c1'];
                const c2 = clone2.columns['c2'];
                const c3 = clone3.columns['c3'];

                expect(clone1.columns.count).toBe(3)
                expect(clone2.columns.count).toBe(2)
                expect(clone3.columns.count).toBe(1)
                expect(clone1.equal(view1)).toBe(true);
                expect(clone2.equal(view2)).toBe(true);
                expect(clone3.equal(view3)).toBe(true);
                // 참조가 사라짐 REVIEW:
                expect(c1._entity === clone1).toBe(true)  // V1
                expect(c2._entity === view1).toBe(true)  // V1
                expect(c3._entity === view1).toBe(true)  // V3

            });
        });
        describe("getObject(), setObject()", () => {
            it("- 참조뷰 : 예외", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const obj1 = view1.getObject();
                const obj2 = view2.getObject();
                const obj3 = view3.getObject();
                var set1 = new MetaView('V4');
                var set2 = new MetaView('V5');
                var set3 = new MetaView('V6');
                set1.setObject(obj1);
                // set2.setObject(obj2);
                // set3.setObject(obj3);
                expect(()=> set2.setObject(obj2)).toThrow('ES015')
                expect(()=> set3.setObject(obj3)).toThrow('ES015')

                // MetaRegistry.init();
                // var set1 = new MetaView('V4');
                // var set2 = new MetaView('V5');
                // var set3 = new MetaView('V6');
                // set1.setObject(obj1);
                // set2.setObject(obj2);
                // set3.setObject(obj3);

                // expect(set1.columns.count).toBe(3)
                // expect(set2.columns.count).toBe(2)
                // expect(set3.columns.count).toBe(1)
                // expect(set1.equal(view1)).toBe(true);
                // expect(set2.equal(view2)).toBe(true);
                // expect(set3.equal(view3)).toBe(true);
                // expect(view1.columns['c1']._entity === view1).toBe(true)
                // expect(view2.columns['c2']._entity === view1).toBe(true)
                // expect(view3.columns['c3']._entity === view1).toBe(true)
                // expect(set1.columns['c1']._entity === set1).toBe(true)
                // expect(set2.columns['c2']._entity === set1).toBe(true)
                // expect(set3.columns['c3']._entity === set1).toBe(true)
            });
        });
        
    });
    describe("중복과 이름 변경", () => {
        describe("clumnName 중복 검사", () => {
            it("- 일반뷰 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2');
                const c1 = view1.columns['c1'];
                const c2 = view1.columns['c2'];

                expect(()=> view1.columns.add('c1')).toThrow('ES042')
                expect(()=> c2.columnName = 'c1').toThrow('ES042')
                // 컬럼명 변경
                c1.columnName = 'cc1';
                c2.columnName = 'c1';
                expect(c1.columnName).toBe('cc1');
                expect(c2.columnName).toBe('c1');
                expect(view1.columns.keyOf(0)).toBe('c1');
                expect(view1.columns.keyOf(1)).toBe('c2');
            });
            it("- 참조뷰 ", () => {   // REVIEW: 좋은 참조 샘플
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns);         // 일부 참조
                const c1 = view1.columns['c1'];
                const c2 = view2.columns['c2'];
                const c3 = view3.columns['c3'];
                
                expect(view1.columns.count).toBe(3)
                expect(view2.columns.count).toBe(2)
                expect(view3.columns.count).toBe(1)
                expect(c1._entity === view1).toBe(true)
                expect(c2._entity === view1).toBe(true)
                expect(c3._entity === view1).toBe(true)
                expect(()=> view1.columns.add('c1')).toThrow('ES042')
                expect(()=> view1.columns.add('c2')).toThrow('ES042')
                expect(()=> view1.columns.add('c3')).toThrow('ES042')
                expect(()=> c1.columnName = 'c2').toThrow('ES042')
                expect(()=> c1.columnName = 'c3').toThrow('ES042')
                expect(()=> view2.columns.add('c2')).toThrow('ES042')
                expect(()=> view2.columns.add('c3')).toThrow('ES042')
                expect(()=> c2.columnName = 'c1').toThrow('ES042')
                expect(()=> c2.columnName = 'c3').toThrow('ES042')
                expect(()=> view3.columns.add('c3')).toThrow('ES042')
                expect(()=> c3.columnName = 'c1').toThrow('ES042')
                expect(()=> c3.columnName = 'c2').toThrow('ES042')
            });
        });
        describe("alias 중복 검사", () => {
            it("- 일반뷰 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                view1.columns.add('c2');
                const c1 = view1.columns['c1'];
                const c2 = view1.columns['c2'];

                expect(()=> c2.alias = 'c1').toThrow('ES042')
                // alias 변경
                c1.alias = 'cc1';
                c2.alias = 'c1';
                expect(c1.alias).toBe('cc1');
                expect(c2.alias).toBe('c1');
                expect(c1.columnName).toBe('c1');
                expect(c2.columnName).toBe('c2');
                expect(view1.columns.keyOf(0)).toBe('c1');
                expect(view1.columns.keyOf(1)).toBe('c2');
            });
            it("- 참조뷰 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2',view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns);         // 일부 참조
                const c1 = view1.columns['c1'];
                const c2 = view2.columns['c2'];
                const c3 = view3.columns['c3'];
                
                expect(()=> c1.alias = 'c2').toThrow('ES042')
                expect(()=> c1.alias = 'c3').toThrow('ES042')
                expect(()=> c2.alias = 'c1').toThrow('ES042')
                expect(()=> c2.alias = 'c3').toThrow('ES042')
                expect(()=> c3.alias = 'c1').toThrow('ES042')
                expect(()=> c3.alias = 'c2').toThrow('ES042')
            });
        });
    });
});

/**
 * REVIEW: 테스트가 허술해 보임
 */