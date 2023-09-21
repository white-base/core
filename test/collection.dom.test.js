/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("[target: collection-property.js, collection-array.js, collection-base.js]", () => {
    describe("BaseCollection :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
            expect(() => require('../src/collection-base')).toThrow(/Util/);
        });
        
        it("- 예외 : ICollection 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            // require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');

            expect(() => require('../src/collection-base')).toThrow(/ICollection/);
        });
        it("- 예외 : IList 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            // require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');

            expect(() => require('../src/collection-base')).toThrow(/IList/);
        });
        it("- 예외 : Observer 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            
            // require('../src/observer');
            // require('../src/namespace-manager');

            expect(() => require('../src/collection-base')).toThrow(/Observer/);
        });
        
        it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            
            require('../src/observer');
            require('../src/namespace-manager');
            // require('../src/meta-registry');  
            
            expect(() => require('../src/collection-base')).toThrow(/MetaRegistry/);
        });
        it("- 예외 : MetaObject 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            // require('../src/meta-object');  
            
            expect(() => require('../src/collection-base')).toThrow(/MetaObject/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            require('../src/meta-object');  
            require('../src/collection-base');
    
            expect(global._L.BaseCollection).toBeDefined();
            expect(global._L.Collection.BaseCollection).toBeDefined();
        });
        
    });
    describe("ArrayCollection :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');

            expect(() => require('../src/collection-array')).toThrow(/Util/);
        });
        it("- 예외 : IArrayCollection 로딩이 인된 경우", () => {
            require('../src/message');
            require('../src/util-type');            // ref
            require('../src/util');

            expect(() => require('../src/collection-array')).toThrow(/IArrayCollection/);
        });
        it("- 예외 : MetaRegistry 로딩이 인된 경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-array');
            
            require('../src/observer');
            require('../src/namespace-manager');
            // require('../src/meta-registry');  

            expect(() => require('../src/collection-array')).toThrow(/MetaRegistry/);
        });
        it("- 예외 : MetaObject 로딩이 인된 경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-array');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            // require('../src/meta-object');  

            expect(() => require('../src/collection-array')).toThrow(/MetaObject/);
        });
        it("- 예외 : BaseCollection 로딩이 인된 경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-array');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            require('../src/meta-object');  
            // require('../src/collection-base');
            
            expect(() => require('../src/collection-array')).toThrow(/BaseCollection/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-array');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            require('../src/meta-object');  
            require('../src/collection-base');
            require('../src/collection-array');
    
            expect(global._L.ArrayCollection).toBeDefined();
            expect(global._L.Collection.ArrayCollection).toBeDefined();
        });
        
    });
    describe("PropertyCollection :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
            
            expect(() => require('../src/collection-property')).toThrow(/Util/);
        });
        it("- 예외 : IPropertyCollection 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');            // ref
            require('../src/util');

            expect(() => require('../src/collection-property')).toThrow(/IPropertyCollection/);
        });
        it("- 예외 : MetaRegistry 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-property');
            
            require('../src/observer');
            require('../src/namespace-manager');
            // require('../src/meta-registry');  
    
            expect(() => require('../src/collection-property')).toThrow(/MetaRegistry/);
        });
        it("- 예외 : MetaObject 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-property');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            // require('../src/meta-object');  
    
            expect(() => require('../src/collection-property')).toThrow(/MetaObject/);
        });
        it("- 예외 : BaseCollection 로딩이 인된경우", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-property');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            require('../src/meta-object');  
            // require('../src/collection-base');
    
            expect(() => require('../src/collection-property')).toThrow(/BaseCollection/);
        });

        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/i-collection');
            require('../src/i-list');
            require('../src/i-control-list');
            require('../src/i-object');
            require('../src/i-marshal');
            require('../src/i-collection-property');
            
            require('../src/observer');
            require('../src/namespace-manager');
            require('../src/meta-registry');  
            require('../src/meta-object');  
            require('../src/collection-base');
            require('../src/collection-property');
    
            expect(global._L.PropertyCollection).toBeDefined();
            expect(global._L.Collection.PropertyCollection).toBeDefined();
        });
        
    });
});
