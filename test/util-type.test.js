/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const { checkType, checkUnionType, validType, validUnionType, getTypeMap }      = require('../src/util-type');


//==============================================================
// test
describe('Util.*', () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        global.console.warn = jest.fn();
    });
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
        // function
        expect(getTypeMap(Function).name).toBe('function');
        // class
        expect(getTypeMap(User).name).toBe('class');
        expect(getTypeMap(Date).name).toBe('class');    // Data
        // number
        expect(getTypeMap(Number).name).toBe('number');
        expect(getTypeMap(1).name).toBe('number');
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
    });

    it('- 빈 함수타입 검사 : checkType(), validType(예외) ', () => {
        var Func1 = function() {};
        var Func2 = function() {};

        // 성공 조건 : checkType()
        expect(checkType(Func1, Function)).toBe(true);              // 함수
        expect(checkType(Func1, String, Function)).toBe(true);      // 문자 또는 함수
        expect(checkType(new Func1(), Func1)).toBe(true);           // new 객체 (프로퍼티를 검사)
        expect(checkType(new Func1(), Func2)).toBe(true);           // new 객체 (프로퍼티를 검사)
        expect(checkType({}, Func1)).toBe(true);                    // 빈 객체
        // 실패 조건 : checkType()
        expect(checkType(new Func1(), Date)).toBe(false);           // new 객체
        expect(checkType(Func1, Func1, Number)).toBe(false);
        expect(checkType(Func1, Func1)).toBe(false);
        // 예외 조건 : validType()
        expect(() => validType(Func1, Number, '', true)).toThrow(/타입이/);     // 숫자, 문자, 부울
        expect(() => validType(Func1, String, Number)).toThrow(/타입이/);       // 문자 또는 숫자
        expect(() => validType(Func1, Func1, Number)).toThrow(/instance/);    // 객체 또는 숫자
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

        expect(checkType(Symbol(), Symbol)).toBe(true);
        expect(checkType(new Func1(), Func1)).toBe(true);
        expect(checkType(function() {}, Function)).toBe(true);
        expect(checkType({a:1}, Object)).toBe(true);
        expect(checkType([1,2,3], Array)).toBe(true);
    });
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
        // validType 로 검사
        expect(validType(obj1, Func1)).toBe(true);
        expect(() => validType(obj2, Func1)).toThrow(/symbol/);
    });
    it('- Date 타입 : checkType(), validType(this) ', () => {
        var Func1 = function() { this.aa = Date };
        var obj1 = { aa: new Date()};
        var obj2 = { aa: {}};

        // checkType
        expect(checkType(obj1, Func1)).toBe(true);
        expect(checkType(obj2, Func1)).toBe(false);
        // validType
        expect(validType(obj1, Func1)).toBe(true);
        expect(() => validType(obj2, Func1)).toThrow(/instance/);
    });
    
    it('- {} and 조건 : checkUnionType() ', () => {
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
    });
    it('- or 조건 : checkType()  ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'STR', bb: 10};
        var obj2 = { aa: 'STR'};
        var obj3 = { bb: 10};
        var obj4 = { aa: 'STR', bb: 'STR'};
        var obj5 = { cc: 'STR'};

        expect(checkType(obj1, Func1, Func2)).toBe(true);
        expect(checkType(obj2, Func1, Func2)).toBe(true);
        expect(checkType(obj3, Func1, Func2)).toBe(true);
        expect(checkType(obj4, Func1, Func2)).toBe(true);
        expect(checkType(obj5, Func1, Func2)).toBe(false);  // cc 없음
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
        var obj;
        
        expect(checkUnionType(obj, str)).toBe(true);
        expect(obj).not.toBe('STR');                            // 참조 타입이 값이 전달되어 값이 설정 안됨
    });
    it('- checkUnionType() : null ', () => {
        var str = 'STR';
        var obj;
        
        expect(checkUnionType(obj, str)).toBe(true);
        expect(obj).not.toBe('STR');                            // 참조 타입이 값이 전달되어 값이 설정 안됨
    });


});
