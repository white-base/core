/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const Util                  = require('../src/util');
const {CustomError}            = require('../src/custom-error');

//==============================================================
// test
describe("[target: custom-error.js]", () => {
    describe("MetaObject :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("MetaObject._type: fun <타입>", () => {
            it("- _type : function ", () => {
                const e1 = new CustomError('msg', {});
        
                // expect(e1.message).toBe('msg');
            });
        });
        
    });
    
    
});