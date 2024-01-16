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
                var type01 = [[String]]
                var type02 = [[String, Number]]
                var type03 = [['_opt_', String]]
                var type04 = [['_opt_', String, Number]]
                var type05 = [['_req_', String]]
                var type06 = [['_all_']]
                var type07 = [['_any_']]
                var type08 = [[]];   // any
                var type09 = [['_non_']]
                var type10 = [['_eum_', 'blue', 'red']]
                var type11 = [['_def_', 'blue', 'red']]

                expect(typeOf(type01)).toBe('choice');
                expect(typeOf(type02)).toBe('choice');
                expect(typeOf(type05)).toBe('choice');
                expect(typeOf(type05)).toBe('choice');
                expect(typeOf(type06)).toBe('choice');
                expect(typeOf(type07)).toBe('choice');
                expect(typeOf(type08)).toBe('choice');
                expect(typeOf(type10)).toBe('choice');
                expect(typeOf(type11)).toBe('choice');
                // 타입 객체
                expect(typeObject(type01).kind).toBe('_OPT_');
                expect(typeObject(type01).list).toEqual([String]);
                expect(typeObject(type02).kind).toBe('_OPT_');
                expect(typeObject(type02).list).toEqual([String, Number]);
                expect(typeObject(type03).kind).toBe('_OPT_');
                expect(typeObject(type03).list).toEqual([String]);
                expect(typeObject(type04).kind).toBe('_OPT_');
                expect(typeObject(type04).list).toEqual([String, Number]);
                expect(typeObject(type05).kind).toBe('_REQ_');
                expect(typeObject(type05).list).toEqual([String]);
                expect(typeObject(type06).kind).toBe('_ALL_');
                expect(typeObject(type07).kind).toBe('_ANY_');
                expect(typeObject(type08).kind).toBe('_ANY_');
                expect(typeObject(type09).kind).toBe('_NON_');
                expect(typeObject(type10).kind).toBe('_EUM_');
                expect(typeObject(type10).list).toEqual(['blue', 'red']);
                expect(typeObject(type11).kind).toBe('_DEF_');
                expect(typeObject(type11).list).toEqual(['blue', 'red']);
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
                var type1 = undefined;
                var type2 = {aa: undefined};
                
                expect(isMatchType(type1, undefined)        ).toBe(T);
                expect(isMatchType(type1, null)             ).toBe(false); 
                expect(isMatchType(type2, {aa: undefined})  ).toBe(T);
            });
            it('- isMatchType() : null ', () => {
                var type1 = null;
                
                expect(isMatchType(type1, null)     ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false); 
            });
            it('- isMatchType() : string [리터럴] ', () => {
                var type1 = String;
                var type2 = 'str';
                var type3 = {a: 'str'};
                
                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, '')       ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, 0)        ).toBe(false);
                expect(isMatchType(type1, String)   ).toBe(false);
                // 리터럴
                expect(isMatchType(type2, '')       ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, 0)        ).toBe(false);
                expect(isMatchType(type2, String)   ).toBe(false);
                // 기본값
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 'str'});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 'str'});
            });
            it('- isMatchType() : number [리터럴] ', () => {
                var type1 = Number;
                var type2 = 1;
                var type3 = {a: 1};
                
                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, 0)        ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, Number)   ).toBe(false);
                // 리터럴 (기본값)
                expect(isMatchType(type2, 0)        ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, Number)   ).toBe(false);
                // 기본값
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 1});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 1});
            });
            it('- isMatchType() : boolean [리터럴] ', () => {
                var type1 = Boolean;
                var type2 = false;
                var type3 = {a: true};
                
                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, true)     ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, Boolean)  ).toBe(false);
                // 리터럴 (기본값)
                expect(isMatchType(type2, true)     ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, Boolean)  ).toBe(false);
                // 기본값
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: true});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: true});
            });
            it('- isMatchType() : bigint [리터럴] (ES6+) ', () => {
                var type1 = BigInt;
                var type2 = 10n;
                var type3 = {a: 10n};

                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, 20n)      ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, BigInt)   ).toBe(false);
                // 리터럴 (기본값)
                expect(isMatchType(type2, 20n)      ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, BigInt)   ).toBe(false);
                // 기본값
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 10n});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 10n});
            });
            // REVIEW: 확인 필요
            it('- isMatchType() : symbol (ES6+) ', () => {
                var type1 = Symbol;
                var type2 = Symbol();

                expect(isMatchType(type1, Symbol()) ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, BigInt)   ).toBe(false);
                // 리터럴 (기본값)
                // expect(isMatchType(type2, Symbol()) ).toBe(T);
                // expect(isMatchType(type2, undefined)).toBe(T);
                // expect(isMatchType(type2, '')       ).toBe(false);
                // expect(isMatchType(type2, BigInt)   ).toBe(false);
            });
        });
        describe('확장 타입 ', () => {
            it('- isMatchType() : function 표기법 ', () => {
                // POINT:
                var type1 = function(String, Number){Boolean};
                
                var tar11 = function(String, Number){return Boolean}
                var tar12 = function fun(String, Number){Boolean}
                var tar13 = function fun(String, Number){return Boolean }
                var tar14 = (String, Number) => {Boolean}
                var tar15 = (String, Number) => {return Boolean}


            });
            it('- isMatchType() : function ', () => {
                var type1 = Function;
                var type2 = ()=>{}
                var type3 = (String, Number)=>{Object}
                
                var tar01 = ()=>{};
                var tar02 = ()=>{}; tar02._TYPE = {params: [String, Number], return: [Object]};
                var tar03 = ()=>{}; tar03._TYPE = {params: [String, Number], return: Object};
                var tar04 = ()=>{}; tar04._TYPE = {params: [], return: [Object, String]};
                var tar05 = ()=>{}; tar05._TYPE = {param: [], return: [Object]};

                // type1
                expect(isMatchType(type1,tar01) ).toBe(T);
                expect(isMatchType(type1,tar02) ).toBe(T);
                expect(isMatchType(type1,tar03) ).toBe(T);
                expect(isMatchType(type1,tar04) ).toBe(T);
                expect(isMatchType(type1,tar05) ).toBe(T);
                // type2
                expect(isMatchType(type2,tar01) ).toBe(T);
                expect(isMatchType(type2,tar02) ).toBe(T);
                expect(isMatchType(type2,tar03) ).toBe(T);
                expect(isMatchType(type2,tar04) ).toBe(T);
                expect(isMatchType(type2,tar05) ).toBe(T);
                // type3
                expect(isMatchType(type3,tar01) ).toBe(false);
                expect(isMatchType(type3,tar02) ).toBe(T);
                expect(isMatchType(type3,tar03) ).toBe(T);
                expect(isMatchType(type3,tar04) ).toBe(false);
                expect(isMatchType(type3,tar05) ).toBe(false);
            });
            it('- isMatchType() : function return 종류별 ', () => {
                var type1 = ()=>{[String, Number]}      // return array
                var type2 = ()=>{{a: String}}           // return union
                var type3 = ()=>{[[String, Number]]}    // return choice

                var tar01 = ()=>{}; tar01._TYPE = {params: [String, Number], return: [String, String]};
                var tar02 = ()=>{}; tar02._TYPE = {params: [String, Number]};

                expect(isMatchType(type1,tar01) ).toBe(T);
                expect(isMatchType(type1,tar02) ).toBe(false);

                /**
                 * POINT: 함수 부분은 테스트 해야할 항목과 코드 수정할 부분이 많음..세부적으로 검토 필요
                 */
            });
            it('- isMatchType() : function 모든 타입', () => {
            });
            it('- isMatchType() : function 모든 타입', () => {
            });

            it('- isMatchType() : class ', () => {
                /**
                 * 사용자클래스 : class, function
                 *  상속
                 * 내장클래스 : Date
                 */
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
            
            describe('choice ', () => {
                it('- isMatchType() : choice _opt_ ', () => {
                    var type1 = [[String]];
                    var type2 = [[String, Number]];
                    var type3 = [[String, 10]];
                    var type4 = [['aa', 'bb']];
                    var type5 = [['_opt_']];

                    // type1
                    expect(isMatchType(type1, '')           ).toBe(T);
                    expect(isMatchType(type1, 10)           ).toBe(false);
                    expect(isMatchType(type1, undefined)    ).toBe(T);
                    expect(isMatchType(type1, true)         ).toBe(false);
                    // type2
                    expect(isMatchType(type2, '')           ).toBe(T);
                    expect(isMatchType(type2, 10)           ).toBe(T);
                    expect(isMatchType(type2, undefined)    ).toBe(T);
                    expect(isMatchType(type2, true)         ).toBe(false);
                    // type3
                    expect(isMatchType(type3, '')           ).toBe(T);
                    expect(isMatchType(type3, 10)           ).toBe(T);
                    // expect(isMatchType(type3, 20)           ).toBe(false);   POINT: 소스 반영 필요
                    expect(isMatchType(type3, undefined)    ).toBe(T);
                    expect(isMatchType(type3, true)         ).toBe(false);
                    // type4
                    // expect(isMatchType(type4, '')           ).toBe(false);
                    expect(isMatchType(type4, 'aa')         ).toBe(T);
                    expect(isMatchType(type4, 'bb')         ).toBe(T);
                    expect(isMatchType(type4, 10)           ).toBe(false);
                    expect(isMatchType(type4, undefined)    ).toBe(T);
                    expect(isMatchType(type4, true)         ).toBe(false);
                    // type5
                    expect(isMatchType(type5, '')           ).toBe(false);
                    expect(isMatchType(type5, 10)           ).toBe(false);
                    expect(isMatchType(type5, undefined)    ).toBe(false);
                    expect(isMatchType(type5, true)         ).toBe(false);
                });
                it('- isMatchType() : choice _req_ ', () => {
                    var type1 = [['_req_', String]];
                    var type2 = [['_req_', String, Number]];
                    var type3 = [['_req_', String, 10]];
                    var type4 = [['_req_', 'aa', 'bb']];
                    var type5 = [['_req_']];
                });
                it('- isMatchType() : choice _all_ ', () => {
                    var type1 = [['_all_']];
                });
                it('- isMatchType() : choice _any_ ', () => {
                    var type1 = [['_any_']];
                });
                it('- isMatchType() : choice _non_ ', () => {
                    var type1 = [['_non_']];
                });
                it('- isMatchType() : choice _eum_ ', () => {
                    var type1 = [['_eum_']];
                    var type2 = [['_eum_', 'aa']];
                    var type3 = [['_eum_', 'aa', 'bb']];
                    var type4 = [['_eum_', 'aa', Number]];     // 오류
                });
                it('- isMatchType() : choice _def_ ', () => {
                    var type1 = [['_def_']];
                    var type2 = [['_def_', 'aa']];
                    var type3 = [['_def_', 'aa', 'bb']];
                    var type4 = [['_def_', 'aa', Number]];
                    var type5 = [['_def_', String, Number]];   // 오류
                });            
            });
            
            describe('array ', () => {
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
