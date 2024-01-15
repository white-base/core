/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {typeObject, typeOf}  = require('../src/util-type');
const {isAllowType, allowType }  = require('../src/util-type');
const { isMatchType, matchType }  = require('../src/util-type');
const T = true;

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        jest.resetModules();
    });
    describe('typeOf(target): str & typeObject(target)  <타입 얻기> ', () => {
        describe('원시 타입 ', () => {
            it('- typeOf() : undefined ', () => {
                var type1;
                var type2 = undefined;

                expect(typeOf(type1)).toBe('undefined');
                expect(typeOf(type2)).toBe('undefined');
            });
            it('- typeOf() : null ', () => {
                var type1 = null;
                
                expect(typeOf(type1)).toBe('null');
            });
            it('- typeOf() : string [리터럴] ', () => {
                var type1 = String;
                var type2 = 'str';  // 리터럴
                
                expect(typeOf(type1)).toBe('string');
                expect(typeOf(type2)).toBe('string');
                // 타입 객체
                expect(typeObject(type2).default).toBe(type2);
            });
            it('- typeOf() : number [리터럴] ', () => {
                var type1 = Number;
                var type2 = 2;      // 리터럴
                var type3 = NaN;    // 리터럴

                expect(typeOf(type1)).toBe('number');
                expect(typeOf(type2)).toBe('number');
                expect(typeOf(type3)).toBe('number');
                // 타입 객체
                expect(typeObject(type2).default).toBe(type2);
                expect(typeObject(type3).default).toBe(type3);
            });
            it('- typeOf() : boolean [리터럴] ', () => {
                var type1 = Boolean;
                var type2 = true;      // 리터럴
                var type3 = false;     // 리터럴

                expect(typeOf(type1)).toBe('boolean');
                expect(typeOf(type2)).toBe('boolean');
                expect(typeOf(type3)).toBe('boolean');
                // 타입 객체
                expect(typeObject(type2).default).toBe(type2);
                expect(typeObject(type3).default).toBe(type3);
            });
            it('- typeOf() : bigint [리터럴] (ES6+) ', () => {
                var type1 = BigInt;
                var type2 = BigInt(100);    // 리터럴
                var type3 = 100n;           // 리터럴

                expect(typeOf(type1)).toBe('bigint');
                expect(typeOf(type2)).toBe('bigint');
                expect(typeOf(type3)).toBe('bigint');
                // 타입 객체
                expect(typeObject(type2).default).toBe(type2);
                expect(typeObject(type3).default).toBe(type3);
            });
            it('- typeOf() : symbol (ES6+) ', () => {
                var type1 = Symbol;
                var type2 = Symbol('a');    // 리터럴로 취급 안함
                
                expect(typeOf(type1)).toBe('symbol');
                expect(typeOf(type2)).toBe('symbol');
            });
        });
        describe('확장 타입 ', () => {
            it('- typeOf() : function ', () => {
                expect(typeOf(Function)        ).toBe('function');
                expect(typeOf(()=>{})          ).toBe('function');
            });
            it('- typeOf() : class ', () => {
                var type1 = function Corp() {this.nm = 1};
                var type2 = function User() {};
                var type3 = Date;
                var type4 = Promise;

                expect(typeOf(type1)).toBe('class');
                expect(typeOf(type2)).toBe('class');
                expect(typeOf(type3)).toBe('class');
                expect(typeOf(type4)).toBe('class');
            });
            it('- typeOf() : regexp [리터럴] ', () => {
                var type1 = RegExp;
                var type2 = /reg/;

                expect(typeOf(type1)).toBe('regexp');
                expect(typeOf(type2)).toBe('regexp');
                // 타입 객체
                expect(typeObject(type2).default).toEqual(/reg/);
            });
            it('- typeOf() : object ', () => {
                var type1 = new function User() {};
                var type2 = new Date();
                var type3 = {};

                expect(typeOf(type1)).toBe('object');
                expect(typeOf(type2)).toBe('object');
                expect(typeOf(type3)).toBe('object');
            });
            it('- typeOf() : union ', () => {
                var type1 = new function Corp() {this.nm = 1};
                var type2 = {fill:true};
                var type3 = JSON;
                var type4 = Math;

                expect(typeOf(type1)).toBe('union');
                expect(typeOf(type2)).toBe('union');
                expect(typeOf(type3)).toBe('union');
                expect(typeOf(type4)).toBe('union');
            });
            it('- typeOf() : choice ', () => {
                var type1 = [[String]]
                var type2 = [[String, Number]];
                var type3 = [['_req_', String]];
                var type4 = [['_all_']];
                var type5 = [['_any_']];
                var type6 = [[]];   // any
                var type7 = [['_non_']];
                var type8 = [['_eum_', 'blue', 'red']];
                var type9 = [['_def_', 'blue', 'red']];

                expect(typeOf(type1)).toBe('choice');
                expect(typeOf(type2)).toBe('choice');
                expect(typeOf(type3)).toBe('choice');
                expect(typeOf(type4)).toBe('choice');
                expect(typeOf(type5)).toBe('choice');
                expect(typeOf(type6)).toBe('choice');
                expect(typeOf(type7)).toBe('choice');
                expect(typeOf(type8)).toBe('choice');
                expect(typeOf(type9)).toBe('choice');
                // 타입 객체
                expect(typeObject(type1).kind).toBe('_OPT_');
                expect(typeObject(type2).kind).toBe('_OPT_');
                expect(typeObject(type3).kind).toBe('_REQ_');
                expect(typeObject(type4).kind).toBe('_ALL_');
                expect(typeObject(type5).kind).toBe('_ANY_');
                expect(typeObject(type6).kind).toBe('_ANY_');
                expect(typeObject(type7).kind).toBe('_NON_');
                expect(typeObject(type8).kind).toBe('_EUM_');
                expect(typeObject(type9).kind).toBe('_DEF_');
            });
            it('- typeOf() : array ', () => {
                var type1 = [];
                var type2 = Array;
                var type3 = [String]
                var type4 = ['_req_', String]
                var type5 = ['_seq_', String]
                var type6 = ['_any_']
                var type7 = ['_all_'] 

                expect(typeOf(type1)).toBe('array');
                expect(typeOf(type2)).toBe('array');
                expect(typeOf(type3)).toBe('array');
                expect(typeOf(type4)).toBe('array');
                expect(typeOf(type5)).toBe('array');
                expect(typeOf(type6)).toBe('array');
                expect(typeOf(type7)).toBe('array');
                // 타입 객체
                expect(typeObject(type1).kind).toBe('_ANY_');
                expect(typeObject(type2).kind).toBe('_ALL_');
                expect(typeObject(type3).kind).toBe('_OPT_');
                expect(typeObject(type4).kind).toBe('_REQ_');
                expect(typeObject(type5).kind).toBe('_SEQ_');
                expect(typeObject(type6).kind).toBe('_ANY_');
                expect(typeObject(type7).kind).toBe('_ALL_');
            });
        });
    });
    // describe('typeObject(target): obj  <타입 객체 얻기> ', () => {
    //     // typeOf 와 비슷함
    // });
    describe('isMatchType(type, target): bool  <타입 매치 여부> ', () => {
        describe('원시 타입 ', () => {
            it('- isMatchType() : undefined ', () => {
                //
            });
            it('- isMatchType() : null ', () => {
                //
            });
            it('- isMatchType() : string [리터럴] ', () => {
                //
            });
            it('- isMatchType() : number [리터럴] ', () => {
                //
            });
            it('- isMatchType() : boolean [리터럴] ', () => {
                //
            });
            it('- isMatchType() : bigint [리터럴] (ES6+) ', () => {
                //
            });
            it('- isMatchType() : symbol (ES6+) ', () => {
                //
            });
        });
        describe('확장 타입 ', () => {
            it('- isMatchType() : function ', () => {
                //
            });
            it('- isMatchType() : class ', () => {
                //
            });
            it('- isMatchType() : regexp [리터럴] ', () => {
                //
            });
            it('- isMatchType() : object ', () => {
                //
            });
            it('- isMatchType() : union ', () => {
                //
            });
            it('- isMatchType() : choice _opt_ ', () => {
                //
            });
            it('- isMatchType() : choice _req_ ', () => {
                //
            });
            it('- isMatchType() : choice _all_ ', () => {
                //
            });
            it('- isMatchType() : choice _any_ ', () => {
                //
            });
            it('- isMatchType() : choice _non_ ', () => {
                //
            });
            it('- isMatchType() : choice _eum_ ', () => {
                //
            });
            it('- isMatchType() : choice _def_ ', () => {
                //
            });
            it('- isMatchType() : choice 리터럴 ', () => {
                //
            });

            it('- isMatchType() : array _opt_ ', () => {
                //
            });
            it('- isMatchType() : array _req_ ', () => {
                //
            });
            it('- isMatchType() : array _seq_ ', () => {
                //
            });
            it('- isMatchType() : array _all_ ', () => {
                //
            });
            it('- isMatchType() : array _any_ ', () => {
                //
            });
            it('- isMatchType() : array 리터럴 ', () => {
                //
            });

        });
        describe('중첩 구조 ', () => {
            it('- isMatchType() : function ', () => {
                // 다양한 함수의 파싱 방식 
            });
            it('- isMatchType() : union ', () => {
                // union + union
            });
            it('- isMatchType() : choice ', () => {
                // choice + union
            });
            it('- isMatchType() : array ', () => {
                // choice + union
            });
        });
        describe('function type ', () => {
            it('- isMatchType() : function ', () => {
                // 파싱에 대한 분석
            });
        });                
    });
    describe('matchType(type, target): bool  <타입 매치 예외> ', () => {
    });
    describe('isAllowType(type, target): bool  <타입 매치 여부> ', () => {
    });
    describe('allowType(type, target): bool  <타입 매치 예외> ', () => {
    });
});
