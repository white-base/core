/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
// const Util                  = require('../src/util');
const {ExtendError}         = require('../src/extend-error');

let funcA, funcB, funcC
//==============================================================
// test
describe("[target: extend-error.js]", () => {
    describe("ExtendError :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("base", () => {
            beforeEach(() => {
                funcA = function funcA(msg = '[ES01]', prop) {
                    try {
                        funcB(msg, prop);
                    } catch (error) {
                        var e = new ExtendError('[ES01]', error);
                        throw e;
                    }
                }
                funcB = function funcB(msg = '[ES02]', prop) {
                    try {
                        funcC(msg, prop);
                    } catch (error) {
                        var e = new ExtendError('[ES02]', error);
                        throw e;
                    }
                }
                funcC = function funcC(msg1 = '[ES04]', msg2 = '[ES03]', prop) {                    
                    try {
                        throw new ExtendError(msg1, prop);
                    } catch (error) {
                        var e = new ExtendError(msg2, error);
                        throw e;
                    }
                }
            });
            describe("MetaObject._type: fun <타입>", () => {
                it("- _type : function ", () => {
                    // const e1 = new CustomError('msg', {});
                    const e1 = new ExtendError('msg', {});
                    // funcA();
                    expect(()=> funcA()).toThrow(/ES01/); 
                });
            });

        });
        
    });
    
    
});