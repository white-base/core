/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {getAllProperties, checkType, checkTypeAll}      = require('../src/util.type');




//==============================================================
// test
describe('Util.*', () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        global.console.warn = jest.fn();
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
    it('- checkType() : 예외 ', () => {
        expect(() => checkType({}, undefined)).toThrow(/타입이/);
    });
    it('- checkType() : 객체 ', () => {
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

    it('- checkTypeAll() : 인터페이스 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = Number };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}
        
        expect(checkTypeAll(obj1, Func1)).toBe(true);
        expect(checkTypeAll(obj1, Func2)).toBe(true);
        expect(checkTypeAll(obj1, Func1, Func2)).toBe(true);
        expect(checkTypeAll(obj2, Func1, Func2)).toBe(false);   // bb를 구현 안됬음
    });
    it('- checkTypeAll() : 객체 기본값 ', () => {
        var Func1 = function() { this.aa = String };
        var Func2 = function() { this.bb = 0 };
        var obj1 = { aa: 'str', bb: 2}
        var obj2 = { aa: 'str'}

        expect(checkTypeAll(obj1, Func1)).toBe(true);
        expect(checkTypeAll(obj1, Func2)).toBe(true);
        expect(checkTypeAll(obj1, Func1, Func2)).toBe(true);
        expect(checkTypeAll(obj2, Func1, Func2)).toBe(true);    // bb 기본값이 설정됨
        
        expect(obj2.bb).toBe(0);                                // 초기값 검사
    });
    it('- checkTypeAll() : 원시 가본값 ', () => {
        var str = 'STR';
        var obj;
        
        expect(checkTypeAll(obj, str)).toBe(true);
        expect(obj).not.toBe('STR');                            // 참조 타입이 아값이 전달되어 값이 설정 안됨
    });
});
