import {ExtType}           from './T';

/**
 * 타입 모듈입니다.
 */
declare namespace Type {

    /**
     * 객체의 전체 프로퍼티를 조회합니다.
     * 
     * @param obj - 프로퍼티를 조회할 객체입니다.(Object 제외)
     * @param hasObj - `Object`를 포함할지 여부입니다.
     * @returns 프로퍼티 이름 배열입니다.
     */
    function getAllProperties(obj: object, hasObj: boolean): Array<string>;

    /**
     * 객체를 비교합니다. (프로토타입 제외)
     * 
     * @param obj1 - 원본 객체입니다.
     * @param obj2 - 비교 대상 객체입니다.
     * @returns 두 객체가 같은지 여부를 나타냅니다.
     */
    function deepEqual(obj1: any, obj2: object): boolean;

    /**
     * 함수 타입을 가져옵니다. (_UNION 포함)
     * 배열에 대상(ctor)부터 순서대로 리턴합니다.
     * 
     * @param ctor - 생성자 함수입니다.
     * @param hasUnion - `_UNION` 포함 여부입니다. 기본값은 `true`입니다.
     * @returns 함수 타입 배열입니다.
     */
    function getTypes(ctor: Function, hasUnion: boolean | true): Array<Function>;

    /**
     * 함수 타입의 프로토타입(상속) 타입 여부를 검사합니다.
     * 
     * @param ctor - 생성자 함수입니다.
     * @param target - 검사 대상입니다.
     * @returns 프로토타입 타입 여부를 나타냅니다.
     */
    function isProtoChain(ctor: Function, target: Function | string): boolean;

    /**
     * 함수 타입의 프로토타입(상속) 또는 `_UNION` 타입 여부를 검사합니다.
     * 
     * @param ctor - 생성자 함수입니다.
     * @param target - 검사 대상입니다.
     * @returns 프로토타입 또는 `_UNION` 타입 여부를 나타냅니다.
     */
    function hasType(ctor: Function, target: Function | string): boolean;

    /**
     * 확장타입 객체를 얻습니다. (하위 타입 포함)
     * 
     * @param target - 대상 타입입니다.
     * @returns 확장 타입 객체입니다.
     * 
     * @example
     * var returnObject = {
     *     $ype: '',       // common
     *     default: null,  // string, number, boolean, regexp
     *     kind: '',       // array, choice
     *     creator: null,  // class
     *     _instance: {},  // class
     *     _prop: {},      // union
     *     params: [],     // function
     *     return: null,   // function
     *     name: name,     // function
     *     func: null,     // function
     * }
     */
    function typeObject(target: any): ExtType;

    /**
     * 확장 타입명을 얻습니다.
     * 
     * @param target - 대상 객체입니다.
     * @returns 확장 타입명입니다.
     */
    function typeOf(target: any): string;

    /**
     * 확장 타입을 얻습니다.
     * 
     * @param target - 대상 객체입니다.
     * @returns 확장 타입 객체입니다.
     * 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;

    /**
     * 확장 타입이 대상 타입을 허용하는지 검사합니다.
     * 
     * @param extType - 확장 타입입니다.
     * @param tarType - 검사 대상 타입입니다.
     * @param opt - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 에러 객체 또는 성공시 `undefined`입니다.
     */
    function allowType(extType: any, tarType: any, opt?: number): Error | undefined;

    /**
     * 확장 타입이 대상과 매치되는지 검사합니다.
     * 
     * @param extType - 확장 타입입니다.
     * @param target - 검사 대상 타입입니다.
     * @param opt - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 에러 객체 또는 성공시 `undefined`입니다.
     */
    function matchType(extType: any, target: any, opt?: number): Error | undefined;

    /**
     *  확장 타입이 대상 타입을 허용하는지 여부를 확인합니다.
     * 
     * @param extType - 확장 타입입니다.
     * @param tarType - 검사 대상 타입입니다.
     * @param opt - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 매치 여부를 나타냅니다.
     */
    function isAllowType(extType: any, tarType: any, opt?: number): boolean;

    /**
     * 확장 타입이 대상과 매치되는지 여부를 확인합니다.
     * 
     * @param extType - 확장 타입입니다.
     * @param target - 검사 대상 타입입니다.
     * @param opt - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 매치 여부를 나타냅니다.
     */
    function isMatchType(extType: any, target: any, opt?: number): boolean;

}

export = Type;