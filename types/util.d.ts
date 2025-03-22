/**
 * 유틸리티 모듈입니다.
 */
declare namespace Util {

    /**
     * 배열의 중첩된 깊이를 반환합니다.
     * 
     * @param array - 배열 요소
     * @param depth - 현재 깊이 (기본값: 0)
     * @returns 배열의 최대 중첩 깊이
     */
    function getArrayDepth(array: any[], depth?: number): number;

    /**
     * 36자리 GUID를 생성합니다.
     * GUID를 생성합니다. (36자)
     * 
     * @returns 생성된 GUID 문자열
     */
    function createGuid(): string;

    /**
     * 객체를 깊은 복사합니다. (프로토타입 제외)
     * 
     * @param source - 복사할 대상 객체
     * @returns 복사된 객체
     */
    function deepCopy(source: object): object;

    /**
     * 지정된 생성자가 부모 생성자를 상속받도록 설정합니다. 
     * 
     * @param ctor - 생성자 함수 또는 객체
     * @param superCtor - 부모 생성자 함수 또는 객체
     */
    function inherits(ctor: Function, superCtor: Function): void;

    /**
     * 객체가 지정된 인터페이스를 구현하는지 확인합니다.  
     * `ctor`로 생성된 `obj` 객체가 `interfaces`에서 제공하는 인터페이스를 구현하는지 확인합니다.  
     * `ctor._KIND`가 `'Interface'`인 경우 `allowType()`을 사용하여 확인합니다.  
     * 그 외의 경우 `matchType()`을 사용하여 확인합니다.  
     * 
     * @param ctor - 검사할 생성자
     * @param obj - 검사 대상 객체
     * @param interfaces - 검사할 인터페이스 목록
     */
    function implements(ctor: Function, obj: object, ...interfaces: Function[]): void;
}

export default Util;
export { Util };