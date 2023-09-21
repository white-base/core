/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe.skip("[ GROUP]", () => {
    describe("load: util-type.js <Util.type >", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- namespace : util-type.js ", () => {
            require('../src/util-type');
            
            expect(global._L.Common.Util.getAllProperties).toBeDefined();
            expect(global._L.Common.Util.checkType).toBeDefined();
            expect(global._L.Common.Util.checkUnionType).toBeDefined();
            expect(global._L.Common.Util.validType).toBeDefined();
            expect(global._L.Common.Util.validUnionType).toBeDefined();
            expect(global._L.Common.Util.getTypeMap).toBeDefined();
        });
    });
    
    describe("load: util.js <Util>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
        it("- namespace : util.js ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            // util-type.js
            expect(global._L.Common.Util.getAllProperties).toBeDefined();
            expect(global._L.Common.Util.checkType).toBeDefined();
            expect(global._L.Common.Util.checkUnionType).toBeDefined();
            expect(global._L.Common.Util.validType).toBeDefined();
            expect(global._L.Common.Util.validUnionType).toBeDefined();
            expect(global._L.Common.Util.getTypeMap).toBeDefined();
            /// util.js
            expect(global._L.Common.Util.inherits).toBeDefined();
            expect(global._L.Common.Util.getArrayDepth).toBeDefined();
            expect(global._L.Common.Util.createGuid).toBeDefined();
            expect(global._L.Common.Util.implements).toBeDefined();
        });
        it("- 예외 : util-type.js 로딩이 인된경우", () => {
            require('../src/message');
            expect(() => require('../src/util')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : util-type.js : getAllProperties 제거", () => {
            require('../src/message');
            require('../src/util-type');
            delete global._L.Common.Util.getAllProperties;
            expect(() => require('../src/util')).toThrow(/getAllProperties/);
        });
        it("- 예외 : util-type.js : checkType 제거", () => {
            require('../src/message');
            require('../src/util-type');
            delete global._L.Common.Util.checkType;
            expect(() => require('../src/util')).toThrow(/checkType/);
        });
        it("- 예외 : util-type.js : checkUnionType 제거", () => {
            require('../src/message');
            require('../src/util-type');
            delete global._L.Common.Util.checkUnionType;
            expect(() => require('../src/util')).toThrow(/checkUnionType/);
        });
        it("- 예외 : util-type.js : validType 제거", () => {
            require('../src/message');
            require('../src/util-type');
            delete global._L.Common.Util.validType;
            expect(() => require('../src/util')).toThrow(/validType/);
        });
        it("- 예외 : util-type.js : validUnionType 제거", () => {
            require('../src/message');
            require('../src/util-type');
            delete global._L.Common.Util.validUnionType;
            expect(() => require('../src/util')).toThrow(/validUnionType/);
        });
        
    });
    // describe("< util.js 정상 로딩 >", () => {
    //     beforeEach(() => {
    //         jest.resetModules();
    //         global._L = null;
    //         require('../src/util-type');
    //         require('../src/util');
            
    //         // util-type.js
    //         expect(global._L.Common.Util.getAllProperties).toBeDefined();
    //         expect(global._L.Common.Util.checkType).toBeDefined();
    //         expect(global._L.Common.Util.checkUnionType).toBeDefined();
    //         expect(global._L.Common.Util.validType).toBeDefined();
    //         expect(global._L.Common.Util.validUnionType).toBeDefined();
    //         expect(global._L.Common.Util.getTypeMap).toBeDefined();
    //         /// util.js
    //         expect(global._L.Common.Util.inherits).toBeDefined();
    //         expect(global._L.Common.Util.getArrayDepth).toBeDefined();
    //         expect(global._L.Common.Util.createGuid).toBeDefined();
    //         expect(global._L.Common.Util.implements).toBeDefined();
    //      });
    //     it('- Util.inherits : 부모 삽입 안함 ', () => {
    //         const Util      = global._L.Common.Util;
    //         const Super = function() { this.foo = 1 };
    //         const Bar = function() { 
    //             Super.call(this);
    //             this.bar = 10 
    //         };
    //         Util.inherits(Bar);
    //         const i = new Bar();
    
    //         expect(Bar.super).not.toEqual(Super);   // Super 가 아님
    //         expect(i.foo).toBe(1);
    //         expect(i.bar).toBe(10);
    //     });
    // });
});

