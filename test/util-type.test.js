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
    it('- validType() : 빈 함수타입 검사 ', () => {
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
    });

    it('- validType() : 빈 함수타입 검사 ', () => {
        var Func1 = function() {};

        // 성공 조건
        expect(validType(Func1, Function)).toBe(true);              // 함수
        expect(validType(Func1, String, Function)).toBe(true);      // 문자 또는 함수
        expect(validType(new Func1(), Func1)).toBe(true);           // new 객체
        expect(validType({}, Func1)).toBe(true);                    // 빈 객체
        // 예외 조건
        expect(() => validType(Func1, Number, '', true)).toThrow(/타입이/);     // 숫자, 문자, 부울
        expect(() => validType(Func1, String, Number)).toThrow(/타입이/);      // 문자 또는 숫자
        expect(() => validType(Func1, Func1, Number)).toThrow(/instance/);       // 객체 또는 숫자
        expect(() => validType(Func1, Func1)).toThrow(/타입이/);                // 객체여야함
    });
    it('- checkType() : 빈 함수타입 검사 ', () => {
        var Func1 = function() {};

        // 성공 조건
        expect(checkType(Func1, Function)).toBe(true);              // 함수
        expect(checkType(Func1, String, Function)).toBe(true);      // 문자 또는 함수
        expect(checkType(new Func1(), Func1)).toBe(true);           // new 객체
        expect(checkType({}, Func1)).toBe(true);                    // 빈 객체
        // 실패 조건
        expect(checkType(Func1, Number, '', true)).toBe(false);     // 숫자, 문자, 부울
        expect(checkType(Func1, String, Number)).toBe(false);       // 문자 또는 숫자
        expect(checkType(Func1, Func1, Number)).toBe(false);        // 객체 또는 숫자
        expect(checkType(Func1, Func1)).toBe(false);                // 객체여야함
    });



    //--------------
    it('- validType() : 예외 ', () => {
        expect(() => validType({}, undefined)).toThrow(/타입이/);
    });
    it('- validType() : 객체 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        expect(checkType(obj1, Func1)).toBe(true);
        expect(checkType(obj1, Func2)).toBe(true);
        expect(checkType(obj1, Func1, Func2)).toBe(true);
        expect(checkType(obj2, Func1, Func2)).toBe(true);
    });
    it('- checkType() : 상속객체 검사 ', () => {
    });
    it('- checkType() : null 검사 ', () => {
    });

    it('- checkUnionType() : 인터페이스 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}
        
        expect(checkUnionType(obj1, Func1)).toBe(true);
        expect(checkUnionType(obj1, Func2)).toBe(true);
        expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
        expect(checkUnionType(obj2, Func1, Func2)).toBe(false);   // bb를 구현 안됬음
    });
    it('- checkUnionType() : 객체 기본값 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = 0 };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        expect(checkUnionType(obj1, Func1)).toBe(true);
        expect(checkUnionType(obj1, Func2)).toBe(true);
        expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
        expect(checkUnionType(obj2, Func1, Func2)).toBe(true);    // bb 기본값이 설정됨
        
        expect(obj2.bb).toBe(0);                                // 초기값 검사
    });
    it('- checkUnionType() : 원시 가본값 ', () => {
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
