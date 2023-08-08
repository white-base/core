/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe.skip("[target: collection-property.js, collection-array.js, collection-base.js]", () => {
    describe("BaseCollection :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            expect(() => require('../src/collection-base')).toThrow(/Util/);
        });
        it("- 예외 : Observer 로딩이 인된경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            expect(() => require('../src/collection-base')).toThrow(/Observer/);
        });
        it("- 예외 : ICollection 로딩이 인된경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/observer');
            expect(() => require('../src/collection-base')).toThrow(/ICollection/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/i-control-lookup');     // ref
            require('../src/i-control-part');       // ref
            require('../src/i-collection-base');
            require('../src/i-collection');
            require('../src/observer');
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
            expect(() => require('../src/collection-array')).toThrow(/Util/);
        });
        it("- 예외 : IArrayCollection 로딩이 인된 경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            expect(() => require('../src/collection-array')).toThrow(/IArrayCollection/);
        });
        it("- 예외 : BaseCollection 로딩이 인된 경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/i-control-lookup');     // ref
            require('../src/i-control-part');       // ref
            require('../src/i-collection-base');         // ref
            require('../src/i-collection');         // ref
            require('../src/i-collection-array');         // ref
            expect(() => require('../src/collection-array')).toThrow(/BaseCollection/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/i-control-lookup');     // ref
            require('../src/i-control-part');       // ref
            require('../src/i-collection-base');         // ref
            require('../src/i-collection');         // ref
            require('../src/i-collection-array');         // ref
            require('../src/observer');             // ref
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
            expect(() => require('../src/collection-property')).toThrow(/Util/);
        });
        it("- 예외 : IPropertyCollection 로딩이 인된경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            expect(() => require('../src/collection-property')).toThrow(/IPropertyCollection/);
        });
        it("- 예외 : BaseCollection 로딩이 인된경우", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/i-control-lookup');     // ref
            require('../src/i-control-part');       // ref
            require('../src/i-collection-base');         // ref
            require('../src/i-collection');         // ref
            require('../src/i-collection-property');
    
            expect(() => require('../src/collection-property')).toThrow(/BaseCollection/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/util-type');            // ref
            require('../src/util');
            require('../src/i-control-lookup');     // ref
            require('../src/i-control-part');       // ref
            require('../src/i-collection-base');         // ref
            require('../src/i-collection');         // ref
            require('../src/observer');             // ref
            require('../src/collection-base');
            require('../src/i-collection-property');
            require('../src/collection-property');
    
            expect(global._L.PropertyCollection).toBeDefined();
            expect(global._L.Collection.PropertyCollection).toBeDefined();
        });
        
    });
});
