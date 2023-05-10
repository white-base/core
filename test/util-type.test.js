/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const { getAllProperties, getTypeMap, checkType }       = require('../src/util-type');
const { checkUnionType, validType, validUnionType }     = require('../src/util-type');

//==============================================================
// test
describe('Util.*', () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        global.console.warn = jest.fn();
    });
    // TODO: check vs valid 쌍값 확인
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
        expect(() => getTypeMap(2n ** 53n).name).toThrow('타입이 존재하지 않습니다');

    });
    describe('< target 기준 >', () => {
        it('- 타입이 없는 경우 ', () => {
            expect(checkType(1)).toBe(false);
            expect(checkUnionType(1)).toBe(false);
            expect(()=> validType(1)).toThrow(/검사할.*타입이/);
            expect(()=> validUnionType(1)).toThrow(/검사할.*타입이/);
        });
        it('- null : any 타입 (단독, or, and) ', () => {
            // 단독 검사
            expect(checkType(function any() {}, null)).toBe(true);
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
            expect(checkType(Symbol, null)).toBe(true);    // REVIEW: ?
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
            expect(()=> validType(function any(){}, 1)).toThrow(/number.*타입/);
            expect(()=> validType(function any(){}, NaN)).toThrow(/number.*타입/);
            expect(()=> validType(function any(){}, Number)).toThrow(/number.*타입/);
            expect(()=> validType(null, Number)).toThrow(/number.*타입/);
            expect(()=> validType(true, Number)).toThrow(/number.*타입/);
            expect(()=> validType(/reg/, Number)).toThrow(/number.*타입/);
            expect(()=> validType('str', Number)).toThrow(/number.*타입/);
            expect(()=> validType(Symbol(), Number)).toThrow(/number.*타입/);
            expect(()=> validType([], Number)).toThrow(/number.*타입/);
            expect(()=> validType({aa:1}, Number)).toThrow(/number.*타입/);
            expect(()=> validType(Number, Number)).toThrow(/number.*타입/);
            expect(()=> validType(Symbol, Number)).toThrow(/number.*타입/);
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(checkType('', 'str')).toBe(true);
            expect(checkType('', String)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, 'str')).toThrow(/string.*타입/);
            expect(()=> validType(function any(){}, String)).toThrow(/string.*타입/);
            expect(()=> validType(null, String)).toThrow(/string.*타입/);
            expect(()=> validType(true, String)).toThrow(/string.*타입/);
            expect(()=> validType(/reg/, String)).toThrow(/string.*타입/);
            expect(()=> validType(1, String)).toThrow(/string.*타입/);
            expect(()=> validType(Symbol(), String)).toThrow(/string.*타입/);
            expect(()=> validType([], String)).toThrow(/string.*타입/);
            expect(()=> validType({aa:1}, String)).toThrow(/string.*타입/);
            expect(()=> validType(Number, String)).toThrow(/string.*타입/);
            expect(()=> validType(Symbol, String)).toThrow(/string.*타입/);
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(checkType(false, true)).toBe(true);
            expect(checkType(false, Boolean)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, true)).toThrow(/boolean.*타입/);
            expect(()=> validType(function any(){}, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(null, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType('str', Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(/reg/, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(1, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(Symbol(), Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType([], Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType({aa:1}, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(Number, Boolean)).toThrow(/boolean.*타입/);
            expect(()=> validType(Symbol, Boolean)).toThrow(/boolean.*타입/);
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(checkType([], Array)).toBe(true);
            expect(checkType([false], [])).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, Array)).toThrow(/array.*타입/);
            expect(()=> validType(function any(){}, [])).toThrow(/array.*타입/);
            expect(()=> validType(null, Array)).toThrow(/array.*타입/);
            expect(()=> validType('str', Array)).toThrow(/array.*타입/);
            expect(()=> validType(/reg/, Array)).toThrow(/array.*타입/);
            expect(()=> validType(1, Array)).toThrow(/array.*타입/);
            expect(()=> validType(Symbol(), Array)).toThrow(/array.*타입/);
            expect(()=> validType(true, Array)).toThrow(/array.*타입/);
            expect(()=> validType({aa:1}, Array)).toThrow(/array.*타입/);
            expect(()=> validType(Number, Array)).toThrow(/array.*타입/);
            expect(()=> validType(Symbol, Array)).toThrow(/array.*타입/);
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(checkType(function any(){}, Function)).toBe(true);
            // false (예외)
            expect(()=> validType([], Function)).toThrow(/function.*타입/);
            expect(()=> validType(null, Function)).toThrow(/function.*타입/);
            expect(()=> validType('str', Function)).toThrow(/function.*타입/);
            expect(()=> validType(/reg/, Function)).toThrow(/function.*타입/);
            expect(()=> validType(1, Function)).toThrow(/function.*타입/);
            expect(()=> validType(Symbol(), Function)).toThrow(/function.*타입/);
            expect(()=> validType(true, Function)).toThrow(/function.*타입/);
            expect(()=> validType({aa:1}, Function)).toThrow(/function.*타입/);
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
            expect(()=> validType('str', Object)).toThrow(/object.*타입/);
            expect(()=> validType(1, Object)).toThrow(/object.*타입/);
            expect(()=> validType(Symbol(), Object)).toThrow(/object.*타입/);
            expect(()=> validType(true, Object)).toThrow(/object.*타입/);
            // expect(()=> validType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> validType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> validType(null, Object)).toThrow(/object.*타입/);
        });
        // it.only('- test ', () => {
        //     expect(checkType(null, Object)).toBe();

        // });
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
            expect(()=> validType(function any(){}, Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(null, Func1)).toThrow(/instance.*타입/);
            expect(()=> validType('str', Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(/reg/, Func1)).toThrow(/target.*객체/);
            expect(()=> validType(1, Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(Symbol(), Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(true, Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(Number, Func1)).toThrow(/instance.*타입/);
            expect(()=> validType(Symbol, Func1)).toThrow(/instance.*타입/);
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
            expect(()=> validType(1, [Array, String])).toThrow(/array.*타입.*string.*타입/);
            expect(()=> validType(function any(){}, [Array])).toThrow(/array.*타입/);
            expect(()=> validType(function any(){}, [String])).toThrow(/string.*타입/);
            expect(()=> validType(null, [String, Number])).toThrow(/string.*타입.*number.*타입/);
            expect(()=> validType('str', [Array, Number, Boolean])).toThrow(/array.*타입/);
        });
        it('- {obj:...} : and 타입 ', () => {
        });
       
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(checkType(Symbol(), Symbol)).toBe(true);
            // false (예외)
            expect(()=> validType(function any(){}, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(function any(){}, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(null, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType('str', Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(/reg/, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(1, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(true, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType([], Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType({aa:1}, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(Number, Symbol)).toThrow(/symbol.*타입/);
            expect(()=> validType(Symbol, Symbol)).toThrow(/symbol.*타입/);
        });
        it('- Date : object 타입 (class) ', () => {
            var Func1 = function() { this.aa = Date };
            var obj1 = { aa: new Date()};
            var obj2 = { aa: {}};
    
            // true
            expect(checkType(obj1, Func1)).toBe(true);
            // false
            expect(() => validType(obj2, Func1)).toThrow(/instance/);
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            // expect(checkType(/reg/, RegExp)).toBe(true);
            expect(checkType(/reg/, /reg/)).toBe(true); // REVIEW: object 타입으로 해석됨
            // false (예외)
            // expect(()=> validType(function any(){}, true)).toThrow(/boolean.*타입/);
            // expect(()=> validType(function any(){}, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(null, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType('str', Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(/reg/, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(1, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(Symbol(), Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType([], Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType({aa:1}, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(Number, Boolean)).toThrow(/boolean.*타입/);
            // expect(()=> validType(Symbol, Boolean)).toThrow(/boolean.*타입/);
        });
        it('- 예외 타입 ', () => {
        });
    });

    /**
     * or 조건
     * and 조건
     * 기본값
     */
    it('- [] : or 타입 (인스턴스 타입) ', () => {   // 하위로 빼야함
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'STR', bb: 10};
        var obj2 = { aa: 'STR'};
        var obj3 = { bb: 10};
        var obj4 = { aa: 'STR', bb: 'STR'};
        var obj5 = { cc: 'STR'};

        // true
        expect(checkType(obj1, Func1, Func2)).toBe(true);
        expect(checkType(obj2, Func1, Func2)).toBe(true);
        expect(checkType(obj3, Func1, Func2)).toBe(true);
        expect(checkType(obj4, Func1, Func2)).toBe(true);
        // false (예외)
        expect(()=> validType(obj5, Func1, Func2)).toThrow(/없음.*aa.*없음.*bb/);

    });
    it('- or 조건 : checkType(), undefined, 복합 배열 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        // var obj1 = { aa: 'STR', bb: 10};
        var obj2 = { aa: 'STR'};
        // var obj3 = { bb: 10};
        // var obj4 = { aa: 'STR', bb: 'STR'};
        // var obj5 = { cc: 'STR'};

        // expect(checkType(obj1, Func1, Func2)).toBe(true);
        expect(checkType(obj2)).toBe(false);
        expect(checkType(obj2, [Func2, String, Number])).toBe(false);
        // expect(checkType(obj2, [Func2, String], Func1)).toBe(false);    // Func1 해석 안됨
// REVIEW:
        // expect(checkType(obj3, Func1, Func2)).toBe(true);
        // expect(checkType(obj4, Func1, Func2)).toBe(true);
        // expect(checkType(obj5, Func1, Func2)).toBe(false);  // cc 없음
    });
    it('- 빈 함수타입 검사 : checkType(), validType(예외) ', () => {
        var Func1 = function() {};
        var Func2 = function() {};

        // 성공 조건 : checkType()
        expect(checkType(Func1, Function)).toBe(true);              // 함수
        expect(checkType(Func1, String, Function)).toBe(true);      // 문자 또는 함수
        expect(checkType(new Func1(), Func1)).toBe(true);           // new 객체 (프로퍼티를 검사)
        expect(checkType(new Date(), Date)).toBe(true);
        // 실패 조건 : checkType()
        expect(checkType(new Func1(), Date)).toBe(false);           // new 객체
        expect(checkType(Func1, Func1, Number)).toBe(false);
        expect(checkType(Func1, Func1)).toBe(false);
        // 예외 조건 : validType()
        expect(() => validType(new Func1(), Func2)).toThrow(/object.*타입/);           
        expect(() => validType({}, Func2)).toThrow(/object.*타입/);           
        expect(() => validType(Func1, Number, '', true)).toThrow(/타입이/);     // 숫자, 문자, 부울
        expect(() => validType(Func1, String, Number)).toThrow(/타입이/);       // 문자 또는 숫자
        expect(() => validType(Func1, Func1, Number)).toThrow(/instance.*number/);    // 객체 또는 숫자
        expect(() => validType(Func1, Func1)).toThrow(/타입이/);                // 객체여야함
    });
    
    it('- 예외 : validType(), validUnionType()  ', () => {
        expect(() => validType({}, undefined)).toThrow(/타입이/);
        expect(() => validUnionType({}, undefined, Object)).toThrow(/타입이/);
    });
    it('- null 타입 : checkType() 직접 검사 ', () => {
        // null
        expect(checkType(null, null)).toBe(true);
        // number
        expect(checkType(Number, null)).toBe(true);
        expect(checkType(1, null)).toBe(true);
        // string
        expect(checkType(String, null)).toBe(true);        
        expect(checkType('str', null)).toBe(true);
        // boolean
        expect(checkType(Boolean, null)).toBe(true);
        expect(checkType(true, null)).toBe(true);
        // function
        expect(checkType(Function, null)).toBe(true);
        expect(checkType(function any() {}, null)).toBe(true);
        // array
        expect(checkType(Array, null)).toBe(true);
        expect(checkType([], null)).toBe(true);
        // array [or]
        expect(checkType([String, Number], null)).toBe(true);
        expect(checkType(Object, null)).toBe(true);
        // object [and]
        expect(checkType({}, null)).toBe(true);
        expect(checkType({aa:1}, null)).toBe(true);
        // symbol
        expect(checkType(Symbol(), null)).toBe(true);
    });
    it('- string, number, boolean 타입 : checkType() 직접 검사 ', () => {
        // number
        expect(checkType(1, Number)).toBe(true);
        expect(checkType(1, 0)).toBe(true);
        // string
        expect(checkType('', String)).toBe(true);
        expect(checkType('', '')).toBe(true);
        // boolean
        expect(checkType(false, Boolean)).toBe(true);
        expect(checkType(true, false)).toBe(true);
    });
    it('- symbol, class, function, object, array 타입 : checkType() 직접 검사 ', () => {
        var Func1 = function() { this.aa = Date };

        // true
        expect(checkType(new Func1(), Func1)).toBe(true);
        expect(checkType(Symbol(), Symbol)).toBe(true);
        expect(checkType(function() {}, Function)).toBe(true);
        expect(checkType({a:1}, Object)).toBe(true);
        expect(checkType([1,2,3], Array)).toBe(true);
        // false
        expect(checkType(1, Function)).toBe(false);
    });
    // it.only('- TESET  ', () => {
    //     expect(checkType({a:1}, Object)).toBe(true);
    // });
    it('- and(object), or(array) : checkType() 직접 검사 ', () => {
        expect(checkType({aa:1, bb:'str'}, {aa: Number, bb: String})).toBe(true);
        expect(checkType({aa:1}, {aa: Number, bb: String})).toBe(false);
        expect(checkType(1, [String, Number])).toBe(true);
        expect(checkType(1, [String, Object])).toBe(false);
    });

    it('- 객체 타입 : validType() ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        expect(checkType(obj1, Func1)).toBe(true);
        expect(checkType(obj1, Func2)).toBe(true);
        expect(checkType(obj1, Func1, Func2)).toBe(true);
        expect(checkType(obj2, Func1, Func2)).toBe(true);
    });
    it('- Symbol 타입 : checkType(), validType(예외)  ', () => {
        var Func1 = function() { this.aa = Symbol };
        var obj1 = { aa: Symbol()};
        var obj2 = { aa: {}};
        
        // 직접 검사
        expect(checkType(Symbol(), Symbol)).toBe(true);
        expect(checkType({}, Symbol)).toBe(false);
        // 객체 내부에서 검사
        expect(checkType(obj1, Func1)).toBe(true);
        expect(checkType(obj2, Func1)).toBe(false);
        // // validType 로 검사
        expect(validType(obj1, Func1)).toBe(true);
        expect(() => validType(obj2, Func1)).toThrow(/symbol/);
    });
    
    it('- {} and 조건 : checkUnionType(), validUnionType() ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'STR', bb: 10};
        var obj2 = { aa: 'STR'};
        var obj3 = { bb: 10};
        var obj4 = { aa: 'STR', bb: 'STR'};

        expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
        expect(checkUnionType(obj2, Func1, Func2)).toBe(false); // bb 없음
        expect(checkUnionType(obj3, Func1, Func2)).toBe(false); // aa 없음
        expect(checkUnionType(obj4, Func1, Func2)).toBe(false); // bb 타입 다름

        expect(validUnionType(obj1, Func1, Func2)).toBe(true);
        expect(()=> validUnionType(obj2, Func1, Func2)).toThrow(/bb/); // bb 없음
        expect(()=> validUnionType(obj3, Func1, Func2)).toThrow(/aa/); // aa 없음
        expect(()=> validUnionType(obj4, Func1, Func2)).toThrow(/bb.*타입/); // bb 타입 다름
    });


    it('- 인터페이스 : checkUnionType() ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}
        
        expect(checkUnionType(obj1, Func1)).toBe(true);
        expect(checkUnionType(obj1, Func2)).toBe(true);
        expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
        expect(checkUnionType(obj2, Func1, Func2)).toBe(false);   // bb를 구현 안됬음
    });
    it('- 객체 기본값 : checkUnionType() ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = 0 };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        expect(checkUnionType(obj1, Func1)).toBe(true);
        expect(checkUnionType(obj1, Func2)).toBe(true);
        expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
        expect(checkUnionType(obj2, Func1, Func2)).toBe(true);      // bb 기본값이 설정됨
        expect(obj2.bb).toBe(0);                                    // 초기값 검사
    });
    it('- 객체 기본값 : checkType() ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = 0 };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        // obj1
        expect(checkType(obj1, Func1)).toBe(true);
        expect(checkType(obj1, Func2)).toBe(true);
        expect(obj1.bb).toBe(2);    // 객체값 유지
        expect(checkType(obj1, Func1, Func2)).toBe(true);
        // obj2
        expect(checkType(obj2, Func1)).toBe(true);
        expect(checkType(obj2, Func2)).toBe(true);
        expect(checkType(obj2, Func1, Func2)).toBe(true);      // bb 기본값이 설정됨
        expect(obj2.bb).toBe(0);                               // 초기값 검사
    });
    it('- checkUnionType() : 원시 기본값 ', () => {
        var str = 'STR';
        var num = 100;
        var bool = true;
        var obj;
        
        expect(checkUnionType(obj, str)).toBe(true);
        expect(checkUnionType(obj, num)).toBe(true);
        expect(checkUnionType(obj, bool)).toBe(true);
        expect(obj).not.toBe('STR');                            // 참조 타입이 값이 전달되어 값이 설정 안됨
    });
    it('- checkUnionType() : null ', () => {
        var str = 'STR';
        var obj;
        
        expect(checkUnionType(obj, str)).toBe(true);
        expect(obj).not.toBe('STR');                            // 참조 타입이 값이 전달되어 값이 설정 안됨
    });


});
