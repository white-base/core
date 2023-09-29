/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("[ GROUP]", () => {
    describe("load: meta-object.js <MetaObject>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- 예외 : 전체 로딩 안할 때", () => {
            require('../src/message');
    
            expect(() => require('../src/meta-object')).toThrow(/ES011/);
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
            
            expect(() => require('../src/meta-object')).toThrow(/Util/);
        });
        it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            require('../src/i-marshal');
            // require('../src/i-list');
            // require('../src/i-control-list');
            // require('../src/i-serialize');
    
            // require('../src/namespace-manager');
            // require('../src/meta-registry');
    
            expect(() => require('../src/meta-object')).toThrow(/MetaRegistry/);
        });
        it("- 예외 : IObject 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            // require('../src/i-object');
            // require('../src/i-marshal');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');
    
            require('../src/namespace-manager');
            require('../src/meta-registry');
    
            expect(() => require('../src/meta-object')).toThrow(/IObject/);
        });
        it("- 예외 : IMarshal 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            // require('../src/i-marshal');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');
    
            require('../src/namespace-manager');
            require('../src/meta-registry');
    
            expect(() => require('../src/meta-object')).toThrow(/IMarshal/);
        });
        
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');
    
            require('../src/namespace-manager');
            require('../src/meta-registry');
            require('../src/meta-object');
    
            expect(global._L.MetaObject).toBeDefined();
            expect(global._L.Meta.MetaObject).toBeDefined();
        });
        
    });
    describe("load: meta-element.js <MetaElement>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- 예외 : 전체 로딩 안할 때", () => {
            expect(() => require('../src/meta-element')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
    
            expect(() => require('../src/meta-element')).toThrow(/Util/);
        });
        it("- 예외 : IElement 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            require('../src/i-marshal');
    
            expect(() => require('../src/meta-element')).toThrow(/IElement/);
        });
        it("- 예외 : MetaObject 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-element');
    
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');

            require('../src/namespace-manager');
            require('../src/meta-registry');
    
            expect(() => require('../src/meta-element')).toThrow(/MetaObject/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-element');
    
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');

            require('../src/namespace-manager');
            require('../src/meta-registry');
            
            require('../src/meta-object');
            require('../src/meta-element');
    
            expect(global._L.MetaElement).toBeDefined();
            expect(global._L.Meta.MetaElement).toBeDefined();
        });
        
    });
    describe("load: meta-registry.js <MetaRegistry>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- 예외 : 전체 로딩 안할 때", () => {
            // require('../src/message');
    
            expect(() => require('../src/meta-registry')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
    
            expect(() => require('../src/meta-registry')).toThrow(/Util/);
        });
        it("- 예외 : NamespaceManager 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-list');
            require('../src/i-control-list');
            // require('../src/namespace-manager');
    
            expect(() => require('../src/meta-registry')).toThrow(/NamespaceManager/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');
            
            require('../src/namespace-manager');
            require('../src/meta-registry');
    
            expect(global._L.MetaRegistry).toBeDefined();
            expect(global._L.Meta.MetaRegistry).toBeDefined();
        });
        
    });
    describe("load: namespace-manager.js <NamespaceManager>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- 예외 : 전체 로딩 안할 때", () => {
            // require('../src/message');
    
            expect(() => require('../src/namespace-manager')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
    
            expect(() => require('../src/namespace-manager')).toThrow(/Util/);
        });
        it("- 예외 : IList 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            // require('../src/i-list');
            // require('../src/i-control-list');
            // require('../src/namespace-manager');
    
            expect(() => require('../src/namespace-manager')).toThrow(/IList/);
        });
        it("- 예외 : IListControl 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-list');
            // require('../src/i-control-list');
            // require('../src/namespace-manager');
    
            expect(() => require('../src/namespace-manager')).toThrow(/IListControl/);
        });
        it("- 예외 : ISerialize 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-list');
            require('../src/i-control-list');
            // require('../src/namespace-manager');
    
            expect(() => require('../src/namespace-manager')).toThrow(/ISerialize/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
    
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-serialize');
            
            require('../src/namespace-manager');
    
            expect(global._L.NamespaceManager).toBeDefined();
            expect(global._L.Meta.NamespaceManager).toBeDefined();
        });
        
    });
});

