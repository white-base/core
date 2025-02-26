/**
 * 유틸리티 함수를 제공합니다.
 */
declare namespace Util {
    /**
     * 배열의 깊이를 가져옵니다.
     * 
     * @param elem - 배열 요소
     * @param depts - 현재 깊이 (기본값: 0)
     * @returns 배열의 깊이
     */
    function getArrayDepth(elem: any[], depts?: number): number;

    /**
     * GUID를 생성합니다. (36자)
     * 
     * @returns 생성된 GUID 문자열
     */
    function createGuid(): string;

    /**
     * 객체를 깊은 복사합니다. (prototype 제외)
     * 
     * @param target - 복사할 대상 객체
     * @returns 복사된 객체
     */
    function deepCopy(target: object): object;

    /**
     * 생성자에서 부모 생성자를 상속합니다.
     * 
     * @param ctor - 생성자 함수 또는 객체
     * @param superCtor - 부모 생성자 함수 또는 객체
     */
    function inherits(ctor: Function, superCtor: Function): void;

    /**
     * 인터페이스 구현 여부를 검사합니다.
     * ctor 로 생성한 obj 객체의 args<funtion>의 구현 여부를 검사합니다.
     * 종류(ctor._KIND)가 'Interface' 타입이면 allowType(), 아니면 matchType()로 검사한다.
     * 
     * @param ctor - 검사할 생성자
     * @param obj - 검사 대상 객체
     * @param args - 인터페이스 목록
     */
    function implements(ctor: Function, obj: object, ...args: Function[]): void;
}

export default Util;
export { Util };