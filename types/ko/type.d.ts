import { ExtType } from "./T";

// /** 확장 타입 객체의 구조 */
// declare interface ExtType {
//     /** 객체의 타입 식별자 */
//     $ype: string;

//     /** 기본값 (문자열, 숫자, 불리언, 정규식 가능) */
//     default?: string | number | boolean | RegExp | null;

//     /** 객체의 종류 (배열, 선택형) */
//     kind?: 'array' | 'choice' | string;

//     /** 클래스 생성자 또는 인스턴스 */
//     creator: Function | null;
//     _instance: object;

//     /** 유니온 타입을 포함하는 프로퍼티 */
//     _prop: Record<string, any>;

//     /** 함수의 매개변수와 반환 타입 */
//     params: any[];
//     return: any | null;

//     /** 이름과 함수 */
//     name: string;
//     func: Function | null;

//     // type = 'array', 'choice' 일때 하위 타입
//     list?: ExtType[];
// }

/**
 * 타입 모듈입니다.
 */
declare namespace Type {

    /**
     * 객체의 전체 프로퍼티를 조회합니다.
     * 
     * @param obj - 프로퍼티를 조회할 객체입니다.(Object 제외)
     * @param includeObject - `Object`를 포함할지 여부입니다.
     * @returns 프로퍼티 이름 배열입니다.
     */
    function getAllProperties(obj: object, includeObject: boolean): string[];

    /**
     * 객체를 비교합니다. (프로토타입 제외)
     * 
     * @param source - 원본 객체입니다.
     * @param target - 비교 대상 객체입니다.
     * @returns 두 객체가 같은지 여부를 나타냅니다.
     */
    function deepEqual(source: any, target: object): boolean;

    /**
     * 함수 타입을 가져옵니다. (_UNION 포함)
     * 배열에 대상부터 순서대로 리턴합니다.
     * 
     * @param baseType - 생성자 함수입니다.
     * @param includeUnion - `_UNION` 포함 여부입니다. 기본값은 `true`입니다.
     * @returns 함수 타입 배열입니다.
     */
    function getTypes(baseType: Function, includeUnion?: boolean): Function[];

    /**
     * 함수 타입의 프로토타입(상속) 타입 여부를 검사합니다.
     * 
     * @param baseType - 생성자 함수입니다.
     * @param target - 검사 대상입니다.
     * @returns 프로토타입 타입 여부를 나타냅니다.
     */
    function isProtoChain(baseType: Function, target: Function | string): boolean;

    /**
     * 함수 타입의 프로토타입(상속) 또는 `_UNION` 타입 여부를 검사합니다.
     * 
     * @param baseType - 생성자 함수입니다.
     * @param target - 검사 대상입니다.
     * @returns 프로토타입 또는 `_UNION` 타입 여부를 나타냅니다.
     */
    function hasType(baseType: Function, target: Function | string): boolean;

    /**
     * JSON 형태의 확장 타입 정보를 반환합니다.
     * 
     * @param target - 대상 타입입니다.
     * @returns 객체 내부 속성까지 분석하여 모든 속성을 typeObject() 형태로 변환합니다.
     * 
     * @example
     * var obj = {
     *      $ype: '',
     *      default: null,                  // string, number, boolean, regexp
     *      kind: '',                       // array, choice
     *      creator: null, _instance: {},   // class
     *      _prop: {},                      // union
     *      params: [], return: null,       // function
     *      name: name, func: null,
     * }
     */
    function typeObject(target: any): ExtType;   // TODO: 검토 및 작성 필요

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
     * @param sourceType - 확장 타입입니다.
     * @param targetType - 검사 대상 타입입니다.
     * @param mode - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @throws 확장 타입이 대상 타입을 허용하지 않는 경우 예외 발생.
     */
    function allowType(sourceType: any, targetType: any, mode?: number): void;

    /**
     * 확장 타입이 대상과 매치되는지 검사합니다.
     * 
     * @param sourceType - 확장 타입입니다.
     * @param target - 검사 대상입니다.
     * @param mode - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @throws 실패시 예외
     */
    function matchType(sourceType: any, target: any, mode?: number): void;

    /**
     * 확장 타입이 대상 타입을 허용하는지 여부를 확인합니다.
     * 
     * @param sourceType - 확장 타입입니다.
     * @param tarType - 검사 대상 타입입니다.
     * @param mode - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 허용 여부를 나타냅니다.
     */
    function isAllowType(sourceType: any, tarType: any, mode?: number): boolean;

    /**
     * 확장 타입이 대상과 매치되는지 여부를 확인합니다.
     * 
     * @param sourceType - 확장 타입입니다.
     * @param target - 검사 대상 타입입니다.
     * @param mode - 허용 옵션입니다: 0 = 기존 유지, 1 = 클래스 타입 생성.
     * @returns 매치 여부를 나타냅니다.
     */
    function isMatchType(sourceType: any, target: any, mode?: number): boolean;
}

export default Type;
export { Type };
