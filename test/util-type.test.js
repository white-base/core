/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {typeKind, typeAllowCheck }  = require('../src/util-type');
const { typeCheck, typeValid }  = require('../src/util-type');
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

    describe('typeAllowCheck(origin, target) : 타입간에 비교 ', () => {
        it('- typeAllowCheck(a, b) : 원시 자료형 ', () => {
            // null
            expect(typeAllowCheck(null,      null        )).toBe(T);
            expect(typeAllowCheck(null,      undefined   )).toBe(false);
            // Number
            expect(typeAllowCheck(Number,    Number      )).toBe(T);
            expect(typeAllowCheck(Number,    10          )).toBe(T);
            expect(typeAllowCheck(Number,    NaN         )).toBe(T);
            expect(typeAllowCheck(Number,    String      )).toBe(false);
            expect(typeAllowCheck(Number,    true        )).toBe(false);
            expect(typeAllowCheck(NaN,       Number      )).toBe(false);
            expect(typeAllowCheck(NaN,       NaN         )).toBe(false);
            expect(typeAllowCheck(NaN,       10          )).toBe(false);
            expect(typeAllowCheck(10,        10          )).toBe(T);
            expect(typeAllowCheck(10,        20          )).toBe(false);
            expect(typeAllowCheck(10,        Number      )).toBe(false);
            expect(typeAllowCheck(10,        NaN         )).toBe(false);
            // String
            expect(typeAllowCheck(String,    String      )).toBe(T);
            expect(typeAllowCheck(String,    ''          )).toBe(T);
            expect(typeAllowCheck(String,    10          )).toBe(false);
            expect(typeAllowCheck(String,    Boolean     )).toBe(false);
            expect(typeAllowCheck('str',     'str'       )).toBe(T);
            expect(typeAllowCheck('str',     ''          )).toBe(false);
            expect(typeAllowCheck('str',     String      )).toBe(false);
            // Boolean
            expect(typeAllowCheck(Boolean,   Boolean     )).toBe(T);
            expect(typeAllowCheck(Boolean,   false       )).toBe(T);
            expect(typeAllowCheck(Boolean,   'str'       )).toBe(false);
            expect(typeAllowCheck(true,      true        )).toBe(T);
            expect(typeAllowCheck(true,      false       )).toBe(false);
            expect(typeAllowCheck(true,      Boolean     )).toBe(false);
            // undefined
            expect(typeAllowCheck(undefined, undefined   )).toBe(T);
            expect(typeAllowCheck(undefined,             )).toBe(T);
            expect(typeAllowCheck(undefined, null        )).toBe(false);
            // null
            expect(typeAllowCheck(null,      null        )).toBe(T);
            expect(typeAllowCheck(null,      undefined   )).toBe(false);
            expect(typeAllowCheck(null,      {}          )).toBe(false);
            expect(typeAllowCheck(null,      Object      )).toBe(false);
            // Symbol
            expect(typeAllowCheck(Symbol,    Symbol      )).toBe(T);
            expect(typeAllowCheck(Symbol,    Symbol()    )).toBe(T);
            expect(typeAllowCheck(Symbol,    null        )).toBe(false);
            expect(typeAllowCheck(Symbol,    Object      )).toBe(false);
            expect(typeAllowCheck(Symbol(),  Symbol      )).toBe(T);
            expect(typeAllowCheck(Symbol(),  Symbol()    )).toBe(T);
            expect(typeAllowCheck(Symbol(),  null        )).toBe(false);
            expect(typeAllowCheck(Symbol(),  Object      )).toBe(false);
        });
        it('- typeAllowCheck(a, b) : array choice', () => {
            expect(typeAllowCheck([],                          []                            )).toBe(T);
            expect(typeAllowCheck([],                          Array                         )).toBe(T);
            expect(typeAllowCheck([],                          [[]]                          )).toBe(T);
            expect(typeAllowCheck([[]],                        []                            )).toBe(T);
            expect(typeAllowCheck([[]],                        Array                         )).toBe(T);
            expect(typeAllowCheck([[]],                        [[]]                          )).toBe(T);
            expect(typeAllowCheck(Array,                       []                            )).toBe(T);
            expect(typeAllowCheck(Array,                       Array                         )).toBe(T);
            expect(typeAllowCheck(Array,                       [[]]                          )).toBe(T);
            expect(typeAllowCheck([['_any_']],                 [[null]]                      )).toBe(T);
            expect(typeAllowCheck([['_any_']],                 []                            )).toBe(false);
            expect(typeAllowCheck([['_any_']],                 undefined                     )).toBe(false);
            expect(typeAllowCheck([['_any_']],                 [[]]                          )).toBe(false);
            expect(typeAllowCheck([['_any_', String]],         [['_any_', String]]           )).toBe(T);
            expect(typeAllowCheck([['_any_', String]],         [[String]]                    )).toBe(T);
            expect(typeAllowCheck([['_any_', String]],         [[Number]]                    )).toBe(T);
            expect(typeAllowCheck([['_seq_']],                 [['_seq_']]                   )).toBe(T);
            expect(typeAllowCheck([['_seq_']],                 [['_seq_', Boolean]]          )).toBe(T);
            expect(typeAllowCheck([['_seq_']],                 [[]]                          )).toBe(false);
            expect(typeAllowCheck([['_seq_', Number]],         [['_seq_', Number]]           )).toBe(T);
            expect(typeAllowCheck([['_seq_', Number]],         [['_seq_', Number, String]]   )).toBe(T);
            expect(typeAllowCheck([['_seq_', Number]],         [['_seq_']]                   )).toBe(false);
            expect(typeAllowCheck([['_seq_', Number]],         [['_seq_', Boolean]]          )).toBe(false);
            expect(typeAllowCheck([['_seq_', Number]],         [[Number]]                    )).toBe(false);
            expect(typeAllowCheck([['_seq_', Number, String]], [['_seq_', Number, String]]   )).toBe(T);
            expect(typeAllowCheck([['_seq_', Number, String]], [['_seq_', Number]]           )).toBe(false);
            expect(typeAllowCheck([['_seq_', Number, String]], [[Number]]                    )).toBe(false);
            expect(typeAllowCheck([['_opt_']],                 [['_opt_']]                   )).toBe(T);
            expect(typeAllowCheck([['_opt_']],                 [['_opt_', String]]           )).toBe(T);
            expect(typeAllowCheck([['_opt_']],                 [['_any_']]                   )).toBe(T);
            expect(typeAllowCheck([['_opt_']],                 [[]]                          )).toBe(T);
            expect(typeAllowCheck([['_opt_']],                 []                            )).toBe(T);
            expect(typeAllowCheck([['_opt_']],                 [[String]]                    )).toBe(T);
            expect(typeAllowCheck([['_opt_', String]],         [['_opt_', String]]           )).toBe(T);
            expect(typeAllowCheck([['_opt_', String]],         [['_opt_', Number, String]]   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String]],         [['_opt_', Number]]           )).toBe(false);
            expect(typeAllowCheck([['_opt_', String]],         [['_opt_']]                   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String]],         [['_any_']]                   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String]],         [[String]]                    )).toBe(T);
            expect(typeAllowCheck([['_opt_', String]],         [[Number]]                    )).toBe(false);
            expect(typeAllowCheck([['_opt_', String]],         [[undefined]]                 )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [['_opt_', Number, String]]   )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [['_opt_', String]]           )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [['_opt_', Number]]           )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [[String, Number]]            )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [[Number, String]]            )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [[Number, Boolean]]           )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [[Number, String, Boolean]]   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [[Number]]                    )).toBe(T);
            expect(typeAllowCheck([['_opt_', String, Number]], [[String]]                    )).toBe(T);            
            expect(typeAllowCheck([['_opt_', String, Number]], [['_opt_']]                   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [['_any_']]                   )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [[undefined]]                 )).toBe(false);
            expect(typeAllowCheck([['_opt_', String, Number]], [['_opt_', Number, String, Boolean]])).toBe(false);
        });
        it('- typeAllowCheck(a, b) : choice ', () => {
            expect(typeAllowCheck([String, Number],          [Number]            )).toBe(T);
            expect(typeAllowCheck(['_any_'],                 ['_any_']           )).toBe(T);
            expect(typeAllowCheck(['_any_'],                 [Number]            )).toBe(T);
            expect(typeAllowCheck(['_any_'],                 [null]              )).toBe(T);
            expect(typeAllowCheck(['_any_'],                 [undefined]         )).toBe(T);
            expect(typeAllowCheck(['_any_'],                 undefined           )).toBe(false);
            expect(typeAllowCheck(['_any_'],                                     )).toBe(false);
            expect(typeAllowCheck(['_seq_'],                 ['_seq_']           )).toBe(T);
            expect(typeAllowCheck(['_seq_'],                 ['_seq_', String]   )).toBe(false);
            expect(typeAllowCheck(['_seq_'],                 ['_seq_', Number]   )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number],         ['_seq_', Number]           )).toBe(T); // 같은 경우만 True
            expect(typeAllowCheck(['_seq_', Number],         ['_seq_', Number, String]   )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number],         ['_seq_']                   )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number],         ['_seq_', Boolean]          )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number],         [Number]                    )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number, String], ['_seq_', Number, String]   )).toBe(T); // 같은 경우만 True
            expect(typeAllowCheck(['_seq_', Number, String], ['_seq_', Number]           )).toBe(false);
            expect(typeAllowCheck(['_seq_', Number, String], [Number]                    )).toBe(false);
            expect(typeAllowCheck(['_opt_'],                 ['_opt_']           )).toBe(T);
            expect(typeAllowCheck(['_opt_'],                 ['_opt_', String]   )).toBe(T);
            expect(typeAllowCheck(['_opt_'],                 ['_any_']           )).toBe(T);
            expect(typeAllowCheck(['_opt_'],                 undefined           )).toBe(T);
            expect(typeAllowCheck(['_opt_'],                 [String]                    )).toBe(T);
            expect(typeAllowCheck(['_opt_', String],         ['_opt_', String]           )).toBe(T);
            expect(typeAllowCheck(['_opt_', String],         ['_opt_', Number, String]   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String],         ['_opt_', Number]           )).toBe(false);
            expect(typeAllowCheck(['_opt_', String],         ['_opt_']                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String],         ['_any_']                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String],         [String]                    )).toBe(T);
            expect(typeAllowCheck(['_opt_', String],         [Number]                    )).toBe(false);
            expect(typeAllowCheck(['_opt_', String],         undefined                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], ['_opt_', String, Number]   )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], ['_opt_', Number]           )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], ['_opt_', String]           )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], [String, Number]            )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], [Number, String]            )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], [String, Boolean]           )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], [Number, String, Boolean]   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], [Number]                    )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], [String]                    )).toBe(T);
            expect(typeAllowCheck(['_opt_', String, Number], ['_opt_']                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], ['_any_']                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], undefined                   )).toBe(false);
            expect(typeAllowCheck(['_opt_', String, Number], ['_opt_', String, Boolean, Number])).toBe(false);
        });
        it('- typeAllowCheck(a, b) : function, 함수 파싱 ', () => {
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

            expect(typeAllowCheck(type1, type1_1)).toBe(true);
            expect(typeAllowCheck(type1, type1_2)).toBe(true);
            expect(typeAllowCheck(type1, type1_3)).toBe(true);
            expect(typeAllowCheck(type1, type1_4)).toBe(true);
            expect(typeAllowCheck(type1, type1_5)).toBe(true);
            expect(typeAllowCheck(type2, type2_1)).toBe(true);
            expect(typeAllowCheck(type2, type2_2)).toBe(true);
            expect(typeAllowCheck(type2, type2_3)).toBe(true);
            expect(typeAllowCheck(type3, type3_1)).toBe(true);
            expect(typeAllowCheck(type3, type3_2)).toBe(true);
            expect(typeAllowCheck(type3, type3_3)).toBe(true);
            expect(typeAllowCheck(type3, type3_4)).toBe(true);
            expect(typeAllowCheck(type3, type3_5)).toBe(true);
            expect(typeAllowCheck(type4, type4_1)).toBe(true);
            expect(typeAllowCheck(type4, type4_2)).toBe(true);
            expect(typeAllowCheck(type4, type4_3)).toBe(true);
            expect(typeAllowCheck(type4, type4_4)).toBe(true);
            expect(typeAllowCheck(type4, type4_5)).toBe(true);
        });
        it('- typeAllowCheck(a, b) : object ', () => {
            var ClassA = function(){};
            var ClassB = function(){this.aa = 1};

            expect(typeAllowCheck(Object,    Object          )).toBe(T);
            expect(typeAllowCheck(Object,    {}              )).toBe(T);
            expect(typeAllowCheck(/reg/,     /reg/           )).toBe(T);
            expect(typeAllowCheck(/reg/,     /reg2/          )).toBe(false);
            expect(typeAllowCheck({},        new ClassA()    )).toBe(T);
            expect(typeAllowCheck({},        new ClassB()    )).toBe(false);
        });
        it('- typeAllowCheck(a, b) : class ', () => {
            var ClassA = function(){this.a = 1}
            var ClassB = function(){this.a = 10}
            var ClassC = function(){this.b = 10}
            var ClassD = function(){this.b = 10}

            expect(typeAllowCheck(ClassA,    ClassA)).toBe(T);
            expect(typeAllowCheck(ClassA,    ClassB)).toBe(false);
            expect(typeAllowCheck(ClassA,    ClassC)).toBe(false);
            expect(typeAllowCheck(ClassC,    ClassD)).toBe(T);
            expect(typeAllowCheck(String,    String)).toBe(T);

        });
        it('- typeAllowCheck(a, b) : union (기본) ', () => {
            var type1      = {str: String, num: Number};

            expect(typeAllowCheck(type1,    {str: String, num: Number}  )).toBe(true);
            expect(typeAllowCheck(type1,    {str: '', num: 0}           )).toBe(true);
            expect(typeAllowCheck(type1,    {str: ''}                   )).toBe(false);
        });
        it('- typeAllowCheck(a, b) : union (choice) ', () => {
            var type1   = {str: [String, Number], bool: ['_any_'], num: ['_opt_', Number]};

            expect(typeAllowCheck(type1, {str: String, bool: null, num: Number}          )).toBe(T);
            expect(typeAllowCheck(type1, {str: '', bool: true, num: ['_opt_', Number]}   )).toBe(T);
            expect(typeAllowCheck(type1, {str: '', bool: null, num: ['_opt_', String]}   )).toBe(false);
            expect(typeAllowCheck(type1, {str: String, bool: false, num: String}         )).toBe(false);
            expect(typeAllowCheck(type1, {str: String}                                   )).toBe(false);
        });
    });
    describe('typeCheck(type, target)', () => {
        it('- typeCheck() : 일반 ', () => {
            // _any_
            expect(typeCheck(['_any_'],         10          )).toBe(T);
            expect(typeCheck(['_any_'],         'str'       )).toBe(T);
            expect(typeCheck(['_any_'],         []          )).toBe(T);
            expect(typeCheck(['_any_'],         {}          )).toBe(T);
            expect(typeCheck(['_any_'],         true        )).toBe(T);
            expect(typeCheck(['_any_'],         undefined   )).toBe(false);
            // _seq_
            expect(typeCheck(['_seq_'],                 [1,2,3]     )).toBe(false);
            expect(typeCheck(['_seq_'],                 10          )).toBe(false);
            expect(typeCheck(['_seq_', String, Number], [1,2,3]     )).toBe(false);
            expect(typeCheck(['_seq_', String, Number], 10          )).toBe(false);
            // _opt_
            expect(typeCheck(['_opt_'],                 ['str', 10] )).toBe(T);
            expect(typeCheck(['_opt_'],                 [10, 'str'] )).toBe(T);
            expect(typeCheck(['_opt_'],                 ['str']     )).toBe(T);
            expect(typeCheck(['_opt_'],                 10          )).toBe(T);
            expect(typeCheck(['_opt_'],                 ['str', 10, true])).toBe(T);
            expect(typeCheck(['_opt_', String, Number], 10          )).toBe(T);
            expect(typeCheck(['_opt_', String, Number], 'str'       )).toBe(T);
            expect(typeCheck(['_opt_', String, Number], undefined   )).toBe(T);
            expect(typeCheck(['_opt_', String, Number], true        )).toBe(false);
            expect(typeCheck(['_opt_', String, Number], []          )).toBe(false);
            expect(typeCheck(['_opt_', String, Number], {}          )).toBe(false);
            // choice
            expect(typeCheck([String, Number],  10          )).toBe(T);
            expect(typeCheck([String, Number],  'str'       )).toBe(T);
            expect(typeCheck([String, Number],  undefined   )).toBe(false);
            expect(typeCheck([String, Number],  true        )).toBe(false);
            expect(typeCheck([String, Number],  []          )).toBe(false);
            expect(typeCheck([String, Number],  {}          )).toBe(false);
        });
        it('- typeCheck() : object ', () => {
            var Class1 = function() { this.aa = String }
            var Class2 = function() { this.bb = Number }
    
            expect(typeCheck([Class1, Class2],   {aa: 'STR', bb: 10}     )).toBe(T);
            expect(typeCheck(Class1,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(typeCheck(Class2,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(typeCheck([Class1, Class2],   {aa: 'STR'}             )).toBe(T);
            expect(typeCheck(Class1,             {aa: 'STR'}             )).toBe(T);
            expect(typeCheck(Class2,             {aa: 'STR'}             )).toBe(false);
            expect(typeCheck([Class1, Class2],   {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(typeCheck(Class1,             {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(typeCheck(Class2,             {aa: 'STR', bb: 'STR'}  )).toBe(false);
            expect(typeCheck([Class1, Class2],   {cc: 'STR'}             )).toBe(false);
            expect(typeCheck(Class1,             {cc: 'STR'}             )).toBe(false);
            expect(typeCheck(Class2,             {cc: 'STR'}             )).toBe(false);
        });
        it('- typeCheck() : object (객체 기본값) ', () => {
            var Class1 = function() { this.aa = String };
            var Class2 = function() { this.bb = 10 };

            expect(typeCheck([Class1, Class2],  {aa: 'str', bb: 2}  )).toBe(T);
            expect(typeCheck(Class1,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(typeCheck(Class2,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(typeCheck([Class1, Class2],  {aa: 'str'}         )).toBe(T);
            expect(typeCheck(Class1,            {aa: 'str'}         )).toBe(T);
            expect(typeCheck(Class2,            {aa: 'str'}         )).toBe(T);
            expect(typeCheck([Class1, Class2],  {bb: 5}             )).toBe(T);
            expect(typeCheck(Class1,            {bb: 5}             )).toBe(false);
            expect(typeCheck(Class2,            {bb: 5}             )).toBe(T);
            expect(typeCheck([Class1, Class2],  {cc: 'STR'}         )).toBe(T);
            expect(typeCheck(Class1,            {cc: 'STR'}         )).toBe(false);
            expect(typeCheck(Class2,            {cc: 'STR'}         )).toBe(T);
            expect(typeCheck([Class1, Class2],  {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(typeCheck(Class1,            {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(typeCheck(Class2,            {aa: 'STR', bb: 'STR'})).toBe(false);
        });
        it('- typeCheck() : object (원시 객체 기본값) ', () => {
            expect(typeCheck(/reg2/,        /reg/       )).toBe(T);
            expect(typeCheck(new Date(),    new Date()  )).toBe(T);
            expect(typeCheck(Symbol(),      Symbol()    )).toBe(T);
            expect(typeCheck({},            /reg/       )).toBe(T);
            expect(typeCheck({},            new Date()  )).toBe(T);
            expect(typeCheck({},            Symbol()    )).toBe(false);
        });
        it('- typeCheck() : 원시 타입 ', () => {
            expect(typeCheck([Number, String, Boolean], 1           )).toBe(T);
            expect(typeCheck([Number, String, Boolean], 'str'       )).toBe(T);
            expect(typeCheck([Number, String, Boolean], true        )).toBe(T);            
            expect(typeCheck([Number, String, Boolean], new Date()  )).toBe(false);
            expect(typeCheck([Number, String, Boolean], /reg/       )).toBe(false);
            expect(typeCheck([Number, String, Boolean], Symbol()    )).toBe(false);
            expect(typeCheck([Number, String, Boolean], []          )).toBe(false);
            expect(typeCheck([Number, String, Boolean], {}          )).toBe(false);
        });
        it('- typeCheck() : 내장 객체 타입 ', () => {
            expect(typeCheck([RegExp, Date, Symbol], new Date() )).toBe(T);
            expect(typeCheck([RegExp, Date, Symbol], /reg/      )).toBe(T);
            expect(typeCheck([RegExp, Date, Symbol], Symbol()   )).toBe(T);            
            expect(typeCheck([RegExp, Date, Symbol], 1          )).toBe(false);
            expect(typeCheck([RegExp, Date, Symbol], true       )).toBe(false);
            expect(typeCheck([RegExp, Date, Symbol], 'str'      )).toBe(false);       
            expect(typeCheck([RegExp, Date, Symbol], []         )).toBe(false);       
            expect(typeCheck([RegExp, Date, Symbol], {}         )).toBe(false);       
        });
        it('- typeCheck() : 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            
            expect(typeCheck([Super, Sub],  new Sub())).toBe(T);
            expect(typeCheck(Super,         new Sub())).toBe(T);
            expect(typeCheck(Sub,           new Sub())).toBe(T);
            expect(typeCheck(Object,        new Sub())).toBe(T);       
        });
        it('- typeCheck() : 배열,  choice 조건 검사  ', () => {
            // array
            expect(typeCheck([],            [1,2,3]     )).toBe(true);
            expect(typeCheck([],            10          )).toBe(false);
            expect(typeCheck(Array,         [1,2,3]     )).toBe(true);
            expect(typeCheck(Array,         10          )).toBe(false);
            expect(typeCheck([[]],          [1,2,3]     )).toBe(true);
            expect(typeCheck([[]],          10          )).toBe(false);
            // _any_
            expect(typeCheck([['_any_']],   [1, 'str']  )).toBe(true);
            expect(typeCheck([['_any_']],   [0]         )).toBe(true);
            expect(typeCheck([['_any_']],   []          )).toBe(true);
            expect(typeCheck([['_any_']],   [undefined] )).toBe(false);
            expect(typeCheck([['_any_']],   10          )).toBe(false);
            // _seq_
            expect(typeCheck([['_seq_']], ['str', 10]       )).toBe(true);
            expect(typeCheck([['_seq_']], ['str', 10, true] )).toBe(true);
            expect(typeCheck([['_seq_']], [10, 'str']       )).toBe(true);
            expect(typeCheck([['_seq_']], ['str']           )).toBe(true);
            expect(typeCheck([['_seq_']], 10                )).toBe(false);
            expect(typeCheck([['_seq_', String, Number]], ['str', 10]       )).toBe(true);
            expect(typeCheck([['_seq_', String, Number]], ['str', 10, true] )).toBe(true);
            expect(typeCheck([['_seq_', String, Number]], [10, 'str']       )).toBe(false);
            expect(typeCheck([['_seq_', String, Number]], ['str']           )).toBe(false);
            expect(typeCheck([['_seq_', String, Number]], 10                )).toBe(false);
            // _opt_
            expect(typeCheck([['_opt_']], ['str', 10]       )).toBe(true);
            expect(typeCheck([['_opt_']], [10]              )).toBe(true);
            expect(typeCheck([['_opt_']], ['str']           )).toBe(true);
            expect(typeCheck([['_opt_']], [true]            )).toBe(true);
            expect(typeCheck([['_opt_']], [{}]              )).toBe(true);
            expect(typeCheck([['_opt_']], []                )).toBe(true);
            expect(typeCheck([['_opt_']], 10                )).toBe(false);
            expect(typeCheck([['_opt_', String, Number]], ['str', 10])).toBe(true);
            expect(typeCheck([['_opt_', String, Number]], [10]      )).toBe(true);
            expect(typeCheck([['_opt_', String, Number]], []        )).toBe(true);
            expect(typeCheck([['_opt_', String, Number]], ['str']   )).toBe(true);
            expect(typeCheck([['_opt_', String, Number]], [true]    )).toBe(false);
            expect(typeCheck([['_opt_', String, Number]], [{}]      )).toBe(false);
            expect(typeCheck([['_opt_', String, Number]], 10        )).toBe(false);
            // choice
            expect(typeCheck([[String, Number]], ['str', 10]    )).toBe(true);
            expect(typeCheck([[String, Number]], [10]           )).toBe(true);
            expect(typeCheck([[String, Number]], ['str']        )).toBe(true);
            expect(typeCheck([[String, Number]], []             )).toBe(false);
            expect(typeCheck([[String, Number]], [true]         )).toBe(false);
            expect(typeCheck([[String, Number]], [{}]           )).toBe(false);
            expect(typeCheck([[String, Number]], 10             )).toBe(false);
        });
        it('- typeCheck() : function (선언 타입 검사) ', () => {
            var type1 = function(){};
            var type2 = function(String, Number){Object};
            var tar1  = function(){}; 
            var tar2  = function(){}; 
            var tar3  = function(){}; 
            tar2._TYPE = {args: [String, Number], return: [Object]}
            tar3._TYPE = {args: [], return: [Object, String]}

            expect(typeCheck(type1, tar1)).toBe(T);
            expect(typeCheck(type1, tar2)).toBe(T);
            expect(typeCheck(type1, tar3)).toBe(T);
            expect(typeCheck(type2, tar1)).toBe(false);
            expect(typeCheck(type2, tar2)).toBe(T);
            expect(typeCheck(type2, tar3)).toBe(false);
        });
        
        it('- typeCheck() : choice [_any_] (모두 true) ', () => {
            // 단독 검사
            expect(typeCheck(['_any_'], function any(){}    )).toBe(true);
            expect(typeCheck(['_any_'], function any(){}    )).toBe(true);
            expect(typeCheck(['_any_'], null                )).toBe(true);
            expect(typeCheck(['_any_'], 1                   )).toBe(true);
            expect(typeCheck(['_any_'], NaN                 )).toBe(true);
            expect(typeCheck(['_any_'], 'str'               )).toBe(true);
            expect(typeCheck(['_any_'], true                )).toBe(true);
            expect(typeCheck(['_any_'], /reg/               )).toBe(true);
            expect(typeCheck(['_any_'], Symbol()            )).toBe(true);
            expect(typeCheck(['_any_'], []                  )).toBe(true);
            expect(typeCheck(['_any_'], {aa: 1}             )).toBe(true);
            expect(typeCheck(['_any_'], Number              )).toBe(true);
            expect(typeCheck(['_any_'], String              )).toBe(true);
            expect(typeCheck(['_any_'], Function            )).toBe(true);
            expect(typeCheck(['_any_'], Object              )).toBe(true);
            expect(typeCheck(['_any_'], Symbol              )).toBe(true);
            // or 검사
            expect(typeCheck([String, ['_any_']], function any() {})).toBe(true);
            expect(typeCheck(String, function any() {}, null)).toBe(false); // args 전달 안받음 배열로만 받음
            // TODO: 넘치면 오류 또는 경고 처리해야 오류를 낮출듯
            // and 검사
            // expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            // expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            // expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(typeCheck(undefined, null)).toBe(false);
            expect(typeCheck(null, null)).toBe(true);
        });
        it('- typeCheck() : 타입이 없는 경우 ', () => {
            expect(typeCheck(1)).toBe(true);
            // expect(checkUnionType(1)).toBe(false);
            // expect(()=> typeValid(1)).toThrow('ES026');
            // expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- 커버리지 : 일반 ', () => {
            expect(typeCheck(['default'], 'str')).toBe(true);   // 기본값 의미
            expect(typeCheck(['default'], ['str'])).toBe(false); 
        });

    });
    describe('typeValid() : 타입 검사, 실패시 예외 ', () => {
        it('- 예외 : typeValid(), validUnionType()  ', () => {
            expect(() => typeValid(undefined, {})).toThrow(/ES026/);
        });
        it('- typeValid() : function (외부 참조형 타입 비교) ', () => {
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
            type3._TYPE = {args: arg1}
            var tar1 = function(){}; 
            var tar2 = function(){};
            tar1._TYPE = {args: [String, {aa: Number}], return: [Object]}
            tar2._TYPE = {args: [[{aa: Number}]]}

            expect(()=> typeValid(type1, tar1)).toThrow(/arg1/);    // func 내부 참조변수 오류
            expect(typeValid(type2, tar1)).toBe(true);
            expect(typeValid(type3, tar1)).toBe(true);
            expect(typeValid(type4, tar2)).toBe(true);
            
            // TODO: 확인해야함
            // expect(typeValid(type3, tar1)).toBe(false);  
            // expect(typeValid(type3, tar2)).toBe(true);

        });
    });

    describe('typeCheck() VS typeValid() : 비교 ', () => {
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(typeCheck(1,         0   )).toBe(T);
            expect(typeCheck(Number,    0   )).toBe(T);
            expect(typeCheck(NaN,       0   )).toBe(T);
            expect(typeCheck(NaN,       NaN )).toBe(T);
            // false (예외)
            expect(()=> typeValid(1,        function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(NaN,      function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(Number,   function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(Number,   null                )).toThrow('ES024');
            expect(()=> typeValid(Number,   true                )).toThrow('ES024');
            expect(()=> typeValid(Number,   /reg/               )).toThrow('ES024');
            expect(()=> typeValid(Number,   'str'               )).toThrow('ES024');
            expect(()=> typeValid(Number,   Symbol()            )).toThrow('ES024');
            expect(()=> typeValid(Number,   []                  )).toThrow('ES024');
            expect(()=> typeValid(Number,   {aa:1}              )).toThrow('ES024');
            expect(()=> typeValid(Number,   Symbol              )).toThrow('ES024');
            expect(()=> typeValid(Number,                       )).toThrow('ES024');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(typeCheck('str',     ''  )).toBe(true);
            expect(typeCheck(String,    ''  )).toBe(true);
            // false (예외)
            expect(()=> typeValid('str',    function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(String,   function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(String,   null                )).toThrow('ES024');
            expect(()=> typeValid(String,   true                )).toThrow('ES024');
            expect(()=> typeValid(String,   /reg/               )).toThrow('ES024');
            expect(()=> typeValid(String,   1                   )).toThrow('ES024');
            expect(()=> typeValid(String,   Symbol()            )).toThrow('ES024');
            expect(()=> typeValid(String,   []                  )).toThrow('ES024');
            expect(()=> typeValid(String,   {aa:1}              )).toThrow('ES024');
            expect(()=> typeValid(String,   Number              )).toThrow('ES024');
            expect(()=> typeValid(String,   Symbol              )).toThrow('ES024');
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(typeCheck(true,      false   )).toBe(true);
            expect(typeCheck(Boolean,   false   )).toBe(true);
            // false (예외)
            expect(()=> typeValid(true,     function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  function any(){}    )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  null                )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  'str'               )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  /reg/               )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  1                   )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  Symbol()            )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  []                  )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  {aa:1}              )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  Number              )).toThrow('ES024');
            expect(()=> typeValid(Boolean,  Symbol              )).toThrow('ES024');
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(typeCheck(Array,     []      )).toBe(true);
            expect(typeCheck([],        [false] )).toBe(true);
            expect(typeCheck([[]],      Array   )).toBe(true);
            // false (예외)
            expect(()=> typeValid(Array, function any(){}       )).toThrow('ES024');
            expect(()=> typeValid(Array, function any(){}, []   )).toThrow('ES024');
            expect(()=> typeValid(Array, null                   )).toThrow('ES024');
            expect(()=> typeValid(Array, 'str'                  )).toThrow('ES024');
            expect(()=> typeValid(Array, /reg/                  )).toThrow('ES024');
            expect(()=> typeValid(Array, 1                      )).toThrow('ES024');
            expect(()=> typeValid(Array, Symbol()               )).toThrow('ES024');
            expect(()=> typeValid(Array, true                   )).toThrow('ES024');
            expect(()=> typeValid(Array, {aa:1}                 )).toThrow('ES024');
            expect(()=> typeValid(Array, Number                 )).toThrow('ES024');
            expect(()=> typeValid(Array, Symbol                 )).toThrow('ES024');
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(typeCheck(Function, function any(){})).toBe(true);
            // false (예외)
            expect(()=> typeValid(Function, []          )).toThrow('ES024');
            expect(()=> typeValid(Function, null        )).toThrow('ES024');
            expect(()=> typeValid(Function, 'str'       )).toThrow('ES024');
            expect(()=> typeValid(Function, /reg/       )).toThrow('ES024');
            expect(()=> typeValid(Function, 1           )).toThrow('ES024');
            expect(()=> typeValid(Function, Symbol()    )).toThrow('ES024');
            expect(()=> typeValid(Function, true        )).toThrow('ES024');
            expect(()=> typeValid(Function, {aa:1}      )).toThrow('ES024');
        });
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(typeCheck({}, Object             )).toBe(true);
            // expect(typeCheck(null, Object)).toBe(true);
            expect(typeCheck({}, /reg/              )).toBe(true);
            expect(typeCheck({}, new Func()         )).toBe(true);
            expect(typeCheck({}, function any(){}   )).toBe(true);
            expect(typeCheck({}, Number             )).toBe(true);
            expect(typeCheck({}, Symbol             )).toBe(true);
            // false (예외)
            // expect(()=> typeValid(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> typeValid(Object, 'str'     )).toThrow('ES024');
            expect(()=> typeValid(Object, 1         )).toThrow('ES024');
            expect(()=> typeValid(Object, Symbol()  )).toThrow('ES024');
            expect(()=> typeValid(Object, true      )).toThrow('ES024');
            // expect(()=> typeValid(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> typeValid(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> typeValid(Object, null      )).toThrow('ES024');
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(typeCheck(Func1, new Func2()         )).toBe(true);
            expect(typeCheck(Func1, new Func1()         )).toBe(true);
            expect(typeCheck(Func1, { aa:10 }           )).toBe(true);
            expect(typeCheck(Func2, { aa:10 }           )).toBe(true);
            expect(typeCheck(Func3, { aa: new Date() }  )).toBe(true);
            // false (예외)
                // expect(()=> typeValid(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> typeValid(Func1, function any(){}   )).toThrow('ES032');
            expect(()=> typeValid(Func1, null               )).toThrow('ES032');
            expect(()=> typeValid(Func1, 'str'              )).toThrow('ES032');
            expect(()=> typeValid(Func1, /reg/              )).toThrow('ES031');
            expect(()=> typeValid(Func1, 1                  )).toThrow('ES032');
            expect(()=> typeValid(Func1, Symbol()           )).toThrow('ES032');
            expect(()=> typeValid(Func1, true               )).toThrow('ES032');
            expect(()=> typeValid(Func1, Number             )).toThrow('ES032');
            expect(()=> typeValid(Func1, Symbol             )).toThrow('ES032');
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(typeCheck([String, Number],          1           )).toBe(true);
            expect(typeCheck([String, Number],          'str'       )).toBe(true);
            expect(typeCheck([Boolean, Number],         true        )).toBe(true);
            expect(typeCheck([Boolean, null],           null        )).toBe(true);
            expect(typeCheck([Boolean, ['_any_']],      /reg/       )).toBe(true);       // any
            expect(typeCheck([Boolean, Object],         /reg/       )).toBe(true);     // objct 최상위
            expect(typeCheck([Boolean, RegExp],         /reg/       )).toBe(true);     // 내장 함수
            expect(typeCheck([Func1, Number],           new Func1() )).toBe(true);
            expect(typeCheck([[String, Func1], Number], new Func1() )).toBe(true);   // 복합 배열
            expect(typeCheck([[[Func1]], Number],       [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1]]  는 배열안에 함수를 의미함!
            // false (예외)
            expect(()=> typeValid([Array, String],          1               )).toThrow(/ES024.*ES024/);
            expect(()=> typeValid([Array],                  function any(){})).toThrow(/ES024/);
            expect(()=> typeValid([String],                 function any(){})).toThrow(/ES024/);
            expect(()=> typeValid([String, Number],         null            )).toThrow(/ES024.*ES024/);
            expect(()=> typeValid([Array, Number, Boolean], 'str'           )).toThrow(/ES024.*ES024.*ES024/);
        });
        it('- {obj:...} : and 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(typeCheck(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> typeValid(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> typeValid(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> typeValid(Symbol, null              )).toThrow('ES024');
            expect(()=> typeValid(Symbol, 'str'             )).toThrow('ES024');
            expect(()=> typeValid(Symbol, /reg/             )).toThrow('ES024');
            expect(()=> typeValid(Symbol, 1                 )).toThrow('ES024');
            expect(()=> typeValid(Symbol, true              )).toThrow('ES024');
            expect(()=> typeValid(Symbol, []                )).toThrow('ES024');
            expect(()=> typeValid(Symbol, {aa:1}            )).toThrow('ES024');
            expect(()=> typeValid(Symbol, Number            )).toThrow('ES024');
            expect(()=> typeValid(Symbol, Symbol            )).toThrow('ES024');
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(typeCheck(Date, new Date())).toBe(true);
            expect(typeCheck(new Date(), new Date())).toBe(true);
            // false
            expect(()=> typeValid(Date, function any(){}    )).toThrow('ES032');
            expect(()=> typeValid(Date, null                )).toThrow('ES032');
            expect(()=> typeValid(Date, true                )).toThrow('ES032');
            expect(()=> typeValid(Date, 1                   )).toThrow('ES032');
            expect(()=> typeValid(Date, 'str'               )).toThrow('ES032');
            expect(()=> typeValid(Date, []                  )).toThrow('ES032');
            expect(()=> typeValid(Date, {aa:1}              )).toThrow('ES032');
            expect(()=> typeValid(Date, Number              )).toThrow('ES032');
            expect(()=> typeValid(Date, /reg/               )).toThrow('ES032');
            expect(()=> typeValid(Date, Symbol()            )).toThrow('ES032');
            expect(()=> typeValid(Date, Symbol              )).toThrow('ES032');
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(typeCheck(RegExp, /reg/)).toBe(true);
            expect(typeCheck(/reg/, /target/)).toBe(true);
            // false
            expect(()=> typeValid(RegExp, function any(){}  )).toThrow('ES032');
            expect(()=> typeValid(RegExp, null              )).toThrow('ES032');
            expect(()=> typeValid(RegExp, true              )).toThrow('ES032');
            expect(()=> typeValid(RegExp, 1                 )).toThrow('ES032');
            expect(()=> typeValid(RegExp, 'str'             )).toThrow('ES032');
            expect(()=> typeValid(RegExp, []                )).toThrow('ES032');
            expect(()=> typeValid(RegExp, {aa:1}            )).toThrow('ES032');
            expect(()=> typeValid(RegExp, Number            )).toThrow('ES032');
            expect(()=> typeValid(RegExp, new Date()        )).toThrow('ES032');
            expect(()=> typeValid(RegExp, Symbol()          )).toThrow('ES032');
            expect(()=> typeValid(RegExp, Symbol            )).toThrow('ES032');
        });
    });
    
    
    

});
