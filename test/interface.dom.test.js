/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
// const { JSDOM } = require('jsdom');

//==============================================================
// test
describe("[ GROUP]", () => {
    describe("load: i-object.js <IObject >", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 자신만 로딩", () => {
            require('../src/i-object');
        });
        it("- namespace : IObject ", () => {
            require('../src/message');
            require('../src/i-object');
            
            expect(global._L.IObject).toBeDefined();
            expect(global._L.Interface.IObject).toBeDefined();
        });
    });
    
    describe("load: i-marshal.js <IMarshal>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- namespace : IMarshal ", () => {
    
            require('../src/i-marshal');
            
            expect(global._L.IMarshal).toBeDefined();
            expect(global._L.Interface.IMarshal).toBeDefined();
        });
    });
    
    describe("load: i-serialize.js <ISerialize>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- namespace : IMarshal ", () => {
    
            require('../src/i-serialize');
            
            expect(global._L.ISerialize).toBeDefined();
            expect(global._L.Interface.ISerialize).toBeDefined();
        });
    });
    
    describe("load: i-transaction.js <ITransaction>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- namespace : ITransaction ", () => {
    
            require('../src/i-transaction');
            
            expect(global._L.ITransaction).toBeDefined();
            expect(global._L.Interface.ITransaction).toBeDefined();
        });
    });
    
    describe("load: i-control-import.js <IImportControl>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-control-import');
        });
        it("- namespace : IImportControl ", () => {
            require('../src/message');
            
            require('../src/i-control-import');
            
            expect(global._L.IImportControl).toBeDefined();
            expect(global._L.Interface.IImportControl).toBeDefined();
        });
    });
    
    describe("load: i-control-group.js <IGroupControl>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 자신만 로딩", () => {
            require('../src/i-control-group');
        });
        it("- namespace : IGroupControl ", () => {
            require('../src/message');
    
            require('../src/i-control-group');
            
            expect(global._L.IGroupControl).toBeDefined();
            expect(global._L.Interface.IGroupControl).toBeDefined();
        });
    });
    
    describe("load: i-control-export.js <IExportControl>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-control-export');
        });
        it("- namespace : IExportControl ", () => {
            require('../src/message');
            
            require('../src/i-control-export');
            
            expect(global._L.IExportControl).toBeDefined();
            expect(global._L.Interface.IExportControl).toBeDefined();
        });
    });
    
    describe("load: i-list.js <IList>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-list');
        });
        it("- namespace : IList ", () => {
            require('../src/message');
            
            require('../src/i-list');
            
            expect(global._L.IList).toBeDefined();
            expect(global._L.Interface.IList).toBeDefined();
        });
    });
    
    describe("load: i-element.js <IElement>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-element');
        });
        it("- namespace : IList ", () => {
            require('../src/message');
            
            require('../src/i-element');
            
            expect(global._L.IElement).toBeDefined();
            expect(global._L.Interface.IElement).toBeDefined();
        });
    });
    
    describe("load: i-control-schema.js <ISchemaControl>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-control-schema');
        });
        it("- namespace : IList ", () => {
            require('../src/message');
            
            require('../src/i-control-schema');
            
            expect(global._L.ISchemaControl).toBeDefined();
            expect(global._L.Interface.ISchemaControl).toBeDefined();
        });
    });
    
    describe("load: i-control-list.js <IListControl>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 자신만 로딩", () => {
            require('../src/i-control-list');
        });
        it("- namespace : IListControl ", () => {
            require('../src/message');
            
            require('../src/i-control-list');
            
            expect(global._L.IListControl).toBeDefined();
            expect(global._L.Interface.IListControl).toBeDefined();
        });
    });
    
    describe("load: i-collection-array.js <IArrayCollection>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : 전체 로딩 안할 때", () => {
            expect(() => require('../src/i-collection-array')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : 전체 로딩 안할 때", () => {
            require('../src/message');
    
            expect(() => require('../src/i-collection-array')).toThrow(/ES011/);
        });
        it("- 예외 : Util 로딩이 안 된 경우", () => {
            require('../src/message');
            // require('../src/util-type');
            // require('../src/util');
            
            expect(() => require('../src/i-collection-array')).toThrow(/Util/);
        });
        it("- 예외 : ICollection 로딩이 안 된 경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            expect(() => require('../src/i-collection-array')).toThrow(/ICollection/);
        });
        it("- namespace : IArrayCollection ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-collection');
            require('../src/i-collection-array');
            
            expect(global._L.IArrayCollection).toBeDefined();
            expect(global._L.Interface.IArrayCollection).toBeDefined();
        });
    });
    
    describe("load: i-collection.js <ICollection>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
         it("- 예외 : 자신만 로딩", () => {
            expect(() => require('../src/i-collection')).toThrow(/Cannot read properties/);
         });
         it("- 예외 : 모두 로딩이 인된경우", () => {
             require('../src/message');
     
             expect(() => require('../src/i-collection')).toThrow(/ES011/);
         });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
            
            expect(() => require('../src/i-collection')).toThrow(/Util/);
        });
        it("- namespace : ICollection ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
    
            expect(global._L.ICollection).toBeDefined();
            expect(global._L.Interface.ICollection).toBeDefined();
        });
    });
    
    describe("load: i-collection-property.js <IPropertyCollection>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
         it("- 예외 : 자신만 로딩", () => {
            expect(() => require('../src/i-collection-property')).toThrow(/Cannot read properties/);
        });
         it("- 예외 : 모두 로딩이 인된경우", () => {
             require('../src/message');
    
             expect(() => require('../src/i-collection-property')).toThrow(/ES011/);
         });
         it("- 예외 : ICollection 로딩이 인된경우", () => {
             require('../src/message');
             require('../src/util-type');
             require('../src/util');
     
             expect(() => require('../src/i-collection-property')).toThrow(/ICollection/);
         });
        it("- namespace : IPropertyCollection ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-collection-property');
    
            expect(global._L.IPropertyCollection).toBeDefined();
            expect(global._L.Interface.IPropertyCollection).toBeDefined();
        });
    
    });
});




