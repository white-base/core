/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {extendType, typeOf}  = require('../src/util-type');
const {isAllowType, allowType }  = require('../src/util-type');
const { isMatchType, matchType }  = require('../src/util-type');
const T = true;

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        // global.console.warn = jest.fn();
        jest.resetModules();
        // MetaRegistry.init();
        
    });
    describe.skip('typeOf(type) : 타입 얻기 ', () => {
        it('- typeOf() : 원시 타입 얻기 ', () => {
            // undefined
            expect(typeOf()                ).toBe('undefined');
            // null
            expect(typeOf(null)            ).toBe('null');
            // number, NaN
            expect(typeOf(Number)          ).toBe('number');
            expect(typeOf(1)               ).toBe('number');
            expect(typeOf(NaN)             ).toBe('number');
            expect(extendType(2).default     ).toBe(2);
            // string
            expect(typeOf(String)          ).toBe('string');
            expect(typeOf('str')           ).toBe('string');
            expect(extendType('str').default ).toBe('str');
            // boolean
            expect(typeOf(Boolean)         ).toBe('boolean');
            expect(typeOf(true)            ).toBe('boolean');
            expect(extendType(true).default  ).toBe(true);
            // Symbol (ES6+)
            expect(typeOf(Symbol)          ).toBe('symbol');
            expect(typeOf(Symbol('a'))     ).toBe('symbol');
            // BigInt (ES6+)
            expect(typeOf(BigInt)          ).toBe('bigint');    // bigint 로 변경되야함
            expect(typeOf(BigInt(100))     ).toBe('bigint');
            expect(typeOf(100n)            ).toBe('bigint');
        });
        it('- typeOf() : 참조 타입 얻기 ', () => {
            function User() {};             // object
            
            // function
            expect(typeOf(Function)        ).toBe('function');
            expect(typeOf(()=>{})          ).toBe('function');
            // object
            expect(typeOf(Object)          ).toBe('object');
            expect(typeOf({})              ).toBe('object');
            expect(typeOf(new User)        ).toBe('object');       // 빈객체
            expect(typeOf(new Date())      ).toBe('object');
        });

        it('- typeOf() : 확장 타입 얻기 ', () => {
            function Corp() {this.nm = 1};  // union
            function User() {};             // object

            // choice
            expect(typeOf([[String]])        ).toBe('choice');
            expect(typeOf([[String, Number]])).toBe('choice');
            expect(typeOf([[]])              ).toBe('choice');
            // union
            expect(typeOf({fill:true})       ).toBe('union');
            // user class 
            expect(typeOf(Corp)              ).toBe('class');
            expect(typeOf(new Corp)          ).toBe('union');
            expect(typeOf(User)              ).toBe('class');
            expect(typeOf(new User)          ).toBe('object');       // 빈객체
            // array
            expect(typeOf([])                ).toBe('array');
            expect(typeOf(Array)             ).toBe('array');
            expect(typeOf(['_seq_'])         ).toBe('array');
            expect(typeOf(['_opt_'])         ).toBe('array');
            expect(typeOf(['_any_'])         ).toBe('array');
        });

        it('- typeOf() : 확장(built-in) 타입 얻기 ', () => {
            // RegExp
            // expect(typeOf(RegExp)            ).toBe('class');    // RegExp
            // expect(typeOf(/reg/)             ).toBe('object');
            // Date
            expect(typeOf(Date)              ).toBe('class');
            expect(typeOf(new Date())        ).toBe('object');
            // Math (union 형태임)
            expect(typeOf(Math)              ).toBe('union');
            expect(typeOf(Math.E)            ).toBe('number');
            expect(typeOf(Math.LN2)          ).toBe('number');
            // JSON
            expect(typeOf(JSON)              ).toBe('union');
            // Map
            expect(typeOf(Map)               ).toBe('class');    // Map
            expect(typeOf(new Map())         ).toBe('union');
            // Int8Array
            expect(typeOf(Int8Array)         ).toBe('class');
            expect(typeOf(new Int8Array(2))  ).toBe('union');
            // Promise
            expect(typeOf(Promise)           ).toBe('class');
            expect(typeOf(new Promise((r,r2) => {}))     ).toBe('union');
        });

        it('- 예외 :  ', () => {
            // BigInt는 사용 안함
            // expect(() => typeOf(2n ** 53n) ).toThrow('ES022');
        });

    });

    describe('matchType() : 타입 검사, 실패시 예외 ', () => {
        it('- 예외 : function  ', () => {
            var type1 = ()=> Number
            var type1_1 = ()=>{}
            var type2 = (a,b)=> {"A"}
            
            // REVIEW: 오류 코드에 작성
            // expect(() => matchType(type1, type1_1)).toThrow(/ES069/);
            // expect(() => matchType(type2, type1_1)).toThrow(/ES069/);
        });
        it('- matchType() : function (외부 참조형 타입 비교) ', () => {
            /**
             * function 의 args 영역 규칙
             * - 거부
             *  + 정수명(0~9) 입력 불가
             *  + 내부에 function 사용 불가, ()=> {} 또한 불가
             * - 허용 
             *  + 객체 및 배열은 가능
             *  + String 원시함수이름을 사용하면, 변수로 인식한다.
             */
            var arg1 = [String, {aa: Number}]
            var type1 = function(arg1){}
            var type2 = function(String, {aa: Number}){}  
            var type3 = function(){}
            var type4 = function([{aa: Number}]){}
            var tar1 = function(){}; 
            var tar2 = function(){};
            tar1._TYPE = {params: [String, {aa: Number}], return: [Object]}
            tar2._TYPE = {params: [[{aa: Number}]]}
            type3._TYPE = {params: arg1}


            // REVIEW: 오류 코드에 작성
            // expect(()=> matchType(type1, tar1)).toThrow(/ES069/);    // func 내부 참조변수 오류
            expect(matchType(type2, tar1)).toBe(undefined);
            expect(matchType(type3, tar1)).toBe(undefined);
            expect(matchType(type4, tar2)).toBe(undefined);
            
            // TODO: 확인해야함
            // expect(matchType(type3, tar1)).toBe(false);  
            // expect(matchType(type3, tar2)).toBe(true);

        });
    });

    describe('isMatchType() & matchType() : 검사 ', () => {
        
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(isMatchType({}, Object             )).toBe(false);
            // expect(isMatchType(null, Object)).toBe(true);
            // expect(isMatchType({}, /reg/              )).toBe(true);
            expect(isMatchType({}, new Func()         )).toBe(true);
            expect(isMatchType({}, Func               )).toBe(false);   // POINT: 실패해야함, 내용이 있는 함수는 실패해야함
            expect(isMatchType({}, Number             )).toBe(false);    // false
            expect(isMatchType({}, Symbol             )).toBe(false);    // false
            // false (예외)
            // expect(()=> matchType(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> matchType(Object, 'str'     )).toThrow(/ES024/);
            expect(()=> matchType(Object, 1         )).toThrow(/ES024/);
            expect(()=> matchType(Object, Symbol()  )).toThrow(/ES024/);
            expect(()=> matchType(Object, true      )).toThrow(/ES024/);
            // expect(()=> matchType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> matchType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> matchType(Object, null      )).toThrow(/ES024/);
        });
        
    });

    describe('isAllowType(), allowType() : 타입 허용 ', () => {
        it('- isAllowType(a, b) : 원시 자료형 ', () => { 
            // null
            expect(isAllowType(null,      null        )).toBe(T);
            expect(isAllowType(null,      undefined   )).toBe(false); 
            // Number
            expect(isAllowType(Number,    Number      )).toBe(T);
            expect(isAllowType(Number,    10          )).toBe(T);
            expect(isAllowType(Number,    NaN         )).toBe(T);
            expect(isAllowType(Number,    String      )).toBe(false);
            expect(isAllowType(Number,    true        )).toBe(false);
            expect(isAllowType(NaN,       Number      )).toBe(false);
            expect(isAllowType(NaN,       NaN         )).toBe(false);
            expect(isAllowType(NaN,       10          )).toBe(false);
            expect(isAllowType(10,        10          )).toBe(T);
            expect(isAllowType(10,        20          )).toBe(false);
            expect(isAllowType(10,        Number      )).toBe(false);
            expect(isAllowType(10,        NaN         )).toBe(false); 
            // String
            expect(isAllowType(String,    String      )).toBe(T);
            expect(isAllowType(String,    ''          )).toBe(T);
            expect(isAllowType(String,    10          )).toBe(false);
            expect(isAllowType(String,    Boolean     )).toBe(false);
            expect(isAllowType('str',     'str'       )).toBe(T);
            expect(isAllowType('str',     ''          )).toBe(false);
            expect(isAllowType('str',     String      )).toBe(false);
            // Boolean
            expect(isAllowType(Boolean,   Boolean     )).toBe(T);
            expect(isAllowType(Boolean,   false       )).toBe(T);
            expect(isAllowType(Boolean,   'str'       )).toBe(false);
            expect(isAllowType(true,      true        )).toBe(T);
            expect(isAllowType(true,      false       )).toBe(false);
            expect(isAllowType(true,      Boolean     )).toBe(false);
            // undefined
            expect(isAllowType(undefined, undefined   )).toBe(T);
            expect(isAllowType(undefined,             )).toBe(T);
            expect(isAllowType(undefined              )).toBe(T);
            expect(isAllowType(undefined, null        )).toBe(false);
            // null
            expect(isAllowType(null,      null        )).toBe(T);
            expect(isAllowType(null,      undefined   )).toBe(false);
            expect(isAllowType(null,      {}          )).toBe(false);
            expect(isAllowType(null,      Object      )).toBe(false);
            // bigint (ES6+)
            expect(isAllowType(BigInt,    BigInt      )).toBe(T);
            expect(isAllowType(BigInt,    10n         )).toBe(T);
            expect(isAllowType(BigInt,    10          )).toBe(false);
            expect(isAllowType(BigInt,    Number      )).toBe(false);
            expect(isAllowType(10n,     10n           )).toBe(T);
            expect(isAllowType(10n,     20n           )).toBe(false);
            expect(isAllowType(10n,     BigInt        )).toBe(false);
            // Symbol
            expect(isAllowType(Symbol,    Symbol      )).toBe(T);
            expect(isAllowType(Symbol,    Symbol()    )).toBe(T);
            expect(isAllowType(Symbol,    null        )).toBe(false);
            expect(isAllowType(Symbol,    Object      )).toBe(false);
            expect(isAllowType(Symbol(),  Symbol      )).toBe(T);
            expect(isAllowType(Symbol(),  Symbol()    )).toBe(T);
            expect(isAllowType(Symbol(),  null        )).toBe(false);
            expect(isAllowType(Symbol(),  Object      )).toBe(false);
        });
        it('- allowType(a, b) : 원시 자료형 : 예외 ', () => { 
            // null
            expect(()=> allowType(null,      undefined   )).toThrow('ES0713')
            // Number
            expect(()=> allowType(Number,    String      )).toThrow('ES0713')
            expect(()=> allowType(Number,    true        )).toThrow('ES0713')
            expect(()=> allowType(NaN,       Number      )).toThrow('ES0712')
            expect(()=> allowType(NaN,       NaN         )).toThrow('ES0712')
            expect(()=> allowType(NaN,       10          )).toThrow('ES0712')
            expect(()=> allowType(10,        20          )).toThrow('ES0712')
            expect(()=> allowType(10,        Number      )).toThrow('ES0712')
            expect(()=> allowType(10,        NaN         )).toThrow('ES0712') 
            // String
            expect(()=> allowType(String,    10          )).toThrow('ES0713')
            expect(()=> allowType(String,    Boolean     )).toThrow('ES0713')
            expect(()=> allowType('str',     ''          )).toThrow('ES0712')
            expect(()=> allowType('str',     String      )).toThrow('ES0712')
            // Boolean
            expect(()=> allowType(Boolean,   'str'       )).toThrow('ES0713')
            expect(()=> allowType(true,      false       )).toThrow('ES0712')
            expect(()=> allowType(true,      Boolean     )).toThrow('ES0712')
            // undefined
            expect(()=> allowType(undefined, null        )).toThrow('ES069')
            // null
            expect(()=> allowType(null,      undefined   )).toThrow('ES0713')
            expect(()=> allowType(null,      {}          )).toThrow('ES0713')
            expect(()=> allowType(null,      Object      )).toThrow('ES0713')
            // Symbol
            expect(()=> allowType(Symbol,    null        )).toThrow('ES0713')
            expect(()=> allowType(Symbol,    Object      )).toThrow('ES0713')
            expect(()=> allowType(Symbol(),  null        )).toThrow('ES0713')
            expect(()=> allowType(Symbol(),  Object      )).toThrow('ES0713')
        });
        it('- isAllowType(a, b) : array choice', () => {       
            // all
            expect(isAllowType([],                        []                         )).toBe(T);
            expect(isAllowType([],                        Array                      )).toBe(false);
            expect(isAllowType([],                        [[]]                       )).toBe(false);
            expect(isAllowType([],                        ['_any_']                  )).toBe(T);
            expect(isAllowType(Array,                     []                         )).toBe(T);
            expect(isAllowType(Array,                     Array                      )).toBe(T);
            expect(isAllowType(Array,                     [[]]                       )).toBe(T);
            expect(isAllowType(Array,                     ['_non_']                  )).toBe(T);
            // any
            expect(isAllowType(['_any_'],                 ['_req_', null]                     )).toBe(T);
            expect(isAllowType(['_any_'],                 ['_req_', String]                   )).toBe(T);
            expect(isAllowType(['_any_'],                 ['_req_', String]                   )).toBe(T);
            expect(isAllowType(['_any_'],                 []                         )).toBe(T); 
            expect(isAllowType(['_any_'],                 undefined                  )).toBe(false);
            expect(isAllowType(['_any_'],                 ['_any_']                  )).toBe(T);
            expect(isAllowType(['_any_'],                 ['_seq_']                  )).toBe(false);
            expect(isAllowType(['_any_'],                 ['_opt_']                  )).toBe(false);
            expect(isAllowType(['_any_'],                 ['_non_']                  )).toBe(false);
            expect(isAllowType(['_any_', String],         ['_any_', String]          )).toBe(T);
            expect(isAllowType(['_any_', String],         ['_req_', String]                   )).toBe(T);
            expect(isAllowType(['_any_', String],         ['_req_', Number]                   )).toBe(T);
            // seq
            expect(isAllowType(['_seq_'],                 ['_seq_']                  )).toBe(false);
            expect(isAllowType(['_seq_'],                 ['_seq_', Boolean]         )).toBe(false);
            expect(isAllowType(['_seq_'],                 []                         )).toBe(false);
            expect(isAllowType(['_seq_', Number],         ['_seq_', Number]          )).toBe(T);
            expect(isAllowType(['_seq_', Number],         ['_seq_', Number, String]  )).toBe(T);
            expect(isAllowType(['_seq_', Number],         ['_seq_']                  )).toBe(false);
            expect(isAllowType(['_seq_', Number],         ['_seq_', Boolean]         )).toBe(false);
            expect(isAllowType(['_seq_', Number],         [Number]                   )).toBe(false);
            expect(isAllowType(['_seq_', Number, String], ['_seq_', Number, String]  )).toBe(T);
            expect(isAllowType(['_seq_', Number, String], ['_seq_', Number]          )).toBe(false);
            expect(isAllowType(['_seq_', Number, String], [Number]                   )).toBe(false);
            // opt
            expect(isAllowType(['_opt_'],                 ['_opt_']                  )).toBe(false);
            expect(isAllowType(['_opt_'],                 ['_opt_', String]          )).toBe(false);
            expect(isAllowType(['_opt_'],                 ['_any_']                  )).toBe(false);
            expect(isAllowType(['_opt_'],                 []                         )).toBe(false); 
            expect(isAllowType(['_opt_'],                 [String]                   )).toBe(false);
            expect(isAllowType(['_opt_', String],         ['_opt_', String]          )).toBe(T);
            expect(isAllowType(['_opt_', String],         ['_opt_', Number, String]  )).toBe(false);
            expect(isAllowType(['_opt_', String],         ['_opt_', Number]          )).toBe(false);
            expect(isAllowType(['_opt_', String],         ['_opt_']                  )).toBe(false);
            expect(isAllowType(['_opt_', String],         ['_any_']                  )).toBe(false);
            expect(isAllowType(['_opt_', String],         [String]                   )).toBe(T);
            expect(isAllowType(['_opt_', String],         [Number]                   )).toBe(false);
            expect(isAllowType(['_opt_', String],         [undefined]                )).toBe(false);   // length > 0 이면 true
            expect(isAllowType(['_opt_', String],         ['_any_']                  )).toBe(false);
            expect(isAllowType(['_opt_', String],         []                         )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], ['_opt_', Number, String]  )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], ['_opt_', String]          )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], ['_opt_', Number]          )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], [String, Number]           )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], [Number, String]           )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], [Number, Boolean]          )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], [Number, String, Boolean]  )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], [Number]                   )).toBe(T);
            expect(isAllowType(['_opt_', String, Number], [String]                   )).toBe(T);            
            expect(isAllowType(['_opt_', String, Number], ['_opt_']                  )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], ['_any_']                  )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], [undefined]                )).toBe(false);
            expect(isAllowType(['_opt_', String, Number], ['_opt_', Number, String, Boolean])).toBe(false);
            // val
            expect(isAllowType([String, Number],          [String]                   )).toBe(T);
            expect(isAllowType([String, Number],          [Number, String]           )).toBe(T);
            expect(isAllowType([String, Number],          [String, Boolean, Number]  )).toBe(false);
            expect(isAllowType([String, Number],          ['_opt_']                  )).toBe(false);
            expect(isAllowType([String, Number],          ['_any_']                  )).toBe(false);
            // non
            expect(isAllowType(['_non_'],                 ['_non_']                  )).toBe(T);
            expect(isAllowType(['_non_'],                 ['_any_']                  )).toBe(false);
            // etc.
            expect(isAllowType(['_etc_'],                 [null]                     )).toBe(false);
        });
        it('- allowType(a, b) : array choice : 예외', () => {        
            // all 
            // expect(()=> allowType(Array,                     ['_non_']                  )).toThrow('ES069')
            // any
            // expect(()=> allowType(['_any_'],                 []                         )).toThrow('ES0727')
            expect(()=> allowType(['_any_'],                 undefined                  )).toThrow('ES0719')
            expect(()=> allowType(['_any_'],                 ['_seq_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_any_'],                 ['_opt_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_any_'],                 ['_non_']                  )).toThrow('ES0727')
            // seq
            expect(()=> allowType(['_seq_'],                 ['_seq_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_seq_'],                 ['_seq_', Boolean]         )).toThrow('ES0729')
            expect(()=> allowType(['_seq_'],                 []                         )).toThrow('ES0729')
            expect(()=> allowType(['_seq_', Number],         ['_seq_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_seq_', Number],         ['_seq_', Boolean]         )).toThrow('ES0713')
            expect(()=> allowType(['_seq_', Number],         [Number]                   )).toThrow('ES0728')
            expect(()=> allowType(['_seq_', Number, String], ['_seq_', Number]          )).toThrow('ES0720')
            expect(()=> allowType(['_seq_', Number, String], [Number]                   )).toThrow('ES0728')
            // opt
            expect(()=> allowType(['_opt_'],                 ['_opt_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_opt_'],                 ['_opt_', String]          )).toThrow('ES0729')
            expect(()=> allowType(['_opt_'],                 ['_any_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_opt_'],                 []                         )).toThrow('ES0729') 
            expect(()=> allowType(['_opt_'],                 [String]                   )).toThrow('ES0729')
            expect(()=> allowType(['_opt_', String],         ['_opt_', Number, String]  )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String],         ['_opt_', Number]          )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String],         ['_opt_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_opt_', String],         ['_any_']                  )).toThrow('ES0728')
            expect(()=> allowType(['_opt_', String],         [Number]                   )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String],         [undefined]                )).toThrow('ES0738')   // length > 0 이면 true
            expect(()=> allowType(['_opt_', String],         ['_any_']                  )).toThrow('ES0728')
            expect(()=> allowType(['_opt_', String],         []                         )).toThrow('ES0728')
            expect(()=> allowType(['_opt_', String, Number], [Number, Boolean]          )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String, Number], [Number, String, Boolean]  )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String, Number], ['_opt_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_opt_', String, Number], ['_any_']                  )).toThrow('ES0728')
            expect(()=> allowType(['_opt_', String, Number], [undefined]                )).toThrow('ES0738')
            expect(()=> allowType(['_opt_', String, Number], ['_opt_', Number, String, Boolean])).toThrow('ES0738')
            // val
            expect(()=> allowType(['_req_', String, Number],          ['_req_', String, Boolean, Number]  )).toThrow('ES0716')
            expect(()=> allowType(['_req_', String, Number],          ['_opt_']                  )).toThrow('ES0729')
            expect(()=> allowType(['_req_', String, Number],          ['_any_']                  )).toThrow('ES0727')
            // non 
            expect(()=> allowType(['_non_'],                 ['_any_']                  )).toThrow('ES0728')
            // etc. 
            expect(()=> allowType(['_etc_'],                 [null]                     )).toThrow('ES0735')
        }); 
        it('- isAllowType(a, b) : choice ', () => {  
            expect(isAllowType([[]],                        []                       )).toBe(T);
            expect(isAllowType([[]],                        Array                    )).toBe(T);
            expect(isAllowType([[]],                        [[]]                     )).toBe(T);
            expect(isAllowType([[String, Number]],           [[Number]]            )).toBe(T);
            expect(isAllowType([['_any_']],                  [['_any_']]           )).toBe(T);
            expect(isAllowType([['_any_']],                  [['_req_', Number]]            )).toBe(T);
            expect(isAllowType([['_any_']],                  [['_req_', null]]              )).toBe(T);
            expect(isAllowType([['_any_']],                  [['_req_', undefined]]         )).toBe(T);
            expect(isAllowType([['_any_']],                  [[Number]]            )).toBe(T);
            expect(isAllowType([['_any_']],                  [[null]]              )).toBe(T);
            expect(isAllowType([['_any_']],                  [[undefined]]         )).toBe(T);
            expect(isAllowType([['_any_']],                  undefined             )).toBe(false);
            expect(isAllowType([['_any_']],                                        )).toBe(false);
            expect(isAllowType([['_seq_']],                  [['_seq_']]           )).toBe(false);
            expect(isAllowType([['_seq_']],                  [['_seq_', String]]   )).toBe(false);
            expect(isAllowType([['_seq_']],                  [['_seq_', Number]]   )).toBe(false);
            expect(isAllowType([['_seq_', Number]],          [['_seq_', Number]]           )).toBe(T); // 같은 경우만 True  
            expect(isAllowType([['_seq_', Number]],          [['_seq_', Number, String]]   )).toBe(T); 
            expect(isAllowType([['_seq_', Number]],          [['_seq_']]                   )).toBe(false);
            expect(isAllowType([['_seq_', Number]],          [['_seq_', Boolean]]          )).toBe(false);
            expect(isAllowType([['_seq_', Number]],          [[Number]]                    )).toBe(false); 
            expect(isAllowType([['_seq_', Number, String]],  [['_seq_', Number, String]]   )).toBe(T); // 같은 경우만 True
            expect(isAllowType([['_seq_', Number, String]],  [['_seq_', Number]]           )).toBe(false); 
            expect(isAllowType([['_seq_', Number, String]],  [[Number]]                    )).toBe(false);
            expect(isAllowType([['_opt_']],                  [['_opt_']]                   )).toBe(false);
            expect(isAllowType([['_opt_']],                  [['_opt_', String]]           )).toBe(false);
            expect(isAllowType([['_opt_']],                  [['_any_']]                   )).toBe(false);
            expect(isAllowType([['_opt_']],                  undefined                     )).toBe(false);
            expect(isAllowType([['_opt_']],                  [[String]]                    )).toBe(false);
            expect(isAllowType([['_opt_', String]],          [['_opt_', String]]           )).toBe(T);
            expect(isAllowType([['_opt_', String]],          [['_opt_', Number, String]]   )).toBe(false);
            expect(isAllowType([['_opt_', String]],          [['_opt_', Number]]           )).toBe(false);
            expect(isAllowType([['_opt_', String]],          [['_opt_']]                   )).toBe(false);
            expect(isAllowType([['_opt_', String]],          [['_any_']]                   )).toBe(false);
            expect(isAllowType([['_opt_', String]],          [[String]]                    )).toBe(T);
            expect(isAllowType([['_opt_', String]],          [[Number]]                    )).toBe(false);
            expect(isAllowType([['_opt_', String]],          undefined                     )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [['_opt_', String, Number]]   )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [['_opt_', Number]]           )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [['_opt_', String]]           )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [[String, Number]]            )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [[Number, String]]            )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [[String, Boolean]]           )).toBe(false);
            expect(isAllowType([['_opt_', String, Number]],  [[Number, String, Boolean]]   )).toBe(false);
            expect(isAllowType([['_opt_', String, Number]],  [[Number]]                    )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [[String]]                    )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [['_opt_']]                   )).toBe(false);
            expect(isAllowType([['_opt_', String, Number]],  [['_any_']]                   )).toBe(false);
            expect(isAllowType([['_opt_', String, Number]],  undefined                   )).toBe(T);
            expect(isAllowType([['_opt_', String, Number]],  [['_opt_', String, Boolean, Number]])).toBe(false);
            expect(isAllowType([[String, Number]],           [[String]]                    )).toBe(T);
            expect(isAllowType([[String, Number]],           [[Number, String]]            )).toBe(T);
            expect(isAllowType([[String, Number]],           [[String, Boolean, Number]]   )).toBe(false);
            expect(isAllowType([[String, Number]],           [['_opt_']]                   )).toBe(false);
            expect(isAllowType([[String, Number]],           [['_any_']]                   )).toBe(false);
        });
        it('- allowType(a, b) : choice : 예외', () => {     
            expect(()=> allowType([['_any_']],                  undefined             )).toThrow('ES0714')
            expect(()=> allowType([['_any_']],                                        )).toThrow('ES0714')
            expect(()=> allowType([['_seq_']],                  [['_seq_']]           )).toThrow('ES0729')
            expect(()=> allowType([['_seq_']],                  [['_seq_', String]]   )).toThrow('ES0729') 
            expect(()=> allowType([['_seq_']],                  [['_seq_', Number]]   )).toThrow('ES0729')
            expect(()=> allowType([['_seq_', Number]],          [['_seq_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_seq_', Number]],          [['_seq_', Boolean]]          )).toThrow('ES0733')
            expect(()=> allowType([['_seq_', Number]],          [[Number]]                    )).toThrow('ES0728')
            expect(()=> allowType([['_seq_', Number, String]],  [['_seq_', Number]]           )).toThrow('ES0732')
            expect(()=> allowType([['_seq_', Number, String]],  [[Number]]                    )).toThrow('ES0728')
            expect(()=> allowType([['_opt_']],                  [['_opt_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_opt_']],                  [['_opt_', String]]           )).toThrow('ES0729')
            expect(()=> allowType([['_opt_']],                  [['_any_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_opt_']],                  undefined                     )).toThrow('ES0729')
            expect(()=> allowType([['_opt_']],                  [[String]]                    )).toThrow('ES0729')
            expect(()=> allowType([['_opt_', String]],          [['_opt_', Number, String]]   )).toThrow('ES0738')
            expect(()=> allowType([['_opt_', String]],          [['_opt_', Number]]           )).toThrow('ES0738')
            expect(()=> allowType([['_opt_', String]],          [['_opt_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_opt_', String]],          [['_any_']]                   )).toThrow('ES0728')
            expect(()=> allowType([['_opt_', String]],          [[Number]]                    )).toThrow('ES0738')
            expect(()=> allowType([['_opt_', String, Number]],  [[String, Boolean]]           )).toThrow('ES0738')
            expect(()=> allowType([['_opt_', String, Number]],  [[Number, String, Boolean]]   )).toThrow('ES0738')
            expect(()=> allowType([['_opt_', String, Number]],  [['_opt_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_opt_', String, Number]],  [['_any_']]                   )).toThrow('ES0728')
            expect(()=> allowType([['_opt_', String, Number]],  [['_opt_', String, Boolean, Number]])).toThrow('ES0738')
            expect(()=> allowType([['_req_', String, Number]],           [['_req_', String, Boolean, Number]]   )).toThrow('ES0738')
            expect(()=> allowType([['_req_', String, Number]],           [['_opt_']]                   )).toThrow('ES0729')
            expect(()=> allowType([['_req_', String, Number]],           [['_any_']]                   )).toThrow('ES0727')
        });
        it('- isAllowType(a, b) : function, 함수 파싱 ', () => { 
            /**
             * 함수 args 금지 : number, string, bool, null, fuction, ( ), =>
             * func._TYPE 정적 영역으로 우회해서 설정
             */
            var type1      = function(String, Number){Boolean}
            var type1_1    = function(String, Number){return Boolean}
            var type1_2    = function fun(String, Number){Boolean}
            var type1_3    = function fun(String, Number){return Boolean }
            var type1_4    = (String, Number) => {Boolean}
            var type1_5    = (String, Number) => {return Boolean}

            var type2      = function([String], Number){[Boolean]}
            var type2_1    = function([String], Number){return [Boolean]}
            var type2_2    = ([String], Number)=>{[Boolean]}
            var type2_3    = ([String], Number)=>{return [Boolean]}

            var type3      = function({aa: String}, Number) {[Boolean, {bb:Number}]}
            var type3_1    = function ({aa: String}, Number){return [Boolean, {bb:Number}]}
            var type3_2    = function fun({aa: String}, Number){[Boolean, {bb:Number}]}
            var type3_3    = function fun({aa: String}, Number){return [Boolean, {bb:Number}]}
            var type3_4    = ({aa: String}, Number)=>{[Boolean, {bb:Number}]}
            var type3_5    = ({aa: String}, Number)=>{return [Boolean, {bb:Number}]}

            var type4      = function([[{aa: String}]]) {[[{bb:Number}]]}
            var type4_1    = function ([[{aa: String}]]){return [[{bb:Number}]]}
            var type4_2    = function fun ([[{aa: String}]]){ [[{bb:Number}]]}
            var type4_3    = function fun ([[{aa: String}]]){return [[{bb:Number}]]}
            var type4_4    = ([[{aa: String}]]) => { [[{bb:Number}]]}
            var type4_5    = ([[{aa: String}]]) => {return [[{bb:Number}]]}

            expect(isAllowType(type1, type1_1)).toBe(true);
            expect(isAllowType(type1, type1_2)).toBe(true);
            expect(isAllowType(type1, type1_3)).toBe(true);
            expect(isAllowType(type1, type1_4)).toBe(true);
            expect(isAllowType(type1, type1_5)).toBe(true);
            expect(isAllowType(type2, type2_1)).toBe(true);
            expect(isAllowType(type2, type2_2)).toBe(true);
            expect(isAllowType(type2, type2_3)).toBe(true);
            expect(isAllowType(type3, type3_1)).toBe(true);
            expect(isAllowType(type3, type3_2)).toBe(true);
            expect(isAllowType(type3, type3_3)).toBe(true);
            expect(isAllowType(type3, type3_4)).toBe(true);
            expect(isAllowType(type3, type3_5)).toBe(true);
            expect(isAllowType(type4, type4_1)).toBe(true);
            expect(isAllowType(type4, type4_2)).toBe(true);
            expect(isAllowType(type4, type4_3)).toBe(true);
            expect(isAllowType(type4, type4_4)).toBe(true);
            expect(isAllowType(type4, type4_5)).toBe(true);

        });
        it('- isAllowType(a, b) : function ', () => {
            var type1   = function(String, Number){Boolean}
            var type2   = function(){}
            type2._TYPE = {params: [String, Number], return: Boolean}
            var tar1    = function(){}
            tar1._TYPE  = {params: [String, Number], return: Boolean}

            expect(isAllowType(Function, Function    )).toBe(T);
            expect(isAllowType(type1, {}             )).toBe(false);
            expect(isAllowType(type1, tar1           )).toBe(T);
            expect(isAllowType(type2, tar1           )).toBe(T);
            // 예외 : 오류코드
            expect(()=> allowType(type1, {}          )).toThrow('ES0713')
        }); 
        it('- isAllowType(a, b) : object ', () => {   
            var ClassA = function(){};
            var ClassB = function(){this.aa = 1};
            var date1 = new Date('2023-01-01');
            var date2 = new Date('2023-01-01');
            var date3 = new Date('2023-01-02');

            expect(isAllowType(Object,    Object            )).toBe(T);
            expect(isAllowType(Object,    {}                )).toBe(false);
            expect(isAllowType(/reg/,     /reg/             )).toBe(T   );
            // expect(isAllowType(/reg/,     /reg2/          )).toBe(       false);
            expect(isAllowType({},        new ClassA()      )).toBe(T       );
            expect(isAllowType({},        new ClassB()      )).toBe(T   );
            expect(isAllowType({},        true              )).toBe(false);
            expect(isAllowType(date1,     date1             )).toBe(T       );
            expect(isAllowType(date1,     date2             )).toBe(T       );
            expect(isAllowType(date1,     date3             )).toBe(T       );
            expect(isAllowType({},        new Date()        )).toBe(false);     
            expect(isAllowType({},        {aa:1}            )).toBe(T);
            // 예외 : 오류코드
            // expect(()=> allowType(/reg/,     /reg2/          )).toThrow('ES0723')
            // expect(()=> allowType({},        new ClassB()    )).toThrow('ES0713')
            expect(()=> allowType({},        true            )).toThrow('ES069')
        });
        it('- isAllowType(a, b) : class ', () => {
            var ClassA = function(){this.a = 1}
            var ClassB = function(){this.a = 10}
            var ClassC = function(){this.b = 10}
            var ClassD = function(){this.b = 10}
            var ClassE = function(){throw new Error('강제예외')}

            expect(isAllowType(ClassA,       ClassA)).toBe(T);
            expect(isAllowType(ClassA,       ClassB)).toBe(false);
            expect(isAllowType(ClassA,       ClassC)).toBe(false);
            expect(isAllowType(ClassC,       ClassD, 0)).toBe(false);
            expect(isAllowType(ClassC,       ClassD, 1)).toBe(T );
            expect(isAllowType(String,       String)).toBe(T );
            expect(isAllowType(ClassA,       ClassE)).toBe(false );
            // 예외 : 오류코드
            expect(()=> allowType(ClassA,       ClassB)).toThrow('ES0725')
            expect(()=> allowType(ClassA,       ClassC)).toThrow('ES0725')
            expect(()=> allowType(ClassA,       ClassE)).toThrow('ES0725')
        }); 
        it('- isAllowType(a, b) : union (기본) ', () => {
            var type1      = {str: String, num: Number};

            expect(isAllowType(type1,    {str: String, num: Number}  )).toBe(true);
            expect(isAllowType(type1,    {str: '', num: 0}           )).toBe(true);
            expect(isAllowType(type1,    {str: ''}                   )).toBe(false);
            // 예외 : 오류코드
            expect(()=> allowType(type1,    {str: ''}                )).toThrow('ES0713')
        });
        it('- isAllowType(a, b) : union (choice) ', () => {        
            var type1   = {str: [[String, Number]], bool: [['_any_']], num: [['_opt_', Number]]}; 

            expect(isAllowType(type1, {str: String, bool: null, num: Number}           )).toBe(T);
            expect(isAllowType(type1, {str: '', bool: true, num: [['_opt_', Number]]}  )).toBe(T);
            expect(isAllowType(type1, {str: '', bool: null, num: [['_opt_', String]]}  )).toBe(false);
            expect(isAllowType(type1, {str: String, bool: false, num: String}          )).toBe(false);
            expect(isAllowType(type1, {str: String}                                    )).toBe(false);
            // 예외 : 오류코드
            expect(()=> allowType(type1, {str: '', bool: null, num: [['_opt_', String]]}  )).toThrow('ES0738')
            expect(()=> allowType(type1, {str: String, bool: false, num: String}          )).toThrow('ES0738')
            expect(()=> allowType(type1, {str: String}                                    )).toThrow('ES0714')
        });
    });
    describe('isMatchType(type, target)', () => {
        it('- isMatchType() : object (원시 객체 기본값) ', () => {
            // expect(isMatchType(/reg2/,        /reg/       )).toBe(T);
            expect(isMatchType(new Date(),    new Date()  )).toBe(T);
            expect(isMatchType(Symbol(),      Symbol()    )).toBe(T);
            // expect(isMatchType({},            /reg/       )).toBe(T);
            expect(isMatchType({},            new Date()  )).toBe(false);
            expect(isMatchType({},            Symbol()    )).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType({},         Symbol()    )).toThrow(/ES069/)

        });
        it('- null, undefined ', () => {
            // true
            expect(isMatchType(null,                null            )).toBe(T);
            expect(isMatchType({aa: undefined},     {aa:undefined}  )).toBe(T);
            expect(isMatchType({aa: undefined},     {aa:null}       )).toBe(false);
            // false (예외)
            expect(()=>matchType(null,              false           )).toThrow('null');
            expect(()=>matchType({aa: undefined},   {aa:null}       )).toThrow('undefined');
            expect(()=>matchType(undefined,         {aa:null}       )).toThrow('ES026');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(isMatchType('str',     ''        )).toBe(true);
            expect(isMatchType('str',     undefined )).toBe(true);  // 기본값 설정됨
            expect(isMatchType(String,    ''        )).toBe(true);
            // false (예외)
            expect(()=> matchType('str',    function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(String,   function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(String,   null                )).toThrow(/ES074/);
            expect(()=> matchType(String,   true                )).toThrow(/ES074/);
            expect(()=> matchType(String,   /reg/               )).toThrow(/ES074/);
            expect(()=> matchType(String,   1                   )).toThrow(/ES074/);
            expect(()=> matchType(String,   Symbol()            )).toThrow(/ES074/);
            expect(()=> matchType(String,   []                  )).toThrow(/ES074/);
            expect(()=> matchType(String,   {aa:1}              )).toThrow(/ES074/);
            expect(()=> matchType(String,   Number              )).toThrow(/ES074/);
            expect(()=> matchType(String,   Symbol              )).toThrow(/ES074/);
        });
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(isMatchType(1,         0   )).toBe(T);
            expect(isMatchType(Number,    0   )).toBe(T);
            expect(isMatchType(NaN,       0   )).toBe(T);
            expect(isMatchType(NaN,       NaN )).toBe(T);
            // false (예외)
            expect(()=> matchType(1,        function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(NaN,      function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(Number,   function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(Number,   null                )).toThrow(/ES074/);
            expect(()=> matchType(Number,   true                )).toThrow(/ES074/);
            expect(()=> matchType(Number,   /reg/               )).toThrow(/ES074/);
            expect(()=> matchType(Number,   'str'               )).toThrow(/ES074/);
            expect(()=> matchType(Number,   Symbol()            )).toThrow(/ES074/);
            expect(()=> matchType(Number,   []                  )).toThrow(/ES074/);
            expect(()=> matchType(Number,   {aa:1}              )).toThrow(/ES074/);
            expect(()=> matchType(Number,   Symbol              )).toThrow(/ES074/);
            expect(()=> matchType(Number,                       )).toThrow(/ES074/);
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(isMatchType(true,      false     )).toBe(true);
            expect(isMatchType(true,      undefined )).toBe(true);  // 기본값 설정됨
            expect(isMatchType(Boolean,   false     )).toBe(true);
            // false (예외)
            expect(()=> matchType(true,     function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  null                )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  'str'               )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  /reg/               )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  1                   )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  Symbol()            )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  []                  )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  {aa:1}              )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  Number              )).toThrow(/ES074/);
            expect(()=> matchType(Boolean,  Symbol              )).toThrow(/ES074/);
        });
        it('- bigint 타입 (ES6+)', () => { 
            // true
            expect(isMatchType(BigInt,      BigInt(2))).toBe(true);
            expect(isMatchType(BigInt,      10n      )).toBe(true);
            expect(isMatchType(BigInt,      10       )).toBe(false);
            expect(isMatchType(BigInt,      BigInt   )).toBe(false);
            expect(isMatchType(10n,         10n      )).toBe(true);
            expect(isMatchType(10n,         20n      )).toBe(true);
            expect(isMatchType(10n,         10       )).toBe(false);
            expect(isMatchType(10n,         BigInt   )).toBe(false);
            // false (예외)
            expect(()=> matchType(BigInt,  function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  null                )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  'str'               )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  /reg/               )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  1                   )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  Symbol()            )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  []                  )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  {aa:1}              )).toThrow(/ES074/);
            expect(()=> matchType(BigInt,  Number              )).toThrow(/ES074/);
        });
        it('- symbol 타입 (ES6+) ', () => {
            // true
            expect(isMatchType(Symbol,      Symbol()    )).toBe(true);
            expect(isMatchType(Symbol,      Symbol      )).toBe(false);
            // false (예외)
            expect(()=> matchType(Symbol,  function any(){}    )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  null                )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  'str'               )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  /reg/               )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  1                   )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  []                  )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  {aa:1}              )).toThrow(/ES074/);
            expect(()=> matchType(Symbol,  Number              )).toThrow(/ES074/);
        });
        it('- isMatchType() : choice ', () => {      
            // _any_
            expect(isMatchType([['_any_']],         10          )).toBe(T);
            expect(isMatchType([['_any_']],         'str'       )).toBe(T);
            expect(isMatchType([['_any_']],         [[]]        )).toBe(T);
            expect(isMatchType([['_any_']],         {}          )).toBe(T);
            expect(isMatchType([['_any_']],         true        )).toBe(T);
            expect(isMatchType([['_any_']],         undefined   )).toBe(false);
            // _seq_[ 
            expect(isMatchType([['_seq_']],                 [[1,2,3]]   )).toBe(false);
                expect(isMatchType([['_seq_']],                 10          )).toBe(false);
            expect(isMatchType([['_seq_', String, Number]], [[1,2,3]]   )).toBe(false);
            expect(isMatchType([['_seq_', String, Number]], 10          )).toBe(false);
            // _opt_[
            expect(isMatchType([['_opt_']],                 [['str', 10]]   )).toBe(false);
            expect(isMatchType([['_opt_']],                 [[10, 'str']]   )).toBe(false);
            expect(isMatchType([['_opt_', String, Number]], 10          )).toBe(T);
            expect(isMatchType([['_opt_', String, Number]], 'str'       )).toBe(T);
            expect(isMatchType([['_opt_', String, Number]], undefined   )).toBe(T);
            expect(isMatchType([['_opt_', String, undefined]], undefined)).toBe(T);
            expect(isMatchType([['_opt_', String, Number]], true        )).toBe(false);
            expect(isMatchType([['_opt_', String, Number]], []          )).toBe(false);
            expect(isMatchType([['_opt_', String, Number]], {}          )).toBe(false);
            // req
            expect(isMatchType([['_req_', String, Number]],  10                  )).toBe(T);
            expect(isMatchType([['_req_', String, Number]],  'str'               )).toBe(T);
            expect(isMatchType([['_req_', String, Number]],  undefined           )).toBe(false);
            expect(isMatchType([['_req_', String, Number]],  true                )).toBe(false);
            expect(isMatchType([['_req_', String, Number]],  [[]]                )).toBe(false);
            expect(isMatchType([['_req_', String, Number]],  {}                  )).toBe(false);
            expect(isMatchType([['_req_', String, Number]],  [[String, Boolean]] )).toBe(false); // 당연히 실패
            expect(isMatchType([['_req_', String, Number]],  [[Number, String]]  )).toBe(false);
            expect(isMatchType([['_req_', String, Number]],  [[Number, String, Boolean]] )).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType([['_any_']],                 undefined   )).toThrow(/ES075/)
            expect(()=> matchType([['_seq_']],                 [[1,2,3]]   )).toThrow(/ES0729/)
            expect(()=> matchType([['_seq_']],                 10          )).toThrow(/ES0729/)
            expect(()=> matchType([['_seq_', String, Number]], [[1,2,3]]   )).toThrow(/ES077/)
            expect(()=> matchType([['_seq_', String, Number]], 10          )).toThrow(/ES077/)
            expect(()=> matchType([[ String, Number]], true        )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]], []          )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]], {}          )).toThrow(/ES076/)            
            // expect(()=> matchType([[String, Number]],  undefined           )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]],  true                )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]],  [[]]                )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]],  {}                  )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]],  [[String, Boolean]] )).toThrow(/ES076/) // 당연히 실패
            expect(()=> matchType([[String, Number]],  [[Number, String]]  )).toThrow(/ES076/)
            expect(()=> matchType([[String, Number]],  [[Number, String, Boolean]] )).toThrow(/ES076/)
        });
        it('- isMatchType() : class ', () => {
            var Class1 = function() { this.aa = String }
            var Class2 = function() { this.bb = Number }
    
            expect(isMatchType([[Class1, Class2]], {aa: 'STR', bb: 10}      , 1)).toBe(T);
            expect(isMatchType(Class1,             {aa: 'STR', bb: 10}      , 1)).toBe(T);
            expect(isMatchType(Class2,             {aa: 'STR', bb: 10}      , 1)).toBe(T);
            expect(isMatchType([[Class1, Class2]], {aa: 'STR'}              , 1)).toBe(T);
            expect(isMatchType(Class1,             {aa: 'STR'}              , 1)).toBe(T);
            expect(isMatchType(Class2,             {aa: 'STR'}              , 1)).toBe(false);
            expect(isMatchType([[Class1, Class2]], {aa: 'STR', bb: 'STR'}   , 1)).toBe(T);
            expect(isMatchType(Class1,             {aa: 'STR', bb: 'STR'}   , 1)).toBe(T);
            expect(isMatchType(Class2,             {aa: 'STR', bb: 'STR'}   , 1)).toBe(false);
            expect(isMatchType([[Class1, Class2]], {cc: 'STR'}              , 1)).toBe(false);
            expect(isMatchType(Class1,             {cc: 'STR'}              , 1)).toBe(false);
            expect(isMatchType(Class2,             {cc: 'STR'}              , 1)).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType(Class2,             {aa: 'STR'}           , 1)).toThrow(/ES027/)
            expect(()=> matchType(Class2,             {aa: 'STR', bb: 'STR'}, 1)).toThrow(/ES074/)
            expect(()=> matchType([[Class1, Class2]], {cc: 'STR'}           , 1)).toThrow(/ES076/)
            expect(()=> matchType(Class1,             {cc: 'STR'}           , 1)).toThrow(/ES027/)
            expect(()=> matchType(Class2,             {cc: 'STR'}           , 1)).toThrow(/ES027/)            
        });
        it('- isMatchType() : object (객체 기본값) ', () => {
            var Class1 = function() { this.aa = String };
            var Class2 = function() { this.bb = 10 };

            expect(isMatchType([[Class1, Class2]],{aa: 'str', bb: 2}  , 1)).toBe(T);
            expect(isMatchType(Class1,            {aa: 'str', bb: 2}  , 1)).toBe(T);
            expect(isMatchType(Class2,            {aa: 'str', bb: 2}  , 1)).toBe(T);
            expect(isMatchType([[Class1, Class2]],{aa: 'str'}         , 1)).toBe(T);
            expect(isMatchType(Class1,            {aa: 'str'}         , 1)).toBe(T);
            expect(isMatchType(Class2,            {aa: 'str'}         , 1)).toBe(T);
            expect(isMatchType([[Class1, Class2]],{bb: 5}             , 1)).toBe(T);
            expect(isMatchType(Class1,            {bb: 5}             , 1)).toBe(false);
            expect(isMatchType(Class2,            {bb: 5}             , 1)).toBe(T);
            expect(isMatchType([[Class1, Class2]],{cc: 'STR'}         , 1)).toBe(T);
            expect(isMatchType(Class1,            {cc: 'STR'}         , 1)).toBe(false);
            expect(isMatchType(Class2,            {cc: 'STR'}         , 1)).toBe(T);
            expect(isMatchType([[Class1, Class2]],{aa: 'STR', bb: 'STR'}, 1)).toBe(T);
            expect(isMatchType(Class1,            {aa: 'STR', bb: 'STR'}, 1)).toBe(T);
            expect(isMatchType(Class2,            {aa: 'STR', bb: 'STR'}, 1)).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType(Class1,         {bb: 5}               , 1)).toThrow(/ES027/)
            expect(()=> matchType(Class1,         {cc: 'STR'}           , 1)).toThrow(/ES027/)
            expect(()=> matchType(Class2,         {aa: 'STR', bb: 'STR'}, 1)).toThrow(/ES074/)
        });
        
        it('- isMatchType() : choice 원시 타입 ', () => {
            expect(isMatchType([[Number, String, Boolean]], 1           )).toBe(T);
            expect(isMatchType([[Number, String, Boolean]], 'str'       )).toBe(T);
            expect(isMatchType([[Number, String, Boolean]], true        )).toBe(T);            
            expect(isMatchType([[Number, String, Boolean]], new Date()  )).toBe(false);
            expect(isMatchType([[Number, String, Boolean]], /reg/       )).toBe(false);
            expect(isMatchType([[Number, String, Boolean]], Symbol()    )).toBe(false);
            expect(isMatchType([[Number, String, Boolean]], []          )).toBe(false);
            expect(isMatchType([[Number, String, Boolean]], {}          )).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType([[Number, String, Boolean]], new Date()  )).toThrow(/ES076/)
            expect(()=> matchType([[Number, String, Boolean]], /reg/       )).toThrow(/ES076/)
            expect(()=> matchType([[Number, String, Boolean]], Symbol()    )).toThrow(/ES076/)
            expect(()=> matchType([[Number, String, Boolean]], []          )).toThrow(/ES076/)
            expect(()=> matchType([[Number, String, Boolean]], {}          )).toThrow(/ES076/)
        });
        it('- isMatchType() : choice 내장 객체 타입 ', () => {
            expect(isMatchType([[RegExp, Date, Symbol]], new Date() )).toBe(T);
            // expect(isMatchType([[RegExp, Date, Symbol]], /reg/      )).toBe(T);
            expect(isMatchType([[RegExp, Date, Symbol]], Symbol()   )).toBe(T);            
            expect(isMatchType([[RegExp, Date, Symbol]], 1          )).toBe(false);
            expect(isMatchType([[RegExp, Date, Symbol]], true       )).toBe(false);
            expect(isMatchType([[RegExp, Date, Symbol]], 'str'      )).toBe(false);       
            expect(isMatchType([[RegExp, Date, Symbol]], []         )).toBe(false);       
            expect(isMatchType([[RegExp, Date, Symbol]], {}         )).toBe(false);       
            // 예외 오류 코드
            expect(()=> matchType([[RegExp, Date, Symbol]], 1          )).toThrow(/ES076/)
            expect(()=> matchType([[RegExp, Date, Symbol]], true       )).toThrow(/ES076/)
            expect(()=> matchType([[RegExp, Date, Symbol]], 'str'      )).toThrow(/ES076/)       
            expect(()=> matchType([[RegExp, Date, Symbol]], []         )).toThrow(/ES076/)       
            expect(()=> matchType([[RegExp, Date, Symbol]], {}         )).toThrow(/ES076/)       
        });
        it('- isMatchType() : 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            
            expect(isMatchType([[Super, Sub]],  new Sub())).toBe(T);
            expect(isMatchType(Super,           new Sub())).toBe(T);
            expect(isMatchType(Sub,             new Sub())).toBe(T);
            // expect(isMatchType(Object,          new Sub())).toBe(T);       
            expect(isMatchType(Object,          new Sub())).toBe(false);       
        });
        it('- isMatchType() : array 조건 검사  ', () => {    
            // array
            expect(isMatchType([],            [1,2,3]     )).toBe(T);
            expect(isMatchType([],            10          )).toBe(false);
            expect(isMatchType(Array,         [1,2,3]     )).toBe(T);
            expect(isMatchType(Array,         10          )).toBe(false);
            expect(isMatchType(Array,         []          )).toBe(T);
            expect(isMatchType([[]],          [1,2,3]     )).toBe(T);
            expect(isMatchType([[]],          10          )).toBe(T);
            expect(isMatchType([],            [false]     )).toBe(T);
            // _any_
            expect(isMatchType(['_any_'],   [1, 'str']  )).toBe(T);
            expect(isMatchType(['_any_'],   [0]         )).toBe(T);
            expect(isMatchType(['_any_'],   []          )).toBe(false);
            expect(isMatchType(['_any_'],   [undefined] )).toBe(T);
            expect(isMatchType(['_any_'],   10          )).toBe(false);
            // _seq_
            expect(isMatchType(['_seq_'], ['str']           )).toBe(false);
            expect(isMatchType(['_seq_'], 10                )).toBe(false);
            expect(isMatchType(['_seq_', String, Number], ['str', 10]       )).toBe(T);
            expect(isMatchType(['_seq_', String, Number], ['str', 10, true] )).toBe(T);
            expect(isMatchType(['_seq_', String, Number], [10, 'str']       )).toBe(false);
            expect(isMatchType(['_seq_', String, Number], ['str']           )).toBe(false);
            expect(isMatchType(['_seq_', String, Number], 10                )).toBe(false);
            // _opt_
            expect(isMatchType(['_opt_'], ['str', 10]       )).toBe(false);
            expect(isMatchType(['_opt_'], []                )).toBe(false);
            expect(isMatchType(['_opt_'], 10                )).toBe(false);
            expect(isMatchType([String, Number], ['str', 10] )).toBe(T);
            expect(isMatchType([String, Number], [10]        )).toBe(T);
            expect(isMatchType([String, Number], ['str']     )).toBe(T);
            expect(isMatchType([String, Number], []          )).toBe(T);
            expect(isMatchType([String, Number], [true]      )).toBe(false);
            expect(isMatchType([String, Number], [{}]        )).toBe(false);
            expect(isMatchType([String, Number], 10          )).toBe(false);
            expect(isMatchType([String, Number], undefined   )).toBe(false);
            // _req_
            expect(isMatchType(['_req_', String, Number], ['str', 10]    )).toBe(T);
            expect(isMatchType(['_req_', String, Number], [10]           )).toBe(T);
            expect(isMatchType(['_req_', String, Number], ['str']        )).toBe(T);
            expect(isMatchType(['_req_', String, Number], []             )).toBe(false);
            expect(isMatchType(['_req_', String, Number], [true]         )).toBe(false);
            expect(isMatchType(['_req_', String, Number], [{}]           )).toBe(false);
            expect(isMatchType(['_req_', String, Number], 10             )).toBe(false);
            // 예외 오류 코드
            expect(()=> matchType([],           10                  )).toThrow(/ES024/)
            expect(()=> matchType(Array,        10                  )).toThrow(/ES024/)
            // expect(()=> matchType(['_any_'],    [undefined]         )).toThrow(/ES075/)
            expect(()=> matchType(['_any_'],    10                  )).toThrow(/ES024/)
            expect(()=> matchType(['_seq_'],    10                  )).toThrow(/ES0729/) 
            expect(()=> matchType(['_seq_', String, Number], [10, 'str'])).toThrow(/ES074/)
            expect(()=> matchType(['_seq_', String, Number], ['str']    )).toThrow(/ES075/)
            expect(()=> matchType(['_seq_', String, Number], 10         )).toThrow(/ES024/)
            expect(()=> matchType(['_opt_'],    10                  )).toThrow(/ES0729/)
            expect(()=> matchType(['_opt_', String, Number], [true] )).toThrow(/ES076/)
            expect(()=> matchType(['_opt_', String, Number], [{}]   )).toThrow(/ES076/)
            expect(()=> matchType(['_opt_', String, Number], 10     )).toThrow(/ES024/)
            // expect(()=> matchType(['_req_', String, Number], []              )).toThrow(/ES022/)
            expect(()=> matchType(['_req_', String, Number], [true]          )).toThrow(/ES076/)
            expect(()=> matchType(['_req_', String, Number], [{}]            )).toThrow(/ES076/)
            expect(()=> matchType(['_req_', String, Number], 10              )).toThrow(/ES024/)
            expect(()=> matchType(Array, function any(){}       )).toThrow(/ES024/);
            expect(()=> matchType(Array, function any(){}, []   )).toThrow(/ES024/);
            expect(()=> matchType(Array, null                   )).toThrow(/ES024/);
            expect(()=> matchType(Array, 'str'                  )).toThrow(/ES024/);
            expect(()=> matchType(Array, /reg/                  )).toThrow(/ES024/);
            expect(()=> matchType(Array, 1                      )).toThrow(/ES024/);
            expect(()=> matchType(Array, Symbol()               )).toThrow(/ES024/);
            expect(()=> matchType(Array, true                   )).toThrow(/ES024/);
            expect(()=> matchType(Array, {aa:1}                 )).toThrow(/ES024/);
            expect(()=> matchType(Array, Number                 )).toThrow(/ES024/);
            expect(()=> matchType(Array, Symbol                 )).toThrow(/ES024/);
        });

        // POINT: : 예외 제외하고
        it('- isMatchType() : function (선언 타입 검사) ', () => { 
            var type1 = function(){};
            var type2 = function(String, Number){Object};
            var tar1  = function(){}; 
            var tar2  = function(){}; 
            var tar3  = function(){}; 
            var tar4  = function(){}; 
            tar2._TYPE = {params: [String, Number], return: Object}
            tar3._TYPE = {params: [], return: [Object, String]}
            tar4._TYPE = {param: [], return: [Object, String]}

            expect(isMatchType(type1, tar1)).toBe(T);
            expect(isMatchType(type1, tar2)).toBe(T); 
            expect(isMatchType(type1, tar3)).toBe(T);
            expect(isMatchType(type2, tar1)).toBe(false);
            expect(isMatchType(type2, tar2)).toBe(T);
            expect(isMatchType(type2, tar3)).toBe(false);
            expect(isMatchType(type2, tar4)).toBe(false);
            expect(isMatchType(Function, function any(){})).toBe(T);

            // 예외 오류 코드
            // REVIEW: 오류 코드에 작성
            // expect(()=> matchType(type2, tar1)).toThrow(/ES079/)
            // expect(()=> matchType(type2, tar3)).toThrow(/ES0736/)
            // expect(()=> matchType(type2, tar4)).toThrow(/ES0736/)
            // expect(()=> matchType(Function, []          )).toThrow(/ES024/);
            // expect(()=> matchType(Function, null        )).toThrow(/ES024/);
            // expect(()=> matchType(Function, 'str'       )).toThrow(/ES024/);
            // expect(()=> matchType(Function, /reg/       )).toThrow(/ES024/);
            // expect(()=> matchType(Function, 1           )).toThrow(/ES024/);
            // expect(()=> matchType(Function, Symbol()    )).toThrow(/ES024/);
            // expect(()=> matchType(Function, true        )).toThrow(/ES024/);
            // expect(()=> matchType(Function, {aa:1}      )).toThrow(/ES024/);
        });
        // POINT: 예외코드 추가 해야 함
        it('- Function : 정의된 function 타입 1 ', () => {
            var fun1 = function(String, Number){Boolean}
            var tar1 = function(){};
            var tar2 = function(){};
            var tar3 = function(){};
            var tar4 = function(){};
            var tar5 = function(){};
            var tar6 = function(){};
            var tar7 = function(){}; 
            var tar8 = function(){};
            tar1._TYPE = {params: [String, Number], return: Boolean}  // T
            tar2._TYPE = {params: [String, Number]}
            tar3._TYPE = {arg: [String, Number]}
            tar4._TYPE = {params: String}
            tar5._TYPE = {return: [Boolean]}
            tar6._TYPE = {params: String, return: [Boolean]}
            tar7._TYPE = {params: Boolean, return: [Boolean]}

            expect(isMatchType(fun1,    tar1)).toBe(true); 
            // 오류
            // REVIEW: 오류 코드에 작성
            // expect(()=> matchType(fun1, tar2)).toThrow(/ES0737/);
            // expect(()=> matchType(fun1, tar3)).toThrow(/ES0710/);
            // expect(()=> matchType(fun1, tar4)).toThrow(/ES0736/);
            // expect(()=> matchType(fun1, tar5)).toThrow(/ES0736/);
            // expect(()=> matchType(fun1, tar6)).toThrow(/ES0736/);
            // expect(()=> matchType(fun1, tar7)).toThrow(/ES0736/);
            // expect(()=> matchType(fun1, tar8)).toThrow(/ES079/);
        });
        it('- Function : 정의된 function 타입 2 ', () => {
            var fun1 = function(){[Boolean, String]}
            var tar1 = function(){};
            var tar2 = function(){};
            tar1._TYPE = {params: [String, Number], return: [Boolean, String]}
            tar2._TYPE = {params: [String, Number]}

            expect(isMatchType(fun1,        tar1)).toBe(true);
            expect(()=> matchType(fun1,     tar2)).toThrow(/return/)
        });
        it('- isMatchType() : choice(_any_) (모두 true) ', () => {
            // 단독 검사
            expect(isMatchType([['_any_']], function any(){}    )).toBe(T);
            expect(isMatchType([['_any_']], function any(){}    )).toBe(T);
            expect(isMatchType([['_any_']], null                )).toBe(T);
            expect(isMatchType([['_any_']], 1                   )).toBe(T);
            expect(isMatchType([['_any_']], NaN                 )).toBe(T);
            expect(isMatchType([['_any_']], 'str'               )).toBe(T);
            expect(isMatchType([['_any_']], true                )).toBe(T);
            expect(isMatchType([['_any_']], /reg/               )).toBe(T);
            expect(isMatchType([['_any_']], Symbol()            )).toBe(T);
            expect(isMatchType([['_any_']], []                  )).toBe(T);
            expect(isMatchType([['_any_']], {aa: 1}             )).toBe(T);
            expect(isMatchType([['_any_']], Number              )).toBe(T);
            expect(isMatchType([['_any_']], String              )).toBe(T);
            expect(isMatchType([['_any_']], Function            )).toBe(T);
            expect(isMatchType([['_any_']], Object              )).toBe(T);
            expect(isMatchType([['_any_']], Symbol              )).toBe(T);
            expect(isMatchType([['_any_']], undefined           )).toBe(false);
            // or 검사
            expect(isMatchType([[String, [['_any_']] ]], function any() {})).toBe(true);
            expect(isMatchType(String, function any() {}, null)).toBe(false); // args 전달 안받음 배열로만 받음
            // TODO: 넘치면 오류 또는 경고 처리해야 오류를 낮출듯
            // and 검사
            // expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            // expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            // expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(isMatchType(undefined, null)).toBe(false);
            expect(isMatchType(null, null)).toBe(true);
        });
        it('- choice : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(isMatchType([[String, Number]],              'str'       )).toBe(true);
            expect(isMatchType([[String, Number]],              1           )).toBe(true);
            expect(isMatchType([[Boolean, Number]],             true        )).toBe(true);
            expect(isMatchType([[Boolean, null  ]],             null        )).toBe(true);
            expect(isMatchType([[Boolean, [['_any_']]]],        /reg/       )).toBe(true);       // any
            // expect(isMatchType([[Boolean, Object]],             /reg/       )).toBe(true);     // objct 최상위
            // expect(isMatchType([[Boolean, RegExp]],             /reg/       )).toBe(true);     // 내장 함수
            expect(isMatchType([[Func1, Number]],               new Func1() )).toBe(true);
            expect(isMatchType([[[[String, Func1]], Number]],   new Func1() )).toBe(true);   // 복합 배열
            expect( isMatchType([[[Func1], Number]],            [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1 ]]  는 배열안에 함수를 의미함!
            // false (예외) 
            expect(()=> matchType([[Array, String]],          1               )).toThrow(/ES076/);
            expect(()=> matchType([[Array]],                  function any(){})).toThrow(/ES076/);
            expect(()=> matchType([[String]],                 function any(){})).toThrow(/ES076/);
            expect(()=> matchType([[String, Number]],         null            )).toThrow(/ES076/);
            expect(()=> matchType([[Array, Number, Boolean]], 'str'           )).toThrow(/ES076/);
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(isMatchType(Func1, new Func2()         , 1)).toBe(true);
            expect(isMatchType(Func1, new Func1()         , 1)).toBe(true);
            expect(isMatchType(Func1, { aa:10 }           , 1)).toBe(true);
            expect(isMatchType(Func2, { aa:10 }           , 1)).toBe(true);
            expect(isMatchType(Func3, { aa: new Date() }  , 1)).toBe(true);
            // false (예외)
                // expect(()=> matchType(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> matchType(Func1, function any(){}   )).toThrow(/ES032/);
            expect(()=> matchType(Func1, null               )).toThrow(/ES032/);
            expect(()=> matchType(Func1, 'str'              )).toThrow(/ES032/);
            expect(()=> matchType(Func1, /reg/              )).toThrow(/ES069/);
            expect(()=> matchType(Func1, 1                  )).toThrow(/ES032/);
            expect(()=> matchType(Func1, Symbol()           )).toThrow(/ES032/);
            expect(()=> matchType(Func1, true               )).toThrow(/ES032/);
            expect(()=> matchType(Func1, Number             )).toThrow(/ES032/);
            expect(()=> matchType(Func1, Symbol             )).toThrow(/ES032/);
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(isMatchType(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> matchType(Symbol, function any(){}  )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, function any(){}  )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, null              )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, 'str'             )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, /reg/             )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, 1                 )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, true              )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, []                )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, {aa:1}            )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, Number            )).toThrow(/ES074/);
            expect(()=> matchType(Symbol, Symbol            )).toThrow(/ES074/);
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(isMatchType(Date, new Date())).toBe(true);
            expect(isMatchType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> matchType(Date, function any(){}    )).toThrow(/ES032/);
            expect(()=> matchType(Date, null                )).toThrow(/ES032/);
            expect(()=> matchType(Date, true                )).toThrow(/ES032/);
            expect(()=> matchType(Date, 1                   )).toThrow(/ES032/);
            expect(()=> matchType(Date, 'str'               )).toThrow(/ES032/);
            expect(()=> matchType(Date, []                  )).toThrow(/ES032/);
            expect(()=> matchType(Date, {aa:1}              )).toThrow(/ES032/);
            expect(()=> matchType(Date, Number              )).toThrow(/ES032/);
            expect(()=> matchType(Date, /reg/               )).toThrow(/ES032/);
            expect(()=> matchType(Date, Symbol()            )).toThrow(/ES032/);
            expect(()=> matchType(Date, Symbol              )).toThrow(/ES032/);
        });
        it.skip('- RegExp : object 타입 (class)', () => {
            // true
            // expect(isMatchType(RegExp, /reg/)).toBe(true);
            // expect(isMatchType(/reg/, /target/)).toBe(true);
            // false
            expect(()=> matchType(RegExp, function any(){}  )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, null              )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, true              )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, 1                 )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, 'str'             )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, []                )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, {aa:1}            )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, Number            )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, new Date()        )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, Symbol()          )).toThrow(/ES032/);
            expect(()=> matchType(RegExp, Symbol            )).toThrow(/ES032/);
        });
        it('- isMatchType() : 타입이 없는 경우 ', () => {
            expect(isMatchType(1)).toBe(true);
            // expect(checkUnionType(1)).toBe(false);
            // expect(()=> matchType(1)).toThrow('ES026');
            // expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- 커버리지 : 일반 ', () => {
            // expect(isMatchType([['default']], 'str')).toBe(true);   // 기본값 의미
            // expect(isMatchType([['default']], ['str'])).toBe(false); 
        });

    });


});
