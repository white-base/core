//==============================================================
// gobal defined
import IObject from '../src/i-object';
import IMarshal from '../src/i-marshal';
import IPropertyCollection from '../src/i-collection-property';
import ICollection from '../src/i-collection';
import IList from '../src/i-list';
import IListControl from '../src/i-control-list';
import IElement from '../src/i-element';
import ISerialize from '../src/i-serialize';
import IArrayCollection from '../src/i-collection-array';
import {jest} from '@jest/globals';

//==============================================================
// test
describe("[target: i-* ]", () => {
    beforeAll(() => {
        jest.resetModules();
    });
    describe("IObject :: 인터페이스", () => {
        it("- IObject() : 생성 및 상속 ", () => {
            class SubClass extends IObject {}
            const s = new SubClass();
            const i = new IObject();

            // extends
            expect(()=> s.getTypes()).toThrow(/EL02111/);
            expect(()=> s.instanceOf()).toThrow(/EL02112/);
            expect(()=> s.equal()).toThrow(/EL02113/);
            // create
            expect(()=> i.getTypes()).toThrow(/EL02111/);
            expect(()=> i.instanceOf()).toThrow(/EL02112/);
            expect(()=> i.equal()).toThrow(/EL02113/);
        });

    });
    describe("IMarshal :: 인터페이스", () => {
        it("- IMarshal() : 생성 및 상속 ", () => {
            class SubClass extends IMarshal {}
            const s = new SubClass();
            const i = new IMarshal();
            
            // extends
            // expect(s._guid).toBe(String); 
            // expect(s._type).toBe(Function);
            expect(s._guid).toBeDefined();
            expect(s._type).toBeDefined();

            expect(()=> s.getObject()).toThrow(/EL02121/);
            expect(()=> s.setObject()).toThrow(/EL02122/);
            // create
            // expect(i._guid).toBe(String);
            // expect(i._type).toBe(Function);
            expect(s._guid).toBeDefined();
            expect(s._type).toBeDefined();
            expect(()=> i.getObject()).toThrow(/EL02121/);
            expect(()=> i.setObject()).toThrow(/EL02122/);
        });
    });
    // describe.skip("IExportControl :: 인터페이스", () => {
    //     it("- IExportControl() : 생성 및 상속 ", () => {
    //         class SubClass extends IExportControl {}
    //         const s = new SubClass();
    //         const i = new IExportControl();

    //         // extends
    //         expect(()=> s.write()).toThrow(/EL02311/);
    //         // create
    //         expect(()=> i.write()).toThrow(/EL02311/);
    //     });
    // });
    // describe.skip("IGroupControl :: 인터페이스", () => {
    //     it("- IGroupControl() : 생성 및 상속 ", () => {
    //         class SubClass extends IGroupControl {}
    //         const s = new SubClass();
    //         const i = new IGroupControl();

    //         // extends
    //         expect(()=> s.merge()).toThrow(/EL02331/);
    //         // create
    //         expect(()=> i.copy()).toThrow(/EL02332/);
    //     });
    // });
    // describe.skip("IImportControl :: 인터페이스", () => {
    //     it("- IImportControl() : 생성 및 상속 ", () => {
    //         class SubClass extends IImportControl {}
    //         const s = new SubClass();
    //         const i = new IImportControl();

    //         // extends
    //         expect(()=> s.read()).toThrow(/EL02321/);
    //         // create
    //         expect(()=> i.read()).toThrow(/EL02321/);
    //     });
    // });
    
    
    describe("IList :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IList {}
            const s = new SubClass();
            const i = new IList();

            // extends
            expect(s._list).toBe(Array);
            expect(s.count).toBe(Number);
            // create
            expect(i._list).toBe(Array);
            expect(i.count).toBe(Number);
        });
    });
    describe("IListControl :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IListControl {}
            const s = new SubClass();
            const i = new IListControl();

            // extends
            expect(()=> s.add()).toThrow(/EL02151/);
            expect(()=> s.del()).toThrow(/EL02152/);
            expect(()=> s.has()).toThrow(/EL02153/);
            expect(()=> s.find()).toThrow(/EL02154/);
            // create
            expect(()=> i.add()).toThrow(/EL02151/);
            expect(()=> i.del()).toThrow(/EL02152/);
            expect(()=> i.has()).toThrow(/EL02153/);
            expect(()=> i.find()).toThrow(/EL02154/);
        });
    });
    describe("IElement :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IElement {}
            const s = new SubClass();
            const i = new IElement();

            // extends
            expect(s._name).toBe(String);
            expect(()=> s.clone()).toThrow(/EL02131/);
            // create
            expect(i._name).toBe(String);
            expect(()=> i.clone()).toThrow(/EL02131/);
        });
    });

    describe("ISerialize :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends ISerialize {}
            const s = new SubClass();
            const i = new ISerialize();

            // extends 
            expect(()=> s.load()).toThrow(/EL02192/);
            expect(()=> s.output()).toThrow(/EL02191/);
            // create
            expect(()=> i.load()).toThrow(/EL02192/);
            expect(()=> i.output()).toThrow(/EL02191/);
        });
    });
    // describe.skip("ITransaction :: 인터페이스", () => {
    //     it("- 생성 및 상속 ", () => {
    //         class SubClass extends ITransaction {}
    //         const s = new SubClass();
    //         const i = new ITransaction();

    //         // extends
    //         expect(()=> s.acceptChanges()).toThrow(/EL02191/);
    //         expect(()=> s.rejectChanges()).toThrow(/EL02192/);
    //         // create
    //         expect(()=> i.acceptChanges()).toThrow(/EL02191/);
    //         expect(()=> i.rejectChanges()).toThrow(/EL02192/);
    //     });
    // });

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
    // describe.skip("ISchemaControl :: 인터페이스", () => {
    //     it("- ISchemaControl() : 생성 및 상속 ", () => {
    //         class SubClass extends ISchemaControl {}
    //         const s = new SubClass();
    //         const i = new ISchemaControl();

    //         // extends
    //         // expect(()=> s.read()).toThrow(/ES013/);
    //         // expect(()=> s.write()).toThrow(/ES013/);
    //         expect(()=> s.readSchema()).toThrow(/EL02341/);
    //         expect(()=> s.writeSchema()).toThrow(/EL02342/);
    //         // create
    //         // expect(()=> i.read()).toThrow(/ES013/);
    //         // expect(()=> i.write()).toThrow(/ES013/);
    //         expect(()=> i.readSchema()).toThrow(/EL02341/);
    //         expect(()=> i.writeSchema()).toThrow(/EL02342/);
    //     });
    // });

    // describe("< collection >", () => {
    describe("ICollection :: 인터페이스", () => {
        it("- ICollection() : 생성 및 상속 ", () => {
            class SubClass extends ICollection {}
            const s = new SubClass();
            const i = new ICollection();

            // extends
            expect(()=> s.add()).toThrow(/EL02161/);
            expect(()=> s.remove()).toThrow(/EL02162/);
            // expect(()=> s.removeAt()).toThrow(/ES013/);
            // expect(()=> s.clear()).toThrow(/ES013/);
            expect(()=> s.contains()).toThrow(/EL02163/);
            expect(()=> s.indexOf()).toThrow(/EL02164/);
            // expect(()=> s.exist()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/EL02161/);
            expect(()=> i.remove()).toThrow(/EL02162/);
            // expect(()=> i.removeAt()).toThrow(/ES013/);
            // expect(()=> i.clear()).toThrow(/ES013/);
            expect(()=> i.contains()).toThrow(/EL02163/);
            expect(()=> i.indexOf()).toThrow(/EL02164/);
            // expect(()=> i.exist()).toThrow(/ES013/);
        });
    });
    describe("ArrayCollection :: 인터페이스", () => {
        it("- 생성 및 상속 ", () => {
            class SubClass extends IArrayCollection {}
            const s = new SubClass();
            const i = new IArrayCollection();

            // extends
            expect(()=> s.add()).toThrow(/EL02161/);
            expect(()=> s.remove()).toThrow(/EL02162/);
            expect(()=> s.contains()).toThrow(/EL02163/);
            expect(()=> s.indexOf()).toThrow(/EL02164/);
            // create
            expect(()=> i.add()).toThrow(/EL02161/);
            expect(()=> i.remove()).toThrow(/EL02162/);
            expect(()=> i.contains()).toThrow(/EL02163/);
            expect(()=> i.indexOf()).toThrow(/EL02164/);
            expect(()=> i.insertAt()).toThrow(/EL02171/);

        });
    });
    describe("IPropertyCollection :: 인터페이스", () => {
        it("- IPropertyCollection() : 생성 및 상속 ", () => {
            class SubClass extends IPropertyCollection {}
            const s = new SubClass();
            const i = new IPropertyCollection();

            // extends
            expect(()=> s.add()).toThrow(/EL02161/);
            expect(()=> s.remove()).toThrow(/EL02162/);
            // expect(()=> s.removeAt()).toThrow(/ES013/);
            // expect(()=> s.clear()).toThrow(/ES013/);
            expect(()=> s.contains()).toThrow(/EL02163/);
            expect(()=> s.indexOf()).toThrow(/EL02164/);
            // expect(()=> s.exist()).toThrow(/ES013/);
            expect(()=> s.indexToKey()).toThrow(/EL02181/);
            // expect(()=> s.removeByProp()).toThrow(/ES013/);
            // expect(()=> s.indexOfProp()).toThrow(/ES013/);
            // create
            expect(()=> i.add()).toThrow(/EL02161/);
            expect(()=> i.remove()).toThrow(/EL02162/);
            // expect(()=> i.removeAt()).toThrow(/ES013/);
            // expect(()=> i.clear()).toThrow(/ES013/);
            expect(()=> i.contains()).toThrow(/EL02163/);
            expect(()=> i.indexOf()).toThrow(/EL02164/);
            // expect(()=> i.exist()).toThrow(/ES013/);
            expect(()=> i.indexToKey()).toThrow(/EL02181/);
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