/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {MetaObject}              = require('../src/meta-object');
const {MetaElement}             = require('../src/meta-element');
const {BaseEntity}              = require('../src/base-entity');
const {IObject}                 = require('../src/i-object');
const {IMarshal}                = require('../src/i-marshal');
const Util                      = require('../src/util');
const { MetaTable }             = require('../src/meta-table');
const { MetaView }              = require('../src/meta-view');
const { MetaRow }               = require('../src/meta-row');
const { MetaColumn }            = require('../src/meta-column');  
const { replacer, reviver, stringify, parse }              = require('telejson');
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

        // 기본 샘플
        // it("- equal() : 이름이 다른 경우 ", () => {
        //     const view1 = new MetaView('V1');
        //     view1.columns.add('c1');
        //     const view2 = new MetaView('V2', view1); // 전체 참조
        //     view2.columns.add('c2');
        //     const view3 = new MetaView('V3');
        //     view3.columns.add('c3', view2.columns); // 일부 참조
        // });

        

        describe("MetaObject.equal() <객체 비교>", () => {
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
            it("- equal() : 참조 객체의 경우 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조

                expect(view1.equal(view1)).toBe(true);
                expect(view1.equal(view2)).toBe(false);
                expect(view1.equal(view3)).toBe(false);
            });

        });
        describe("MetaObject.getTypes() : arr<func> <타입 조회>", () => {
            it("- getTypes() : array<function> ", () => {
                const c = new MetaView('V1');
                const types = c.getTypes();
        
                expect(types[0]).toBe(MetaView);
                expect(types[1]).toBe(BaseEntity);
                expect(types[2]).toBe(MetaElement);
                expect(types[3]).toBe(MetaObject);
                expect(types[4]).toBe(Object);
                expect(types.length).toBe(5);
            });
        });
        describe("MetaObject.instanceOf(string): bool <상위 함수(클래스, 인터페이스) 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaView('V1');
        
                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('IMarshal')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaElement')).toBe(true);
                expect(c.instanceOf('BaseEntity')).toBe(true);
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
                expect(c.instanceOf(BaseEntity)).toBe(true);
                expect(c.instanceOf(MetaView)).toBe(true);
                // false
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
        });
        describe("BaseEntity.clear() <데이터 지우기>", () => {
            it("- clear() : 독립, base참조, ref 참조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.rows.add(view1.newRow());     // row 추가 
                view2.rows.add(view2.newRow());
                view3.rows.add(view3.newRow());
                
                expect(view1.rows.count).toBe(1);   // rows 갯수
                expect(view2.rows.count).toBe(1);
                expect(view3.rows.count).toBe(1);
                expect(view1.rows[0].count).toBe(3);    // row 컬럼수
                expect(view2.rows[0].count).toBe(2);
                expect(view3.rows[0].count).toBe(1);
                expect(view1.columns._refEntities.length).toBe(0);
                expect(view2.columns._refEntities.length).toBe(1);
                expect(view3.columns._refEntities.length).toBe(1);

                view1.clear();  // clear()
                view2.clear();
                view3.clear();
                expect(view1.rows.count).toBe(0);
                expect(view2.rows.count).toBe(0);
                expect(view3.rows.count).toBe(0);
                expect(view1.columns.count).toBe(3);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                /**
                 * MEMO:
                 * - _refEntities : 침조한 갯수는 엔티티 기준 중복제거된 갯수이다.
                 */
            });
        });
        describe("BaseEntity.reset() <전체 초기화>", () => {
            it("- reset() : 독립, base참조, ref 참조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.rows.add(view1.newRow()); // row 추가
                view2.rows.add(view2.newRow());
                view3.rows.add(view3.newRow());

                expect(view1.columns.count).toBe(3);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                expect(view1.rows.count).toBe(1);   // rows 갯수
                expect(view2.rows.count).toBe(1);
                expect(view3.rows.count).toBe(1);
                view1.reset();  // reset()
                view2.reset();
                view3.reset();
                expect(view1.columns.count).toBe(0);    // 컬럼수
                expect(view2.columns.count).toBe(0);
                expect(view3.columns.count).toBe(0);
                expect(view1.rows.count).toBe(0);
                expect(view2.rows.count).toBe(0);
                expect(view3.rows.count).toBe(0);
            });
            it("- reset() : 최상위 소유처 리셋 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.rows.add(view1.newRow()); // row 추가
                view2.rows.add(view2.newRow());
                view3.rows.add(view3.newRow());

                view1.reset();  // reset()
                expect(view1.columns.count).toBe(0);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                expect(view1.rows.count).toBe(0);   // rows 갯수
                expect(view2.rows.count).toBe(1);
                expect(view3.rows.count).toBe(1);
                /**
                 * MEMO:
                 * - 소유처 view1 을 reset() 하면 참조되는 곳을 그대로 존재한다.
                 * - view1은 columns 에 대한 참조를 끊기는 것이다.
                 */
            });
            it("- reset() : 최상위 소유처 리셋 후 컬럼 삽입", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.rows.add(view1.newRow()); // row 추가
                view2.rows.add(view2.newRow());
                view3.rows.add(view3.newRow());
                view1.reset();  // reset()
                view1.columns.add('cc1');   // 새로운 컬럼
                view1.columns.add(view2.columns['c2']); // 기존 컬럼
                view1.columns.add(view3.columns['c3']);
                view1.rows.add(view1.newRow()); // row 추가

                expect(view1.columns.count).toBe(3);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                expect(view1.rows.count).toBe(1);   // rows 갯수
                expect(view2.rows.count).toBe(1);
                expect(view3.rows.count).toBe(1);
                expect(view1.rows[0]['cc1']).toBeDefined();
                expect(view1.rows[0]['c2']).toBeDefined();
                expect(view1.rows[0]['c3']).toBeDefined();
                expect(view1.columns._refEntities.length).toBe(0);  // 참조 엔티티 확인
                expect(view2.columns._refEntities.length).toBe(1);
                expect(view3.columns._refEntities.length).toBe(1);
                /**
                 * MEMO: 
                 * - 소유처의 컬럼이 최기화 후 다시 추가하면, 참조만 연결하는 것이다.
                 */
            });
        });
        describe("BaseEntity.newRow() <Metarow 생성>", () => {
            it("- newRow() : owner, base, ref ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.rows.add(view1.newRow()); // row 추가
                view2.rows.add(view2.newRow());
                view3.rows.add(view3.newRow());
                view3.rows[0]['c3'] = 'R3'

                expect(view1.rows.count).toBe(1);   // rows 갯수
                expect(view2.rows.count).toBe(1);
                expect(view3.rows.count).toBe(1);
                expect(view1.rows[0]['c3']).toBe(null);
                expect(view2.rows[0]['c3']).toBe(null);
                expect(view3.rows[0]['c3']).toBe('R3');
            });
        });
        describe("BaseEntity.getValue() <value 얻기>", () => {
            it("- getValue() : add() 통해서 등록  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                view1.columns['c1'].value = 'R1';
                view1.columns['c2'].value = 'R2';
                view1.columns['c3'].value = 'R3';
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());

                expect(view1.columns.count).toBe(3);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                expect(view1.rows[0]['c1']).toBe('R1');
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                expect(view2.rows[0]['c2']).toBe('R2');
                expect(view2.rows[0]['c3']).toBe('R3');
                expect(view3.rows[0]['c3']).toBe('R3');
                /**
                 * MEMO: 소유한 곳에 value 를 설정후 getValue() 시점에 값이 잘 들어 가는지 확인
                 */
            });
            it("- getValue() : addValue() 통해서 등록  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns); // 일부 참조
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());

                expect(view1.columns.count).toBe(3);    // 컬럼수
                expect(view2.columns.count).toBe(2);
                expect(view3.columns.count).toBe(1);
                expect(view1.rows[0]['c1']).toBe('R1');
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                expect(view2.rows[0]['c2']).toBe('R2');
                expect(view2.rows[0]['c3']).toBe('R3');
                expect(view3.rows[0]['c3']).toBe('R3');
                /**
                 * MEMO: addValue() 통해서 입력한 value 를 getValue() 통해서 등록 확인
                 */
            });
        });
        describe("BaseEntity.setValue(row) <value 설정>", () => {
            it("- setValue(row) : 소유처에 설정(단일) ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
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
            it("- setValue(row) : 참조처에 설정 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                var row = view3.newRow();
                row['c3'] = 'R3';
                view3.setValue(row);
                
                expect(view1.columns.count).toBe(3)
                expect(view2.columns.count).toBe(2)
                expect(view3.columns.count).toBe(1)
                expect(view1.columns['c1'].value).toBe(null);
                expect(view1.columns['c2'].value).toBe(null);
                expect(view1.columns['c3'].value).toBe('R3');
                expect(view2.columns['c2'].value).toBe(null);
                expect(view2.columns['c3'].value).toBe('R3');
                expect(view3.columns['c3'].value).toBe('R3');
                /**
                 * MEMO: 참조하는 뷰에 설정할 경우, 소유하는 뷰에서의 연동 확인
                 */
            });
            it("- setValue(row) :row 설정(단일), 별칭 사용 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns);     // 일부 참조
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
                /**
                 * MEMO: 컬럼에 별칭설정하면 row 입력시에 별칭으로 등록여부 확인
                 */
            });
        });
        describe("BaseEntity.merge(entity, opt) <병합>", () => {
            it("- merge(view, 0) : 다른 구조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns);     // 일부 참조
                view3.columns.addValue('c4', 'R4');
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                view1.merge(view2, 0);
                view1.merge(view3, 0);

                expect(view1.columns.count).toBe(3);
                expect(view1.rows.count).toBe(3);
                expect(view1.rows[0]['c1']).toBe('R1');
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                expect(view1.rows[1]['c1']).toBe(null);
                expect(view1.rows[1]['c2']).toBe('R2');
                expect(view1.rows[1]['c3']).toBe('R3');
                expect(view1.rows[2]['c1']).toBe(null);
                expect(view1.rows[2]['c2']).toBe(null);
                expect(view1.rows[2]['c3']).toBe('R3');
                /**
                 * MEMO: 로우 기준 병합, 로우가 쌓여감 확인 => 로우 병합
                 */
            });
            it("- merge(view, 0, true) : (다른 구조) 유효성 검사 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns);     // 일부 참조
                view3.columns.addValue('c4', 'R4');
                view2.columns['c2'].isNotNull = true;
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                view1.merge(view2, 0, true);
                
                expect(()=> view1.merge(view3, 0, true)).toThrow(/ES054(.|\s)*ES055/);
                expect(view1.columns.count).toBe(3);
                expect(view1.rows.count).toBe(2);
                expect(view1.rows[0]['c1']).toBe('R1');
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                expect(view1.rows[1]['c1']).toBe(null);
                expect(view1.rows[1]['c2']).toBe('R2');
                expect(view1.rows[1]['c3']).toBe('R3');
                /**
                 * MEMO: 로우 기준 병합, 컬럼의 유효성 검사후 병합 확인
                 */
            });
            it("- merge(view, 1) : 다른 구조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns);     // 일부 참조
                view3.columns.addValue('c4', 'R4');
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                
                expect(()=>view1.merge(view2, 1)).toThrow(/ES042/);
                expect(()=>view1.merge(view3, 1)).toThrow(/ES042/);
                expect(view1.columns.count).toBe(3);
                expect(view1.rows.count).toBe(1);
                expect(view1.rows[0]['c1']).toBe('R1');
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                /**
                 * MEMO: 컬럼 기준 병합, 뷰는 컬럼을 공유해서 컬럼병합에 맞지 않음
                 */
            });
            it("- merge(view, 2) : 다른 구조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns);     // 일부 참조
                view3.columns.addValue('c4', 'R4');
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                view1.merge(view2, 2);
                view1.merge(view3, 2);

                expect(view1.columns.count).toBe(4);
                expect(view1.rows.count).toBe(3);
                expect(view1.rows[0]['c1']).toBe('R1'); // rows[0]
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                expect(view1.rows[0]['c4']).toBe(null);
                expect(view1.rows[1]['c1']).toBe(null); // rows[1]
                expect(view1.rows[1]['c2']).toBe('R2');
                expect(view1.rows[1]['c3']).toBe('R3');
                expect(view1.rows[1]['c4']).toBe(null);
                expect(view1.rows[2]['c1']).toBe(null); // rows[2]
                expect(view1.rows[2]['c2']).toBe(null);
                expect(view1.rows[2]['c3']).toBe('R3');                
                expect(view1.rows[2]['c4']).toBe('R4');                
                /**
                 * MEMO: 로우기준 병합 및 초과 컬럼 채워짐, 특수한 경우 사용함
                 */
            });
            it("- merge(view, 3) : 다른 구조 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'R1');
                const view2 = new MetaView('V2', view1);    // 전체 참조
                view2.columns.addValue('c2', 'R2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'R3', view2.columns);     // 일부 참조
                view3.columns.addValue('c4', 'R4');
                view1.rows.add(view1.getValue()); // row 추가
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());

                expect(()=>view1.merge(view2, 3)).toThrow(/ES042/);
                expect(()=>view1.merge(view3, 3)).toThrow(/ES042/);
                expect(view1.columns.count).toBe(3);
                expect(view1.rows.count).toBe(1);
                expect(view1.rows[0]['c1']).toBe('R1'); // rows[0]
                expect(view1.rows[0]['c2']).toBe('R2');
                expect(view1.rows[0]['c3']).toBe('R3');
                /**
                 * MEMO: 컬럼기준 병합 및 초과 로우 채워짐, 특수한 경우 사용함
                 */
            });
        });
        describe("BaseEntity.select(filter, args) <뷰 조회>", () => {
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
            it("- select([], filter) : 필터 설정 ", () => {
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
                var view2 = view1.select([], row => row['i1'] < 10);
    
                expect(view2.columns.count).toBe(2);
                expect(view2.rows.count).toBe(1);
                expect(view2.columns['i1'].caption).toBe('C1');
                expect(view2.columns['i2'].caption).toBe('C2');
                expect(view2.rows[0]['i1']).toBe(1);
                expect(view2.rows[0]['i2']).toBe(2);
                /**
                 * MEMO: filter 함수 조건에 따라 조회 확인
                 */
            });
            it("- select(name) : 컬럼명 설정", () => {
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
                var view2 = view1.select(['i1']);
    
                expect(view2.columns.count).toBe(1);
                expect(view2.rows.count).toBe(2);
                expect(view2.columns['i1'].caption).toBe('C1');
                expect(view2.rows[0]['i1']).toBe(1);
                expect(view2.rows[1]['i1']).toBe(10);
                /**
                 * MEMO: 지정한 컬럼만 조회 확인
                 */
            });
        });

        describe("BaseEntity.load() <가져오기>", () => {
            it("- load(str) : str로 가져오기 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const str1 = view1.output(stringify, '\t');
                const str2 = view2.output(stringify, '\t');
                const str3 = view3.output(stringify, '\t');
                const v1 = new MetaView('VV1');
                const v2 = new MetaView('VV2');
                const v3 = new MetaView('VV3');
                v1.load(str1, parse)

                expect(v1.viewName).toBe('V1');
                expect(v1.columns.count).toBe(3);
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v1.columns['c2']._entity === v1).toBe(true);
                expect(v1.columns['c3']._entity === v1).toBe(true);
                // 참조가 있어서 로드 실패
                expect(()=> v2.load(str2, parse)).toThrow(/ES015/)
                expect(()=> v3.load(str3, parse)).toThrow(/ES015/)
                /**
                 * MEMO: 외부에 참조(컬럼)가 있는 경우 예외 확인
                 */
            });
            it("- load(view) : MetaView로 가져오기 <에외> ", () => {
                const view1 = new MetaView('V1');
                const v1 = new MetaView('VV1');
                
                expect(()=> v1.load(view1)).toThrow('ES022');
                /**
                 * MEMO: MetaViw 로딩 예외 확인
                 */
            });

        });
        describe("BaseEntity.output() <내보내기>", () => {
            it("- output() : getObject() 결과 비교  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const c1 = view1.columns['c1'];
                const str1 = view1.output();
                const rObj = view1.getObject();
                const str2 = JSON.stringify(rObj);

                expect(str1).toBe(str2);
            });
        });
        describe("BaseEntity.read(view | oGuid | oSch, rOpt) <읽기>", () => {
            it("- read(view, 3) : 엔티티 읽기 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const v1 = new MetaView('V1')
                const v2 = new MetaView('V2')
                const v3 = new MetaView('V3')
                v1.read(view1);
                v2.read(view2);
                v3.read(view3);

                expect(v1.columns.count).toBe(3)
                expect(v2.columns.count).toBe(2)
                expect(v3.columns.count).toBe(1)
                expect(v1.columns['c1']._entity === view1).toBe(true);
                expect(v2.columns['c2']._entity === view1).toBe(true);
                expect(v3.columns['c3']._entity === view1).toBe(true);
                /**
                 * MEMO: 
                 * - entity 를 read 할 경우, _entity 는 원본 참조 확인
                 * - 즉, 뷰에 뷰가 되는 경우
                 */
            });
            it("- read(view, 3) : 엔티티 읽기 (기존 존재시) ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const v1 = new MetaView('V1')
                v1.columns.add('cc1');
                const v2 = new MetaView('V2', v1)
                v2.columns.add('cc2');
                const v3 = new MetaView('V3')
                v3.columns.add('cc3', v2.columns); // 일부 참조
                v1.read(view1);
                v2.read(view2);
                v3.read(view3);

                expect(v1.columns.count).toBe(6)
                expect(v2.columns.count).toBe(4)
                expect(v3.columns.count).toBe(2)
                expect(v1.columns['c1']._entity === view1).toBe(true);
                expect(v2.columns['c2']._entity === view1).toBe(true);
                expect(v3.columns['c3']._entity === view1).toBe(true);
                expect(v1.columns['cc1']._entity === v1).toBe(true);
                expect(v2.columns['cc2']._entity === v1).toBe(true);
                expect(v3.columns['cc3']._entity === v1).toBe(true);
                /**
                 * MEMO: 
                 * - 기존에 잘 내용에 추가여부 확인
                 * - v1 의 참조와 view1 참조가 독립적인지 확인
                 */
            });
            it("- read(oGuid, 3) : oGuid 읽기 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const v1 = new MetaView('V1')
                const v2 = new MetaView('V2')
                const v3 = new MetaView('V3')
                const vv1 = new MetaView('V1')
                v1.read(view1.getObject(0));
                vv1.read(view1.getObject(1));

                expect(v1.columns.count).toBe(3)
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v1.columns['c2']._entity === v1).toBe(true);
                expect(v1.columns['c3']._entity === v1).toBe(true);
                expect(v1.getObject(2)).toEqual(vv1.getObject(2));
                expect(()=> v2.read(view2.getObject())).toThrow(/ES015/)
                expect(()=> v3.read(view3.getObject())).toThrow(/ES015/)
                /**
                 * MEMO:
                 * - oGuid 를 read 할 경우, _entity 는 자신을 참조 확인
                 * - getObject(0) 과 getObject(1) equal() 비교하면 같은 객체 확인
                 * - 참조 연결이 실패해는 v2, v3 는 read() 실패 확인
                 */
            });
            it("- read(oGuid, 3) : oGuid 읽기 (기존 존재시)", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const v1 = new MetaView('V1')
                v1.columns.add('cc1');
                const v2 = new MetaView('V2', v1)
                v2.columns.add('cc2');
                const v3 = new MetaView('V3')
                v3.columns.add('cc3', v2.columns); // 일부 참조
                v1.read(view1.getObject(0));

                expect(v1.columns.count).toBe(6)
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v1.columns['c2']._entity === v1).toBe(true);
                expect(v1.columns['c3']._entity === v1).toBe(true);
                expect(v1.columns['cc1']._entity === v1).toBe(true);
                expect(v1.columns['cc2']._entity === v1).toBe(true);
                expect(v1.columns['cc3']._entity === v1).toBe(true);
                expect(()=> v2.read(view2.getObject())).toThrow(/ES015/)
                expect(()=> v3.read(view3.getObject())).toThrow(/ES015/)
                /**
                 * MEMO:
                 * - oGuid 를 read 할 경우, _entity 는 자신을 참조 확인
                 * - 기존의 컬럼은 유지 확인
                 * - 참조 연결이 실패해는 v2, v3 는 read() 실패 확인
                 */
            });
            it("- read(oSchema, 3) : 스키마 읽기 ", () => {
                var sch1 = { 
                    columns: {
                        c1: { caption: 'C1'},
                    },
                    rows: [
                        { c1: 'R1' },
                    ]
                };
                const v1 = new MetaView('V1')
                v1.read(sch1);

                expect(v1.columns.count).toBe(1)
                expect(v1.rows.count).toBe(1)
                /**
                 * MEMO: 스키마 로드 확인
                 */
            });
            it("- read(oSchema, 3) : 스키마 읽기 (로우만 존재시)", () => {
                var sch1 = { 
                    rows: [
                        { c1: 'R1', c2: 'R2', c3: 'R3' },
                    ]
                };
                const v1 = new MetaView('V1')
                v1.read(sch1);

                expect(v1.columns.count).toBe(3)
                expect(v1.rows.count).toBe(1)
                expect(v1.columns['c1']._entity === v1).toBe(true);
                expect(v1.columns['c2']._entity === v1).toBe(true);
                expect(v1.columns['c3']._entity === v1).toBe(true);
                /**
                 * MEMO: 컬럼과 로우 로드 확인
                 */
            });
            it("- read(oSchema, 3) : 존재하는 컬럼의 로우만 읽기", () => {
                var sch1 = { 
                    columns: {
                        c1: { caption: 'C1'},
                        c2: { caption: 'C2'},
                    },
                    rows: [
                        { c1: 'R1', c2: 'R2', c3: 'R3' },
                    ]
                };
                var sch2 = { 
                    rows: [
                        { c1: 'R1', c2: 'R2', c3: 'R3' },
                    ]
                };
                const v1 = new MetaView('V1')
                v1.read(sch1, 1);
                v1.read(sch1, 2);
                const v2 = new MetaView('V2')
                v2.read(sch2, 1);
                v2.read(sch2, 2);
                const v3 = new MetaView('V3')
                v3.readSchema(sch1);
                v3.readData(sch1);
                const v4 = new MetaView('V4')
                v4.readSchema(sch2);
                v4.readData(sch2);

                expect(v1.columns.count).toBe(2)
                expect(v1.rows.count).toBe(1)
                expect(v2.columns.count).toBe(0)
                expect(v2.rows.count).toBe(0)
                expect(v3.columns.count).toBe(2)
                expect(v3.rows.count).toBe(1)
                expect(v4.columns.count).toBe(0)
                expect(v4.rows.count).toBe(0)
                /**
                 * MEMO: 존재하는 컬럼의 로우만 가져오기 확인
                 *  + 방법1> read(1), read(2)
                 *  + 방법2> readSchema(o), readData(o)
                 */
            });
            it("- read() : 예외", () => {
                const v1 = new MetaView('V1')

                expect(()=>v1.read({}, 0)).toThrow(/ES067/)
                expect(()=>v1.read({}, 4)).toThrow(/ES067/)
                expect(()=>v1.read({})).toThrow(/ES021/)
                expect(()=>v1.read([])).toThrow(/ES021/)
                expect(()=>v1.read()).toThrow(/ES021/)
                /**
                 * MEMO: 
                 * - opt 예외 확인
                 * - 입력객체 예외 확인
                 */
            });
            /**
             * - 참조형 스키마 로딩 => metaSet에서 의미있음 TODO: metaSet test 에 추가
             */
        });
        describe("BaseEntity.readSchema() <스카마 읽기>", () => {
            it("- readSchema() : 예외 ", () => {
                const v1 = new MetaView('V1')

                expect(()=>v1.readSchema({})).toThrow(/ES021/)
                expect(()=>v1.readSchema([])).toThrow(/ES021/)
                expect(()=>v1.readSchema()).toThrow(/ES021/)
                /**
                 * MEMO: read() 테스트와 중복
                 */
            });
        });
        describe("BaseEntity.readData() <데이터 읽기>", () => {
            it("- readData() :  예외", () => {
                const v1 = new MetaView('V1')

                expect(()=>v1.readData({})).toThrow(/ES021/)
                expect(()=>v1.readData([])).toThrow(/ES021/)
                expect(()=>v1.readData()).toThrow(/ES021/)
                /**
                 * MEMO: read() 테스트와 중복
                 */
            });
        });
        describe("BaseEntity.write() <쓰기>", () => {
            it("- write(0) : 기본값 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const json1 = {
                    _guid: view1._guid,
                    columns: {
                        $key: ['c1', 'c2', 'c3'],
                        c1: { 
                            _guid: view1.columns.c1._guid, value: 'V1',
                        },
                        c2: { 
                            _guid: view1.columns.c2._guid, value: 'V2',
                        },
                        c3: { 
                            _guid: view1.columns.c3._guid, value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { c1: 'V1', c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json2 = {
                    _guid: view2._guid,
                    _baseEntity: {$ref: view1._guid},
                    columns: {
                        $key: ['c2', 'c3'],
                        c2: {$ref: view1.columns.c2._guid},
                        c3: {$ref: view1.columns.c3._guid},
                    },
                    rows: [
                        { c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json3 = {
                    _guid: view3._guid,
                    columns: {
                        $key: ['c3'],
                        c3: {$ref: view1.columns.c3._guid},
                    },
                    rows: [
                        { cc3: 'V3' },
                    ]
                }
                const obj1 = view1.write(); // 0
                const obj2 = view2.write();
                const obj3 = view3.write();

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
                /**
                 * MEMO: 기본옵셥으로 쓰기할 경우 모든 참조 표현 확인
                 */
            });
            it("- write(1) :  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const json1 = {
                    _guid: view1._guid,
                    columns: {
                        $key: ['c1', 'c2', 'c3'],
                        c1: { 
                            _guid: view1.columns.c1._guid, value: 'V1',
                        },
                        c2: { 
                            _guid: view1.columns.c2._guid, value: 'V2',
                        },
                        c3: { 
                            _guid: view1.columns.c3._guid, value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { c1: 'V1', c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json2 = {
                    _guid: view2._guid,
                    _baseEntity: {$ref: view1._guid},
                    columns: {
                        $key: ['c2', 'c3'],
                        c2: { 
                            _entity: {$ref: view1._guid},
                            _guid: view2.columns.c2._guid, value: 'V2',
                        },
                        c3: { 
                            _entity: {$ref: view1._guid},
                            _guid: view2.columns.c3._guid, value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json3 = {
                    _guid: view3._guid,
                    // _baseEntity: {$ref: view1._guid},
                    columns: {
                        $key: ['c3'],
                        c3: { 
                            _entity: {$ref: view1._guid},
                            _guid: view2.columns.c3._guid, value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { cc3: 'V3' },
                    ]
                }
                const obj1 = view1.write(1);
                const obj2 = view2.write(1);
                const obj3 = view3.write(1);

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
                /**
                 * MEMO :별칭을 사용해서 쓰기, 옵션 = 1 소유자 기준 나열 확인
                 */
            });
            it("- write(3) : guid, ref 제거 쓰기 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const json1 = {
                    columns: {
                        $key: ['c1', 'c2', 'c3'],
                        c1: { 
                            value: 'V1',
                        },
                        c2: { 
                            value: 'V2',
                        },
                        c3: { 
                            value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { c1: 'V1', c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json2 = {
                    columns: {
                        $key: ['c2', 'c3'],
                        c2: { 
                            value: 'V2',
                        },
                        c3: { 
                            value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json3 = {
                    columns: {
                        $key: ['c3'],
                        c3: { 
                            value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: [
                        { cc3: 'V3' },
                    ]
                }
                const obj1 = view1.write(2);
                const obj2 = view2.write(2);
                const obj3 = view3.write(2);

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
                /**
                 * MEMO :
                 * - 별칭을 사용해서 쓰기, 옵션 = 2 guid, ref 제거한 쓰기 확인
                 * - 뷰에서 참조관계를 자르고 만들때 활용
                 */
            });
        });
        describe("BaseEntity.writeSchema() <스키마 쓰기>", () => {
            it("- writeSchema() :  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const json1 = {
                    _guid: view1._guid,
                    columns: {
                        $key: ['c1', 'c2', 'c3'],
                        c1: { 
                            _guid: view1.columns.c1._guid, value: 'V1',
                        },
                        c2: { 
                            _guid: view1.columns.c2._guid, value: 'V2',
                        },
                        c3: { 
                            _guid: view1.columns.c3._guid, value: 'V3',
                            alias: 'cc3'
                        },
                    },
                    rows: []
                }
                const json2 = {
                    _guid: view2._guid,
                    _baseEntity: {$ref: view1._guid},
                    columns: {
                        $key: ['c2', 'c3'],
                        c2: {$ref: view1.columns.c2._guid},
                        c3: {$ref: view1.columns.c3._guid},
                    },
                    rows: []
                }
                const json3 = {
                    _guid: view3._guid,
                    columns: {
                        $key: ['c3'],
                        c3: {$ref: view1.columns.c3._guid},
                    },
                    rows: []
                }
                const obj1 = view1.writeSchema(); // 0
                const obj2 = view2.writeSchema();
                const obj3 = view3.writeSchema();

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
                /**
                 * MEMO: 
                 * - column만 가져오는지 확인
                 * - 옵션의 경우 write() 와 동일 예상
                 */
            });
        });
        describe("BaseEntity.writeData() <데이터 쓰기>", () => {
            it("- writeData() :  ", () => {
                const view1 = new MetaView('V1');
                view1.columns.addValue('c1', 'V1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.addValue('c2', 'V2');
                const view3 = new MetaView('V3');
                view3.columns.addValue('c3', 'V3', view2.columns); // 일부 참조
                view3.columns['c3'].alias = 'cc3';
                view1.rows.add(view1.getValue());
                view2.rows.add(view2.getValue());
                view3.rows.add(view3.getValue());
                const json1 = {
                    _guid: view1._guid,
                    columns: {},
                    rows: [
                        { c1: 'V1', c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json2 = {
                    _guid: view2._guid,
                    _baseEntity: {$ref: view1._guid},
                    columns: {},
                    rows: [
                        { c2: 'V2', cc3: 'V3' },
                    ]
                }
                const json3 = {
                    _guid: view3._guid,
                    columns: {},
                    rows: [
                        { cc3: 'V3' },
                    ]
                }
                const obj1 = view1.writeData(); // 0
                const obj2 = view2.writeData();
                const obj3 = view3.writeData();

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
                /**
                 * MEMO: 
                 * - rows 만 가져오는지 확인
                 * - 옵션의 경우 write() 와 동일 예상
                 */
            });
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
            /**
             * MEMO: view 이름 수정과 메타명 수정 확인
             */
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
                var aa = view2.columns._refEntities
                expect(view2.columns._refEntities[0]._name).toBe('E1');
                expect(view2.columns._refEntities[1]._name).toBe('T3');
                expect(view2.columns['i2'].caption).toBe('C2');
                expect(view2.columns['i3'].caption).toBe('C3');
                expect(view2.columns['i4'].value).toBe('V4');
                expect(view2._baseEntity._name).toBe('E1');
                expect(view2.viewName).toBe('T2');
                expect(view2.columns.count).toBe(5);
                expect(view2.rows.count).toBe(0);
                expect(view2.columns['i1']._entity._name).toBe('E1');
                expect(view2.columns['i2']._entity._name).toBe('E1');
            });
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
                expect(obj.columns._elem[0].$ref).toBe(v1.columns['a2']._guid);
                // 참조형식을 가지고 있음
                // expect(obj.columns._elem[0]._type).toBe('Meta.Entity.MetaColumn');
                // expect(obj.columns._elem[0].name).toBe('a2');
                // expect(obj.columns._elem[0].columnName).toBe('a2');
                // expect(obj.columns._elem[0].caption).toBe('C1');
                // expect(obj.columns._elem[1]._type).toBe('Meta.Entity.MetaColumn');
                // expect(obj.columns._elem[1].name).toBe('a3');
                // expect(obj.columns._elem[1].columnName).toBe('a3');
                // expect(obj.columns._key).toEqual(['a2', 'a3']);
                // expect(obj.rows._elem[0]._type).toBe('Meta.Entity.MetaRow');
                // expect(obj.rows._elem[0]._elem).toEqual(['R2', 'R3']);
                // expect(obj.rows._elem[0]._key).toEqual(['a2', 'a3']);
            });
            
            it("- getObject(0) : 옵션에 따른 값 비교 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const obj1 = view1.getObject();
                const obj2 = view2.getObject();
                const obj3 = view3.getObject();
                const json1 = {
                    "_guid": obj1._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V1",
                    "viewName": "V1",
                    "columns": {
                        "_guid": obj1.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj1._guid},
                        "_elemTypes": [],
                        "_desc": [undefined,undefined,undefined],
                        "_elem": [
                            {
                                "_guid": obj1.columns._elem[0]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c1",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c1"
                            },
                            {
                                "_guid": obj1.columns._elem[1]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c2",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c2"
                            },
                            {
                                "_guid": obj1.columns._elem[2]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c1","c2","c3"]
                    },
                    "rows": {
                        "_guid": obj1.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj1._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json2 = {
                    "_guid": obj2._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V2",
                    "viewName": "V2",
                    _baseEntity:  {"$ref": obj1._guid},
                    "columns": {
                        "_guid": obj2.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj2._guid},
                        "_elemTypes": [],
                        "_desc": [undefined,undefined],
                        "_elem": [
                            {"$ref": obj1.columns._elem[1]._guid},
                            {"$ref": obj1.columns._elem[2]._guid}
                        ],
                        "_key": ["c2","c3"],
                        // _refEntities: [{"$ref": obj1._guid}],
                    },
                    "rows": {
                        "_guid": obj2.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj2._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json3 = {
                    "_guid": obj3._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V3",
                    "viewName": "V3",
                    "columns": {
                        "_guid": obj3.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj3._guid},
                        "_elemTypes": [],
                        "_desc": [undefined],
                        "_elem": [
                            {"$ref": obj1.columns._elem[2]._guid}
                        ],
                        "_key": ["c3"],
                        // _refEntities: [{"$ref": obj2._guid}],
                    },
                    "rows": {
                        "_guid": obj3.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj3._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
            });
            it("- getObject(1) : 옵션에 따른 값 비교 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const obj1 = view1.getObject(1);
                const obj2 = view2.getObject(1);
                const obj3 = view3.getObject(1);
                const json1 = {
                    "_guid": obj1._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V1",
                    "viewName": "V1",
                    "columns": {
                        "_guid": obj1.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj1._guid},
                        "_elemTypes": [],
                        "_desc": [undefined,undefined,undefined],
                        "_elem": [
                            {
                                "_guid": obj1.columns._elem[0]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c1",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c1"
                            },
                            {
                                "_guid": obj1.columns._elem[1]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c2",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c2"
                            },
                            {
                                "_guid": obj1.columns._elem[2]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c1","c2","c3"]
                    },
                    "rows": {
                        "_guid": obj1.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj1._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json2 = {
                    "_guid": obj2._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V2",
                    "viewName": "V2",
                    _baseEntity:  {"$ref": obj1._guid},
                    "columns": {
                        "_guid": obj2.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj2._guid},
                        "_elemTypes": [],
                        "_desc": [undefined,undefined],
                        "_elem": [
                            {
                                "_guid": obj1.columns._elem[1]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c2",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c2"
                            },
                            {
                                "_guid": obj1.columns._elem[2]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c2","c3"],
                        // _refEntities: [{"$ref": obj1._guid}],
                    },
                    "rows": {
                        "_guid": obj2.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj2._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json3 = {
                    "_guid": obj3._guid,
                    "_type": "Meta.Entity.MetaView",
                    "name": "V3",
                    "viewName": "V3",
                    "columns": {
                        "_guid": obj3.columns._guid,
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_owner": {"$ref": obj3._guid},
                        "_elemTypes": [],
                        "_desc": [undefined],
                        "_elem": [
                            {
                                "_guid": obj1.columns._elem[2]._guid,
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "_entity": {"$ref": obj1._guid},
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c3"],
                        // _refEntities: [{"$ref": obj2._guid}],
                    },
                    "rows": {
                        "_guid": obj3.rows._guid,
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_owner": {"$ref":obj3._guid},
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
            });
            
            it("- getObject(2) : 옵션에 따른 값 비교 ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const obj1 = view1.getObject(2);
                const obj2 = view2.getObject(2);
                const obj3 = view3.getObject(2);
                const json1 = {
                    "_type": "Meta.Entity.MetaView",
                    "name": "V1",
                    "viewName": "V1",
                    "columns": {
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_elemTypes": [],
                        "_desc": [undefined,undefined,undefined],
                        "_elem": [
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c1",
                                "columnName": "c1"
                            },
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c2",
                                "columnName": "c2"
                            },
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c1","c2","c3"]
                    },
                    "rows": {
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json2 = {
                    "_type": "Meta.Entity.MetaView",
                    "name": "V2",
                    "viewName": "V2",
                    "columns": {
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_elemTypes": [],
                        "_desc": [undefined,undefined],
                        "_elem": [
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c2",
                                "columnName": "c2"
                            },
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c2","c3"],
                    },
                    "rows": {
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };
                const json3 = {
                    "_type": "Meta.Entity.MetaView",
                    "name": "V3",
                    "viewName": "V3",
                    "columns": {
                        "_type": "Meta.Entity.MetaViewColumnCollection",
                        "_elemTypes": [],
                        "_desc": [undefined],
                        "_elem": [
                            {
                                "_type": "Meta.Entity.MetaColumn",
                                "name": "c3",
                                "columnName": "c3"
                            }
                        ],
                        "_key": ["c3"],
                    },
                    "rows": {
                        "_type": "Meta.Entity.MetaRowCollection",
                        "_elemTypes": [{"$ns": "Meta.Entity.MetaRow"}],
                        "_elem": [],
                        "autoChanges": true
                    },
                };

                expect(obj1).toEqual(json1);
                expect(obj2).toEqual(json2);
                expect(obj3).toEqual(json3);
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
            it("- setObject() : base, ref ", () => {
                const view1 = new MetaView('V1');
                view1.columns.add('c1');
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
                const v1 = new MetaView('VV1');
                const v2 = new MetaView('VV2');
                const v3 = new MetaView('VV3');
                v1.setObject(view1.getObject());
                // v2.setObject(view2.getObject());
                // v3.setObject(view3.getObject());

                expect(v1.viewName).toBe('V1');
                expect(v1.columns.count).toBe(3);
                expect(()=> v2.setObject(view2.getObject())).toThrow(/ES015/);
                expect(()=> v3.setObject(view3.getObject())).toThrow(/ES015/);
                /**
                 * MEMO: 
                 * - 참조가 없는 뷰 설정 확인
                 * - 참조가 있는 뷰는 setObject() 시점에 참조 예외 확인
                 */
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
                expect(view0.equal(view1)).toBe(true);
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

                // view1 VS view3
                expect(view3.viewName).toBe('V1');  
                expect(view3.columns.count).toBe(2);
                expect(view3.columns['c2'].caption).toBe('C2');
                expect(view3.equal(view1)).toBe(true);
                // view1 VS view0
                expect(view0.viewName).toBe('V1');  
                expect(view0.columns.count).toBe(2);
                expect(view0.columns['c2'].caption).toBe('C2');
                expect(view0.equal(view1)).toBe(true);
                // view1 VS view2
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
                const view2 = new MetaView('V2', view1); // 전체 참조
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
                const view2 = new MetaView('V2', view1); // 전체 참조
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
                const view2 = new MetaView('V2', view1); // 전체 참조
                view2.columns.add('c2');
                const view3 = new MetaView('V3');
                view3.columns.add('c3', view2.columns); // 일부 참조
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
                const view2 = new MetaView('V2', view1); // 전체 참조
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
    describe("기타", () => {
        describe("add() 순환 참조", () => {
        it("- equal() : 이름이 다른 경우 ", () => {
            const view1 = new MetaView('V1');
            view1.columns.add('c1');
            const view2 = new MetaView('V2', view1); // 전체 참조
            view2.columns.add('c2');
            
            expect(()=> view1.columns.add('c3', view2.columns)).toThrow(/ES042/)
            /**
             * MEMO: 순환 참조 발생시 baseEntity 가 없는 곳에서 컬럼 중복이 발생한다.
             */
        });
        });
    });
});

/**
 * REVIEW: 테스트가 허술해 보임
 */