/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const ComplexElement        = require('../src/meta-element-complex');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const IPropertyCollection   = require('../src/i-collection-property');

let MetaObjectSub, MetaElementSub, ComplexElementSub;

//==============================================================
// test
describe("< MetaObject >", () => {
    beforeAll(() => {
        // jest.resetModules();
        // 클래스 정의        
        // MetaObjectSub = class MetaObjectSub extends MetaObject {
        //     constructor(name) {
        //         super();
        //         // this.type = 
        //     }
        // }
    });
    it("- getTypes() : 상속관계 ", () => {
        const c = new MetaObjectSub();
        c.getTypes();
    });
});
describe("< MetaElement >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- ", () => {
    });
});
describe("< MetaComplexElement >", () => {
    beforeAll(() => {
        // jest.resetModules();
        // 클래스 정의        
        
    });
    it("- add() : 성공 ", () => {
        class ComplexElementSub extends ComplexElement {
            constructor() {
                super();
                // this.typeName = 'ComplexElementSub';
                // this.typeName = ComplexElementSub;
            }
        }
        // class NotClass {}
        const c = new ComplexElementSub();
        c.getTypes();

        let a = c.getTypes();

        console.log(c.instanceOf({}))
        console.log(c.instanceOf(Array))
        console.log('-------');
        console.log(c.instanceOf(IObject));
        console.log(c.instanceOf(IMarshal));
        console.log(c.instanceOf(Object))
        console.log(c.instanceOf(MetaObject))
        console.log(c.instanceOf(MetaElement))
        console.log(c.instanceOf(ComplexElement))
        console.log(c.instanceOf(IPropertyCollection));         
        console.log(c.instanceOf('Object'))
        console.log(c.instanceOf('MetaObject'))
        console.log(c.instanceOf('MetaElement'))
        console.log(c.instanceOf('ComplexElement'))
        console.log(c.instanceOf('IPropertyCollection'));         

        console.log(1);
    });
});