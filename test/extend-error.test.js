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
            global.OLD_ENV = false;
        });
        describe("base", () => {
            beforeEach(() => {
                funcA = function funcA(msg = '[ES01]', prop) {
                    try {
                        throw new ExtendError(msg, {a: 'err'}); // 단일
                    } catch (error) {
                        throw error;
                    }
                }
                funcB = function funcB(msg = '[ES02]', prop) {
                    try {
                        funcC();
                    } catch (error) {
                        var e = new ExtendError(msg, error);
                        throw e;
                    }
                }
                funcC = function funcC(msg = '[ES03]', prop = {a: 'err'}) {                    
                    try {
                        throw new ExtendError('[ES04]', prop);
                    } catch (error) {
                        var e = new ExtendError(msg, error);
                        throw e;
                    }
                }
            });
            describe("ExtendError._type: fun <타입>", () => {
                it("- _type : function ", () => {
                    expect(()=> {throw new ExtendError('msg')}).toThrow(/msg/);     // Error 와 동일
                    expect(()=> funcA()).toThrow(/ES01[\s\S]*a : err/);             // 속성 메제지
                    expect(()=> funcB()).toThrow(/ES02[\s\S]*ES03[\s\S]*ES04/);     // 함수 catch 수신
                    expect(()=> funcC()).toThrow(/ES03[\s\S]*ES04/);                // catch 수신
                });
                it("- _type : prop ", () => {
                    expect(()=> { throw new ExtendError('msg', {aa: '10'}) }).toThrow(/aa/);
                    expect(()=> { throw new ExtendError('msg', {aa: 10}) }).toThrow(/msg/);
                    expect(()=> { throw new ExtendError() }).toThrow();
                });

                it("- toString()  ", () => {
                    var err1 = new ExtendError('msg');
                    var err2 = new Error('msg');

                    err1.toString()
                    err2.toString()
                    
                });
            });
            describe("커버리지", () => {
                it("- Error.captureStackTrace 저거후 ", () => {
                    global.OLD_ENV = true;  // 디버깅 
                    const {ExtendError}         = require('../src/extend-error');
                    // var e  = new ExtendError('msg')
                    expect(()=> {throw new ExtendError('msg')}).toThrow(/msg/)
                });
            });

        });
        
    });
    
    
});