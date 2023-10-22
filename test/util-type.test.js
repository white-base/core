/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {typeKind, isValidAllowType }  = require('../src/util-type');
const { isValidType, checkType }  = require('../src/util-type');
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
    describe('typeKind(type) : 타입 얻기 ', () => {
        it('- typeKind() : 자료형별 타입 얻기 ', () => {
            function User() {};             // object
            function Corp() {this.nm = 1};  // union
    
            // undefined
            expect(typeKind().name                ).toBe('undefined');
            // null
            expect(typeKind(null).name            ).toBe('null');
            // choice
            expect(typeKind([[String]]).name      ).toBe('choice');
            expect(typeKind([[String, Number]]).name).toBe('choice');
            expect(typeKind([[]]).name            ).toBe('choice');
            // union
            expect(typeKind({fill:true}).name     ).toBe('union');
            expect(typeKind(new Corp).name        ).toBe('union');
            // array
            expect(typeKind([]).name              ).toBe('array');
            expect(typeKind(Array).name           ).toBe('array');
            // expect(typeKind([[]]).name            ).toBe('array');
            expect(typeKind(['_seq_']).name       ).toBe('array');
            expect(typeKind(['_opt_']).name       ).toBe('array');
            expect(typeKind(['_any_']).name       ).toBe('array');
            // object
            expect(typeKind(Object).name          ).toBe('object');
            expect(typeKind({}).name              ).toBe('object');
            expect(typeKind(new User).name        ).toBe('object');       // 빈객체
            expect(typeKind(/reg/).name           ).toBe('object');
            // function
            expect(typeKind(Function).name        ).toBe('function');
            // class
            expect(typeKind(User).name            ).toBe('class');
            expect(typeKind(Date).name            ).toBe('class');
            // number, NaN
            expect(typeKind(Number).name          ).toBe('number');
            expect(typeKind(1).name               ).toBe('number');
            expect(typeKind(NaN).name             ).toBe('number');
            expect(typeKind(2).default            ).toBe(2);
            // string
            expect(typeKind(String).name          ).toBe('string');
            expect(typeKind('str').name           ).toBe('string');
            expect(typeKind('str').default        ).toBe('str');
            // boolean
            expect(typeKind(Boolean).name         ).toBe('boolean');
            expect(typeKind(true).name            ).toBe('boolean');
            expect(typeKind(true).default         ).toBe(true);
            // Symbol   => new 생성이 안됨
            expect(typeKind(Symbol).name          ).toBe('symbol');  
            expect(typeKind(Symbol('a')).name     ).toBe('symbol');
        });
        it('- typeKind() : 자료형별 타입 얻기 ', () => {
            // object : Date
            expect(typeKind(Date).name              ).toBe('class');
            expect(typeKind(new Date()).name        ).toBe('object');
            
            expect(typeKind(Math).name              ).toBe('union');
            expect(typeKind(Math.E).name            ).toBe('number');
            expect(typeKind(Math.LN2).name          ).toBe('number');
            
            expect(typeKind(Map).name               ).toBe('class');
            expect(typeKind(new Map()).name         ).toBe('union');
            
            expect(typeKind(Int8Array).name         ).toBe('class');
            expect(typeKind(new Int8Array(2)).name  ).toBe('union');
            
            expect(typeKind(Promise).name           ).toBe('class');
            expect(typeKind(new Promise((r,r2) => {})).name        ).toBe('union');
       });

        it('- 예외 :  ', () => {
            // BigInt는 사용 안함
            expect(() => typeKind(2n ** 53n).name ).toThrow('ES022');
        });

    });

    describe('isValidAllowType(origin, target) : 타입간에 비교 ', () => {
        it('- isValidAllowType(a, b) : 원시 자료형 ', () => {
            // null
            expect(isValidAllowType(null,      null        )).toBe(T);
            expect(isValidAllowType(null,      undefined   )).toBe(false);
            // Number
            expect(isValidAllowType(Number,    Number      )).toBe(T);
            expect(isValidAllowType(Number,    10          )).toBe(T);
            expect(isValidAllowType(Number,    NaN         )).toBe(T);
            expect(isValidAllowType(Number,    String      )).toBe(false);
            expect(isValidAllowType(Number,    true        )).toBe(false);
            expect(isValidAllowType(NaN,       Number      )).toBe(false);
            expect(isValidAllowType(NaN,       NaN         )).toBe(false);
            expect(isValidAllowType(NaN,       10          )).toBe(false);
            expect(isValidAllowType(10,        10          )).toBe(T);
            expect(isValidAllowType(10,        20          )).toBe(false);
            expect(isValidAllowType(10,        Number      )).toBe(false);
            expect(isValidAllowType(10,        NaN         )).toBe(false);
            // String
            expect(isValidAllowType(String,    String      )).toBe(T);
            expect(isValidAllowType(String,    ''          )).toBe(T);
            expect(isValidAllowType(String,    10          )).toBe(false);
            expect(isValidAllowType(String,    Boolean     )).toBe(false);
            expect(isValidAllowType('str',     'str'       )).toBe(T);
            expect(isValidAllowType('str',     ''          )).toBe(false);
            expect(isValidAllowType('str',     String      )).toBe(false);
            // Boolean
            expect(isValidAllowType(Boolean,   Boolean     )).toBe(T);
            expect(isValidAllowType(Boolean,   false       )).toBe(T);
            expect(isValidAllowType(Boolean,   'str'       )).toBe(false);
            expect(isValidAllowType(true,      true        )).toBe(T);
            expect(isValidAllowType(true,      false       )).toBe(false);
            expect(isValidAllowType(true,      Boolean     )).toBe(false);
            // undefined
            expect(isValidAllowType(undefined, undefined   )).toBe(T);
            expect(isValidAllowType(undefined,             )).toBe(T);
            expect(isValidAllowType(undefined, null        )).toBe(false);
            // null
            expect(isValidAllowType(null,      null        )).toBe(T);
            expect(isValidAllowType(null,      undefined   )).toBe(false);
            expect(isValidAllowType(null,      {}          )).toBe(false);
            expect(isValidAllowType(null,      Object      )).toBe(false);
            // Symbol
            expect(isValidAllowType(Symbol,    Symbol      )).toBe(T);
            expect(isValidAllowType(Symbol,    Symbol()    )).toBe(T);
            expect(isValidAllowType(Symbol,    null        )).toBe(false);
            expect(isValidAllowType(Symbol,    Object      )).toBe(false);
            expect(isValidAllowType(Symbol(),  Symbol      )).toBe(T);
            expect(isValidAllowType(Symbol(),  Symbol()    )).toBe(T);
            expect(isValidAllowType(Symbol(),  null        )).toBe(false);
            expect(isValidAllowType(Symbol(),  Object      )).toBe(false);
        });
        it('- isValidAllowType(a, b) : array choice', () => {
            expect(isValidAllowType([],                          []                           )).toBe(T);
            expect(isValidAllowType([],                          Array                        )).toBe(T);
            // expect(isValidAllowType([],                          [[]]                         )).toBe(T);
            // expect(isValidAllowType([[]],                        []                           )).toBe(T);
            // expect(isValidAllowType([[]],                        Array                        )).toBe(T);
            // expect(isValidAllowType([[]],                        [[]]                         )).toBe(T);
            expect(isValidAllowType(Array,                       []                           )).toBe(T);
            expect(isValidAllowType(Array,                       Array                        )).toBe(T);
            // expect(isValidAllowType(Array,                       [[]]                         )).toBe(T);
            expect(isValidAllowType(['_etc_'],                 [null]                     )).toBe(false);
            expect(isValidAllowType(['_any_'],                 [null]                     )).toBe(T);
            expect(isValidAllowType(['_any_'],                 []                           )).toBe(false);
            expect(isValidAllowType(['_any_'],                 undefined                    )).toBe(false);
            expect(isValidAllowType(['_any_'],                 []                         )).toBe(false);
            expect(isValidAllowType(['_any_'],                 ['_opt_']                  )).toBe(false);
            expect(isValidAllowType(['_any_', String],         ['_any_', String]          )).toBe(T);
            expect(isValidAllowType(['_any_', String],         [String]                   )).toBe(T);
            expect(isValidAllowType(['_any_', String],         [Number]                   )).toBe(T);
            expect(isValidAllowType(['_seq_'],                 ['_seq_']                  )).toBe(T);
            expect(isValidAllowType(['_seq_'],                 ['_seq_', Boolean]         )).toBe(T);
            expect(isValidAllowType(['_seq_'],                 []                         )).toBe(false);
            expect(isValidAllowType(['_seq_', Number],         ['_seq_', Number]          )).toBe(T);
            expect(isValidAllowType(['_seq_', Number],         ['_seq_', Number, String]  )).toBe(T);
            expect(isValidAllowType(['_seq_', Number],         ['_seq_']                  )).toBe(false);
            expect(isValidAllowType(['_seq_', Number],         ['_seq_', Boolean]         )).toBe(false);
            expect(isValidAllowType(['_seq_', Number],         [Number]                   )).toBe(false);
            expect(isValidAllowType(['_seq_', Number, String], ['_seq_', Number, String]  )).toBe(T);
            expect(isValidAllowType(['_seq_', Number, String], ['_seq_', Number]          )).toBe(false);
            expect(isValidAllowType(['_seq_', Number, String], [Number]                   )).toBe(false);
            expect(isValidAllowType(['_opt_'],                 ['_opt_']                  )).toBe(T);
            expect(isValidAllowType(['_opt_'],                 ['_opt_', String]          )).toBe(T);
            expect(isValidAllowType(['_opt_'],                 ['_any_']                  )).toBe(T);
            expect(isValidAllowType(['_opt_'],                 []                         )).toBe(T);
            expect(isValidAllowType(['_opt_'],                 []                           )).toBe(T);
            expect(isValidAllowType(['_opt_'],                 [String]                   )).toBe(T);
            expect(isValidAllowType(['_opt_', String],         ['_opt_', String]          )).toBe(T);
            expect(isValidAllowType(['_opt_', String],         ['_opt_', Number, String]  )).toBe(false);
            expect(isValidAllowType(['_opt_', String],         ['_opt_', Number]          )).toBe(false);
            expect(isValidAllowType(['_opt_', String],         ['_opt_']                  )).toBe(false);
            expect(isValidAllowType(['_opt_', String],         ['_any_']                  )).toBe(false);
            expect(isValidAllowType(['_opt_', String],         [String]                   )).toBe(T);
            expect(isValidAllowType(['_opt_', String],         [Number]                   )).toBe(false);
            expect(isValidAllowType(['_opt_', String],         [undefined]                )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], ['_opt_', Number, String]  )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], ['_opt_', String]          )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], ['_opt_', Number]          )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], [String, Number]           )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], [Number, String]           )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], [Number, Boolean]          )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], [Number, String, Boolean]  )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], [Number]                   )).toBe(T);
            expect(isValidAllowType(['_opt_', String, Number], [String]                   )).toBe(T);            
            expect(isValidAllowType(['_opt_', String, Number], ['_opt_']                  )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], ['_any_']                  )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], [undefined]                )).toBe(false);
            expect(isValidAllowType(['_opt_', String, Number], ['_opt_', Number, String, Boolean])).toBe(false);
            expect(isValidAllowType([String, Number],          [String]                   )).toBe(T);
            expect(isValidAllowType([String, Number],          [Number, String]           )).toBe(T);
            expect(isValidAllowType([String, Number],          [String, Boolean, Number]  )).toBe(false);
            expect(isValidAllowType([String, Number],          ['_opt_']                  )).toBe(false);
            expect(isValidAllowType([String, Number],          ['_any_']                  )).toBe(false);
        });
        it('- isValidAllowType(a, b) : choice ', () => {
            expect(isValidAllowType([[String, Number]],           [[Number]]            )).toBe(T);
            expect(isValidAllowType([['_any_']],                  [['_any_']]           )).toBe(T);
            expect(isValidAllowType([['_any_']],                  [[Number]]            )).toBe(T);
            expect(isValidAllowType([['_any_']],                  [[null]]              )).toBe(T);
            expect(isValidAllowType([['_any_']],                  [[undefined]]         )).toBe(T);
            // expect(isValidAllowType([['_any_']],                  undefined           )).toBe(false);    // TODO:
            // expect(isValidAllowType([['_any_']],                                      )).toBe(false);    // TODO:
            expect(isValidAllowType([['_seq_']],                  [['_seq_']]           )).toBe(T);     // TODO: 허용하도록 처리함 
            expect(isValidAllowType([['_seq_']],                  [['_seq_', String]]   )).toBe(T);
            expect(isValidAllowType([['_seq_']],                  [['_seq_', Number]]   )).toBe(T);
            expect(isValidAllowType([['_seq_', Number]],          [['_seq_', Number]]           )).toBe(T); // 같은 경우만 True  
            expect(isValidAllowType([['_seq_', Number]],          [['_seq_', Number, String]]   )).toBe(T); 
            expect(isValidAllowType([['_seq_', Number]],          [['_seq_']]                   )).toBe(false);
            expect(isValidAllowType([['_seq_', Number]],          [['_seq_', Boolean]]          )).toBe(false);
            expect(isValidAllowType([['_seq_', Number]],          [[Number]]                    )).toBe(false); 
            expect(isValidAllowType([['_seq_', Number, String]],  [['_seq_', Number, String]]   )).toBe(T); // 같은 경우만 True
            expect(isValidAllowType([['_seq_', Number, String]],  [['_seq_', Number]]           )).toBe(false); 
            expect(isValidAllowType([['_seq_', Number, String]],  [[Number]]                    )).toBe(false);
            expect(isValidAllowType([['_opt_']],                  [['_opt_']]           )).toBe(T);
            expect(isValidAllowType([['_opt_']],                  [['_opt_', String]]   )).toBe(T);
            expect(isValidAllowType([['_opt_']],                  [['_any_']]           )).toBe(T);
            expect(isValidAllowType([['_opt_']],                  undefined           )).toBe(T);
            expect(isValidAllowType([['_opt_']],                  [[String]]                    )).toBe(T);
            expect(isValidAllowType([['_opt_', String]],          [['_opt_', String]]           )).toBe(T);
            expect(isValidAllowType([['_opt_', String]],          [['_opt_', Number, String]]   )).toBe(false);
            expect(isValidAllowType([['_opt_', String]],          [['_opt_', Number]]           )).toBe(false);
            expect(isValidAllowType([['_opt_', String]],          [['_opt_']]                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String]],          [['_any_']]                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String]],          [[String]]                    )).toBe(T);
            expect(isValidAllowType([['_opt_', String]],          [[Number]]                    )).toBe(false);
            expect(isValidAllowType([['_opt_', String]],          undefined                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_opt_', String, Number]]   )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_opt_', Number]]           )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_opt_', String]]           )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [[String, Number]]            )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [[Number, String]]            )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [[String, Boolean]]           )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  [[Number, String, Boolean]]   )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  [[Number]]                    )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [[String]]                    )).toBe(T);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_opt_']]                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_any_']]                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  undefined                   )).toBe(false);
            expect(isValidAllowType([['_opt_', String, Number]],  [['_opt_', String, Boolean, Number]])).toBe(false);
            expect(isValidAllowType([[String, Number]],           [[String]]                    )).toBe(T);
            expect(isValidAllowType([[String, Number]],           [[Number, String]]            )).toBe(T);
            expect(isValidAllowType([[String, Number]],           [[String, Boolean, Number]]   )).toBe(false);
            expect(isValidAllowType([[String, Number]],           [['_opt_']]                   )).toBe(false);
            expect(isValidAllowType([[String, Number]],           [['_any_']]                   )).toBe(false);
        });
        it('- isValidAllowType(a, b) : function, 함수 파싱 ', () => {
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

            expect(isValidAllowType(type1, type1_1)).toBe(true);
            expect(isValidAllowType(type1, type1_2)).toBe(true);
            expect(isValidAllowType(type1, type1_3)).toBe(true);
            expect(isValidAllowType(type1, type1_4)).toBe(true);
            expect(isValidAllowType(type1, type1_5)).toBe(true);
            expect(isValidAllowType(type2, type2_1)).toBe(true);
            expect(isValidAllowType(type2, type2_2)).toBe(true);
            expect(isValidAllowType(type2, type2_3)).toBe(true);
            expect(isValidAllowType(type3, type3_1)).toBe(true);
            expect(isValidAllowType(type3, type3_2)).toBe(true);
            expect(isValidAllowType(type3, type3_3)).toBe(true);
            expect(isValidAllowType(type3, type3_4)).toBe(true);
            expect(isValidAllowType(type3, type3_5)).toBe(true);
            expect(isValidAllowType(type4, type4_1)).toBe(true);
            expect(isValidAllowType(type4, type4_2)).toBe(true);
            expect(isValidAllowType(type4, type4_3)).toBe(true);
            expect(isValidAllowType(type4, type4_4)).toBe(true);
            expect(isValidAllowType(type4, type4_5)).toBe(true);

        });
        it('- isValidAllowType(a, b) : function ', () => {
            var type1   = function(String, Number){Boolean}
            var type2   = function(){}
            type2._TYPE = {args: [String, Number], return: Boolean}
            var tar1    = function(){}
            tar1._TYPE  = {args: [String, Number], return: Boolean}

            expect(isValidAllowType(Function, Function    )).toBe(T);
            expect(isValidAllowType(type1, {}             )).toBe(false);
            expect(isValidAllowType(type1, tar1           )).toBe(T);
            expect(isValidAllowType(type2, tar1           )).toBe(T);

        });
        it('- isValidAllowType(a, b) : object ', () => {
            var ClassA = function(){};
            var ClassB = function(){this.aa = 1};

            expect(isValidAllowType(Object,    Object          )).toBe(T);
            expect(isValidAllowType(Object,    {}              )).toBe(T);
            expect(isValidAllowType(/reg/,     /reg/           )).toBe(T);
            expect(isValidAllowType(/reg/,     /reg2/          )).toBe(false);
            expect(isValidAllowType({},        new ClassA()    )).toBe(T);
            expect(isValidAllowType({},        new ClassB()    )).toBe(false);
            expect(isValidAllowType({},        true            )).toBe(false);
        });
        it('- isValidAllowType(a, b) : class ', () => {
            var ClassA = function(){this.a = 1}
            var ClassB = function(){this.a = 10}
            var ClassC = function(){this.b = 10}
            var ClassD = function(){this.b = 10}
            var ClassE = function(){throw new Error('강제예외')}

            expect(isValidAllowType(ClassA,       ClassA)).toBe(T);
            expect(isValidAllowType(ClassA,       ClassB)).toBe(false);
            expect(isValidAllowType(ClassA,       ClassC)).toBe(false);
            expect(isValidAllowType(ClassC,       ClassD)).toBe(T );
            expect(isValidAllowType(String,       String)).toBe(T );
            expect(isValidAllowType(ClassA,       ClassE)).toBe(false );

        }); 
        it('- isValidAllowType(a, b) : union (기본) ', () => {
            var type1      = {str: String, num: Number};

            expect(isValidAllowType(type1,    {str: String, num: Number}  )).toBe(true);
            expect(isValidAllowType(type1,    {str: '', num: 0}           )).toBe(true);
            expect(isValidAllowType(type1,    {str: ''}                   )).toBe(false);
        });
        it('- isValidAllowType(a, b) : union (choice) ', () => {
            var type1   = {str: [[String, Number]], bool: [['_any_']], num: [['_opt_', Number]]};

            expect(isValidAllowType(type1, {str: String, bool: null, num: Number}           )).toBe(T);
            expect(isValidAllowType(type1, {str: '', bool: true, num: [['_opt_', Number]]}  )).toBe(T);
            expect(isValidAllowType(type1, {str: '', bool: null, num: [['_opt_', String]]}  )).toBe(false);
            expect(isValidAllowType(type1, {str: String, bool: false, num: String}          )).toBe(false);
            expect(isValidAllowType(type1, {str: String}                                    )).toBe(false);
        });
    });
    describe('isValidType(type, target)', () => {
        it('- isValidType() : choice ', () => {
            // _any_
            expect(isValidType([['_any_']],         10          )).toBe(T);
            expect(isValidType([['_any_']],         'str'       )).toBe(T);
            expect(isValidType([['_any_']],         [[]]        )).toBe(T);
            expect(isValidType([['_any_']],         {}          )).toBe(T);
            expect(isValidType([['_any_']],         true        )).toBe(T);
            expect(isValidType([['_any_']],         undefined   )).toBe(false);
            // _seq_[
            expect(isValidType([['_seq_']],                 [[1,2,3]]   )).toBe(false);
            expect(isValidType([['_seq_']],                 10          )).toBe(false);
            expect(isValidType([['_seq_', String, Number]], [[1,2,3]]   )).toBe(false);
            expect(isValidType([['_seq_', String, Number]], 10          )).toBe(false);
            // _opt_[
            expect(isValidType([['_opt_']],                 [['str', 10]]   )).toBe(T);
            expect(isValidType([['_opt_']],                 [[10, 'str']]   )).toBe(T);
            expect(isValidType([['_opt_']],                 [['str']]       )).toBe(T);
            expect(isValidType([['_opt_']],                 10              )).toBe(T);
            expect(isValidType([['_opt_']],                 [['str', 10, true]])).toBe(T);
            expect(isValidType([['_opt_', String, Number]], 10          )).toBe(T);
            expect(isValidType([['_opt_', String, Number]], 'str'       )).toBe(T);
            expect(isValidType([['_opt_', String, Number]], undefined   )).toBe(T);
            expect(isValidType([['_opt_', String, Number]], true        )).toBe(false);
            expect(isValidType([['_opt_', String, Number]], []          )).toBe(false);
            expect(isValidType([['_opt_', String, Number]], {}          )).toBe(false);
            // choice
            expect(isValidType([[String, Number]],  10                  )).toBe(T);
            expect(isValidType([[String, Number]],  'str'               )).toBe(T);
            expect(isValidType([[String, Number]],  undefined           )).toBe(false);
            expect(isValidType([[String, Number]],  true                )).toBe(false);
            expect(isValidType([[String, Number]],  [[]]                )).toBe(false);
            expect(isValidType([[String, Number]],  {}                  )).toBe(false);
            expect(isValidType([[String, Number]],  [[String, Boolean]] )).toBe(false); // 당연히 실패
            expect(isValidType([[String, Number]],  [[Number, String]]  )).toBe(false);
            expect(isValidType([[String, Number]],  [[Number, String, Boolean]] )).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType([['_any_']],                 undefined   )).toThrow(/ES069(\s|.)*ES075/)
            expect(()=> checkType([['_seq_']],                 [[1,2,3]]   )).toThrow(/ES069(\s|.)*ES077/)
            expect(()=> checkType([['_seq_']],                 10          )).toThrow(/ES069(\s|.)*ES077/)
            expect(()=> checkType([['_seq_', String, Number]], [[1,2,3]]   )).toThrow(/ES069(\s|.)*ES077/)
            expect(()=> checkType([['_seq_', String, Number]], 10          )).toThrow(/ES069(\s|.)*ES077/)
            expect(()=> checkType([['_opt_', String, Number]], true        )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([['_opt_', String, Number]], []          )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([['_opt_', String, Number]], {}          )).toThrow(/ES069(\s|.)*ES076/)            
            expect(()=> checkType([[String, Number]],  undefined           )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[String, Number]],  true                )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[String, Number]],  [[]]                )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[String, Number]],  {}                  )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[String, Number]],  [[String, Boolean]] )).toThrow(/ES069(\s|.)*ES076/) // 당연히 실패
            expect(()=> checkType([[String, Number]],  [[Number, String]]  )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[String, Number]],  [[Number, String, Boolean]] )).toThrow(/ES069(\s|.)*ES07/)
        });
        it('- isValidType() : object ', () => {
            var Class1 = function() { this.aa = String }
            var Class2 = function() { this.bb = Number }
    
            expect(isValidType([[Class1, Class2]], {aa: 'STR', bb: 10}      )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR', bb: 10}      )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR', bb: 10}      )).toBe(T);
            expect(isValidType([[Class1, Class2]], {aa: 'STR'}              )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR'}              )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR'}              )).toBe(false);
            expect(isValidType([[Class1, Class2]], {aa: 'STR', bb: 'STR'}   )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR', bb: 'STR'}   )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR', bb: 'STR'}   )).toBe(false);
            expect(isValidType([[Class1, Class2]], {cc: 'STR'}              )).toBe(false);
            expect(isValidType(Class1,             {cc: 'STR'}              )).toBe(false);
            expect(isValidType(Class2,             {cc: 'STR'}              )).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType(Class2,             {aa: 'STR'}           )).toThrow(/ES069(\s|.)*ES027/)
            expect(()=> checkType(Class2,             {aa: 'STR', bb: 'STR'})).toThrow(/ES069(\s|.)*ES074/)
            expect(()=> checkType([[Class1, Class2]], {cc: 'STR'}           )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType(Class1,             {cc: 'STR'}           )).toThrow(/ES069(\s|.)*ES027/)
            expect(()=> checkType(Class2,             {cc: 'STR'}           )).toThrow(/ES069(\s|.)*ES027/)            
        });
        it('- isValidType() : object (객체 기본값) ', () => {
            var Class1 = function() { this.aa = String };
            var Class2 = function() { this.bb = 10 };

            expect(isValidType([[Class1, Class2]],{aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType(Class1,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType(Class2,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType([[Class1, Class2]],{aa: 'str'}         )).toBe(T);
            expect(isValidType(Class1,            {aa: 'str'}         )).toBe(T);
            expect(isValidType(Class2,            {aa: 'str'}         )).toBe(T);
            expect(isValidType([[Class1, Class2]],{bb: 5}             )).toBe(T);
            expect(isValidType(Class1,            {bb: 5}             )).toBe(false);
            expect(isValidType(Class2,            {bb: 5}             )).toBe(T);
            expect(isValidType([[Class1, Class2]],{cc: 'STR'}         )).toBe(T);
            expect(isValidType(Class1,            {cc: 'STR'}         )).toBe(false);
            expect(isValidType(Class2,            {cc: 'STR'}         )).toBe(T);
            expect(isValidType([[Class1, Class2]],{aa: 'STR', bb: 'STR'})).toBe(T);
            expect(isValidType(Class1,            {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(isValidType(Class2,            {aa: 'STR', bb: 'STR'})).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType(Class1,         {bb: 5}               )).toThrow(/ES069(\s|.)*ES027/)
            expect(()=> checkType(Class1,         {cc: 'STR'}           )).toThrow(/ES069(\s|.)*ES027/)
            expect(()=> checkType(Class2,         {aa: 'STR', bb: 'STR'})).toThrow(/ES069(\s|.)*ES074/)
        });
        it('- isValidType() : object (원시 객체 기본값) ', () => {
            expect(isValidType(/reg2/,        /reg/       )).toBe(T);
            expect(isValidType(new Date(),    new Date()  )).toBe(T);
            expect(isValidType(Symbol(),      Symbol()    )).toBe(T);
            expect(isValidType({},            /reg/       )).toBe(T);
            expect(isValidType({},            new Date()  )).toBe(T);
            expect(isValidType({},            Symbol()    )).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType({},         Symbol()    )).toThrow(/ES069(\s|.)*ES024/)

        });
        it('- isValidType() : choice 원시 타입 ', () => {
            expect(isValidType([[Number, String, Boolean]], 1           )).toBe(T);
            expect(isValidType([[Number, String, Boolean]], 'str'       )).toBe(T);
            expect(isValidType([[Number, String, Boolean]], true        )).toBe(T);            
            expect(isValidType([[Number, String, Boolean]], new Date()  )).toBe(false);
            expect(isValidType([[Number, String, Boolean]], /reg/       )).toBe(false);
            expect(isValidType([[Number, String, Boolean]], Symbol()    )).toBe(false);
            expect(isValidType([[Number, String, Boolean]], []          )).toBe(false);
            expect(isValidType([[Number, String, Boolean]], {}          )).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType([[Number, String, Boolean]], new Date()  )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[Number, String, Boolean]], /reg/       )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[Number, String, Boolean]], Symbol()    )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[Number, String, Boolean]], []          )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[Number, String, Boolean]], {}          )).toThrow(/ES069(\s|.)*ES076/)
        });
        it('- isValidType() : choice 내장 객체 타입 ', () => {
            expect(isValidType([[RegExp, Date, Symbol]], new Date() )).toBe(T);
            expect(isValidType([[RegExp, Date, Symbol]], /reg/      )).toBe(T);
            expect(isValidType([[RegExp, Date, Symbol]], Symbol()   )).toBe(T);            
            expect(isValidType([[RegExp, Date, Symbol]], 1          )).toBe(false);
            expect(isValidType([[RegExp, Date, Symbol]], true       )).toBe(false);
            expect(isValidType([[RegExp, Date, Symbol]], 'str'      )).toBe(false);       
            expect(isValidType([[RegExp, Date, Symbol]], []         )).toBe(false);       
            expect(isValidType([[RegExp, Date, Symbol]], {}         )).toBe(false);       
            // 예외 오류 코드
            expect(()=> checkType([[RegExp, Date, Symbol]], 1          )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[RegExp, Date, Symbol]], true       )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([[RegExp, Date, Symbol]], 'str'      )).toThrow(/ES069(\s|.)*ES076/)       
            expect(()=> checkType([[RegExp, Date, Symbol]], []         )).toThrow(/ES069(\s|.)*ES076/)       
            expect(()=> checkType([[RegExp, Date, Symbol]], {}         )).toThrow(/ES069(\s|.)*ES076/)       
        });
        it('- isValidType() : 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            
            expect(isValidType([[Super, Sub]],  new Sub())).toBe(T);
            expect(isValidType(Super,           new Sub())).toBe(T);
            expect(isValidType(Sub,             new Sub())).toBe(T);
            expect(isValidType(Object,          new Sub())).toBe(T);       
        });
        it('- isValidType() : array 조건 검사  ', () => {
            // array
            expect(isValidType([],            [1,2,3]     )).toBe(T);
            expect(isValidType([],            10          )).toBe(false);
            expect(isValidType(Array,         [1,2,3]     )).toBe(T);
            expect(isValidType(Array,         10          )).toBe(false);
            // expect(isValidType([[]],          [1,2,3]     )).toBe(T);
            // expect(isValidType([[]],          10          )).toBe(false);
            // _any_
            expect(isValidType(['_any_'],   [1, 'str']  )).toBe(T);
            expect(isValidType(['_any_'],   [0]         )).toBe(T);
            expect(isValidType(['_any_'],   []          )).toBe(T);
            expect(isValidType(['_any_'],   [undefined] )).toBe(false);
            expect(isValidType(['_any_'],   10          )).toBe(false);
            // _seq_
            expect(isValidType(['_seq_'], ['str', 10]       )).toBe(T);
            expect(isValidType(['_seq_'], ['str', 10, true] )).toBe(T);
            expect(isValidType(['_seq_'], [10, 'str']       )).toBe(T); 
            expect(isValidType(['_seq_'], ['str']           )).toBe(T);
            expect(isValidType(['_seq_'], 10                )).toBe(false);
            expect(isValidType(['_seq_', String, Number], ['str', 10]       )).toBe(T);
            expect(isValidType(['_seq_', String, Number], ['str', 10, true] )).toBe(T);
            expect(isValidType(['_seq_', String, Number], [10, 'str']       )).toBe(false);
            expect(isValidType(['_seq_', String, Number], ['str']           )).toBe(false);
            expect(isValidType(['_seq_', String, Number], 10                )).toBe(false);
            // _opt_
            expect(isValidType(['_opt_'], ['str', 10]       )).toBe(T);
            expect(isValidType(['_opt_'], [10]              )).toBe(T);
            expect(isValidType(['_opt_'], ['str']           )).toBe(T);
            expect(isValidType(['_opt_'], [true]            )).toBe(T);
            expect(isValidType(['_opt_'], [{}]              )).toBe(T);
            expect(isValidType(['_opt_'], []                )).toBe(T);
            expect(isValidType(['_opt_'], 10                )).toBe(false);
            expect(isValidType(['_opt_', String, Number], ['str', 10] )).toBe(T);
            expect(isValidType(['_opt_', String, Number], [10]        )).toBe(T);
            expect(isValidType(['_opt_', String, Number], []          )).toBe(T);
            expect(isValidType(['_opt_', String, Number], ['str']     )).toBe(T);
            expect(isValidType(['_opt_', String, Number], [true]      )).toBe(false);
            expect(isValidType(['_opt_', String, Number], [{}]        )).toBe(false);
            expect(isValidType(['_opt_', String, Number], 10          )).toBe(false);
            // choice
            expect(isValidType([String, Number], ['str', 10]    )).toBe(T);
            expect(isValidType([String, Number], [10]           )).toBe(T);
            expect(isValidType([String, Number], ['str']        )).toBe(T);
            expect(isValidType([String, Number], []             )).toBe(false);
            expect(isValidType([String, Number], [true]         )).toBe(false);
            expect(isValidType([String, Number], [{}]           )).toBe(false);
            expect(isValidType([String, Number], 10             )).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType([],           10                  )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType(Array,        10                  )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType(['_any_'],    [undefined]         )).toThrow(/ES069(\s|.)*ES075/)
            expect(()=> checkType(['_any_'],    10                  )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType(['_seq_'],    10                  )).toThrow(/ES069(\s|.)*ES024/) 
            expect(()=> checkType(['_seq_', String, Number], [10, 'str'])).toThrow(/ES069(\s|.)*ES074/)
            expect(()=> checkType(['_seq_', String, Number], ['str']    )).toThrow(/ES069(\s|.)*ES075/)
            expect(()=> checkType(['_seq_', String, Number], 10         )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType(['_opt_'],    10                  )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType(['_opt_', String, Number], [true] )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType(['_opt_', String, Number], [{}]   )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType(['_opt_', String, Number], 10     )).toThrow(/ES069(\s|.)*ES024/)
            expect(()=> checkType([String, Number], []              )).toThrow(/ES069(\s|.)*ES022/) // REVIEW: 확인
            expect(()=> checkType([String, Number], [true]          )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([String, Number], [{}]            )).toThrow(/ES069(\s|.)*ES076/)
            expect(()=> checkType([String, Number], 10              )).toThrow(/ES069(\s|.)*ES024/)

        });
        it('- isValidType() : function (선언 타입 검사) ', () => {
            var type1 = function(){};
            var type2 = function(String, Number){Object};
            var tar1  = function(){}; 
            var tar2  = function(){}; 
            var tar3  = function(){}; 
            var tar4  = function(){}; 
            tar2._TYPE = {args: [String, Number], return: [Object]}
            tar3._TYPE = {args: [], return: [Object, String]}
            tar4._TYPE = {param: [], return: [Object, String]}

            expect(isValidType(type1, tar1)).toBe(T);
            expect(isValidType(type1, tar2)).toBe(T);
            expect(isValidType(type1, tar3)).toBe(T);
            expect(isValidType(type2, tar1)).toBe(false);
            expect(isValidType(type2, tar2)).toBe(T);
            expect(isValidType(type2, tar3)).toBe(false);
            expect(isValidType(type2, tar4)).toBe(false);
            // 예외 오류 코드
            expect(()=> checkType(type2, tar1)).toThrow(/ES069(\s|.)*ES079/)
            expect(()=> checkType(type2, tar3)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/)
            expect(()=> checkType(type2, tar4)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/)
        });
        
        it('- isValidType() : choice(_any_) (모두 true) ', () => {
            // 단독 검사
            expect(isValidType([['_any_']], function any(){}    )).toBe(true);
            expect(isValidType([['_any_']], function any(){}    )).toBe(true);
            expect(isValidType([['_any_']], null                )).toBe(true);
            expect(isValidType([['_any_']], 1                   )).toBe(true);
            expect(isValidType([['_any_']], NaN                 )).toBe(true);
            expect(isValidType([['_any_']], 'str'               )).toBe(true);
            expect(isValidType([['_any_']], true                )).toBe(true);
            expect(isValidType([['_any_']], /reg/               )).toBe(true);
            expect(isValidType([['_any_']], Symbol()            )).toBe(true);
            expect(isValidType([['_any_']], []                  )).toBe(true);
            expect(isValidType([['_any_']], {aa: 1}             )).toBe(true);
            expect(isValidType([['_any_']], Number              )).toBe(true);
            expect(isValidType([['_any_']], String              )).toBe(true);
            expect(isValidType([['_any_']], Function            )).toBe(true);
            expect(isValidType([['_any_']], Object              )).toBe(true);
            expect(isValidType([['_any_']], Symbol              )).toBe(true);
            // or 검사
            expect(isValidType([[String, [['_any_']] ]], function any() {})).toBe(true);
            expect(isValidType(String, function any() {}, null)).toBe(false); // args 전달 안받음 배열로만 받음
            // TODO: 넘치면 오류 또는 경고 처리해야 오류를 낮출듯
            // and 검사
            // expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            // expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            // expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(isValidType(undefined, null)).toBe(false);
            expect(isValidType(null, null)).toBe(true);
        });
        it('- isValidType() : 타입이 없는 경우 ', () => {
            expect(isValidType(1)).toBe(true);
            // expect(checkUnionType(1)).toBe(false);
            // expect(()=> checkType(1)).toThrow('ES026');
            // expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- 커버리지 : 일반 ', () => {
            expect(isValidType([['default']], 'str')).toBe(true);   // 기본값 의미
            expect(isValidType([['default']], ['str'])).toBe(false); 
        });

    });
    describe('checkType() : 타입 검사, 실패시 예외 ', () => {
        it('- 예외 : function  ', () => {
            var type1 = ()=> Number
            var type1_1 = ()=>{}
            var type2 = (a,b)=> {"A"}

            expect(() => checkType(type1, type1_1)).toThrow(/ES069/);
            expect(() => checkType(type2, type1_1)).toThrow(/ES069/);
        });
        it('- checkType() : function (외부 참조형 타입 비교) ', () => {
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
            tar1._TYPE = {args: [String, {aa: Number}], return: [Object]}
            tar2._TYPE = {args: [[{aa: Number}]]}
            type3._TYPE = {args: arg1}


            expect(()=> checkType(type1, tar1)).toThrow(/ES069/);    // func 내부 참조변수 오류
            expect(checkType(type2, tar1)).toBe(undefined);
            expect(checkType(type3, tar1)).toBe(undefined);
            expect(checkType(type4, tar2)).toBe(undefined);
            
            // TODO: 확인해야함
            // expect(checkType(type3, tar1)).toBe(false);  
            // expect(checkType(type3, tar2)).toBe(true);

        });
    });

    describe('isValidType() & checkType() : 검사 ', () => {
        it('- null, undefined ', () => {
            // true
            expect(isValidType(null,                null            )).toBe(T);
            expect(isValidType({aa: undefined},     {aa:undefined}  )).toBe(T);
            expect(isValidType({aa: undefined},     {aa:null}       )).toBe(false);
            // false (예외)
            expect(()=>checkType(null,              false           )).toThrow('null');
            expect(()=>checkType({aa: undefined},   {aa:null}       )).toThrow('undefined');
            expect(()=>checkType(undefined,         {aa:null}       )).toThrow('ES026');
        });
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(isValidType(1,         0   )).toBe(T);
            expect(isValidType(Number,    0   )).toBe(T);
            expect(isValidType(NaN,       0   )).toBe(T);
            expect(isValidType(NaN,       NaN )).toBe(T);
            // false (예외)
            expect(()=> checkType(1,        function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(NaN,      function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   null                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   true                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   /reg/               )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   'str'               )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   Symbol()            )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   []                  )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   {aa:1}              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,   Symbol              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Number,                       )).toThrow(/ES069(\s|.)*ES074/);
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(isValidType('str',     ''        )).toBe(true);
            expect(isValidType('str',     undefined )).toBe(true);  // 기본값 설정됨
            expect(isValidType(String,    ''        )).toBe(true);
            // false (예외)
            expect(()=> checkType('str',    function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   null                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   true                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   /reg/               )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   1                   )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   Symbol()            )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   []                  )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   {aa:1}              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   Number              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(String,   Symbol              )).toThrow(/ES069(\s|.)*ES074/);
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(isValidType(true,      false     )).toBe(true);
            expect(isValidType(true,      undefined )).toBe(true);  // 기본값 설정됨
            expect(isValidType(Boolean,   false     )).toBe(true);
            // false (예외)
            expect(()=> checkType(true,     function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  function any(){}    )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  null                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  'str'               )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  /reg/               )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  1                   )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  Symbol()            )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  []                  )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  {aa:1}              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  Number              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Boolean,  Symbol              )).toThrow(/ES069(\s|.)*ES074/);
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(isValidType(Array,     []      )).toBe(true);
            expect(isValidType([],        [false] )).toBe(true);
            // expect(isValidType([[]],      Array   )).toBe(true);
            // false (예외)
            expect(()=> checkType(Array, function any(){}       )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, function any(){}, []   )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, null                   )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, 'str'                  )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, /reg/                  )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, 1                      )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, Symbol()               )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, true                   )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, {aa:1}                 )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, Number                 )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Array, Symbol                 )).toThrow(/ES069(\s|.)*ES024/);
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(isValidType(Function, function any(){})).toBe(true);
            // false (예외)
            expect(()=> checkType(Function, []          )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, null        )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, 'str'       )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, /reg/       )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, 1           )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, Symbol()    )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, true        )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Function, {aa:1}      )).toThrow(/ES069(\s|.)*ES024/);
        });
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
            tar1._TYPE = {args: [String, Number], return: Boolean}  // T
            tar2._TYPE = {args: [String, Number]}
            tar3._TYPE = {param: [String, Number]}
            tar4._TYPE = {args: String}
            tar5._TYPE = {return: [Boolean]}
            tar6._TYPE = {args: String, return: [Boolean]}
            tar7._TYPE = {args: Boolean, return: [Boolean]}

            expect(isValidType(fun1,    tar1)).toBe(true);
            // 오류
            expect(()=> checkType(fun1, tar2)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0717/);
            expect(()=> checkType(fun1, tar3)).toThrow(/ES069(\s|.)*ES0710/);
            expect(()=> checkType(fun1, tar4)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/);
            expect(()=> checkType(fun1, tar5)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/);
            expect(()=> checkType(fun1, tar6)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/);
            expect(()=> checkType(fun1, tar7)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0720/);
            expect(()=> checkType(fun1, tar8)).toThrow(/ES069(\s|.)*ES079/);
        });
        it('- Function : 정의된 function 타입 2 ', () => {
            var fun1 = function(){[Boolean, String]}
            var tar1 = function(){};
            var tar2 = function(){};
            tar1._TYPE = {args: [String, Number], return: [Boolean, String]}
            tar2._TYPE = {args: [String, Number]}

            expect(isValidType(fun1,    tar1)).toBe(true);
            expect(()=> checkType(fun1,    tar2)).toThrow(/ES069(\s|.)*ES0711(\s|.)*ES0717/)
        });
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(isValidType({}, Object             )).toBe(true);
            // expect(isValidType(null, Object)).toBe(true);
            expect(isValidType({}, /reg/              )).toBe(true);
            expect(isValidType({}, new Func()         )).toBe(true);
            expect(isValidType({}, function any(){}   )).toBe(true);
            expect(isValidType({}, Number             )).toBe(true);
            expect(isValidType({}, Symbol             )).toBe(true);
            // false (예외)
            // expect(()=> checkType(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> checkType(Object, 'str'     )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Object, 1         )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Object, Symbol()  )).toThrow(/ES069(\s|.)*ES024/);
            expect(()=> checkType(Object, true      )).toThrow(/ES069(\s|.)*ES024/);
            // expect(()=> checkType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> checkType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> checkType(Object, null      )).toThrow(/ES069(\s|.)*ES024/);
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(isValidType(Func1, new Func2()         )).toBe(true);
            expect(isValidType(Func1, new Func1()         )).toBe(true);
            expect(isValidType(Func1, { aa:10 }           )).toBe(true);
            expect(isValidType(Func2, { aa:10 }           )).toBe(true);
            expect(isValidType(Func3, { aa: new Date() }  )).toBe(true);
            // false (예외)
                // expect(()=> checkType(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> checkType(Func1, function any(){}   )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, null               )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, 'str'              )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, /reg/              )).toThrow(/ES069(\s|.)*ES031/);
            expect(()=> checkType(Func1, 1                  )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, Symbol()           )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, true               )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, Number             )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Func1, Symbol             )).toThrow(/ES069(\s|.)*ES032/);
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(isValidType([[String, Number]],              'str'       )).toBe(true);
            expect(isValidType([[String, Number]],              1           )).toBe(true);
            expect(isValidType([[Boolean, Number]],             true        )).toBe(true);
            expect(isValidType([[Boolean, null  ]],             null        )).toBe(true);
            expect(isValidType([[Boolean, [['_any_']]]],        /reg/       )).toBe(true);       // any
            expect(isValidType([[Boolean, Object]],             /reg/       )).toBe(true);     // objct 최상위
            expect(isValidType([[Boolean, RegExp]],             /reg/       )).toBe(true);     // 내장 함수
            expect(isValidType([[Func1, Number]],               new Func1() )).toBe(true);
            expect(isValidType([[[[String, Func1]], Number]],   new Func1() )).toBe(true);   // 복합 배열
            expect( isValidType([[[Func1], Number]],            [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1 ]]  는 배열안에 함수를 의미함!
            // false (예외) 
            expect(()=> checkType([[Array, String]],          1               )).toThrow(/ES069(\s|.)*ES076/);
            expect(()=> checkType([[Array]],                  function any(){})).toThrow(/ES069(\s|.)*ES076/);
            expect(()=> checkType([[String]],                 function any(){})).toThrow(/ES069(\s|.)*ES076/);
            expect(()=> checkType([[String, Number]],         null            )).toThrow(/ES069(\s|.)*ES076/);
            expect(()=> checkType([[Array, Number, Boolean]], 'str'           )).toThrow(/ES069(\s|.)*ES076/);
        });
        it('- {obj:...} : union 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(isValidType(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> checkType(Symbol, function any(){}  )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, function any(){}  )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, null              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, 'str'             )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, /reg/             )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, 1                 )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, true              )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, []                )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, {aa:1}            )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, Number            )).toThrow(/ES069(\s|.)*ES074/);
            expect(()=> checkType(Symbol, Symbol            )).toThrow(/ES069(\s|.)*ES074/);
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(isValidType(Date, new Date())).toBe(true);
            expect(isValidType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> checkType(Date, function any(){}    )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, null                )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, true                )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, 1                   )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, 'str'               )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, []                  )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, {aa:1}              )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, Number              )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, /reg/               )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, Symbol()            )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(Date, Symbol              )).toThrow(/ES069(\s|.)*ES032/);
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(isValidType(RegExp, /reg/)).toBe(true);
            expect(isValidType(/reg/, /target/)).toBe(true);
            // false
            expect(()=> checkType(RegExp, function any(){}  )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, null              )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, true              )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, 1                 )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, 'str'             )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, []                )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, {aa:1}            )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, Number            )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, new Date()        )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, Symbol()          )).toThrow(/ES069(\s|.)*ES032/);
            expect(()=> checkType(RegExp, Symbol            )).toThrow(/ES069(\s|.)*ES032/);
        });
    });
    
    
    
    describe('isValidType() VS checkType() : 오류 찾기 ', () => {
    }); 
});
