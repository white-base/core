/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const Util                  = require('../src/util');
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const MetaEntity                = require('../src/meta-entity');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
// const IControlCollection    = require('../src/i-collection-control');
const IPropertyCollection   = require('../src/i-collection-property');
const ICollection           = require('../src/i-collection');
const IAllControl           = require('../src/i-control-all');
const IExportControl        = require('../src/i-control-export');
const IGroupControl         = require('../src/i-control-group');
const IImportControl        = require('../src/i-control-import');
const ILookupControl        = require('../src/i-control-lookup');
const ISchemaControl        = require('../src/i-control-schema');
const IPartControl          = require('../src/i-control-part');

//==============================================================
// test
describe("< MetaTable >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    describe("< meta >", () => {
        it("- IObject() : 생성 및 상속 ", () => {
            class SubClass extends IObject {}
            const s = new SubClass();
            const i = new IObject();

            // extends
            expect(()=> s.getTypes()).toThrow(/Abstract/);
            expect(()=> s.instanceOf()).toThrow(/Abstract/);
            // create
            expect(()=> i.getTypes()).toThrow(/Abstract/);
            expect(()=> i.instanceOf()).toThrow(/Abstract/);
        });
        it("- IMarshal() : 생성 및 상속 ", () => {
            class SubClass extends IMarshal {}
            const s = new SubClass();
            const i = new IMarshal();
            
            // extends
            expect(()=> s.getTypes()).toThrow(/Abstract/);
            expect(()=> s.instanceOf()).toThrow(/Abstract/);
            expect(()=> s.getObject()).toThrow(/Abstract/);
            expect(()=> s.getGuid()).toThrow(/Abstract/);
            // create
            expect(()=> i.getTypes()).toThrow(/Abstract/);
            expect(()=> i.instanceOf()).toThrow(/Abstract/);
            expect(()=> i.getObject()).toThrow(/Abstract/);
            expect(()=> i.getGuid()).toThrow(/Abstract/);
        });
    });
    describe("< control >", () => {
        it("- IAllControl() : 생성 및 상속 ", () => {
            class SubClass extends IAllControl {}
            const s = new SubClass();
            const i = new IAllControl();

            // extends
            expect(()=> s.clone()).toThrow(/Abstract/);
            expect(()=> s.load()).toThrow(/Abstract/);
            expect(()=> s.clear()).toThrow(/Abstract/);
            // create
            expect(()=> i.clone()).toThrow(/Abstract/);
            expect(()=> i.load()).toThrow(/Abstract/);
            expect(()=> i.clear()).toThrow(/Abstract/);
        });
        it("- IExportControl() : 생성 및 상속 ", () => {
            class SubClass extends IExportControl {}
            const s = new SubClass();
            const i = new IExportControl();

            // extends
            expect(()=> s.write()).toThrow(/Abstract/);
            // create
            expect(()=> i.write()).toThrow(/Abstract/);
        });
        it("- IGroupControl() : 생성 및 상속 ", () => {
            class SubClass extends IGroupControl {}
            const s = new SubClass();
            const i = new IGroupControl();

            // extends
            expect(()=> s.merge()).toThrow(/Abstract/);
            // create
            expect(()=> i.copy()).toThrow(/Abstract/);
        });
        it("- IImportControl() : 생성 및 상속 ", () => {
            class SubClass extends IImportControl {}
            const s = new SubClass();
            const i = new IImportControl();

            // extends
            expect(()=> s.read()).toThrow(/Abstract/);
            // create
            expect(()=> i.read()).toThrow(/Abstract/);
        });
        it("- ILookupControl() : 생성 및 상속 ", () => {
            class SubClass extends ILookupControl {}
            const s = new SubClass();
            const i = new ILookupControl();

            // extends
            expect(()=> s.contains()).toThrow(/Abstract/);
            // create
            expect(()=> i.contains()).toThrow(/Abstract/);
        });
        it("- IPartControl() : 생성 및 상속 ", () => {
            class SubClass extends IPartControl {}
            const s = new SubClass();
            const i = new IPartControl();

            // extends
            expect(()=> s.add()).toThrow(/Abstract/);
            expect(()=> s.remove()).toThrow(/Abstract/);
            // create
            expect(()=> i.add()).toThrow(/Abstract/);
            expect(()=> i.remove()).toThrow(/Abstract/);
        });
        it("- IAllControl() : 생성 및 상속 ", () => {
            class SubClass extends IAllControl {}
            const s = new SubClass();
            const i = new IAllControl();

            // extends
            expect(()=> s.clone()).toThrow(/Abstract/);
            expect(()=> s.load()).toThrow(/Abstract/);
            expect(()=> s.clear()).toThrow(/Abstract/);
            // create
            expect(()=> i.clone()).toThrow(/Abstract/);
            expect(()=> i.load()).toThrow(/Abstract/);
            expect(()=> i.clear()).toThrow(/Abstract/);
        });
        it("- ISchemaControl() : 생성 및 상속 ", () => {
            class SubClass extends ISchemaControl {}
            const s = new SubClass();
            const i = new ISchemaControl();

            // extends
            expect(()=> s.read()).toThrow(/Abstract/);
            expect(()=> s.write()).toThrow(/Abstract/);
            expect(()=> s.readSchema()).toThrow(/Abstract/);
            expect(()=> s.writeSchema()).toThrow(/Abstract/);
            // create
            expect(()=> i.read()).toThrow(/Abstract/);
            expect(()=> i.write()).toThrow(/Abstract/);
            expect(()=> i.readSchema()).toThrow(/Abstract/);
            expect(()=> i.writeSchema()).toThrow(/Abstract/);
        });
    });
    describe("< collection >", () => {
        it("- ICollection() : 생성 및 상속 ", () => {
            class SubClass extends ICollection {}
            const s = new SubClass();
            const i = new ICollection();

            // extends
            expect(()=> s.add()).toThrow(/Abstract/);
            expect(()=> s.remove()).toThrow(/Abstract/);
            expect(()=> s.removeAt()).toThrow(/Abstract/);
            expect(()=> s.clear()).toThrow(/Abstract/);
            expect(()=> s.contains()).toThrow(/Abstract/);
            expect(()=> s.indexOf()).toThrow(/Abstract/);
            expect(()=> s.exist()).toThrow(/Abstract/);
            // create
            expect(()=> i.add()).toThrow(/Abstract/);
            expect(()=> i.remove()).toThrow(/Abstract/);
            expect(()=> i.removeAt()).toThrow(/Abstract/);
            expect(()=> i.clear()).toThrow(/Abstract/);
            expect(()=> i.contains()).toThrow(/Abstract/);
            expect(()=> i.indexOf()).toThrow(/Abstract/);
            expect(()=> i.exist()).toThrow(/Abstract/);
        });
        it("- IPropertyCollection() : 생성 및 상속 ", () => {
            class SubClass extends IPropertyCollection {}
            const s = new SubClass();
            const i = new IPropertyCollection();

            // extends
            expect(()=> s.add()).toThrow(/Abstract/);
            expect(()=> s.remove()).toThrow(/Abstract/);
            expect(()=> s.removeAt()).toThrow(/Abstract/);
            expect(()=> s.clear()).toThrow(/Abstract/);
            expect(()=> s.contains()).toThrow(/Abstract/);
            expect(()=> s.indexOf()).toThrow(/Abstract/);
            expect(()=> s.exist()).toThrow(/Abstract/);
            expect(()=> s.keyOf()).toThrow(/Abstract/);
            // expect(()=> s.removeByProp()).toThrow(/Abstract/);
            // expect(()=> s.indexOfProp()).toThrow(/Abstract/);
            // create
            expect(()=> i.add()).toThrow(/Abstract/);
            expect(()=> i.remove()).toThrow(/Abstract/);
            expect(()=> i.removeAt()).toThrow(/Abstract/);
            expect(()=> i.clear()).toThrow(/Abstract/);
            expect(()=> i.contains()).toThrow(/Abstract/);
            expect(()=> i.indexOf()).toThrow(/Abstract/);
            expect(()=> i.exist()).toThrow(/Abstract/);
            expect(()=> i.keyOf()).toThrow(/Abstract/);
            // expect(()=> i.removeByProp()).toThrow(/Abstract/);
            // expect(()=> i.indexOfProp()).toThrow(/Abstract/);
        });
    });
    
    // describe("< setValue(row) >", () => {
    //     it("-  ", () => {
            
    //     });
    // });
});