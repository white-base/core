/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const Util                      = require('../src/util');
const {MetaObject}              = require('../src/meta-object');
const {MetaElement}             = require('../src/meta-element');
const {BaseEntity}              = require('../src/base-entity');

const {IObject}                 = require('../src/i-object');
const {IMarshal}                = require('../src/i-marshal');
const {IPropertyCollection}     = require('../src/i-collection-property');
const {ICollection}             = require('../src/i-collection');
const {IExportControl}          = require('../src/i-control-export');
const {IGroupControl}           = require('../src/i-control-group');
const {IImportControl}          = require('../src/i-control-import');
const {ISchemaControl}          = require('../src/i-control-schema');
const {IList}                   = require('../src/i-list');
const {IListControl}            = require('../src/i-control-list');
const {IElement}                = require('../src/i-element');
const {ISerialize}              = require('../src/i-serialize');
const {ITransaction}            = require('../src/i-transaction');
const {IArrayCollection}        = require('../src/i-collection-array');

//==============================================================
// test
describe.skip("[target: i-* ]", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    describe("IObject :: 인터페이스", () => {
        it("- IObject() : 생성 및 상속 ", () => {
            class SubClass extends IObject {}
            const s = new SubClass();
            const i = new IObject();

            // extends
            expect(()=> s.getTypes()).toThrow(/ES013/);
            expect(()=> s.instanceOf()).toThrow(/ES013/);
            expect(()=> s.equal()).toThrow(/ES013/);
            // create
            expect(()=> i.getTypes()).toThrow(/ES013/);
            expect(()=> i.instanceOf()).toThrow(/ES013/);
            expect(()=> i.equal()).toThrow(/ES013/);
        });

    });
    describe("IMarshal :: 인터페이스", () => {
        it("- IMarshal() : 생성 및 상속 ", () => {
            class SubClass extends IMarshal {}
            const s = new SubClass();
            const i = new IMarshal();
            
            // extends
            expect(s._guid).toBe(String);
            expect(s._type).toBe(Function);
            expect(()=> s.getObject()).toThrow(/ES013/);
            expect(()=> s.setObject()).toThrow(/ES013/);
            // create
            expect(i._guid).toBe(String);
            expect(i._type).toBe(Function);
            expect(()=> i.getObject()).toThrow(/ES013/);
            expect(()=> i.setObject()).toThrow(/ES013/);
        });
    });
    describe("IExportControl :: 인터페이스", () => {
        it("- IExportControl() : 생성 및 상속 ", () => {
            class SubClass extends IExportControl {}
            const s = new SubClass();
            const i = new IExportControl();

            // extends
            expect(()=> s.write()).toThrow(/ES013/);
            // create
            expect(()=> i.write()).toThrow(/ES013/);
        });
    });
    describe("IGroupControl :: 인터페이스", () => {
        it("- IGroupControl() : 생성 및 상속 ", () => {
            class SubClass extends IGroupControl {}
            const s = new SubClass();
            const i = new IGroupControl();

            // extends
            expect(()=> s.merge()).toThrow(/ES013/);
            // create
            expect(()=> i.copy()).toThrow(/ES013/);
        });
    });
    describe("IImportControl :: 인터페이스", () => {
        it("- IImportControl() : 생성 및 상속 ", () => {
            class SubClass extends IImportControl {}
            const s = new SubClass();
            const i = new IImportControl();

            // extends
            expect(()=> s.read()).toThrow(/ES013/);
            // create
            expect(()=> i.read()).toThrow(/ES013/);
        });
    });
    
    
    describe("IList :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IList {}
            const s = new SubClass();
            const i = new IList();

            // extends
            expect(s.list).toBe(Array);
            expect(s.count).toBe(Number);
            // create
            expect(i.list).toBe(Array);
            expect(i.count).toBe(Number);
        });
    });
    describe("IListControl :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IListControl {}
            const s = new SubClass();
            const i = new IListControl();

            // extends
            expect(()=> s.add()).toThrow(/ES013/);
            expect(()=> s.del()).toThrow(/ES013/);
            expect(()=> s.has()).toThrow(/ES013/);
            expect(()=> s.find()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/ES013/);
            expect(()=> i.del()).toThrow(/ES013/);
            expect(()=> i.has()).toThrow(/ES013/);
            expect(()=> i.find()).toThrow(/ES013/);
        });
    });
    describe("IElement :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IElement {}
            const s = new SubClass();
            const i = new IElement();

            // extends
            expect(s._name).toBe(String);
            expect(()=> s.clone()).toThrow(/ES013/);
            // create
            expect(i._name).toBe(String);
            expect(()=> i.clone()).toThrow(/ES013/);
        });
    });

    describe("ISerialize :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends ISerialize {}
            const s = new SubClass();
            const i = new ISerialize();

            // extends
            expect(()=> s.load()).toThrow(/ES013/);
            expect(()=> s.output()).toThrow(/ES013/);
            // create
            expect(()=> i.load()).toThrow(/ES013/);
            expect(()=> i.output()).toThrow(/ES013/);
        });
    });
    describe("ITransaction :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends ITransaction {}
            const s = new SubClass();
            const i = new ITransaction();

            // extends
            expect(()=> s.acceptChanges()).toThrow(/ES013/);
            expect(()=> s.rejectChanges()).toThrow(/ES013/);
            // create
            expect(()=> i.acceptChanges()).toThrow(/ES013/);
            expect(()=> i.rejectChanges()).toThrow(/ES013/);
        });
    });

    // describe("ILookupControl :: 인터페이스", () => {
    //     it("- ILookupControl() : 생성 및 상속 ", () => {
    //         class SubClass extends ILookupControl {}
    //         const s = new SubClass();
    //         const i = new ILookupControl();

    //         // extends
    //         expect(()=> s.contains()).toThrow(/ES013/);
    //         // create
    //         expect(()=> i.contains()).toThrow(/ES013/);
    //     });
    // });
    // describe("IPartControl :: 인터페이스", () => {
    //     it("- IPartControl() : 생성 및 상속 ", () => {
    //         class SubClass extends IPartControl {}
    //         const s = new SubClass();
    //         const i = new IPartControl();

    //         // extends
    //         expect(()=> s.add()).toThrow(/ES013/);
    //         expect(()=> s.remove()).toThrow(/ES013/);
    //         // create
    //         expect(()=> i.add()).toThrow(/ES013/);
    //         expect(()=> i.remove()).toThrow(/ES013/);
    //     });
    // });
    // describe("IAllControl :: 인터페이스", () => {
    //     it("- IAllControl() : 생성 및 상속 ", () => {
    //         class SubClass extends IAllControl {}
    //         const s = new SubClass();
    //         const i = new IAllControl();

    //         // extends
    //         expect(()=> s.clone()).toThrow(/ES013/);
    //         expect(()=> s.load()).toThrow(/ES013/);
    //         expect(()=> s.clear()).toThrow(/ES013/);
    //         // create
    //         expect(()=> i.clone()).toThrow(/ES013/);
    //         expect(()=> i.load()).toThrow(/ES013/);
    //         expect(()=> i.clear()).toThrow(/ES013/);
    //     });
    // });
    describe("ISchemaControl :: 인터페이스", () => {
        it("- ISchemaControl() : 생성 및 상속 ", () => {
            class SubClass extends ISchemaControl {}
            const s = new SubClass();
            const i = new ISchemaControl();

            // extends
            // expect(()=> s.read()).toThrow(/ES013/);
            // expect(()=> s.write()).toThrow(/ES013/);
            expect(()=> s.readSchema()).toThrow(/ES013/);
            expect(()=> s.writeSchema()).toThrow(/ES013/);
            // create
            // expect(()=> i.read()).toThrow(/ES013/);
            // expect(()=> i.write()).toThrow(/ES013/);
            expect(()=> i.readSchema()).toThrow(/ES013/);
            expect(()=> i.writeSchema()).toThrow(/ES013/);
        });
    });

    // describe("< collection >", () => {
    describe("ICollection :: 인터페이스", () => {
        it("- ICollection() : 생성 및 상속 ", () => {
            class SubClass extends ICollection {}
            const s = new SubClass();
            const i = new ICollection();

            // extends
            expect(()=> s.add()).toThrow(/ES013/);
            expect(()=> s.remove()).toThrow(/ES013/);
            // expect(()=> s.removeAt()).toThrow(/ES013/);
            // expect(()=> s.clear()).toThrow(/ES013/);
            expect(()=> s.contains()).toThrow(/ES013/);
            expect(()=> s.indexOf()).toThrow(/ES013/);
            // expect(()=> s.exist()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/ES013/);
            expect(()=> i.remove()).toThrow(/ES013/);
            // expect(()=> i.removeAt()).toThrow(/ES013/);
            // expect(()=> i.clear()).toThrow(/ES013/);
            expect(()=> i.contains()).toThrow(/ES013/);
            expect(()=> i.indexOf()).toThrow(/ES013/);
            // expect(()=> i.exist()).toThrow(/ES013/);
        });
    });
    describe("ArrayCollection :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IArrayCollection {}
            const s = new SubClass();
            const i = new IArrayCollection();

            // extends
            expect(()=> s.add()).toThrow(/ES013/);
            expect(()=> s.remove()).toThrow(/ES013/);
            expect(()=> s.contains()).toThrow(/ES013/);
            expect(()=> s.indexOf()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/ES013/);
            expect(()=> i.remove()).toThrow(/ES013/);
            expect(()=> i.contains()).toThrow(/ES013/);
            expect(()=> i.indexOf()).toThrow(/ES013/);
            expect(()=> i.insertAt()).toThrow(/ES013/);

        });
    });
    describe("IPropertyCollection :: 인터페이스", () => {
        it("- IPropertyCollection() : 생성 및 상속 ", () => {
            class SubClass extends IPropertyCollection {}
            const s = new SubClass();
            const i = new IPropertyCollection();

            // extends
            expect(()=> s.add()).toThrow(/ES013/);
            expect(()=> s.remove()).toThrow(/ES013/);
            // expect(()=> s.removeAt()).toThrow(/ES013/);
            // expect(()=> s.clear()).toThrow(/ES013/);
            expect(()=> s.contains()).toThrow(/ES013/);
            expect(()=> s.indexOf()).toThrow(/ES013/);
            // expect(()=> s.exist()).toThrow(/ES013/);
            expect(()=> s.keyOf()).toThrow(/ES013/);
            // expect(()=> s.removeByProp()).toThrow(/ES013/);
            // expect(()=> s.indexOfProp()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/ES013/);
            expect(()=> i.remove()).toThrow(/ES013/);
            // expect(()=> i.removeAt()).toThrow(/ES013/);
            // expect(()=> i.clear()).toThrow(/ES013/);
            expect(()=> i.contains()).toThrow(/ES013/);
            expect(()=> i.indexOf()).toThrow(/ES013/);
            // expect(()=> i.exist()).toThrow(/ES013/);
            expect(()=> i.keyOf()).toThrow(/ES013/);
            // expect(()=> i.removeByProp()).toThrow(/ES013/);
            // expect(()=> i.indexOfProp()).toThrow(/ES013/);
        });
    });
    // });
    
    // describe("< setValue(row) >", () => {
    //     it("-  ", () => {
            
    //     });
    // });
});