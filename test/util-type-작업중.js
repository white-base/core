/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {getType, typeObject, typeOf}  = require('../src/util-type');
const {isAllowType, allowType }  = require('../src/util-type');
const { isMatchType, matchType }  = require('../src/util-type');
const T = true;

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        jest.resetModules();
    });
    describe('typeOf(target): str <타입 얻기> ', () => {
        it('- typeOf() : 예외 ', () => {
            var type1 = {$type: 'Not_Type'}
            expect(()=> typeOf(type1)).toThrow('ES022')
        });
        describe('원시 타입 ', () => {
            it('- typeOf() : undefined ', () => {
                var type0 = {$type: 'undefined'}
                var type1
                var type2 = undefined

                expect(typeOf(type0)).toBe('undefined');
                expect(typeOf(type1)).toBe('undefined');
                expect(typeOf(type2)).toBe('undefined');
            });
            it('- typeOf() : null ', () => {
                var type0 = {$type: 'null'}
                var type1 = null;
            
                expect(typeOf(type0)).toBe('null')
                expect(typeOf(type1)).toBe('null')
            });
            it('- typeOf() : string [리터럴] ', () => {
                var type0 = {$type: 'string'}
                var type1 = String
                var type2 = 'str'  // 리터럴
                
                expect(typeOf(type0)).toBe('string');
                expect(typeOf(type1)).toBe('string');
                expect(typeOf(type2)).toBe('string');
            });
            it('- typeOf() : number [리터럴] ', () => {
                var type0 = {$type: 'number'}
                var type1 = Number;
                var type2 = 2;      // 리터럴
                var type3 = NaN;    // 리터럴

                expect(typeOf(type0)).toBe('number');
                expect(typeOf(type1)).toBe('number');
                expect(typeOf(type2)).toBe('number');
                expect(typeOf(type3)).toBe('number');
            });
            it('- typeOf() : boolean [리터럴] ', () => {
                var type0 = {$type: 'boolean'}
                var type1 = Boolean;
                var type2 = true;      // 리터럴
                var type3 = false;     // 리터럴

                expect(typeOf(type0)).toBe('boolean');
                expect(typeOf(type1)).toBe('boolean');
                expect(typeOf(type2)).toBe('boolean');
                expect(typeOf(type3)).toBe('boolean');
            });
            it('- typeOf() : bigint [리터럴] (ES6+) ', () => {
                var type0 = {$type: 'bigint'}
                var type1 = BigInt;
                var type2 = BigInt(100);    // 리터럴
                var type3 = 100n;           // 리터럴

                expect(typeOf(type0)).toBe('bigint');
                expect(typeOf(type1)).toBe('bigint');
                expect(typeOf(type2)).toBe('bigint');
                expect(typeOf(type3)).toBe('bigint');
            });
            it('- typeOf() : symbol (ES6+) ', () => {
                var type0 = {$type: 'symbol'}
                var type1 = Symbol;
                var type2 = Symbol('a');    // 리터럴로 취급 안함
                
                expect(typeOf(type0)).toBe('symbol');
                expect(typeOf(type1)).toBe('symbol');
                expect(typeOf(type2)).toBe('symbol');
            });
        });
        describe('확장 타입 ', () => {
            it('- typeOf() : function ', () => {
                var type0 = {$type: 'function'}
                var type1 = function(){};
                var type2 = ()=>{};

                expect(typeOf(type0)).toBe('function');
                expect(typeOf(type1)).toBe('function');
                expect(typeOf(type2)).toBe('function');
            });
            it('- typeOf() : class ', () => {
                var type0 = {$type: 'class'}
                var type1 = function Corp() {this.nm = 1};
                var type2 = function User() {};
                var type3 = Date;
                var type4 = Promise;
                var type5 = Error;

                expect(typeOf(type0)).toBe('class');
                expect(typeOf(type1)).toBe('class');
                expect(typeOf(type2)).toBe('class');
                expect(typeOf(type3)).toBe('class');
                expect(typeOf(type4)).toBe('class');
                expect(typeOf(type5)).toBe('class');
            });
            it('- typeOf() : regexp [리터럴] ', () => {
                var type0 = {$type: 'regexp'}
                var type1 = RegExp;
                var type2 = /reg/;

                expect(typeOf(type0)).toBe('regexp');
                expect(typeOf(type1)).toBe('regexp');
                expect(typeOf(type2)).toBe('regexp');
            });
            it('- typeOf() : object ', () => {
                var type0 = {$type: 'object'}
                var type1 = new function User() {};
                var type2 = new Date();
                var type3 = {};

                expect(typeOf(type0)).toBe('object');
                expect(typeOf(type1)).toBe('object');
                expect(typeOf(type2)).toBe('object');
                expect(typeOf(type3)).toBe('object');
            });
            it('- typeOf() : union ', () => {
                var type0 = {$type: 'union'}
                var type1 = new function Corp() {this.nm = 1};
                var type2 = {fill:true};
                var type3 = JSON;
                var type4 = Math;

                expect(typeOf(type0)).toBe('union');
                expect(typeOf(type1)).toBe('union');
                expect(typeOf(type2)).toBe('union');
                expect(typeOf(type3)).toBe('union');
                expect(typeOf(type4)).toBe('union');
            });
            it('- typeOf() : choice ', () => {
                var type00 = {$type: 'choice'}
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

                expect(typeOf(type00)).toBe('choice');
                expect(typeOf(type01)).toBe('choice');
                expect(typeOf(type02)).toBe('choice');
                expect(typeOf(type03)).toBe('choice');
                expect(typeOf(type04)).toBe('choice');
                expect(typeOf(type05)).toBe('choice');
                expect(typeOf(type06)).toBe('choice');
                expect(typeOf(type07)).toBe('choice');
                expect(typeOf(type08)).toBe('choice');
                expect(typeOf(type09)).toBe('choice');
                expect(typeOf(type10)).toBe('choice');
                expect(typeOf(type11)).toBe('choice');
            });
            it('- typeOf() : array ', () => {
                var type0 = {$type: 'array'}
                var type1 = [];
                var type2 = Array;
                var type3 = [String]
                var type4 = ['_req_', String]
                var type5 = ['_seq_', String]
                var type6 = ['_any_']
                var type7 = ['_all_'] 

                expect(typeOf(type0)).toBe('array');
                expect(typeOf(type1)).toBe('array');
                expect(typeOf(type2)).toBe('array');
                expect(typeOf(type3)).toBe('array');
                expect(typeOf(type4)).toBe('array');
                expect(typeOf(type5)).toBe('array');
                expect(typeOf(type6)).toBe('array');
                expect(typeOf(type7)).toBe('array');
            });
        });
    });

    describe('getType(target) <타입객체 얻기> ', () => {
        describe('원시 타입 ', () => {
            it('- getType() : string [리터럴] ', () => {
                var type1 = String;
                var type2 = 'str';  // 리터럴
                
                expect(getType(type1).$type   ).toBe('string');
                expect(getType(type1).default).toBe(null);
                
                expect(getType(type2).$type   ).toBe('string');
                expect(getType(type2).default).toBe(type2);
            });
            it('- getType() : number [리터럴] ', () => {
                var type1 = Number;
                var type2 = 2;      // 리터럴
                var type3 = NaN;    // 리터럴

                expect(getType(type1).$type   ).toBe('number');
                expect(getType(type1).default).toBe(null);
                
                expect(getType(type2).$type   ).toBe('number');
                expect(getType(type2).default).toBe(type2);
                
                expect(getType(type3).$type   ).toBe('number');
                expect(getType(type3).default).toBe(type3);
            });
            it('- getType() : boolean [리터럴] ', () => {
                var type1 = Boolean;
                var type2 = true;      // 리터럴
                var type3 = false;     // 리터럴

                expect(getType(type1).$type   ).toBe('boolean');
                expect(getType(type1).default).toBe(null);

                expect(getType(type2).$type   ).toBe('boolean');
                expect(getType(type2).default).toBe(type2);
                
                expect(getType(type3).$type   ).toBe('boolean');
                expect(getType(type3).default).toBe(type3);
            });
            it('- getType() : bigint [리터럴] (ES6+) ', () => {
                var type1 = BigInt;
                var type2 = BigInt(100);    // 리터럴
                var type3 = 100n;           // 리터럴

                expect(getType(type1).$type   ).toBe('bigint');
                expect(getType(type1).default).toBe(null);

                expect(getType(type2).$type   ).toBe('bigint');
                expect(getType(type2).default).toBe(type2);
                
                expect(getType(type3).$type   ).toBe('bigint');
                expect(getType(type3).default).toBe(type3);
            });
        });
        describe('확장 타입 ', () => {
            it('- getType() : function ', () => {
                var type01 = Function; 
                var type02 = function(){};
                var type02 = function( ) {   }; // 공백
                var type03 = function(String, Number){Object};
                var type04 = function(){[Object]};
                var type05 = function(aa, bb){cc};

                var type06 = ()=>{};
                var type07 = ([String])=>{return Number};
                var type08 = (String, Boolean)=>{Number};
                var type09 = ()=>String;
                var type10 = String=>Number;
                var type11 = String=>{Number};
                var type12 = String=>{return Number /** aaa */};

                var type13 = function func (aa, bb){cc};
                var type14 = function func(String){Number};
                var type15 = function func(String){return Number};

                expect(getType(type01).$type   ).toBe('function');
                expect(getType(type01).params ).toEqual([]);
                expect(getType(type01).return ).toEqual(undefined);

                expect(getType(type02).$type   ).toBe('function');
                expect(getType(type02).params ).toEqual([]);
                expect(getType(type02).return ).toEqual(undefined);

                expect(getType(type03).$type   ).toBe('function');
                expect(getType(type03).params ).toEqual([String, Number]);
                expect(getType(type03).return ).toEqual(Object);

                expect(getType(type04).$type   ).toBe('function');
                expect(getType(type04).params ).toEqual([]);
                expect(getType(type04).return ).toEqual([Object]);

                expect(getType(type05).$type   ).toBe('function');
                expect(getType(type05).params ).toEqual([]);
                expect(getType(type06).return ).toEqual(undefined);

                expect(getType(type06).$type   ).toBe('function');
                expect(getType(type06).params ).toEqual([]);
                expect(getType(type06).return ).toEqual(undefined);

                expect(getType(type07).$type   ).toBe('function');
                expect(getType(type07).params ).toEqual([[String]]);
                expect(getType(type07).return ).toEqual(Number);

                expect(getType(type08).$type   ).toBe('function');
                expect(getType(type08).params ).toEqual([String, Boolean]);
                expect(getType(type08).return ).toEqual(Number);

                expect(getType(type09).$type   ).toBe('function');
                expect(getType(type09).params ).toEqual([]);
                expect(getType(type09).return ).toEqual(String);

                expect(getType(type10).$type   ).toBe('function');
                expect(getType(type10).params ).toEqual([String]);
                expect(getType(type10).return ).toEqual(Number);

                expect(getType(type11).$type   ).toBe('function');
                expect(getType(type11).params ).toEqual([String]);
                expect(getType(type11).return ).toEqual(Number);

                expect(getType(type12).$type   ).toBe('function');
                expect(getType(type12).params ).toEqual([String]);
                expect(getType(type12).return ).toEqual(Number);

                expect(getType(type13).$type   ).toBe('function');
                expect(getType(type13).params ).toEqual([]);
                expect(getType(type13).return ).toEqual(undefined);

                expect(getType(type14).$type   ).toBe('function');
                expect(getType(type14).params ).toEqual([String]);
                expect(getType(type14).return ).toEqual(Number);

                expect(getType(type15).$type   ).toBe('function');
                expect(getType(type15).params ).toEqual([String]);
                expect(getType(type15).return ).toEqual(Number);
            });
            it('- getType() : function [특수객체] ', () => {
                var type1 = ()=>{}; 
                var type1 = ()=>{}; 
                var type1 = ()=>{}; 
                var type1 = ()=>{}; 
                var type1 = ()=>{}; 
                
                /**
                 * 조건
                 * - params 는 무조건 배열이어야 한다.
                 */
                type1._TYPE = {params: [ String ]};             // 타입
                type1._TYPE = {params: [ 'aa' ]};               // 선택, 기본값
                type1._TYPE = {params: [ [[ 'aa' ]] ]};         // 선택, 리터럴
                type1._TYPE = {params: [ [[ String ]] ]};       // 선택, 타입
                type1._TYPE = {params: [ [ String ] ]};         // 배열
                type1._TYPE = {params: [ Function ]};           // 함수타입
                type1._TYPE = {params: [ String => Number ]};   // 함수구문
                type1._TYPE = {params: String};                 // 배열 아님    >> 오류
                
                type1._TYPE = {params: [ [[ [[ String, Number ]] ]] ]};   // 초이스 > 초이스
                type1._TYPE = {params: [[ [[String, Number]] ]]};   // 초이스 > 초이스

                type1._TYPE = {params: [[ [String, Number] ]]};   // 초이스 > 배열
                type1._TYPE = {params: [[String], Number]};     // 배열임   >> 오류
                
                /**
                 * 구문을 단축하면, 구문이 모호해지는 단점이 발생한다.
                 * 구문이 단축되는 장점이 있다, 하지만 배열을 사용시 명시적으로 구현해야 한다.
                 */
                type1._TYPE = {params: [[[String, Number]], Number]};             // 배열 아님    >> 혼선


                type1._TYPE = {return: [['_non_']]};    // 리턴에 non
                type1._TYPE = {return: [[String, Number]]};    // 리턴에 non
                type1._TYPE = {return: [String]};    // 리턴에 string



            
            });
            it('- getType() : regexp [리터럴] ', () => {
                var type1 = RegExp;
                var type2 = /reg/;

                expect(getType(type1).$type   ).toBe('regexp');
                expect(getType(type1).default).toEqual(null);

                expect(getType(type2).$type   ).toBe('regexp');
                expect(getType(type2).default).toEqual(/reg/);
            });
            it('- getType() : choice ', () => {
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

                expect(getType(type01).$type).toBe('choice');
                expect(getType(type01).kind).toBe('_OPT_');
                expect(getType(type01).list).toEqual([String]);
                
                expect(getType(type02).$type).toBe('choice');
                expect(getType(type02).kind).toBe('_OPT_');
                expect(getType(type02).list).toEqual([String, Number]);
                
                expect(getType(type03).$type).toBe('choice');
                expect(getType(type03).kind).toBe('_OPT_');
                expect(getType(type03).list).toEqual([String]);
                
                expect(getType(type04).$type).toBe('choice');
                expect(getType(type04).kind).toBe('_OPT_');
                expect(getType(type04).list).toEqual([String, Number]);
                
                expect(getType(type05).$type).toBe('choice');
                expect(getType(type05).kind).toBe('_REQ_');
                expect(getType(type05).list).toEqual([String]);
                
                expect(getType(type06).$type).toBe('choice');
                expect(getType(type06).kind).toBe('_ALL_');
                
                expect(getType(type07).$type).toBe('choice');
                expect(getType(type07).kind).toBe('_ANY_');
                
                expect(getType(type08).$type).toBe('choice');
                expect(getType(type08).kind).toBe('_ANY_');
                
                expect(getType(type09).$type).toBe('choice');
                expect(getType(type09).kind).toBe('_NON_');
                
                expect(getType(type10).$type).toBe('choice');
                expect(getType(type10).kind).toBe('_EUM_');
                expect(getType(type10).list).toEqual(['blue', 'red']);
                
                expect(getType(type11).$type).toBe('choice');
                expect(getType(type11).kind).toBe('_DEF_');
                expect(getType(type11).list).toEqual(['blue', 'red']);
            });
            it('- getType() : array ', () => {
                var type1 = [];
                var type2 = Array;
                var type3 = [String]
                var type4 = ['_req_', String]
                var type5 = ['_seq_', String]
                var type6 = ['_any_']
                var type7 = ['_all_'] 
                var type8 = ['_opt_', String] 

                expect(getType(type1).$type).toBe('array');
                expect(getType(type1).kind).toBe('_ANY_');
                
                expect(getType(type2).$type).toBe('array');
                expect(getType(type2).kind).toBe('_ALL_');
                
                expect(getType(type3).$type).toBe('array');
                expect(getType(type3).kind).toBe('_OPT_');
                expect(getType(type3).list).toEqual([String]);
                
                expect(getType(type4).$type).toBe('array');
                expect(getType(type4).kind).toBe('_REQ_');
                expect(getType(type4).list).toEqual([String]);
                
                expect(getType(type5).$type).toBe('array');
                expect(getType(type5).kind).toBe('_SEQ_');
                expect(getType(type5).list).toEqual([String]);
                
                expect(getType(type6).$type).toBe('array');
                expect(getType(type6).kind).toBe('_ANY_');
                
                expect(getType(type7).$type).toBe('array');
                expect(getType(type7).kind).toBe('_ALL_');

                expect(getType(type8).$type).toBe('array');
                expect(getType(type8).kind).toBe('_OPT_');
                expect(getType(type8).list).toEqual([String]);
            });
        });
    });

    describe('typeObject(target) <타입객체 얻기> ', () => {
        describe('단일 타입 ', () => {
            it('- typeObject() : undefined ', () => {
                var type1 = undefined;
                var type2;

                var obj01 = {$type: 'undefined'};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj01);
            });
            it('- typeObject() : null ', () => {
                var type1 = null;
                var obj01 = {$type: 'null'};

                expect(typeObject(type1)   ).toEqual(obj01);
            });
            it('- typeObject() : string [리터럴] ', () => {
                var type1 = String;
                var type2 = 'str';  // 리터럴

                var obj01 = {$type: 'string'};
                var obj02 = {$type: 'string', default: 'str'};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj02);
            });
            it('- typeObject() : number [리터럴] ', () => {
                var type1 = Number;
                var type2 = 2;      // 리터럴
                var type3 = NaN;    // 리터럴

                var obj01 = {$type: 'number'};
                var obj02 = {$type: 'number', default: 2};
                var obj03 = {$type: 'number', default: NaN};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj02);
                expect(typeObject(type3)   ).toEqual(obj03);
            });
            it('- typeObject() : boolean [리터럴] ', () => {
                var type1 = Boolean;
                var type2 = true;      // 리터럴
                var type3 = false;     // 리터럴  

                var obj01 = {$type: 'boolean'};
                var obj02 = {$type: 'boolean', default: true};
                var obj03 = {$type: 'boolean', default: false};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj02);
                expect(typeObject(type3)   ).toEqual(obj03);

            });
            it('- typeObject() : bigint [리터럴] (ES6+) ', () => {
                var type1 = BigInt;
                var type2 = BigInt(100);    // 리터럴
                var type3 = 100n;           // 리터럴

                var obj01 = {$type: 'bigint'};
                var obj02 = {$type: 'bigint', default: 100n};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj02);
                expect(typeObject(type3)   ).toEqual(obj02);
            });
            it('- typeObject() : symbol (ES6+)  ', () => {
                var type1 = Symbol;
                var type2 = Symbol('a');    // 리터럴로 취급 안함

                var obj01 = {$type: 'symbol'};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj01);
            });
            it('- typeObject() : regexp [리터럴] ', () => {
                var type1 = RegExp;
                var type2 = /reg/;

                var obj01 = {$type: 'regexp'};
                var obj02 = {$type: 'regexp', default: /reg/};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj02);
            });
            it('- typeObject() : object ', () => {
                var type1 = new function User() {};
                var type2 = new Date();
                var type3 = {};

                var obj01 = {$type: 'object'};

                expect(typeObject(type1)   ).toEqual(obj01);
                expect(typeObject(type2)   ).toEqual(obj01);
                expect(typeObject(type3)   ).toEqual(obj01);
            });
        });
        describe('복합 타입 ', () => {
            it('- typeObject() : union ', () => {
                var type1 = {str: 'blue', num: Number, }
                var type2 = {arr: [String], sub: {bool: true}}

                var str1 = {$type: 'string'}
                var str2 = {$type: 'string', default: 'blue'}
                var num1 = {$type: 'number'}
                var arr1 = {$type: 'array', kind: '_OPT_', list: [str1]}

                var boo1 = {$type: 'boolean', default: true}
                var obj1 = {$type: 'union', str: str2, num: num1}
                var obj2 = {$type: 'union', arr: arr1, sub: {$type: 'union', bool: boo1}}

                expect(typeObject(type1)   ).toEqual(obj1);
                expect(typeObject(type2)   ).toEqual(obj2);
            });
            it('- typeObject() : class ', () => {
                var type1 = function Class1(){this.age = 1; this.fun = (a,b)=>{}};
                var type2 = Date;

                var num1 = {$type: 'number', default: 1}
                var obj0 = {$type: 'object'}
                var fun1 = {$type: 'function', params: []}
                var obj1 = {$type: 'class', creator: 'Class1', _instance: {$type: 'union', age: num1, fun: fun1 }};
                var obj2 = {$type: 'class', creator: 'Date', _instance: obj0};

                expect(typeObject(type1)   ).toEqual(obj1);
                expect(typeObject(type2)   ).toEqual(obj2);
            });
            
            it('- typeObject() : choice ', () => { 
                var type01 = [[String]]
                var type02 = [[String, Number]]
                var type03 = [['_opt_', String]]
                var type04 = [['_opt_', String, Number]]
                var type05 = [['_req_', String]]
                var type06 = [['_all_']]
                var type07 = [['_any_']]
                var type08 = [[]];   // any
                var type09 = [['_non_']]
                var type10 = [['_eum_', 'blue', 10]]
                var type11 = [['_def_', 'blue', 10]]

                var str1 = {$type: 'string'}
                var str2 = {$type: 'string', default: 'blue'}
                var num1 = {$type: 'number'}
                var num2 = {$type: 'number', default: 10}
                var obj1 = {$type: 'object'}
                var opt1 = {$type: 'choice', kind: '_OPT_', list: [str1]};
                var opt2 = {$type: 'choice', kind: '_OPT_', list: [str1, num1]};
                var req1 = {$type: 'choice', kind: '_REQ_', list: [str1]};
                var all1 = {$type: 'choice', kind: '_ALL_', list: []};
                var any1 = {$type: 'choice', kind: '_ANY_', list: []};
                var non1 = {$type: 'choice', kind: '_NON_', list: []};
                var eum1 = {$type: 'choice', kind: '_EUM_', list: [str2, num2]};
                var def1 = {$type: 'choice', kind: '_DEF_', list: [str2, num2]};

                expect(typeObject(type01)).toEqual(opt1);
                expect(typeObject(type02)).toEqual(opt2);
                expect(typeObject(type03)).toEqual(opt1);
                expect(typeObject(type04)).toEqual(opt2);
                expect(typeObject(type05)).toEqual(req1);
                expect(typeObject(type06)).toEqual(all1);
                expect(typeObject(type07)).toEqual(any1);
                expect(typeObject(type08)).toEqual(any1);
                expect(typeObject(type09)).toEqual(non1);
                expect(typeObject(type10)).toEqual(eum1);
                expect(typeObject(type11)).toEqual(def1);
            });
            it('- typeObject() : array ', () => {
                var type1 = [];
                var type2 = ['_any_']
                var type3 = Array;
                var type4 = ['_all_'] 
                var type5 = [String]
                var type6 = ['blue', 10]
                var type7 = ['_req_', String]
                var type8 = ['_seq_', String]

                var str1 = {$type: 'string'}
                var str2 = {$type: 'string', default: 'blue'}
                var num1 = {$type: 'number',  default: 10}
                var any1 = {$type: 'array', kind: '_ANY_', list: []}
                var all1 = {$type: 'array', kind: '_ALL_', list: []}
                var opt1 = {$type: 'array', kind: '_OPT_', list: [str1]}
                var opt2 = {$type: 'array', kind: '_OPT_', list: [str2, num1]}
                var req1 = {$type: 'array', kind: '_REQ_', list: [str1]}
                var seq1 = {$type: 'array', kind: '_SEQ_', list: [str1]}

                expect(typeObject(type1)).toEqual(any1);
                expect(typeObject(type2)).toEqual(any1);
                expect(typeObject(type3)).toEqual(all1);
                expect(typeObject(type4)).toEqual(all1);
                expect(typeObject(type5)).toEqual(opt1);
                expect(typeObject(type6)).toEqual(opt2);
                expect(typeObject(type7)).toEqual(req1);
                expect(typeObject(type8)).toEqual(seq1);
            });
            it('- typeObject() : function ', () => {
                var type01 = Function; 
                // 일반 함수, 표현식
                var type02 = function(){};
                var type03 = function(String, Number){Object};
                var type04 = function(){[Object]};                  // 배열 리턴
                var type05 = function(aa, bb){cc};
                // 화살표 함수, 표현식
                var type11 = ()=>{};
                var type12 = ([String])=>{return Number};           // 배열 타입, 리턴
                var type13 = (String, Boolean)=>{Number};
                var type14 = ()=>String;
                var type15 = String=>Number;                        // 괄호 생략
                var type16 = String=>{Number};
                var type17 = String=>{return Number /** aaa */};    // 리턴, 주석
                // 일반 함수, 선언문
                var type21 = function func (aa, bb){cc};            // 비 해석문
                var type22 = function func(String){Number};
                var type23 = function func(String){return Number};

                var str1 = {$type: 'string'}
                var num1 = {$type: 'number'}
                var obj1 = {$type: 'object'}
                var boo1 = {$type: 'boolean'}
                var arr1 = {$type: 'array', kind: '_OPT_', list: [obj1]}
                var arr2 = {$type: 'array', kind: '_OPT_', list: [str1]}
                var fun1 = {$type: 'function', params: []}
                var fun2 = {$type: 'function', params: [str1, num1], return: obj1}
                var fun3 = {$type: 'function', params: [], return: arr1}
                var fun4 = {$type: 'function', params: [arr2], return: num1}
                var fun5 = {$type: 'function', params: [str1, boo1], return: num1}
                var fun6 = {$type: 'function', params: [], return: str1}
                var fun7 = {$type: 'function', params: [str1], return: num1}
                
                expect(typeObject(type01) ).toEqual(fun1);
                expect(typeObject(type02) ).toEqual(fun1);
                expect(typeObject(type03) ).toEqual(fun2);
                expect(typeObject(type04) ).toEqual(fun3);
                expect(typeObject(type05) ).toEqual(fun1);

                expect(typeObject(type11) ).toEqual(fun1);
                expect(typeObject(type12) ).toEqual(fun4);
                expect(typeObject(type13) ).toEqual(fun5);
                expect(typeObject(type14) ).toEqual(fun6);
                expect(typeObject(type15) ).toEqual(fun7);
                expect(typeObject(type16) ).toEqual(fun7);
                expect(typeObject(type17) ).toEqual(fun7);

                expect(typeObject(type21) ).toEqual(fun1);
                expect(typeObject(type22) ).toEqual(fun7);
                expect(typeObject(type23) ).toEqual(fun7);
            });
        });
    });

    // describe('getType(target): obj  <타입 객체 얻기> ', () => {
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
                var type4 = [[String]];
                var type5 = [['str']];
                
                var tar01 = {a: undefined}; 
                var tar02 = {};

                expect(isMatchType(type1, '')       ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, 0)        ).toBe(false);
                expect(isMatchType(type1, String)   ).toBe(false);
                // 기본값
                expect(isMatchType(type2, '')       ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, 0)        ).toBe(false);
                expect(isMatchType(type2, String)   ).toBe(false);
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 'str'});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 'str'});
                // 선택
                expect(isMatchType(type4, '')       ).toBe(T);
                expect(isMatchType(type4, 'str')    ).toBe(T);
                expect(isMatchType(type4, undefined)).toBe(T);
                expect(isMatchType(type4, 0)        ).toBe(false);
                // 리터럴
                expect(isMatchType(type5, '')       ).toBe(false);
                expect(isMatchType(type5, 'str')    ).toBe(T);
                expect(isMatchType(type5, undefined)).toBe(T);
                expect(isMatchType(type5, 0)        ).toBe(false);

            });
            it('- isMatchType() : number [리터럴] ', () => {
                var type1 = Number;
                var type2 = 1;
                var type3 = {a: 1};
                var type4 = [[Number]];
                var type5 = [[10]];
                
                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, 0)        ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, Number)   ).toBe(false);
                // 기본값
                expect(isMatchType(type2, 0)        ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, Number)   ).toBe(false);
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 1});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 1});
                // 선택
                expect(isMatchType(type4, 1)        ).toBe(T);
                expect(isMatchType(type4, 10)       ).toBe(T);
                expect(isMatchType(type4, undefined)).toBe(T);
                expect(isMatchType(type4, '')       ).toBe(false);
                // 리터럴
                expect(isMatchType(type5, 1)        ).toBe(false);
                expect(isMatchType(type5, 10)       ).toBe(T);
                expect(isMatchType(type5, undefined)).toBe(T);
                expect(isMatchType(type5, '')       ).toBe(false);
            });
            it('- isMatchType() : boolean [리터럴] ', () => {
                var type1 = Boolean;
                var type2 = false;
                var type3 = {a: true};
                var type4 = [[Boolean]];
                var type5 = [[true]];                

                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, true)     ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, Boolean)  ).toBe(false);
                // 기본값
                expect(isMatchType(type2, true)     ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, Boolean)  ).toBe(false);
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: true});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: true});
                // 선택
                expect(isMatchType(type4, false)    ).toBe(T);
                expect(isMatchType(type4, true)     ).toBe(T);
                expect(isMatchType(type4, undefined)).toBe(T);
                expect(isMatchType(type4, '')       ).toBe(false);
                // 리터럴
                expect(isMatchType(type5, false)    ).toBe(false);
                expect(isMatchType(type5, true)     ).toBe(T);
                expect(isMatchType(type5, undefined)).toBe(T);
                expect(isMatchType(type5, '')       ).toBe(false);
            });
            it('- isMatchType() : bigint [리터럴] (ES6+) ', () => {
                var type1 = BigInt;
                var type2 = 10n;
                var type3 = {a: 10n};
                var type4 = [[BigInt]];
                var type5 = [[20n]];

                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, 20n)      ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, BigInt)   ).toBe(false);
                // 기본값
                expect(isMatchType(type2, 20n)      ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, BigInt)   ).toBe(false);
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: 10n});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: 10n});
                // 선택
                expect(isMatchType(type4, 10n)      ).toBe(T);
                expect(isMatchType(type4, 20n)      ).toBe(T);
                expect(isMatchType(type4, undefined)).toBe(T);
                expect(isMatchType(type4, '')       ).toBe(false);
                // 리터럴
                expect(isMatchType(type5, 10n)      ).toBe(false);
                expect(isMatchType(type5, 20n)      ).toBe(T);
                expect(isMatchType(type5, undefined)).toBe(T);
                expect(isMatchType(type5, '')       ).toBe(false);
            });
            // REVIEW: 확인 필요
            it('- isMatchType() : symbol (ES6+) ', () => {
                var type1 = Symbol;
                var type2 = Symbol();

                expect(isMatchType(type1, Symbol()) ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, BigInt)   ).toBe(false);
            });
        });
        describe('확장 타입 ', () => {
            it('- isMatchType() : regexp [리터럴] ', () => {
                var type1 = RegExp;
                var type2 = /reg/;
                var type3 = {a: /reg/};
                var type4 = [[RegExp]];
                var type5 = [[/bb/]];

                var tar01 = {a: undefined};
                var tar02 = {};

                expect(isMatchType(type1, /reg2/)   ).toBe(T);
                expect(isMatchType(type1, undefined)).toBe(false);                
                expect(isMatchType(type1, '')       ).toBe(false);
                expect(isMatchType(type1, RegExp)   ).toBe(false);
                // 기본값
                expect(isMatchType(type2, /reg2/)   ).toBe(T);
                expect(isMatchType(type2, undefined)).toBe(T);
                expect(isMatchType(type2, '')       ).toBe(false);
                expect(isMatchType(type2, RegExp)   ).toBe(false);
                expect(isMatchType(type3, tar01)    ).toBe(T);
                expect(tar01                        ).toEqual({a: /reg/});
                expect(isMatchType(type3, tar02)    ).toBe(T);
                expect(tar02                        ).toEqual({a: /reg/});
                // 선택
                expect(isMatchType(type4, /aa/)     ).toBe(T);
                expect(isMatchType(type4, /bb/)     ).toBe(T);
                expect(isMatchType(type4, undefined)).toBe(T);
                expect(isMatchType(type4, '')       ).toBe(false);
                // 리터럴
                expect(isMatchType(type5, /aa/)     ).toBe(false);
                expect(isMatchType(type5, /bb/)     ).toBe(T);
                expect(isMatchType(type5, undefined)).toBe(T);
                expect(isMatchType(type5, '')       ).toBe(false);
            });

            it('- isMatchType() : function ', () => {
                var type1 = Function;
                var type2 = ()=>{};
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
                expect(isMatchType(type3,tar02) ).toBe(false);
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
            it('- isMatchType() : class ', () => {
                /**
                 * - 사용자클래스 : class, function
                 * - 상속 
                 * - 내장클래스 : Date
                 */
                var type1 = function Type1(){ this.age = 1; this.fun = (a,b)=>{} };
                var type2 = class Type2 { age = 10; fun = function(){} };
                var type3 = Date;
                var type4 = class Type4 {};

                var tar01 = new type1();                // union
                var tar02 = new type2();                // union
                var tar03 = { age: 10, fun: ()=>{} };   // union
                var tar04 = { age: 10 };                // union
                var tar05 = new Date();                 // object

                // expect(isMatchType(type1, type1)    ).toBe(T);

                expect(isMatchType(type1, tar01)    ).toBe(T);
                expect(isMatchType(type1, tar02)    ).toBe(T);   
                expect(isMatchType(type1, tar03)    ).toBe(T);
                expect(isMatchType(type1, tar04)    ).toBe(false);
                expect(isMatchType(type1, tar05)    ).toBe(false);

                expect(isMatchType(type2, tar01)    ).toBe(T);
                expect(isMatchType(type2, tar02)    ).toBe(T);
                expect(isMatchType(type2, tar03)    ).toBe(T);
                expect(isMatchType(type2, tar04)    ).toBe(false);
                expect(isMatchType(type2, tar05)    ).toBe(false);

                expect(isMatchType(type3, tar01)    ).toBe(false);
                expect(isMatchType(type3, tar02)    ).toBe(false);
                expect(isMatchType(type3, tar03)    ).toBe(false);
                expect(isMatchType(type3, tar04)    ).toBe(false);
                expect(isMatchType(type3, tar05)    ).toBe(T);

                // expect(isMatchType(type4, tar01)    ).toBe(T);
                // expect(isMatchType(type4, tar02)    ).toBe(T);
                // expect(isMatchType(type4, tar03)    ).toBe(T);
                // expect(isMatchType(type4, tar04)    ).toBe(T);
                // expect(isMatchType(type4, tar05)    ).toBe(T);
                // expect(isMatchType(type4, tar01)    ).toBe(false);
                // expect(isMatchType(type4, tar02)    ).toBe(false);
                // expect(isMatchType(type4, tar03)    ).toBe(false);
                // expect(isMatchType(type4, tar04)    ).toBe(false);
                // expect(isMatchType(type4, tar05)    ).toBe(T);
            });
             
            it('- isMatchType() : object ', () => {
                var type1 = {};
                var type2 = Object;
                var type3 = new Date;
                var type4 = Date;  // class type

                // type1
                expect(isMatchType(type1, {})           ).toBe(T);
                expect(isMatchType(type1, new Date)     ).toBe(T);
                expect(isMatchType(type1, /reg/)        ).toBe(false);
                // type2
                expect(isMatchType(type2, {})           ).toBe(T);
                expect(isMatchType(type2, new Date)     ).toBe(T);
                expect(isMatchType(type2, /reg/)        ).toBe(false);
                // type3
                expect(isMatchType(type3, {})           ).toBe(T);
                expect(isMatchType(type3, new Date)     ).toBe(T);
                expect(isMatchType(type3, /reg/)        ).toBe(false);
                // type4
                expect(isMatchType(type4, {})           ).toBe(false);
                expect(isMatchType(type4, new Date)     ).toBe(T);
                expect(isMatchType(type4, /reg/)        ).toBe(false);
            });
            it('- isMatchType() : union ', () => {
                var type1 = {str: '', num: Number, }
                var type2 = {arr: ['list']}

                var tar11 = {str: 's'}
                var tar12 = {num: 10}
                var tar13 = {str: 's', num: 10}
                var tar14 = {str: 10, num: 10}
                var tar21 = {arr:['list'] }
                var tar22 = {arr:['not'] }
                var tar23 = {arr:[] }
                
                 // type1
                expect(isMatchType(type1, tar11)      ).toBe(false);
                expect(isMatchType(type1, tar12)      ).toBe(T);
                expect(isMatchType(type1, tar13)      ).toBe(T);
                expect(isMatchType(type1, tar14)      ).toBe(false);
                // type2
                expect(isMatchType(type2, tar21)      ).toBe(T);
                expect(isMatchType(type2, tar22)      ).toBe(false);
                expect(isMatchType(type2, tar23)      ).toBe(T);
            });
            
            describe('choice ', () => {
                it('- isMatchType() : choice _opt_ ', () => {
                    var type1 = [[String]];
                    var type2 = [[String, Number]];
                    var type3 = [[String, 10]];
                    var type4 = [['aa', /reg/]];
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
                    expect(isMatchType(type3, 20)           ).toBe(false);
                    expect(isMatchType(type3, undefined)    ).toBe(T);
                    expect(isMatchType(type3, true)         ).toBe(false);
                    // type4
                    expect(isMatchType(type4, '')           ).toBe(false);
                    expect(isMatchType(type4, 'aa')         ).toBe(T);
                    expect(isMatchType(type4, /reg2/)       ).toBe(false);
                    expect(isMatchType(type4, /reg/)        ).toBe(T);
                    expect(isMatchType(type4, 10)           ).toBe(false);
                    expect(isMatchType(type4, undefined)    ).toBe(T);
                    expect(isMatchType(type4, true)         ).toBe(false);
                    // type5 : 모두 실패
                    expect(isMatchType(type5, '')           ).toBe(false);
                    expect(isMatchType(type5, 10)           ).toBe(false);
                    expect(isMatchType(type5, undefined)    ).toBe(false);
                    expect(isMatchType(type5, true)         ).toBe(false);
                });
                it('- isMatchType() : choice _req_ ', () => {
                    var type1 = [['_req_', String]];
                    var type2 = [['_req_', String, Number]];
                    var type3 = [['_req_', String, 10]];
                    var type4 = [['_req_', 'aa', /reg/]];
                    var type5 = [['_req_']];

                    // type1
                    expect(isMatchType(type1, '')           ).toBe(T);
                    expect(isMatchType(type1, 10)           ).toBe(false);
                    expect(isMatchType(type1, undefined)    ).toBe(false);
                    expect(isMatchType(type1, true)         ).toBe(false);
                    // type2
                    expect(isMatchType(type2, '')           ).toBe(T);
                    expect(isMatchType(type2, 10)           ).toBe(T);
                    expect(isMatchType(type2, undefined)    ).toBe(false);
                    expect(isMatchType(type2, true)         ).toBe(false);
                    // type3
                    expect(isMatchType(type3, '')           ).toBe(T);
                    expect(isMatchType(type3, 10)           ).toBe(T);
                    expect(isMatchType(type3, 20)           ).toBe(false);
                    expect(isMatchType(type3, undefined)    ).toBe(false);
                    expect(isMatchType(type3, true)         ).toBe(false);
                    // type4
                    expect(isMatchType(type4, '')           ).toBe(false);
                    expect(isMatchType(type4, 'aa')         ).toBe(T);
                    expect(isMatchType(type4, /reg/)        ).toBe(T);
                    expect(isMatchType(type4, 10)           ).toBe(false);
                    expect(isMatchType(type4, undefined)    ).toBe(false);
                    expect(isMatchType(type4, true)         ).toBe(false);
                    // type5 : 모두 실패
                    expect(isMatchType(type5, '')           ).toBe(false);
                    expect(isMatchType(type5, 10)           ).toBe(false);
                    expect(isMatchType(type5, undefined)    ).toBe(false);
                    expect(isMatchType(type5, true)         ).toBe(false);
                });
                it('- isMatchType() : choice _all_ ', () => {
                    var type1 = [['_all_']];

                    expect(isMatchType(type1, '')           ).toBe(T);
                    expect(isMatchType(type1, 10)           ).toBe(T);
                    expect(isMatchType(type1, true)         ).toBe(T);
                    expect(isMatchType(type1, 1n)           ).toBe(T);
                    expect(isMatchType(type1, Symbol())     ).toBe(T);
                    expect(isMatchType(type1, /reg/)        ).toBe(T);
                    expect(isMatchType(type1, {})           ).toBe(T);
                    expect(isMatchType(type1, {a: 1})       ).toBe(T);
                    expect(isMatchType(type1, Date)         ).toBe(T);
                    expect(isMatchType(type1, [[]])         ).toBe(T);
                    expect(isMatchType(type1, [])           ).toBe(T);
                    expect(isMatchType(type1, undefined)    ).toBe(T);
                });
                it('- isMatchType() : choice _any_ ', () => {
                    var type1 = [['_any_']];

                    expect(isMatchType(type1, '')           ).toBe(T);
                    expect(isMatchType(type1, 10)           ).toBe(T);
                    expect(isMatchType(type1, true)         ).toBe(T);
                    expect(isMatchType(type1, 1n)           ).toBe(T);
                    expect(isMatchType(type1, Symbol())     ).toBe(T);
                    expect(isMatchType(type1, /reg/)        ).toBe(T);
                    expect(isMatchType(type1, {})           ).toBe(T);
                    expect(isMatchType(type1, {a: 1})       ).toBe(T);
                    expect(isMatchType(type1, Date)         ).toBe(T);
                    expect(isMatchType(type1, [[]])         ).toBe(T);
                    expect(isMatchType(type1, [])           ).toBe(T);
                    expect(isMatchType(type1, undefined)    ).toBe(false);
                });
                it('- isMatchType() : choice _non_ ', () => {
                    var type1 = [['_non_']];

                    expect(isMatchType(type1, '')           ).toBe(false);
                    expect(isMatchType(type1, 10)           ).toBe(false);
                    expect(isMatchType(type1, true)         ).toBe(false);
                    expect(isMatchType(type1, 1n)           ).toBe(false);
                    expect(isMatchType(type1, Symbol())     ).toBe(false);
                    expect(isMatchType(type1, /reg/)        ).toBe(false);
                    expect(isMatchType(type1, {})           ).toBe(false);
                    expect(isMatchType(type1, {a: 1})       ).toBe(false);
                    expect(isMatchType(type1, Date)         ).toBe(false);
                    expect(isMatchType(type1, [[]])         ).toBe(false);
                    expect(isMatchType(type1, [])           ).toBe(false);
                    expect(isMatchType(type1, undefined)    ).toBe(T);
                });
                it('- isMatchType() : choice _eum_ ', () => {  
                    var type1 = [['_eum_']];
                    var type2 = [['_eum_', 'aa']];
                    var type3 = [['_eum_', 'aa', /reg/, 10]];
                    var type4 = [['_eum_', 'aa', Number]];     // 오류

                    // type1
                    expect(isMatchType(type1, '')           ).toBe(false);
                    expect(isMatchType(type1, 'aa')         ).toBe(false);
                    // type2
                    expect(isMatchType(type2, '')           ).toBe(false);
                    expect(isMatchType(type2, 'aa')         ).toBe(T);
                    expect(isMatchType(type2, undefined)    ).toBe(false);
                    // type3
                    expect(isMatchType(type3, '')           ).toBe(false);
                    expect(isMatchType(type3, 'aa')         ).toBe(T);
                    expect(isMatchType(type3, /reg/)        ).toBe(T);
                    expect(isMatchType(type3, 10)           ).toBe(T);
                    expect(isMatchType(type3, undefined)    ).toBe(false);
                    // type4
                    expect(isMatchType(type4, 'aa')         ).toBe(false);
                    expect(isMatchType(type4, 10)           ).toBe(false);
                    expect(isMatchType(type4, undefined)    ).toBe(false);
                });
                it('- isMatchType() : choice _def_ ', () => {
                    var type1 = [['_def_']];
                    var type2 = [['_def_', 'aa']];
                    var type3 = [['_def_', 'aa', /reg/, 10]];
                    var type4 = [['_def_', 'aa', Number]];
                    var type5 = [['_def_', String, 10]];   // 오류

                    // type1
                    expect(isMatchType(type1, '')           ).toBe(false);
                    expect(isMatchType(type1, 'aa')         ).toBe(false);
                    // type2
                    expect(isMatchType(type2, '')           ).toBe(false);
                    expect(isMatchType(type2, 'aa')         ).toBe(T);
                    expect(isMatchType(type2, undefined)    ).toBe(T);
                    // type3
                    expect(isMatchType(type3, '')           ).toBe(false);
                    expect(isMatchType(type3, 'aa')         ).toBe(T);
                    expect(isMatchType(type3, /reg/)        ).toBe(T);
                    expect(isMatchType(type3, 10)           ).toBe(T);
                    expect(isMatchType(type3, undefined)    ).toBe(T);
                    // type4
                    expect(isMatchType(type4, '')           ).toBe(false);
                    expect(isMatchType(type4, 'aa')         ).toBe(T);
                    expect(isMatchType(type4, /reg/)        ).toBe(false);
                    expect(isMatchType(type4, 10)           ).toBe(T);
                    expect(isMatchType(type4, undefined)    ).toBe(T);
                    // type5
                    expect(isMatchType(type5, 'aa')         ).toBe(false);
                    expect(isMatchType(type5, 10)           ).toBe(false);
                    expect(isMatchType(type5, undefined)    ).toBe(false);
                });            
            });
            
            describe('array ', () => {
                it('- isMatchType() : array _opt_ ', () => {
                    var type1 = ['_opt_', String];
                    var type2 = [String];
                    var type3 = [String, Number];
                    var type4 = [String, 10];
                    var type5 = ['aa', /reg/];
                    var type6 = ['_opt_'];  // 내용이 없어서 실패

                    // type1
                    expect(isMatchType(type1, [])           ).toBe(T);
                    expect(isMatchType(type1, ['str'])      ).toBe(T);
                    expect(isMatchType(type1, ['aa'])       ).toBe(T);
                    expect(isMatchType(type1, [/reg/])      ).toBe(false);
                    expect(isMatchType(type1, [10])         ).toBe(false);
                    expect(isMatchType(type1, [1])          ).toBe(false);
                    expect(isMatchType(type1, undefined)    ).toBe(false);
                    // type2
                    expect(isMatchType(type2, [])           ).toBe(T);
                    expect(isMatchType(type2, ['str'])      ).toBe(T);
                    expect(isMatchType(type2, ['aa'])       ).toBe(T);
                    expect(isMatchType(type2, [/reg/])      ).toBe(false);
                    expect(isMatchType(type2, [10])         ).toBe(false);
                    expect(isMatchType(type2, [1])          ).toBe(false);
                    expect(isMatchType(type2, undefined)    ).toBe(false);
                    // type3
                    expect(isMatchType(type3, [])           ).toBe(T);
                    expect(isMatchType(type3, ['str'])      ).toBe(T);
                    expect(isMatchType(type3, ['aa'])       ).toBe(T);
                    expect(isMatchType(type3, [/reg/])      ).toBe(false);
                    expect(isMatchType(type3, [10])         ).toBe(T);
                    expect(isMatchType(type3, [1])          ).toBe(T);
                    expect(isMatchType(type3, undefined)    ).toBe(false);
                    // type4
                    expect(isMatchType(type4, [])           ).toBe(T);
                    expect(isMatchType(type4, ['str'])      ).toBe(T);
                    expect(isMatchType(type4, ['aa'])       ).toBe(T);
                    expect(isMatchType(type4, [/reg/])      ).toBe(false);
                    expect(isMatchType(type4, [10])         ).toBe(T);
                    expect(isMatchType(type4, [1])          ).toBe(false);
                    expect(isMatchType(type4, undefined)    ).toBe(false);
                    // type5
                    expect(isMatchType(type5, [])           ).toBe(T);
                    expect(isMatchType(type5, ['str'])      ).toBe(false);
                    expect(isMatchType(type5, ['aa'])       ).toBe(T);
                    expect(isMatchType(type5, [/reg/])      ).toBe(T);
                    expect(isMatchType(type5, [10])         ).toBe(false);
                    expect(isMatchType(type5, [1])          ).toBe(false);
                    expect(isMatchType(type5, undefined)    ).toBe(false);
                    // type6
                    expect(isMatchType(type6, [])           ).toBe(false);
                    expect(isMatchType(type6, ['str'])      ).toBe(false);
                    expect(isMatchType(type6, ['aa'])       ).toBe(false);
                    expect(isMatchType(type6, [/reg/])      ).toBe(false);
                    expect(isMatchType(type6, [10])         ).toBe(false);
                    expect(isMatchType(type6, [1])          ).toBe(false);
                    expect(isMatchType(type6, undefined)    ).toBe(false);
                    
                });
                it('- isMatchType() : array _req_ ', () => {
                    var type1 = ['_req_', String];
                    var type2 = ['_req_', String, Number];
                    var type3 = ['_req_', String, 10];
                    var type4 = ['_req_', 'aa', /reg/];
                    var type5 = ['_req_'];  // 내용이 없어서 실패
                    
                    // type1
                    expect(isMatchType(type1, [])           ).toBe(false);
                    expect(isMatchType(type1, ['str'])      ).toBe(T);
                    expect(isMatchType(type1, ['aa'])       ).toBe(T);
                    expect(isMatchType(type1, [/reg/])      ).toBe(false);
                    expect(isMatchType(type1, [10])         ).toBe(false);
                    expect(isMatchType(type1, [1])          ).toBe(false);
                    // type2
                    expect(isMatchType(type2, [])           ).toBe(false);
                    expect(isMatchType(type2, ['str'])      ).toBe(T);
                    expect(isMatchType(type2, ['aa'])       ).toBe(T);
                    expect(isMatchType(type2, [/reg/])      ).toBe(false);
                    expect(isMatchType(type2, [10])         ).toBe(T);
                    expect(isMatchType(type2, [1])          ).toBe(T);
                    // type3
                    expect(isMatchType(type3, [])           ).toBe(false);
                    expect(isMatchType(type3, ['str'])      ).toBe(T);
                    expect(isMatchType(type3, ['aa'])       ).toBe(T);
                    expect(isMatchType(type3, [/reg/])      ).toBe(false);
                    expect(isMatchType(type3, [10])         ).toBe(T);
                    expect(isMatchType(type3, [1])          ).toBe(false);
                    // type4
                    expect(isMatchType(type4, [])           ).toBe(false);
                    expect(isMatchType(type4, ['str'])      ).toBe(false);
                    expect(isMatchType(type4, ['aa'])       ).toBe(T);
                    expect(isMatchType(type4, [/reg/])      ).toBe(T);
                    expect(isMatchType(type4, [10])         ).toBe(false);
                    expect(isMatchType(type4, [1])          ).toBe(false);
                    // type5
                    expect(isMatchType(type5, [])           ).toBe(false);
                    expect(isMatchType(type5, ['str'])      ).toBe(false);
                    expect(isMatchType(type5, ['aa'])       ).toBe(false);
                    expect(isMatchType(type5, [/reg/])      ).toBe(false);
                    expect(isMatchType(type5, [10])         ).toBe(false);
                    expect(isMatchType(type5, [1])          ).toBe(false);
                });
                it('- isMatchType() : array _seq_ ', () => {
                    var type1 = ['_seq_', String];
                    var type2 = ['_seq_', String, Number];
                    var type3 = ['_seq_', String, 10];
                    var type4 = ['_seq_', 'aa', /reg/];
                    var type5 = ['_seq_'];  // 내용이 없어서 실패

                    // type1
                    expect(isMatchType(type1, [])           ).toBe(false);
                    expect(isMatchType(type1, ['str'])      ).toBe(T);
                    expect(isMatchType(type1, ['aa', 1])    ).toBe(T);
                    expect(isMatchType(type1, ['str', 10])  ).toBe(T);
                    // type2
                    expect(isMatchType(type2, [])           ).toBe(false);
                    expect(isMatchType(type2, ['str'])      ).toBe(false);
                    expect(isMatchType(type2, ['aa', 1])    ).toBe(T);
                    expect(isMatchType(type2, ['str', 10])  ).toBe(T);
                    // type3
                    expect(isMatchType(type3, [])           ).toBe(false);
                    expect(isMatchType(type3, ['aa', 1])    ).toBe(false);
                    expect(isMatchType(type3, ['str', 10])  ).toBe(T);
                    // type4
                    expect(isMatchType(type4, [])           ).toBe(false);
                    expect(isMatchType(type4, ['aa'])       ).toBe(false);
                    expect(isMatchType(type4, ['aa', 10])   ).toBe(false);
                    expect(isMatchType(type4, ['aa', /reg/])).toBe(T);
                    // type5
                    expect(isMatchType(type5, [])           ).toBe(false);
                    expect(isMatchType(type5, ['aa', 10])   ).toBe(false);
                    expect(isMatchType(type5, ['aa'])       ).toBe(false);
                });
                it('- isMatchType() : array _all_ ', () => {
                    var type1 = ['_all_'];

                    expect(isMatchType(type1, [])           ).toBe(T);
                    expect(isMatchType(type1, ['str'])      ).toBe(T);
                    expect(isMatchType(type1, ['aa', 1])    ).toBe(T);
                    expect(isMatchType(type1, ['str', 10])  ).toBe(T);
                    expect(isMatchType(type1, undefined)    ).toBe(false);
                });
                it('- isMatchType() : array _any_ ', () => {
                    var type1 = ['_any_'];

                    expect(isMatchType(type1, [])           ).toBe(false);
                    expect(isMatchType(type1, ['str'])      ).toBe(T);
                    expect(isMatchType(type1, ['aa', 1])    ).toBe(T);
                    expect(isMatchType(type1, ['str', 10])  ).toBe(T);
                    expect(isMatchType(type1, undefined)    ).toBe(false);
                });
                it('- isMatchType() : array 리터럴 ', () => {
                    // 이전에서 체크 하였음
                });
            });

        });
        // TODO: 대상의 하위로 이동
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
