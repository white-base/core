import { ExtType } from "./T";

/**
 * 타입 모듈입니다.
 */
declare namespace Type {

    /**
     * 객체의 전체 프로퍼티를 조회합니다.
     * 
     * @param obj - 프로퍼티를 조회할 객체 (Object 제외)
     * @param includeObject - `Object`의 프로퍼티를 포함할지 여부
     * @returns 프로퍼티 이름 배열
     */
    function getAllProperties(obj: object, includeObject: boolean): string[];

    /**
     * 두 객체를 비교하여 동일한지 확인합니다. (프로토타입 제외)
     * 
     * @param source - 원본 객체
     * @param target - 비교할 대상 객체
     * @returns 두 객체가 동일한지 여부
     */
    function deepEqual(source: any, target: object): boolean;

    /**
     * 지정된 함수(생성자)의 타입을 가져옵니다. (`_UNION` 포함 가능)  
     * 반환된 배열은 대상부터 순서대로 포함됩니다.  
     * 
     * @param baseType - 생성자 함수 또는 클래스
     * @param includeUnion - `_UNION` 포함 여부 (기본값: `true`)
     * @returns 함수 타입 배열
     */
    function getTypes(baseType: Function, includeUnion?: boolean): Function[];

    /**
     * 함수 타입의 프로토타입(상속) 체인에 지정된 대상이 포함되어 있는지 확인합니다.
     * 
     * @param baseType - 생성자 함수 또는 클래스
     * @param target - 검사 대상(생성자 함수 또는 클래스 이름)
     * @returns 프로토타입 체인에 포함 여부
     */
    function isProtoChain(baseType: Function, target: Function | string): boolean;

    /**
     * 지정된 함수 타입이 프로토타입(상속) 체인에 포함되거나 `_UNION` 타입인지 확인합니다.
     * 
     * @param baseType - 생성자 함수 또는 클래스
     * @param target - 검사 대상 (생성자 함수 또는 클래스 이름)
     * @returns 프로토타입 체인 또는 `_UNION` 타입 여부
     */
    function hasType(baseType: Function, target: Function | string): boolean;

    /**
     * 대상 타입의 확장 정보를 JSON 형태로 반환합니다.  
     * 객체의 내부 속성을 분석하여 모든 속성을 `typeObject()` 형식으로 변환합니다.  
     * 
     * @param target - 대상 타입
     * @returns 변환된 확장 타입 객체
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
     * 대상 객체의 확장 타입명을 반환합니다.
     * 
     * @param target - 대상 객체
     * @returns 확장 타입명
     */
    function typeOf(target: any): string;

    /**
     * 대상 객체의 확장 타입을 반환합니다.
     * 
     * @param target - 대상 객체
     * @returns 확장 타입 객체
     * 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;

    /**
     * 확장 타입이 대상 타입을 허용하는지 검사합니다.
     * 
     * @param sourceType - 확장 타입
     * @param targetType - 검사할 대상 타입
     * @param option - 허용 옵션  (0 = 기존 유지, 1 = 클래스 타입 생성)
     * @throws 확장 타입이 대상 타입을 허용하지 않는 경우 예외 발생.
     */
    function allowType(sourceType: any, targetType: any, option?: number): void;

    /**
     * 확장 타입이 대상과 일치하는지 검사합니다.
     * 
     * @param sourceType - 확장 타입
     * @param target - 검사 대상
     * @param option - 허용 옵션  (0 = 기존 유지, 1 = 클래스 타입 생성)
     * @throws 실패시 예외
     */
    function matchType(sourceType: any, target: any, option?: number): void;

    /**
     * 확장 타입이 대상 타입을 허용하는지 여부를 확인합니다.
     * 
     * @param sourceType - 확장 타입
     * @param tarType - 검사 대상 타입
     * @param option - 허용 옵션  (0 = 기존 유지, 1 = 클래스 타입 생성)
     * @returns 허용 여부
     */
    function isAllowType(sourceType: any, tarType: any, option?: number): boolean;

    /**
     * 확장 타입이 대상과 일치되는지 여부를 확인합니다.
     * 
     * @param sourceType - 확장 타입
     * @param target - 검사 대상 타입
     * @param option - 허용 옵션  (0 = 기존 유지, 1 = 클래스 타입 생성)
     * @returns 매치 여부
     */
    function isMatchType(sourceType: any, target: any, option?: number): boolean;
}

export default Type;
export { Type };
