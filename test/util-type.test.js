/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {typeKind, checkAllowType }  = require('../src/util-type');
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
            expect(typeKind([String]).name        ).toBe('choice');
            expect(typeKind([String, Number]).name).toBe('choice');
            // union
            expect(typeKind({fill:true}).name     ).toBe('union');
            expect(typeKind(new Corp).name        ).toBe('union');
            // array
            expect(typeKind([]).name              ).toBe('array');
            expect(typeKind(Array).name           ).toBe('array');
            expect(typeKind([[]]).name            ).toBe('array');
            expect(typeKind([['_seq_']]).name     ).toBe('array');
            expect(typeKind([['_opt_']]).name     ).toBe('array');
            expect(typeKind([['_any_']]).name     ).toBe('array');
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
            expect(typeKind(Symbol('a')).name     ).toBe('symbol');  // 존재하지 않는 타입
            // BigInt는 사용 안함
            expect(() => typeKind(2n ** 53n).name ).toThrow('ES022');
        });
    });

    describe('checkAllowType(origin, target) : 타입간에 비교 ', () => {
        it('- checkAllowType(a, b) : 원시 자료형 ', () => {
            // null
            expect(checkAllowType(null,      null        )).toBe(T);
            expect(checkAllowType(null,      undefined   )).toBe(false);
            // Number
            expect(checkAllowType(Number,    Number      )).toBe(T);
            expect(checkAllowType(Number,    10          )).toBe(T);
            expect(checkAllowType(Number,    NaN         )).toBe(T);
            expect(checkAllowType(Number,    String      )).toBe(false);
            expect(checkAllowType(Number,    true        )).toBe(false);
            expect(checkAllowType(NaN,       Number      )).toBe(false);
            expect(checkAllowType(NaN,       NaN         )).toBe(false);
            expect(checkAllowType(NaN,       10          )).toBe(false);
            expect(checkAllowType(10,        10          )).toBe(T);
            expect(checkAllowType(10,        20          )).toBe(false);
            expect(checkAllowType(10,        Number      )).toBe(false);
            expect(checkAllowType(10,        NaN         )).toBe(false);
            // String
            expect(checkAllowType(String,    String      )).toBe(T);
            expect(checkAllowType(String,    ''          )).toBe(T);
            expect(checkAllowType(String,    10          )).toBe(false);
            expect(checkAllowType(String,    Boolean     )).toBe(false);
            expect(checkAllowType('str',     'str'       )).toBe(T);
            expect(checkAllowType('str',     ''          )).toBe(false);
            expect(checkAllowType('str',     String      )).toBe(false);
            // Boolean
            expect(checkAllowType(Boolean,   Boolean     )).toBe(T);
            expect(checkAllowType(Boolean,   false       )).toBe(T);
            expect(checkAllowType(Boolean,   'str'       )).toBe(false);
            expect(checkAllowType(true,      true        )).toBe(T);
            expect(checkAllowType(true,      false       )).toBe(false);
            expect(checkAllowType(true,      Boolean     )).toBe(false);
            // undefined
            expect(checkAllowType(undefined, undefined   )).toBe(T);
            expect(checkAllowType(undefined,             )).toBe(T);
            expect(checkAllowType(undefined, null        )).toBe(false);
            // null
            expect(checkAllowType(null,      null        )).toBe(T);
            expect(checkAllowType(null,      undefined   )).toBe(false);
            expect(checkAllowType(null,      {}          )).toBe(false);
            expect(checkAllowType(null,      Object      )).toBe(false);
            // Symbol
            expect(checkAllowType(Symbol,    Symbol      )).toBe(T);
            expect(checkAllowType(Symbol,    Symbol()    )).toBe(T);
            expect(checkAllowType(Symbol,    null        )).toBe(false);
            expect(checkAllowType(Symbol,    Object      )).toBe(false);
            expect(checkAllowType(Symbol(),  Symbol      )).toBe(T);
            expect(checkAllowType(Symbol(),  Symbol()    )).toBe(T);
            expect(checkAllowType(Symbol(),  null        )).toBe(false);
            expect(checkAllowType(Symbol(),  Object      )).toBe(false);
        });
        it('- checkAllowType(a, b) : array choice', () => {
            expect(checkAllowType([],                          []                           )).toBe(T);
            expect(checkAllowType([],                          Array                        )).toBe(T);
            expect(checkAllowType([],                          [[]]                         )).toBe(T);
            expect(checkAllowType([[]],                        []                           )).toBe(T);
            expect(checkAllowType([[]],                        Array                        )).toBe(T);
            expect(checkAllowType([[]],                        [[]]                         )).toBe(T);
            expect(checkAllowType(Array,                       []                           )).toBe(T);
            expect(checkAllowType(Array,                       Array                        )).toBe(T);
            expect(checkAllowType(Array,                       [[]]                         )).toBe(T);
            expect(checkAllowType([['_etc_']],                 [[null]]                     )).toBe(false);
            expect(checkAllowType([['_any_']],                 [[null]]                     )).toBe(T);
            expect(checkAllowType([['_any_']],                 []                           )).toBe(false);
            expect(checkAllowType([['_any_']],                 undefined                    )).toBe(false);
            expect(checkAllowType([['_any_']],                 [[]]                         )).toBe(false);
            expect(checkAllowType([['_any_']],                 [['_opt_']]                  )).toBe(false);
            expect(checkAllowType([['_any_', String]],         [['_any_', String]]          )).toBe(T);
            expect(checkAllowType([['_any_', String]],         [[String]]                   )).toBe(T);
            expect(checkAllowType([['_any_', String]],         [[Number]]                   )).toBe(T);
            expect(checkAllowType([['_seq_']],                 [['_seq_']]                  )).toBe(T);
            expect(checkAllowType([['_seq_']],                 [['_seq_', Boolean]]         )).toBe(T);
            expect(checkAllowType([['_seq_']],                 [[]]                         )).toBe(false);
            expect(checkAllowType([['_seq_', Number]],         [['_seq_', Number]]          )).toBe(T);
            expect(checkAllowType([['_seq_', Number]],         [['_seq_', Number, String]]  )).toBe(T);
            expect(checkAllowType([['_seq_', Number]],         [['_seq_']]                  )).toBe(false);
            expect(checkAllowType([['_seq_', Number]],         [['_seq_', Boolean]]         )).toBe(false);
            expect(checkAllowType([['_seq_', Number]],         [[Number]]                   )).toBe(false);
            expect(checkAllowType([['_seq_', Number, String]], [['_seq_', Number, String]]  )).toBe(T);
            expect(checkAllowType([['_seq_', Number, String]], [['_seq_', Number]]          )).toBe(false);
            expect(checkAllowType([['_seq_', Number, String]], [[Number]]                   )).toBe(false);
            expect(checkAllowType([['_opt_']],                 [['_opt_']]                  )).toBe(T);
            expect(checkAllowType([['_opt_']],                 [['_opt_', String]]          )).toBe(T);
            expect(checkAllowType([['_opt_']],                 [['_any_']]                  )).toBe(T);
            expect(checkAllowType([['_opt_']],                 [[]]                         )).toBe(T);
            expect(checkAllowType([['_opt_']],                 []                           )).toBe(T);
            expect(checkAllowType([['_opt_']],                 [[String]]                   )).toBe(T);
            expect(checkAllowType([['_opt_', String]],         [['_opt_', String]]          )).toBe(T);
            expect(checkAllowType([['_opt_', String]],         [['_opt_', Number, String]]  )).toBe(false);
            expect(checkAllowType([['_opt_', String]],         [['_opt_', Number]]          )).toBe(false);
            expect(checkAllowType([['_opt_', String]],         [['_opt_']]                  )).toBe(false);
            expect(checkAllowType([['_opt_', String]],         [['_any_']]                  )).toBe(false);
            expect(checkAllowType([['_opt_', String]],         [[String]]                   )).toBe(T);
            expect(checkAllowType([['_opt_', String]],         [[Number]]                   )).toBe(false);
            expect(checkAllowType([['_opt_', String]],         [[undefined]]                )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [['_opt_', Number, String]]  )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [['_opt_', String]]          )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [['_opt_', Number]]          )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [[String, Number]]           )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [[Number, String]]           )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [[Number, Boolean]]          )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [[Number, String, Boolean]]  )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [[Number]]                   )).toBe(T);
            expect(checkAllowType([['_opt_', String, Number]], [[String]]                   )).toBe(T);            
            expect(checkAllowType([['_opt_', String, Number]], [['_opt_']]                  )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [['_any_']]                  )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [[undefined]]                )).toBe(false);
            expect(checkAllowType([['_opt_', String, Number]], [['_opt_', Number, String, Boolean]])).toBe(false);
        });
        it('- checkAllowType(a, b) : choice ', () => {
            expect(checkAllowType([String, Number],          [Number]            )).toBe(T);
            expect(checkAllowType(['_any_'],                 ['_any_']           )).toBe(T);
            expect(checkAllowType(['_any_'],                 [Number]            )).toBe(T);
            expect(checkAllowType(['_any_'],                 [null]              )).toBe(T);
            expect(checkAllowType(['_any_'],                 [undefined]         )).toBe(T);
            expect(checkAllowType(['_any_'],                 undefined           )).toBe(false);
            expect(checkAllowType(['_any_'],                                     )).toBe(false);
            expect(checkAllowType(['_seq_'],                 ['_seq_']           )).toBe(T);
            expect(checkAllowType(['_seq_'],                 ['_seq_', String]   )).toBe(false);
            expect(checkAllowType(['_seq_'],                 ['_seq_', Number]   )).toBe(false);
            expect(checkAllowType(['_seq_', Number],         ['_seq_', Number]           )).toBe(T); // 같은 경우만 True
            expect(checkAllowType(['_seq_', Number],         ['_seq_', Number, String]   )).toBe(false);
            expect(checkAllowType(['_seq_', Number],         ['_seq_']                   )).toBe(false);
            expect(checkAllowType(['_seq_', Number],         ['_seq_', Boolean]          )).toBe(false);
            expect(checkAllowType(['_seq_', Number],         [Number]                    )).toBe(false);
            expect(checkAllowType(['_seq_', Number, String], ['_seq_', Number, String]   )).toBe(T); // 같은 경우만 True
            expect(checkAllowType(['_seq_', Number, String], ['_seq_', Number]           )).toBe(false);
            expect(checkAllowType(['_seq_', Number, String], [Number]                    )).toBe(false);
            expect(checkAllowType(['_opt_'],                 ['_opt_']           )).toBe(T);
            expect(checkAllowType(['_opt_'],                 ['_opt_', String]   )).toBe(T);
            expect(checkAllowType(['_opt_'],                 ['_any_']           )).toBe(T);
            expect(checkAllowType(['_opt_'],                 undefined           )).toBe(T);
            expect(checkAllowType(['_opt_'],                 [String]                    )).toBe(T);
            expect(checkAllowType(['_opt_', String],         ['_opt_', String]           )).toBe(T);
            expect(checkAllowType(['_opt_', String],         ['_opt_', Number, String]   )).toBe(false);
            expect(checkAllowType(['_opt_', String],         ['_opt_', Number]           )).toBe(false);
            expect(checkAllowType(['_opt_', String],         ['_opt_']                   )).toBe(false);
            expect(checkAllowType(['_opt_', String],         ['_any_']                   )).toBe(false);
            expect(checkAllowType(['_opt_', String],         [String]                    )).toBe(T);
            expect(checkAllowType(['_opt_', String],         [Number]                    )).toBe(false);
            expect(checkAllowType(['_opt_', String],         undefined                   )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], ['_opt_', String, Number]   )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], ['_opt_', Number]           )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], ['_opt_', String]           )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], [String, Number]            )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], [Number, String]            )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], [String, Boolean]           )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], [Number, String, Boolean]   )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], [Number]                    )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], [String]                    )).toBe(T);
            expect(checkAllowType(['_opt_', String, Number], ['_opt_']                   )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], ['_any_']                   )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], undefined                   )).toBe(false);
            expect(checkAllowType(['_opt_', String, Number], ['_opt_', String, Boolean, Number])).toBe(false);
        });
        it('- checkAllowType(a, b) : function, 함수 파싱 ', () => {
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

            expect(checkAllowType(type1, type1_1)).toBe(true);
            expect(checkAllowType(type1, type1_2)).toBe(true);
            expect(checkAllowType(type1, type1_3)).toBe(true);
            expect(checkAllowType(type1, type1_4)).toBe(true);
            expect(checkAllowType(type1, type1_5)).toBe(true);
            expect(checkAllowType(type2, type2_1)).toBe(true);
            expect(checkAllowType(type2, type2_2)).toBe(true);
            expect(checkAllowType(type2, type2_3)).toBe(true);
            expect(checkAllowType(type3, type3_1)).toBe(true);
            expect(checkAllowType(type3, type3_2)).toBe(true);
            expect(checkAllowType(type3, type3_3)).toBe(true);
            expect(checkAllowType(type3, type3_4)).toBe(true);
            expect(checkAllowType(type3, type3_5)).toBe(true);
            expect(checkAllowType(type4, type4_1)).toBe(true);
            expect(checkAllowType(type4, type4_2)).toBe(true);
            expect(checkAllowType(type4, type4_3)).toBe(true);
            expect(checkAllowType(type4, type4_4)).toBe(true);
            expect(checkAllowType(type4, type4_5)).toBe(true);


        });
        it('- checkAllowType(a, b) : object ', () => {
            var ClassA = function(){};
            var ClassB = function(){this.aa = 1};

            expect(checkAllowType(Object,    Object          )).toBe(T);
            expect(checkAllowType(Object,    {}              )).toBe(T);
            expect(checkAllowType(/reg/,     /reg/           )).toBe(T);
            expect(checkAllowType(/reg/,     /reg2/          )).toBe(false);
            expect(checkAllowType({},        new ClassA()    )).toBe(T);
            expect(checkAllowType({},        new ClassB()    )).toBe(false);
            expect(checkAllowType({},        true            )).toBe(false);
        });
        it('- checkAllowType(a, b) : class ', () => {
            var ClassA = function(){this.a = 1}
            var ClassB = function(){this.a = 10}
            var ClassC = function(){this.b = 10}
            var ClassD = function(){this.b = 10}
            var ClassE = function(){throw new Error('강제예외')}

            expect(checkAllowType(ClassA,       ClassA)).toBe(T);
            expect(checkAllowType(ClassA,       ClassB)).toBe(false);
            expect(checkAllowType(ClassA,       ClassC)).toBe(false);
            expect(checkAllowType(ClassC,       ClassD)).toBe(T );
            expect(checkAllowType(String,       String)).toBe(T );
            expect(checkAllowType(ClassA,       ClassE)).toBe(false );

        }); 
        it('- checkAllowType(a, b) : union (기본) ', () => {
            var type1      = {str: String, num: Number};

            expect(checkAllowType(type1,    {str: String, num: Number}  )).toBe(true);
            expect(checkAllowType(type1,    {str: '', num: 0}           )).toBe(true);
            expect(checkAllowType(type1,    {str: ''}                   )).toBe(false);
        });
        it('- checkAllowType(a, b) : union (choice) ', () => {
            var type1   = {str: [String, Number], bool: ['_any_'], num: ['_opt_', Number]};

            expect(checkAllowType(type1, {str: String, bool: null, num: Number}          )).toBe(T);
            expect(checkAllowType(type1, {str: '', bool: true, num: ['_opt_', Number]}   )).toBe(T);
            expect(checkAllowType(type1, {str: '', bool: null, num: ['_opt_', String]}   )).toBe(false);
            expect(checkAllowType(type1, {str: String, bool: false, num: String}         )).toBe(false);
            expect(checkAllowType(type1, {str: String}                                   )).toBe(false);
        });
    });
    describe('isValidType(type, target)', () => {
        it('- isValidType() : 일반 ', () => {
            // _any_
            expect(isValidType(['_any_'],         10          )).toBe(T);
            expect(isValidType(['_any_'],         'str'       )).toBe(T);
            expect(isValidType(['_any_'],         []          )).toBe(T);
            expect(isValidType(['_any_'],         {}          )).toBe(T);
            expect(isValidType(['_any_'],         true        )).toBe(T);
            expect(isValidType(['_any_'],         undefined   )).toBe(false);
            // _seq_
            expect(isValidType(['_seq_'],                 [1,2,3]     )).toBe(false);
            expect(isValidType(['_seq_'],                 10          )).toBe(false);
            expect(isValidType(['_seq_', String, Number], [1,2,3]     )).toBe(false);
            expect(isValidType(['_seq_', String, Number], 10          )).toBe(false);
            // _opt_
            expect(isValidType(['_opt_'],                 ['str', 10] )).toBe(T);
            expect(isValidType(['_opt_'],                 [10, 'str'] )).toBe(T);
            expect(isValidType(['_opt_'],                 ['str']     )).toBe(T);
            expect(isValidType(['_opt_'],                 10          )).toBe(T);
            expect(isValidType(['_opt_'],                 ['str', 10, true])).toBe(T);
            expect(isValidType(['_opt_', String, Number], 10          )).toBe(T);
            expect(isValidType(['_opt_', String, Number], 'str'       )).toBe(T);
            expect(isValidType(['_opt_', String, Number], undefined   )).toBe(T);
            expect(isValidType(['_opt_', String, Number], true        )).toBe(false);
            expect(isValidType(['_opt_', String, Number], []          )).toBe(false);
            expect(isValidType(['_opt_', String, Number], {}          )).toBe(false);
            // choice
            expect(isValidType([String, Number],  10          )).toBe(T);
            expect(isValidType([String, Number],  'str'       )).toBe(T);
            expect(isValidType([String, Number],  undefined   )).toBe(false);
            expect(isValidType([String, Number],  true        )).toBe(false);
            expect(isValidType([String, Number],  []          )).toBe(false);
            expect(isValidType([String, Number],  {}          )).toBe(false);
        });
        it('- isValidType() : object ', () => {
            var Class1 = function() { this.aa = String }
            var Class2 = function() { this.bb = Number }
    
            expect(isValidType([Class1, Class2],   {aa: 'STR', bb: 10}     )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(isValidType([Class1, Class2],   {aa: 'STR'}             )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR'}             )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR'}             )).toBe(false);
            expect(isValidType([Class1, Class2],   {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(isValidType(Class1,             {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(isValidType(Class2,             {aa: 'STR', bb: 'STR'}  )).toBe(false);
            expect(isValidType([Class1, Class2],   {cc: 'STR'}             )).toBe(false);
            expect(isValidType(Class1,             {cc: 'STR'}             )).toBe(false);
            expect(isValidType(Class2,             {cc: 'STR'}             )).toBe(false);
        });
        it('- isValidType() : object (객체 기본값) ', () => {
            var Class1 = function() { this.aa = String };
            var Class2 = function() { this.bb = 10 };

            expect(isValidType([Class1, Class2],  {aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType(Class1,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType(Class2,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(isValidType([Class1, Class2],  {aa: 'str'}         )).toBe(T);
            expect(isValidType(Class1,            {aa: 'str'}         )).toBe(T);
            expect(isValidType(Class2,            {aa: 'str'}         )).toBe(T);
            expect(isValidType([Class1, Class2],  {bb: 5}             )).toBe(T);
            expect(isValidType(Class1,            {bb: 5}             )).toBe(false);
            expect(isValidType(Class2,            {bb: 5}             )).toBe(T);
            expect(isValidType([Class1, Class2],  {cc: 'STR'}         )).toBe(T);
            expect(isValidType(Class1,            {cc: 'STR'}         )).toBe(false);
            expect(isValidType(Class2,            {cc: 'STR'}         )).toBe(T);
            expect(isValidType([Class1, Class2],  {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(isValidType(Class1,            {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(isValidType(Class2,            {aa: 'STR', bb: 'STR'})).toBe(false);
        });
        it('- isValidType() : object (원시 객체 기본값) ', () => {
            expect(isValidType(/reg2/,        /reg/       )).toBe(T);
            expect(isValidType(new Date(),    new Date()  )).toBe(T);
            expect(isValidType(Symbol(),      Symbol()    )).toBe(T);
            expect(isValidType({},            /reg/       )).toBe(T);
            expect(isValidType({},            new Date()  )).toBe(T);
            expect(isValidType({},            Symbol()    )).toBe(false);
        });
        it('- isValidType() : 원시 타입 ', () => {
            expect(isValidType([Number, String, Boolean], 1           )).toBe(T);
            expect(isValidType([Number, String, Boolean], 'str'       )).toBe(T);
            expect(isValidType([Number, String, Boolean], true        )).toBe(T);            
            expect(isValidType([Number, String, Boolean], new Date()  )).toBe(false);
            expect(isValidType([Number, String, Boolean], /reg/       )).toBe(false);
            expect(isValidType([Number, String, Boolean], Symbol()    )).toBe(false);
            expect(isValidType([Number, String, Boolean], []          )).toBe(false);
            expect(isValidType([Number, String, Boolean], {}          )).toBe(false);
        });
        it('- isValidType() : 내장 객체 타입 ', () => {
            expect(isValidType([RegExp, Date, Symbol], new Date() )).toBe(T);
            expect(isValidType([RegExp, Date, Symbol], /reg/      )).toBe(T);
            expect(isValidType([RegExp, Date, Symbol], Symbol()   )).toBe(T);            
            expect(isValidType([RegExp, Date, Symbol], 1          )).toBe(false);
            expect(isValidType([RegExp, Date, Symbol], true       )).toBe(false);
            expect(isValidType([RegExp, Date, Symbol], 'str'      )).toBe(false);       
            expect(isValidType([RegExp, Date, Symbol], []         )).toBe(false);       
            expect(isValidType([RegExp, Date, Symbol], {}         )).toBe(false);       
        });
        it('- isValidType() : 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            
            expect(isValidType([Super, Sub],  new Sub())).toBe(T);
            expect(isValidType(Super,         new Sub())).toBe(T);
            expect(isValidType(Sub,           new Sub())).toBe(T);
            expect(isValidType(Object,        new Sub())).toBe(T);       
        });
        it('- isValidType() : 배열,  choice 조건 검사  ', () => {
            // array
            expect(isValidType([],            [1,2,3]     )).toBe(true);
            expect(isValidType([],            10          )).toBe(false);
            expect(isValidType(Array,         [1,2,3]     )).toBe(true);
            expect(isValidType(Array,         10          )).toBe(false);
            expect(isValidType([[]],          [1,2,3]     )).toBe(true);
            expect(isValidType([[]],          10          )).toBe(false);
            // _any_
            expect(isValidType([['_any_']],   [1, 'str']  )).toBe(true);
            expect(isValidType([['_any_']],   [0]         )).toBe(true);
            expect(isValidType([['_any_']],   []          )).toBe(true);
            expect(isValidType([['_any_']],   [undefined] )).toBe(false);
            expect(isValidType([['_any_']],   10          )).toBe(false);
            // _seq_
            expect(isValidType([['_seq_']], ['str', 10]       )).toBe(true);
            expect(isValidType([['_seq_']], ['str', 10, true] )).toBe(true);
            expect(isValidType([['_seq_']], [10, 'str']       )).toBe(true);
            expect(isValidType([['_seq_']], ['str']           )).toBe(true);
            expect(isValidType([['_seq_']], 10                )).toBe(false);
            expect(isValidType([['_seq_', String, Number]], ['str', 10]       )).toBe(true);
            expect(isValidType([['_seq_', String, Number]], ['str', 10, true] )).toBe(true);
            expect(isValidType([['_seq_', String, Number]], [10, 'str']       )).toBe(false);
            expect(isValidType([['_seq_', String, Number]], ['str']           )).toBe(false);
            expect(isValidType([['_seq_', String, Number]], 10                )).toBe(false);
            // _opt_
            expect(isValidType([['_opt_']], ['str', 10]       )).toBe(true);
            expect(isValidType([['_opt_']], [10]              )).toBe(true);
            expect(isValidType([['_opt_']], ['str']           )).toBe(true);
            expect(isValidType([['_opt_']], [true]            )).toBe(true);
            expect(isValidType([['_opt_']], [{}]              )).toBe(true);
            expect(isValidType([['_opt_']], []                )).toBe(true);
            expect(isValidType([['_opt_']], 10                )).toBe(false);
            expect(isValidType([['_opt_', String, Number]], ['str', 10])).toBe(true);
            expect(isValidType([['_opt_', String, Number]], [10]      )).toBe(true);
            expect(isValidType([['_opt_', String, Number]], []        )).toBe(true);
            expect(isValidType([['_opt_', String, Number]], ['str']   )).toBe(true);
            expect(isValidType([['_opt_', String, Number]], [true]    )).toBe(false);
            expect(isValidType([['_opt_', String, Number]], [{}]      )).toBe(false);
            expect(isValidType([['_opt_', String, Number]], 10        )).toBe(false);
            // choice
            expect(isValidType([[String, Number]], ['str', 10]    )).toBe(true);
            expect(isValidType([[String, Number]], [10]           )).toBe(true);
            expect(isValidType([[String, Number]], ['str']        )).toBe(true);
            expect(isValidType([[String, Number]], []             )).toBe(false);
            expect(isValidType([[String, Number]], [true]         )).toBe(false);
            expect(isValidType([[String, Number]], [{}]           )).toBe(false);
            expect(isValidType([[String, Number]], 10             )).toBe(false);
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
        });
        
        it('- isValidType() : choice [_any_] (모두 true) ', () => {
            // 단독 검사
            expect(isValidType(['_any_'], function any(){}    )).toBe(true);
            expect(isValidType(['_any_'], function any(){}    )).toBe(true);
            expect(isValidType(['_any_'], null                )).toBe(true);
            expect(isValidType(['_any_'], 1                   )).toBe(true);
            expect(isValidType(['_any_'], NaN                 )).toBe(true);
            expect(isValidType(['_any_'], 'str'               )).toBe(true);
            expect(isValidType(['_any_'], true                )).toBe(true);
            expect(isValidType(['_any_'], /reg/               )).toBe(true);
            expect(isValidType(['_any_'], Symbol()            )).toBe(true);
            expect(isValidType(['_any_'], []                  )).toBe(true);
            expect(isValidType(['_any_'], {aa: 1}             )).toBe(true);
            expect(isValidType(['_any_'], Number              )).toBe(true);
            expect(isValidType(['_any_'], String              )).toBe(true);
            expect(isValidType(['_any_'], Function            )).toBe(true);
            expect(isValidType(['_any_'], Object              )).toBe(true);
            expect(isValidType(['_any_'], Symbol              )).toBe(true);
            // or 검사
            expect(isValidType([String, ['_any_']], function any() {})).toBe(true);
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
            expect(isValidType(['default'], 'str')).toBe(true);   // 기본값 의미
            expect(isValidType(['default'], ['str'])).toBe(false); 
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


            expect(()=> checkType(type1, tar1)).toThrow(/arg1/);    // func 내부 참조변수 오류
            expect(checkType(type2, tar1)).toBe(undefined);
            expect(checkType(type3, tar1)).toBe(undefined);
            expect(checkType(type4, tar2)).toBe(undefined);
            
            // TODO: 확인해야함
            // expect(checkType(type3, tar1)).toBe(false);  
            // expect(checkType(type3, tar2)).toBe(true);

        });
    });

    describe('isValidType() VS checkType() : 비교 ', () => {
        it('- null, undefined ', () => {
            // true
            expect(isValidType(null,                null            )).toBe(T);
            expect(isValidType({aa: undefined},     {aa:undefined}  )).toBe(T);
            expect(isValidType({aa: undefined},     {aa:null}       )).toBe(false);
            // false (예외)
            expect(()=>checkType(null,              false           )).toThrow('ES069');
            expect(()=>checkType({aa: undefined},   {aa:null}       )).toThrow('ES069');
            expect(()=>checkType(undefined,         {aa:null}       )).toThrow('ES026');
        });
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(isValidType(1,         0   )).toBe(T);
            expect(isValidType(Number,    0   )).toBe(T);
            expect(isValidType(NaN,       0   )).toBe(T);
            expect(isValidType(NaN,       NaN )).toBe(T);
            // false (예외)
            expect(()=> checkType(1,        function any(){}    )).toThrow('ES024');
            expect(()=> checkType(NaN,      function any(){}    )).toThrow('ES024');
            expect(()=> checkType(Number,   function any(){}    )).toThrow('ES024');
            expect(()=> checkType(Number,   null                )).toThrow('ES024');
            expect(()=> checkType(Number,   true                )).toThrow('ES024');
            expect(()=> checkType(Number,   /reg/               )).toThrow('ES024');
            expect(()=> checkType(Number,   'str'               )).toThrow('ES024');
            expect(()=> checkType(Number,   Symbol()            )).toThrow('ES024');
            expect(()=> checkType(Number,   []                  )).toThrow('ES024');
            expect(()=> checkType(Number,   {aa:1}              )).toThrow('ES024');
            expect(()=> checkType(Number,   Symbol              )).toThrow('ES024');
            expect(()=> checkType(Number,                       )).toThrow('ES024');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(isValidType('str',     ''  )).toBe(true);
            expect(isValidType(String,    ''  )).toBe(true);
            // false (예외)
            expect(()=> checkType('str',    function any(){}    )).toThrow('ES024');
            expect(()=> checkType(String,   function any(){}    )).toThrow('ES024');
            expect(()=> checkType(String,   null                )).toThrow('ES024');
            expect(()=> checkType(String,   true                )).toThrow('ES024');
            expect(()=> checkType(String,   /reg/               )).toThrow('ES024');
            expect(()=> checkType(String,   1                   )).toThrow('ES024');
            expect(()=> checkType(String,   Symbol()            )).toThrow('ES024');
            expect(()=> checkType(String,   []                  )).toThrow('ES024');
            expect(()=> checkType(String,   {aa:1}              )).toThrow('ES024');
            expect(()=> checkType(String,   Number              )).toThrow('ES024');
            expect(()=> checkType(String,   Symbol              )).toThrow('ES024');
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(isValidType(true,      false   )).toBe(true);
            expect(isValidType(Boolean,   false   )).toBe(true);
            // false (예외)
            expect(()=> checkType(true,     function any(){}    )).toThrow('ES024');
            expect(()=> checkType(Boolean,  function any(){}    )).toThrow('ES024');
            expect(()=> checkType(Boolean,  null                )).toThrow('ES024');
            expect(()=> checkType(Boolean,  'str'               )).toThrow('ES024');
            expect(()=> checkType(Boolean,  /reg/               )).toThrow('ES024');
            expect(()=> checkType(Boolean,  1                   )).toThrow('ES024');
            expect(()=> checkType(Boolean,  Symbol()            )).toThrow('ES024');
            expect(()=> checkType(Boolean,  []                  )).toThrow('ES024');
            expect(()=> checkType(Boolean,  {aa:1}              )).toThrow('ES024');
            expect(()=> checkType(Boolean,  Number              )).toThrow('ES024');
            expect(()=> checkType(Boolean,  Symbol              )).toThrow('ES024');
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(isValidType(Array,     []      )).toBe(true);
            expect(isValidType([],        [false] )).toBe(true);
            expect(isValidType([[]],      Array   )).toBe(true);
            // false (예외)
            expect(()=> checkType(Array, function any(){}       )).toThrow('ES024');
            expect(()=> checkType(Array, function any(){}, []   )).toThrow('ES024');
            expect(()=> checkType(Array, null                   )).toThrow('ES024');
            expect(()=> checkType(Array, 'str'                  )).toThrow('ES024');
            expect(()=> checkType(Array, /reg/                  )).toThrow('ES024');
            expect(()=> checkType(Array, 1                      )).toThrow('ES024');
            expect(()=> checkType(Array, Symbol()               )).toThrow('ES024');
            expect(()=> checkType(Array, true                   )).toThrow('ES024');
            expect(()=> checkType(Array, {aa:1}                 )).toThrow('ES024');
            expect(()=> checkType(Array, Number                 )).toThrow('ES024');
            expect(()=> checkType(Array, Symbol                 )).toThrow('ES024');
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(isValidType(Function, function any(){})).toBe(true);
            // false (예외)
            expect(()=> checkType(Function, []          )).toThrow('ES024');
            expect(()=> checkType(Function, null        )).toThrow('ES024');
            expect(()=> checkType(Function, 'str'       )).toThrow('ES024');
            expect(()=> checkType(Function, /reg/       )).toThrow('ES024');
            expect(()=> checkType(Function, 1           )).toThrow('ES024');
            expect(()=> checkType(Function, Symbol()    )).toThrow('ES024');
            expect(()=> checkType(Function, true        )).toThrow('ES024');
            expect(()=> checkType(Function, {aa:1}      )).toThrow('ES024');
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
            expect(()=> checkType(Object, 'str'     )).toThrow('ES024');
            expect(()=> checkType(Object, 1         )).toThrow('ES024');
            expect(()=> checkType(Object, Symbol()  )).toThrow('ES024');
            expect(()=> checkType(Object, true      )).toThrow('ES024');
            // expect(()=> checkType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> checkType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> checkType(Object, null      )).toThrow('ES024');
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
            expect(()=> checkType(Func1, function any(){}   )).toThrow('ES032');
            expect(()=> checkType(Func1, null               )).toThrow('ES032');
            expect(()=> checkType(Func1, 'str'              )).toThrow('ES032');
            expect(()=> checkType(Func1, /reg/              )).toThrow('ES031');
            expect(()=> checkType(Func1, 1                  )).toThrow('ES032');
            expect(()=> checkType(Func1, Symbol()           )).toThrow('ES032');
            expect(()=> checkType(Func1, true               )).toThrow('ES032');
            expect(()=> checkType(Func1, Number             )).toThrow('ES032');
            expect(()=> checkType(Func1, Symbol             )).toThrow('ES032');
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(isValidType([String, Number],          1           )).toBe(true);
            expect(isValidType([String, Number],          'str'       )).toBe(true);
            expect(isValidType([Boolean, Number],         true        )).toBe(true);
            expect(isValidType([Boolean, null],           null        )).toBe(true);
            expect(isValidType([Boolean, ['_any_']],      /reg/       )).toBe(true);       // any
            expect(isValidType([Boolean, Object],         /reg/       )).toBe(true);     // objct 최상위
            expect(isValidType([Boolean, RegExp],         /reg/       )).toBe(true);     // 내장 함수
            expect(isValidType([Func1, Number],           new Func1() )).toBe(true);
            expect(isValidType([[String, Func1], Number], new Func1() )).toBe(true);   // 복합 배열
            expect(isValidType([[[Func1]], Number],       [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1]]  는 배열안에 함수를 의미함!
            // false (예외)
            expect(()=> checkType([Array, String],          1               )).toThrow(/ES024.*ES024/);
            expect(()=> checkType([Array],                  function any(){})).toThrow(/ES024/);
            expect(()=> checkType([String],                 function any(){})).toThrow(/ES024/);
            expect(()=> checkType([String, Number],         null            )).toThrow(/ES024.*ES024/);
            expect(()=> checkType([Array, Number, Boolean], 'str'           )).toThrow(/ES024.*ES024.*ES024/);
        });
        it('- {obj:...} : and 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(isValidType(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> checkType(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> checkType(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> checkType(Symbol, null              )).toThrow('ES024');
            expect(()=> checkType(Symbol, 'str'             )).toThrow('ES024');
            expect(()=> checkType(Symbol, /reg/             )).toThrow('ES024');
            expect(()=> checkType(Symbol, 1                 )).toThrow('ES024');
            expect(()=> checkType(Symbol, true              )).toThrow('ES024');
            expect(()=> checkType(Symbol, []                )).toThrow('ES024');
            expect(()=> checkType(Symbol, {aa:1}            )).toThrow('ES024');
            expect(()=> checkType(Symbol, Number            )).toThrow('ES024');
            expect(()=> checkType(Symbol, Symbol            )).toThrow('ES024');
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(isValidType(Date, new Date())).toBe(true);
            expect(isValidType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> checkType(Date, function any(){}    )).toThrow('ES032');
            expect(()=> checkType(Date, null                )).toThrow('ES032');
            expect(()=> checkType(Date, true                )).toThrow('ES032');
            expect(()=> checkType(Date, 1                   )).toThrow('ES032');
            expect(()=> checkType(Date, 'str'               )).toThrow('ES032');
            expect(()=> checkType(Date, []                  )).toThrow('ES032');
            expect(()=> checkType(Date, {aa:1}              )).toThrow('ES032');
            expect(()=> checkType(Date, Number              )).toThrow('ES032');
            expect(()=> checkType(Date, /reg/               )).toThrow('ES032');
            expect(()=> checkType(Date, Symbol()            )).toThrow('ES032');
            expect(()=> checkType(Date, Symbol              )).toThrow('ES032');
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(isValidType(RegExp, /reg/)).toBe(true);
            expect(isValidType(/reg/, /target/)).toBe(true);
            // false
            expect(()=> checkType(RegExp, function any(){}  )).toThrow('ES032');
            expect(()=> checkType(RegExp, null              )).toThrow('ES032');
            expect(()=> checkType(RegExp, true              )).toThrow('ES032');
            expect(()=> checkType(RegExp, 1                 )).toThrow('ES032');
            expect(()=> checkType(RegExp, 'str'             )).toThrow('ES032');
            expect(()=> checkType(RegExp, []                )).toThrow('ES032');
            expect(()=> checkType(RegExp, {aa:1}            )).toThrow('ES032');
            expect(()=> checkType(RegExp, Number            )).toThrow('ES032');
            expect(()=> checkType(RegExp, new Date()        )).toThrow('ES032');
            expect(()=> checkType(RegExp, Symbol()          )).toThrow('ES032');
            expect(()=> checkType(RegExp, Symbol            )).toThrow('ES032');
        });
    });
    
    
    

});
