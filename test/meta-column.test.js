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
describe("[target: meta-column.js ]", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    describe("MetaColumn :: 클래스", () => {
        describe("MetaColumn() <생성자>", () => {
            it("- new MetaColumn(name, null, property) : 생성시 속성 설정 ", () => {
                var item1 = new MetaColumn('i1', null, {
                    type: 'text',
                    size: 100,
                    default: 'D1',
                    caption: 'C1',
                    isNotNull: true,
                    constraints: [
                        { regex: /\D/, msg: 'message', code: 'C1', return: true },         // true : 충족조건
                        { regex: /[0-9]{5}/, msg: 'message', code: 'C2', return: false }   // false : 통과조건
                    ],   
                    order: 1000,
                    increase: 10,
                    value: 'V1'
                });
        
                expect(item1.type).toBe('text');
                expect(item1.size).toBe(100);
                expect(item1.default).toBe('D1');
                expect(item1.caption).toBe('C1');
                expect(item1.isNotNull).toBe(true);
                expect(item1.constraints.length).toBe(2);
                expect(item1.order).toBe(1000);
                expect(item1.increase).toBe(10);
                expect(item1.value).toBe('V1');
            });
        });
        describe("MetaObject.getTypes() : arr<fun> <타입 얻기>", () => {
            it("- getTypes() : array<function> ", () => {
                const c = new MetaColumn();
                const types = c.getTypes();
        
                expect(types[0]).toBe(MetaColumn);
                expect(types[1]).toBe(MetaElement);
                expect(types[2]).toBe(MetaObject);
                expect(types[3]).toBe(Object);
                expect(types.length).toBe(4);
            });
            // it("- getTypeNames() : array<string> ", () => {
            //     const c = new MetaColumn();
            //     const typeNames = c.getTypeNames();
        
            //     expect(typeNames[0]).toBe('Object');
            //     expect(typeNames[1]).toBe('MetaObject');
            //     expect(typeNames[2]).toBe('MetaElement');
            //     expect(typeNames[3]).toBe('MetaColumn');
            //     expect(typeNames.length).toBe(4);
            // });
        });
        describe("MetaObject.instanceOf(str | fun) : arr<fun> <인스턴스 유무 검사>", () => {
            it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaColumn();
        
                expect(c.instanceOf('IObject')).toBe(true);
                expect(c.instanceOf('IMarshal')).toBe(true);
                expect(c.instanceOf('Object')).toBe(true);
                expect(c.instanceOf('MetaObject')).toBe(true);
                expect(c.instanceOf('MetaElement')).toBe(true);
                expect(c.instanceOf('MetaColumn')).toBe(true);
                // false
                expect(c.instanceOf('Array')).toBe(false);
                expect(c.instanceOf('String')).toBe(false);
            });
            it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
                const c = new MetaColumn();
        
                expect(c.instanceOf(IObject)).toBe(true);
                expect(c.instanceOf(IMarshal)).toBe(true);
                expect(c.instanceOf(Object)).toBe(true);
                expect(c.instanceOf(MetaObject)).toBe(true);
                expect(c.instanceOf(MetaElement)).toBe(true);
                expect(c.instanceOf(MetaColumn)).toBe(true);
                // false
                expect(c.instanceOf(Array)).toBe(false);
                expect(c.instanceOf(String)).toBe(false);
            });
        });
        describe("this.onChanged <변경후 이벤트>", () => {
            it("- onChanged : 변경 이벤트 ", () => {
                var item1 = new MetaColumn('i1');
                var evt;
                item1.onChanged = function(val) {evt = val};
                item1.value = 10;
        
                expect(item1.value).toBe(10);
                expect(evt).toBe(10);
                
            });
        });
        describe("this.setConstraint(regexp, msg, code, return) <제약조건 등록>", () => {
            it("- setConstraint(regexp, msg, code, return) : 제약조건 등록 ", () => {   // REVIEW: 검사해야함
                var item1 = new MetaColumn('i1');
                item1.setConstraint(/10/, '10 시작...', 100, true);
                item1.setConstraint(/[0-9]{5}/, '5자리 이하만...', 200, false);
                item1.setConstraint(/\D/, '5자리 이하만...', 300);   // return 기본값 = false
        
                expect(item1.constraints.length).toBe(3);
                expect(item1.constraints[0].code).toBe(100);
                expect(item1.constraints[1].code).toBe(200);
                expect(item1.constraints[2].code).toBe(300);
            });
        });
        describe("this.getter <value 겟터>", () => {
            it("- getter : value getter 만 설정 ", () => {
                var item1 = new MetaColumn('i1');
                var item_value = 10;
                item1.value = 'V1';
                item1.getter = function() { return item_value; };
        
                expect(item1.value).toBe(10);
            });
        });
        describe("this.setter <value 셋터>", () => {
            it("- setter : value setter 만 등록 ", () => {
                var item1 = new MetaColumn('i1');
                var item_value = 10;
                item1.value = 'V1';
                item1.setter = function(val) { item_value = val; };
                item1.value = 'V11';
        
                expect(item1.value).toBe('V11');
                expect(item_value).toBe('V11');
            });
            it("- setter : 내부값과 와부값이 다른 경우 ", () => {
                var item1 = new MetaColumn('i1');
                var item_value = 10;
                item1.value = 'V1';
                item1.setter = function(val) { item_value = val + 'R'; };
                item1.value = 'V11';
        
                expect(item1.value).toBe('V11');
                expect(item_value).toBe('V11R');
            });
            it("- setter : 리턴이 있는 경우 ", () => {
                var item1 = new MetaColumn('i1');
                var item_value = 10;
                item1.value = 'V1';
                item1.setter = function(val) { return item_value = val + 'R'; };
                item1.value = 'V11';
                
                expect(item1.value).toBe('V11R');
                expect(item_value).toBe('V11R');
            });
        });
        describe("this.geter/setter <value 갯터/셋터>", () => {
            it("- getter/setter ", () => {
                var item1 = new MetaColumn('i1');
                var item_value = 10;
                item1.value = 'V1';
                item1.getter = function() { return item_value; }
                item1.setter = function(val) { item_value = val; };
                item1.value = 'V11';
        
                expect(item1.value).toBe('V11');
                expect(item_value).toBe('V11');
            });
        });
        
        describe("this.valid(value, r_result) <제약조건 검사>", () => {
            it("- valid(value, r_result) : 제약조건 검사 ", () => {     // REVIEW: r_result => 존재시 object 이어야함, 검사 추가
                var item1 = new MetaColumn('i1');
                item1.isNotNull = false;
                item1.setConstraint(/10/, '10 시작...', 100, true);
                item1.setConstraint(/[0-9]{5}/, '5자리 이하만...', 200, false);
                item1.setConstraint(/\D/, '숫자만...', 300);   // return 기본값 = false
                var result = {};
        
                // true
                expect(item1.valid('10', result)).toBe(true);
                expect(item1.valid('1000', result)).toBe(true);
                // false
                expect(item1.valid('', result)).toBe(false);        // 실패 : 10로 시작을 안해서
                expect(item1.valid('10000', result)).toBe(false);   // 실패 : 5자리 이상
                expect(item1.valid('100a', result)).toBe(false);    // 실패 : 문자가 들어가서
            });
            it("- valid(value, r_result) : isNotNull 여부 ", () => {
                var item1 = new MetaColumn('i1');
                item1.isNotNull = false;
                var item2 = new MetaColumn('i2');
                item2.isNotNull = true;     // 공백허용 안함
                var result1 = {};
                var result2 = {};
        
                expect(item1.valid('', result1)).toBe(true);
                expect(item2.valid('', result2)).toBe(false);
            });
            it("- valid(value, r_result) : isNotNull, isNullPass ", () => {
                var item1 = new MetaColumn('i1');
                item1.isNotNull      = false;
                item1.isNullPass     = true;
                var item2 = new MetaColumn('i2');
                item2.isNotNull     = true;     // 공백 불가
                item2.isNullPass    = true;     
                var result1 = {};
                var result2 = {};
        
                expect(item1.valid('', result1)).toBe(true);
                expect(item2.valid('', result2)).toBe(false);
            });
        });
        describe("this.clone() <복제>", () => {
            it("- clone() : 복제 ", () => {
                var table = new MetaTable('T1');
                var item1 = new MetaColumn('i1', table, {
                    type: 'text',
                    size: 100,
                    default: 'D1',
                    caption: 'C1',
                    isNotNull: true,
                    constraints: [
                        { regex: /\D/, msg: 'message', code: 'C1', return: true },         // true : 충족조건
                        { regex: /[0-9]{5}/, msg: 'message', code: 'C2', return: false }   // false : 통과조건
                    ],   
                    order: 1000,
                    increase: 10,
                    value: 'V1'
                });            
                var item2 = item1.clone();
        
                // item1
                expect(item1._entity.tableName).toBe('T1');
                expect(item1.type).toBe('text');
                expect(item1.size).toBe(100);
                expect(item1.default).toBe('D1');
                expect(item1.caption).toBe('C1');
                expect(item1.isNotNull).toBe(true);
                expect(item1.constraints.length).toBe(2);
                expect(item1.order).toBe(1000);
                expect(item1.increase).toBe(10);
                expect(item1.value).toBe('V1');
                // item2
                expect(item2._entity.tableName).toBe('T1');
                expect(item2.type).toBe('text');
                expect(item2.size).toBe(100);
                expect(item2.default).toBe('D1');
                expect(item2.caption).toBe('C1');
                expect(item2.isNotNull).toBe(true);
                expect(item2.constraints.length).toBe(2);
                expect(item2.order).toBe(1000);
                expect(item2.increase).toBe(10);
                expect(item2.value).toBe('V1');
                // 비교
                expect(item1 === item2).toBe(false);
            });
        });

    });
    
    // describe("< setValue(row) >", () => {
    //     it("-  ", () => {
            
    //     });
    // });
});

/**
 * 테스트가 허술해 보임
 * REVIEW: getter/setter 를 새롭게 정립하여서 테스트를 갱신햐야함
 */