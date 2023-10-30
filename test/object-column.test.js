/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {MetaObject}            = require('../src/meta-object');
const {MetaElement}           = require('../src/meta-element');
const {BaseColumn}           = require('../src/base-column');
const {ObjectColumn}           = require('../src/object-column');
const { MetaTable }       = require('../src/meta-table');
const { MetaView }        = require('../src/meta-view');
const { MetaRow }               = require('../src/meta-row');
// const ComplexElement        = require('../src/meta-element-complex');
// const {IObject}               = require('../src/i-object');
// const {IMarshal}              = require('../src/i-marshal');
// const {IPropertyCollection}   = require('../src/i-collection-property');
const { MetaRegistry } = require('../src/meta-registry');

let MetaObjectSub, MetaElementSub, ComplexElementSub, EmpytClass;

//==============================================================
// test
describe.skip("[target: object-column.js]", () => {
    describe("ObjectColumn :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            MetaRegistry.init();
        });

        describe("MetaObject.getTypes() : arr<func> <타입 조회>", () => {
            it("- getTypes() : array<function> ", () => {
                const o1 = new ObjectColumn('O1');
                const types = o1.getTypes();

                expect(types[0]).toBe(ObjectColumn);
                expect(types[1]).toBe(BaseColumn);
                expect(types[2]).toBe(MetaElement);
                expect(types[3]).toBe(MetaObject);
                expect(types[4]).toBe(Object);
                expect(types.length).toBe(5);
            });
        });
        describe("ObjectColumn() <생성자>", () => {
            it("- 객체 생성 속성 확인 ", () => {
                const t1 = new MetaTable('T1');
                const obj1 = {aa: 1}
                const prop = {
                    default: {},
                    value: obj1,
                    alias: 'oo1',
                    caption:'OBJ1'
                }
                const o1 = new ObjectColumn('o1', t1, prop);

                expect(o1._name).toBe('o1');
                expect(o1._entity).toBe(t1);
                expect(o1.columnName).toBe('o1');
                expect(o1.alias).toBe(prop.alias);
                expect(o1.default).toBe(prop.default);
                expect(o1.caption).toBe(prop.caption);
                expect(o1.value).toBe(prop.value);
            });
            it("- 객체 생성 예외 : property ", () => {
                // const o1 = new ObjectColumn('o1', null, prop);
                expect(()=> new ObjectColumn('o1', null, 'ERR')).toThrow(/ES021/)
            });
            it("- 커버리지 ", () => {
                const prop = {
                    alias: 'oo1',
                    sub: {caption: 'OBJ2'}
                }
                const o1 = new ObjectColumn('o1', null, prop);

                expect(o1.alias).toBe(prop.alias);
                expect(o1.caption).toBe(null);
            });

        });
        describe("ObjectColumn.getObejct() <객체 얻기>", () => {
            it("- getObject(1 | 2) : 직렬화 객체 얻기 ", () => {
                const t1 = new MetaTable('T1');
                const e1 = new MetaElement('E1')
                const obj1 = {aa: 1}
                const prop1 = {
                    default: {},
                    value: e1,
                    alias: 'oo1',
                    caption:'C1'
                }
                const o1 = new ObjectColumn('o1', t1, prop1);
                const g1 = o1.getObject();
                const g2 = o1.getObject(1);

                expect(g1).toEqual(g2);
                expect(g1._guid).toBe(o1._guid);
                expect(g1._type).toBe('Meta.Entity.ObjectColumn');
                expect(g1.columnName).toBe('o1');
                expect(g1.caption).toBe(prop1.caption);
                expect(g1.default).toEqual(prop1.default);
                expect(g1.value).toEqual(e1.getObject());
                expect(g1._entity).toEqual({$ref: t1._guid});
            });
            it("- getObject(1 | 2) : default, value 메타객체 ", () => {
                const t1 = new MetaTable('T1');
                const e1 = new MetaElement('E1')
                const obj1 = {aa: 1}
                const prop1 = {
                    default: e1,
                    value: e1,
                    alias: 'oo1',
                    caption:'C1'
                }
                const o1 = new ObjectColumn('o1', t1, prop1);
                const g1 = o1.getObject();
                const g2 = o1.getObject(1);

                expect(g1).toEqual(g2);
                expect(g1._guid).toBe(o1._guid);
                expect(g1._type).toBe('Meta.Entity.ObjectColumn');
                expect(g1.columnName).toBe('o1');
                expect(g1.caption).toBe(prop1.caption);
                expect(g1.default).toEqual(e1.getObject());
                expect(g1.value).toEqual({$ref: e1._guid});
                expect(g1._entity).toEqual({$ref: t1._guid});
            });
            it("- 커버리지 ", () => {
                const t1 = new MetaTable('T1');
                const e1 = new MetaElement('E1')
                const o1 = new ObjectColumn('o1');
                const g1 = o1.getObject(0, {});

                expect(g1._guid).toBe(o1._guid);
                expect(g1._type).toBe('Meta.Entity.ObjectColumn');
                expect(g1.columnName).toBe('o1');
            });
        });
        describe("ObjectColumn.setObject() <객체 설정>", () => {
            it("- _entity 없을 경우 ", () => {
                const t1 = new MetaTable('T1');
                const e1 = new MetaElement('E1')
                const obj1 = {aa: 1}
                const prop1 = {
                    default: {},
                    value: obj1,
                    alias: 'oo1',
                    caption:'C1'
                }
                const o1 = new ObjectColumn('o1', null, prop1);
                const g1 = o1.getObject();
                const o2 = new ObjectColumn('o2');
                o2.setObject(g1);

                expect(o2._name).toBe('o1');
                expect(o2.columnName).toBe('o1');
                expect(o2.alias).toBe(prop1.alias);
                expect(o2.default).toBe(prop1.default);
                expect(o2.caption).toBe(prop1.caption);
                expect(o2.value).toBe(prop1.value);
            });
            it("- default, value 가 같은 객체 일 경우 ", () => {
                const t1 = new MetaTable('T1');
                const e1 = new MetaElement('E1')
                const o1 = new ObjectColumn('o1');
                const o2 = new ObjectColumn('o2');
                const o3 = new ObjectColumn('o3');
                t1.columns._baseType = ObjectColumn
                o1.default = e1;
                o2.value = e1;
                o3.default = e1;
                o3.value = e1;
                t1.columns.add(o3)
                t1.columns.add(o2)
                t1.columns.add(o1)
                const gt1 = t1.getObject();
                const g1 = o1.getObject();
                const g2 = o2.getObject();
                const g3 = o3.getObject();
                const tt1 = new MetaTable('TT1');
                const ot1 = new ObjectColumn('ot1');
                const ot2 = new ObjectColumn('ot2');
                const ot3 = new ObjectColumn('ot3');
                tt1.setObject(gt1);
                ot1.setObject(g1);
                ot2.setObject(g2);
                ot3.setObject(g3);

                expect(tt1.equal(t1)).toBe(true);
                expect(ot1.equal(o1)).toBe(true);
                expect(ot2.equal(o2)).toBe(true);
                expect(ot3.equal(o3)).toBe(true);
            });
            
            it("- _entity 존재할 경우 : 예외 ", () => {
                const t1 = new MetaTable('T1');
                const obj1 = {aa: 1}
                const prop1 = {
                    default: {},
                    value: obj1,
                    alias: 'oo1',
                    caption:'C1'
                }
                const o1 = new ObjectColumn('o1', t1, prop1);
                const g1 = o1.getObject();
                const o2 = new ObjectColumn('o2');
                
                expect(()=> o2.setObject(g1)).toThrow(/ES015/)
            });
            it("- 예외 : $ref 연결 실패", () => {
                const t1 = new MetaTable('T1');
                const t2 = new MetaTable('T2');
                const e1 = new MetaElement('E1')
                const o1 = new ObjectColumn('o1');
                const o2 = new ObjectColumn('o2');
                const o3 = new ObjectColumn('o3');
                t1.columns._baseType = ObjectColumn
                t2.columns._baseType = ObjectColumn
                o1.default = e1;
                o2.value = e1;
                o3.default = e1;
                o3.value = e1;
                t1.columns.add(o3)
                t1.columns.add(o2)
                t2.columns.add(o3)
                t2.columns.add(o1)
                const gt1 = t1.getObject();
                const gt2 = t2.getObject();
                gt1.columns._elem[0].value = {} // 강제 삭제
                gt1.columns._elem[0].default = {}
                gt2.columns._elem[0].value = {}
                gt2.columns._elem[0].default = {}
                const tt1 = new MetaTable('TT1');
                const tt2 = new MetaTable('TT2');

                expect(()=> tt1.setObject(gt1)).toThrow(/ES015/)
                expect(()=> tt2.setObject(gt2)).toThrow(/ES015/)
                /**
                 * MEMO: 상위컬럼을 강제로 삭제해서 예외 확인
                 */
            });
            // 논리적으로 안되는 맞음
            // it("- _entity 존재할 값에 value 에 삽입 ", () => {
            //     const t1 = new MetaTable('T1');
            //     const obj1 = {aa: 1}
            //     const prop1 = {
            //         default: {},
            //         value: t1,
            //         alias: 'oo1',
            //         caption:'C1'
            //     }
            //     const o1 = new ObjectColumn('o1', t1, prop1);
            //     const g1 = o1.getObject();
            //     const o2 = new ObjectColumn('o2');
            //     o2.setObject(g1);

            //     expect(o2._name).toBe('o1');
            //     expect(o2.columnName).toBe('o1');
            //     expect(o2.alias).toBe(prop1.alias);
            //     expect(o2.default).toBe(prop1.default);
            //     expect(o2.caption).toBe(prop1.caption);
            //     expect(o2.value.equal(t1)).toBe(true);

            // });
        });
        describe("ObjectColumn.clone() <복제>", () => {
            it("- clone() : 복제 ", () => {
                var table = new MetaTable('T1');
                var prop = {
                    default: {aa: 0},
                    caption: 'C1',
                    alias: 'ii1',
                }
                var item1 = new ObjectColumn('i1', table, prop);            
                var item2 = item1.clone();
        
                // item1
                expect(item1._entity.tableName).toBe('T1');
                expect(item1.default).toBe(prop.default);
                expect(item1.caption).toBe(prop.caption);
                // item2
                expect(item2._entity.tableName).toBe('T1');
                expect(item2.default).toBe(prop.default);
                expect(item2.caption).toBe(prop.caption);
                // 비교
                expect(item1 === item2).toBe(false);
                expect(item1.equal(item2)).toBe(true);
            });
        });
        /**
         * - 생성자
         * - getObject()
         * - setObject()
         * - clone()
         */
        

        describe("예외 및 커버리지", () => {
            // it("- MetaObject.__SET_guid : 내부 setter ", () => {
            //     const i = new MetaObject();
                
            //     i.__SET$_guid(10, i);
            //     expect(i._guid).toBe(10);
            //     i.__SET$_guid(20);
            //     expect(i._guid).toBe(10);
            // });

        });
    });
});
