/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {getTypeObject, allowType }  = require('../src/util-type');
const { checkType, validType }  = require('../src/util-type');
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
    describe('getTypeObject(type) : 타입 얻기 ', () => {
        it('- getTypeObject() : 자료형별 타입 얻기 ', () => {
            function User() {};             // object
            function Corp() {this.nm = 1};  // union
    
            // undefined
            expect(getTypeObject().name                ).toBe('undefined');
            // null
            expect(getTypeObject(null).name            ).toBe('null');
            // choice
            expect(getTypeObject([String]).name        ).toBe('choice');
            expect(getTypeObject([String, Number]).name).toBe('choice');
            // union
            expect(getTypeObject({fill:true}).name     ).toBe('union');
            expect(getTypeObject(new Corp).name        ).toBe('union');
            // array
            expect(getTypeObject([]).name              ).toBe('array');
            expect(getTypeObject(Array).name           ).toBe('array');
            expect(getTypeObject([[]]).name            ).toBe('array');
            expect(getTypeObject([['_seq_']]).name     ).toBe('array');
            expect(getTypeObject([['_opt_']]).name     ).toBe('array');
            expect(getTypeObject([['_any_']]).name     ).toBe('array');
            // object
            expect(getTypeObject(Object).name          ).toBe('object');
            expect(getTypeObject({}).name              ).toBe('object');
            expect(getTypeObject(new User).name        ).toBe('object');       // 빈객체
            expect(getTypeObject(/reg/).name           ).toBe('object');
            // function
            expect(getTypeObject(Function).name        ).toBe('function');
            // class
            expect(getTypeObject(User).name            ).toBe('class');
            expect(getTypeObject(Date).name            ).toBe('class');
            // number, NaN
            expect(getTypeObject(Number).name          ).toBe('number');
            expect(getTypeObject(1).name               ).toBe('number');
            expect(getTypeObject(NaN).name             ).toBe('number');
            expect(getTypeObject(2).default            ).toBe(2);
            // string
            expect(getTypeObject(String).name          ).toBe('string');
            expect(getTypeObject('str').name           ).toBe('string');
            expect(getTypeObject('str').default        ).toBe('str');
            // boolean
            expect(getTypeObject(Boolean).name         ).toBe('boolean');
            expect(getTypeObject(true).name            ).toBe('boolean');
            expect(getTypeObject(true).default         ).toBe(true);
            // Symbol   => new 생성이 안됨
            expect(getTypeObject(Symbol).name          ).toBe('symbol');  
            expect(getTypeObject(Symbol('a')).name     ).toBe('symbol');  // 존재하지 않는 타입
            // BigInt는 사용 안함
            expect(() => getTypeObject(2n ** 53n).name ).toThrow('ES022');
        });
    });

    describe('allowType(origin, target) : 타입간에 비교 ', () => {
        it('- allowType(a, b) : 원시 자료형 ', () => {
            // null
            expect(allowType(null,      null        )).toBe(T);
            expect(allowType(null,      undefined   )).toBe(false);
            // Number
            expect(allowType(Number,    Number      )).toBe(T);
            expect(allowType(Number,    10          )).toBe(T);
            expect(allowType(Number,    NaN         )).toBe(T);
            expect(allowType(Number,    String      )).toBe(false);
            expect(allowType(Number,    true        )).toBe(false);
            expect(allowType(NaN,       Number      )).toBe(false);
            expect(allowType(NaN,       NaN         )).toBe(false);
            expect(allowType(NaN,       10          )).toBe(false);
            expect(allowType(10,        10          )).toBe(T);
            expect(allowType(10,        20          )).toBe(false);
            expect(allowType(10,        Number      )).toBe(false);
            expect(allowType(10,        NaN         )).toBe(false);
            // String
            expect(allowType(String,    String      )).toBe(T);
            expect(allowType(String,    ''          )).toBe(T);
            expect(allowType(String,    10          )).toBe(false);
            expect(allowType(String,    Boolean     )).toBe(false);
            expect(allowType('str',     'str'       )).toBe(T);
            expect(allowType('str',     ''          )).toBe(false);
            expect(allowType('str',     String      )).toBe(false);
            // Boolean
            expect(allowType(Boolean,   Boolean     )).toBe(T);
            expect(allowType(Boolean,   false       )).toBe(T);
            expect(allowType(Boolean,   'str'       )).toBe(false);
            expect(allowType(true,      true        )).toBe(T);
            expect(allowType(true,      false       )).toBe(false);
            expect(allowType(true,      Boolean     )).toBe(false);
            // undefined
            expect(allowType(undefined, undefined   )).toBe(T);
            expect(allowType(undefined,             )).toBe(T);
            expect(allowType(undefined, null        )).toBe(false);
            // null
            expect(allowType(null,      null        )).toBe(T);
            expect(allowType(null,      undefined   )).toBe(false);
            expect(allowType(null,      {}          )).toBe(false);
            expect(allowType(null,      Object      )).toBe(false);
            // Symbol
            expect(allowType(Symbol,    Symbol      )).toBe(T);
            expect(allowType(Symbol,    Symbol()    )).toBe(T);
            expect(allowType(Symbol,    null        )).toBe(false);
            expect(allowType(Symbol,    Object      )).toBe(false);
            expect(allowType(Symbol(),  Symbol      )).toBe(T);
            expect(allowType(Symbol(),  Symbol()    )).toBe(T);
            expect(allowType(Symbol(),  null        )).toBe(false);
            expect(allowType(Symbol(),  Object      )).toBe(false);
        });
        it('- allowType(a, b) : array choice', () => {
            expect(allowType([],                          []                            )).toBe(T);
            expect(allowType([],                          Array                         )).toBe(T);
            expect(allowType([],                          [[]]                          )).toBe(T);
            expect(allowType([[]],                        []                            )).toBe(T);
            expect(allowType([[]],                        Array                         )).toBe(T);
            expect(allowType([[]],                        [[]]                          )).toBe(T);
            expect(allowType(Array,                       []                            )).toBe(T);
            expect(allowType(Array,                       Array                         )).toBe(T);
            expect(allowType(Array,                       [[]]                          )).toBe(T);
            expect(allowType([['_any_']],                 [[null]]                      )).toBe(T);
            expect(allowType([['_any_']],                 []                            )).toBe(false);
            expect(allowType([['_any_']],                 undefined                     )).toBe(false);
            expect(allowType([['_any_']],                 [[]]                          )).toBe(false);
            expect(allowType([['_any_', String]],         [['_any_', String]]           )).toBe(T);
            expect(allowType([['_any_', String]],         [[String]]                    )).toBe(T);
            expect(allowType([['_any_', String]],         [[Number]]                    )).toBe(T);
            expect(allowType([['_seq_']],                 [['_seq_']]                   )).toBe(T);
            expect(allowType([['_seq_']],                 [['_seq_', Boolean]]          )).toBe(T);
            expect(allowType([['_seq_']],                 [[]]                          )).toBe(false);
            expect(allowType([['_seq_', Number]],         [['_seq_', Number]]           )).toBe(T);
            expect(allowType([['_seq_', Number]],         [['_seq_', Number, String]]   )).toBe(T);
            expect(allowType([['_seq_', Number]],         [['_seq_']]                   )).toBe(false);
            expect(allowType([['_seq_', Number]],         [['_seq_', Boolean]]          )).toBe(false);
            expect(allowType([['_seq_', Number]],         [[Number]]                    )).toBe(false);
            expect(allowType([['_seq_', Number, String]], [['_seq_', Number, String]]   )).toBe(T);
            expect(allowType([['_seq_', Number, String]], [['_seq_', Number]]           )).toBe(false);
            expect(allowType([['_seq_', Number, String]], [[Number]]                    )).toBe(false);
            expect(allowType([['_opt_']],                 [['_opt_']]                   )).toBe(T);
            expect(allowType([['_opt_']],                 [['_opt_', String]]           )).toBe(T);
            expect(allowType([['_opt_']],                 [['_any_']]                   )).toBe(T);
            expect(allowType([['_opt_']],                 [[]]                          )).toBe(T);
            expect(allowType([['_opt_']],                 []                            )).toBe(T);
            expect(allowType([['_opt_']],                 [[String]]                    )).toBe(T);
            expect(allowType([['_opt_', String]],         [['_opt_', String]]           )).toBe(T);
            expect(allowType([['_opt_', String]],         [['_opt_', Number, String]]   )).toBe(false);
            expect(allowType([['_opt_', String]],         [['_opt_', Number]]           )).toBe(false);
            expect(allowType([['_opt_', String]],         [['_opt_']]                   )).toBe(false);
            expect(allowType([['_opt_', String]],         [['_any_']]                   )).toBe(false);
            expect(allowType([['_opt_', String]],         [[String]]                    )).toBe(T);
            expect(allowType([['_opt_', String]],         [[Number]]                    )).toBe(false);
            expect(allowType([['_opt_', String]],         [[undefined]]                 )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [['_opt_', Number, String]]   )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [['_opt_', String]]           )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [['_opt_', Number]]           )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [[String, Number]]            )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [[Number, String]]            )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [[Number, Boolean]]           )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [[Number, String, Boolean]]   )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [[Number]]                    )).toBe(T);
            expect(allowType([['_opt_', String, Number]], [[String]]                    )).toBe(T);            
            expect(allowType([['_opt_', String, Number]], [['_opt_']]                   )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [['_any_']]                   )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [[undefined]]                 )).toBe(false);
            expect(allowType([['_opt_', String, Number]], [['_opt_', Number, String, Boolean]])).toBe(false);
        });
        it('- allowType(a, b) : choice ', () => {
            expect(allowType([String, Number],          [Number]            )).toBe(T);
            expect(allowType(['_any_'],                 ['_any_']           )).toBe(T);
            expect(allowType(['_any_'],                 [Number]            )).toBe(T);
            expect(allowType(['_any_'],                 [null]              )).toBe(T);
            expect(allowType(['_any_'],                 [undefined]         )).toBe(T);
            expect(allowType(['_any_'],                 undefined           )).toBe(false);
            expect(allowType(['_any_'],                                     )).toBe(false);
            expect(allowType(['_seq_'],                 ['_seq_']           )).toBe(T);
            expect(allowType(['_seq_'],                 ['_seq_', String]   )).toBe(false);
            expect(allowType(['_seq_'],                 ['_seq_', Number]   )).toBe(false);
            expect(allowType(['_seq_', Number],         ['_seq_', Number]           )).toBe(T); // 같은 경우만 True
            expect(allowType(['_seq_', Number],         ['_seq_', Number, String]   )).toBe(false);
            expect(allowType(['_seq_', Number],         ['_seq_']                   )).toBe(false);
            expect(allowType(['_seq_', Number],         ['_seq_', Boolean]          )).toBe(false);
            expect(allowType(['_seq_', Number],         [Number]                    )).toBe(false);
            expect(allowType(['_seq_', Number, String], ['_seq_', Number, String]   )).toBe(T); // 같은 경우만 True
            expect(allowType(['_seq_', Number, String], ['_seq_', Number]           )).toBe(false);
            expect(allowType(['_seq_', Number, String], [Number]                    )).toBe(false);
            expect(allowType(['_opt_'],                 ['_opt_']           )).toBe(T);
            expect(allowType(['_opt_'],                 ['_opt_', String]   )).toBe(T);
            expect(allowType(['_opt_'],                 ['_any_']           )).toBe(T);
            expect(allowType(['_opt_'],                 undefined           )).toBe(T);
            expect(allowType(['_opt_'],                 [String]                    )).toBe(T);
            expect(allowType(['_opt_', String],         ['_opt_', String]           )).toBe(T);
            expect(allowType(['_opt_', String],         ['_opt_', Number, String]   )).toBe(false);
            expect(allowType(['_opt_', String],         ['_opt_', Number]           )).toBe(false);
            expect(allowType(['_opt_', String],         ['_opt_']                   )).toBe(false);
            expect(allowType(['_opt_', String],         ['_any_']                   )).toBe(false);
            expect(allowType(['_opt_', String],         [String]                    )).toBe(T);
            expect(allowType(['_opt_', String],         [Number]                    )).toBe(false);
            expect(allowType(['_opt_', String],         undefined                   )).toBe(false);
            expect(allowType(['_opt_', String, Number], ['_opt_', String, Number]   )).toBe(T);
            expect(allowType(['_opt_', String, Number], ['_opt_', Number]           )).toBe(T);
            expect(allowType(['_opt_', String, Number], ['_opt_', String]           )).toBe(T);
            expect(allowType(['_opt_', String, Number], [String, Number]            )).toBe(T);
            expect(allowType(['_opt_', String, Number], [Number, String]            )).toBe(T);
            expect(allowType(['_opt_', String, Number], [String, Boolean]           )).toBe(false);
            expect(allowType(['_opt_', String, Number], [Number, String, Boolean]   )).toBe(false);
            expect(allowType(['_opt_', String, Number], [Number]                    )).toBe(T);
            expect(allowType(['_opt_', String, Number], [String]                    )).toBe(T);
            expect(allowType(['_opt_', String, Number], ['_opt_']                   )).toBe(false);
            expect(allowType(['_opt_', String, Number], ['_any_']                   )).toBe(false);
            expect(allowType(['_opt_', String, Number], undefined                   )).toBe(false);
            expect(allowType(['_opt_', String, Number], ['_opt_', String, Boolean, Number])).toBe(false);
        });
        it('- allowType(a, b) : function, 함수 파싱 ', () => {
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

            expect(allowType(type1, type1_1)).toBe(true);
            expect(allowType(type1, type1_2)).toBe(true);
            expect(allowType(type1, type1_3)).toBe(true);
            expect(allowType(type1, type1_4)).toBe(true);
            expect(allowType(type1, type1_5)).toBe(true);
            expect(allowType(type2, type2_1)).toBe(true);
            expect(allowType(type2, type2_2)).toBe(true);
            expect(allowType(type2, type2_3)).toBe(true);
            expect(allowType(type3, type3_1)).toBe(true);
            expect(allowType(type3, type3_2)).toBe(true);
            expect(allowType(type3, type3_3)).toBe(true);
            expect(allowType(type3, type3_4)).toBe(true);
            expect(allowType(type3, type3_5)).toBe(true);
            expect(allowType(type4, type4_1)).toBe(true);
            expect(allowType(type4, type4_2)).toBe(true);
            expect(allowType(type4, type4_3)).toBe(true);
            expect(allowType(type4, type4_4)).toBe(true);
            expect(allowType(type4, type4_5)).toBe(true);
        });
        it('- allowType(a, b) : object ', () => {
            var ClassA = function(){};
            var ClassB = function(){this.aa = 1};

            expect(allowType(Object,    Object          )).toBe(T);
            expect(allowType(Object,    {}              )).toBe(T);
            expect(allowType(/reg/,     /reg/           )).toBe(T);
            expect(allowType(/reg/,     /reg2/          )).toBe(false);
            expect(allowType({},        new ClassA()    )).toBe(T);
            expect(allowType({},        new ClassB()    )).toBe(false);
        });
        it('- allowType(a, b) : class ', () => {
            var ClassA = function(){this.a = 1}
            var ClassB = function(){this.a = 10}
            var ClassC = function(){this.b = 10}
            var ClassD = function(){this.b = 10}

            expect(allowType(ClassA,    ClassA)).toBe(T);
            expect(allowType(ClassA,    ClassB)).toBe(false);
            expect(allowType(ClassA,    ClassC)).toBe(false);
            expect(allowType(ClassC,    ClassD)).toBe(T);
            expect(allowType(String,    String)).toBe(T);

        });
        it('- allowType(a, b) : union (기본) ', () => {
            var type1      = {str: String, num: Number};

            expect(allowType(type1,    {str: String, num: Number}  )).toBe(true);
            expect(allowType(type1,    {str: '', num: 0}           )).toBe(true);
            expect(allowType(type1,    {str: ''}                   )).toBe(false);
        });
        it('- allowType(a, b) : union (choice) ', () => {
            var type1   = {str: [String, Number], bool: ['_any_'], num: ['_opt_', Number]};

            expect(allowType(type1, {str: String, bool: null, num: Number}          )).toBe(T);
            expect(allowType(type1, {str: '', bool: true, num: ['_opt_', Number]}   )).toBe(T);
            expect(allowType(type1, {str: '', bool: null, num: ['_opt_', String]}   )).toBe(false);
            expect(allowType(type1, {str: String, bool: false, num: String}         )).toBe(false);
            expect(allowType(type1, {str: String}                                   )).toBe(false);
        });
    });
    describe('checkType(type, target)', () => {
        it('- checkType() : 일반 ', () => {
            // _any_
            expect(checkType(['_any_'],         10          )).toBe(T);
            expect(checkType(['_any_'],         'str'       )).toBe(T);
            expect(checkType(['_any_'],         []          )).toBe(T);
            expect(checkType(['_any_'],         {}          )).toBe(T);
            expect(checkType(['_any_'],         true        )).toBe(T);
            expect(checkType(['_any_'],         undefined   )).toBe(false);
            // _seq_
            expect(checkType(['_seq_'],                 [1,2,3]     )).toBe(false);
            expect(checkType(['_seq_'],                 10          )).toBe(false);
            expect(checkType(['_seq_', String, Number], [1,2,3]     )).toBe(false);
            expect(checkType(['_seq_', String, Number], 10          )).toBe(false);
            // _opt_
            expect(checkType(['_opt_'],                 ['str', 10] )).toBe(T);
            expect(checkType(['_opt_'],                 [10, 'str'] )).toBe(T);
            expect(checkType(['_opt_'],                 ['str']     )).toBe(T);
            expect(checkType(['_opt_'],                 10          )).toBe(T);
            expect(checkType(['_opt_'],                 ['str', 10, true])).toBe(T);
            expect(checkType(['_opt_', String, Number], 10          )).toBe(T);
            expect(checkType(['_opt_', String, Number], 'str'       )).toBe(T);
            expect(checkType(['_opt_', String, Number], undefined   )).toBe(T);
            expect(checkType(['_opt_', String, Number], true        )).toBe(false);
            expect(checkType(['_opt_', String, Number], []          )).toBe(false);
            expect(checkType(['_opt_', String, Number], {}          )).toBe(false);
            // choice
            expect(checkType([String, Number],  10          )).toBe(T);
            expect(checkType([String, Number],  'str'       )).toBe(T);
            expect(checkType([String, Number],  undefined   )).toBe(false);
            expect(checkType([String, Number],  true        )).toBe(false);
            expect(checkType([String, Number],  []          )).toBe(false);
            expect(checkType([String, Number],  {}          )).toBe(false);
        });
        it('- checkType() : object ', () => {
            var Class1 = function() { this.aa = String }
            var Class2 = function() { this.bb = Number }
    
            expect(checkType([Class1, Class2],   {aa: 'STR', bb: 10}     )).toBe(T);
            expect(checkType(Class1,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(checkType(Class2,             {aa: 'STR', bb: 10}     )).toBe(T);
            expect(checkType([Class1, Class2],   {aa: 'STR'}             )).toBe(T);
            expect(checkType(Class1,             {aa: 'STR'}             )).toBe(T);
            expect(checkType(Class2,             {aa: 'STR'}             )).toBe(false);
            expect(checkType([Class1, Class2],   {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(checkType(Class1,             {aa: 'STR', bb: 'STR'}  )).toBe(T);
            expect(checkType(Class2,             {aa: 'STR', bb: 'STR'}  )).toBe(false);
            expect(checkType([Class1, Class2],   {cc: 'STR'}             )).toBe(false);
            expect(checkType(Class1,             {cc: 'STR'}             )).toBe(false);
            expect(checkType(Class2,             {cc: 'STR'}             )).toBe(false);
        });
        it('- checkType() : object (객체 기본값) ', () => {
            var Class1 = function() { this.aa = String };
            var Class2 = function() { this.bb = 10 };

            expect(checkType([Class1, Class2],  {aa: 'str', bb: 2}  )).toBe(T);
            expect(checkType(Class1,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(checkType(Class2,            {aa: 'str', bb: 2}  )).toBe(T);
            expect(checkType([Class1, Class2],  {aa: 'str'}         )).toBe(T);
            expect(checkType(Class1,            {aa: 'str'}         )).toBe(T);
            expect(checkType(Class2,            {aa: 'str'}         )).toBe(T);
            expect(checkType([Class1, Class2],  {bb: 5}             )).toBe(T);
            expect(checkType(Class1,            {bb: 5}             )).toBe(false);
            expect(checkType(Class2,            {bb: 5}             )).toBe(T);
            expect(checkType([Class1, Class2],  {cc: 'STR'}         )).toBe(T);
            expect(checkType(Class1,            {cc: 'STR'}         )).toBe(false);
            expect(checkType(Class2,            {cc: 'STR'}         )).toBe(T);
            expect(checkType([Class1, Class2],  {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(checkType(Class1,            {aa: 'STR', bb: 'STR'})).toBe(T);
            expect(checkType(Class2,            {aa: 'STR', bb: 'STR'})).toBe(false);
        });
        it('- checkType() : object (원시 객체 기본값) ', () => {
            expect(checkType(/reg2/,        /reg/       )).toBe(T);
            expect(checkType(new Date(),    new Date()  )).toBe(T);
            expect(checkType(Symbol(),      Symbol()    )).toBe(T);
            expect(checkType({},            /reg/       )).toBe(T);
            expect(checkType({},            new Date()  )).toBe(T);
            expect(checkType({},            Symbol()    )).toBe(false);
        });
        it('- checkType() : 원시 타입 ', () => {
            expect(checkType([Number, String, Boolean], 1           )).toBe(T);
            expect(checkType([Number, String, Boolean], 'str'       )).toBe(T);
            expect(checkType([Number, String, Boolean], true        )).toBe(T);            
            expect(checkType([Number, String, Boolean], new Date()  )).toBe(false);
            expect(checkType([Number, String, Boolean], /reg/       )).toBe(false);
            expect(checkType([Number, String, Boolean], Symbol()    )).toBe(false);
            expect(checkType([Number, String, Boolean], []          )).toBe(false);
            expect(checkType([Number, String, Boolean], {}          )).toBe(false);
        });
        it('- checkType() : 내장 객체 타입 ', () => {
            expect(checkType([RegExp, Date, Symbol], new Date() )).toBe(T);
            expect(checkType([RegExp, Date, Symbol], /reg/      )).toBe(T);
            expect(checkType([RegExp, Date, Symbol], Symbol()   )).toBe(T);            
            expect(checkType([RegExp, Date, Symbol], 1          )).toBe(false);
            expect(checkType([RegExp, Date, Symbol], true       )).toBe(false);
            expect(checkType([RegExp, Date, Symbol], 'str'      )).toBe(false);       
            expect(checkType([RegExp, Date, Symbol], []         )).toBe(false);       
            expect(checkType([RegExp, Date, Symbol], {}         )).toBe(false);       
        });
        it('- checkType() : 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            
            expect(checkType([Super, Sub],  new Sub())).toBe(T);
            expect(checkType(Super,         new Sub())).toBe(T);
            expect(checkType(Sub,           new Sub())).toBe(T);
            expect(checkType(Object,        new Sub())).toBe(T);       
        });
        it('- checkType() : 배열,  choice 조건 검사  ', () => {
            // array
            expect(checkType([],            [1,2,3]     )).toBe(true);
            expect(checkType([],            10          )).toBe(false);
            expect(checkType(Array,         [1,2,3]     )).toBe(true);
            expect(checkType(Array,         10          )).toBe(false);
            expect(checkType([[]],          [1,2,3]     )).toBe(true);
            expect(checkType([[]],          10          )).toBe(false);
            // _any_
            expect(checkType([['_any_']],   [1, 'str']  )).toBe(true);
            expect(checkType([['_any_']],   [0]         )).toBe(true);
            expect(checkType([['_any_']],   []          )).toBe(true);
            expect(checkType([['_any_']],   [undefined] )).toBe(false);
            expect(checkType([['_any_']],   10          )).toBe(false);
            // _seq_
            expect(checkType([['_seq_']], ['str', 10]       )).toBe(true);
            expect(checkType([['_seq_']], ['str', 10, true] )).toBe(true);
            expect(checkType([['_seq_']], [10, 'str']       )).toBe(true);
            expect(checkType([['_seq_']], ['str']           )).toBe(true);
            expect(checkType([['_seq_']], 10                )).toBe(false);
            expect(checkType([['_seq_', String, Number]], ['str', 10]       )).toBe(true);
            expect(checkType([['_seq_', String, Number]], ['str', 10, true] )).toBe(true);
            expect(checkType([['_seq_', String, Number]], [10, 'str']       )).toBe(false);
            expect(checkType([['_seq_', String, Number]], ['str']           )).toBe(false);
            expect(checkType([['_seq_', String, Number]], 10                )).toBe(false);
            // _opt_
            expect(checkType([['_opt_']], ['str', 10]       )).toBe(true);
            expect(checkType([['_opt_']], [10]              )).toBe(true);
            expect(checkType([['_opt_']], ['str']           )).toBe(true);
            expect(checkType([['_opt_']], [true]            )).toBe(true);
            expect(checkType([['_opt_']], [{}]              )).toBe(true);
            expect(checkType([['_opt_']], []                )).toBe(true);
            expect(checkType([['_opt_']], 10                )).toBe(false);
            expect(checkType([['_opt_', String, Number]], ['str', 10])).toBe(true);
            expect(checkType([['_opt_', String, Number]], [10]      )).toBe(true);
            expect(checkType([['_opt_', String, Number]], []        )).toBe(true);
            expect(checkType([['_opt_', String, Number]], ['str']   )).toBe(true);
            expect(checkType([['_opt_', String, Number]], [true]    )).toBe(false);
            expect(checkType([['_opt_', String, Number]], [{}]      )).toBe(false);
            expect(checkType([['_opt_', String, Number]], 10        )).toBe(false);
            // choice
            expect(checkType([[String, Number]], ['str', 10]    )).toBe(true);
            expect(checkType([[String, Number]], [10]           )).toBe(true);
            expect(checkType([[String, Number]], ['str']        )).toBe(true);
            expect(checkType([[String, Number]], []             )).toBe(false);
            expect(checkType([[String, Number]], [true]         )).toBe(false);
            expect(checkType([[String, Number]], [{}]           )).toBe(false);
            expect(checkType([[String, Number]], 10             )).toBe(false);
        });
        it('- checkType() : function (선언 타입 검사) ', () => {
            var type1 = function(){};
            var type2 = function(String, Number){Object};
            var tar1  = function(){}; 
            var tar2  = function(){}; 
            var tar3  = function(){}; 
            tar2._TYPE = {args: [String, Number], return: [Object]}
            tar3._TYPE = {args: [], return: [Object, String]}

            expect(checkType(type1, tar1)).toBe(T);
            expect(checkType(type1, tar2)).toBe(T);
            expect(checkType(type1, tar3)).toBe(T);
            expect(checkType(type2, tar1)).toBe(false);
            expect(checkType(type2, tar2)).toBe(T);
            expect(checkType(type2, tar3)).toBe(false);
        });
        
        it('- checkType() : choice [_any_] (모두 true) ', () => {
            // 단독 검사
            expect(checkType(['_any_'], function any(){}    )).toBe(true);
            expect(checkType(['_any_'], function any(){}    )).toBe(true);
            expect(checkType(['_any_'], null                )).toBe(true);
            expect(checkType(['_any_'], 1                   )).toBe(true);
            expect(checkType(['_any_'], NaN                 )).toBe(true);
            expect(checkType(['_any_'], 'str'               )).toBe(true);
            expect(checkType(['_any_'], true                )).toBe(true);
            expect(checkType(['_any_'], /reg/               )).toBe(true);
            expect(checkType(['_any_'], Symbol()            )).toBe(true);
            expect(checkType(['_any_'], []                  )).toBe(true);
            expect(checkType(['_any_'], {aa: 1}             )).toBe(true);
            expect(checkType(['_any_'], Number              )).toBe(true);
            expect(checkType(['_any_'], String              )).toBe(true);
            expect(checkType(['_any_'], Function            )).toBe(true);
            expect(checkType(['_any_'], Object              )).toBe(true);
            expect(checkType(['_any_'], Symbol              )).toBe(true);
            // or 검사
            expect(checkType([String, ['_any_']], function any() {})).toBe(true);
            expect(checkType(String, function any() {}, null)).toBe(false); // args 전달 안받음 배열로만 받음
            // TODO: 넘치면 오류 또는 경고 처리해야 오류를 낮출듯
            // and 검사
            // expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            // expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            // expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(checkType(undefined, null)).toBe(false);
            expect(checkType(null, null)).toBe(true);
        });
        it('- checkType() : 타입이 없는 경우 ', () => {
            expect(checkType(1)).toBe(true);
            // expect(checkUnionType(1)).toBe(false);
            // expect(()=> validType(1)).toThrow('ES026');
            // expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- 커버리지 : 일반 ', () => {
            expect(checkType(['default'], 'str')).toBe(true);   // 기본값 의미
            expect(checkType(['default'], ['str'])).toBe(false); 
        });

    });
    describe('validType() : 타입 검사, 실패시 예외 ', () => {
        it('- 예외 : validType(), validUnionType()  ', () => {
            expect(() => validType(undefined, {})).toThrow(/ES026/);
        });
        it('- validType() : function (외부 참조형 타입 비교) ', () => {
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

            expect(()=> validType(type1, tar1)).toThrow(/arg1/);    // func 내부 참조변수 오류
            expect(validType(type2, tar1)).toBe(true);
            expect(validType(type3, tar1)).toBe(true);
            expect(validType(type4, tar2)).toBe(true);
            
            // TODO: 확인해야함
            // expect(validType(type3, tar1)).toBe(false);  
            // expect(validType(type3, tar2)).toBe(true);

        });
    });

    describe('checkType() VS validType() : 비교 ', () => {
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(checkType(1,         0   )).toBe(T);
            expect(checkType(Number,    0   )).toBe(T);
            expect(checkType(NaN,       0   )).toBe(T);
            expect(checkType(NaN,       NaN )).toBe(T);
            // false (예외)
            expect(()=> validType(1,        function any(){}    )).toThrow('ES024');
            expect(()=> validType(NaN,      function any(){}    )).toThrow('ES024');
            expect(()=> validType(Number,   function any(){}    )).toThrow('ES024');
            expect(()=> validType(Number,   null                )).toThrow('ES024');
            expect(()=> validType(Number,   true                )).toThrow('ES024');
            expect(()=> validType(Number,   /reg/               )).toThrow('ES024');
            expect(()=> validType(Number,   'str'               )).toThrow('ES024');
            expect(()=> validType(Number,   Symbol()            )).toThrow('ES024');
            expect(()=> validType(Number,   []                  )).toThrow('ES024');
            expect(()=> validType(Number,   {aa:1}              )).toThrow('ES024');
            expect(()=> validType(Number,   Symbol              )).toThrow('ES024');
            expect(()=> validType(Number,                       )).toThrow('ES024');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(checkType('str',     ''  )).toBe(true);
            expect(checkType(String,    ''  )).toBe(true);
            // false (예외)
            expect(()=> validType('str',    function any(){}    )).toThrow('ES024');
            expect(()=> validType(String,   function any(){}    )).toThrow('ES024');
            expect(()=> validType(String,   null                )).toThrow('ES024');
            expect(()=> validType(String,   true                )).toThrow('ES024');
            expect(()=> validType(String,   /reg/               )).toThrow('ES024');
            expect(()=> validType(String,   1                   )).toThrow('ES024');
            expect(()=> validType(String,   Symbol()            )).toThrow('ES024');
            expect(()=> validType(String,   []                  )).toThrow('ES024');
            expect(()=> validType(String,   {aa:1}              )).toThrow('ES024');
            expect(()=> validType(String,   Number              )).toThrow('ES024');
            expect(()=> validType(String,   Symbol              )).toThrow('ES024');
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(checkType(true,      false   )).toBe(true);
            expect(checkType(Boolean,   false   )).toBe(true);
            // false (예외)
            expect(()=> validType(true,     function any(){}    )).toThrow('ES024');
            expect(()=> validType(Boolean,  function any(){}    )).toThrow('ES024');
            expect(()=> validType(Boolean,  null                )).toThrow('ES024');
            expect(()=> validType(Boolean,  'str'               )).toThrow('ES024');
            expect(()=> validType(Boolean,  /reg/               )).toThrow('ES024');
            expect(()=> validType(Boolean,  1                   )).toThrow('ES024');
            expect(()=> validType(Boolean,  Symbol()            )).toThrow('ES024');
            expect(()=> validType(Boolean,  []                  )).toThrow('ES024');
            expect(()=> validType(Boolean,  {aa:1}              )).toThrow('ES024');
            expect(()=> validType(Boolean,  Number              )).toThrow('ES024');
            expect(()=> validType(Boolean,  Symbol              )).toThrow('ES024');
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(checkType(Array,     []      )).toBe(true);
            expect(checkType([],        [false] )).toBe(true);
            expect(checkType([[]],      Array   )).toBe(true);
            // false (예외)
            expect(()=> validType(Array, function any(){}       )).toThrow('ES024');
            expect(()=> validType(Array, function any(){}, []   )).toThrow('ES024');
            expect(()=> validType(Array, null                   )).toThrow('ES024');
            expect(()=> validType(Array, 'str'                  )).toThrow('ES024');
            expect(()=> validType(Array, /reg/                  )).toThrow('ES024');
            expect(()=> validType(Array, 1                      )).toThrow('ES024');
            expect(()=> validType(Array, Symbol()               )).toThrow('ES024');
            expect(()=> validType(Array, true                   )).toThrow('ES024');
            expect(()=> validType(Array, {aa:1}                 )).toThrow('ES024');
            expect(()=> validType(Array, Number                 )).toThrow('ES024');
            expect(()=> validType(Array, Symbol                 )).toThrow('ES024');
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(checkType(Function, function any(){})).toBe(true);
            // false (예외)
            expect(()=> validType(Function, []          )).toThrow('ES024');
            expect(()=> validType(Function, null        )).toThrow('ES024');
            expect(()=> validType(Function, 'str'       )).toThrow('ES024');
            expect(()=> validType(Function, /reg/       )).toThrow('ES024');
            expect(()=> validType(Function, 1           )).toThrow('ES024');
            expect(()=> validType(Function, Symbol()    )).toThrow('ES024');
            expect(()=> validType(Function, true        )).toThrow('ES024');
            expect(()=> validType(Function, {aa:1}      )).toThrow('ES024');
        });
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(checkType({}, Object             )).toBe(true);
            // expect(checkType(null, Object)).toBe(true);
            expect(checkType({}, /reg/              )).toBe(true);
            expect(checkType({}, new Func()         )).toBe(true);
            expect(checkType({}, function any(){}   )).toBe(true);
            expect(checkType({}, Number             )).toBe(true);
            expect(checkType({}, Symbol             )).toBe(true);
            // false (예외)
            // expect(()=> validType(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> validType(Object, 'str'     )).toThrow('ES024');
            expect(()=> validType(Object, 1         )).toThrow('ES024');
            expect(()=> validType(Object, Symbol()  )).toThrow('ES024');
            expect(()=> validType(Object, true      )).toThrow('ES024');
            // expect(()=> validType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> validType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> validType(Object, null      )).toThrow('ES024');
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(checkType(Func1, new Func2()         )).toBe(true);
            expect(checkType(Func1, new Func1()         )).toBe(true);
            expect(checkType(Func1, { aa:10 }           )).toBe(true);
            expect(checkType(Func2, { aa:10 }           )).toBe(true);
            expect(checkType(Func3, { aa: new Date() }  )).toBe(true);
            // false (예외)
                // expect(()=> validType(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> validType(Func1, function any(){}   )).toThrow('ES032');
            expect(()=> validType(Func1, null               )).toThrow('ES032');
            expect(()=> validType(Func1, 'str'              )).toThrow('ES032');
            expect(()=> validType(Func1, /reg/              )).toThrow('ES031');
            expect(()=> validType(Func1, 1                  )).toThrow('ES032');
            expect(()=> validType(Func1, Symbol()           )).toThrow('ES032');
            expect(()=> validType(Func1, true               )).toThrow('ES032');
            expect(()=> validType(Func1, Number             )).toThrow('ES032');
            expect(()=> validType(Func1, Symbol             )).toThrow('ES032');
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(checkType([String, Number],          1           )).toBe(true);
            expect(checkType([String, Number],          'str'       )).toBe(true);
            expect(checkType([Boolean, Number],         true        )).toBe(true);
            expect(checkType([Boolean, null],           null        )).toBe(true);
            expect(checkType([Boolean, ['_any_']],      /reg/       )).toBe(true);       // any
            expect(checkType([Boolean, Object],         /reg/       )).toBe(true);     // objct 최상위
            expect(checkType([Boolean, RegExp],         /reg/       )).toBe(true);     // 내장 함수
            expect(checkType([Func1, Number],           new Func1() )).toBe(true);
            expect(checkType([[String, Func1], Number], new Func1() )).toBe(true);   // 복합 배열
            expect(checkType([[[Func1]], Number],       [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1]]  는 배열안에 함수를 의미함!
            // false (예외)
            expect(()=> validType([Array, String],          1               )).toThrow(/ES024.*ES024/);
            expect(()=> validType([Array],                  function any(){})).toThrow(/ES024/);
            expect(()=> validType([String],                 function any(){})).toThrow(/ES024/);
            expect(()=> validType([String, Number],         null            )).toThrow(/ES024.*ES024/);
            expect(()=> validType([Array, Number, Boolean], 'str'           )).toThrow(/ES024.*ES024.*ES024/);
        });
        it('- {obj:...} : and 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(checkType(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> validType(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> validType(Symbol, function any(){}  )).toThrow('ES024');
            expect(()=> validType(Symbol, null              )).toThrow('ES024');
            expect(()=> validType(Symbol, 'str'             )).toThrow('ES024');
            expect(()=> validType(Symbol, /reg/             )).toThrow('ES024');
            expect(()=> validType(Symbol, 1                 )).toThrow('ES024');
            expect(()=> validType(Symbol, true              )).toThrow('ES024');
            expect(()=> validType(Symbol, []                )).toThrow('ES024');
            expect(()=> validType(Symbol, {aa:1}            )).toThrow('ES024');
            expect(()=> validType(Symbol, Number            )).toThrow('ES024');
            expect(()=> validType(Symbol, Symbol            )).toThrow('ES024');
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(checkType(Date, new Date())).toBe(true);
            expect(checkType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> validType(Date, function any(){}    )).toThrow('ES032');
            expect(()=> validType(Date, null                )).toThrow('ES032');
            expect(()=> validType(Date, true                )).toThrow('ES032');
            expect(()=> validType(Date, 1                   )).toThrow('ES032');
            expect(()=> validType(Date, 'str'               )).toThrow('ES032');
            expect(()=> validType(Date, []                  )).toThrow('ES032');
            expect(()=> validType(Date, {aa:1}              )).toThrow('ES032');
            expect(()=> validType(Date, Number              )).toThrow('ES032');
            expect(()=> validType(Date, /reg/               )).toThrow('ES032');
            expect(()=> validType(Date, Symbol()            )).toThrow('ES032');
            expect(()=> validType(Date, Symbol              )).toThrow('ES032');
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(checkType(RegExp, /reg/)).toBe(true);
            expect(checkType(/reg/, /target/)).toBe(true);
            // false
            expect(()=> validType(RegExp, function any(){}  )).toThrow('ES032');
            expect(()=> validType(RegExp, null              )).toThrow('ES032');
            expect(()=> validType(RegExp, true              )).toThrow('ES032');
            expect(()=> validType(RegExp, 1                 )).toThrow('ES032');
            expect(()=> validType(RegExp, 'str'             )).toThrow('ES032');
            expect(()=> validType(RegExp, []                )).toThrow('ES032');
            expect(()=> validType(RegExp, {aa:1}            )).toThrow('ES032');
            expect(()=> validType(RegExp, Number            )).toThrow('ES032');
            expect(()=> validType(RegExp, new Date()        )).toThrow('ES032');
            expect(()=> validType(RegExp, Symbol()          )).toThrow('ES032');
            expect(()=> validType(RegExp, Symbol            )).toThrow('ES032');
        });
    });
    
    
    

});
