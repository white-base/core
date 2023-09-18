/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const { getAllProperties, getTypeMap, checkType }       = require('../src/util-type');
const { checkUnionType, validType, validUnionType }     = require('../src/util-type');

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        // global.console.warn = jest.fn();
    });
    describe('< 기본 >', () => {
        it('- getTypeMap() ', () => {
            function User() {};
            function Corp() {this.nm = 1};
    
            // null, undefined
            expect(getTypeMap().name).toBe('undefined');
            expect(getTypeMap(null).name).toBe('any');
            // or, and
            expect(getTypeMap([String]).name).toBe('or');
            expect(getTypeMap([String, Number]).name).toBe('or');
            expect(getTypeMap({fill:true}).name).toBe('and');
            expect(getTypeMap(new Corp).name).toBe('and');
            // array
            expect(getTypeMap([]).name).toBe('array');
            expect(getTypeMap(Array).name).toBe('array');
            // object
            expect(getTypeMap(Object).name).toBe('object');
            expect(getTypeMap({}).name).toBe('object');
            expect(getTypeMap(new User).name).toBe('object');
            expect(getTypeMap(/reg/).name).toBe('object');
            // function
            expect(getTypeMap(Function).name).toBe('function');
            // class
            expect(getTypeMap(User).name).toBe('class');
            expect(getTypeMap(Date).name).toBe('class');    // Data
            // number, NaN
            expect(getTypeMap(Number).name).toBe('number');
            expect(getTypeMap(1).name).toBe('number');
            expect(getTypeMap(NaN).name).toBe('number');
            expect(getTypeMap(2).default).toBe(2);
            // string
            expect(getTypeMap(String).name).toBe('string');
            expect(getTypeMap('str').name).toBe('string');
            expect(getTypeMap('str').default).toBe('str');
            // boolean
            expect(getTypeMap(Boolean).name).toBe('boolean');
            expect(getTypeMap(true).name).toBe('boolean');
            expect(getTypeMap(true).default).toBe(true);
            // Symbol   => new 생성이 안됨
            expect(getTypeMap(Symbol).name).toBe('symbol');  
            expect(getTypeMap(Symbol('a')).name).toBe('symbol');  // 존재하지 않는 타입
            // BigInt는 사용 안함
            expect(() => getTypeMap(2n ** 53n).name).toThrow('ES022');
        });
        it('- 예외 : validType(), validUnionType()  ', () => {
            expect(() => validType({}, undefined)).toThrow(/ES022/);
            expect(() => validUnionType({}, undefined, Object)).toThrow(/ES022/);
        });
    });
    describe('< 비교 >', () => {
        it('- checkType() vs validType() 비교', () => {
            const Func1 = function() { this.aa = 1 };   // 기본값으로 설정
            const compare = {
                // 원시 타입
                p0: {target: null, type: null },
                p1: {target: NaN, type: Number },
                p2: {target: 1, type: Number },
                p3: {target: 'str', type: String },
                p4: {target: true, type: Boolean },
                p5: {target: 1, type: 1 },
                p6: {target: 'str', type: '' },
                p7: {target: true, type: false },
                // 참조 타입
                r1: {target: function any(){}, type: Function },
                r2: {target: {aa: 1}, type: Object },
                r3: {target: [], type: Array },
                // 객체 타입
                o1: {target: /reg/, type: RegExp },
                o2: {target: Symbol(), type: Symbol },
                o3: {target: new Date(), type: Date },
                o4: {target: new Func1(), type: Func1 },
            };
            // checkType()
            expect(checkType(compare.p0.target, compare.p0.type)).toBe(true);
            expect(checkType(compare.p1.target, compare.p1.type)).toBe(true);
            expect(checkType(compare.p2.target, compare.p2.type)).toBe(true);
            expect(checkType(compare.p3.target, compare.p3.type)).toBe(true);
            expect(checkType(compare.p4.target, compare.p4.type)).toBe(true);
            expect(checkType(compare.p5.target, compare.p5.type)).toBe(true);
            expect(checkType(compare.p6.target, compare.p6.type)).toBe(true);
            expect(checkType(compare.p7.target, compare.p7.type)).toBe(true);
            expect(checkType(compare.r1.target, compare.r1.type)).toBe(true);
            expect(checkType(compare.r2.target, compare.r2.type)).toBe(true);
            expect(checkType(compare.r3.target, compare.r3.type)).toBe(true);
            expect(checkType(compare.o1.target, compare.o1.type)).toBe(true);
            expect(checkType(compare.o2.target, compare.o2.type)).toBe(true);
            expect(checkType(compare.o3.target, compare.o3.type)).toBe(true);
            expect(checkType(compare.o4.target, compare.o4.type)).toBe(true);
            // validType()
            expect(validType(compare.p0.target, compare.p0.type)).toBe(true);
            expect(validType(compare.p1.target, compare.p1.type)).toBe(true);
            expect(validType(compare.p2.target, compare.p2.type)).toBe(true);
            expect(validType(compare.p3.target, compare.p3.type)).toBe(true);
            expect(validType(compare.p4.target, compare.p4.type)).toBe(true);
            expect(validType(compare.p5.target, compare.p5.type)).toBe(true);
            expect(validType(compare.p6.target, compare.p6.type)).toBe(true);
            expect(validType(compare.p7.target, compare.p7.type)).toBe(true);
            expect(validType(compare.r1.target, compare.r1.type)).toBe(true);
            expect(validType(compare.r2.target, compare.r2.type)).toBe(true);
            expect(validType(compare.r3.target, compare.r3.type)).toBe(true);
            expect(validType(compare.o1.target, compare.o1.type)).toBe(true);
            expect(validType(compare.o2.target, compare.o2.type)).toBe(true);
            expect(validType(compare.o3.target, compare.o3.type)).toBe(true);
            expect(validType(compare.o4.target, compare.o4.type)).toBe(true);
        });
        
        it('- checkUnionType() vs validUnionType() 비교', () => {
            const Func1 = function() { this.aa = 1 };   // 기본값으로 설정
            const compare = {
                // 원시 타입
                p0: {target: null, type: [null, Object] },
                p1: {target: NaN, type: [String, Object] },
                p2: {target: 1, type: [Boolean, Object] },
                p3: {target: 'str', type: [String, Object] },
                p4: {target: true, type: [Boolean, Object] },
                p5: {target: 1, type: [1, Number] },
                p6: {target: 'str', type: ['', String] },
                p7: {target: true, type: [false, Boolean] },
                // 참조 타입
                r1: {target: function any(){}, type: [Function, Object] },
                r2: {target: {aa: 1}, type: [Object, null] },
                r3: {target: [], type: [Array, Object] },
                // 객체 타입
                o1: {target: /reg/, type: [RegExp, Object] },
                o2: {target: Symbol(), type: [Symbol, Object] },
                o3: {target: new Date(), type: [Date, Function] },
                o4: {target: new Func1(), type: [Func1, Object] },
                o5: {target: new Func1(), type: [Func1, Date] },
            };
            // checkUnionType()
            expect(checkUnionType(compare.p0.target, compare.p0.type[0], compare.p0.type[1])).toBe(false);
            expect(checkUnionType(compare.p1.target, compare.p1.type[0], compare.p1.type[1])).toBe(false);
            expect(checkUnionType(compare.p2.target, compare.p2.type[0], compare.p2.type[1])).toBe(false);
            expect(checkUnionType(compare.p3.target, compare.p3.type[0], compare.p3.type[1])).toBe(false);
            expect(checkUnionType(compare.p4.target, compare.p4.type[0], compare.p4.type[1])).toBe(false);
            expect(checkUnionType(compare.p5.target, compare.p5.type[0], compare.p5.type[1])).toBe(true);
            expect(checkUnionType(compare.p6.target, compare.p6.type[0], compare.p6.type[1])).toBe(true);
            expect(checkUnionType(compare.p7.target, compare.p7.type[0], compare.p7.type[1])).toBe(true);
            expect(checkUnionType(compare.r1.target, compare.r1.type[0], compare.r1.type[1])).toBe(true);
            expect(checkUnionType(compare.r2.target, compare.r2.type[0], compare.r2.type[1])).toBe(true);
            expect(checkUnionType(compare.r3.target, compare.r3.type[0], compare.r3.type[1])).toBe(true);
            expect(checkUnionType(compare.o1.target, compare.o1.type[0], compare.o1.type[1])).toBe(true);
            expect(checkUnionType(compare.o2.target, compare.o2.type[0], compare.o2.type[1])).toBe(false);
            expect(checkUnionType(compare.o3.target, compare.o3.type[0], compare.o3.type[1])).toBe(false);
            expect(checkUnionType(compare.o4.target, compare.o4.type[0], compare.o4.type[1])).toBe(true);
            expect(checkUnionType(compare.o5.target, compare.o5.type[0], compare.o5.type[1])).toBe(false);
            // validUnionType()
            expect(()=> validUnionType(compare.p0.target, compare.p0.type[0], compare.p0.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p1.target, compare.p1.type[0], compare.p1.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p2.target, compare.p2.type[0], compare.p2.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p3.target, compare.p3.type[0], compare.p3.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p4.target, compare.p4.type[0], compare.p4.type[1])).toThrow(/ES065/);
            expect(validUnionType(compare.p5.target, compare.p5.type[0], compare.p5.type[1])).toBe(true);
            expect(validUnionType(compare.p6.target, compare.p6.type[0], compare.p6.type[1])).toBe(true);
            expect(validUnionType(compare.p7.target, compare.p7.type[0], compare.p7.type[1])).toBe(true);
            expect(validUnionType(compare.r1.target, compare.r1.type[0], compare.r1.type[1])).toBe(true);
            expect(validUnionType(compare.r2.target, compare.r2.type[0], compare.r2.type[1])).toBe(true);
            expect(validUnionType(compare.r3.target, compare.r3.type[0], compare.r3.type[1])).toBe(true);
            expect(validUnionType(compare.o1.target, compare.o1.type[0], compare.o1.type[1])).toBe(true);
            expect(()=> validUnionType(compare.o2.target, compare.o2.type[0], compare.o2.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.o3.target, compare.o3.type[0], compare.o3.type[1])).toThrow(/ES065/);
            expect(validUnionType(compare.o4.target, compare.o4.type[0], compare.o4.type[1])).toBe(true);
            expect(()=> validUnionType(compare.o5.target, compare.o5.type[0], compare.o5.type[1])).toThrow(/ES065/);
        });
    });

    describe('< type 기준 >', () => {
        it('- 타입이 없는 경우 ', () => {
            expect(checkType(1)).toBe(false);
            expect(checkUnionType(1)).toBe(false);
            expect(()=> validType(1)).toThrow('ES026');
            expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- null : any 타입 (단독, or, and) ', () => {
            // 단독 검사
            expect(checkType(function any(){}, null)).toBe(true);
            expect(checkType(function any(){}, null)).toBe(true);
            expect(checkType(null, null)).toBe(true);
            expect(checkType(1, null)).toBe(true);
            expect(checkType(NaN, null)).toBe(true);
            expect(checkType('str', null)).toBe(true);
            expect(checkType(true, null)).toBe(true);
            expect(checkType(/reg/, null)).toBe(true);
            expect(checkType(Symbol(), null)).toBe(true);
            expect(checkType([], null)).toBe(true);
            expect(checkType({aa: 1}, null)).toBe(true);
            expect(checkType(Number, null)).toBe(true);
            expect(checkType(String, null)).toBe(true);
            expect(checkType(Function, null)).toBe(true);
            expect(checkType(Object, null)).toBe(true);
            expect(checkType(Symbol, null)).toBe(true);
            // or 검사
            expect(checkType(function any() {}, [String, null])).toBe(true);
            expect(checkType(function any() {}, String, null)).toBe(true);
            // and 검사
            expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(checkType(undefined, null)).toBe(false);
            expect(checkType(null, null)).toBe(true);
        });
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(checkType(0, 1)).toBe(true);
            expect(checkType(0, Number)).toBe(true);
            expect(checkType(0, NaN)).toBe(true);
            expect(checkType(NaN, NaN)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, 1)).toThrow('ES024');
            expect(()=> validType(function any(){}, NaN)).toThrow('ES024');
            expect(()=> validType(function any(){}, Number)).toThrow('ES024');
            expect(()=> validType(null, Number)).toThrow('ES024');
            expect(()=> validType(true, Number)).toThrow('ES024');
            expect(()=> validType(/reg/, Number)).toThrow('ES024');
            expect(()=> validType('str', Number)).toThrow('ES024');
            expect(()=> validType(Symbol(), Number)).toThrow('ES024');
            expect(()=> validType([], Number)).toThrow('ES024');
            expect(()=> validType({aa:1}, Number)).toThrow('ES024');
            expect(()=> validType(Number, Number)).toThrow('ES024');
            expect(()=> validType(Symbol, Number)).toThrow('ES024');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(checkType('', 'str')).toBe(true);
            expect(checkType('', String)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, 'str')).toThrow('ES024');
            expect(()=> validType(function any(){}, String)).toThrow('ES024');
            expect(()=> validType(null, String)).toThrow('ES024');
            expect(()=> validType(true, String)).toThrow('ES024');
            expect(()=> validType(/reg/, String)).toThrow('ES024');
            expect(()=> validType(1, String)).toThrow('ES024');
            expect(()=> validType(Symbol(), String)).toThrow('ES024');
            expect(()=> validType([], String)).toThrow('ES024');
            expect(()=> validType({aa:1}, String)).toThrow('ES024');
            expect(()=> validType(Number, String)).toThrow('ES024');
            expect(()=> validType(Symbol, String)).toThrow('ES024');
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(checkType(false, true)).toBe(true);
            expect(checkType(false, Boolean)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, true)).toThrow('ES024');
            expect(()=> validType(function any(){}, Boolean)).toThrow('ES024');
            expect(()=> validType(null, Boolean)).toThrow('ES024');
            expect(()=> validType('str', Boolean)).toThrow('ES024');
            expect(()=> validType(/reg/, Boolean)).toThrow('ES024');
            expect(()=> validType(1, Boolean)).toThrow('ES024');
            expect(()=> validType(Symbol(), Boolean)).toThrow('ES024');
            expect(()=> validType([], Boolean)).toThrow('ES024');
            expect(()=> validType({aa:1}, Boolean)).toThrow('ES024');
            expect(()=> validType(Number, Boolean)).toThrow('ES024');
            expect(()=> validType(Symbol, Boolean)).toThrow('ES024');
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(checkType([], Array)).toBe(true);
            expect(checkType([false], [])).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, Array)).toThrow('ES024');
            expect(()=> validType(function any(){}, [])).toThrow('ES024');
            expect(()=> validType(null, Array)).toThrow('ES024');
            expect(()=> validType('str', Array)).toThrow('ES024');
            expect(()=> validType(/reg/, Array)).toThrow('ES024');
            expect(()=> validType(1, Array)).toThrow('ES024');
            expect(()=> validType(Symbol(), Array)).toThrow('ES024');
            expect(()=> validType(true, Array)).toThrow('ES024');
            expect(()=> validType({aa:1}, Array)).toThrow('ES024');
            expect(()=> validType(Number, Array)).toThrow('ES024');
            expect(()=> validType(Symbol, Array)).toThrow('ES024');
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(checkType(function any(){}, Function)).toBe(true);
            // false (예외)
            expect(()=> validType([], Function)).toThrow('ES024');
            expect(()=> validType(null, Function)).toThrow('ES024');
            expect(()=> validType('str', Function)).toThrow('ES024');
            expect(()=> validType(/reg/, Function)).toThrow('ES024');
            expect(()=> validType(1, Function)).toThrow('ES024');
            expect(()=> validType(Symbol(), Function)).toThrow('ES024');
            expect(()=> validType(true, Function)).toThrow('ES024');
            expect(()=> validType({aa:1}, Function)).toThrow('ES024');
        });
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(checkType({}, Object)).toBe(true);
            // expect(checkType(null, Object)).toBe(true);
            expect(checkType(/reg/, {})).toBe(true);
            expect(checkType(new Func(), {})).toBe(true);
            expect(checkType(function any(){}, {})).toBe(true);
            expect(checkType(Number, {})).toBe(true);
            expect(checkType(Symbol, {})).toBe(true);
            // false (예외)
            // expect(()=> validType(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> validType('str', Object)).toThrow('ES024');
            expect(()=> validType(1, Object)).toThrow('ES024');
            expect(()=> validType(Symbol(), Object)).toThrow('ES024');
            expect(()=> validType(true, Object)).toThrow('ES024');
            // expect(()=> validType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> validType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> validType(null, Object)).toThrow('ES024');
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(checkType(new Func2(), Func1)).toBe(true);
            expect(checkType(new Func1(), Func1)).toBe(true);
            expect(checkType({ aa:10 }, Func1)).toBe(true);
            expect(checkType({ aa:10 }, Func2)).toBe(true);
            expect(checkType({ aa: new Date() }, Func3)).toBe(true);
            // false (예외)
                // expect(()=> validType(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> validType(function any(){}, Func1)).toThrow('ES032');
            expect(()=> validType(null, Func1)).toThrow('ES032');
            expect(()=> validType('str', Func1)).toThrow('ES032');
            expect(()=> validType(/reg/, Func1)).toThrow('ES031');
            expect(()=> validType(1, Func1)).toThrow('ES032');
            expect(()=> validType(Symbol(), Func1)).toThrow('ES032');
            expect(()=> validType(true, Func1)).toThrow('ES032');
            expect(()=> validType(Number, Func1)).toThrow('ES032');
            expect(()=> validType(Symbol, Func1)).toThrow('ES032');
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (나열) 
            expect(checkType(1, String, Number)).toBe(true);
            expect(checkType('str', String, Number)).toBe(true);
            // true (베열)
            expect(checkType(1, [String, Number])).toBe(true);
            expect(checkType('str', [String, Number])).toBe(true);
            expect(checkType(true, [Boolean, Number])).toBe(true);
            expect(checkType(null, [Boolean, null])).toBe(true);
            expect(checkType(/reg/, [Boolean, null])).toBe(true);       // any
            expect(checkType(/reg/, [Boolean, Object])).toBe(true);     // objct 최상위
            expect(checkType(/reg/, [Boolean, RegExp])).toBe(true);     // 내장 함수
            expect(checkType(new Func1(), [Func1, Number])).toBe(true);
            expect(checkType(new Func1(), [[String, Func1], Number])).toBe(true);   // 복합 배열
            expect(checkType(new Func1(), [[[Func1]], Number])).toBe(true);         // 복합 하위 배열
            // false (예외)
            expect(()=> validType(1, [Array, String])).toThrow(/ES024.*ES024/);
            expect(()=> validType(function any(){}, [Array])).toThrow(/ES024/);
            expect(()=> validType(function any(){}, [String])).toThrow(/ES024/);
            expect(()=> validType(null, [String, Number])).toThrow(/ES024.*ES024/);
            expect(()=> validType('str', [Array, Number, Boolean])).toThrow(/ES024.*ES024.*ES024/);
        });
        it('- {obj:...} : and 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(checkType(Symbol(), Symbol)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, Symbol)).toThrow('ES024');
            expect(()=> validType(function any(){}, Symbol)).toThrow('ES024');
            expect(()=> validType(null, Symbol)).toThrow('ES024');
            expect(()=> validType('str', Symbol)).toThrow('ES024');
            expect(()=> validType(/reg/, Symbol)).toThrow('ES024');
            expect(()=> validType(1, Symbol)).toThrow('ES024');
            expect(()=> validType(true, Symbol)).toThrow('ES024');
            expect(()=> validType([], Symbol)).toThrow('ES024');
            expect(()=> validType({aa:1}, Symbol)).toThrow('ES024');
            expect(()=> validType(Number, Symbol)).toThrow('ES024');
            expect(()=> validType(Symbol, Symbol)).toThrow('ES024');
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(checkType(new Date(), Date)).toBe(true);
            expect(checkType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> validType(function any(){}, Date)).toThrow('ES032');
            expect(()=> validType(null, Date)).toThrow('ES032');
            expect(()=> validType(true, Date)).toThrow('ES032');
            expect(()=> validType(1, Date)).toThrow('ES032');
            expect(()=> validType('str', Date)).toThrow('ES032');
            expect(()=> validType([], Date)).toThrow('ES032');
            expect(()=> validType({aa:1}, Date)).toThrow('ES032');
            expect(()=> validType(Number, Date)).toThrow('ES032');
            expect(()=> validType(/reg/, Date)).toThrow('ES032');
            expect(()=> validType(Symbol(), Date)).toThrow('ES032');
            expect(()=> validType(Symbol, Date)).toThrow('ES032');
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(checkType(/reg/, RegExp)).toBe(true);
            expect(checkType(/target/, /reg/)).toBe(true);
            // false
            expect(()=> validType(function any(){}, RegExp)).toThrow('ES032');
            expect(()=> validType(null, RegExp)).toThrow('ES032');
            expect(()=> validType(true, RegExp)).toThrow('ES032');
            expect(()=> validType(1, RegExp)).toThrow('ES032');
            expect(()=> validType('str', RegExp)).toThrow('ES032');
            expect(()=> validType([], RegExp)).toThrow('ES032');
            expect(()=> validType({aa:1}, RegExp)).toThrow('ES032');
            expect(()=> validType(Number, RegExp)).toThrow('ES032');
            expect(()=> validType(new Date(), RegExp)).toThrow('ES032');
            expect(()=> validType(Symbol(), RegExp)).toThrow('ES032');
            expect(()=> validType(Symbol, RegExp)).toThrow('ES032');
        });
    });
    
    

    describe('checkType() <or 조건>', () => {
        it('- 객체 타입 ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = Number };
            var obj1 = { aa: 'STR', bb: 10};
            var obj2 = { aa: 'STR'};
            var obj3 = { bb: 10};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};
    
            // true
            expect(checkType(obj1, Func1, Func2)).toBe(true);
            expect(checkType(obj1, Func1)).toBe(true);
            expect(checkType(obj1, Func2)).toBe(true);
            expect(checkType(obj2, Func1, Func2)).toBe(true);
            expect(checkType(obj2, Func1)).toBe(true);
            expect(checkType(obj2, Func2)).toBe(false);
            expect(checkType(obj3, Func1, Func2)).toBe(true);
            expect(checkType(obj3, Func1)).toBe(false);
            expect(checkType(obj3, Func2)).toBe(true);
            expect(checkType(obj4, Func1, Func2)).toBe(true);
            expect(checkType(obj4, Func1)).toBe(true);
            expect(checkType(obj4, Func2)).toBe(false);
            // false (예외)
            expect(()=> validType(obj5, Func1, Func2)).toThrow(/ES027(.|\s)*ES027/);
        });
        it('- 원시 타입 ', () => {
            // true
            expect(checkType(1, Number, String, Boolean)).toBe(true);
            expect(checkType('str', Number, String, Boolean)).toBe(true);
            expect(checkType(true, Number, String, Boolean)).toBe(true);            
            // false
            expect(checkType(new Date(), Number, String, Boolean)).toBe(false);
            expect(checkType(/reg/, Number, String, Boolean)).toBe(false);
            expect(checkType(Symbol(), Number, String, Boolean)).toBe(false);
            expect(checkType([], Number, String, Boolean)).toBe(false);
            expect(checkType({}, Number, String, Boolean)).toBe(false);
        });
        it('- 내장 객체 타입 ', () => {
            // true
            expect(checkType(new Date(), RegExp, Date, Symbol)).toBe(true);
            expect(checkType(/reg/, RegExp, Date, Symbol)).toBe(true);
            expect(checkType(Symbol(), RegExp, Date, Symbol)).toBe(true);            
            // false
            expect(checkType(1, RegExp, Date, Symbol)).toBe(false);
            expect(checkType(true, RegExp, Date, Symbol)).toBe(false);
            expect(checkType('str', RegExp, Date, Symbol)).toBe(false);       
            expect(checkType([], RegExp, Date, Symbol)).toBe(false);       
            expect(checkType({}, RegExp, Date, Symbol)).toBe(false);       
        });
        it('- 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            // true
            expect(checkType(new Sub(), Super, Sub)).toBe(true);
            expect(checkType(new Sub(), Super)).toBe(true);
            expect(checkType(new Sub(), Sub)).toBe(true);
            expect(checkType(new Sub(), Object)).toBe(true);       
        });
        
    });
    describe('checkUnionType() <and 조건>', () => {
        it('- 객체 타입 ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = Number };
            var obj1 = { aa: 'STR', bb: 10};
            var obj2 = { aa: 'STR'};
            var obj3 = { bb: 10};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
            expect(checkUnionType(obj1, Func1)).toBe(true);
            expect(checkUnionType(obj1, Func2)).toBe(true);
            expect(checkUnionType(obj2, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj2, Func1)).toBe(true);
            expect(checkUnionType(obj2, Func2)).toBe(false);
            expect(checkUnionType(obj3, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj3, Func1)).toBe(false);
            expect(checkUnionType(obj3, Func2)).toBe(true);
            expect(checkUnionType(obj4, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj4, Func1)).toBe(true);
            expect(checkUnionType(obj4, Func2)).toBe(false);
            expect(checkUnionType(obj5, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj5, Func1)).toBe(false);
            expect(checkUnionType(obj5, Func2)).toBe(false);
            expect(()=> validUnionType(obj2, Func1, Func2)).toThrow('ES027');
            expect(()=> validUnionType(obj3, Func1, Func2)).toThrow('ES027');
            expect(()=> validUnionType(obj4, Func1, Func2)).toThrow('ES024');
            expect(()=> validUnionType(obj5, Func1, Func2)).toThrow('ES027');    // aa, bb
        });
        it('- 원시 타입 ', () => {
            // true
            expect(checkUnionType(1, Number, String, Boolean)).toBe(false);
            expect(checkUnionType('str', Number, String, Boolean)).toBe(false);
            expect(checkUnionType(true, Number, String, Boolean)).toBe(false);            
        });
        it('- 내장 객체 타입 ', () => {
            // true
            expect(checkUnionType(new Date(), Date, Object)).toBe(true);
            expect(checkUnionType(/reg/, RegExp, Object)).toBe(true);
            // false
            expect(checkUnionType(Symbol(), Symbol, Object)).toBe(false);   // instanceof 아님!       
        });
        it('- 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            // true
            expect(checkUnionType(new Sub(), Super, Sub)).toBe(true);
            expect(checkUnionType(new Sub(), Super)).toBe(true);
            expect(checkUnionType(new Sub(), Sub)).toBe(true);
            expect(checkUnionType(new Sub(), Object)).toBe(true);       
        });
    });
    describe('< 기본값 >', () => {
        
        it('- 객체 기본값 : checkType() ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = 10 };
            var obj1 = { aa: 'str', bb: 2}
            var obj2 = { aa: 'str'}
            var obj3 = { bb: 5};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            // true
            expect(checkType(obj1, Func1, Func2)).toBe(true);
            expect(checkType(obj1, Func1)).toBe(true);
            expect(checkType(obj1, Func2)).toBe(true);
            expect(obj1.bb).toBe(2);
            expect(checkType(obj2, Func1, Func2)).toBe(true);
            expect(checkType(obj2, Func1)).toBe(true);
            expect(checkType(obj2, Func2)).toBe(true);
            expect(obj2.bb).toBe(10);    // 객체값 복사
            expect(checkType(obj3, Func1, Func2)).toBe(true);
            expect(checkType(obj3, Func1)).toBe(false);
            expect(checkType(obj3, Func2)).toBe(true);
            expect(obj3.bb).toBe(5);    // 객체값 복사
            expect(checkType(obj4, Func1, Func2)).toBe(true);
            expect(checkType(obj4, Func1)).toBe(true);
            expect(checkType(obj4, Func2)).toBe(false);
            expect(checkType(obj5, Func1, Func2)).toBe(true);
            expect(checkType(obj5, Func1)).toBe(false);
            expect(checkType(obj5, Func2)).toBe(true);
        });
        it('- 객체 기본값 : checkUnionType() ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = 10 };
            var obj1 = { aa: 'str', bb: 2}
            var obj2 = { aa: 'str'}
            var obj3 = { bb: 5};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
            expect(checkUnionType(obj1, Func1)).toBe(true);
            expect(checkUnionType(obj1, Func2)).toBe(true);
            expect(obj1.bb).toBe(2);
            expect(checkUnionType(obj2, Func1, Func2)).toBe(true); // 기본값에 따라 true
            expect(checkUnionType(obj2, Func1)).toBe(true);
            expect(checkUnionType(obj2, Func2)).toBe(true); // 기본값에 따라 true
            expect(obj2.bb).toBe(10);    // 객체값 복사
            expect(checkUnionType(obj3, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj3, Func1)).toBe(false);
            expect(checkUnionType(obj3, Func2)).toBe(true);
            expect(obj3.bb).toBe(5);    // 객체값 복사
            expect(checkUnionType(obj4, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj4, Func1)).toBe(true);
            expect(checkUnionType(obj4, Func2)).toBe(false);
            expect(checkUnionType(obj5, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj5, Func1)).toBe(false);
            expect(checkUnionType(obj5, Func2)).toBe(true);     // 기본값에 따라 true
        });
        it('- 원시 기본값 : checkType() ', () => {
            var str = 'STR';
            var num = 100;
            var bool = true;
            var obj;
            
            expect(checkType(obj, str)).toBe(true);
            expect(checkType(obj, num)).toBe(true);
            expect(checkType(obj, bool)).toBe(true);
            expect(obj).toBeUndefined();                            // 참조 타입이 값이 전달되어 값이 설정 안됨
        });
        it('- 원시 기본값 : checkUnionType() ', () => {
            var str = 'STR';
            var num = 100;
            var bool = true;
            var obj;
            
            expect(checkUnionType(obj, str)).toBe(true);
            expect(checkUnionType(obj, num)).toBe(true);
            expect(checkUnionType(obj, bool)).toBe(true);
            expect(obj).toBeUndefined();                            // 참조 타입이 값이 전달되어 값이 설정 안됨
        });
        it('- 원시 객체 기본값 ', () => {
            var reg = /reg/;
            var date = new Date();
            var symbol = Symbol();
            var obj;
            
            expect(checkType(/reg2/, reg)).toBe(true);
            expect(checkType(new Date(), date)).toBe(true);
            expect(checkType(Symbol(), symbol)).toBe(true);
            // false
            expect(checkType(obj, reg)).toBe(false);
            expect(checkType(obj, date)).toBe(false);
            expect(checkType(obj, symbol)).toBe(false);
            expect(obj).toBeUndefined();
        });
    });
    

});
