/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("[ GROUP]", () => {

    describe("load: custom-error.js <CustomError>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
         });
         it("- 예외 : 전체 로딩 안할 때", () => {
            expect(() => require('../src/custom-error')).toThrow(/Cannot read properties/);
        });
        it("- 예외 : Util 로딩이 인된경우", () => {
            require('../src/message');
    
            expect(() => require('../src/meta-registry')).toThrow(/Util/);
        });
        it("- 로딩 성공 ", () => {
            require('../src/message');
            require('../src/util-type');
            require('../src/util');
            
            require('../src/custom-error');
            
            expect(global._L.CustomError).toBeDefined();
            expect(global._L.Common.CustomError).toBeDefined();
        });
    });

    describe("load: load-namespace.js <loadNamespace()>", () => {
        beforeEach(() => {
            jest.resetModules();
            global._L = null;
        });
        // it("- 예외 : 전체 로딩 안할 때", () => {
        //     expect(() => require('../src/custom-error')).toThrow(/Cannot read properties/);
        // });
        it("- 로딩 성공 ", () => {

            require('../src/load-namespace');
            
            expect(global._L.loadNamespace).toBeDefined();
            expect(global._L.Common.loadNamespace).toBeDefined();
        });
    });

});

